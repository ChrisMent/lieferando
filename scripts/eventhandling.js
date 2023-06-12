function openMenuOverlay(){
    const menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.toggle('hidden');
}

function closeMenuOverlay(){
    const menuOverlayClose = document.getElementById('close')
    menuOverlayClose.classList.add('hidden');
}

//! Horizontal Scrollbar

window.onload = function() {
    var scrollAmount = 100; // Anzahl der Pixel, um die gescrollt werden soll
    var scrollDuration = 200; // Dauer des Scrollvorgangs in Millisekunden

    var listElement = document.querySelector('.swiper-wrapper');
    var scrollRightButton = document.getElementById('category-scroll-right');
    var scrollLeftButton = document.getElementById('category-scroll-left');

    scrollRightButton.addEventListener('click', function() {
        listElement.scrollBy({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    scrollLeftButton.addEventListener('click', function() {
        listElement.scrollBy({
            top: 0,
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
}




