import sys
import re

def update_hero_jsx():
    with open('src/sections/Hero.jsx', 'r') as f:
        content = f.read()

    # 1. Remove FloatingTab component
    content = re.sub(
        r'const FloatingTab = \(\{ tab, index, side \}\) => \{.*?(?=const Hero = \(\{)', 
        '', 
        content, 
        flags=re.DOTALL
    )

    # 2. Remove tabs array inside Hero
    content = re.sub(
        r'  const tabs = \[.*?\];$', 
        '', 
        content, 
        flags=re.DOTALL | re.MULTILINE
    )

    # 3. Remove .floating-tabs div inside the JSX return
    content = re.sub(
        r'          \{\/\* FLOATING TABS \(LANTERN\) \*\/\}\s*<div className="floating-tabs absolute inset-0 z-\[60\] pointer-events-none.*?(?=<\/div>\s*\{\/\* ── OVERLAY ELEMENTS ── \*\/\})', 
        '', 
        content, 
        flags=re.DOTALL
    )

    with open('src/sections/Hero.jsx', 'w') as f:
        f.write(content)

update_hero_jsx()
