(function() {
	'use strict';

//Плагин к Lampa для перключения серий клавишами пульта для ТВ LG
	//listen to button
	
	 Lampa.Keypad.listener.follow('keydown', function (e) {
      var code = e.code;
     // Lampa.Noty.show('code_ '+ code);
      if (Lampa.Player.opened()) {
        if (code === 428 || code === 34) {
          Lampa.PlayerPlaylist.prev();
          //$('body').find('.player-panel__prev.button.selector').click();
  			 // console.log ("[P- button hit]");
        } 
        if (code === 427 || code === 33) {
          Lampa.PlayerPlaylist.next();
		    	//$('body').find('.player-panel__next.button.selector').click();
  			  //console.log ("[P+ button hit]");
        } 
      } 
    });
	
	function kanals_n(object) {
		var network = new Lampa.Reguest();
		var scroll = new Lampa.Scroll({
			mask: true,
			over: true,
			step: 250
		});
		var items = [];
		var html = $('<div></div>');
		var body = $('<div class="kanals_n category-full"></div>');
		var info;
		var last;
		//var cors = 'https://cors.eu.org/';
		var catalogs = [{
        title: 'Основные',
        url: 'http://cdn.kulik.uz/tv/fed.json'
      },
	  {
        title: 'Кино',
        url: 'http://cdn.kulik.uz/tv/kino.json'
      },
	  {
        title: 'Интересное',
        url: 'http://cdn.kulik.uz/tv/int.json'
      },
	  {
        title: 'Детские',
        url: 'http://cdn.kulik.uz/tv/kids.json'
      },
	  {
        title: 'Музыка',
        url: 'http://cdn.kulik.uz/tv/music.json'
      },
	  {
        title: 'КиноЗалы',
        url: 'http://cdn.kulik.uz/tv/zals.json'
      },
      {
        title: 'Спорт',
        url: 'http://cdn.kulik.uz/tv/sport.json'
      },
      {
        title: 'Региональные',
        url: 'http://cdn.kulik.uz/tv/region.json'
      },
	  {
        title: 'Украина',
        url: 'http://cdn.kulik.uz/tv/ukr.json'
      },
	  {
        title: 'Беларусь',
        url: 'http://cdn.kulik.uz/tv/bel.json'
      },
      {
        title: 'Японские',
        url: 'http://cdn.kulik.uz/tv/japan.json'
      },
      {
        title: 'Корейские',
        url: 'http://cdn.kulik.uz/tv/korea.json'
      },
	  {
        title: 'Зарубежные',
        url: 'http://cdn.kulik.uz/tv/world.json'
      },
      {
        title: 'Узбекские',
        url: 'http://cdn.kulik.uz/tv/uzb.json'
      },
      {
        title: 'Все каналы',
        url: 'http://cdn.kulik.uz/tv/all.json'
      },
      {
        title: 'Ночная лампа',
        url: 'http://nightlampa.cf/night.json'
      }];
		this.create = function() {
			var _this = this;
			this.activity.loader(true);
			network.silent(object.url, this.build.bind(this), function() {
				var empty = new Lampa.Empty();
				html.append(empty.render());
				_this.start = empty.start;
				_this.activity.loader(false);
				_this.activity.toggle();
			});
			return this.render();
		};
		this.append = function (data) {
			var _this3 = this;
			data.forEach(function (element) {
				var card = Lampa.Template.get('card', {
					title: element.name,
					release_year: element.time ? element.time + (element.epg ? ' / ' + element.epg : '') : ''
				});
				card.addClass('card--collection');
				card.find('.card__img').css({
					'cursor': 'pointer',
					'background-color': '#353535a6'
				});
				var img = card.find('.card__img')[0];
				img.onload = function () {
					card.addClass('card--loaded');
				};
				img.onerror = function (e) {
					img.src = './img/img_broken.svg';
				};
				img.src = element.picture;
				card.on('hover:focus', function () {
					last = card[0];
					scroll.update(card, true);
					info.find('.info__title').text(element.name);
					info.find('.info__title-original').text(element.group);
				});
				card.on('hover:enter', function () {
					var video = {
						title: element.name,
						url: element.video
					};
					Lampa.Player.play(video);
					var playlist = [];
					var i = 1;
					data.forEach(function (elem) {
						playlist.push({
							title: i + ' - ' + elem.name,
							url: elem.video
						});
						i++;
					});
					Lampa.Player.playlist(playlist);
				});
				body.append(card);
				items.push(card);
			});
		};
		this.build = function(data) {
			var _this2 = this;
			Lampa.Background.change('http://cdn.kulik.uz/fon.jpg');
			Lampa.Template.add('button_category', "<style>@media screen and (max-width: 2560px) {.kanals_n .card--collection {width: 14.2%!important;}.scroll__content {padding:1.5em 0!important;}.info {height:9em!important;}.info__title-original {font-size:1.2em;}}@media screen and (max-width: 385px) {.kanals_n .card--collection {width: 33.3%!important;}}</style><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg>   <span>Категории</span>\n    </div>");
			Lampa.Template.add('info_tvtv', '<div class="info layer--width"><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right">  <div id="stantion_filtr"></div></div></div>');
			var btn = Lampa.Template.get('button_category');
			info = Lampa.Template.get('info_tvtv');
		  info.find('#stantion_filtr').append(btn);
			info.find('.view--category').on('hover:enter hover:click', function () {
				_this2.selectGroup();
			});
			scroll.render().addClass('layer--wheight').data('mheight', info);
			html.append(info.append());
			html.append(scroll.render());
			this.append(data);
			scroll.append(body);
			this.activity.loader(false);
			this.activity.toggle();
		};
		this.selectGroup = function () {
		  Lampa.Select.show({
				title: 'Категории',
				items: catalogs,
				onSelect: function onSelect(a) {
					Lampa.Activity.push({
					//	url: cors + a.url,
						url: a.url,
						title: a.title,
						component: 'kanals_n',
						page: 1
					});
				},
				onBack: function onBack() {
					Lampa.Controller.toggle('content');
				}
			});
		};
		this.start = function () {
			var _this = this;
			Lampa.Controller.add('content', {
				toggle: function toggle() {
					Lampa.Controller.collectionSet(scroll.render());
					Lampa.Controller.collectionFocus(last || false, scroll.render());
				},
				left: function left() {
					if (Navigator.canmove('left')) Navigator.move('left');
					else Lampa.Controller.toggle('menu');
				},
				right: function right() {
					if (Navigator.canmove('right')) Navigator.move('right');
					else _this.selectGroup();
				},
				up: function up() {
					if (Navigator.canmove('up')) {
						Navigator.move('up');
					} else {
					 	if (!info.find('.view--category').hasClass('focus')) {
							if (!info.find('.view--category').hasClass('focus')) {
								Lampa.Controller.collectionSet(info);
					  		Navigator.move('right')
							}
						} else Lampa.Controller.toggle('head');
					}
				},
				down: function down() {
					if (Navigator.canmove('down')) Navigator.move('down');
					else if (info.find('.view--category').hasClass('focus')) {
						 Lampa.Controller.toggle('content');
					} 
				},
				back: function back() {
					Lampa.Activity.backward();
				}
			});
			Lampa.Controller.toggle('content');
		};
		this.pause = function() {};
		this.stop = function() {};
		this.render = function() {
			return html;
		};
		this.destroy = function() {
			network.clear();
			scroll.destroy();
			if (info) info.remove();
			html.remove();
			body.remove();
			network = null;
			items = null;
			html = null;
			body = null;
			info = null;
		};
	}

	function startkanals_n() {
		window.plugin_kanals_N_ready = true;
		Lampa.Component.add('kanals_n', kanals_n);
		Lampa.Listener.follow('app', function(r) {
			if (r.type == 'ready') {
				var ico = '<img src="http://cdn.kulik.uz/retro-tv.png"/>';
				var menu_items = $('<li class="menu__item selector focus" data-action="tvtv_r"><div class="menu__ico">' + ico + '</div><div class="menu__text">Каналы</div></li>');
				menu_items.on('hover:enter', function() {
					Lampa.Activity.push({
						url: 'http://cdn.kulik.uz/tv/fed.json',
						title: 'Основные',
						component: 'kanals_n',
						page: 1
					});
				});
				$('.menu .menu__list').eq(0).append(menu_items);
			}
		});
	}
	if (!window.plugin_kanals_n_ready) startkanals_n();
})();