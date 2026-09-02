#!/usr/bin/env python3
"""Deterministic checks for the static ASL presentation."""
from html.parser import HTMLParser
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index.html"

class Parser(HTMLParser):
    pass

text = HTML.read_text(encoding="utf-8")
Parser().feed(text)

ids = set(re.findall(r'id="([^"]+)"', text))
fragments = re.findall(r'href="#([^"]+)"', text)
missing = sorted(set(fragments) - ids)
assert not missing, f"Missing fragment targets: {missing}"

for relative in ("styles.css", "script.js", "assets/simplea-logo.png"):
    assert (ROOT / relative).is_file(), f"Missing local asset: {relative}"

for forbidden in ("Habitah", "Casavi", "Impower"):
    assert forbidden not in text, f"Foreign client term leaked into page: {forbidden}"

required = (
    "Gesprächs- & Zielbildentwurf",
    "Mensch entscheidet",
    "Keine automatische Außenkommunikation",
    "Diskussionsgrundlage",
)
for phrase in required:
    assert phrase in text, f"Required guardrail missing: {phrase}"

print(f"OK: {len(ids)} section IDs, {len(fragments)} internal links, local assets and client boundary verified")
