// Navbar

const listItems = document.querySelectorAll(".list-item");

const deactivateListItems = () => {
    listItems.forEach(item => {
        item.classList.remove("active");
    });
}

const handleListItems = (e) => {
    deactivateListItems();
    e.target.classList.add("active");
}

listItems.forEach(item => {
    item.addEventListener("click", handleListItems);
});

const furnitureBtn = document.querySelector(".drop-menu-btn");
const dropDpwnMenu = document.querySelector(".drop-menu");

const handleDropDownMenu = (e) => {
    dropDpwnMenu.classList.toggle("show-drop-menu");
}

furnitureBtn.addEventListener("click", handleDropDownMenu);

// Navbar for mobile

const navBtn = document.querySelector(".nav-btn");
const navContainer = document.querySelector(".navbar-mobile");
const closeBtn = document.querySelector(".close-btn");

navBtn.addEventListener("click", (e) => {
    navContainer.classList.add("open");
});

closeBtn.addEventListener("click", (e) => {
    navContainer.classList.remove("open");
});

const furnitureBtnMob = document.querySelector(".drop-menu-btn-mob");
const dropDpwnMenuMob = document.querySelector(".drop-menu-mob");

furnitureBtnMob.addEventListener("click", (e) => {
    if (dropDpwnMenuMob.style.height === "0px" || !dropDpwnMenuMob.style.height) {
        const conetentHeight = dropDpwnMenuMob.scrollHeight;
        dropDpwnMenuMob.style.height = conetentHeight + 'px';
    }
    else {
        dropDpwnMenuMob.style.height = "0";
    }
});


// Cards

fetch("data/chair.json").then((request) => {
    if(!request.ok) {
        console.log("Something went wrong!");
        return null;
    }
    return request.json();
}).then(data => {
    data.forEach(card => {
        createCard(card);
    })
});

// Swiper

const customBullets = ["Chair", "Beds", "Sofa", "Lamp"];

var swiper = new Swiper(".slide-content", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 50,
    loop: false,
    centerSlide: 'true',
    fade: 'true',
    gragCursor: 'true',
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        680: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 50,
            loop: false,
            centerSlide: 'true',
            fade: 'true',
            gragCursor: 'true',
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        },
        953: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 50,
            loop: false,
            centerSlide: 'true',
            fade: 'true',
            gragCursor: 'true',
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        },
        1080: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 50,
            loop: false,
            centerSlide: 'true',
            fade: 'true',
            gragCursor: 'true',
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                    return `<button class="${className}">${customBullets[index]}</button>`; // Numbered bullets
                },
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        }
    }
});


// Reviews

fetch("data/reviews.json").then((response) => {
    if (!response.ok) {
        console.log("Something went wrong!");
        return null;
    }
    return response.json();
}).then(data => {
    data.forEach(card => {
        createReviewCard(card);
    })
});

var swiperReviews = new Swiper(".slide-content-reviews", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: false,
    centerSlide: 'true',
    fade: 'true',
    gragCursor: 'true',
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        685: {
            slidesPerView: 2,
            spaceBetween: 10,
            loop: false,
            centerSlide: 'true',
            fade: 'true',
            gragCursor: 'true',
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        },
        850: {
            slidesPerView: 3,
            spaceBetween: 10,
            loop: false,
            centerSlide: 'true',
            fade: 'true',
            gragCursor: 'true',
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        }
    }
});



function createCard(card) {
    const cardsContainer = document.querySelector(".card-wrapper");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.classList.add("swiper-slide");

    const imageBg = document.createElement("div");
    imageBg.classList.add("image-bg");
    imageBg.innerHTML = `<img src="${card.img}" alt="${card.imgAlt}">`;

    cardDiv.appendChild(imageBg);

    const cardBottom = document.createElement("div");
    cardBottom.classList.add("card-bottom");

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");
    cardInfo.innerHTML = `
        <p>${card.type}</p>
        <p class="item-name">${card.name}</p>
    `;

    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating");

    createRatingIcons(card.rating, ratingDiv, false);

    if (Number(card.rating) < 5) {
        createRatingIcons(5 - card.rating, ratingDiv, true);
    }
    cardInfo.appendChild(ratingDiv);

    const cardPriceDiv = document.createElement("div");
    cardPriceDiv.classList.add("card-price");

    const priceDiv = document.createElement("div");
    priceDiv.classList.add("price");
    priceDiv.innerHTML = `
        <p>$</p>
        <p>${card.price}</p>
    `;

    const addBtn = document.createElement("button");
    addBtn.classList.add("btn-dark");
    addBtn.classList.add("add-btn");

    addBtn.addEventListener("click", handleAddBtn);

    cardPriceDiv.appendChild(priceDiv);
    cardPriceDiv.appendChild(addBtn);

    cardBottom.appendChild(cardInfo);
    cardBottom.appendChild(cardPriceDiv);

    cardDiv.appendChild(cardBottom);

    cardsContainer.appendChild(cardDiv);
}

function createRatingIcons(rating, ratingDiv, flag) {
    for (let i = 0; i < Number(rating); i++) {
        const icon = document.createElement("i");
        icon.classList.add("fa-solid");
        icon.classList.add("fa-star");
        if (flag) {
            icon.classList.add("bale-star");
        }
        ratingDiv.appendChild(icon);
    }
}

function createReviewCard(card) {
    const reviewsContainer = document.querySelector(".reviews-wrapper");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.classList.add("swiper-slide");

    const image = document.createElement("img");
    image.src = card.bgImg;

    cardDiv.appendChild(image);

    const reviewCard = document.createElement("div");
    reviewCard.classList.add("review-card");

    const profileImage = document.createElement("img");
    profileImage.src = card.profileImg;

    reviewCard.appendChild(profileImage);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");
    infoDiv.innerHTML = `
        <p>${card.name}</p>
        <p>${card.address}</p>
    `;

    const review = document.createElement("p");
    review.innerHTML = `${card.review}`;

    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("rating");
    createRatingIcons(card.rating, ratingDiv, false);

    if (card.rating < 5) {
        createRatingIcons(5 - card.rating, ratingDiv, true);
    }

    reviewCard.appendChild(infoDiv);
    reviewCard.appendChild(review);
    reviewCard.appendChild(ratingDiv);

    cardDiv.appendChild(reviewCard);

    reviewsContainer.appendChild(cardDiv);
}

function handleAddBtn() {
    const cart = document.querySelector(".cart-items-no");
    let cartNo = Number(cart.textContent);
    cart.innerHTML = `${cartNo + 1}`;
}