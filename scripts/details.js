const cardsContainer = document.getElementById("cards");
const cardsGenerated = createCards(data.events);


function createCards(arrayDataEvents) {
    let cardContent = ``;
    for (const event of arrayDataEvents) {
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
    }
    return cardContent;
}

cardsContainer.innerHTML = cardsGenerated;
