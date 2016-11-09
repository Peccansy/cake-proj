$(document).ready(function(){

	var offCanvas = function (open) {
		var wrap = $('.wrapper');

		if (wrap.is('.'+open)) {
			wrap.removeClass(open);
		}else {
			wrap.addClass(open);
		}
	}

	$('*[data-target="open-menu"]').on('click', function(e){
		e.preventDefault;
		offCanvas('wrapper_menu-open');	
	});
	$('*[data-target="open-search"]').on('click', function(e){
		e.preventDefault;
		offCanvas('wrapper_search-open');
		$('#myform')[0].reset();
	});

});