const projects = window.PROJECTS || [];
const featuredGrid = document.getElementById('featuredGrid');
const projectGrid = document.getElementById('projectGrid');
const emptyState = document.getElementById('emptyState');
const filterButtons = [...document.querySelectorAll('.filter')];

function safeAttr(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
function renderTags(tags) { return tags.map(tag => `<span class="tag">${tag}</span>`).join(''); }
function detailUrl(project) { return `projects/${encodeURIComponent(project.slug)}/`; }

function featuredCard(project) {
  return `
    <a class="featured-card" href="${detailUrl(project)}" aria-label="View ${safeAttr(project.name)} project details">
      <div class="featured-card-art" data-visual="${safeAttr(project.visual)}">
        <img class="preview" src="${safeAttr(project.preview)}" alt="${safeAttr(project.name)} preview" loading="lazy" />
      </div>
      <div class="featured-card-body">
        <div class="card-title-row"><h3>${project.name}</h3><span class="card-arrow" aria-hidden="true">↗</span></div>
        <p>${project.description}</p><div class="tags">${renderTags(project.tags)}</div>
      </div>
    </a>`;
}
function projectCard(project) {
  if (project.slug === 'today-pin' && project.privacy) {
    return `
      <article class="project-card project-card-with-action" data-kind="${safeAttr(project.kind)}">
        <a class="project-card-main" href="${detailUrl(project)}" aria-label="View ${safeAttr(project.name)} project details">
          <div class="project-icon-wrap"><img src="${safeAttr(project.icon)}" alt="${safeAttr(project.name)} icon or preview" loading="lazy" /></div>
          <div class="project-card-copy"><h3>${project.name}</h3><p>${project.description}</p><div class="tags">${renderTags(project.tags.slice(0, 2))}</div></div>
          <span class="project-card-arrow" aria-hidden="true">↗</span>
        </a>
        <a class="project-privacy-button" href="${safeAttr(project.privacy)}">Privacy Policy <span aria-hidden="true">→</span></a>
      </article>`;
  }
  return `
    <a class="project-card" data-kind="${safeAttr(project.kind)}" href="${detailUrl(project)}" aria-label="View ${safeAttr(project.name)} project details">
      <div class="project-icon-wrap"><img src="${safeAttr(project.icon)}" alt="${safeAttr(project.name)} icon or preview" loading="lazy" /></div>
      <div class="project-card-copy"><h3>${project.name}</h3><p>${project.description}</p><div class="tags">${renderTags(project.tags.slice(0, 2))}</div></div>
      <span class="project-card-arrow" aria-hidden="true">↗</span>
    </a>`;
}
featuredGrid.innerHTML = projects.filter(p => p.featured).slice(0, 3).map(featuredCard).join('');
function renderProjects(filter = 'all') {
  const visible = filter === 'all' ? projects : projects.filter(project => project.category === filter);
  projectGrid.innerHTML = visible.map(projectCard).join('');
  emptyState.hidden = visible.length !== 0;
}
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.remove('is-active'));
  button.classList.add('is-active'); renderProjects(button.dataset.filter);
}));

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next; localStorage.setItem('cm-theme', next);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#111315' : '#f7f7f5');
});
document.getElementById('year').textContent = new Date().getFullYear();
renderProjects();
