$(document).ready(function(){

	var offCanvas = function (wrap, open) {
		if (wrap.length === 0) return false;

		if (wrap.is('.'+ open)) {

			wrap.removeClass(open);	
			offScroll();
			dropFocus();

		} else {
			wrap.addClass(open);
			offScroll();			
			var container = open === 'wrapper_menu-open' ? $('.menu') : $('.search');

			if (container.is('.search')) $('.search__input-search').focus();		

			$('body').on('click', '.wrapper', function(e){

				if (!container.is(e.target) && !$('.search__input-search').is(e.target)) {

					wrap.removeClass(open);
					dropFocus();
					$('body').off('click', '.wrapper');	
					$("html").removeAttr('style');		

				}				
			});		
		}
	}
	$('body').on('click', '*[data-target="open-menu"]', function(e){
		e.preventDefault();
		offCanvas($('.wrapper'), 'wrapper_menu-open');		
	});
	
	$('.wrapper').on('swiperight', function(e) {
		if ($(window).width() >= 600) return false;
		if (!$('.wrapper').is('.wrapper_menu-open')) {
			
			if (($('.slider').has(e.target).length === 0) && ($('.section__list_carusel').has(e.target).length === 0)) {
				offCanvas($('.wrapper'), 'wrapper_menu-open');			
			}

		}else {
			e.preventDefault();
			return false;
		}

	});
	$('.wrapper').on('swipeleft', function(e) { 
		if ($('.wrapper').is('.wrapper_menu-open')) {
			offCanvas($('.wrapper'), 'wrapper_menu-open');
			$('body').off('click', '.wrapper');
		}else {
			e.preventDefault();
			return false;
		}
	});
	$('body').on('click', '*[data-target="open-search"]', function(e){
		e.preventDefault();		

		offCanvas($('.wrapper'), 'wrapper_search-open');		
		$('body').on('submit', '.search__form', function(e){
			e.preventDefault();
		});	
		$(".search__input-search").val('');
	});
	//DOTDOTDOT INIT
	$(".section__item-title").dotdotdot({
		ellipsis: '... ',
		height: 40
	});
	$(".orders__date").dotdotdot({
		ellipsis: '... ',
		height: 40		
	});	
	
	$(".orders__bakery_tags").dotdotdot({
		ellipsis: '... ',
		height: 40,		
		callback: function(isTruncated) { 
			if($(this).siblings('.orders__date').height() === 40) {

				$(this).dotdotdot({
					ellipsis: '... ',
					height: 20
				});

			}
		}
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

		bodyShow(item.index());
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


	//tags 

	var tagClick = function(item) {
		var itemClass = 'tags__item';
		if (!item.hasClass(itemClass +'_active')) {
			item.addClass(itemClass + '_active');
		} else {
			item.removeClass(itemClass + '_active');
		}
	}
	$('body').on('click', '.tags__item', function(){
		tagClick($(this));
	});

	//modals 

	var offScroll = function () {
		if ($('html').attr('style')) {
			
			return $("html").removeAttr('style');

		}else {

			return $("html").css('overflow-y', 'hidden');

		}		
	}

	var modalToggle = function(name) {
		
		var overlay = $('.modal');
		var modalItem = $('.modal').find('.modal__inner[data-name="'+name+'"]');
		if (!overlay.is('.modal_active')) {
			offScroll();
			overlay.addClass('modal_active');
			modalItem.addClass('modal__inner_active');
			overlay.on('click', function(e){
				if (!modalItem.is(e.target) && modalItem.has(e.target).length === 0) {

					modalItem.removeClass('modal__inner_active');
					overlay.removeClass('modal_active');
					offScroll();
					overlay.off('click');

				}
			});

		} else {
			
			modalItem.removeClass('modal__inner_active');
			overlay.removeClass('modal_active');
			offScroll();
		}

	} 

	$('body').on('click', '.modal__open, .modal__close', function(e){
		e.preventDefault();
		modalToggle($(this).data('target'));
	});

	//dropfocus 
	function dropFocus () {

		if ($('.wrapper').is('.wrapper_search-open')) {

			$('.search__input-search').blur();

		}
	}
	// filters
	$('body').on('click', '.filters__item', function(e) {
		e.preventDefault();
		var active = 'filters__item_active';
		var item = $(this);
		
		if (!item.hasClass(active)) {
			item.addClass(active);
		}else {
			item.removeClass(active);
		}

	});	
	//hint landscape 
	$(window).resize(function(event) {
		if ( ($(window).width() >= 600) && $('.wrapper').hasClass('wrapper_menu-open') ) {
			$('.wrapper').removeClass('wrapper_menu-open');
			$('body').off('click', '.wrapper');	
		}else {
			return false;
		}
	});	
});