const navToggle = document.getElementById('navToggle');
const navPanel = document.getElementById('navPanel');
const projNav = document.getElementById('projNav');

navToggle.addEventListener('click', () => {
  navPanel.classList.toggle('open');
});

projNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navPanel.classList.remove('open'));
});

const catTabs = document.querySelectorAll('.cat-tab');
const projLinks = document.querySelectorAll('.proj-nav a');
const projectSections = document.querySelectorAll('.project');

function filterByCategory(cat) {
  projectSections.forEach(sec => {
    sec.hidden = cat !== 'all' && sec.dataset.cat !== cat;
  });
  projLinks.forEach(a => {
    a.hidden = cat !== 'all' && a.dataset.cat !== cat;
  });
}

catTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    catTabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterByCategory(btn.dataset.cat);
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.gallery img, .sub-block img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
});
