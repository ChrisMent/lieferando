function openMenuOverlay(){
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    menuToggle.addEventListener('click', () => {
    menuOverlay.classList.toggle('hidden');
})
}

function closeMenuOverlay(){
    const menuOverlayClose = document.getElementById('close')
    const menuOverlay = document.getElementById('menu-overlay');
    menuOverlayClose.addEventListener('click', () => {
    menuOverlay.classList.add('hidden');
})
}

