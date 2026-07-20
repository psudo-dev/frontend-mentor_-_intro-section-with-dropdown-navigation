import "../css/style.css";

const menuOpen = document.querySelector(".header__menu-open");
const menuClose = document.querySelector(".header__nav-close");
const overlay = document.querySelector(".header__overlay");
const navbar = document.querySelector(".header__nav");
const featuresEl = document.querySelector("#features");
const featuresSubmenu = document.querySelector("#features-submenu");
const companyEl = document.querySelector("#company");
const companySubmenu = document.querySelector("#company-submenu");

function addSubmenu(menuItem: unknown, submenu: unknown, type: string) {
	if (!(menuItem instanceof HTMLElement)) return;
	if (!(submenu instanceof HTMLElement)) return;
	const trigger = menuItem.querySelector(".header__menu-trigger");
	if (!(trigger instanceof HTMLElement)) return;
	trigger.classList.add("header__menu-trigger--open");
	trigger.setAttribute("aria-expanded", "true");
	submenu.classList.add("header__submenu--visible");
	menuItem.dataset[type] = "open";
}

function removeSubmenu(menuItem: unknown, submenu: unknown, type: string) {
	if (!(menuItem instanceof HTMLElement)) return;
	if (!(submenu instanceof HTMLElement)) return;
	const trigger = menuItem.querySelector(".header__menu-trigger");
	if (!(trigger instanceof HTMLElement)) return;
	trigger.classList.remove("header__menu-trigger--open");
	trigger.setAttribute("aria-expanded", "false");
	submenu.classList.remove("header__submenu--visible");
	menuItem.dataset[type] = "close";
}

function elListeners(menuItem: unknown, submenu: unknown) {
	if (!(menuItem instanceof HTMLElement)) return;
	if (!(submenu instanceof HTMLElement)) return;

	menuItem.addEventListener("click", () => {
		if (menuItem.dataset.click === "close")
			addSubmenu(menuItem, submenu, "click");
		else removeSubmenu(menuItem, submenu, "click");
	});

	menuItem.addEventListener("mouseenter", () => {
		if (
			menuItem.dataset.hover === "close" &&
			menuItem.dataset.click === "close" &&
			window.matchMedia("(min-width: 820px)").matches
		)
			addSubmenu(menuItem, submenu, "hover");
	});

	menuItem.addEventListener("mouseleave", () => {
		if (
			menuItem.dataset.hover === "open" &&
			menuItem.dataset.click === "close" &&
			window.matchMedia("(min-width: 820px)").matches
		)
			removeSubmenu(menuItem, submenu, "hover");
	});
}

menuOpen?.addEventListener("click", () => {
	overlay?.classList.add("header__overlay--visible");
	navbar?.classList.remove("header__nav--hidden");
});

menuClose?.addEventListener("click", () => {
	overlay?.classList.remove("header__overlay--visible");
	navbar?.classList.add("header__nav--hidden");
});

overlay?.addEventListener("click", () => {
	overlay?.classList.remove("header__overlay--visible");
	navbar?.classList.add("header__nav--hidden");
});

document.addEventListener("click", (e) => {
	if (!(e.target instanceof HTMLElement)) return;
	if (!(featuresEl instanceof HTMLElement)) return;
	if (!(companyEl instanceof HTMLElement)) return;
	if (
		!featuresSubmenu?.contains(e.target) &&
		featuresEl.dataset.click === "open" &&
		!featuresEl?.contains(e.target)
	)
		removeSubmenu(featuresEl, featuresSubmenu, "click");
	else if (
		!companySubmenu?.contains(e.target) &&
		companyEl.dataset.click === "open" &&
		!companyEl?.contains(e.target)
	)
		removeSubmenu(companyEl, companySubmenu, "click");
});

elListeners(featuresEl, featuresSubmenu);
elListeners(companyEl, companySubmenu);
