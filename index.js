const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
sbutton = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    // if user pressed enter btn and input value is not empty
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});
sbutton.addEventListener("click",()=>{
    if(inputField.value != ""){
        // console.log(inputField.value);
        requestApi(inputField.value)
    }
})

function requestApi(city){
    infoTxt.innerText='Getting Weather details...'
    infoTxt.classList.add("pending")
    let api = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=71859fd383ce6a6ea4e59cafa06f6a37`)

api.then((value1)=>{
    return value1.json();
}).then((data)=>{
    // console.log(data);
    weatherDetails(data);
}).catch(()=>{
    infoTxt.innerText='Something went wrong...'
    infoTxt.classList.replace("pending", "error")
})

}


function weatherDetails(data){

    if(data.cod == '404'){
        infoTxt.classList.replace("pending", "error")
        infoTxt.innerText=`${inputField.value} not a valid city name`

    }else{
      
        const city =data.name;
        console.log(data);
        const country =data.sys.country;
        const {description, id}=data.weather[0];
        const {temp, feels_like, humidity}=data.main;
       
        let html =`<section class="weather-part">
        <img src="" alt="Weather Icon">
        <div class="temp">
          <span class="numb">${Math.floor(temp)}</span>
          <span class="deg">°</span>C
        </div>
        <div class="weather">${description}</div>
        <div class="location">
          <i class='bx bx-map'></i>
          <span>${city}, ${country}</span>
        </div>
        <div class="bottom-details">
          <div class="column feels">
            <i class='bx bxs-thermometer'></i>
            <div class="details">
              <div class="temp">
                <span class="numb-2">${Math.floor(feels_like)}</span>
                <span class="deg">°</span>C
              </div>
              <p>Feels like</p>
            </div>
          </div>
          <div class="column humidity">
            <i class='bx bxs-droplet-half'></i>
            <div class="details">
              <span>${humidity}</span>
              <p>Humidity</p>
            </div>
          </div>
        </div>
      </section>
    `
    document.querySelector(".weath").innerHTML = html;
    infoTxt.classList.remove("pending", "error")
    wrapper.classList.add("active")
    console.log(html);
    const weatherPart = document.querySelector(".weather-part"),
      wIcon = weatherPart.querySelector("img");
 console.log(wIcon);
 if(id == 800){
    wIcon.src = "icons/clear.svg";
}else if(id >= 200 && id <= 232){
    wIcon.src = "icons/storm.svg";  
}else if(id >= 600 && id <= 622){
    wIcon.src = "icons/snow.svg";
}else if(id >= 701 && id <= 781){
    wIcon.src = "icons/haze.svg";
}else if(id >= 801 && id <= 804){
    wIcon.src = "icons/cloud.svg";
}else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
    wIcon.src = "icons/rain.svg";
}


}

wrapper.classList.add("active")


      

console.log(data.cod);
arrowBack.addEventListener("click",  ()=>{
    // if user pressed enter btn and input value is not empty
    wrapper.classList.remove("active")
    }
)


}









