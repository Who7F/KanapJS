//global declaration
let postRequest = new XMLHttpRequest();
postRequest.open('GET', 'http://localhost:3000/api/products');

// Makes call to back end
// Next time I am useing 'fetch'
postRequest.onreadystatechange = () => {
   if (postRequest.readyState === XMLHttpRequest.DONE) {
	    //local declaration
	    const response = JSON.parse(postRequest.response);
		let myCart = JSON.parse(localStorage.getItem('cart'))
		loadPage(myCart, response);//load cart in to page
		
   } 
};
postRequest.send();

function loadPage(myCart, response){
	let myQuantity = 0;
	let myPrice = 0;
	const cartItems = document.getElementById('cart__items');
	for(let i = 0; i < myCart.length; i++){
			cartItems.appendChild(loadItems(i, myCart, response));
			myQuantity += Number(myCart[i].count);
			myPrice += response.find(item => item._id === myCart[i].id).price  * Number(myCart[i].count);
		}
	myTotal(myQuantity, myPrice);
}
function myDelate(){
	//add somthing
}

function myChange(){
	//add somthing
}

function myTotal(myQuantity, myPrice){
	const totalQuantity = document.getElementById('totalQuantity');
	const totalPrice = document.getElementById('totalPrice');
	totalQuantity.textContent = myQuantity;
	totalPrice.textContent = myPrice
}

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
	
	cartItem.className = 'cart__item';
	cartImg.className = 'cart__item__img';
	cartContent.className = 'cart__item__content';
	cartDescription.className = 'cart__item__content__description';
	cartSettings.className = 'cart__item__content__settings';
	cartQuantity.className = 'cart__item__content__settings__quantity';
	cartDelete.className = 'cart__item__content__settings__delete';
	deleteItem.className = 'deleteItem';
	itemQuantity.ClassName = 'itemQuantity';
	
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
	