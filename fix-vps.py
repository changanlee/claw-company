#!/usr/bin/env python3
"""Remove _clawCompany from openclaw.json and restore models."""
import json

f = '/home/admin_derek/.openclaw/openclaw.json'
d = json.load(open(f))

# Remove invalid key
d.pop('_clawCompany', None)

# Restore user models if missing
m = d.setdefault('agents', {}).setdefault('defaults', {}).setdefault('models', {})
m.setdefault('minimax-portal/MiniMax-M2.5-highspeed', {'alias': 'minimax-m2.5-highspeed'})
m.setdefault('openrouter/auto', {'alias': 'OpenRouter'})
m.setdefault('openrouter/openrouter/auto', {})
m.setdefault('google/gemini-2.0-flash', {})
m.setdefault('openrouter/meta-llama/llama-3.3-70b-instruct:free', {'alias': 'fast'})

json.dump(d, open(f, 'w'), indent=2, ensure_ascii=False)
print('fixed: removed _clawCompany, restored models')
