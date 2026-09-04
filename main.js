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

// 그림책 표지를 고르면 아래 내지가 그 책의 것으로 바뀐다
const bookPicks = document.querySelectorAll('.book-pick');
const bookSpreads = document.querySelectorAll('#bookSpreads img');
const bookTitle = document.getElementById('bookTitle');

bookPicks.forEach(fig => {
  fig.addEventListener('click', () => {
    const id = fig.dataset.book;
    const title = fig.dataset.title;
    bookPicks.forEach(f => f.classList.remove('active'));
    fig.classList.add('active');
    if (bookTitle) bookTitle.textContent = title;
    bookSpreads.forEach((img, i) => {
      img.src = `assets2/web/book-${id}-spread-${i + 1}.jpg`;
      img.alt = `${title} 내지 ${i + 1}`;
    });
  });
});

document.querySelectorAll('.shots figure:not(.book-pick) img').forEach(img => {
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
