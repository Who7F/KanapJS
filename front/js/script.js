//id product artival
const items = document.getElementById('items');

let postRequest = new XMLHttpRequest();
postRequest.open('GET', 'http://localhost:3000/api/products');


// Makes call to back end
// Next time I am useing 'fetch'
postRequest.onreadystatechange = () => {
   if (postRequest.readyState === XMLHttpRequest.DONE) {
       
		const response = JSON.parse(postRequest.response);
		for(let i = 0; i < response.length; i++){
			items.appendChild(createItem(i, response));
		}
       
   } 
};
postRequest.send();


//function


//crates artical
function createItem(i, response){
	
	//decuration 
	const itemsArticle = document.createElement('article');
	const itemsDescription = document.createElement('p');
	const itemsName = document.createElement('h3');
	const itemsImg = document.createElement('img');
	const itemsId = document.createElement('a');
	
	//values     
	itemsName.textContent = response[i].name;
	itemsDescription.textContent  = response[i].description;
	itemsImg.src = response[i].imageUrl;
	itemsImg.alt = response[i].altTxt;
	itemsId.href = `./product.html?id=${response[i]._id}`;
	
	//setting up return
	itemsArticle.appendChild(itemsImg);
	itemsArticle.appendChild(itemsName);
	itemsArticle.appendChild(itemsDescription);
	itemsId.appendChild(itemsArticle);
	return itemsId;
}
/*
What I am going to do an autopsy
************************************
const reportSection = document.getElementById('weather-report');
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city');

// Prepare openweathermap.org request
let apiRequest = new XMLHttpRequest();
*/

/* 
 * Capture and handle form submit event
 * Prevent default behaviour, prepare and send API request
*/

/*
cityForm.addEventListener('submit', ($event) => {
  $event.preventDefault();
  const chosenCity = cityInput.value;
  apiRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity + '&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e');
  apiRequest.send();
});

apiRequest.onreadystatechange = () =>{
  if(apiRequest.readyState === XMLHttpRequest.DONE){
    const response = JSON.parse(apiRequest.response);
    reportSection.textContent = 'The weather in ' + response.name + ' is ' + response.weather[0].main + '.';
  }
}



const postsSection = document.getElementById('posts-section');

let postRequest = new XMLHttpRequest();
postRequest.open('GET', 'http://my-blog-api.com/post?id=4acc432mij');

postRequest.onreadystatechange = () => {
   if (postRequest.readyState === 4) {
       let newArticle = document.createElement('article');
       let newTitle = document.createElement('h2');
       let newContent = document.createElement('p');
       
       const response = JSON.parse(postRequest.response);
       
       newTitle.textContent = response['title'];
       newContent.textContent = response['content'];
       
       newArticle.appendChild(newTitle);
       newArticle.appendChild(newContent);
       
       postsSection.appendChild(newArticle);
   } 
};

postRequest.send();
*/