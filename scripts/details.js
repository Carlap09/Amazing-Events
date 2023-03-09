const contentCard = document.querySelector("#card");
let params = (new URL(document.location)).searchParams;
let cardId = params.get("id");

function createCard(arrayDataEvents, id) {
    let cardContent = ``;
    const event = arrayDataEvents.find(event => event._id == id)
        const eventDate = event.date;    
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


contentCard.innerHTML = createCard(data.events, cardId)