function openMenuOverlay(){
    const menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.toggle('hidden');
}

function closeMenuOverlay(){
    const menuOverlayClose = document.getElementById('close')
    menuOverlayClose.classList.add('hidden');
}

//! Horizontal Scrollbar
document.addEventListener("DOMContentLoaded", function() {
    let scrollAmount = 100; // Anzahl der Pixel, um die gescrollt werden soll
    
    let listElement = document.getElementById('outsider');
    let scrollRightButton = document.getElementById('category-scroll-right');
    let scrollLeftButton = document.getElementById('category-scroll-left');
    
    let hasScrolledRight = false; // Variable, um zu verfolgen, ob nach rechts gescrollt wurde
    
    // Funktion, um den Status der Scroll-Buttons zu aktualisieren
    function updateScrollButtons() {
        let scrollLeft = listElement.scrollLeft;
        let maxScrollLeft = listElement.scrollWidth - listElement.clientWidth;
    
        // Versteckt den rechten Scroll-Button und setzt overflow auf visible, wenn das Ende der Liste erreicht ist und nach rechts gescrollt wurde
        if (scrollLeft >= maxScrollLeft - scrollAmount && hasScrolledRight) {
            scrollRightButton.style.visibility = 'hidden';
            listElement.style.overflow = 'visible';
        } else {
            scrollRightButton.style.visibility = 'visible';
            if (!hasScrolledRight) {
                listElement.style.overflow = 'auto';
            }
        }
    
        // Versteckt den linken Scroll-Button, wenn der Anfang der Liste erreicht ist
        if (scrollLeft <= scrollAmount) {
            scrollLeftButton.style.visibility = 'hidden';
            listElement.style.overflow = 'auto';
        } else {
            scrollLeftButton.style.visibility = 'visible';
        }
    }
    
    // Aktualisiert den Status der Scroll-Buttons, wenn die Seite geladen wird
    updateScrollButtons();
    
    scrollRightButton.addEventListener('click', function() {
        listElement.scrollBy({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
    
        hasScrolledRight = true; // Setzt hasScrolledRight auf true, wenn nach rechts gescrollt wurde
    
        // Aktualisiert den Status der Scroll-Buttons nach dem Scrollen
        setTimeout(updateScrollButtons, 200); // Verzögerung, um das Scrollen abzuschließen
    });
    
    scrollLeftButton.addEventListener('click', function() {
        listElement.scrollBy({
            top: 0,
            left: -scrollAmount,
            behavior: 'smooth'
        });
    
        hasScrolledRight = false; // Setzt hasScrolledRight auf false, wenn nach links gescrollt wurde
    
        // Aktualisiert den Status der Scroll-Buttons nach dem Scrollen
        setTimeout(updateScrollButtons, 200); // Verzögerung, um das Scrollen abzuschließen
    });
    

});


