#!/usr/bin/env python3
"""Rebuild the pompeiana source tree from POMPEIANA_FULL_SOURCE.md.

Usage:
    python3 unpack.py [bundle.md] [target-dir]

Defaults: bundle = POMPEIANA_FULL_SOURCE.md next to this script, target = ./pompeiana.
Verifies every file against the SHA-256 recorded in the bundle and exits non-zero
on any mismatch, so a restored tree is provably byte-identical to the original.
"""
import hashlib
import os
import re
import sys

HEADING = re.compile(r"^## `(?P<path>[^`]+)`$")
STAMP = re.compile(r"^<!-- sha256:(?P<sha>[0-9a-f]{64}) bytes:(?P<bytes>\d+) -->$")
FENCE = re.compile(r"^(?P<ticks>`{3,})(?P<lang>[a-zA-Z]*)$")


def parse(bundle_text):
    """Yield (path, content, sha256, size) for every file section in the bundle."""
    lines = bundle_text.split("\n")
    i = 0
    while i < len(lines):
        m = HEADING.match(lines[i])
        if not m:
            i += 1
            continue
        path = m.group("path")

        # Find the sha/bytes stamp, then the opening fence.
        stamp = None
        j = i + 1
        while j < len(lines) and not FENCE.match(lines[j]):
            s = STAMP.match(lines[j])
            if s:
                stamp = s
            j += 1
        if j >= len(lines) or stamp is None:
            i += 1
            continue

        ticks = FENCE.match(lines[j]).group("ticks")
        body = []
        k = j + 1
        while k < len(lines) and lines[k] != ticks:
            body.append(lines[k])
            k += 1

        content = "\n".join(body)
        size = int(stamp.group("bytes"))
        # The bundle appends a trailing newline for files that lack one; the
        # recorded byte count is authoritative.
        if len(content.encode("utf-8")) != size and content.endswith("\n"):
            content = content[:-1]
        if len(content.encode("utf-8")) != size:
            content += "\n"
        yield path, content, stamp.group("sha"), size
        i = k + 1


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    bundle = sys.argv[1] if len(sys.argv) > 1 else os.path.join(here, "POMPEIANA_FULL_SOURCE.md")
    target = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.getcwd(), "pompeiana")

    with open(bundle, encoding="utf-8") as f:
        text = f.read()

    ok, bad = 0, []
    for path, content, sha, size in parse(text):
        raw = content.encode("utf-8")
        dest = os.path.join(target, path)
        os.makedirs(os.path.dirname(dest) or ".", exist_ok=True)
        with open(dest, "wb") as f:
            f.write(raw)
        got = hashlib.sha256(raw).hexdigest()
        if got == sha and len(raw) == size:
            ok += 1
            print(f"  ok  {path}  ({size} bytes)")
        else:
            bad.append(path)
            print(f"  FAIL {path}: sha {got} != {sha}")

    print(f"\n{ok} file(s) restored to {target}")
    if bad:
        print(f"{len(bad)} mismatch(es): {', '.join(bad)}")
        return 1
    print("All checksums match — byte-identical copy.")
    print(f"\nRun it:  cd {target} && python3 -m http.server 8000")
    return 0


if __name__ == "__main__":
    sys.exit(main())
