# Jairus Nazareno — Portfolio

A custom, responsive portfolio built with HTML, CSS, and vanilla JavaScript for GitHub Pages.

## Design & interactions

- Dark graphite and electric lime visual system with expressive typography.
- Personal portraits in the hero and About section.
- CSS interface studies for four featured projects, plus two compact project entries.
- Project filters: All work, Full stack, Security, Mobile, and Frontend.
- Scroll reveals, rotating badges, floating labels, radar animation, a moving text strip, subtle card tilt, and magnetic links.
- A small canvas constellation pauses when the hero is offscreen or the tab is hidden.
- A persistent motion toggle and automatic support for the system’s reduced-motion setting.
- Accessible mobile navigation with Escape dismissal, native keyboard controls, visible focus states, and a skip link.

Project interface studies are illustrative compositions, not screenshots of the applications. Public links are included only where available.

## Projects

1. [TopDent — Dental Clinic System](https://topdent.website/) — [source code](https://github.com/jrsnzrn/dental-clinic-system-group).
2. [CyberSafe PH](https://github.com/jrsnzrn/CyberSafe) — scam and phishing awareness MVP; includes prototype admin screens.
3. Serin Calendar — a personal calendar I built for my wife, available as a local web/Android project; no published demo or source URL.
4. [E-Commerce Shop](https://github.com/jrsnzrn/ecomerce_fullstack_v1) — ASP.NET Core and JavaScript e-commerce application.
5. [Library Web System](https://github.com/jrsnzrn/library-web-system)
6. [Portfolio Website](https://github.com/jrsnzrn/jrsnzrn.github.io)

The dental clinic application is featured once as TopDent, with its custom domain as the live link.

## Local preview

Open `index.html` in a browser, or serve the project folder:

```powershell
py -m http.server 5173
```

Then visit `http://localhost:5173`.

No package installation or build step is required. Google Fonts enhance the typography; local fallback fonts are provided.

## Structure

```text
index.html
style.css
script.js
images/
  favicon.svg
  jairus-portrait.png
  jairus-about.png
assests/
  Jairus-Nazareno-CV.pdf.pdf
```

## Publishing

Push the changes to the GitHub branch configured as the GitHub Pages source. The website is hosted at https://jrsnzrn.github.io/.
