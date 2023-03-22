const contentCard = document.querySelector("#card");
let params = (new URL(document.location)).searchParams;
let cardId = params.get("id");

let eventsAll = [];


function fetchData() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
    //fetch('../data.json')
        .then((response) => response.json())
        .then((dataEvents) => {
            currentDate = dataEvents.currentDate;
            eventsAll = dataEvents.events;
            contentCard.innerHTML = createCard(eventsAll, cardId) 
    })
        .catch((error) => console.log(error.message));
}
    fetchData();


function createCard(arrayDataEvents, id) {
    let cardContent = ``; 
    const event = arrayDataEvents.find(event => event._id == id)
        cardContent += `
        <div class="details">
            
                <img src="${event.image}"  alt="details" class="img">
            
            <div class="textdescrip">
                <div class="details_description">                        
                    <h4 class="details__title">${event.name}</h4>
                </div>
                <div class="detailsli">                            
                    <span><i class="fa fa-calendar"></i> ${event.date}</span>
                    <p> ${event.description}</p>
                    <p>Category: ${event.category}</p>
                    <p>Place: ${event.place}<p>
                    <p>Capacity: ${event.capacity}<p>
                    <p><i class="fa fa-user">Assistence:</i>${event.assistance}</p>
                    <p>Price: $${event.price}</p>
                </div>
            </div>        
        </div>`;
        return cardContent
}


