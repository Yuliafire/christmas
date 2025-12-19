document.addEventListener("DOMContentLoaded", function () {
	// fetch API start

	// 1st solution only tabs and rendering
	// fetch("https://dummyjson.com/c/157f-c713-4657-9246")
	// 	.then((response) => {
	// 		if (!response.ok) {
	// 			throw new Error("Network response was not ok " + response.statusText);
	// 		}
	// 		return response.json();
	// 	})
	// 	.then((data) => {
	// 		console.log(data);
	// 		const allGifts = data.products || data;

	// 		const renderBestGifts = (gifts) => {
	// 			const bestGiftsContainer = document.getElementById("gifts-page");
	// 			bestGiftsContainer.innerHTML = "";

	// 			gifts.forEach((gift) => {
	// 				let imagePath;
	// 				switch (gift.category) {
	// 					case "For Work":
	// 						imagePath = "./assets/img/gift-for-work.png";
	// 						break;
	// 					case "For Health":
	// 						imagePath = "./assets/img/gift-for-health.png";
	// 						break;
	// 					case "For Harmony":
	// 						imagePath = "./assets/img/gift-for-harmony.png";
	// 						break;
	// 					default:
	// 						imagePath = "./assets/default.png"; // на случай, если категория не совпадает с известными
	// 				}
	// 				const giftItem = document.createElement("div");
	// 				giftItem.classList.add("best-gifts__card");
	// 				const cardWrapper = document.createElement("div");
	// 				cardWrapper.classList.add("card__wrapper");
	// 				const giftImage = document.createElement("img");
	// 				giftImage.classList.add("card__image");
	// 				giftImage.src = gift.image || imagePath; //Используем изображение по умолчанию, если его нет
	// 				giftImage.alt = gift.name;
	// 				const cardContent = document.createElement("div");
	// 				cardContent.classList.add("card__content");
	// 				const giftCategory = document.createElement("h3");
	// 				giftCategory.textContent = gift.category;
	// 				giftCategory.classList.add(
	// 					"card__title",
	// 					`card__title--${gift.category.toLowerCase().replace(" ", "-")}`,
	// 				);
	// 				const giftName = document.createElement("p");
	// 				giftName.textContent = gift.name;
	// 				giftName.classList.add("card__text");
	// 				cardContent.appendChild(giftCategory);
	// 				cardContent.appendChild(giftName);
	// 				cardWrapper.appendChild(giftImage);
	// 				cardWrapper.appendChild(cardContent);
	// 				giftItem.appendChild(cardWrapper);
	// 				bestGiftsContainer.appendChild(giftItem);
	// 			});
	// 		};

	// 		const filterGiftsByCategory = (category) => {
	// 			console.log(`Filtering by category: ${category}`);
	// 			if (category === "all") {
	// 				renderBestGifts(allGifts);
	// 			} else {
	// 				const filteredGifts = allGifts.filter(
	// 					(gift) => gift.category.toLowerCase() === category,
	// 				);
	// 				console.log(`Filtered gifts:`, filteredGifts);
	// 				renderBestGifts(filteredGifts);
	// 			}
	// 		};

	// 		document.querySelectorAll(".gifts__tabs-tab").forEach((tab) => {
	// 			tab.addEventListener("click", (event) => {
	// 				const activeTab = document.querySelector(".gifts__tabs-tab--active");
	// 				if (activeTab) {
	// 					activeTab.classList.remove("gifts__tabs-tab--active");
	// 				}
	// 				event.target.classList.add("gifts__tabs-tab--active");
	// 				const category = event.target.getAttribute("data-category");
	// 				filterGiftsByCategory(category);
	// 			});
	// 		});

	// 		renderBestGifts(allGifts);
	// 	})
	// 	.catch((error) => console.error("Fetch error:", error));

	// 2nd solution tabs rendering and modals

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

			const renderBestGifts = (gifts) => {
				const bestGiftsContainer = document.getElementById("gifts-page");
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

					// Добавляем обработчик клика для открытия модального окна
					giftItem.addEventListener("click", () => {
						openModal(gift);
					});
				});
			};

			// opening and closing MODAL START

			

			// const openModal = (gift) => {
			// 	const popup = document.getElementById("popup");
			// 	const popupImg = document.getElementById("popup-img");
			// 	const popupType = document.getElementById("popup-type");
			// 	const popupTitle = document.getElementById("popup-title");
			// 	const popupDesc = document.getElementById("popup-desc");

			// 	const imagePath = imagesObj[gift.category] || "./assets/default.png";
			// 	popupImg.src = gift.image || imagePath;
			// 	popupImg.alt = gift.name;
			// 	popupType.textContent = gift.category;
			// 	popupTitle.textContent = gift.name;
			// 	popupDesc.textContent = gift.description || "Описание отсутствует";

			// 	// popup.classList.add("popup--visible");
			// 	popup.classList.add("popup_on");
			// };


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
				document.getElementById("popup-desc").textContent =
					gift.description || "Описание отсутствует";

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
				document.getElementById("popup-live").textContent =
					gift.liveRating || "+0";
				document.getElementById("popup-create").textContent =
					gift.createRating || "+0";
				document.getElementById("popup-love").textContent =
					gift.loveRating || "+0";
				document.getElementById("popup-dream").textContent =
					gift.dreamRating || "+0";

				// Показываем модальное окно
				popup.classList.add("popup_on");
				    // Отключаем прокрутку страницы
					document.body.classList.add('no-scroll');

				// Добавляем обработчик для закрытия модального окна
				const popupClose = document.getElementById("popup-close");
				popupClose.addEventListener("click", () => {
					popup.classList.remove("popup_on");
				});
			};

			const closeModal = () => {
				const popup = document.getElementById("popup");

				popup.classList.remove("popup_on");

				document.body.classList.remove('no-scroll');
			};

			// Пример добавления обработчика события для открытия модального окна
			document.querySelectorAll(".card").forEach((card) => {
				card.addEventListener("click", () => {
					const gift = {
						category: card.getAttribute("data-category"),
						image: card.getAttribute("data-image"),
						name: card.getAttribute("data-name"),
						description: card.getAttribute("data-description"),
					};
					openModal(gift);
				});
			});

			// Добавляем обработчик для закрытия модального окна при клике на кнопку закрытия
			const popupClose = document.getElementById("popup-close");
			if (popupClose) {
				popupClose.addEventListener("click", closeModal);
			}

			document.addEventListener("click", (event) => {
				const popup = document.getElementById("popup");
				if (event.target === popup) {
					closeModal();
				}
			});

			// opening and closing MODAL END

			const filterGiftsByCategory = (category) => {
				console.log(`Filtering by category: ${category}`);
				if (category === "all") {
					renderBestGifts(allGifts);
				} else {
					const filteredGifts = allGifts.filter(
						(gift) => gift.category.toLowerCase() === category,
					);
					console.log(`Filtered gifts:`, filteredGifts);
					renderBestGifts(filteredGifts);
				}
			};

			document.querySelectorAll(".gifts__tabs-tab").forEach((tab) => {
				tab.addEventListener("click", (event) => {
					const activeTab = document.querySelector(".gifts__tabs-tab--active");
					if (activeTab) {
						activeTab.classList.remove("gifts__tabs-tab--active");
					}
					event.target.classList.add("gifts__tabs-tab--active");
					const category = event.target.getAttribute("data-category");
					filterGiftsByCategory(category);
				});
			});

			renderBestGifts(allGifts);
		})
		.catch((error) => console.error("Fetch error:", error));

	// Функция для открытия модального окна
	// const openModal = (gift) => {
	//     const modal = document.getElementById("modal");
	//     const modalTitle = document.getElementById("modal-title");
	//     const modalDescription = document.getElementById("modal-description");
	//     const modalSuperpowers = document.getElementById("modal-superpowers");

	//     modalTitle.textContent = gift.name;
	//     modalDescription.textContent = gift.description;
	//     modalSuperpowers.textContent = `Superpowers: ${gift.superpowers.join(", ")}`;

	//     modal.style.display = "block";
	// };

	// Функция для закрытия модального окна
	// const closeModal = () => {
	//     const modal = document.getElementById("modal");
	//     modal.style.display = "none";
	// };

	// Добавляем обработчик для закрытия модального окна при клике на крестик
	// document.querySelector(".close").addEventListener("click", closeModal);

	// Добавляем обработчик для закрытия модального окна при клике вне его
	// window.addEventListener("click", (event) => {
	//     const modal = document.getElementById("modal");
	//     if (event.target === modal) {
	//         closeModal();
	//     }
	// });

	const scrollToTopBtn = document.getElementById("scrollToTopBtn");
	function handleScroll() {
		if (window.innerWidth <= 768) {
			if (window.scrollY > 300) {
				scrollToTopBtn.style.display = "block";
			} else {
				scrollToTopBtn.style.display = "none";
			}
		} else {
			scrollToTopBtn.style.display = "none";
		}
	}

	window.addEventListener("scroll", handleScroll);
	window.addEventListener("resize", handleScroll); // Обработчик для изменения размера окна

	scrollToTopBtn.addEventListener("click", function () {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});

	handleScroll();
});
// scrollToTopButton end
