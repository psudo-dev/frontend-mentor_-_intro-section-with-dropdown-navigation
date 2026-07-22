import "../css/style.css";

const menuOpen = document.querySelector(".header__menu-open");
const menuClose = document.querySelector(".header__nav-close");
const overlay = document.querySelector(".header__overlay");
const navbar = document.querySelector(".header__nav");
const featuresEl = document.querySelector("#features");
const featuresSubmenu = document.querySelector("#features-submenu");
const companyEl = document.querySelector("#company");
const companySubmenu = document.querySelector("#company-submenu");

function addSubmenu(
	menuItem: Element | null,
	submenu: Element | null,
	type: "click" | "hover",
) {
	if (!(menuItem instanceof HTMLElement) || !(submenu instanceof HTMLElement))
		return;
	const trigger = menuItem.querySelector(".header__menu-trigger");
	if (!(trigger instanceof HTMLElement)) return;
	trigger.classList.add("header__menu-trigger--open");
	trigger.setAttribute("aria-expanded", "true");
	submenu.classList.add("header__submenu--visible");
	menuItem.dataset[type] = "open";
}

function removeSubmenu(
	menuItem: Element | null,
	submenu: Element | null,
	type: "click" | "hover",
) {
	if (!(menuItem instanceof HTMLElement) || !(submenu instanceof HTMLElement))
		return;
	const trigger = menuItem.querySelector(".header__menu-trigger");
	if (!(trigger instanceof HTMLElement)) return;
	trigger.classList.remove("header__menu-trigger--open");
	trigger.setAttribute("aria-expanded", "false");
	submenu.classList.remove("header__submenu--visible");
	menuItem.dataset[type] = "close";
}

function dropdownListeners(menuItem: Element | null, submenu: Element | null) {
	if (!(menuItem instanceof HTMLElement) || !(submenu instanceof HTMLElement))
		return;

	menuItem.addEventListener("click", () => {
		if (menuItem.dataset.click === "close")
			addSubmenu(menuItem, submenu, "click");
		else removeSubmenu(menuItem, submenu, "click");
	});

	menuItem.addEventListener("mouseenter", () => {
		if (
			menuItem.dataset.hover === "close" &&
			menuItem.dataset.click === "close" &&
			window.matchMedia("(min-width: 51.25em)").matches
		)
			addSubmenu(menuItem, submenu, "hover");
	});

	menuItem.addEventListener("mouseleave", () => {
		if (
			menuItem.dataset.hover === "open" &&
			menuItem.dataset.click === "close" &&
			window.matchMedia("(min-width: 51.25em)").matches
		)
			removeSubmenu(menuItem, submenu, "hover");
	});
}

function isHTMLElementArr(htmlArray: unknown): htmlArray is HTMLElement[] {
	if (!Array.isArray(htmlArray)) return false;
	return htmlArray.every((html) => html instanceof HTMLElement);
}

function openMobileMenu(triggerEl: Element | null) {
	if (
		!(triggerEl instanceof HTMLElement) ||
		!(overlay instanceof HTMLElement) ||
		!(navbar instanceof HTMLElement)
	)
		return;
	triggerEl.addEventListener("click", () => {
		overlay.classList.add("header__overlay--visible");
		navbar.classList.remove("header__nav--hidden");
		triggerEl.setAttribute("aria-expanded", "true");
	});
}

function closeMobileMenu(triggerEl: Element | null) {
	if (
		!(triggerEl instanceof HTMLElement) ||
		!(overlay instanceof HTMLElement) ||
		!(navbar instanceof HTMLElement) ||
		!(menuOpen instanceof HTMLElement)
	)
		return;
	triggerEl.addEventListener("click", () => {
		overlay.classList.remove("header__overlay--visible");
		navbar.classList.add("header__nav--hidden");
		menuOpen.setAttribute("aria-expanded", "false");
	});
}

document.addEventListener("click", (e) => {
	const target = e.target;
	if (!(target instanceof HTMLElement)) return;

	const dropdownMenus = [
		[featuresEl, featuresSubmenu],
		[companyEl, companySubmenu],
	];

	if (!dropdownMenus.every((dropdownMenu) => isHTMLElementArr(dropdownMenu)))
		return;

	const isOutsideDropdown = dropdownMenus.every(([menuItem, submenu]) => {
		return !menuItem.contains(target) && !submenu.contains(target);
	});

	const isSubmenuLink = target.classList.contains("header__submenu-link");

	dropdownMenus.forEach(([menuItem, submenu]) => {
		if (
			menuItem.dataset.click === "open" &&
			(isOutsideDropdown || isSubmenuLink)
		)
			removeSubmenu(menuItem, submenu, "click");
	});
});

openMobileMenu(menuOpen);
closeMobileMenu(menuClose);
closeMobileMenu(overlay);

dropdownListeners(featuresEl, featuresSubmenu);
dropdownListeners(companyEl, companySubmenu);
