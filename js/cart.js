/*
    createCartModel()

    Creates a model for the shopping cart. This uses the ListModel
    as the prototype, but adds a few specific methods.

    The config parameter can contain the following properties:
    - items (array of objects) initial items for the cart (optional)
*/

function createCartModel(config) {
	var model = createListModel(config);
	//model's getTotakPrice method returns the total price
	//from all the accumulated items in the cart to 2 decimal places.
	model.getTotalPrice = function() {
		var idx;
		var totalPrice = 0;
		for (idx = 0; idx < this.items.length; ++idx) {
    		totalPrice += this.items[idx].price;
		}
		return totalPrice.toFixed(2);  
	}; //getTotalPrice()

	//model's toJSON method returns a JSON representation
	//of all the items in the cart.
	model.toJSON = function() {
		return JSON.stringify(this.items);
		// body...
	}

	return model;

} //createCartModel()