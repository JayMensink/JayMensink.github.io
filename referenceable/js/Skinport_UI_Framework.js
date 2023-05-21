/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//      ██████╗██╗  ██╗██╗███╗  ██╗██████╗  █████╗ ██████╗ ████████╗  ██╗   ██╗██╗     //
//     ██╔════╝██║ ██╔╝██║████╗ ██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝  ██║   ██║██║     //
//     ╚█████╗ █████═╝ ██║██╔██╗██║██████╔╝██║  ██║██████╔╝   ██║     ██║   ██║██║     //
//      ╚═══██╗██╔═██╗ ██║██║╚████║██╔═══╝ ██║  ██║██╔══██╗   ██║     ██║   ██║██║     //
//     ██████╔╝██║ ╚██╗██║██║ ╚███║██║     ╚█████╔╝██║  ██║   ██║     ╚██████╔╝██║     //
//     ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚══╝╚═╝      ╚════╝ ╚═╝  ╚═╝   ╚═╝      ╚═════╝ ╚═╝     //
//                                                                                     //
//  ███████╗██████╗  █████╗ ███╗   ███╗███████╗ ██╗       ██╗ █████╗ ██████╗ ██╗  ██╗  //
//  ██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔════╝ ██║  ██╗  ██║██╔══██╗██╔══██╗██║ ██╔╝  //
//  █████╗  ██████╔╝███████║██╔████╔██║█████╗   ╚██╗████╗██╔╝██║  ██║██████╔╝█████═╝   //
//  ██╔══╝  ██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝    ████╔═████║ ██║  ██║██╔══██╗██╔═██╗   //
//  ██║     ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗  ╚██╔╝ ╚██╔╝ ╚█████╔╝██║  ██║██║ ╚██╗  //
//  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝   ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  //
//                                                                                     //
//                        Written and Maintained by Jay Mensink                        //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////



class FilterPanel {

	constructor(name, opened=false, hidden=false, onOpen=function(){}, onClose=function(){}, onFlip=function(){}, onAddElement=function(){}, onRename=function(){}, onShow=function(){}, onHide=function(){}, onToggleVisibility=function(){}) {

		this.name = name;
		this.opened = opened;
		this.hidden = hidden;
		this.onOpen = onOpen;
		this.onClose = onClose;
		this.onFlip = onFlip;
		this.onAddElement = onAddElement;
		this.onRename = onRename;
		this.onShow = onShow;
		this.onHide = onHide;
		this.onToggleVisibility = onToggleVisibility;

		this.elements = [];

		this.element = document.createElement("div");
		this.element.classList.add("FilterWrapper");
		this.element.innerHTML = "<div role=\"presentation\" class=\"FilterWrapper-header\"><div class=\"FilterWrapper-title\">" + name + "</div><div class=\"FilterWrapper-arrow\"><svg class=\"bottom-chevron\"><use xlink:href=\"https://skinport.com/static/svg/sprite.3563a20180e5557bf5d7.svg#bottom-chevron\"></use></svg></div></div><div class=\"FilterWrapper-contentWrapper hidden\" style=\"display: none\"><div class=\"FilterWrapper-content\"><div class=\"" + name.trim().replace(" ", "") + "\"></div></div></div>";
		this.element.querySelector(".FilterWrapper-header").addEventListener("click", this.flip )
		
		if (opened) { this.open(); }
		if (hidden) { this.hide(); }

		document.querySelector(".CatalogFilter").firstElementChild.before(this.element);

	}

	rename = (name) => {
		this.name = name;
		this.element.querySelector(".FilterWrapper-title").innerText = name;
		this.element.querySelector(".FilterWrapper-content").firstElementChild.className = name.trim().replace(" ", "");
		this.onRename();
	}

	toggleVisibility = () => {
		this.hidden = !this.hidden;
		if (this.hidden) { this.hide(); }
		else { this.show(); }
		this.onToggleVisibility();
	}

	show = () => {
		this.hidden = false;
		this.element.style.display = "";
		this.onShow();
	}

