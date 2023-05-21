// ==UserScript==
// @name         Skinport UI Framework
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  A Skinport Utility Plugin
// @author       Jay
// @match        https://skinport.com/*
// @icon         https://jaymensink.github.io/images/watching.png
// ==/UserScript==



// TODO
// Implement delete methods of elements removing them from FilterPanel.elements
// Finish writing DropDown class



class FilterPanel {

	constructor(name, opened=false, onOpen=function(){}, onClose=function(){}, onFlip=function(){}) {

		this.name = name;
		this.opened = opened;
		this.onOpen = onOpen;
		this.onClose = onClose;
		this.onFlip = onFlip;

		this.elements = [];

		this.element = document.createElement("div");
		this.element.classList.add("FilterWrapper");
		this.element.innerHTML = "<div role=\"presentation\" class=\"FilterWrapper-header\"><div class=\"FilterWrapper-title\">" + name + "</div><div class=\"FilterWrapper-arrow\"><svg class=\"bottom-chevron\"><use xlink:href=\"https://skinport.com/static/svg/sprite.3563a20180e5557bf5d7.svg#bottom-chevron\"></use></svg></div></div><div class=\"FilterWrapper-contentWrapper hidden\" style=\"display: none\"><div class=\"FilterWrapper-content\"><div class=\"" + name.trim().replace(" ", "") + "\"></div></div></div>";
		this.element.querySelector(".FilterWrapper-header").addEventListener("click", this.flip )
		
		if (opened) { this.open(); }

		document.querySelector(".CatalogFilter").firstElementChild.before(this.element);

	}

	setName = (name) => {
		this.name = name;
		this.element.querySelector(".FilterWrapper-title").innerText = name;
		this.element.querySelector(".FilterWrapper-content").firstElementChild.className = name.trim().replace(" ", "");
	}

	flip = () => {
		this.opened = !this.opened;
		if (this.opened) { this.open(); }
		else { this.close(); }
		this.onFlip();
	}

	open = () => {
		this.opened = true;
		this.element.querySelector(".FilterWrapper-contentWrapper").style.display = "";
		this.element.querySelector(".FilterWrapper-contentWrapper").classList.remove("hidden");
		this.element.classList.add("FilterWrapper--opened");
		this.onOpen();
	}

	close = () => {
		this.opened = false;
		this.element.querySelector(".FilterWrapper-contentWrapper").style.display = "none";
		this.element.querySelector(".FilterWrapper-contentWrapper").classList.add("hidden");
		this.element.classList.remove("FilterWrapper--opened");
		this.onClose();
	}

	addCheckbox = (name, enabled=false, hidden=false, onActivate=function(){}, onDeactivate=function(){}, onToggle=function(){}, onShow=function(){}, onHide=function(){}, onToggleVisibility=function(){}, onRename=function(){}) => {
		let checkbox = new Checkbox(name, enabled, hidden, onActivate, onDeactivate, onToggle, onShow, onHide, onToggleVisibility, onRename);
		this.elements.push( checkbox );
		this.element.querySelector(".FilterWrapper-content").firstElementChild.appendChild( checkbox.element );
	}

	addTextbox = (name, prefix="", placeholder="...", value="", onInput=function(){}) => {
		let textbox = new Textbox(name, prefix, placeholder, value, onInput);
		this.elements.push( textbox );
		this.element.querySelector(".FilterWrapper-content").firstElementChild.appendChild( textbox.element );
	}

	addButton = (name, onClick=function(){}) => {
		let button = new Button(name, onClick);
		this.elements.push( button );
		this.element.querySelector(".FilterWrapper-content").firstElementChild.appendChild( button.element );
	}

	toString = () => {
		return this.title;
	}

	delete = () => {
		for (const element of this.elements) { element.delete(); }
		this.elements = [];
		this.element.parentElement.removeChild(this.element);
	}

}



class Checkbox {

