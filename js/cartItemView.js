/*
    createCartItemView()

    Creates a view for a single cart item. This exists
    so that we can attach the item to the remove button
    so that when it's clicked, we know what item to remove.
*/

function createCartItemView(config) {
	var view = createTemplateView(config);
	view.afterRender = function(clonedTemplate, model) {
    clonedTemplate.find('.remove-item').click(function(){
        view.cartModel.removeItem(model);
    });
    config.cartModel = config.model;
	config.templateView = createCartItemView(config);
	var view = createTemplateListView(config);
	view.afterRender = function() {
	this.totalPrice.html(this.model.getTotalPrice());
	}; //afterRender()
};
return view;
                    
} //createCartItemView()
