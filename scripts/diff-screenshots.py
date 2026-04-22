#!/usr/bin/env python3
"""
Download main-branch baseline screenshots from the screenshots branch and compare
with current captures. For each changed screenshot, copies both the baseline
({name}-before.png) and the current ({name}-after.png) to pr-screenshots-changed/
so the PR description can render a before/after comparison.

Required env vars: GITHUB_TOKEN, REPO
Input:  pr-screenshots/*.png
Output: pr-screenshots-changed/{name}-before.png + {name}-after.png for each change,
        or {name}-after.png only for new sections with no baseline.
"""

import base64
import io
import json
import os
import shutil
import sys
import urllib.request
from pathlib import Path

from PIL import Image, ImageChops

# Per-channel pixel difference to ignore (absorbs minor anti-aliasing variance).
_TOLERANCE = 5
# Fraction of pixels that must differ beyond tolerance to count as changed.
_THRESHOLD = 0.001


def gh_api(method: str, path: str) -> dict:
    """
    Make a GET request to the GitHub Contents API.

    @param method - HTTP verb (always GET here)
    @param path - API path, e.g. "repos/owner/repo/contents/..."
    @returns Parsed JSON response, or {} on 404
    @throws urllib.error.HTTPError for non-404 errors
    """
    token = os.environ["GITHUB_TOKEN"]
    url = f"https://api.github.com/{path}"
    req = urllib.request.Request(
        url,
        method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        },
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return {}
        body = e.read().decode("utf-8", errors="replace")
        print(f"GitHub API error {e.code} on {method} {path}: {body}", file=sys.stderr)
        raise


def images_differ(current: Path, baseline_bytes: bytes) -> bool:
    """
    Return True if current screenshot differs meaningfully from baseline.

    Differences smaller than _TOLERANCE per channel on fewer than _THRESHOLD
    fraction of pixels are ignored to avoid false positives from anti-aliasing.

    @param current - Path to the newly captured PNG
    @param baseline_bytes - Raw bytes of the baseline PNG from the screenshots branch
    @returns True if the images are visually different
    """
    img_current = Image.open(current).convert("RGB")
    img_baseline = Image.open(io.BytesIO(baseline_bytes)).convert("RGB")

    if img_current.size != img_baseline.size:
        return True

    diff = ImageChops.difference(img_current, img_baseline)
    total = img_current.width * img_current.height
    changed = sum(
        1
        for r, g, b in diff.getdata()
        if r > _TOLERANCE or g > _TOLERANCE or b > _TOLERANCE
    )
    return (changed / total) > _THRESHOLD


def main() -> None:
    repo = os.environ["REPO"]
    src = Path("pr-screenshots")
    out = Path("pr-screenshots-changed")
    out.mkdir(exist_ok=True)

    for img in sorted(src.glob("*.png")):
        name = img.stem  # e.g. "hero-light"
        api_path = f"repos/{repo}/contents/main/{img.name}"
        data = gh_api("GET", f"{api_path}?ref=screenshots")

        if not data or "content" not in data:
            # No baseline — new section, include after only.
            print(f"  new:     {img.name}", file=sys.stderr)
            shutil.copy(img, out / f"{name}-after.png")
            continue

        baseline_bytes = base64.b64decode(data["content"])
        if images_differ(img, baseline_bytes):
            print(f"  changed: {img.name}", file=sys.stderr)
            (out / f"{name}-before.png").write_bytes(baseline_bytes)
            shutil.copy(img, out / f"{name}-after.png")
        else:
            print(f"  same:    {img.name}", file=sys.stderr)

    changed_count = len(list(out.glob("*-after.png")))
    print(f"{changed_count} screenshot(s) changed.", file=sys.stderr)


main()
