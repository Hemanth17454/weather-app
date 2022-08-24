const request = require('request')
const util=require("util")
util.promisify(request)


const forecast = async function (address,weather,data, callback)  {
    const url = 'http://api.weatherstack.com/current?access_key=930a4c4d9c7a22d6dc9644dbbaa7fbeb&query='+address
    const ad=[9,34,5,2]
    const re=await request({ url, json: true }, async (error, { body }) => {
        if (error) {
            
            return {error:error} 
        } else if (body.error) {
            return {error:'Unable to find location'}
        } else {
            ad[1]=body.current.temperature+"c"
            console.log(ad[1],ad.length)
            return {data:body.current.temperature+"c"}
    }
    })
    console.log(re)
    console.log(ad)
    console.log(re.httpModule.ServerResponse())
    re.then(body => {console.log("kdid"+body)})
    
    if (re.error){
        callback(re.error,undefined,weather,data)
    }
    else{
        console.log(re.data,re.get())
        callback(undefined,re.data,weather,data)
    }
}

module.exports = forecast