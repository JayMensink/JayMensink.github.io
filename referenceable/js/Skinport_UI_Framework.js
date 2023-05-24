/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
//      ██████╗██╗  ██╗██╗███╗  ██╗██████╗  █████╗ ██████╗ ████████╗  ██╗   ██╗██╗     //
//     ██╔════╝██║ ██╔╝██║████╗ ██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝  ██║   ██║██║     //
//     ╚█████╗ █████═╝ ██║██╔██╗██║██████╔╝██║  ██║██████╔╝   ██║     ██║   ██║██║     //
//      ╚═══██╗██╔═██╗ ██║██║╚████║██╔═══╝ ██║  ██║██╔══██╗   ██║     ██║   ██║██║     //
//     ██████╔╝██║ ╚██╗██║██║ ╚███║██║     ╚█████╔╝██║  ██║   ██║     ╚██████╔╝██║     //
//     ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚══╝╚═╝      ╚════╝ ╚═╝  ╚═╝   ╚═╝      ╚═════╝ ╚═╝     //
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

class Colors {
	constructor() {
		throw new Error("Cannot instantiate this class.");
	}

	static contraband = "#ffae39";
	static knife = "#8650ac";
	static covert = "#eb4b4b";
	static classified = "#d32ee6";
	static restricted = "#8847ff";
	static milSpec = "#4b69ff";
	static industrial = "#5e98d9";
	static consumer = "#b0c3d9";
	static default = "#d2d2d2";

	static factoryNew = "#5eb648";
	static minimalWear = "#79d154";
	static fieldTested = "#e3e15b";
	static wellWorn = "#e9a75d";
	static battleScarred = "#e05a59";
	static noWear = "#8e9191";

	static tradable = "#00a67c";
	static untradable = "#c7d296";

	static site = "#2b2f30";
	static siteDark = "#232728";

	static getColorFromFloat(float = 0) {
		if (float >= 0.45) {
			return this.battleScarred;
		}
		if (float >= 0.38) {
			return this.wellWorn;
		}
		if (float >= 0.15) {
			return this.fieldTested;
		}
		if (float >= 0.07) {
			return this.minimalWear;
		}
		if (float >= 0.0) {
			return this.factoryNew;
		}
		return this.noWear;
	}
}

class Listing {
	constructor(
		hoursUntilTradable,
		stickers,
		image,
		price,
		sale,
		suggestedPrice,
		souvenir,
		stattrak,
		weapon,
		weaponColor,
		skin,
		hasNametag,
		phase,
		fadePercentage,
		subText,
		wear,
		rarity,
		float,
		link,
		id,
		urlName
	) {
		this.hoursUntilTradable = hoursUntilTradable;
		this.stickers = stickers;
		this.image = image;
		this.price = price;
		this.sale = sale;
		this.suggestedPrice = suggestedPrice;
		this.souvenir = souvenir;
		this.stattrak = stattrak;
		this.weapon = weapon;
		this.weaponColor = weaponColor;
		this.skin = skin;
		this.hasNametag = hasNametag;
		this.phase = phase;
		this.fadePercentage = fadePercentage;
		this.subText = subText;
		this.wear = wear;
		this.rarity = rarity;
		this.float = float;
		this.link = link;
		this.id = id;
		this.urlName = urlName;
		this.element = null;
	}

