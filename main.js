const navToggle = document.getElementById('navToggle');
const navPanel = document.getElementById('navPanel');

navToggle.addEventListener('click', () => {
  navPanel.classList.toggle('open');
});

const topbar = document.querySelector('.topbar');
const catTabs = document.querySelectorAll('.cat-tab');
const projectSections = [...document.querySelectorAll('.project')];

function setActive(cat) {
  catTabs.forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
}

function filterByCategory(cat) {
  projectSections.forEach(sec => {
    sec.hidden = cat !== 'all' && sec.dataset.cat !== cat;
  });
}

catTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;
    setActive(cat);
    navPanel.classList.remove('open');

    // 1) 먼저 필터링 — 페이지 높이가 여기서 바뀐다
    filterByCategory(cat);

    // 2) 그 다음 위치 계산 후 이동 (높이 변화 후에 계산해야 위치가 안 튄다)
    if (cat === 'all') {
      window.scrollTo(0, 0);
      return;
    }
    const target = projectSections.find(s => s.dataset.cat === cat);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - topbar.offsetHeight - 8;
    window.scrollTo(0, Math.max(0, top));
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.shots img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

lightbox.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});
