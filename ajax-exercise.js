import axios from 'axios';

// PART 1: Show Dog Photo

function showDogPhoto(evt) {
  // TODO: get a random photo from the Dog API and show it in the #dog-image div
  axios.get('https://dog.ceo/api/breeds/image/random')
  .then(res =>{
    let randomDog = res.data.message;
    console.log(randomDog)
    document.querySelector("#dog-image").innerHTML = `<img src=${randomDog}>`
  })

}
//****** SOLUTION USING ASYNC/AWAIT*******

/*async function showDogPhoto(evt) {
  const response = await axios.get("https://dog.ceo/api/breeds/image/random");
  const imgUrl = response.data.message;
  document.querySelector("#dog-image").innerHTML = `<img src=${imgUrl}>`;
}*/

document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);

// PART 2: Show Weather

function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value
  axios.get ('/weather.txt',{

    params:{
      zipcode: zipcode
    }

  })
   .then(res =>{
    let showWeather = res.data
   document.querySelector('#weather-info').innerHTML = showWeather;
    
  })
  
  // TODO: request weather with that URL and show the forecast in #weather-info
}

document.querySelector('#weather-button').addEventListener('click', showWeather);

// PART 3: Order Cookies

function orderCookies(evt) {
  evt.preventDefault();
  const cookieType = document.querySelector('#cookie-type-field').value;
  const qty = document.querySelector('#qty-field').value;
  console.log(cookieType,qty)

  // TODO: Need to preventDefault here, because we're listening for a submit event!
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  
  axios.post('/order-cookies.json',{
    
      cookieType: cookieType ,
      qty: qty

    
  })


  .then(res =>{
    let orderStatus = res.data.message;
    console.log(res.data)
    document.querySelector('#order-status').innerText = orderStatus;
    console.log("este es  " + orderStatus)

    if(res.data.resultCode === 'ERROR'){
      document.getElementById('order-status').classList.add('order-error');

    }


  })
    

    
  
  

}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;

  const formData = {'term': searchTerm };
  const queryString = new URLSearchParams(formData).toString();
  const url = `https://itunes.apple.com/search?${queryString}`;
  
  axios.get(url)
  

  .then(res =>{
    console.log(res.data)

    let emptyString = ''

    for(let result of res.data.results){
      emptyString += `<li>Artist: ${result.artistName} Song: ${result.trackName}</li>`
    }

    document.querySelector('#itunes-results').innerHTML = emptyString;
  })
  
  

  // TODO: In the #itunes-results list, show all results in the following format:
  // `Artist: ${artistName} Song: ${trackName}`
}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);
