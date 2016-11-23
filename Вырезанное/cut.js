//selects
	$('.cart-form__input_select').selectize({
		create: false,
		sortField: 'text',
		render: {
			item: function(item, escape) {				
				return  '<div class="cart-form__input cart-form__input_select">' +
				item.text +                			
				'</div>';
			}
		}
	});

	$('.profile__form-input_select').selectize({
		create: false,
		sortField: 'text',
		render: {
			item: function(item, escape) {				
				return  '<div class="profile__form-input profile__form-input_select">' +
				item.text +                			
				'</div>';
			}
		}
	});
//pickmeup
	pickmeup.defaults.locales['ru'] = {
		days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
		daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
	};

	pickmeup('.cart-form__input_date', {
		format: 'd.m.Y',
		locale: 'ru'		
	});