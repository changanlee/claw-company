#!/usr/bin/env python3
"""
Add 3 vertical wall dividers to ROW2 to clearly separate into 4 rooms.
Style: thin dark line with cyan glass accent, matching existing wall aesthetics.
"""
from PIL import Image, ImageDraw
import numpy as np

img = Image.open("/tmp/bg-test/L0FMe.png").copy()
draw = ImageDraw.Draw(img)
arr = np.array(img)
h, w = arr.shape[:2]

# ROW2 boundaries (from analysis):
# Top glass wall starts: y≈440
# Room floor: y≈515-640
# Bottom glass wall ends: y≈695
# Outer walls: left≈155, right≈1770 (averaged)

# Room area width and divider positions
room_left = 155
room_right = 1770
room_width = room_right - room_left  # ~1615
quarter = room_width // 4  # ~404

# 3 divider center positions
divider_xs = [
    room_left + quarter,       # ~559
    room_left + 2 * quarter,   # ~963
    room_left + 3 * quarter,   # ~1367
]

# Y range for dividers (full ROW2 height)
div_y_top = 440
div_y_bottom = 695

# Wall colors (sampled from existing walls in the image)
dark_wall = (15, 25, 50)       # Dark navy/blue
cyan_accent = (35, 190, 185)   # Bright teal cyan
dark_teal = (12, 70, 90)       # Dark teal transition

# Divider structure: 7px wide
# |1px dark_teal|1px cyan|3px dark_wall|1px cyan|1px dark_teal|
divider_half_width = 3  # 3px on each side of center + 1px center = 7px total

for cx in divider_xs:
    for y in range(div_y_top, div_y_bottom + 1):
        # Check if this y position is in glass area or floor area
        # Sample brightness at current position to decide opacity/style
        orig_br = np.mean(arr[y, cx, :3])
        
        # Draw the divider columns
        # Dark teal edge (leftmost)
        img.putpixel((cx - 3, y), dark_teal)
        # Cyan accent
        img.putpixel((cx - 2, y), cyan_accent)
        # Dark wall body (3px)
        img.putpixel((cx - 1, y), dark_wall)
        img.putpixel((cx, y), dark_wall)
        img.putpixel((cx + 1, y), dark_wall)
        # Cyan accent
        img.putpixel((cx + 2, y), cyan_accent)
        # Dark teal edge (rightmost)
        img.putpixel((cx + 3, y), dark_teal)

# Save
out_path = "/tmp/bg-test/office-bg-with-dividers.png"
img.save(out_path)
print(f"Saved to {out_path}")
print(f"Divider positions: {divider_xs}")
print(f"Y range: {div_y_top}-{div_y_bottom}")

