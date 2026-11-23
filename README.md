# Music Theory Textbook

Chapter 2 is a self-contained web chapter with an audio player beside the score, all approved chapter text and tables, notation graphics, dotted clef tracing guides, and the printable student PDF. The instructor answer key is intentionally excluded.

## Preview

Open `index.html` in a browser. All images, the MP3, and the PDF use local relative paths. No package installation or build is required. For a local server, use any static-file server with this directory as its root.

## Publish on GitHub Pages

1. Create a repository named `music-theory-textbook` in your GitHub account. Use a public repository for GitHub Free Pages hosting.
2. Upload the **contents** of this directory to the repository root, keeping the `assets` folder intact. `index.html` must be at the repository root, not inside another folder.
3. Open repository **Settings → Pages**. Under Source select **Deploy from a branch**, then **main** and **/(root)**. Save.
4. Wait for GitHub's Pages deployment to complete. GitHub displays the final HTTPS address in Settings → Pages. It usually has the form `https://jsep16.github.io/music-theory-textbook/`.
5. Test the audio player and PDF download at the published address before adding it to Wix.

The public repository and published website are publicly accessible. No student names, response records, private documents, or instructor answer PDF are included. Local answer-checking rules are necessarily readable in the public website source. Typed practice answers stay only in the current page; the site checks answers locally and does not submit them, record grades, or store responses after a reload.

## Embed in Wix

1. In the Wix editor, create the chapter page.
2. Choose **Add Elements → Embed Code → Embed a Site** (or the equivalent Embed Site control in Wix Studio).
3. Paste the published HTTPS website address. Set the embed to the available content width and a generous height, then check both desktop and mobile layouts.
4. Add an **Open full chapter** link to the same address for readers who prefer a separate full-width view.
5. Publish the Wix page and test playback on it. Audio starts when the student presses Play, not automatically.

An example iframe is in `wix-embed-example.txt`. Replace its marked address with the verified published address before using it.

## Content and assets

- `index.html`: chapter text, tables, figures, and controls.
- `styles.css`: responsive reading layout and print styling.
- `app.js`: section navigation, enlargement dialog, repeat/speed controls, and the compact player that follows listening students while they scroll.
- `practice.js`: answer checking for the original note, rhythm, time-signature, and score-reading questions; mouse/touch/stylus tracing with undo and clear. Drawing is freehand practice and is not automatically assessed.
- `assets/chorale.mp3`: the supplied Media 1 recording, hosted with the chapter.
- `assets/chapter-2-print.pdf`: latest approved 21-page chapter PDF.
- `content-audit.json`: source coverage summary; no answer key or credentials.

The annotated score and guide sit side by side on wider screens. On phones, the score appears above an independently scrollable guide so students can consult both.

Keep descriptive titles and pedagogical annotations, but do not display media asset identifier numbers on figures in future chapters.


## Chapters

- [Chapter 2 · Notation](https://jsep16.github.io/music-theory-textbook/)
- [Chapter 3 · Intervals](https://jsep16.github.io/music-theory-textbook/chapter-3/)
- [Chapter 5 · Key Signatures](https://jsep16.github.io/music-theory-textbook/chapter-5/)

## Ongoing editing and publication

Every chapter sidebar lists all published chapters with collapsible topic lists. The current chapter starts expanded, and the current topic is highlighted while reading. On phones, the Chapters button opens the same navigator. Native disclosure controls work with keyboard input and without JavaScript.

To add or rename a chapter or topic, update `chapters.json` and run `node scripts/build-navigation.cjs`. The generator writes relative links into every listed chapter so navigation works on GitHub Pages, local previews, and without JavaScript. Keep `book-navigation.css` and `book-navigation.js` linked from each chapter; they provide the shared styling, mobile menu, and current-topic indication. `scripts/check-site.cjs` verifies that the navigation matches the shared list and all topic links resolve.

This repository is the working source for the whole digital textbook. Keep chapter content in stable locations: Chapter 2 at the root, Chapter 3 in `chapter-3/`, and future chapters in corresponding chapter folders. Approved student PDFs belong with each chapter; instructor answer PDFs stay outside this repository.

Before publishing, run `node scripts/check-site.cjs` and check the affected browser flows when possible. Commit each coherent correction with a descriptive message, then push normally to `main`. Existing GitHub Pages settings publish that branch. Check the Pages workflow and affected public URLs before reporting completion. Git history provides a record of changes and recovery points.

Publishing uses a dedicated SSH deploy key attached only to this repository. Its private key and verified host-key file stay outside the website repository, and this checkout's local Git configuration selects them. No GitHub CLI account-wide authorization or manual website uploads are needed for regular chapter work. Keep the private key private; never commit it. A replacement key on another machine requires repository-owner approval.
