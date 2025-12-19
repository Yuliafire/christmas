// offset += 238;
// offset has to be different for 768px and 380px - 6 clicks !!! add if windon width > 768px, and
// window width <= 768px

// if (offset > 768) {
// 	offset = 0;
//  }
// maxOffset =  1993px - 1280 = 713px; for screen width 1440px;
// 1440 - 160 = 1280px (paddings left and right) - visible area for 1440px
// step  = 713 / 3 = 238px;

// maxOffset for screen width 768px is different and there will be 6 clicks
// maxOffset for screen width 380px is different and there will be 6 clicks

// let maxOffset = 713;
//Событие resize обновляет значение maxOffset при изменении размера окна.
// let maxOffset = 713;

// function calculateMaxOffset() {
// 	const visibleWidth = document.querySelector(".slider__wraper").offsetWidth - 160; // ширина видимой области
// 	const totalWidth = sliderLine.scrollWidth; // общая ширина всех слайдов
// 	return totalWidth - visibleWidth; // максимальное смещение
// }
// let maxOffset = calculateMaxOffset();

// SLIDER start
// const totalWidth = 1993;
// const visibleWidth = document.querySelector(".slider__wraper").offsetWidth - 160;
// function calculateMaxOffset() {
// 	const screenWidth = window.innerWidth;
// 	let maxClicks, maxOffset;
// 	if (screenWidth > 768) {
// 		maxClicks = 3;
// 	} else {
// 		maxClicks = 6;
// 	}
// 	maxOffset = (totalWidth - visibleWidth) / maxClicks;
// 	return Math.min(totalWidth - visibleWidth, maxOffset * maxClicks);
// }
document.addEventListener("DOMContentLoaded", function () {
	let offset = 0;
	const sliderLine = document.querySelector(".slider__line");
	const slides = document.querySelectorAll(".slider__item");
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
		offset = 0; // Сбрасываем смещение при изменении размера экрана
		maxOffset = calculateMaxOffset();
		sliderLine.style.left = -offset + "px"; // Возвращаем слайдер в начальное положение
		updateButtons();
	});
	function updateButtons() {
		console.log(`Offset: ${offset}, Max Offset: ${maxOffset}`);
		btnLeft.disabled = offset === 0;
		btnRight.disabled = offset >= maxOffset;

		// btnLeft.disabled = offset === 0;
		// btnRight.disabled = offset >= maxOffset;
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

	// SLIDER end



	const imagesObj = {
		"For Work": "./assets/img/gift-for-work.png",
		"For Health": "./assets/img/gift-for-health.png",
		"For Harmony": "./assets/img/gift-for-harmony.png",
	};


const openModal = (gift) => {
    const popup = document.getElementById("popup");

    // Обновляем изображение
    const popupImg = document.getElementById("popup-img");
    const imagePath = imagesObj[gift.category] || "./assets/default.png";
    popupImg.src = gift.image || imagePath;
    popupImg.alt = gift.name;

    // Обновляем текстовые элементы
    document.getElementById("popup-type").textContent = gift.category;
    document.getElementById("popup-title").textContent = gift.name;
    document.getElementById("popup-desc").textContent = gift.description || "Описание отсутствует";

	const popupType = document.getElementById("popup-type");

	// Удаляем предыдущие классы заголовка
popupType.classList.remove("popup__type--for-work", "popup__type--for-health", "popup__type--for-harmony");

// Добавляем новый класс заголовка в зависимости от категории
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


    // Обновляем рейтинги
    document.getElementById("popup-live").textContent = gift.liveRating || "+0";
    document.getElementById("popup-create").textContent = gift.createRating || "+0";
    document.getElementById("popup-love").textContent = gift.loveRating || "+0";
    document.getElementById("popup-dream").textContent = gift.dreamRating || "+0";

    // Показываем модальное окно
    popup.classList.add("popup_on");

    // Отключаем прокрутку страницы
    document.body.classList.add('no-scroll');

	 // Отключаем прокрутку страницы
	 document.body.classList.add('no-scroll');

	   // Добавляем обработчик для закрытия модального окна
	   const popupClose = document.getElementById("popup-close");
	   popupClose.addEventListener("click", closeModal);
   };

   const closeModal = () => {
    const popup = document.getElementById("popup");
    popup.classList.remove("popup_on");

    // Включаем прокрутку страницы
    document.body.classList.remove('no-scroll');
};

	// fetch API start
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
							imagePath = "./assets/default.png"; // на случай, если категория не совпадает с известными
					}
					const giftItem = document.createElement("div");
					giftItem.classList.add("best-gifts__card");

					const cardWrapper = document.createElement("div");
					cardWrapper.classList.add("card__wrapper");
					const giftImage = document.createElement("img");
					giftImage.classList.add("card__image");
					giftImage.src = gift.image || imagePath; //Используем изображение по умолчанию, если его нет
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

					 // Добавляем обработчик события для открытия модального окна
					 giftItem.addEventListener("click", () => openModal(gift));
				});
			};
			const randomGifts = getRandomGifts(allGifts, 4);
			renderBestGifts(randomGifts);
		})
		.catch((error) => console.error("Fetch error:", error));

// Закрытие модального окна при клике вне его
document.addEventListener("click", (event) => {
    const popup = document.getElementById("popup");
    if (event.target === popup) {
        closeModal();
    }
});
	// TIMER START
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
	// TIMER END

});
