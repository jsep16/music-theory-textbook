# Music theory textbook

- Preserve approved chapter text, charts, interval spelling, and student PDF content.
- Remove media asset identifier numbers from graphics, while retaining musical and instructional labels.
- Match the Chapter 2 blue musictheory.net practice-card style in every chapter. Digital editions use matching practice panels with ordinary links.
- Host recordings beside their examples with accessible audio controls. No QR codes are needed to play website audio.
- Keep all instructor answer PDFs out of the published repository. Client-side answer-checking rules are public by necessity.
- Preserve existing chapter URLs and test cross-chapter links when adding chapters.
- Run `node scripts/check-site.cjs` from the repository root before publishing, followed by relevant browser checks where browser controls are available.
- Publish normal commits without force-pushing. Verify GitHub Pages deployment and the affected public URLs afterward.