	constructor(name, enabled, hidden, onActivate, onDeactivate, onToggle, onShow, onHide, onToggleVisibility, onRename) {

		this.name = name;
		this.enabled = enabled;
		this.hidden = hidden;
		this.onActivate = onActivate;
		this.onDeactivate = onDeactivate;
		this.onToggle = onToggle;
		this.onShow = onShow;
		this.onHide = onHide;
		this.onToggleVisibility = onToggleVisibility;
		this.onRename = onRename;

		this.element = document.createElement("div");
		this.element.classList.add("CatalogCheckbox");
		this.element.setAttribute("role", "presentation");
		this.element.innerHTML = "<div class=\"Checkbox Checkbox--center\"><input class=\"Checkbox-input\" type=\"checkbox\"><div class=\"Checkbox-overlay\"></div><div class=\"Checkbox-label\"></div></div>";
		
		this.setName(name);
		if (enabled) { this.activate(); }
		if (hidden) { this.hide(); }
		
		this.element.addEventListener("click", this.toggle )

	}

	setName = (name) => {
		this.name = name;
		this.element.querySelector(".Checkbox-label").innerText = name;
		this.onRename();
	}

	toggle = () => {
		this.enabled = !this.enabled;
		if (this.enabled) { this.activate(); }
		else { this.deactivate(); }
		this.onToggle();
	}

	activate = () => {
		this.enabled = true;
		this.element.firstElementChild.classList.add("Checkbox--active");
		this.onActivate();
	}

	deactivate = () => {
		this.enabled = false;
		this.element.firstElementChild.classList.remove("Checkbox--active");
		this.onDeactivate();
	}

	toggleVisibility = () => {
		this.hidden = !this.hidden;
		if (this.hidden) { this.hide(); }
		else { this.show(); }
		this.onToggleVisibility();
	}

	hide = () => {
		this.hidden = true;
		this.element.style.display = "none";
		this.onHide();
	}

	show = () => {
		this.hidden = false;
		this.element.style.display = "";
		this.onShow();
	}

	toString = () => {
		return this.name;
	}

	delete = () => {
		this.element.parentElement.removeChild(this.element);
	}

}



class Textbox {

	constructor(name, prefix, placeholder, value, onInput) {

		this.name = name;
		this.prefix = prefix;
		this.placeholder = placeholder;
		this.value = value;
		this.onInput = onInput;

		this.element = document.createElement("label");
		this.element.classList.add("PriceFilter-inputField");
		this.element.setAttribute("for", "pricegt");
		this.element.style.width = "80%";
		this.element.style.marginLeft = "30px";
		this.element.style.marginBottom = "8px";
		let innerHTML = "";
		innerHTML = "<span class=\"PriceFilter-label\">" + name + "</span><div class=\"PriceFilter-inputWrapper\" style=\"width: 100%;\">";
		if (prefix != "" && prefix != null && prefix != undefined) { innerHTML += "<span class=\"PriceFilter-currency\">" + prefix + "</span>"; }
		innerHTML += "<input class=\"PriceFilter-input\" placeholder=\"" + placeholder + "\" id=\"pricegt\" autocomplete=\"off\" spellcheck=\"false\" autocorrect=\"false\" autocapitalize=\"off\"></div>";
		this.element.innerHTML = innerHTML;

		this.element.querySelector("input").value = value;

		this.element.querySelector("input").addEventListener("input", (event) => { this.value = event.target.value; } );
		this.element.querySelector("input").addEventListener("input", onInput);

	}

	setName = (name) => {
		this.name = name;
		this.element.querySelector(".PriceFilter-label").innerText = name;
	}

	setPrefix = (prefix) => {
		this.prefix = prefix;
		if ( this.element.querySelectorAll(".PriceFilter-currency").length != 0 ) { this.element.querySelector(".PriceFilter-currency").innerText = prefix; }
	}

	setPlaceholder = (placeholder) => {
		this.placeholder = placeholder;
		this.element.querySelector(".PriceFilter-input").setAttribute("placeholder", placeholder);
	}

	setValue = (value) => {
		this.value = value;
		this.element.querySelector("input").value = value;
	}

	toString = () => {
		return this.name + ": " + this.value;
	}

	delete = () => {
		this.element.parentElement.removeChild(this.element);
	}

}



class Button {

