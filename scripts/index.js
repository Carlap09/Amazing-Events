const contentCards = document.querySelector("#cards");
const searchEvents = document.getElementById("searchEvents");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const filterMessageDiv = document.getElementById('filterMessage');
let cardContent = null;

let eventsAll = []

searchEvents.addEventListener("change", () => {
  let eventsNameFilter = eventsAll.filter((event) => event.name.toLowerCase().includes(searchEvents.value.toLowerCase()))
  createCards(eventsNameFilter, contentCards )
});


function fetchData(){
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
  //fetch('../data.json')
  .then(response =>  response.json())
  .then(dataEvents =>{
    eventsAll = dataEvents.events
    createCards(eventsAll,contentCards)
  })
  .catch(error => console.log(error.message) )
}
  fetchData()

  
function createCards(arrayDataEvents, contentCards) {
  cardContent = ``
  arrayDataEvents.forEach( eventsAll =>{
      cardContent += `
            <div class="cardEvents">
            <div  class="events__img">
                <img src="${eventsAll.image}" width="200" height="200" alt="imagen">
            </div>
            <div class="events__titles">
                <h5 class=".events__title">${eventsAll.name}</h5>
            </div>
            <div class="events__description">
                <p class="card-text">${eventsAll.description}</p>
            </div> 
            <div class="events__price">           
            <span>$${eventsAll.price}</span>
            <input type="button" onclick="seeDetails(${eventsAll._id})" value="More info" id="button">
            </div>            
        </div>`
  })
  contentCards.innerHTML = cardContent
}



function filterByCategory(data, categories) {
  return  data.filter(
        (event) => {
          return categories.indexOf(event.category) !== -1}
    );
  }

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        const categories = Array.from(checkboxes) 
        .filter((i) => i.checked) 
        .map((i) => i.value); 
        if (categories.length > 0) {
        const filteredArray = filterByCategory(eventsAll, categories);
        createCards(filteredArray,contentCards)
        filterMessageDiv.style.display="none"
        } else {
          createCards(eventsAll,contentCards)
        filterMessageDiv.style.display="inline-block"
        }
    });
});

function seeDetails(id) {
  window.location.href = `./details.html?id=${id} `
}
contentCards.innerHTML= cardContent