	static fromElement = (listing) => {
		if (listing == null) {
			throw new Error("Must provide listing element.");
		}

		let hoursUntilTradable = 0;
		if (listing.querySelector(".TradeLock-lock").firstElementChild.childNodes[1].textContent.includes("days")) {
			hoursUntilTradable = parseInt(listing.querySelector(".TradeLock-lock").firstElementChild.childNodes[1].textContent.replace("in ", "").replace(" days", "")) * 24;
		}
		if (listing.querySelector(".TradeLock-lock").firstElementChild.childNodes[1].textContent.includes("hours")) {
			hoursUntilTradable = parseInt(listing.querySelector(".TradeLock-lock").firstElementChild.childNodes[1].textContent.replace("in ", "").replace(" hours", ""));
		}

		let stickers = [];
		if (listing.querySelectorAll(".ItemPreview-stickers").length != 0) {
			listing
				.querySelector(".ItemPreview-stickers")
				.querySelectorAll(".Tooltip-link")
				.forEach((sticker) => {
					stickers.push(ListingSticker.fromElement(sticker));
				});
		}

		let image = listing.querySelector(".ItemPreview-itemImage").firstElementChild.src;
		let price = parseInt(listing.querySelector(".ItemPreview-priceValue").firstElementChild.innerText.replace("€", "").replace(",", "").replace(".", "")) / 100;

		let sale = 0;
		if (listing.querySelectorAll(".GradientLabel").length != 0) {
			sale = parseInt(listing.querySelector(".GradientLabel").firstElementChild.innerText.slice(2, -1));
		}

		let suggestedPrice = parseInt(listing.querySelector(".ItemPreview-oldPrice").innerText.replace("Suggested price €", "").replace(",", "").replace(".", "")) / 100;
		let souvenir = listing.querySelector(".ItemPreview-itemTitle").innerText.includes("Souvenir");
		let stattrak = listing.querySelector(".ItemPreview-itemTitle").innerText.includes("StatTrak");
		let weapon = listing.querySelector(".ItemPreview-itemTitle").innerText.replace("StatTrak™ ", "").replace("Souvenir ", "");
		let weaponColor = listing.querySelector(".ItemPreview-itemTitle").style.color;
		let skin = listing.querySelector(".ItemPreview-itemName").innerText.split(" (")[0];
		let hasNametag = listing.querySelectorAll(".ItemPreview-nameTag").length != 0;
		if (hasNametag) {
			skin = skin.slice(0, -1);
		}

		let phase = null;
		if (skin.includes("Doppler")) {
			phase = listing.querySelector(".ItemPreview-itemName").innerText.split(" (")[1].replace(")", "");
		}

		let fadePercentage = null;
		if (!skin.includes("Marble") && skin.includes("Fade")) {
			fadePercentage = parseFloat(listing.querySelector(".ItemPreview-itemName").innerText.split(" (")[1].replace("%)", ""));
		}

		let subText = listing.querySelector(".ItemPreview-itemText").innerText;

		let wear = null;
		if (listing.querySelector(".ItemPreview-itemText").innerText.includes("Factory New")) {
			wear = "Factory New";
		}
		if (listing.querySelector(".ItemPreview-itemText").innerText.includes("Minimal Wear")) {
			wear = "Minimal Wear";
		}
		if (listing.querySelector(".ItemPreview-itemText").innerText.includes("Field-Tested")) {
			wear = "Field-Tested";
		}
		if (listing.querySelector(".ItemPreview-itemText").innerText.includes("Well-Worn")) {
			wear = "Well-Worn";
		}
		if (listing.querySelector(".ItemPreview-itemText").innerText.includes("Battle-Scarred")) {
			wear = "Battle-Scarred";
		}

		let rarity = null;
		if (listing.querySelector(".ItemPreview-itemText").innerText.includes("Consumer")) {
			rarity = "Consumer";
		}
		if (listing.querySelector(".ItemPreview-itemText").innerText.includes("Industrial")) {
			rarity = "Industrial";
		}
		if (listing.querySelector(".ItemPreview-itemText").innerText.includes("Mil-Spec")) {
			rarity = "Mil-Spec";
		}
		if (listing.querySelector(".ItemPreview-itemText").innerText.includes("Restricted")) {
			rarity = "Restricted";
		}
		if (listing.querySelector(".ItemPreview-itemText").innerText.includes("Classified")) {
			rarity = "Classified";
		}
		if (listing.querySelector(".ItemPreview-itemText").innerText.includes("Covert")) {
			rarity = "Covert";
		}

		let float = null;
		if (listing.querySelectorAll(".WearBar-value").length != 0) {
			float = parseFloat(listing.querySelector(".WearBar-value").innerText);
		}

		let link = listing.querySelector(".ItemPreview-link").href;
		let id = parseInt(link.split("/")[link.split("/").length - 1]);
		let urlName = link.split("/")[4];

		let instance = new Listing(
			hoursUntilTradable,
			stickers,
			image,
			price,
			sale,
			suggestedPrice,
			souvenir,
			stattrak,
			weapon,
			weaponColor,
			skin,
			hasNametag,
			phase,
			fadePercentage,
			subText,
			wear,
			rarity,
			float,
			link,
			id,
			urlName
		);
		instance.element = listing;
		listing.instance = instance;
		return instance;
	};