	constructor(name, onClick) {

		this.name = name;
		this.onClick = onClick;

		this.element = document.createElement("button");
		this.element.classList.add("SubmitButton");
		this.element.classList.add("CartSummary-checkoutBtn");
		this.element.classList.add("SubmitButton-isFull");
		this.element.style.marginTop = "8px";
		this.element.style.width = "80%";
		this.element.style.marginLeft = "30px";
		this.rename(name);
		this.element.addEventListener("click", onClick);

	}

	rename = (name) => {
		this.name = name;
		this.element.innerHTML = "<div class=\"SubmitButton-title\">" + name + "</div>";
	}

	toString = () => {
		return this.name;
	}

	delete = () => {
		this.element.parentElement.removeChild(this.element);
	}

}


class Dropdown {

	constructor() {

		this.options = [];

		this.element = document.createElement("div");
		this.element.classList.add("adyen-checkout__field");
		this.element.classList.add("adyen-checkout__field--issuer-list");
		this.element.style.width = "80%";
		this.element.style.marginLeft = "30px";
		this.element.style.marginBottom = "8px";
		this.element.innerHTML = "<label class=\"adyen-checkout__label\"><div class=\"adyen-checkout__input-wrapper\"><div class=\"adyen-checkout__dropdown Select-module_adyen-checkout__dropdown__0Mj-n adyen-checkout__issuer-list__dropdown\"><div aria-disabled=\"false\" aria-expanded=\"false\" aria-haspopup=\"listbox\" class=\"adyen-checkout__dropdown__button Select-module_adyen-checkout__dropdown__button__yTyqq\" role=\"button\" tabindex=\"0\" title=\"Select your bank\" id=\"\"><span class=\"adyen-checkout__dropdown__button__text\">Select your bank</span></div><ul class=\"test adyen-checkout__dropdown__list Select-module_adyen-checkout__dropdown__list__YtEzj\" id=\"select-9f75bc30-152a-4394-a9e4-96e86f1a7d1c\" role=\"listbox\"></ul></div></div></label>";
		
		this.element.querySelector(".adyen-checkout__dropdown__button").addEventListener("click", function() {
			if ( this.element.querySelector(".adyen-checkout__dropdown__list").classList.contains("adyen-checkout__dropdown__list--active") ) {
				this.element.querySelector(".adyen-checkout__dropdown__list").classList.remove("adyen-checkout__dropdown__list--active");
				this.element.querySelector(".adyen-checkout__dropdown__list").classList.remove("Select-module_adyen-checkout__dropdown__list--active__Gegw2");
			} else {
				this.element.querySelector(".adyen-checkout__dropdown__list").classList.add("adyen-checkout__dropdown__list--active");
				this.element.querySelector(".adyen-checkout__dropdown__list").classList.add("Select-module_adyen-checkout__dropdown__list--active__Gegw2");
			}
		})
		this.element.querySelectorAll("li").forEach(function(option) {
			option.addEventListener("click", function() {
				this.element.querySelector(".adyen-checkout__dropdown__button").innerHTML = "<img class=\"adyen-checkout__dropdown__button__icon adyen-checkout__image adyen-checkout__image--loaded\" src=\"" + option.querySelector("img").src + "\" alt=\"ING\"><span class=\"adyen-checkout__dropdown__button__text\">" + option.querySelector("span").innerText + "</span>"
				this.element.querySelector(".adyen-checkout__dropdown__list").classList.remove("adyen-checkout__dropdown__list--active");
				this.element.querySelector(".adyen-checkout__dropdown__list").classList.remove("Select-module_adyen-checkout__dropdown__list--active__Gegw2");
			})
		})

	}

	addOption = (option) => {
		this.options.push(option);
		this.element.querySelector("ul").innerHTML += "<li aria-disabled=\"false\" aria-selected=\"false\" class=\"adyen-checkout__dropdown__element Select-module_adyen-checkout__dropdown__element__ORU4-\" data-value=\"0721\" role=\"option\" tabindex=\"-1\"><img class=\"adyen-checkout__dropdown__element__icon adyen-checkout__image adyen-checkout__image--loaded\" alt=\"ING\" src=\"" + option.image + "\"><span class=\"adyen-checkout__dropdown__element__text\">" + option.name + "</span></li>";
	}

}



class DropdownOption {

	constructor(name, image) {
		
		this.name = name;
		this.image = image;

	}

}