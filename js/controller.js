/* controller.js
    Controller for Shopping Cart page
*/

$(function(){

    //Assign string labels for referencing movie formats
	var formatLabels = {
        dvd: 'DVD',
        bluray: 'Blu-Ray'
	};

    //initialize cartModel and cartView
	var cartModel = createCartModel();
	var cartView = createCartView({
        model: cartModel,
        template: $('.cart-item-template'),
        container: $('.cart-items-container'),
        totalPrice: $('.total-price')
	});

    //OPTIONAL STEP: stores the cart in browser's localStorage.
    //When the user refreshes the page, 
    // his/her cart is reloaded on to the page
    var cartJSON = localStorage.getItem('cart');
    if (cartJSON && cartJSON.length > 0) {
        cartModel.setItems(JSON.parse(cartJSON));
    } 

    //initialize the moviesModel and moviesView
	var moviesModel = createMoviesModel({
        url: 'https://courses.washington.edu/info343/ajax/movies/'
	});
	var moviesView = createMoviesView({
        model: moviesModel,
        template: $('.movie-template'),
        container: $('.movies-container')
	});



     //when the movies view triggers 'addToCart'
    //add a new item to the cart, using the supplied
    //movieID and format
    moviesView.on('addToCart', function(data){
        var movie = moviesModel.getItem(data.movieID);
        if (!movie)
            throw 'Invalid movie ID "' + movieID + '"!'; 

        cartModel.addItem({
            id: movie.id,
            title: movie.title,
            format: data.format,
            formatLabel: formatLabels[data.format],
            price: movie.prices[data.format]
        });
    }); //addToCart event

    //refresh to get movies from server
    moviesModel.refresh();
   
    //saves the JSON representation of the cart items in
    //the localStorage
    cartModel.on('change', function(){
        localStorage.setItem('cart', cartModel.toJSON());
    });   
}); //doc ready()




