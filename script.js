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

