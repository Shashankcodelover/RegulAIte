import re

with open('app.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken multiline string
content = content.replace(
    '\"background: rgba(11, 20, 42, 0.65);\\n    backdrop-filter: blur(24px);\\n    -webkit-backdrop-filter: blur(24px);\"',
    '\"background: rgba(11, 20, 42, 0.65); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);\"'
)

# Also fix the light colors on the bad risk badges in the contract reader
content = content.replace('\"background: #fef2f2;\"', '\"background: rgba(239, 68, 68, 0.15);\"')
content = content.replace('#b91c1c', '#f87171') # text on dark
content = content.replace('#047857', '#34d399')
content = content.replace('background:#fee2e2;', 'background: rgba(239, 68, 68, 0.2);')
content = content.replace('background:#d1fae5;', 'background: rgba(16, 185, 129, 0.2);')

with open('app.py', 'w', encoding='utf-8') as f:
    f.write(content)
