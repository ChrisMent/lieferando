async function initHTML() {
    let includeElements = document.querySelectorAll("[w3-include-html]");
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = "Page not found";
        }
    }
}

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
initHTML().then(() => {
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
})

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

//! Nutrition Information Modal
document.addEventListener('DOMContentLoaded', () => {
  const openButtons = document.querySelectorAll('[data-open-modal]')
  const closeButton = document.querySelector('[data-close-modal]')
  const modal = document.querySelector('[data-modal]')

  openButtons.forEach(button => {
    button.addEventListener('click', () => {
      modal.classList.remove('d-none')
    })
  })

  closeButton.addEventListener('click', () => {
    modal.classList.add('d-none')
  })
})


let pMeals = []; // Array, in das die p-Tags geschrieben werden
        let pPrices = [];
        let pAmounts = [];


        //! Restaurant Menu rendern
initHTML().then(() => {
        fetch("/lieferando/ressources/data.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((meals) => {
                meals.forEach((meal) => {
                    const containerId = meal.category.replace(/ /g, "");
                    const container = document.getElementById(containerId);

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
                });

                // Nachdem die Mahlzeiten gerendert wurden, fügen Sie die Event-Listener hinzu
                let mealElements = document.querySelectorAll('.meals-list-elements');

                mealElements.forEach((mealElement) => {
                    mealElement.addEventListener('click', function () {
                        let pTagMeal = mealElement.querySelector('.meals-list-box-headline p');
                        let pTagPrice = mealElement.querySelector('.meals-list-price-price p');
                        let pMeal = pTagMeal.innerText;
                        let pPrice = pTagPrice.innerText;
                        let index = pMeals.indexOf(pMeal);
                        if (index === -1) {
                            // Das pMeal ist noch nicht in der Liste, also fügen wir es hinzu und setzen die Menge auf 1
                            pMeals.push(pMeal);
                            pPrices.push(pPrice);
                            pAmounts.push(1);
                        } else {
                            // Das pMeal ist bereits in der Liste, also erhöhen wir die Menge an der entsprechenden Stelle
                            pAmounts[index]++;
                        }
                        //console.log(pMeals, pPrices, pAmounts);
                        saveBasket();
                        renderBasket();
                        renderSubtotal();
                        renderShippingFee();
                        renderDeliveryCosts();
                        messageFreeDelivery();
                        minOrderValue();
                    });
                });
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
})

        //! Warenkorb rendern

        function renderBasket() {
            let basket = document.getElementById('basket');
            let basketMessage = document.getElementById('basket-message');
            let basketEmpty = document.getElementById('basket-aside')
            basket.innerHTML = '';

            if (pMeals.length === 0) {
                // Wenn der Warenkorb leer ist, zeigen wir die Nachricht an
                basketMessage.style.display = 'block';
                basketEmpty.style.display = 'none';

            } else {
                // Der Warenkorb ist nicht leer, also fügen wir die Elemente hinzu
                basketMessage.style.display = 'none';
                basketEmpty.style.display = 'block';

                for (let i = 0; i < pMeals.length; i++) {
                    // Nur Elemente mit Menge > 0 hinzufügen
                    if (pAmounts[i] > 0) {
                        let price = parseFloat(pPrices[i].replace(',', '.'));
                        let total = price * pAmounts[i];
                        basket.innerHTML += `
                        <div class="basket-card-position">   
                             <div class="basket-card-group">
                                <div>
                                    <div class="basket-card-item-group">
                                        <div class="basket-list">
                                            <div class="basket-amount">
                                                <strong>
                                                    <span>${pAmounts[i]}</span>
                                                </strong>
                                            </div>

                                            <div class="basket-attributes">
                                                <div>
                                                    <strong class="basket-meal-name">
                                                        <span>${pMeals[i]}</span>
                                                    </strong>
                                                </div>
                                                <div class="basket-attributes-2">
                                                    <div >
                                                        <span></span>
                                                    </div>

                                                    <div class="basket-item-prices">
                                                        <span></span>
                                                    </div>

                                                    <div class="basket-item-total">
                                                        <span>${total.toFixed(2).replace('.', ',')} €</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="basket-buttons">
                                            <div class="basket-buttons-position">
                                                <span class="basket-item-annotations">
                                                    <span>Anmerkung
                                                        hinzufügen</span>
                                                </span>
                                                <div class="basket-buttons-plus-minus">
                                                    <div class="basket-buttons-plus-minus-position">
                                                        <div class="basket-buttons-plus-minus-wrapper">
                                                            <div class="basket-buttons-minus">
                                                                <span onclick="basketRemove(${i})" id="basket-button-minus" class="basket-button-design">
                                                                    <span>
                                                                        <svg viewBox="0 0 16 16" width="1em" height="1em"
                                                                            role="presentation" focusable="false"
                                                                            aria-hidden="true">
                                                                            <path
                                                                                d="M14.125 7.344H1.875v1.312h12.25V7.344z">
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                            <div class="basket-buttons-plus">
                                                                <span onclick="basketAdd(${i})" id="basket-button-plus" class="basket-button-design">
                                                                    <span>
                                                                        <svg viewBox="0 0 16 16" width="1em" height="1em"
                                                                            role="presentation" focusable="false"
                                                                            aria-hidden="true">
                                                                            <path
                                                                                d="M14.125 7.344H8.656V1.875H7.344v5.469H1.875v1.312h5.469v5.469h1.312V8.656h5.469V7.344z">
                                                                            </path>
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

            `;
                    }
                }
            }
            saveBasket();
        }

        //! Warenkorb speichern und laden

        function saveBasket() {
            localStorage.setItem('activeMealBasket', JSON.stringify(pMeals));
            localStorage.setItem('activePriceBasket', JSON.stringify(pPrices));
            localStorage.setItem('activeAmountBasket', JSON.stringify(pAmounts));
        }


        function loadBasket() {
            // Lade die Daten aus dem localStorage und verwende sie, um die Variablen zu füllen
            pMeals = JSON.parse(localStorage.getItem('activeMealBasket')) || [];
            pPrices = JSON.parse(localStorage.getItem('activePriceBasket')) || [];
            pAmounts = JSON.parse(localStorage.getItem('activeAmountBasket')) || [];
        }

        function initBasket() {
            loadBasket();
            renderBasket();
            renderSubtotal();
            renderShippingFee();
            renderDeliveryCosts();
            messageFreeDelivery();
            minOrderValue();

        }

        function basketAdd(i) {
            pAmounts[i]++;
            saveBasket();
            loadBasket();
            renderBasket();
            renderSubtotal();
            renderShippingFee();
            renderDeliveryCosts();
            messageFreeDelivery();
            minOrderValue();
        }


        function basketRemove(i) {
            pAmounts[i]--;
            if (pAmounts[i] === 0) {
                // Wenn die Menge 0 ist, entfernen wir das Element aus allen Arrays
                pMeals.splice(i, 1);
                pPrices.splice(i, 1);
                pAmounts.splice(i, 1);
            }
            saveBasket();
            loadBasket();
            renderBasket();
            renderSubtotal();
            renderShippingFee();
            renderDeliveryCosts();
            messageFreeDelivery();
            minOrderValue();
        }

        //! Artikelanzahl berechnen

        let totalAmount = pAmounts.reduce((a, b) => a + b, 0);

        function getTotalAmount() {
            return pAmounts.reduce((a, b) => a + b, 0);
        }

        //! Gesamtsumme der Mahlzeiten berechnen

        function getTotalSum() {
            let totalSum = 0;
            for (let i = 0; i < pAmounts.length; i++) {
                let price = parseFloat(pPrices[i].replace(',', '.'));
                totalSum += pAmounts[i] * price;
            }
            return totalSum;
        }

        function renderSubtotal() {
            let amountSubTotal = document.getElementById('basketSubTotal')
            let totalSum = getTotalSum();
            amountSubTotal.innerText = totalSum.toFixed(2).replace('.', ',') + ' €';
        }

        let totalSum = getTotalSum();

        //! Lieferkosten

        let shippingCosts = 1.5
        let minimumOrderValue = 15
        let shippingFreeText = "Kostenlos"
        let shippingFreeAmount = 50

        function shippingFee() {
            if (getTotalSum() > shippingFreeAmount) {
                return 0;
            } else {
                return shippingCosts;
            }
        }

        function shippingFeeDisplay() {
            if (getTotalSum() > shippingFreeAmount) {
                return shippingFreeText;
            } else {
                return shippingCosts.toFixed(2).replace('.', ',') + ' €';
            }
        }

        function renderShippingFee() {
            let shippingFeeElement = document.getElementById('basket-delivery');
            shippingFeeElement.innerText = shippingFeeDisplay();
        }


        //! Gesamtsumme der Lieferung berechnen

        function deliveryCosts() {
            let summaryTotal = getTotalSum() + shippingFee();
            return summaryTotal;
        }

        function renderDeliveryCosts() {
            let deliveryCostElement = document.getElementById('basket-delivery-costs');
            let deliveryCost = deliveryCosts();
            deliveryCostElement.innerText = deliveryCost.toFixed(2).replace('.', ',') + ' €';
        }

        function messageFreeDelivery() {
            let messageFreeDelivery = document.getElementById('message-free-delivery')
            if (getTotalSum() > 50) {
                messageFreeDelivery.style.display = "none"
            } else {
                messageFreeDelivery.style.display = "block"
            }
        }

        //! Mindestbestellwert errechnen und Warenkorbbutton aktiv schalten

        function minOrderValue() {
            let restValue = minimumOrderValue - getTotalSum()
            let minOrderAmount = document.getElementById('minimum-order-value')
            let messageWrapper = document.getElementById('basket-message-wrapper')
            let checkoutBtn = document.getElementById('checkout-button')
            let span = checkoutBtn.querySelector('span')
            let mobileValue = document.getElementById('basket-value-mobile')
            let countItems = getTotalAmount()
            let itemInsert = document.getElementById('count-items')

            if (getTotalSum() > minimumOrderValue) {
                messageWrapper.style.display = "none"
                checkoutBtn.disabled = false
                checkoutBtn.classList.add('basket-order-button-active')
                span.innerText = 'Bezahlen (' + deliveryCosts().toFixed(2).replace('.', ',') + ' €)';
                mobileValue.innerText = deliveryCosts().toFixed(2).replace('.', ',') + ' €';
                itemInsert.innerText = countItems.toString()

            } else {
                messageWrapper.style.display = "block"
                minOrderAmount.innerText = restValue.toFixed(2).replace('.', ',') + ' €';
                checkoutBtn.disabled = true
                checkoutBtn.classList.remove('basket-order-button-active')
                span.innerText = 'Bezahlen (' + deliveryCosts().toFixed(2).replace('.', ',') + ' €)';
                mobileValue.innerText = deliveryCosts().toFixed(2).replace('.', ',') + ' €';
                itemInsert.innerText = countItems.toString()

            }


        }

        //! Aufruf der init-Funktion

        window.onload = initBasket;


        //! Modal für mobile Warenkorb

document.addEventListener("DOMContentLoaded", function() {
    
    document.getElementById("mobil-click").addEventListener("click", function() {
        let basket = document.getElementById("basket-aside")
        basket.classList.add('modal-basket');         
    });
   }); 

   function closeMobilModal(){
    let basket = document.getElementById("basket-aside")
    basket.classList.remove('modal-basket');  

   }

