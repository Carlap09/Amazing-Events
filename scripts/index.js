const contentCards = document.querySelector("#cards");
let cardsGenerated = createCards(data.events);
const searchEvents = document.getElementById("searchEvents");
const currentDate = data.currentDate;
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const filterMessageDiv = document.getElementById('filterMessage')
contentCards.innerHTML = cardsGenerated;


function createCards(arrayDataEvents) {
  let cardContent = ``;
  for (const event of arrayDataEvents) {
    const eventDate = event.date;    
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
  return cardContent;
}



function filterByCategory(data, categories) {
    const filterArray = data.filter(
        (event) => categories.indexOf(event.category) !== -1
    );
      contentCards.innerHTML = createCards(filterArray);
    
    }

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        const categories = Array.from(checkboxes) 
        .filter((i) => i.checked) 
        .map((i) => i.value); 
        
        if (categories.length > 0) {
        filterByCategory(data.events, categories);
        filterMessageDiv.style.display="none"
        } else {
        contentCards.innerHTML = cardsGenerated;
        filterMessageDiv.style.display="inline-block"
        }
    });
});




searchEvents.addEventListener("change", () => {
  let eventsNameFilter = data.events.filter((event) => event.name.toLowerCase().includes(searchEvents.value.toLowerCase()))

  contentCards.innerHTML = createCards(eventsNameFilter);

});

function seeDetails(id) {
  window.location.href = `./details.html?id=${id} `
}
contentCards.innerHTML = cardContent