	hide = () => {
		this.hidden = true;
		this.element.style.display = "none";
		this.onHide();
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
		this.onAddElement();
		return checkbox;
	}

	addTextbox = (name, prefix="", placeholder="...", value="", hidden=false, onInput=function(){}, onShow=function(){}, onHide=function(){}, onToggleVisibility=function(){}, onRename=function(){}, onSetPrefix=function(){}, onSetPlaceholder=function(){}, onSetValue=function(){}) => {
		let textbox = new Textbox(name, prefix, placeholder, value, hidden, onInput, onShow, onHide, onToggleVisibility, onRename, onSetPrefix, onSetPlaceholder, onSetValue);
		this.elements.push( textbox );
		this.element.querySelector(".FilterWrapper-content").firstElementChild.appendChild( textbox.element );
		this.onAddElement();
		return textbox;
	}

	addButton = (name, hidden=false, onClick=function(){}, onRename=function(){}, onShow=function(){}, onHide=function(){}, onToggleVisibility=function(){}) => {
		let button = new Button(name, hidden, onClick, onRename, onShow, onHide, onToggleVisibility);
		this.elements.push( button );
		this.element.querySelector(".FilterWrapper-content").firstElementChild.appendChild( button.element );
		this.onAddElement();
		return button;
	}

	addDropdown = (name, hidden=false, onOpen=function(){}, onClose=function(){}, onFlip=function(){}, onSelect=function(){}, onShow=function(){}, onHide=function(){}, onToggleVisibility=function(){}, onRename=function(){}) => {
		let dropdown = new Dropdown(name, hidden, onOpen, onClose, onFlip, onSelect, onShow, onHide, onToggleVisibility, onRename);
		this.elements.push( dropdown );
		this.element.querySelector(".FilterWrapper-content").firstElementChild.appendChild( dropdown.element );
		this.onAddElement();
		return dropdown;
	}

	toString = () => {
		return this.title;
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
		
		this.element.querySelector(".Checkbox-label").innerText = name;
		if (enabled) { this.activate(); }
		if (hidden) { this.hide(); }
		
		this.element.addEventListener("click", this.toggle )

	}

	rename = (name) => {
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

}



class Textbox {

	constructor(name, prefix, placeholder, value, hidden, onInput, onShow, onHide, onToggleVisibility, onRename, onSetPrefix, onSetPlaceholder, onSetValue) {

		this.name = name;
		this.prefix = prefix;
		this.placeholder = placeholder;
		this.value = value;
		this.hidden = hidden;
		this.onInput = onInput;
		this.onShow = onShow;
		this.onHide = onHide;
		this.onToggleVisibility = onToggleVisibility;
		this.onRename = onRename;
		this.onSetPrefix = onSetPrefix;
		this.onSetPlaceholder = onSetPlaceholder;
		this.onSetValue = onSetValue;

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

		if (hidden) { this.hide(); }

		this.element.querySelector("input").addEventListener("input", (event) => { this.value = event.target.value; } );
		this.element.querySelector("input").addEventListener("input", onInput);

	}

	rename = (name) => {
		this.name = name;
		this.element.querySelector(".PriceFilter-label").innerText = name;
		this.onRename();
	}

	setPrefix = (prefix) => {
		this.prefix = prefix;
		if ( this.element.querySelectorAll(".PriceFilter-currency").length != 0 ) { this.element.querySelector(".PriceFilter-currency").innerText = prefix; }
		this.onSetPrefix();
	}

	setPlaceholder = (placeholder) => {
		this.placeholder = placeholder;
		this.element.querySelector(".PriceFilter-input").setAttribute("placeholder", placeholder);
		this.onSetPlaceholder();
	}

	setValue = (value) => {
		this.value = value;
		this.element.querySelector("input").value = value;
		this.onSetValue();
	}

	toggleVisibility = () => {
		this.hidden = !this.hidden;
		if (this.hidden) { this.hide(); }
		else { this.show(); }
		this.onToggleVisibility();
	}

