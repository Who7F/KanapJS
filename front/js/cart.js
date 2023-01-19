
//Classes 
class cartClass{
	constructor(json){
		this.cart = JSON.parse(json);
	}
	setFunc(){	
		return this.cart;
	}
	updatFunc(){
		localStorage.setItem('cart', JSON.stringify(this.cart))
	}
	test(){
		console.log('******');
	}
	printCart(){
		console.log(this.cart)
	}
}

//global declaration 
let localCart = new cartClass(localStorage.getItem('cart'))
const orderButton = document.getElementById('order');

async function StartPage() {
	//call function makeRequest.  Due to using both GET and POST, I change my how I connected to the back end
	const response =  await makeRequest('GET', 'http://localhost:3000/api/products');
	
		
	if(localCart.setFunc()){
		loadPage(localCart.setFunc(), response);//load cart in to page
		myTotal(localCart.setFunc(), response);//Load count and cost
	}
}
StartPage()

orderButton.addEventListener("click", ($event) => {
	$event.preventDefault();
	if(myValidation()){
		mySubmit(localCart.setFunc());
	}
});

//functions
async function mySubmit(myCart){
	//local declaration 
	let products = []
	const firstName = document.getElementById('firstName');
	const lastName = document.getElementById('lastName');
	const address = document.getElementById('address');
	const city = document.getElementById('city');
	const email = document.getElementById('email');
	
	myCart.forEach(element =>{
		products.push(element.id)
	});
	// Found in back/controllers/products.js
	/**
	*
	* Expects request to contain:
	* contact: {
	*   firstName: string,
	*   lastName: string,
	*   address: string,
	*   city: string,
	*   email: string
	* }
	* products: [string] <-- array of product _id
	*
	*/
	let myOrder = {
      contact: {
			firstName: firstName.value,
			lastName: lastName.value,
			address: address.value,
			city: city.value,
			email: email.value,
		},
		products: products,
	};
	
	localStorage.clear();
	const response =  await makeRequest('POST', 'http://localhost:3000/api/products/order', myOrder);
	location.href = `./confirmation.html?orderId=${response.orderId}`;
	
	
}

