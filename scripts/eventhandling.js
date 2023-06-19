function openMenuOverlay(){
    const menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.toggle('hidden');
}

function closeMenuOverlay(){
    const menuOverlayClose = document.getElementById('close')
    menuOverlayClose.classList.add('hidden');
}

//! Horizontal Scrollbar
        // Fügt einen Event-Listener hinzu, der ausgeführt wird, wenn das DOM vollständig geladen ist
        window.addEventListener('DOMContentLoaded', (event) => {
            // Definiert die Elemente, die manipuliert werden sollen
            const scrollContent = document.getElementById('outsider');
            const scrollLeftButton = document.getElementById('category-scroll-left');
            const scrollRightButton = document.getElementById('category-scroll-right');

            // Funktion, die überprüft, ob die Scroll-Position am Anfang oder am Ende der Liste ist
            // und die Sichtbarkeit der Buttons entsprechend ändert
            const checkButtonVisibility = () => {
                // Ermittelt die aktuelle Scroll-Position und das Maximum, das gescrollt werden kann
                const scrollPosition = scrollContent.scrollLeft;
                const scrollMax = scrollContent.scrollWidth - scrollContent.clientWidth;

                // Wenn die Scroll-Position 0 oder kleiner ist, wird der linke Button ausgeblendet, sonst wird er angezeigt
                scrollLeftButton.style.visibility = (scrollPosition <= 0) ? 'hidden' : 'visible';
                // Wenn die Scroll-Position gleich oder größer als das Maximum ist, wird der rechte Button ausgeblendet, sonst wird er angezeigt
                scrollRightButton.style.visibility = (scrollPosition >= scrollMax) ? 'hidden' : 'visible';
            };

            // Fügt einen Event-Listener für das Klick-Event des linken Buttons hinzu
            // Wenn der Button geklickt wird, scrollt die Liste 100px nach links
            scrollLeftButton.addEventListener('click', () => {
                scrollContent.scrollBy({ left: -100, behavior: 'smooth' });
            });

            // Fügt einen Event-Listener für das Klick-Event des rechten Buttons hinzu
            // Wenn der Button geklickt wird, scrollt die Liste 100px nach rechts
            scrollRightButton.addEventListener('click', () => {
                scrollContent.scrollBy({ left: 100, behavior: 'smooth' });
            });

            // Fügt einen Event-Listener für das Mausrad hinzu
            scrollContent.addEventListener('wheel', (event) => {
                // Verhindert das Standardverhalten des Mausrads
                event.preventDefault();
                // Scrollt die Liste horizontal basierend auf der Drehrichtung des Mausrads
                scrollContent.scrollBy({ left: event.deltaY, behavior: 'smooth' });
            });

            // Variablen für die Drag-and-Drop-Funktionalität
            let isDown = false;
            let startX;
            let scrollLeft;

            scrollContent.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - scrollContent.offsetLeft;
                scrollLeft = scrollContent.scrollLeft;
            });

            scrollContent.addEventListener('mouseleave', () => {
                isDown = false;
            });

            scrollContent.addEventListener('mouseup', () => {
                isDown = false;
            });

            scrollContent.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - scrollContent.offsetLeft;
                const walk = (x - startX) * 1; // scroll-fast
                scrollContent.scrollLeft = scrollLeft - walk;
            });

            // Fügt einen Event-Listener für das Scroll-Event der Liste hinzu
            // Wenn die Liste gescrollt wird, wird die Funktion zur Überprüfung der Button-Sichtbarkeit aufgerufen
            scrollContent.addEventListener('scroll', checkButtonVisibility);

            // Fügt einen Event-Listener für das Klick-Event jedes Listenelements hinzu
            const listItems = scrollContent.querySelectorAll('.swiper-wrapper-container');
            listItems.forEach(item => {
                item.addEventListener('click', () => {
                    // Entfernt die is-active Klasse von allen Listenelementen
                    listItems.forEach(i => i.classList.remove('is--active'));
                    // Fügt die is-active Klasse zum angeklickten Element hinzu
                    item.classList.add('is--active');
                });
            });

            // Ruft die Funktion zur Überprüfung der Button-Sichtbarkeit auf, wenn die Seite geladen wird
            checkButtonVisibility();
        });


        // Entfernen der Klasse "d-none" nach Klicken



function openSearchOverlay() {
    let openSearch = document.getElementById('search-modal-toggle')
    openSearch.classList.remove('d-none');
}

function closeSearchOverlay() {
    let closeSearch = document.getElementById('search-modal-toggle')
    closeSearch.classList.add('d-none');

}

// Definieren Sie die IDs des Sentinel und des Containers, und die Ziel-Klasse
const sentinelId = 'menu-sentinel';
const containerClass = 'restaurant-menu-nav';
const shadowClass = 'restaurant-menu-nav-shadow';

// Erstellen Sie einen Observer, der eine Funktion ausführt, wenn das Sentinel im oder außerhalb des Viewports ist
let observer = new IntersectionObserver(function(entries) {
  // Iteriere durch alle Einträge
  entries.forEach(function(entry) {
    // Wenn das Sentinel im Viewport ist
    if (entry.isIntersecting) {
      // Fügen Sie den Schatten zum Container hinzu
      document.querySelector(`.${containerClass}`).classList.add(shadowClass);
    } else {
      // Wenn das Sentinel nicht im Viewport ist, entfernen Sie den Schatten vom Container
      document.querySelector(`.${containerClass}`).classList.remove(shadowClass);
    }
  });
}, { threshold: [0] });  // Auslösen, wenn 0% des Ziels sichtbar sind

// Beobachten Sie das Sentinel
observer.observe(document.querySelector(`#${sentinelId}`));

const menuNav = document.querySelector('.restaurant-menu-nav');
const menuWrapper = document.querySelector('.restaurant-menu-wrapper');

menuWrapper.addEventListener('scroll', function() {
  if (menuWrapper.scrollTop > 0) {
    menuNav.classList.add('has-shadow');
  } else {
    menuNav.classList.remove('has-shadow');
  }
});