	spawnElement = () => {
		let element = document.createElement("div");
		element.classList.add("CatalogPage-item");
		element.classList.add("CatalogPage-item--grid");
		element.innerHTML =
			'<div class="ItemPreview ItemPreview--grid ItemPreview--id-730"><a class="ItemPreview-href" aria-label="★ Butterfly Knife | Fade (Factory New)" href="/item/butterfly-knife-fade-factory-new">★ Butterfly Knife | Fade (Factory New)</a><div class="ItemPreview-content"><div class="ItemPreview-wrapper"><a class="ItemPreview-link" rel="nofollow" href="/item/butterfly-knife-fade-factory-new/20078266"><div class="ItemPreview-commonInfo"><div class="ItemPreview-top"><div class="TradeLock-lock ItemPreview-lock"><div><svg class="TradeLock-timeIcon clock-lock"><use xlink:href="/static/svg/sprite.81f09c5387380f409877.svg#clock-lock"></use></svg>Tradable</div></div></div><div class="ItemPreview-itemImage"><img class="" src="https://community.cloudflare.steamstatic.com/economy/image/class/730/520032493/256x128" alt="★ Butterfly Knife | Fade (Factory New)" loading="lazy" aria-hidden="true"></div><div class="ItemPreview-itemInfo"><div class="ItemPreview-price"><div class="ItemPreview-priceValue"><div class="Tooltip-link">€3,421.03</div><div class="GradientLabel ItemPreview-discount"><span>− 12%</span></div></div><div class="ItemPreview-oldPrice">Suggested price €3,909.54</div></div><div class="ItemPreview-itemTitle" style="color: rgb(134, 80, 172);">Butterfly Knife</div><div class="ItemPreview-itemName">Fade (86.9%)</div><div class="ItemPreview-itemText">Factory New ★ Covert Knife</div></div></div><div class="ItemPreview-wear"><div class="WearBar"><div class="WearBar-value">0.019</div><div class="WearBar-bar"><div class="WearBar-barBg"><span class="WearBar-bgColor WearBar-bgColor--worst"></span><span class="WearBar-bgColor WearBar-bgColor--bad"></span><span class="WearBar-bgColor WearBar-bgColor--normal"></span><span class="WearBar-bgColor WearBar-bgColor--good"></span><span class="WearBar-bgColor WearBar-bgColor--perfect"></span></div><div class="WearBar-progress" style="left: 1.98881%;"><svg class="WearBar-arrow triangle"><use xlink:href="/static/svg/sprite.81f09c5387380f409877.svg#triangle"></use></svg></div></div></div></div></a></div><div role="presentation" class="ItemPreview-actionBtn"><button type="button" class="ItemPreview-mainAction">Add to cart</button><button type="button" class="ItemPreview-sideAction" aria-label="..."><span class="ItemPreview-sideDot"></span><span class="ItemPreview-sideDot"></span><span class="ItemPreview-sideDot"></span></button></div></div></div>';

		element.querySelector(".TradeLock-lock").firstElementChild.childNodes[1].textContent = "Tradable";
		if (this.hoursUntilTradable == 0) {
			element.querySelector(".TradeLock-lock").classList.add("TradeLock-lock--unlocked");
		} else if (this.hoursUntilTradable <= 72) {
			element.querySelector(".TradeLock-lock").firstElementChild.childNodes[1].textContent = "in " + this.hoursUntilTradable + " hours";
		} else {
			element.querySelector(".TradeLock-lock").firstElementChild.childNodes[1].textContent = "in " + Math.floor(this.hoursUntilTradable / 24) + " days";
		}

		if (this.stickers.length > 0) {
			let itemPreviewStickers = document.createElement("div");
			itemPreviewStickers.className = "ItemPreview-stickers";
			element.querySelector(".ItemPreview-commonInfo").appendChild(itemPreviewStickers);
			for (const sticker of this.stickers) {
				itemPreviewStickers.appendChild(sticker.spawnElement());
			}
		}

		element.querySelector(".ItemPreview-itemImage").firstElementChild.src = this.image;

		element.querySelector(".ItemPreview-priceValue").firstElementChild.innerText = "€" + Listing.formatMoney(this.price);

		if (this.sale == 0) {
			element.querySelector(".ItemPreview-priceValue").removeChild(element.querySelector(".ItemPreview-priceValue").querySelector(".GradientLabel"));
		} else {
			element.querySelector(".ItemPreview-priceValue").querySelector(".GradientLabel").firstElementChild.innerText = "− " + this.sale + "%";
		}

		element.querySelector(".ItemPreview-oldPrice").innerText = "Suggested price €" + Listing.formatMoney(this.suggestedPrice);

		let itemTitleInnerText = "";
		if (this.stattrak) {
			itemTitleInnerText += "StatTrak™ ";
		}
		if (this.souvenir) {
			itemTitleInnerText += "Souvenir ";
		}
		element.querySelector(".ItemPreview-itemTitle").innerText = itemTitleInnerText + this.weapon;
		element.querySelector(".ItemPreview-itemTitle").style.color = this.weaponColor;

		element.querySelector(".ItemPreview-itemName").innerText = this.skin;
		if (this.phase != null) {
			element.querySelector(".ItemPreview-itemName").innerText += " (" + this.phase + ")";
		}
		if (this.fadePercentage != null) {
			element.querySelector(".ItemPreview-itemName").innerText += " (" + this.fadePercentage + "%)";
		}

		element.querySelector(".ItemPreview-itemText").innerText = this.subText;

		if (this.float == null) {
			element.querySelector(".ItemPreview-wear").parentElement.removeChild(element.querySelector(".ItemPreview-wear"));
		} else {
			element.querySelector(".WearBar-value").innerText = this.float;
			element.querySelector(".WearBar-progress").style.left = this.float * 100 + "%";
		}

		element.querySelector(".ItemPreview-link").href = this.link;

		element.instance = this;

		return element;
	};

