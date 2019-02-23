$(function () {
	////////////////////////////
	/////////Variables//////////
	////////////////////////////
	var cart = [];

	////////////////////////////
	//////////Config////////////
	////////////////////////////
	$('[data-toggle="popover"]').popover();

	////////////////////////////
	//////Helper Function///////
	////////////////////////////
	function updatePopover() {
		let list = "";
		let rows = "";
		let total = 0;

		if (!cart.length) {
			// The cart is empty
			list = "<p class='my-2'>The cart is empty</p>";
		} else {
			// Create a list item for each item in cart
			cart.forEach(function(e) {

				let name = $('#name_' + e).text();
				let price = $('#price_' + e).text();
				let image = $('#image_' + e).attr('src');

				rows += `
				<ul class="list-inline my-2">
				<li class="list-inline-item"><img class="smallImage" src="` + image + `"></li>
				<li class="list-inline-item"><p>` + name + ` - `+ price +`</p></li>
				<li class="list-inline-item"><button class="btn btn-primary" type="submit">Button</button></li>
				</ul>`;
				total += parseInt(price.slice(1));
			});

			// Wrap the rows
			list = `
			<div class="justify-content-center mx-2">
			` + rows + `
			<p class="total">Total $` + total + `</p>
			<a class="btn btn-outline-success text-success checkout" id="checkout">Proceed to Checkout</a>
			</div>`;
		}

		// Add to popover
		let button = $('#cartButton');
		var popover = button.popover()[0];
		popover.dataset.content = list;
	}

	////////////////////////////
	//////////Events////////////
	////////////////////////////

	// Dismiss popover
	$('body').on('click', function (e) {
	    //only buttons
	    if ($(e.target).data('toggle') !== 'popover'
	    	&& $(e.target).parents('.popover.in').length === 0) { 
	    	$('[data-toggle="popover"]').popover('hide');
	}
});

	// Checkout event
	$(function(){
		$(document).on('click',"#checkout",function () {
	      //window.location.href = window.location.origin + '/checkout/' + cart.join('+');
	 //      $.ajax({
	 //      	url: window.location.origin + '/id/' + cart.join('+'),
		//     // jQuery < 1.9.0 -> use type
		//     // jQuery >= 1.9.0 -> use method
		//     method: 'GET', // method is any HTTP method
		//     success: function(session) {
		//     	var stripe = Stripe(
		//     		publicKey,
		//     		{
		//     			betas: ['checkout_beta_4']
		//     		}
	 //    		);

		//     	stripe.redirectToCheckout({
		//     		sessionId: session.id,
		//     	}).then(function (result) {
  // 				// Display result.error.message to your customer
  // 				console.log(result);
  // 				alert("hi")
		// 		});
		//     },
		//     error: function(err) {
		//     	console.log("error")
		//     }
		// });

		window.location.href = window.location.origin + '/checkout/' + cart.join('+');


		
	  });
	});


	// Add or remove item
	$('.addRemoveItem').click((e)=> {
		// Parse the item number
		let Id = e.target.id;
		let num = Id[Id.length-1];

		// Check if the item has been added to the  cart
		// if yes, remove it and update UI
		// else, add it
		if (cart.includes(num)) {
			// removed item
			let index = cart.indexOf(num);
			cart.splice(index, 1);
			// update UI
			$("#addRemove_" + num).text("Add To Cart");
		} else {
			cart.push(num);
			// update UI
			$("#addRemove_" + num).text("Remove");
		}

		$("#addRemove_" + num).toggleClass('btn-outline-secondary');
		$("#addRemove_" + num).toggleClass('btn-outline-danger');
		updatePopover();
	});

});