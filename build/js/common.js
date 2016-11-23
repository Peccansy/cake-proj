$(document).ready(function(){

	var offCanvas = function (wrap, open) {
			
		if (wrap.length === 0) return false;

		if (wrap.is('.'+ open)) {
			wrap.removeClass(open);			
		} else {
			wrap.addClass(open);		
		}
	}

	$('body').on('click', '*[data-target="open-menu"]', function(e){

		e.preventDefault();
		offCanvas($('.wrapper'), 'wrapper_menu-open');
		offCanvas($('.order'), 'order_menu-open');
		
	});
	$('body').on('click', '*[data-target="open-search"]', function(e){
		e.preventDefault();
		offCanvas($('.wrapper'), 'wrapper_search-open');
		$('body').on('submit', '.search__form', function(e){
			e.preventDefault();
		})
		$(".search__input-search").val('');
	});
	//DOTDOTDOT INIT
	$(".section__item-title").dotdotdot({
		ellipsis	: '... ',
		height: 40
	});

	//like 
	var likeClick = function(item, itemClass) {
		if (item.hasClass(itemClass + '_like')) {
			item.removeClass(itemClass + '_like')
			.addClass(itemClass + '_liked');							
		} else {
			item.removeClass(itemClass + '_liked')
			.addClass(itemClass + '_like');
		}
	}

	$("body").on('click', '.section__item-link .section__stats-btn_like,.section__item-link .section__stats-btn_liked', function(e){
		e.preventDefault();
		likeClick($(this), 'section__stats-btn');		
	});

	$("body").on('click', '.section__item-link .section__stats-btn_comments', function(e) {
		e.preventDefault();		
	});

	$('body').on('click', '.slider__item-buttons', function(){
		var item = $(this).find('.slider__icon');
		likeClick(item, 'slider__icon');
	});

	$('body').on('click', '.cake__stats-btn', function(){		
		likeClick($(this), 'cake__stats-btn');
	});
	

	var cartAddItem = function(item, dataVal) {

		var countContainer = item.siblings('*[name=item_count]');
		var itemsValue =  Number(countContainer.val());		


		if (dataVal === 'plus') {			
			itemsValue ++;
			
		} else {

			if (itemsValue <= 1) return false;

			itemsValue --;			
		}

		countContainer.val(itemsValue);
	}

	$("body").on('click', '.cake__input_btn, .cart__input_btn', function(e){	 	
		var item = $(this);
		cartAddItem(item, item.data('val'));
		return false;
	});	

	$('.owl-carousel').owlCarousel({
		items: 1,
		nav: true,
		navText: '',
		smartSpead: 400,
		navSpeed: 300,
		rewind: true
	});
	
	//tabs 
	var tabToggle = function (item) {
		var linkClass = 'tabs__link-item';	
		
		item.addClass(linkClass + '_active')
		.siblings()
		.removeClass(linkClass + '_active');

		bodyShow(item.index())
	}

	var bodyShow = function (index) {
		var content = $('.tabs__body-item');
		var contenClass = 'tabs__body-item';

		content.hide()
		.eq(index)
		.fadeIn()
		.addClass(contentClass + '_active');

	}
	$('body').on('click', '.tabs__link-item', function(e){
		tabToggle($(this));
	});

	// autosize textarea
	autosize($('.cart-form__input_textarea'));
	autosize($('.profile__form-input_textarea'));	

	//rating 
	var starToggle = function (item, itemClass) {
		item.addClass(itemClass+'_active')
		.siblings()
		.removeClass(itemClass+'_active');
	};

	$('body').on('click', '.bakery__rating-item', function(e){
		starToggle($(this), 'bakery__rating-item');
	});

});