	delete = () => {
		if (this.element == null) {
			throw new Error("Instance does not have an existing element.");
		}

		this.element.parentElement.removeChild(this.element);
	};

	static formatMoney = (number, decPlaces, decSep, thouSep) => {
		(decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces), (decSep = typeof decSep === "undefined" ? "," : decSep);
		thouSep = typeof thouSep === "undefined" ? "." : thouSep;
		var sign = number < 0 ? "-" : "";
		var i = String(parseInt((number = Math.abs(Number(number) || 0).toFixed(decPlaces))));
		var j = (j = i.length) > 3 ? j % 3 : 0;

		return (
			sign +
			(j ? i.substr(0, j) + thouSep : "") +
			i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
			(decPlaces
				? decSep +
				  Math.abs(number - i)
						.toFixed(decPlaces)
						.slice(2)
				: "")
		);
	};
}

class ListingSticker {
	constructor(name, image) {
		if (name == null) {
			throw new Error("Must provide sticker name.");
		}
		if (image == null) {
			throw new Error("Must provide sticker image.");
		}

		this.name = name;
		this.image = image;
		this.element = null;
	}

	static fromElement = (sticker) => {
		if (sticker == null) {
			throw new Error("Must provide sticker element.");
		}

		let instance = new ListingSticker(sticker.querySelector("img").alt, sticker.querySelector("img").src);
		instance.element = sticker;
		sticker.instance = instance;
		return instance;
	};

