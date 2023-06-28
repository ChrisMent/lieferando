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
            // Entfernt die is--active Klasse von allen Listenelementen
            listItems.forEach(i => i.classList.remove('is--active'));
            // Fügt die is--active Klasse zum angeklickten Element hinzu
            item.classList.add('is--active');
        });
    });


//! Observer Intersection

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          //console.log(`Beobachtetes Element: ${entry.target.textContent}`); // Fügt eine Konsolenausgabe hinzu
          listItems.forEach(i => i.classList.remove('is--active'));
          const listItem = Array.from(listItems).find(i => i.textContent.trim() === entry.target.textContent.trim());
          if (listItem) {
              listItem.classList.add('is--active');
              //console.log(`is--active Klasse hinzugefügt zu: ${listItem.textContent}`); // Fügt eine Konsolenausgabe hinzu
              // Scrollt die horizontale Navigation zur Mitte des aktiven Elements
              scrollContent.scrollLeft = listItem.offsetLeft - scrollContent.clientWidth / 2 + listItem.clientWidth / 2;
          } else {
              //console.log(`Kein passendes Listenelement gefunden für: ${entry.target.textContent}`); // Fügt eine Konsolenausgabe hinzu
          }
      }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll('.headline-meal h2').forEach(element => {
  observer.observe(element);
  //console.log(`Beobachte Element: ${element.textContent}`); // Fügt eine Konsolenausgabe hinzu
});




//! Button visibility

  scrollContent.addEventListener('scroll', checkButtonVisibility);

    // Ruft die Funktion zur Überprüfung der Button-Sichtbarkeit auf, wenn die Seite geladen wird
    checkButtonVisibility();
});


// Entfernen der Klasse "d-none" nach Klicken




//! Suchleiste einblenden
let searchShadow = document.querySelector('.restaurant-menu-nav');
let openSearch = document.getElementById('search-modal-toggle');
let closeSearch = document.getElementById('search-modal-toggle');


function openSearchOverlay() {
  searchShadow.style.clipPath = 'none';
  openSearch.classList.remove('d-none')
}

function closeSearchOverlay() {
  // Füge hier den gewünschten Wert für den clip-path hinzu, wenn der Such-Overlay geschlossen wird
  closeSearch.classList.add('d-none')
    searchShadow.style.clipPath = 'inset(10px -10px -10px -10px)';
}

document.addEventListener('DOMContentLoaded', function() {
  // Klickereignis für den Button zum Öffnen des Such-Overlays
  document.getElementById('search-button').addEventListener('click', openSearchOverlay);

  // Klickereignis für den Button zum Schließen des Such-Overlays
  document.getElementById('search-modal-close').addEventListener('click', closeSearchOverlay);
});

//! Schatten entfernen vom Menu

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


//! Restaurant Menu rendern
fetch("/lieferando/ressources/data.json")
.then((response) => {
return response.json();
})
.then((meals) => {

  meals.forEach((meal) => {

    // Erstellen Sie eine Variable für den Container basierend auf der Kategorie des aktuellen Elements
    const containerId = meal.category.replace(/ /g, ""); // Entfernen Sie Leerzeichen aus dem Kategorienamen, um eine gültige ID zu erhalten
    const container = document.getElementById(containerId);

    // Überprüfen Sie, ob der Container existiert, bevor Sie Elemente hinzufügen
    if (container) {

      const tmpl = document.getElementById('meal-card-template').content.cloneNode(true);

      tmpl.querySelector('.meal').innerText = meal.meal;
      tmpl.querySelector('.desc1').innerText = meal.desc1 ? meal.desc1 : '';
      tmpl.querySelector('.desc2').innerText = meal.desc2 ? meal.desc2 : '';
      tmpl.querySelector('.price').innerText = meal.price ? meal.price.toFixed(2).replace(".", ",") + " €" : '';
      tmpl.querySelector('.addInfo').innerText = meal.addInfo ? meal.addInfo : '';
      if (meal.img) tmpl.querySelector('.img').setAttribute('src', meal.img);

      container.appendChild(tmpl);
    }

  })

});

//! Scroll to top Button

document.addEventListener("DOMContentLoaded", function() {
  var button = document.querySelector(".scroll-top-button");

  // Hide the button initially
  button.style.opacity = "0";
  button.style.visibility = "hidden";

  // Store the last scroll position
  var lastScrollTop = 0;

// Store the height of the footer
var footerHeight = document.querySelector('footer').offsetHeight;

// Define scroll function
function checkScroll() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var windowHeight = window.innerHeight;
  var bodyHeight = document.body.offsetHeight;
  var footerHeight = document.querySelector('footer').offsetHeight;

  // If the scroll position is more than 0, the user is scrolling down, and the user has not scrolled past the footer, show the button
  if (scrollTop > 0 && scrollTop > lastScrollTop && scrollTop < bodyHeight - windowHeight - footerHeight) {
      setTimeout(function() {
          button.style.visibility = "visible";
          button.style.opacity = "1";
          button.style.transition = "opacity 0.5s linear";
      }, 1000);
  }
  // Otherwise, hide the button immediately
  else {
      button.style.opacity = "0";
      button.style.transition = "opacity 0.5s linear";
      setTimeout(() => button.style.visibility = "hidden", 500);
  }

  // Update the last scroll position
  lastScrollTop = scrollTop;
}



  // Add a scroll event listener to the window
  window.addEventListener("scroll", checkScroll);

  // Add a click event listener to the button
  button.addEventListener("click", function() {
      // When the button is clicked, scroll the window back to the top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // After clicking the button, hide it immediately
      button.style.opacity = "0";
      button.style.transition = "opacity 0.5s linear";
      setTimeout(() => button.style.visibility = "hidden", 500);
  });

// Define resize function
function checkResize() {
  var windowWidth = window.innerWidth;
 
  if (windowWidth > 1024) {
      button.style.right = 360 + 'px'; // Adjust button's right position
      button.style.bottom = "145px"; // Adjust button's bottom position
      
  } else {
      button.style.right = "16px";
      button.style.bottom = "145px";
  }
}

// Add a resize event listener to the window
window.addEventListener("resize", checkResize);

// Run resize function once to set initial button position
checkResize();





  // Add a resize event listener to the window
  window.addEventListener("resize", checkResize);

  // Run resize function once to set initial button position
  checkResize();
});


