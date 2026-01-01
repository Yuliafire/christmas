document.addEventListener("DOMContentLoaded", function () {

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

					giftItem.addEventListener("click", () => {
						openModal(gift);
					});
				});
			};

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
				document.getElementById("popup-desc").textContent =
					gift.description || "Описание отсутствует";

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

				document.getElementById("popup-live").textContent =
					gift.liveRating || "+0";
				document.getElementById("popup-create").textContent =
					gift.createRating || "+0";
				document.getElementById("popup-love").textContent =
					gift.loveRating || "+0";
				document.getElementById("popup-dream").textContent =
					gift.dreamRating || "+0";

				popup.classList.add("popup_on");
				document.body.classList.add('no-scroll');

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

			document.querySelectorAll(".card").forEach((card) => {
				card.addEventListener("click", () => {
					const gift = {
						category: card.dataset.category,
						image: card.dataset.image,
						name: card.dataset.name,
						description: card.dataset.description,
					};
					openModal(gift);
				});
			});

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

			const filterGiftsByCategory = (category) => {
				if (category === "all") {
					renderBestGifts(allGifts);
				} else {
					const filteredGifts = allGifts.filter(
						(gift) => gift.category.toLowerCase() === category,
					);
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
					const category = event.target.dataset.category; 
					filterGiftsByCategory(category);
				});
			});

			renderBestGifts(allGifts);
		})
		.catch((error) => console.error("Fetch error:", error));

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
	window.addEventListener("resize", handleScroll);

	scrollToTopBtn.addEventListener("click", function () {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});

	handleScroll();
});