	spawnElement = () => {
		let element = document.createElement("div");
		element.className = "Tooltip-link";
		element.innerHTML = '<img src="' + this.image + '" alt="' + this.name + '" loading="lazy" class="ItemPreview-sticker">';
		this.element = element;
		element.instance = this;
		return element;
	};

	delete = () => {
		if (this.element == null) {
			throw new Error("Instance does not have an existing element.");
		}

		this.element.parentElement.removeChild(this.element);
	};
}

class FilterPanel {
	constructor(
		name,
		opened = false,
		hidden = false,
		onOpen = function () {},
		onClose = function () {},
		onFlip = function () {},
		onAddElement = function () {},
		onRename = function () {},
		onShow = function () {},
		onHide = function () {},
		onToggleVisibility = function () {}
	) {
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
		this.element.innerHTML =
			'<div role="presentation" class="FilterWrapper-header"><div class="FilterWrapper-title">' +
			name +
			'</div><div class="FilterWrapper-arrow"><svg class="bottom-chevron"><use xlink:href="https://skinport.com/static/svg/sprite.81f09c5387380f409877.svg#bottom-chevron"></use></svg></div></div><div class="FilterWrapper-contentWrapper hidden" style="display: none"><div class="FilterWrapper-content"><div class="' +
			name.trim().replace(" ", "") +
			'"></div></div></div>';g
		this.element.querySelector(".FilterWrapper-header").addEventListener("click", this.flip);

		if (opened) {
			this.open();
		}
		if (hidden) {
			this.hide();
		}

		document.querySelector(".CatalogFilter").firstElementChild.before(this.element);

		this.element.instance = this;
	}

	rename = (name) => {
		this.name = name;
		this.element.querySelector(".FilterWrapper-title").innerText = name;
		this.element.querySelector(".FilterWrapper-content").firstElementChild.className = name.trim().replace(" ", "");
		this.onRename();
	};

	toggleVisibility = () => {
		this.hidden = !this.hidden;
		if (this.hidden) {
			this.hide();
		} else {
			this.show();
		}
		this.onToggleVisibility();
	};

	show = () => {
		this.hidden = false;
		this.element.style.display = "";
		this.onShow();
	};

	hide = () => {
		this.hidden = true;
		this.element.style.display = "none";
		this.onHide();
	};

	flip = () => {
		this.opened = !this.opened;
		if (this.opened) {
			this.open();
		} else {
			this.close();
		}
		this.onFlip();
	};

	open = () => {
		this.opened = true;
		this.element.querySelector(".FilterWrapper-contentWrapper").style.display = "";
		this.element.querySelector(".FilterWrapper-contentWrapper").classList.remove("hidden");
		this.element.classList.add("FilterWrapper--opened");
		this.onOpen();
	};

	close = () => {
		this.opened = false;
		this.element.querySelector(".FilterWrapper-contentWrapper").style.display = "none";
		this.element.querySelector(".FilterWrapper-contentWrapper").classList.add("hidden");
		this.element.classList.remove("FilterWrapper--opened");
		this.onClose();
	};

	addCheckbox = (
		name,
		enabled = false,
		hidden = false,
		onActivate = function () {},
		onDeactivate = function () {},
		onToggle = function () {},
		onShow = function () {},
		onHide = function () {},
		onToggleVisibility = function () {},
		onRename = function () {}
	) => {
		let checkbox = new FilterPanelCheckbox(name, enabled, hidden, onActivate, onDeactivate, onToggle, onShow, onHide, onToggleVisibility, onRename);
		this.elements.push(checkbox);
		this.element.querySelector(".FilterWrapper-content").firstElementChild.appendChild(checkbox.element);
		this.onAddElement();
		return checkbox;
	};

