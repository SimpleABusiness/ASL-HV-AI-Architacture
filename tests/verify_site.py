#!/usr/bin/env python3
"""Deterministic checks for the static ASL customer presentation."""
from html.parser import HTMLParser
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index.html"

class Parser(HTMLParser):
    pass

text = HTML.read_text(encoding="utf-8")
css = (ROOT / "styles.css").read_text(encoding="utf-8")
Parser().feed(text)

ids = set(re.findall(r'id="([^"]+)"', text))
fragments = re.findall(r'href="#([^"]+)"', text)
missing = sorted(set(fragments) - ids)
assert not missing, f"Missing fragment targets: {missing}"

slides = re.findall(r'<section class="[^"]*\bslide\b[^"]*" id="(folie-\d+)"[^>]*data-title="([^"]+)"', text)
assert len(slides) == 10, f"Expected 10 presentation slides, got {len(slides)}"
assert [slide_id for slide_id, _ in slides] == [f"folie-{i}" for i in range(1, 11)], "Slide IDs are not sequential"
footer_numbers = re.findall(r'<footer class="slide-footer">.*?<span>(\d{2})</span></footer>', text)
assert footer_numbers == [f"{i:02d}" for i in range(1, 11)], f"Footer numbers are not sequential: {footer_numbers}"
assert text.count('aria-hidden="false"') == 1, "Exactly one slide must be initially visible"
assert text.count('data-decision=') == 4, "Expected four customer decision options"
assert len(re.findall(r'data-decision="[^"]+" aria-pressed="false"', text)) == 4, "Decision options need accessible pressed states"
assert text.count('data-concept=') == 4, "Expected four interactive agent concepts"
assert len(re.findall(r'data-concept="[^"]+" aria-pressed="(?:true|false)"', text)) == 4, "Agent concepts need accessible pressed states"
assert text.count('tabindex="-1"') == 10, "All slides must be programmatically focusable"
assert 'role="dialog"' in text and 'aria-modal="true"' in text, "Outline must be a modal dialog"
assert 'class="fullscreen-toggle"' in text and 'aria-pressed="false"' in text, "Fullscreen control needs an accessible toggle state"
assert 'fonts.googleapis.com' not in text + css, "Client deck must not load remote font CSS"
for external_link in re.findall(r'<a\b[^>]*target="_blank"[^>]*>', text):
    assert re.search(r'rel="[^"]*(?:noopener|noreferrer)[^"]*"', external_link), "External new-tab link lacks rel protection"

for relative in ("styles.css", "script.js", "assets/simplea-logo.png", "assets/favicon.svg"):
    assert (ROOT / relative).is_file(), f"Missing local asset: {relative}"

for forbidden in ("Habitah", "Casavi", "Impower"):
    assert forbidden not in text, f"Foreign client term leaked into page: {forbidden}"

required = (
    "Was heute da ist",
    "Optimierungspotenzial",
    "SimpleA Unterstützung",
    "Anita entscheidet",
    "Keine autonome Außenkommunikation",
    "Schadensmeldung rein",
    "46 Stunden Kapazität/Jahr",
    "etg24 REST-API oder Microsoft Graph/Power Automate",
    "Zeitwerte sind Annahmen",
    "Heute hält Anita",
    "Kontextwechsel 1",
    "ASL-Agent",
    "Copilot Studio / Power Platform",
    "wählt Skill und Tool",
    "Hover, Fokus oder Klick",
    "Der Kontext wandert",
    "ein Kontextpaket",
    "AI-Integrationsstufen",
    "AI mit Skills",
    "Verbundener Workflow",
    "Agentic AI",
    "Stufe 1–2 starten",
    "1–9",
    "direkte Folie",
    "Vollbild",
)
for phrase in required:
    assert phrase in text, f"Required presentation content missing: {phrase}"

assert "localStorage" in (ROOT / "script.js").read_text(encoding="utf-8"), "Presentation state must persist locally"
script = (ROOT / "script.js").read_text(encoding="utf-8")
assert "event.key === '0' ? 10" in script, "Numeric shortcut must map 0 to slide 10"
assert "showSlide(slideNumber - 1" in script, "Numeric shortcut must open the selected slide"
assert "requestFullscreen" in script and "exitFullscreen" in script, "Fullscreen API integration is missing"
assert "event.key.toLowerCase() === 'f'" in script, "Fullscreen keyboard shortcut is missing"
assert "presentation-mode" in script and "presentation-mode" in css, "Presentation mode must be implemented in script and CSS"
print(f"OK: {len(slides)} slides, {len(fragments)} internal links, local assets, guardrails and client boundary verified")
