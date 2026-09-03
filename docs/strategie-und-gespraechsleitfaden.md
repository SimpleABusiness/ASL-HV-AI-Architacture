# Strategie- und Gesprächsleitfaden

Die ausführliche interne Vorbereitung liegt in Freddys Obsidian unter:

`Hermes Notes/Alfis Notes/Dokumente/ASL Hausverwaltung – KI-Praxis-Check und Vor-Ort-Termin.md`

## Ziel des Erstgesprächs

1. Copilot-/Outlook-Problem technisch und fachlich eingrenzen.
2. Einen typischen Vorgang durch Outlook, etg24, lokale Fachsoftware und Papier verfolgen.
3. Einen kleinen, sicheren Pilotprozess auswählen.
4. Datenrahmen, menschliche Freigabe und Erfolgsmessung festlegen.

## Empfohlener Einstieg

**ChatGPT & Copilot Praxis-Check mit Outlook-Fokus** – keine pauschale Transformation und kein vorschneller Softwarewechsel.

### Gesprächslogik

- Produkt und Lizenz identifizieren.
- Primäres Exchange-Online-Postfach, Outlook-Client, Konto und Update-/Datenschutzeinstellungen prüfen.
- Ein konkretes Fehlbeispiel reproduzieren.
- Drei sichere Demos mit anonymisierten Daten: Thread-Zusammenfassung, Antwortentwurf, E-Mail-Coaching.
- Einen häufigen Mailtyp als Mini-Pilot wählen.

## Leitplanken

- keine autonome Außenkommunikation
- keine Rechts-, Zahlungs- oder Vertragsentscheidung durch KI
- keine ungeprüfte Übernahme von Fristen, Beträgen oder personenbezogenen Daten
- keine Altsoftware-Ablösung ohne belastbare Ist-Aufnahme
- kein Big-Bang-Digitalisierungsprojekt für Papierakten

## Kundenpräsentation

`index.html` ist eine interaktive Präsentation mit zwölf Folien:

1. Gesprächseinstieg,
2. vorhandene Systemlandschaft,
3. sichtbare manuelle Arbeit und Kontextwechsel am heutigen Beispielprozess,
4. optimierter SOLL-Prozess im direkten Vergleich zum IST,
5. Reifeweg von heutiger Einzelnutzung über Skills und verbundene Workflows bis zu begrenzter Agentic AI,
6. drei sofort testbare Outlook-/Copilot-Routinen,
7. Copilot-Diagnose,
8. interaktive Zielarchitektur eines möglichen ASL-Agenten mit Laufzeit, Tools, Wissen, Memory, Workflow und Freigabegrenze,
9. konkreter Pilotfall „Schadensmeldung per E-Mail“ inklusive Prompt, Systemübergaben und Zeitmessung,
10. mögliche SimpleA-Unterstützung,
11. gemeinsame Priorisierung,
12. Quellen und Datenrahmen.

Die Folien lassen sich per Tastatur steuern. Eine im Gespräch gewählte Priorität wird ausschließlich lokal im Browser gespeichert. Die Präsentation vermeidet Preise und bindende Leistungsversprechen; ein konkretes Angebot folgt erst nach der Ist-Aufnahme.

### Neue Dramaturgie nach dem IST-Prozess

Auf die heutige manuelle Prozesskette folgt unmittelbar derselbe Vorgang als SOLL-Hypothese: Eingang → einmal strukturieren → gezielten Kontext beziehen → Entwurf und Vorgang vorbereiten → Freigabe durch Anita. Der direkte Vergleich macht klar, dass nicht „AI macht alles“, sondern weniger Wiederholung und kontrollierte Übergaben das Ziel sind.

Die folgende Reifestufen-Folie trennt vier Ausbaustufen: heutiger AI-Assistent mit Einzelprompt, wiederverwendbare Skills, verbundener Workflow mit Tools und freigegebenem Kontext sowie Agentic AI als spätere Zieloption. Empfehlung für ASL: Stufe 1–2 stabilisieren und genau einen Prozess bis Stufe 3 pilotieren; Stufe 4 erst nach messbarem Nutzen, Governance und technischen Tests.

### Agenten-Zielbild

Die Architekturfolie zeigt bewusst eine **Zieloption**, keinen bestätigten Ist-Stand: Anita interagiert in Teams oder Microsoft 365 Copilot mit einem ASL-Agenten. Als bevorzugte Microsoft-native Laufzeit werden Copilot Studio und Power Platform im ASL-Tenant geprüft. Power Automate übernimmt ereignisgesteuerte Abläufe; Outlook-Connector und eine geprüfte etg24-REST-API sind mögliche Tools. SharePoint/OneDrive liefern freigegebenes Wissen, SharePoint Lists oder Dataverse ausschließlich bestätigten Vorgangs- und Kontextstatus. Die Altsoftware bleibt zunächst ein manueller Kontrollpunkt.

Die Begriffe `Skill`, `Tool`, `Workflow` und `Memory` werden auf der Folie interaktiv erklärt. „Skill“ ist hier eine verständliche fachliche Bezeichnung für eine wiederverwendbare Fähigkeit aus Anweisung, Prompt, Prüfschritten und gegebenenfalls Agent Flow – keine unbestätigte Microsoft-Produktbezeichnung. Externe Kommunikation sowie Rechts-, Zahlungs- und Vertragsentscheidungen bleiben bei Anita.

### Pilotfall und Zeitmessung

Die neue Prozessfolie verwendet bewusst die vorhandenen Werkzeuge: Outlook als Eingang und Entwurfsort, Copilot für belegte Extraktion und Formulierung, ASL als fachlichen Kontrollpunkt sowie etg24 für den Vorgang. In Stufe 1 erfolgen die Übergaben geprüft über die vorhandenen Oberflächen. Eine etg24-REST-API oder Microsoft Graph/Power Automate ist nur eine spätere Option nach Lizenz-, Feld-, Berechtigungs- und Datenschutzprüfung – kein bereits zugesagter Bestandteil.

Die Zeitwerte `12–15 Minuten heute` und `6–8 Minuten Ziel` sind Messhypothesen. Im Gespräch zuerst drei bis fünf reale, anonymisierte Fälle stoppen. Die Modellrechnung nutzt konservativ sechs Minuten Ersparnis: `6 Minuten × 10 Fälle/Woche × 46 Wochen ÷ 60 = 46 Stunden/Jahr`. Erst nach der Baseline darf daraus ein belastbarer Nutzen abgeleitet werden.
