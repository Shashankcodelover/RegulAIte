import re

with open('app.py', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'\"background: rgba\(11, 20, 42, 0\.65\);\n\s*backdrop-filter: blur\(24px\);\n\s*-webkit-backdrop-filter: blur\(24px\);\"',
    '\"background: rgba(11, 20, 42, 0.65); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);\"',
    content
)

with open('app.py', 'w', encoding='utf-8') as f:
    f.write(content)
