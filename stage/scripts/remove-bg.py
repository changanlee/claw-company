#!/usr/bin/env python3
"""
remove-bg.py — Remove backgrounds from sprite sheets.

Uses corner-sampled color matching + edge flood-fill.
Won't eat character whites because it only removes colors
that match the actual background sampled from corners.

Usage:
  python3 scripts/remove-bg.py                          # Process all sprites
  python3 scripts/remove-bg.py --role chairman --pose idle
  python3 scripts/remove-bg.py --pose working
  python3 scripts/remove-bg.py --check
"""

import os
import argparse
import numpy as np
from PIL import Image
from collections import deque

STAGE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROLES = ["chairman", "ceo", "cfo", "cio", "cto", "coo", "chro", "cao"]
POSES = ["idle", "working", "researching", "executing", "dispatching", "awaiting", "error"]


def sample_bg_colors(arr):
    """Sample multiple background colors from all 4 edges of the image."""
    h, w = arr.shape[:2]
    edge_pixels = []
    # Top and bottom rows
    for x in range(w):
        edge_pixels.append(arr[0, x, :3])
        edge_pixels.append(arr[h-1, x, :3])
    # Left and right columns
    for y in range(h):
        edge_pixels.append(arr[y, 0, :3])
        edge_pixels.append(arr[y, w-1, :3])

    edge_arr = np.array(edge_pixels, dtype=int)
    # Return the set of unique-ish colors (clustered within tolerance)
    # Use the median as the primary bg color
    median_color = np.median(edge_arr, axis=0).astype(int)
    return median_color


def is_bg(r, g, b, bg_color, tolerance=35):
    """Check if pixel matches the sampled background color within tolerance."""
    ri, gi, bi = int(r), int(g), int(b)

    # Magenta screen (#FF00FF)
    if ri > 150 and bi > 150 and gi < 100 and (ri - gi) > 80 and (bi - gi) > 80:
        return True

    # Green screen (#00FF00)
    if gi > 150 and ri < 150 and bi < 150 and (gi - ri) > 50 and (gi - bi) > 50:
        return True

    # Match sampled background color
    dr = abs(ri - int(bg_color[0]))
    dg = abs(gi - int(bg_color[1]))
    db = abs(bi - int(bg_color[2]))
    if dr < tolerance and dg < tolerance and db < tolerance:
        return True

    return False


def flood_fill_remove_bg(img_array):
    """Remove background using edge flood-fill with sampled bg color."""
    h, w = img_array.shape[:2]
    bg_color = sample_bg_colors(img_array)
    visited = np.zeros((h, w), dtype=bool)
    result = img_array.copy()

    queue = deque()
    for x in range(w):
        queue.append((0, x))
        queue.append((h-1, x))
    for y in range(h):
        queue.append((y, 0))
        queue.append((y, w-1))

    while queue:
        cy, cx = queue.popleft()
        if cy < 0 or cy >= h or cx < 0 or cx >= w:
            continue
        if visited[cy, cx]:
            continue
        visited[cy, cx] = True

        r, g, b = result[cy, cx, 0], result[cy, cx, 1], result[cy, cx, 2]
        if is_bg(r, g, b, bg_color):
            result[cy, cx, 3] = 0
            for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                ny, nx = cy + dy, cx + dx
                if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                    queue.append((ny, nx))

    return result


def process_sprite(filepath, check_only=False):
    img = Image.open(filepath).convert('RGBA')
    arr = np.array(img)

    transparent_before = np.sum(arr[:, :, 3] == 0)
    total = arr.shape[0] * arr.shape[1]
    pct_before = transparent_before / total * 100

    if check_only:
        return pct_before, None

    result = flood_fill_remove_bg(arr)
    transparent_after = np.sum(result[:, :, 3] == 0)
    pct_after = transparent_after / total * 100

    if pct_after > pct_before + 1:
        Image.fromarray(result).save(filepath)
        return pct_before, pct_after
    return pct_before, None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--role')
    parser.add_argument('--pose')
    parser.add_argument('--theme', default='modern-office')
    parser.add_argument('--gender', default='male')
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()

    roles = [args.role] if args.role else ROLES
    poses = [args.pose] if args.pose else POSES
    base = os.path.join(STAGE_DIR, 'themes', args.theme, 'sprites', 'characters', args.gender)

    print(f"\n{'Role':<12} {'Pose':<12} {'Before':<10} {'After':<10} {'Status'}")
    print("-" * 60)

    changed = checked = 0
    for role in roles:
        for pose in poses:
            fpath = os.path.join(base, f"{role}-{pose}.png")
            if not os.path.exists(fpath):
                continue
            checked += 1
            pct_before, pct_after = process_sprite(fpath, check_only=args.check)
            if args.check:
                status = "OK" if pct_before > 30 else "⚠️  LOW"
                print(f"{role:<12} {pose:<12} {pct_before:>6.1f}%    {'--':>8}  {status}")
            elif pct_after is not None:
                changed += 1
                print(f"{role:<12} {pose:<12} {pct_before:>6.1f}%    {pct_after:>6.1f}%  ✓ fixed")
            else:
                print(f"{role:<12} {pose:<12} {pct_before:>6.1f}%    {'--':>8}  (no change)")

    print(f"\n{'checked' if args.check else 'fixed'}: {changed}/{checked}")


if __name__ == '__main__':
    main()
