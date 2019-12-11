function orderTotal(order){
    return order.items.reduce((prev,cur) => cur.price * (cur.quantity || 1) + prev, 0)
}

// This uses the API in sandbox.js, where the order is dependent on the weather in a country
function orderWeather_country(fetch, APIkey, order){
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${order.items[0].country}&units=metric&appid=${APIkey}`)
    .then(response => response.json())
    .then(data => data.weather[0].main) 
}

function orderedItems(order){
   return order.items.map(x => {
       return x.name;
    });
}

module.exports = {orderTotal, 
                    orderedItems, 
                    orderWeather_country
                    };
    
console.log(orderedItems(
    {
        items:[
            {
                name: "dude"
            }, 
            {
                name: "yolo"
            }
        ]
    }
))