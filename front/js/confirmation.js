//Classes 
class cartClass{
	constructor(json){
		this.cart = JSON.parse(json);
	}
	setFunc(){	
		return this.cart;
	}
	updatFunc(){
		console.log(this.cart);
		localStorage.setItem('cart', JSON.stringify(this.cart))
	}
	test(){
		console.log('******');
	}
}

const myUrl = new URL(window.location.href);
const orderId = document.getElementById('orderId');
orderId.textContent = myUrl.searchParams.get('orderId');
