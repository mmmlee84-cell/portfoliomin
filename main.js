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

catTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;
    setActive(cat);
    navPanel.classList.remove('open');

    if (cat === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // 해당 카테고리의 첫 프로젝트 위치로 이동 (고정 헤더 높이만큼 offset)
    const target = projectSections.find(s => s.dataset.cat === cat);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - topbar.offsetHeight - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
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
