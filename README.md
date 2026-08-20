# Technical 16:9 HTML/CSS Slide Template

A reusable, AI-agent-friendly presentation template inspired by the supplied
reference slide.

## Canvas

- Aspect ratio: **16:9**
- Working size: **1600 × 900 px**
- Print/PDF size: 1600 × 900 px
- Main colors:
  - Navy: `#073D52`
  - Gold: `#C6A44A`
  - Blue text: `#244D61`
  - White: `#FFFFFF`

## Design system

The template deliberately keeps a small set of visual rules:

1. Dark navy header across the full width.
2. Thin gold separator below the header.
3. White/off-white technical canvas.
4. Very subtle geometric background created only with CSS.
5. Navy as the primary text/structure color.
6. Gold used as a restrained accent.
7. Circular page number in the bottom-right.
8. Khmer and English can coexist in the title.
9. No decorative elements should compete with the technical content.

## AI-agent generation strategy

Have the agent select a slide type first:

- `content` — explanation, findings, requirements
- `two-column` — architecture, comparison, workflow
- `code` — implementation details
- Add more semantic templates later, such as:
  - `title`
  - `section`
  - `metrics`
  - `timeline`
  - `table`
  - `diagram`

The agent should change content, not the design tokens, unless the user
explicitly requests a visual redesign.

## Recommended content rules

For a technical slide:

- One primary message per slide.
- Prefer 3–5 major points.
- Keep body text around 18–24 px.
- Keep headings around 27–32 px.
- Avoid paragraphs longer than 2–3 lines.
- Use cards only when they communicate a structural relationship.
- Use gold for emphasis, not for large areas.
- Keep the page number fixed in the lower-right corner.

## Rendering

The HTML can be rendered by Chromium/Playwright at:

`1600 × 900`

For PDF, use browser print-to-PDF with backgrounds enabled.

For PNG, use a screenshot of each `.slide` element at 1600 × 900.

## File structure

```text
technical_slide_template/
├── index.html
├── styles.css
└── README.md
```
