

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#heading').innerHTML
const divElement=document.getElementById("display")
const messageLoad=document.querySelector("#load")

weatherForm.addEventListener('submit', async(e) => {
    e.preventDefault()
    divElement.innerHTML=""
    const queryString = search.value
    const locations=queryString.split(",")
    const jsonData={cities:locations}
    
    messageLoad.textContent = 'Loading...'
    

    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      };
    const response = await fetch("/weather", options);
    const json = await response.json();
    console.log(json);
    fetch('/weather',options).then((response) => {
        response.json().then((data) => {
            
            if (data.error) {
                const html=Mustache.render(messageOne,{city:"Error",temparature :data.error})
                divElement.insertAdjacentElement("beforeend",html)
            } else {
                const html=Mustache.render(messageOne)
                divElement.insertAdjacentHTML("beforeend",html)
                const cities=Object.keys(data.weather)
                for (city in data.weather) {
                    loca=Mustache.render("<tr><td>{{city}}</td><td>{{temparature}}</td></tr>",{city:city ,temparature:data.weather[city]})
                    divElement.insertAdjacentHTML("beforeend",loca)

                  }
                
            }
            messageLoad.textContent = ''
            
        })
    })
})