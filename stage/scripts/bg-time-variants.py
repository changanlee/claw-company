#!/usr/bin/env python3
"""
v5: Much subtler color shifts. 
- Window content: replace with sky (main visual change)
- Cyan glass: VERY slight hue tint, not dramatic shift
- Interior: barely noticeable warmth/coolness
- Outer walls: subtle brightness only
"""
from PIL import Image
import numpy as np
import colorsys

base = Image.open("/tmp/bg-test/office-bg-with-dividers.png")
arr_base = np.array(base).astype(np.int32)
h, w = arr_base.shape[:2]

def is_in_window_region(y, x):
    if y < 155 and y > 25 and x > 250 and x < 1640:
        return True
    if x > 1640 and y < 400:
        return True
    return False

def is_city_pixel(r, g, b):
    br = (r + g + b) / 3.0
    if br < 30: return False
    if br > 180: return False
    if g > 150 and b > 150 and r < 80: return False
    return True

def apply_hsl_shift(r, g, b, h_shift=0, s_mult=1.0, l_mult=1.0, l_add=0):
    rf, gf, bf = r/255.0, g/255.0, b/255.0
    hv, lv, sv = colorsys.rgb_to_hls(rf, gf, bf)
    hv = (hv + h_shift/360.0) % 1.0
    sv = max(0, min(1, sv * s_mult))
    lv = max(0, min(1, lv * l_mult + l_add))
    r2, g2, b2 = colorsys.hls_to_rgb(hv, lv, sv)
    return int(min(255, max(0, r2*255))), int(min(255, max(0, g2*255))), int(min(255, max(0, b2*255)))

def sunrise_color(y, x):
    t = max(0, min(1, y / 200.0))
    return int(min(255, 180+t*60)), int(min(255, 80+t*80)), int(max(0, 100-t*50))

def bluesky_color(y, x):
    t = max(0, min(1, y / 200.0))
    return int(min(255, 80+t*50)), int(min(255, 160+t*40)), int(min(255, 230-t*10))

def is_cyan_pixel(r, g, b):
    return g > 140 and b > 140 and r < 100 and (g + b) > 280

# Much subtler configs:
# (name, sky_fn, cyan_hue_shift, cyan_sat, cyan_light, interior_hue, interior_sat, interior_light, wall_light_add)
configs = [
    # Morning: sky=sunrise, cyan gets TINY warm shift (-20 not -150), interior barely warm
    ("morning", sunrise_color, -20, 0.95, 1.0, 2, 1.01, 1.005, 0.005),
    # Afternoon: sky=blue, cyan gets TINY cool shift (+5), interior barely bright
    ("afternoon", bluesky_color, 5, 0.95, 1.05, -1, 0.99, 1.02, 0.03),
]

for name, sky_fn, c_h, c_s, c_l, i_h, i_s, i_l, w_l in configs:
    print(f"\nCreating {name}...")
    result = arr_base.copy()
    
    for y in range(h):
        for x in range(w):
            r, g, b = int(result[y,x,0]), int(result[y,x,1]), int(result[y,x,2])
            br = (r + g + b) / 3.0
            
            # 1. City/sky — ONLY in window regions
            if is_in_window_region(y, x) and is_city_pixel(r, g, b):
                nr, ng, nb = sky_fn(y, x)
                result[y, x, :3] = [nr, ng, nb]
                continue
            
            # 2. Cyan glass — very subtle shift
            if is_cyan_pixel(r, g, b):
                nr, ng, nb = apply_hsl_shift(r, g, b, h_shift=c_h, s_mult=c_s, l_mult=c_l)
                result[y, x, :3] = [nr, ng, nb]
                continue
            
            # 3. Bright interior — barely noticeable
            if br > 120:
                nr, ng, nb = apply_hsl_shift(r, g, b, h_shift=i_h, s_mult=i_s, l_mult=i_l)
                result[y, x, :3] = [nr, ng, nb]
                continue
            
            # 4. Dark walls — minimal
            if br < 35:
                nr, ng, nb = apply_hsl_shift(r, g, b, h_shift=0, s_mult=0.9, l_add=w_l)
                result[y, x, :3] = [nr, ng, nb]
    
    out = f"/tmp/bg-test/office-bg-{name}-v5.png"
    Image.fromarray(result.astype(np.uint8)).save(out)
    print(f"  Saved: {out}")

print("\nDone!")