	show = () => {
		this.hidden = false;
		this.element.style.display = "";
		this.onShow();
	}

	hide = () => {
		this.hidden = true;
		this.element.style.display = "none";
		this.onHide();
	}

	toString = () => {
		return this.name + ": " + this.value;
	}

}



class Button {

	constructor(name, hidden, onClick, onRename, onShow, onHide, onToggleVisibility) {

		this.name = name;
		this.hidden = hidden;
		this.onClick = onClick;
		this.onRename = onRename;
		this.onShow = onShow;
		this.onHide = onHide;
		this.onToggleVisibility = onToggleVisibility;

		this.element = document.createElement("button");
		this.element.classList.add("SubmitButton");
		this.element.classList.add("CartSummary-checkoutBtn");
		this.element.classList.add("SubmitButton-isFull");
		this.element.style.marginTop = "8px";
		this.element.style.width = "80%";
		this.element.style.marginLeft = "30px";
		this.element.innerHTML = "<div class=\"SubmitButton-title\">" + name + "</div>";
		this.element.addEventListener("click", onClick);

		if (hidden) { this.hide(); }

	}

	rename = (name) => {
		this.name = name;
		this.element.innerHTML = "<div class=\"SubmitButton-title\">" + name + "</div>";
		this.onRename();
	}

	toggleVisibility = () => {
		this.hidden = !this.hidden;
		if (this.hidden) { this.hide(); }
		else { this.show(); }
		this.onToggleVisibility();
	}

	show = () => {
		this.hidden = false;
		this.element.style.display = "";
		this.onShow();
	}

	hide = () => {
		this.hidden = true;
		this.element.style.display = "none";
		this.onHide();
	}

	toString = () => {
		return this.name;
	}

}



class Dropdown {

	constructor(name, hidden, onOpen, onClose, onFlip, onSelect, onShow, onHide, onToggleVisibility, onRename) {

		this.name = name;
		this.hidden = hidden;
		this.onOpen = onOpen;
		this.onClose = onClose;
		this.onFlip = onFlip
		this.onSelect = onSelect;
		this.onShow = onShow;
		this.onHide = onHide;
		this.onToggleVisibility = onToggleVisibility;
		this.onRename = onRename;
		this.opened = false;
		this.selected = null;
		this.options = [];

		this.element = document.createElement("div");
		this.element.classList.add("adyen-checkout__field");
		this.element.classList.add("adyen-checkout__field--issuer-list");
		this.element.style.width = "80%";
		this.element.style.marginLeft = "30px";
		this.element.style.marginBottom = "8px";
		this.element.innerHTML = "<label class=\"adyen-checkout__label\"><div class=\"adyen-checkout__input-wrapper\"><div class=\"adyen-checkout__dropdown Select-module_adyen-checkout__dropdown__0Mj-n adyen-checkout__issuer-list__dropdown\"><div aria-disabled=\"false\" aria-expanded=\"false\" aria-haspopup=\"listbox\" class=\"adyen-checkout__dropdown__button Select-module_adyen-checkout__dropdown__button__yTyqq\" role=\"button\" tabindex=\"0\" title=\"" + name + "\" id=\"\"><span class=\"adyen-checkout__dropdown__button__text\">" + name + "</span></div><ul class=\"test adyen-checkout__dropdown__list Select-module_adyen-checkout__dropdown__list__YtEzj\" id=\"select-9f75bc30-152a-4394-a9e4-96e86f1a7d1c\" role=\"listbox\"></ul></div></div></label>";
		
		this.element.querySelector(".adyen-checkout__dropdown__button").addEventListener("click", this.flip )

		this.element.querySelectorAll("li").forEach((option) => { option.addEventListener("click", () => { this.select(option) }); })

		if (hidden) { this.hide(); }

	}

	rename = (name) => {
		this.element.querySelector(".Select-module_adyen-checkout__dropdown__button__yTyqq").title = name;
		this.element.querySelector(".adyen-checkout__dropdown__button__text").innerText = name;
		this.onRename();
	}
	
