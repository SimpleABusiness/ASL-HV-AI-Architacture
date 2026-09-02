# ASL Hausverwaltung – KI-Arbeitsmodell

Statische Gesprächs- und Zielbildseite für den ersten KI-/Copilot-Termin mit der ASL Hausverwaltung. Die Seite ist bewusst ein **Diskussionsentwurf**: bekannte Fakten und zu validierende Hypothesen werden getrennt.

## Lokal starten

```bash
python3 -m http.server 8090
```

Danach `http://localhost:8090` öffnen.

## Struktur

- `index.html` – Inhalte, Architektur, Agenda und Quellen
- `styles.css` – responsive Präsentations- und Printdarstellung
- `script.js` – Scrollfortschritt und aktive Navigation
- `assets/simplea-logo.png` – SimpleA-Logo
- `.github/workflows/pages.yml` – statisches GitHub-Pages-Deployment

## Inhaltliche Leitplanken

- keine Habitah-Kundendaten oder -Annahmen übernommen
- keine autonome Außenkommunikation
- keine Rechts-, Zahlungs- oder Vertragsentscheidung durch KI
- keine Produktaussage als vorhandene ASL-Konfiguration dargestellt
- ETG24-Funktionsumfang und Microsoft-Lizenzen werden beim Ersttermin geprüft

## Veröffentlichung

Nach Push auf `main` kann in GitHub unter `Settings → Pages` als Quelle **GitHub Actions** aktiviert werden. Das Repository kann privat bleiben; die Sichtbarkeit einer GitHub-Pages-Seite hängt vom GitHub-Tarif und den Repository-Einstellungen ab.
