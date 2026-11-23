'use strict';
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..');
const chapters = JSON.parse(fs.readFileSync(path.join(root, 'chapters.json'), 'utf8'));
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

for (const current of chapters) {
  const groups = chapters.map(chapter => {
    const active = chapter.page === current.page;
    const relative = path.posix.relative(path.posix.dirname(current.page), chapter.page).replace(/index\.html$/, '');
    const topics = chapter.topics.map(([id, label]) => `<a href="${active ? '' : relative}#${escape(id)}">${escape(label)}</a>`).join('');
    return `<details class="chapter-group${active ? ' is-current-chapter' : ''}"${active ? ' data-current-chapter open' : ''}><summary><span class="chapter-number">Chapter ${chapter.number}</span><span class="chapter-name">${escape(chapter.title)}</span>${active ? '<span class="nav-sr-only"> (current chapter)</span>' : ''}</summary><div class="chapter-topics">${topics}</div></details>`;
  }).join('');
  const navigation = `<aside class="sidebar" id="chapter-navigation"><p class="eyebrow">Textbook contents</p><nav class="book-chapters" aria-label="Textbook chapters">${groups}</nav><p class="sidebar-note">Read at your own pace.<br>Listen as often as you need.</p></aside>`;
  const file = path.join(root, current.page), html = fs.readFileSync(file, 'utf8');
  if (!/<aside\b[^>]*id="chapter-navigation"[^>]*>[\s\S]*?<\/aside>/.test(html)) throw new Error('Missing navigation in ' + current.page);
  const updated = html.replace(/<aside\b[^>]*id="chapter-navigation"[^>]*>[\s\S]*?<\/aside>/, navigation);
  if (process.argv.includes('--check')) {
    if (html !== updated) throw new Error('Navigation needs rebuilding: ' + current.page);
  } else fs.writeFileSync(file, updated);
}
console.log(`${process.argv.includes('--check') ? 'Verified' : 'Built'} shared navigation for ${chapters.length} chapters.`);