	addTextbox = (
		name,
		prefix = "",
		placeholder = "...",
		value = "",
		hidden = false,
		onInput = function () {},
		onShow = function () {},
		onHide = function () {},
		onToggleVisibility = function () {},
		onRename = function () {},
		onSetPrefix = function () {},
		onSetPlaceholder = function () {},
		onSetValue = function () {}
	) => {
		let textbox = new FilterPanelTextbox(
			name,
			prefix,
			placeholder,
			value,
			hidden,
			onInput,
			onShow,
			onHide,
			onToggleVisibility,
			onRename,
			onSetPrefix,
			onSetPlaceholder,
			onSetValue
		);
		this.elements.push(textbox);
		this.element.querySelector(".FilterWrapper-content").firstElementChild.appendChild(textbox.element);
		this.onAddElement();
		return textbox;
	};

	addButton = (
		name,
		hidden = false,
		onClick = function () {},
		onRename = function () {},
		onShow = function () {},
		onHide = function () {},
		onToggleVisibility = function () {}
	) => {
		let button = new FilterPanelButton(name, hidden, onClick, onRename, onShow, onHide, onToggleVisibility);
		this.elements.push(button);
		this.element.querySelector(".FilterWrapper-content").firstElementChild.appendChild(button.element);
		this.onAddElement();
		return button;
	};

	addDropdown = (
		name,
		hidden = false,
		onOpen = function () {},
		onClose = function () {},
		onFlip = function () {},
		onSelect = function () {},
		onShow = function () {},
		onHide = function () {},
		onToggleVisibility = function () {},
		onRename = function () {}
	) => {
		let dropdown = new FilterPanelDropdown(name, hidden, onOpen, onClose, onFlip, onSelect, onShow, onHide, onToggleVisibility, onRename);
		this.elements.push(dropdown);
		this.element.querySelector(".FilterWrapper-content").firstElementChild.appendChild(dropdown.element);
		this.onAddElement();
		return dropdown;
	};

	toString = () => {
		return this.title;
	};
}

class FilterPanelCheckbox {
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
		this.element.style.marginBottom = "8px";
		this.element.innerHTML =
			'<div class="Checkbox Checkbox--center"><input class="Checkbox-input" type="checkbox"><div class="Checkbox-overlay"></div><div class="Checkbox-label"></div></div>';

		this.element.querySelector(".Checkbox-label").innerText = name;
		if (enabled) {
			this.activate();
		}
		if (hidden) {
			this.hide();
		}

		this.element.addEventListener("click", this.toggle);

		this.element.instance = this;
	}

	rename = (name) => {
		this.name = name;
		this.element.querySelector(".Checkbox-label").innerText = name;
		this.onRename();
	};

	toggle = () => {
		this.enabled = !this.enabled;
		if (this.enabled) {
			this.activate();
		} else {
			this.deactivate();
		}
		this.onToggle();
	};

	activate = () => {
		this.enabled = true;
		this.element.firstElementChild.classList.add("Checkbox--active");
		this.onActivate();
	};

	deactivate = () => {
		this.enabled = false;
		this.element.firstElementChild.classList.remove("Checkbox--active");
		this.onDeactivate();
	};

	toggleVisibility = () => {
		this.hidden = !this.hidden;
		if (this.hidden) {
			this.hide();
		} else {
			this.show();
		}
		this.onToggleVisibility();
	};

	hide = () => {
		this.hidden = true;
		this.element.style.display = "none";
		this.onHide();
	};

	show = () => {
		this.hidden = false;
		this.element.style.display = "";
		this.onShow();
	};

	toString = () => {
		return this.name;
	};
}