	toggleVisibility = () => {
		this.hidden = !this.hidden;
		if (this.hidden) { this.hide(); }
		else { this.show(); }
		this.onToggleVisibility();
	}

	show = () => {
		this.hidden = false;
		this.element.style.display = "";
		this.onShow();
	}

	hide = () => {
		this.hidden = true;
		this.element.style.display = "none";
		this.onHide();
	}

	select = (option) => {
		option = option.closest("li");
		this.element.querySelector(".adyen-checkout__dropdown__button").innerHTML = "<img class=\"adyen-checkout__dropdown__button__icon adyen-checkout__image adyen-checkout__image--loaded\" src=\"" + option.querySelector("img").src + "\" alt=\"ING\"><span class=\"adyen-checkout__dropdown__button__text\">" + option.querySelector("span").innerText + "</span>"
		this.selected = option.querySelector("span").innerText;
		this.close();
		this.onSelect();
	}

	flip = () => {
		this.opened = !this.opened;
		if (this.opened) { this.open(); }
		else { this.close(); }
		this.onFlip();
	}

	open = () => {
		this.opened = true;
		this.element.querySelector(".adyen-checkout__dropdown__list").classList.add("adyen-checkout__dropdown__list--active");
		this.element.querySelector(".adyen-checkout__dropdown__list").classList.add("Select-module_adyen-checkout__dropdown__list--active__Gegw2");
		this.onOpen();
	}

	close = () => {
		this.opened = false;
		this.element.querySelector(".adyen-checkout__dropdown__list").classList.remove("adyen-checkout__dropdown__list--active");
		this.element.querySelector(".adyen-checkout__dropdown__list").classList.remove("Select-module_adyen-checkout__dropdown__list--active__Gegw2");
		this.onClose();
	}

	addOption = (option) => {
		this.options.push(option);
		let optionElement = document.createElement("li");
		optionElement.setAttribute("aria-disabled", false);
		optionElement.setAttribute("aria-selected", false);
		optionElement.classList.add("adyen-checkout__dropdown__element");
		optionElement.classList.add("Select-module_adyen-checkout__dropdown__element__ORU4-");
		optionElement.setAttribute("data-value", "0721");
		optionElement.setAttribute("role", "option");
		optionElement.setAttribute("tabindex", "-1");
		optionElement.innerHTML = "<img class=\"adyen-checkout__dropdown__element__icon adyen-checkout__image adyen-checkout__image--loaded\" alt=\"" + option.name + "\" src=\"" + option.image + "\"><span class=\"adyen-checkout__dropdown__element__text\">" + option.name + "</span>";
		this.element.querySelector("ul").appendChild(optionElement);
		optionElement.addEventListener("click", () => { this.select(optionElement); });
	}

}



class DropdownOption {

	constructor(name, image) {
		
		this.name = name;
		this.image = image;

	}

}





// Test values
let panel = new FilterPanel("Example Panel");

let checkbox = panel.addCheckbox("Example Checkbox");

let textbox = panel.addTextbox("Example Textbox (Plain)");
let textbox2 = panel.addTextbox("Example Textbox (Money)", "€", "0.00");

let dropdown = panel.addDropdown("Test Dropdown");
dropdown.addOption(new DropdownOption("Avicia Paper", "https://raw.githubusercontent.com/JayMensink/WynnCrafter/main/sandbox/ingredient_images/Acacia%20Paper.png"));
dropdown.addOption(new DropdownOption("Avicia Wood", "https://raw.githubusercontent.com/JayMensink/WynnCrafter/main/sandbox/ingredient_images/Acacia%20Wood.png"));
dropdown.addOption(new DropdownOption("Molten Ingot", "https://raw.githubusercontent.com/JayMensink/WynnCrafter/main/sandbox/ingredient_images/Molten%20Ingot.png"));

let button = panel.addButton("Example Button");