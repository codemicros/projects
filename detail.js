const projects = window.PROJECTS || [];
const slug = document.body.dataset.projectSlug;
const project = projects.find(item => item.slug === slug);

function safeAttr(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
function renderTags(tags = []) { return tags.map(tag => `<span class="tag">${safeAttr(tag)}</span>`).join(''); }

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('cm-theme', next);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#111315' : '#f7f7f5');
});

document.getElementById('year').textContent = new Date().getFullYear();

if (!project) {
  document.getElementById('projectDetail').innerHTML = `
    <section class="detail-not-found"><span class="eyebrow">PROJECT NOT FOUND</span><h1>This project page is unavailable.</h1><a class="button button-primary" href="../../">Back to projects →</a></section>`;
} else {
  document.title = `${project.name} — Code Micros`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', project.summary);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', `${project.name} — Code Micros`);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', project.summary);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://projects.codemicros.com/projects/${project.slug}/`);

  const actionLinks = [...(project.links || [])];
  if (project.privacy && project.privacyButton) {
    actionLinks.push({ label: 'Privacy Policy', url: project.privacy, primary: actionLinks.length === 0 });
  }

  const actionButtons = actionLinks.map(link =>
    `<a class="button ${link.primary ? 'button-primary' : 'button-secondary'}" href="${safeAttr(link.url)}" target="_blank" rel="noopener noreferrer">${safeAttr(link.label)} <span aria-hidden="true">↗</span></a>`
  ).join('');

  const policyLinks = [
    project.privacy && !project.privacyButton ? `<a href="${safeAttr(project.privacy)}" target="_blank" rel="noopener noreferrer">Privacy Policy ↗</a>` : '',
    project.support ? `<a href="${safeAttr(project.support)}">Support</a>` : ''
  ].filter(Boolean).join('');

  const screenshots = (project.screenshots || []).map((src, index) => `
    <button class="screenshot-card" type="button" data-full-image="${safeAttr(src)}" aria-label="Open ${safeAttr(project.name)} screenshot ${index + 1}">
      <img src="${safeAttr(src)}" alt="${safeAttr(project.name)} screenshot ${index + 1}" loading="lazy" />
    </button>`).join('');

  const related = projects.filter(item => item.slug !== project.slug)
    .sort((a, b) => Number(b.category === project.category) - Number(a.category === project.category))
    .slice(0, 3);

  document.getElementById('projectDetail').innerHTML = `
    <section class="detail-hero">
      <div class="detail-hero-copy">
        <a class="back-link" href="../../#all-projects">← All Projects</a>
        <div class="detail-title-row">
          <div class="detail-icon"><img src="${safeAttr(project.icon)}" alt="${safeAttr(project.name)} icon" /></div>
          <div>
            <div class="eyebrow">${safeAttr(project.typeLabel)} • CODE MICROS</div>
            <h1>${safeAttr(project.name)}</h1>
          </div>
        </div>
        <p class="detail-lead">${safeAttr(project.summary)}</p>
        <div class="tags detail-tags">${renderTags(project.tags)}</div>
        <div class="detail-actions">${actionButtons}</div>
      </div>
      <div class="detail-hero-visual" data-visual="${safeAttr(project.visual)}">
        <img src="${safeAttr(project.preview)}" alt="${safeAttr(project.name)} product preview" />
      </div>
    </section>

    <section class="detail-content-grid">
      <div class="detail-main-copy">
        <span class="detail-section-label">ABOUT THE PROJECT</span>
        <h2>Built to make a specific job simpler.</h2>
        <p>${safeAttr(project.about)}</p>
      </div>
      <aside class="detail-facts">
        <div><span>Product</span><strong>${safeAttr(project.typeLabel)}</strong></div>
        <div><span>Status</span><strong>Live</strong></div>
        <div><span>Built by</span><strong>Code Micros</strong></div>
        ${policyLinks ? `<div class="detail-policy-links">${policyLinks}</div>` : ''}
      </aside>
    </section>

    <section class="detail-section features-section">
      <div class="detail-section-heading"><span class="detail-section-label">KEY FEATURES</span><h2>What it does.</h2></div>
      <div class="feature-list">${project.features.map((feature, index) => `<div class="feature-item"><span>${String(index + 1).padStart(2, '0')}</span><p>${safeAttr(feature)}</p></div>`).join('')}</div>
    </section>

    <section class="detail-section screenshots-section">
      <div class="detail-section-heading"><span class="detail-section-label">PRODUCT PREVIEW</span><h2>Screenshots.</h2><p>Real visuals from the live product and store listing.</p></div>
      <div class="screenshot-track">${screenshots}</div>
    </section>

    <section class="detail-section related-section">
      <div class="section-heading-row"><h2>MORE FROM CODE MICROS</h2><a class="text-link" href="../../#all-projects">View all projects →</a></div>
      <div class="related-grid">${related.map(item => `
        <a class="related-card" href="../${safeAttr(item.slug)}/">
          <div class="related-card-icon"><img src="${safeAttr(item.icon)}" alt="" loading="lazy" /></div>
          <div><h3>${safeAttr(item.name)}</h3><p>${safeAttr(item.description)}</p><div class="tags">${renderTags(item.tags.slice(0,2))}</div></div>
          <span aria-hidden="true">→</span>
        </a>`).join('')}</div>
    </section>
  `;

  const dialog = document.getElementById('imageDialog');
  const dialogImage = document.getElementById('dialogImage');
  document.querySelectorAll('[data-full-image]').forEach(button => button.addEventListener('click', () => {
    dialogImage.src = button.dataset.fullImage;
    dialogImage.alt = button.querySelector('img').alt;
    if (typeof dialog.showModal === 'function') dialog.showModal();
  }));
  document.getElementById('dialogClose')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
}
