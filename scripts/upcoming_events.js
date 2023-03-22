const contentCards = document.querySelector("#cards");
let currentDate = null;
const cardsGenerated = null;
const searchEvents = document.getElementById("searchEvents");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const filterMessageDiv = document.getElementById("filterMessage");

let eventsAll = [];

// contentCards.innerHTML = cardsGenerated;

function fetchData() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
  //fetch('../data.json')
    .then((response) => response.json())
    .then((dataEvents) => {
        currentDate = dataEvents.currentDate;
        eventsAll = dataEvents.events;
        createCards(eventsAll, contentCards);
})
    .catch((error) => console.log(error.message));
}
fetchData();

function isDateBeforeCurrentDate(date) {
    return new Date(date.toString()) > new Date(currentDate.toString());
}

function createCards(arrayDataEvents) {
    let cardContent = ``;
    for (const event of arrayDataEvents) {
    const eventDate = event.date;
    if (isDateBeforeCurrentDate(eventDate)) {
        cardContent += `
            <div class="cardEvents">
            <div  class="events__img">
                <img src="${event.image}" width="200" height="200" alt="imagen">
            </div>
            <div class="events__titles">
                <h5 class=".events__title">${event.name}</h5>
            </div>
            <div class="events__description">
                <p class="card-text">${event.description}</p>
            </div> 
            <div class="events__price">           
            <span>$${event.price}</span>
            <input type="button" onclick="seeDetails(${event._id})" value="More info" id="button">
            </div>            
        </div>
        `;
    }
}
    contentCards.innerHTML = cardContent;
}



function filterByCategory(data, categories) {
    const filterArray = data.filter(
    (event) => categories.indexOf(event.category) !== -1
);
    createCards(filterArray);
}

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
    const categories = Array.from(checkboxes)
        .filter((i) => i.checked)
        .map((i) => i.value);

    if (categories.length > 0) {
        filterByCategory(eventsAll, categories);
        filterMessageDiv.style.display = "none";
    } else {
        createCards(eventsAll)

        filterMessageDiv.style.display = "inline-block";
    }
});
});

searchEvents.addEventListener("change", () => {
    let eventsNameFilter = eventsAll.filter((event) => event.name.toLowerCase().includes(searchEvents.value.toLowerCase()))
    createCards(eventsNameFilter, contentCards )
});


function seeDetails(id) {
    window.location.href = `./details.html?id=${id} `;
}
