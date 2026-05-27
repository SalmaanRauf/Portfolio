# Salmaan Rauf Portfolio

A static portfolio site for `salmaanrauf.dev`, redesigned as a Swiss industrial engineering index.

## Current Direction

- Matte paper canvas with carbon ink and a single vermilion accent
- Hard grid, visible rules, square corners, grayscale product imagery
- Current role-first positioning: Software / AI Engineer at Robert Half / Protiviti
- Education updated to completed B.S. Computer Science at Cal State Fullerton
- No jQuery, no template animation stack, no dark cyberpunk/glow treatment

Durable visual rules live in `DESIGN.md`.

## Structure

```text
index.html              Main page
DESIGN.md               Accepted visual direction and drift rules
assets/css/main.css     Site design system and responsive layout
assets/js/main.js       Menu, reveal, active nav, scroll progress, resume modal
images/                 Profile and project assets
files/                  Resume PDF
robots.txt              Search crawler hints
sitemap.xml             Sitemap for salmaanrauf.dev
```

## Run Locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## QA Checklist

- Verify no console errors.
- Check desktop, tablet, mobile, and one awkward breakpoint.
- Confirm no horizontal overflow, clipped headings, or overlapping UI.
- Confirm copy does not describe Salmaan as a current student.
- Confirm project and contact links work.

## Contact

- Email: `raufsalmaan1@gmail.com`
- GitHub: `https://github.com/SalmaanRauf`
- LinkedIn: `https://www.linkedin.com/in/salmaan-rauf/`