class FilterPanelTextbox {
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
		innerHTML = '<span class="PriceFilter-label">' + name + '</span><div class="PriceFilter-inputWrapper" style="width: 100%;">';
		if (prefix != "" && prefix != null && prefix != undefined) {
			innerHTML += '<span class="PriceFilter-currency">' + prefix + "</span>";
		}
		innerHTML +=
			'<input class="PriceFilter-input" placeholder="' + placeholder + '" id="pricegt" autocomplete="off" spellcheck="false" autocorrect="false" autocapitalize="off"></div>';
		this.element.innerHTML = innerHTML;

		this.element.querySelector("input").value = value;

		if (hidden) {
			this.hide();
		}

		this.element.querySelector("input").addEventListener("input", (event) => {
			this.value = event.target.value;
		});
		this.element.querySelector("input").addEventListener("input", onInput);

		this.element.instance = this;
	}

	rename = (name) => {
		this.name = name;
		this.element.querySelector(".PriceFilter-label").innerText = name;
		this.onRename();
	};

	setPrefix = (prefix) => {
		this.prefix = prefix;
		if (this.element.querySelectorAll(".PriceFilter-currency").length != 0) {
			this.element.querySelector(".PriceFilter-currency").innerText = prefix;
		}
		this.onSetPrefix();
	};

	setPlaceholder = (placeholder) => {
		this.placeholder = placeholder;
		this.element.querySelector(".PriceFilter-input").setAttribute("placeholder", placeholder);
		this.onSetPlaceholder();
	};

	setValue = (value) => {
		this.value = value;
		this.element.querySelector("input").value = value;
		this.onSetValue();
	};

	toggleVisibility = () => {
		this.hidden = !this.hidden;
		if (this.hidden) {
			this.hide();
		} else {
			this.show();
		}
		this.onToggleVisibility();
	};

	show = () => {
		this.hidden = false;
		this.element.style.display = "";
		this.onShow();
	};

	hide = () => {
		this.hidden = true;
		this.element.style.display = "none";
		this.onHide();
	};

	toString = () => {
		return this.name + ": " + this.value;
	};
}

class FilterPanelButton {
	constructor(name, hidden, onClick, onRename, onShow, onHide, onToggleVisibility) {
		this.name = name;
		this.hidden = hidden;
		this.onClick = onClick;
		this.onRename = onRename;
		this.onShow = onShow;
		this.onHide = onHide;
		this.onToggleVisibility = onToggleVisibility;

		this.element = document.createElement("button");
		this.element.type = "button";
		this.element.className = "ExteriorFilter-showExactBtn";
		this.element.innerText = name;

		this.element.style.marginBottom = "8px";
		this.element.addEventListener("click", onClick);

		if (hidden) {
			this.hide();
		}

		this.element.instance = this;
	}

	rename = (name) => {
		this.name = name;
		this.element.innerHTML = '<div class="SubmitButton-title">' + name + "</div>";
		this.onRename();
	};

	toggleVisibility = () => {
		this.hidden = !this.hidden;
		if (this.hidden) {
			this.hide();
		} else {
			this.show();
		}
		this.onToggleVisibility();
	};

	show = () => {
		this.hidden = false;
		this.element.style.display = "";
		this.onShow();
	};

	hide = () => {
		this.hidden = true;
		this.element.style.display = "none";
		this.onHide();
	};

	toString = () => {
		return this.name;
	};
}

class FilterPanelDropdown {
	constructor(name, hidden, onOpen, onClose, onFlip, onSelect, onShow, onHide, onToggleVisibility, onRename) {
		this.name = name;
		this.hidden = hidden;
		this.onOpen = onOpen;
		this.onClose = onClose;
		this.onFlip = onFlip;
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
		this.element.innerHTML =
			'<label class="adyen-checkout__label"><div class="adyen-checkout__input-wrapper"><div class="adyen-checkout__dropdown Select-module_adyen-checkout__dropdown__0Mj-n adyen-checkout__issuer-list__dropdown"><div aria-disabled="false" aria-expanded="false" aria-haspopup="listbox" class="adyen-checkout__dropdown__button Select-module_adyen-checkout__dropdown__button__yTyqq" role="button" tabindex="0" title="' +
			name +
			'" id=""><span class="adyen-checkout__dropdown__button__text">' +
			name +
			'</span></div><ul class="test adyen-checkout__dropdown__list Select-module_adyen-checkout__dropdown__list__YtEzj" id="select-9f75bc30-152a-4394-a9e4-96e86f1a7d1c" role="listbox"></ul></div></div></label>';

		this.element.querySelector(".adyen-checkout__dropdown__button").addEventListener("click", this.flip);

		this.element.querySelectorAll("li").forEach((option) => {
			option.addEventListener("click", () => {
				this.select(option);
			});
		});

		if (hidden) {
			this.hide();
		}

		this.element.instance = this;
	}

