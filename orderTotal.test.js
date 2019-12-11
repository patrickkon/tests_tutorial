const {orderTotal, orderedItems, orderWeather_country} = require("./orderTotal.js");

it('ExampleTest', () => {
    expect(6).toBe(6);
});

test('ExampleTest2', function test(){   // it or test seem to work as names to be passed to jest
    return expect("tolo").toBe("tolo");
});

// Actual tests for the imported orderTotal function:
test("Quantity yes no test)", () => {
    expect(orderTotal(
        { //orderTotal takes in an object, which consist of the key items
          // items has a value of an array
          // each element in array is an object
          // and that object contains 3 keys: name, price, quantity
            items: [
                {
                    name: "sugar", price: 10, quantity: 2
                },
                {
                    name: "pepper", price: 20
                }
            ]
        }
    )).toBe(40);
})

test("simple sum test", () => {
    expect(orderTotal(
        {
            items: [
                {
                    name: "powder curry", price: 10, quantity: 20
                }, 
                {
                    name: "baby lotion", price: 12.3, quantity: 2
                }
            ]
        }
    )).toBe(10*20 + 12.3*2);
})

test("name list test", () => {
    expect(orderedItems(
        {
            items: [
                {
                    name: "Basketball", price: 10
                },
                {
                    name: "diapers", price: 15, quantity: 20
                }
            ]
        }
    )).toEqual(["Basketball", "diapers"])  // use toEqual for comparing arrays
})


// Test involving mock functions:
test(('can fetch weather'), () => {
    let isFetchCalled = false;
    // Mock function tutorial 4 v1
/*     const myFetch = (url) => {
        // the expect used to check if orderTotal_country can properly embed items.country
        // into url
        expect("https://api.openweathermap.org/data/2.5/weather?q=Malaysia").toBe(url);
        isFetchCalled = true;
    } */
    const APIKEY = "f90eaaa700aab37e36330ca9e0e64b07";

    // Mock function tutorial 5 v2
    /* const myFetch = (url) => {
        // the expect used to check if orderTotal_country can properly embed items.country
        // into url
        expect(`https://api.openweathermap.org/data/2.5/weather?q=Malaysia&units=metric&appid=${APIKEY}`).toBe(url);
        isFetchCalled = true;
        return Promise.resolve(
            {
                json: () => 
                    Promise.resolve({
                        weather: [
                            {
                                "main": "Clouds"
                            }
                        ]         
                    })
            }        
        )
    } */

    // Mock function tutorial 6 using JEST api
    const myFetch = jest.fn().mockReturnValue(
       Promise.resolve(
            {
                json: () => 
                    Promise.resolve({
                        weather: [
                            {
                                "main": "Clouds"
                            }
                        ]         
                    })
            }        
        )
    ) 


    // Need a return statement here because in jest, need to know when async function
    // has ended. 
    return orderWeather_country(myFetch, APIKEY, {
        items: [
            {
                name: "soy sauce", price: 15, country: "Malaysia"
            }
        ]
    }).then((result) => { // promised return
        expect(result).toBe("Clouds");
        expect(myFetch).toBeCalledWith(
        `https://api.openweathermap.org/data/2.5/weather?q=Malaysia&units=metric&appid=${APIKEY}`
        )
       // expect(isFetchCalled).toBe(true); // meaning the fetch function was entered
    })
})