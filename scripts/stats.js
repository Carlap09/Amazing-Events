
fetch('https://mindhub-xj03.onrender.com/api/amazing')
//fetch('../data.json')
    .then(res => res.json())
    .then(data => {

    printTableEvents(results(assistance(data.events), assistance(data.events).reverse(), capacity(data.events)), "capacityLarger")
    
    const eventosFuturos = futures(data.events, data.currentDate)
    const eventosPasados = past(data.events, data.currentDate)
    

    printTable(dataTable(eventosFuturos), "upcoming")
    printTable(dataTable(eventosPasados), "past")
})


function futures(data, currentDate) {
    return data.filter(evento => evento.date > currentDate)
}

function past(data, currentDate) {
    return data.filter(event => event.date < currentDate)
}


function assistance(arrPast) {
    const arrayPercentage = arrPast.map(event => {
    return {
      attendance: (event.assistance / event.capacity) * 100,
    nameEvent: event.name
    }
    })
    arrayPercentage.sort((a, b) => b.attendance - a.attendance)
    
    return arrayPercentage

}


function capacity(array) {
    const arrayCapacity = array.map(event => {
    return {
        capacity: event.capacity, 
        nameEvent: event.name
    }
})
    arrayCapacity.sort((a, b) => b.capacity - a.capacity)
    return arrayCapacity
}

function results(highestPercentage, lowestPercentage, largerCapacity) {
    let all = {
    highestPercentage: highestPercentage[0].nameEvent,
    lowestPercentage: lowestPercentage[0].nameEvent,
    largerCapacity: largerCapacity[0].nameEvent
}
    return all
}

function printTableEvents(results, container) {
    const table = document.getElementById(container)
    table.innerHTML = `
    <tr>
        <td>${results.highestPercentage}</td>
        <td>${results.lowestPercentage}</td>
        <td>${results.largerCapacity}</td>
    </tr>
    `
}



function dataTable(arr) {
    let categories = Array.from(new Set(arr.map(a => a.category)));
    let eventCategories = categories.map(cat => arr.filter(event => event.category == cat))
    let result = eventCategories.map(eventCat => {
    let calculate = eventCat.reduce((acc, event) => {
        
        acc.category = event.category;
        acc.revenues += event.price * (event.assistance || event.estimate);
        acc.attendance += ((event.assistance || event.estimate) * 100) / event.capacity
        return acc
    }, {
        category: "",
        revenues: 0,
        attendance: 0
    })
    calculate.attendance = calculate.attendance / eventCat.length
    return calculate
    })
    return result;
}

function printTable(arr, idTag) {
    const upcomingTable = document.getElementById(idTag)
    let html = arr.map(event => {
        return `
        <tr>
                <td>${event.category}</td>
                <td>$${event.revenues}</td>
                <td>${event.attendance.toFixed(2)}%</td>
            </tr>
        `
    })
    upcomingTable.innerHTML = html.join("")
}

