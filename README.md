# ASL Hausverwaltung – KI-Praxis-Check

Interaktive, kundentaugliche Gesprächspräsentation für einen gemeinsamen Vor-Ort-Termin von ASL Hausverwaltung und SimpleA.

## Präsentationslogik

1. heutige Systemlandschaft
2. Reibung und Optimierungspotenzial
3. sofort umsetzbare Outlook-/Copilot-Routinen
4. technische Copilot-Diagnose
5. pragmatisches Zielbild
6. konkreter Pilotfall „Schadensmeldung per E-Mail“ mit Prompt, Systemübergaben und messbarer Zeitannahme
7. mögliche Unterstützung durch SimpleA
8. gemeinsame Priorisierung
9. Quellen und Datenrahmen

## Bedienung

- `←` / `→`, `Page Up` / `Page Down` oder Leertaste: Folien wechseln
- `Home` / `End`: erste bzw. letzte Folie
- `O`: Folienübersicht
- Auswahl auf der Entscheidungsfolie bleibt lokal im Browser gespeichert
- Drucken erzeugt eine Folie pro Seite

## Lokal öffnen

```bash
python3 -m http.server 8090
```

Danach `http://localhost:8090` öffnen.

## Struktur

- `index.html` – zehn Präsentationsfolien
- `styles.css` – 16:9-Deck, responsive Mobilansicht und Printlayout
- `script.js` – Navigation, Übersicht und lokale Gesprächsauswahl
- `tests/verify_site.py` – statische Struktur-, Link- und Mandantengrenzenprüfung
- `.github/workflows/pages.yml` – Prüfung bei Push, manuelles Pages-Deployment

## Leitplanken

- keine Habitah-Kundendaten oder -Annahmen übernommen
- keine autonome Außenkommunikation
- keine Rechts-, Zahlungs- oder Vertragsentscheidung durch KI
- keine unbestätigte Produktaussage als vorhandene ASL-Konfiguration dargestellt
- ETG24-Funktionsumfang und Microsoft-Lizenzen werden im Ersttermin geprüft

## Veröffentlichung

Die CI-Prüfung läuft auf jedem Push. GitHub Pages wird absichtlich nur manuell veröffentlicht. Vor einer öffentlichen Freigabe Repository-Sichtbarkeit und Kundenfreigabe prüfen.
