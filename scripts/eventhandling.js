function openMenuOverlay(){
    const menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.toggle('hidden');
}

function closeMenuOverlay(){
    const menuOverlayClose = document.getElementById('close')
    menuOverlayClose.classList.add('hidden');
}

//! Horizontal Scrollbar

const outsider = document.getElementById('outsider');
const distance = 200;

function scrollLeft() {
  outsider.scrollBy({
    left: -distance,
    behavior: 'smooth'
  });
}

function scrollRight() {
  outsider.scrollBy({
    left: distance,
    behavior: 'smooth'
  });
}