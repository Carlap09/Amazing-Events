const cardsContainer = document.getElementById("cards");
const cardsGenerated = createCards(data.events);


function createCards(arrayDataEvents) {
    let cardContent = ``;
    for (const event of arrayDataEvents) {
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
            <a class="info" href="./details.html">More Info</a >
            </div>
                        
        </div>
        `;
    }
    return cardContent;
}

cardsContainer.innerHTML = cardsGenerated;




