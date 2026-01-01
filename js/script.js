document.addEventListener("DOMContentLoaded", function () {
	let offset = 0;
	const sliderLine = document.querySelector(".slider__line");
	const btnLeft = document.querySelector(".slider__btn--left");
	const btnRight = document.querySelector(".slider__btn--right");

	function getVisibleWidth() {
		const screenWidth = window.innerWidth;
		if (screenWidth <= 768) {
			return document.querySelector(".slider__wraper").offsetWidth - 10;
		} else {
			return document.querySelector(".slider__wraper").offsetWidth - 160;
		}
	}
	function calculateMaxOffset() {
		const screenWidth = window.innerWidth;
		const visibleWidth = getVisibleWidth();
		const totalWidth = 1993;
		let maxClicks, maxOffset;
		if (screenWidth > 768) {
			maxClicks = 3;
		} else {
			maxClicks = 6;
		}
		maxOffset = (totalWidth - visibleWidth) / maxClicks;
		return Math.min(totalWidth - visibleWidth, maxOffset * maxClicks);
	}
	let maxOffset = calculateMaxOffset();

	window.addEventListener("resize", () => {
		offset = 0;
		maxOffset = calculateMaxOffset();
		sliderLine.style.left = -offset + "px";
		updateButtons();
	});
	function updateButtons() {
		console.log(`Offset: ${offset}, Max Offset: ${maxOffset}`);
		btnLeft.disabled = offset === 0;
		btnRight.disabled = offset >= maxOffset;
	}

	btnRight.addEventListener("click", function () {
		const slideWidth = (1993 - getVisibleWidth()) / (window.innerWidth > 768 ? 3 : 6);
		offset += slideWidth;
		if (offset > maxOffset) {
			offset = maxOffset;
		}
		sliderLine.style.left = -offset + "px";
		updateButtons();
	});

	btnLeft.addEventListener("click", function () {
		const slideWidth = (1993 - getVisibleWidth()) / (window.innerWidth > 768 ? 3 : 6);
		offset -= slideWidth;
		if (offset < 0) {
			offset = 0;
		}
		sliderLine.style.left = -offset + "px";
		updateButtons();
	});

	updateButtons();

	const imagesObj = {
		"For Work": "./assets/img/gift-for-work.png",
		"For Health": "./assets/img/gift-for-health.png",
		"For Harmony": "./assets/img/gift-for-harmony.png",
	};

	const openModal = (gift) => {
		const popup = document.getElementById("popup");

		const popupImg = document.getElementById("popup-img");
		const imagePath = imagesObj[gift.category] || "./assets/default.png";
		popupImg.src = gift.image || imagePath;
		popupImg.alt = gift.name;

		document.getElementById("popup-type").textContent = gift.category;
		document.getElementById("popup-title").textContent = gift.name;
		document.getElementById("popup-desc").textContent = gift.description || "Описание отсутствует";

		const popupType = document.getElementById("popup-type");

		popupType.classList.remove("popup__type--for-work", "popup__type--for-health", "popup__type--for-harmony");

		switch (gift.category) {
			case "For Work":
				popupType.classList.add("popup__type--for-work");
				break;
			case "For Health":
				popupType.classList.add("popup__type--for-health");
				break;
			case "For Harmony":
				popupType.classList.add("popup__type--for-harmony");
				break;
			default:
				break;
		}

		document.getElementById("popup-live").textContent = gift.liveRating || "+0";
		document.getElementById("popup-create").textContent = gift.createRating || "+0";
		document.getElementById("popup-love").textContent = gift.loveRating || "+0";
		document.getElementById("popup-dream").textContent = gift.dreamRating || "+0"
		popup.classList.add("popup_on");

		document.body.classList.add('no-scroll');

		const popupClose = document.getElementById("popup-close");
		popupClose.addEventListener("click", closeModal);
	};

	const closeModal = () => {
		const popup = document.getElementById("popup");
		popup.classList.remove("popup_on")
		document.body.classList.remove('no-scroll');
	};

	fetch("https://dummyjson.com/c/157f-c713-4657-9246")
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok " + response.statusText);
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);
			const allGifts = data.products || data;
			const getRandomGifts = (gifts, count) => {
				const shuffled = gifts.sort(() => 0.5 - Math.random());
				return shuffled.slice(0, count);
			};
			const renderBestGifts = (gifts) => {
				const bestGiftsContainer = document.getElementById("best-gifts");

				bestGiftsContainer.innerHTML = "";

				gifts.forEach((gift) => {
					let imagePath;
					switch (gift.category) {
						case "For Work":
							imagePath = "./assets/img/gift-for-work.png";
							break;
						case "For Health":
							imagePath = "./assets/img/gift-for-health.png";
							break;
						case "For Harmony":
							imagePath = "./assets/img/gift-for-harmony.png";
							break;
						default:
							imagePath = "./assets/default.png";
					}
					const giftItem = document.createElement("div");
					giftItem.classList.add("best-gifts__card");

					const cardWrapper = document.createElement("div");
					cardWrapper.classList.add("card__wrapper");
					const giftImage = document.createElement("img");
					giftImage.classList.add("card__image");
					giftImage.src = gift.image || imagePath;
					giftImage.alt = gift.name;
					const cardContent = document.createElement("div");
					cardContent.classList.add("card__content");
					const giftCategory = document.createElement("h3");
					giftCategory.textContent = gift.category;
					giftCategory.classList.add(
						"card__title",
						`card__title--${gift.category.toLowerCase().replace(" ", "-")}`,
					);
					const giftName = document.createElement("p");
					giftName.textContent = gift.name;
					giftName.classList.add("card__text");
					cardContent.appendChild(giftCategory);
					cardContent.appendChild(giftName);
					cardWrapper.appendChild(giftImage);
					cardWrapper.appendChild(cardContent);
					giftItem.appendChild(cardWrapper);
					bestGiftsContainer.appendChild(giftItem);

					giftItem.addEventListener("click", () => openModal(gift));
				});
			};
			const randomGifts = getRandomGifts(allGifts, 4);
			renderBestGifts(randomGifts);
		})
		.catch((error) => console.error("Fetch error:", error));

	document.addEventListener("click", (event) => {
		const popup = document.getElementById("popup");
		if (event.target === popup) {
			closeModal();
		}
	});

	function startTimer(display) {
		function updateTimer() {
			const now = new Date();
			const nextYear = new Date(Date.UTC(now.getUTCFullYear() + 1, 0, 1));
			const diff = nextYear - now;
			const days = Math.floor(diff / (24 * 60 * 60 * 1000));
			const hours = Math.floor(
				(diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000),
			);
			const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
			const seconds = Math.floor((diff % (60 * 1000)) / 1000);
			display.querySelector("#days").textContent = days;
			display.querySelector("#hours").textContent = hours;
			display.querySelector("#minutes").textContent = minutes;
			display.querySelector("#seconds").textContent = seconds;
		}
		updateTimer();
		setInterval(updateTimer, 1000);
	}
	window.onload = function () {
		const display = document.querySelector("#timer");
		if (display) {
			startTimer(display);
		} else {
			console.error('Element with id "timer" not found.');
		}
	};
});
