#!/usr/bin/env python3
"""
Upload screenshots from pr-screenshots/ to the screenshots branch via the GitHub API,
then print the markdown image block to stdout for injection into the PR description.

Required env vars: GITHUB_TOKEN, REPO (owner/repo), PR_NUMBER
"""

import base64
import json
import os
import sys
import urllib.request
from pathlib import Path


def gh_api(method: str, path: str, payload: dict | None = None) -> dict:
    token = os.environ["GITHUB_TOKEN"]
    url = f"https://api.github.com/{path}"
    data = json.dumps(payload).encode() if payload else None
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return {}
        raise


def main() -> None:
    repo = os.environ["REPO"]
    pr_number = os.environ["PR_NUMBER"]
    screenshot_dir = Path("pr-screenshots")
    markdown = ""

    for img in sorted(screenshot_dir.glob("*.png")):
        filename = img.name
        label = img.stem
        content = base64.b64encode(img.read_bytes()).decode()
        api_path = f"repos/{repo}/contents/screenshots/{pr_number}-{filename}"

        existing = gh_api("GET", api_path)
        sha = existing.get("sha")

        payload: dict = {
            "message": f"chore: {'update' if sha else 'add'} screenshot for PR #{pr_number}",
            "content": content,
            "branch": "screenshots",
        }
        if sha:
            payload["sha"] = sha

        gh_api("PUT", api_path, payload)

        url = f"https://raw.githubusercontent.com/{repo}/screenshots/screenshots/{pr_number}-{filename}"
        markdown += f"**{label}**\n![{label}]({url})\n\n"

    print(markdown, end="")


main()