function myValidation(){
	let validation = true;
	const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
	const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
	const addressErrorMsg = document.getElementById('addressErrorMsg');
	const cityErrorMsg = document.getElementById('cityErrorMsg');
	const emailErrorMsg = document.getElementById('emailErrorMsg');
	
	const firstName = document.getElementById('firstName');
	const lastName = document.getElementById('lastName');
	const address = document.getElementById('address');
	const city = document.getElementById('city');
	const email = document.getElementById('email');
	
	if (!(/^[a-zA-Z ]{2,20}$/.test(firstName.value))){
		firstNameErrorMsg.textContent = 'Enter a valid first name';
		validation = false;
	}else{
		firstNameErrorMsg.textContent = '';
	}
	if (!(/^[a-zA-Z ]{2,20}$/.test(lastName.value))){
		lastNameErrorMsg.textContent = 'Enter a valid last name';
		validation = false;
	}else{
		lastNameErrorMsg.textContent = '';
	}
	if (!(/^[a-zA-Z0-9\s,'-]{2,50}$/.test(address.value))){
		addressErrorMsg.textContent = 'Enter a valid address';
		validation = false;
	}else{
		addressErrorMsg.textContent = '';
	}
	if (!(/^[a-zA-Z0-9\s,'-]{2,30}$/.test(city.value))){
		cityErrorMsg.textContent = 'Enter a valid City';
		validation = false;
	}else{
		cityErrorMsg.textContent = '';
	}
	if (!(/\S+@\S+\.\S+/g.test(email.value))){
		emailErrorMsg.textContent = 'Enter a valid email';
		validation = false;
	}else{
		emailErrorMsg.textContent = '';
	}
	return validation;
}


//Uptaets price and quantity
function myTotal(myCart, response){
	const totalQuantity = document.getElementById('totalQuantity');
	const totalPrice = document.getElementById('totalPrice');
	let myQuantity = 0;
	let myPrice = 0;
	for(let i = 0; i < myCart.length; i++){
		myQuantity += Number(myCart[i].count);
		myPrice += response.find(item => item._id === myCart[i].id).price  * Number(myCart[i].count);
	}
	totalQuantity.textContent = myQuantity;
	totalPrice.textContent = myPrice;
}

//Calls laodItems and Mylister
function loadPage(myCart, response){
	const cartItems = document.getElementById('cart__items');
	for(let i = 0; i < myCart.length; i++){
		cartItems.appendChild(loadItems(i, myCart, response));
		myListen(i, myCart, response);
	}
}

//Loads delete and change listener.  Sub function of loadpage
function myListen(i, myCart, response){
	let changeQuantity = document.getElementsByClassName('itemQuantity');
	let deleteItem = document.getElementsByClassName('deleteItem');
	changeQuantity[i].addEventListener('change', ($event) => {
		myChange($event ,myCart, changeQuantity, response);
	});
	deleteItem[i].addEventListener('click', ($event) => {
		myDelete($event, myCart, deleteItem, response);
	});	
	
}

//sub of my listen
//***************************************
function myChange($event, myCart, changeQuantity, response){
	const myId = $event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
	const myColor = $event.target.parentElement.parentElement.parentElement.parentElement.dataset.color;
	const targetItem = myCart.find(item => item.id === myId && item.colour === myColor);
	targetItem.count = $event.target.value;
	
	localCart.updatFunc();
	myTotal(myCart, response)
}

function myDelete($event, myCart, deleteItem, response){
	const cartItems = document.getElementById('cart__items');
	const cartItem = document.getElementsByClassName('cart__item');
	const myId = $event.target.parentElement.parentElement.parentElement.dataset.id;
	const myColor = $event.target.parentElement.parentElement.parentElement.dataset.color;

	cartItems.removeChild($event.target.parentElement.parentElement.parentElement);
	deleteTaget = myCart.filter(item => item.id === myId && item.colour === myColor)[0];
	for(i=0; i < myCart.length; i++){
		if(myCart[i] === deleteTaget){
			myCart.splice(i, 1);
		}
	}
	localCart.updatFunc(); 
	myTotal(myCart, response)
}
//****************************************

//Laod items in to page
function loadItems(i, myCart, response){
	const targetItem = response.find(item => item._id === myCart[i].id); 
	
	const cartItem = document.createElement('article');
	const cartImg = document.createElement('div');
	const itemsImg = document.createElement('img');
	const cartContent = document.createElement('div');
	const cartDescription = document.createElement('div');
	const itemsName = document.createElement('h2');
	const itemsColor = document.createElement('p');
	const itemsPrice = document.createElement('p');
	const cartSettings = document.createElement('div');
	const cartQuantity = document.createElement('div');
	const itemTextQuantity = document.createElement('p');
	const itemQuantity = document.createElement('input');
	const cartDelete = document.createElement('div');
	const deleteItem = document.createElement('p');
	
	itemsImg.src = targetItem.imageUrl;
	deleteItem.textContent = 'Delete';
	itemsName.textContent = targetItem.name;
	itemsColor.textContent = myCart[i].colour;
	itemsPrice.textContent = targetItem.price;
	itemTextQuantity.textContent = 'Quantity :';
	itemQuantity.type = 'number';
	itemQuantity.value = myCart[i].count;
	itemQuantity.min = 1;
	itemQuantity.max = 100;
	itemQuantity.name = 'itenQuantity'
	cartItem.dataset.id = myCart[i].id;
	cartItem.dataset.color = myCart[i].colour; //I cant spell colour
	
	cartItem.classList.add('cart__item');
	cartImg.classList.add('cart__item__img');
	cartContent.classList.add('cart__item__content');
	cartDescription.classList.add('cart__item__content__description');
	cartSettings.classList.add('cart__item__content__settings');
	cartQuantity.classList.add('cart__item__content__settings__quantity');
	cartDelete.classList.add('cart__item__content__settings__delete');
	deleteItem.classList.add('deleteItem');
	itemQuantity.classList.add('itemQuantity');
	
	
	cartDelete.appendChild(deleteItem);
	cartQuantity.appendChild(itemTextQuantity);
	cartQuantity.appendChild(itemQuantity);
	cartSettings.appendChild(cartQuantity);
	cartDescription.appendChild(itemsName);
	cartDescription.appendChild(itemsColor);
	cartDescription.appendChild(itemsPrice);
	cartContent.appendChild(cartDescription);
	cartContent.appendChild(cartSettings);
	cartContent.appendChild(cartDelete);
	cartImg.appendChild(itemsImg);
	cartItem.appendChild(cartImg);
	cartItem.appendChild(cartContent);
	
	return cartItem
}

function makeRequest(verb, url, data) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open(verb, url);
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200 || request.status === 201) {
          resolve(JSON.parse(request.response));
        } else {
          reject(JSON.parse(request.response));
		  console.log(reject)
        }
      }
    };
    if (verb === 'POST') {
		request.setRequestHeader('Content-Type', 'application/json');
		
		request.send(JSON.stringify(data));	
    } else {
		request.send();
    }
  });
}
	