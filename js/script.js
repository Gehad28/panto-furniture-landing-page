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


// Cards

const cardsContainer = document.querySelector(".card-wrapper");

fetch("data/chair.json").then((request) => {
    if(!request.ok) {
        console.log("Something went wrong!");
        return null;
    }
    return request.json();
}).then(data => {
    console.log(data);
    data.forEach(card => {
        createCard(card);
    })
});

// Swiper

const customBullets = ["Chair", "Beds", "Sofa", "Lamp"];

var swiper = new Swiper(".slide-content", {
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
});


function createCard(card) {
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

    for (let i = 0; i < Number(card.rating); i++) {
        const icon = document.createElement("i");
        icon.classList.add("fa-solid");
        icon.classList.add("fa-star");
        ratingDiv.appendChild(icon);
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

    cardPriceDiv.appendChild(priceDiv);
    cardPriceDiv.appendChild(addBtn);

    cardBottom.appendChild(cardInfo);
    cardBottom.appendChild(cardPriceDiv);

    cardDiv.appendChild(cardBottom);

    cardsContainer.appendChild(cardDiv);
}