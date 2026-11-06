# Ahmed Hasan – persönliche Website

Statische Website im Stammverzeichnis dieses Repositories. Kein Framework, keine Installation, kein Build nötig. Für den eigenen Webspace `index.html`, `style.css`, `script.js`, `Impressum.html`, `datenschutz.html` und den Ordner `assets/` unverändert hochladen; Startseite ist `index.html`.

## Herunterladen

Die fertige Website liegt zusätzlich als [Ahmed-Hasan-Website.zip](Ahmed-Hasan-Website.zip) bereit. Datei öffnen und in GitHub auf „Download raw file“ klicken. Alternativ oben über **Code → Download ZIP** das vollständige Repository herunterladen. Für private Repositories ist die Anmeldung mit deinem GitHub-Konto erforderlich.

## Enthalten

- Dunkles, responsives Design mit den vorhandenen Porträts und persönlichen Inhalten.
- Selbst erstellter, acht Sekunden langer Video-Hintergrund, lokal eingebunden. Ohne Ton, mit Pause/Start und Unterstützung für reduzierte Bewegung und Datensparen.
- Live-Wetter für Gummersbach über Bright Sky, erst nach bewusster Aktivierung. Keine API-Schlüssel erforderlich. Lade- und Fehlerzustände mit Wiederholung.
- Uhr mit Zeitzone Europe/Berlin, Technologie-Tabs mit Tastatursteuerung und mobile Navigation.
- Projektplaner mit vorausgefüllter E-Mail und kopierbarem Ausweichtext. Der Versand erfolgt im eigenen E-Mail-Programm.
- Kontakt als VCF-Datei und Kopieren der E-Mail-Adresse über die Clipboard API, wenn der Browser dies erlaubt.
- Impressum und um technische Funktionen ergänzte Datenschutzhinweise.

## Anpassen

Texte und Kontaktangaben: `index.html`. Farben: Variablen am Anfang von `style.css`. Funktionalität: `script.js`. Video: `assets/digital-flow.mp4`, Vorschaubild: `digital-flow-poster.webp`. Das Video ist ein für diese Website generiertes abstraktes Linienmotiv; es benötigt keinen externen Videodienst. Bilder und Kennzahlen stammen aus der gelieferten Website, ohne neue Referenzbehauptungen.

## Wetter

Die API wird ausschließlich nach Klick aufgerufen: `api.brightsky.dev/current_weather`, mit festen Koordinaten von Gummersbach. Kein Zugriff auf den Standort des Besuchers, keine automatische Hintergrundabfrage und kein Caching im Browserspeicher. Bright Sky ist im Wettermodul verlinkt und als Quelle genannt. Die Messdaten stammen vom Deutschen Wetterdienst. Die Anzeige bezeichnet sie als Daten einer nahe gelegenen Wetterstation und nennt den Deutschen Wetterdienst sowie Bright Sky als Quelle.

## Technische Prüfung

JavaScript-Syntax und lokale HTML-Verweise geprüft. Videoformat: MP4/H.264, yuv420p, 1280 × 800, 8 Sekunden, Faststart. Live-API mit HTTP 200 und erwarteten Wetterfeldern geprüft. Eine visuelle Browserprüfung war in der bereitgestellten Umgebung mangels Browser-QA-Werkzeug nicht verfügbar.

## Rechtliche Inhalte

Bestehende Anbieter- und Steuerangaben aus dem Upload übernommen. Rechtsverweise und technische Hinweise angepasst; die vollständige juristische und hostingabhängige Prüfung ist damit nicht ersetzt.
