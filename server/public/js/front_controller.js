$(function () {

	$(function () {
		$('[data-toggle="popover"]').popover()
	})

	$('.addCart').click((e)=> {
		var Id = e.target.id;
		var num = Id[Id.length-1];
		$("#" + Id).hide();
		$("#added_" + num).attr("hidden", false);
		console.log($("#added_" + num));
	})

});