	rename = (name) => {
		this.element.querySelector(".Select-module_adyen-checkout__dropdown__button__yTyqq").title = name;
		this.element.querySelector(".adyen-checkout__dropdown__button__text").innerText = name;
		this.onRename();
	};

	toggleVisibility = () => {
		this.hidden = !this.hidden;
		if (this.hidden) {
			this.hide();
		} else {
			this.show();
		}
		this.onToggleVisibility();
	};

	show = () => {
		this.hidden = false;
		this.element.style.display = "";
		this.onShow();
	};

	hide = () => {
		this.hidden = true;
		this.element.style.display = "none";
		this.onHide();
	};

	select = (option) => {
		this.element.querySelector(".adyen-checkout__dropdown__button").innerHTML =
			'<img class="adyen-checkout__dropdown__button__icon adyen-checkout__image adyen-checkout__image--loaded" src="' +
			option.image +
			'" alt="ING"><span class="adyen-checkout__dropdown__button__text">' +
			option.name +
			"</span>";
		this.selected = option.name;
		this.close();
		this.onSelect();
	};

	flip = () => {
		this.opened = !this.opened;
		if (this.opened) {
			this.open();
		} else {
			this.close();
		}
		this.onFlip();
	};

	open = () => {
		this.opened = true;
		this.element.querySelector(".adyen-checkout__dropdown__list").classList.add("adyen-checkout__dropdown__list--active");
		this.element.querySelector(".adyen-checkout__dropdown__list").classList.add("Select-module_adyen-checkout__dropdown__list--active__Gegw2");
		this.onOpen();
	};

	close = () => {
		this.opened = false;
		this.element.querySelector(".adyen-checkout__dropdown__list").classList.remove("adyen-checkout__dropdown__list--active");
		this.element.querySelector(".adyen-checkout__dropdown__list").classList.remove("Select-module_adyen-checkout__dropdown__list--active__Gegw2");
		this.onClose();
	};

	addOption = (option) => {
		this.options.push(option);
		this.element.querySelector("ul").appendChild(option.element);
	};

	findOptionByName = (name) => {
		for (const option of this.options) {
			if (option.name == name) {
				return option;
			}
		}
		return null;
	};
}

class FilterPanelDropdownOption {
	constructor(name, image, dropdown) {
		this.name = name;
		this.image = image;
		this.dropdown = dropdown;

		this.element = document.createElement("li");
		this.element.setAttribute("aria-disabled", false);
		this.element.setAttribute("aria-selected", false);
		this.element.classList.add("adyen-checkout__dropdown__element");
		this.element.classList.add("Select-module_adyen-checkout__dropdown__element__ORU4-");
		this.element.setAttribute("data-value", "0721");
		this.element.setAttribute("role", "option");
		this.element.setAttribute("tabindex", "-1");
		this.element.innerHTML =
			'<img class="adyen-checkout__dropdown__element__icon adyen-checkout__image adyen-checkout__image--loaded" alt="' +
			name +
			'" src="' +
			image +
			'"><span class="adyen-checkout__dropdown__element__text">' +
			name +
			"</span>";

		this.element.addEventListener("click", this.select);

		this.element.instance = this;
	}

	select = () => {
		this.dropdown.select(this);
	};
}
