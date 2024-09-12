const MENU_ICON = document.querySelector(".burger-menu");
const MENU_BURGER = document.querySelector(".nav-menu");
const OVERLAY = document.querySelector(".overlay");


let isMenuOpen = false;


MENU_ICON.addEventListener("click", () => {
    menuOpen();
})


OVERLAY.addEventListener("click", () => {
    menuOpen(false);
})

for (const link of document.querySelectorAll(".nav-menu a")){
    link.addEventListener("click", () => {
        menuOpen(false);
    })
}

export function menuOpen(f){
        // f = f ?? !isMenuOpen;
    if (f === undefined) f = !isMenuOpen;
    if(isMenuOpen == f) return;
    isMenuOpen = f;
    if (isMenuOpen){
        MENU_ICON.classList.add("active-burger-icon");
        MENU_BURGER.classList.add("nav-mobile-open");
        document.body.classList.add("shadow");
    } else {
        MENU_ICON.classList.remove("active-burger-icon");
        MENU_BURGER.classList.remove("nav-mobile-open");
        document.body.classList.remove("shadow");
    }
}

