//id product artival
//global declaration
let postRequest = new XMLHttpRequest();
postRequest.open('GET', 'http://localhost:3000/api/products');


// Makes call to back end
// Next time I am useing 'fetch'
postRequest.onreadystatechange = () => {
   if (postRequest.readyState === XMLHttpRequest.DONE) {
	    //local declaration
	    const myUrl = new URL(window.location.href);
		const itemId = myUrl.searchParams.get('id');
		const response = JSON.parse(postRequest.response);
		const targetItem = response.find(item => item._id === itemId); 
		 
		createItem(targetItem);
		createDropDown(targetItem);
		addToCart(itemId);
   } 
};
postRequest.send();

//function
function createItem(targetProduct){
	//local declaration
	const item__img = document.getElementsByClassName('item__img')[0]
	const title = document.getElementById('title');
	const description = document.getElementById('description');
	const price = document.getElementById('price');
	const imgContent = document.createElement('img');
	
	imgContent.alt  = targetProduct.altTxt;
	imgContent.src  = targetProduct.imageUrl;
	item__img.appendChild(imgContent);
	price.textContent = targetProduct.price;
	title.textContent = targetProduct.name;
	description.textContent = targetProduct.description;
}

function createDropDown(targetProduct){
//	const translate = {'Blue', 'White':'blanc', 'Black', 'Black/Yellow', 'Black/Red', 'Green', 'Red', 'Orange', 'Pink', 'Grey', 'Purple', 'Navy', 'Silver', 'Brown', 'Yellow'};
	//local declaration
	const colors = document.getElementById('colors');
	
	targetProduct['colors'].forEach(element => {
		//local declaration
		const option = document.createElement("option");
		
		option.textContent = element;
		option.value = element;
		colors.add(option);
	});	
}

function addToCart(itemId){
	//local declaration
	const OrderButton = document.getElementById('addToCart');
	
	//OrderButton.addEventListener('click', ($event) => {};)
	OrderButton.onclick = function (){
		//local declaration
		const itemQuantiry = document.getElementById("quantity").value;
		const itemColors = document.getElementById('colors').value;
		if(itemColors && itemQuantiry > 0){
			//Calls function addLocalStorage
			addLocalStorage(itemId, document.getElementById('colors').value, document.getElementById("quantity").value)
			alert("Products add to cart.\nColour: " + itemColors + "\nQuantity: " + itemQuantiry);
			document.getElementById("quantity").value = 0;
			document.getElementById('colors').value = '';
		}else{
			alert("Product colour and quantiry need to be set");
		}
	}
}
//Set carts
function addLocalStorage(itemId, itemColor, itemQuantity){
	let cart = JSON.parse(localStorage.getItem('cart'))
	let isItem = ''
	//If there cart in localStoage
	if(cart){
		isItem = cart.find(element => element.id === itemId && element.colour === itemColor);
		// If adding to an item in cart
		if(isItem){
			const myNumber = Number(isItem.count)
			console.log(isItem.count = (myNumber + Number(itemQuantity)));
		//There is a cart but no item
		}else{
			cart.push({id: itemId, colour: itemColor, count: itemQuantity});
		}
	//If there is not cart.  Make a cart item
	}else{
		cart = [{id: itemId, colour: itemColor, count: itemQuantity}];
	}

	
	
	localStorage.setItem('cart', JSON.stringify(cart));
}

function addLocalStorageOther(itemId, itemColor, itemQuantity){
	
	if(ItemColor){
		console.log('true')
	}
	myKey = [itemId, ItemColor];
	localStorage.setItem(myKey, itemQuantity);
	
}

//My test funtion.  for testing the crazy
function myTest(){
	//const data = {colors:['red', 'blue', 'green']};
	//console.log(data['colors'].map(v => v));
	//console.log(() => ({foo: 1}));
	console.log(localStorage);
	
}
//function


//crates artical
