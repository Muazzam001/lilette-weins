(function ($) {
	function new_map($el) {
		var $markers = $el.find('.marker');
		var args = {
			zoom: 16,
			center: new google.maps.LatLng(0, 0),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: [{
					"elementType": "geometry.fill",
					"stylers": [{
						"weight": 2
					}]
				},
				{
					"elementType": "geometry.stroke",
					"stylers": [{
						"color": "#9c9c9c"
					}]
				},
				{
					"elementType": "labels.text",
					"stylers": [{
							"color": "#BB855A"
						},
						{
							"visibility": "simplified"
						}
					]
				},
				{
					"featureType": "landscape",
					"stylers": [{
						"color": "#f2f2f2"
					}]
				},
				{
					"featureType": "landscape",
					"elementType": "geometry.fill",
					"stylers": [{
						"color": "#ffffff"
					}]
				},
				{
					"featureType": "landscape.man_made",
					"elementType": "geometry.fill",
					"stylers": [{
						"color": "#ffffff"
					}]
				},
				{
					"featureType": "poi",
					"stylers": [{
						"visibility": "off"
					}]
				},
				{
					"featureType": "road",
					"stylers": [{
							"saturation": -100
						},
						{
							"lightness": 45
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "geometry.fill",
					"stylers": [{
						"color": "#eeeeee"
					}]
				},
				{
					"featureType": "road",
					"elementType": "labels.text.fill",
					"stylers": [{
						"color": "#7b7b7b"
					}]
				},
				{
					"featureType": "road",
					"elementType": "labels.text.stroke",
					"stylers": [{
						"color": "#ffffff"
					}]
				},
				{
					"featureType": "road.arterial",
					"elementType": "labels.icon",
					"stylers": [{
						"visibility": "off"
					}]
				},
				{
					"featureType": "road.highway",
					"stylers": [{
						"visibility": "simplified"
					}]
				},
				{
					"featureType": "transit",
					"stylers": [{
						"visibility": "off"
					}]
				},
				{
					"featureType": "water",
					"stylers": [{
							"color": "#46bcec"
						},
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "geometry.fill",
					"stylers": [{
							"color": "#393F48"
						},
						{
							"lightness": 60
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "labels.text.fill",
					"stylers": [{
						"color": "#070707"
					}]
				},
				{
					"featureType": "water",
					"elementType": "labels.text.stroke",
					"stylers": [{
						"color": "#ffffff"
					}]
				}
			]
		};
		var map = new google.maps.Map($el[0], args);
		map.markers = [];
		$markers.each(function () {

			add_marker($(this), map);

		});
		center_map(map);
		return map;
	}
	function add_marker($marker, map) {
		var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));
		var icon = $marker.attr('data-icon');
		if (typeof icon === 'undefined') {
			var image = {
				url: 'images/map-marker.svg',
				scaledSize: new google.maps.Size(50, 80)
			}
		} else {
			var image = {
				url: $marker.attr('data-icon'),
				scaledSize: new google.maps.Size(19.5, 26)
			}
		}
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: $marker.attr('data-title'),
			icon: image
		});
		map.markers.push(marker);
		infowindow = new google.maps.InfoWindow({
			content: ''
		});
		if ($marker.html()) {
			google.maps.event.addListener(marker, 'click', function () {
				infowindow.close();
				infowindow.setContent($marker.html());
				infowindow.open(map, marker);
			});
		}
		window.filterNeighbourhoods = function (neighbourhood) {
			var marker;

			for (var i = 0; i < map.markers.length; i++) {
				marker = map.markers[i];

				if (marker.title == neighbourhood) {
					marker.setVisible(true);
				} else {
					marker.setVisible(false);
				}
			}
		}

	}
	function center_map(map) {
		var bounds = new google.maps.LatLngBounds();
		$.each(map.markers, function (i, marker) {
			var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
			bounds.extend(latlng);
		});
		if (map.markers.length == 1) {
			map.setCenter(bounds.getCenter());
			map.setZoom(16);
		} else {
			map.fitBounds(bounds);
		}
	}
	var map = null;
	$(document).ready(function () {
		$('.acf-map').each(function () {
			map = new_map($(this));
		});

	});

})(jQuery);
! function (s) {
	"use strict";

	function e(s) {
		return new RegExp("(^|\\s+)" + s + "(\\s+|$)")
	}

	function n(s, e) {
		var n = t(s, e) ? c : a;
		n(s, e)
	}
	var t, a, c;
	"classList" in document.documentElement ? (t = function (s, e) {
			return s.classList.contains(e)
		},
		a = function (s, e) {
			s.classList.add(e)
		},
		c = function (s, e) {
			s.classList.remove(e)
		}
	) : (t = function (s, n) {
			return e(n).test(s.className)
		},
		a = function (s, e) {
			t(s, e) || (s.className = s.className + " " + e)
		},
		c = function (s, n) {
			s.className = s.className.replace(e(n), " ")
		}
	);
	var o = {
		hasClass: t,
		addClass: a,
		removeClass: c,
		toggleClass: n,
		has: t,
		add: a,
		remove: c,
		toggle: n
	};
	"function" == typeof define && define.amd ? define(o) : "object" == typeof exports ? module.exports = o : s.classie = o
}(window);
 !function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function d(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])}function e(a){return parseFloat(a)||0}function f(a){for(var b=0;a;)b+=a.offsetTop,a=a.offsetParent;return b}function g(){function c(){a.pageXOffset!=k.left?(k.top=a.pageYOffset,k.left=a.pageXOffset,n.refreshAll()):a.pageYOffset!=k.top&&(k.top=a.pageYOffset,k.left=a.pageXOffset,l.forEach(function(a){return a._recalcPosition()}))}function d(){f=setInterval(function(){l.forEach(function(a){return a._fastCheck()})},500)}function e(){clearInterval(f)}c(),a.addEventListener("scroll",c),a.addEventListener("resize",n.refreshAll),a.addEventListener("orientationchange",n.refreshAll);var f=void 0,g=void 0,h=void 0;"hidden"in b?(g="hidden",h="visibilitychange"):"webkitHidden"in b&&(g="webkitHidden",h="webkitvisibilitychange"),h?(b[g]||d(),b.addEventListener(h,function(){b[g]?e():d()})):d()}var h=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),i=!1;a.getComputedStyle?!function(){var a=b.createElement("div");["","-webkit-","-moz-","-ms-"].some(function(b){try{a.style.position=b+"sticky"}catch(a){}return""!=a.style.position})&&(i=!0)}():i=!0;var j="undefined"!=typeof ShadowRoot,k={top:null,left:null},l=[],m=function(){function g(a){if(c(this,g),!(a instanceof HTMLElement))throw new Error("First argument must be HTMLElement");if(l.some(function(b){return b._node===a}))throw new Error("Stickyfill is already applied to this node");this._node=a,this._stickyMode=null,this._active=!1,l.push(this),this.refresh()}return h(g,[{key:"refresh",value:function(){if(!i&&!this._removed){this._active&&this._deactivate();var c=this._node,g=getComputedStyle(c),h={top:g.top,display:g.display,marginTop:g.marginTop,marginBottom:g.marginBottom,marginLeft:g.marginLeft,marginRight:g.marginRight,cssFloat:g.cssFloat};if(!isNaN(parseFloat(h.top))&&"table-cell"!=h.display&&"none"!=h.display){this._active=!0;var k=c.parentNode,l=j&&k instanceof ShadowRoot?k.host:k,m=c.getBoundingClientRect(),n=l.getBoundingClientRect(),o=getComputedStyle(l);this._parent={node:l,styles:{position:l.style.position},offsetHeight:l.offsetHeight},this._offsetToWindow={left:m.left,right:b.documentElement.clientWidth-m.right},this._offsetToParent={top:m.top-n.top-e(o.borderTopWidth),left:m.left-n.left-e(o.borderLeftWidth),right:-m.right+n.right-e(o.borderRightWidth)},this._styles={position:c.style.position,top:c.style.top,bottom:c.style.bottom,left:c.style.left,right:c.style.right,width:c.style.width,marginTop:c.style.marginTop,marginLeft:c.style.marginLeft,marginRight:c.style.marginRight};var p=e(h.top);this._limits={start:m.top+a.pageYOffset-p,end:n.top+a.pageYOffset+l.offsetHeight-e(o.borderBottomWidth)-c.offsetHeight-p-e(h.marginBottom)};var q=o.position;"absolute"!=q&&"relative"!=q&&(l.style.position="relative"),this._recalcPosition();var r=this._clone={};r.node=b.createElement("div"),d(r.node.style,{width:m.right-m.left+"px",height:m.bottom-m.top+"px",marginTop:h.marginTop,marginBottom:h.marginBottom,marginLeft:h.marginLeft,marginRight:h.marginRight,cssFloat:h.cssFloat,padding:0,border:0,borderSpacing:0,fontSize:"1em",position:"static"}),k.insertBefore(r.node,c),r.docOffsetTop=f(r.node)}}}},{key:"_recalcPosition",value:function(){if(this._active&&!this._removed){var a=k.top<=this._limits.start?"start":k.top>=this._limits.end?"end":"middle";if(this._stickyMode!=a){switch(a){case"start":d(this._node.style,{position:"absolute",left:this._offsetToParent.left+"px",right:this._offsetToParent.right+"px",top:this._offsetToParent.top+"px",bottom:"auto",width:"auto",marginLeft:0,marginRight:0,marginTop:0});break;case"middle":d(this._node.style,{position:"fixed",left:this._offsetToWindow.left+"px",right:this._offsetToWindow.right+"px",top:this._styles.top,bottom:"auto",width:"auto",marginLeft:0,marginRight:0,marginTop:0});break;case"end":d(this._node.style,{position:"absolute",left:this._offsetToParent.left+"px",right:this._offsetToParent.right+"px",top:"auto",bottom:0,width:"auto",marginLeft:0,marginRight:0})}this._stickyMode=a}}}},{key:"_fastCheck",value:function(){this._active&&!this._removed&&(Math.abs(f(this._clone.node)-this._clone.docOffsetTop)>1||Math.abs(this._parent.node.offsetHeight-this._parent.offsetHeight)>1)&&this.refresh()}},{key:"_deactivate",value:function(){var a=this;this._active&&!this._removed&&(this._clone.node.parentNode.removeChild(this._clone.node),delete this._clone,d(this._node.style,this._styles),delete this._styles,l.some(function(b){return b!==a&&b._parent&&b._parent.node===a._parent.node})||d(this._parent.node.style,this._parent.styles),delete this._parent,this._stickyMode=null,this._active=!1,delete this._offsetToWindow,delete this._offsetToParent,delete this._limits)}},{key:"remove",value:function(){var a=this;this._deactivate(),l.some(function(b,c){if(b._node===a._node)return l.splice(c,1),!0}),this._removed=!0}}]),g}(),n={stickies:l,Sticky:m,addOne:function(a){if(!(a instanceof HTMLElement)){if(!a.length||!a[0])return;a=a[0]}for(var b=0;b<l.length;b++)if(l[b]._node===a)return l[b];return new m(a)},add:function(a){if(a instanceof HTMLElement&&(a=[a]),a.length){for(var b=[],c=function(c){var d=a[c];return d instanceof HTMLElement?l.some(function(a){if(a._node===d)return b.push(a),!0})?"continue":void b.push(new m(d)):(b.push(void 0),"continue")},d=0;d<a.length;d++){c(d)}return b}},refreshAll:function(){l.forEach(function(a){return a.refresh()})},removeOne:function(a){if(!(a instanceof HTMLElement)){if(!a.length||!a[0])return;a=a[0]}l.some(function(b){if(b._node===a)return b.remove(),!0})},remove:function(a){if(a instanceof HTMLElement&&(a=[a]),a.length)for(var b=function(b){var c=a[b];l.some(function(a){if(a._node===c)return a.remove(),!0})},c=0;c<a.length;c++)b(c)},removeAll:function(){for(;l.length;)l[0].remove()}};i||g(),"undefined"!=typeof module&&module.exports?module.exports=n:a.Stickyfill=n}(window,document);
var players = {};

FontAwesomeConfig = {
	searchPseudoElements: true
};

jQuery(document).ready(function ($) {
	$('.wowanimate').animsition({
		inClass: 'fade-in',
		outClass: 'fade-out',
		inDuration: 1200,
		outDuration: 400,
		linkElement: 'a[href^="http"]:not([target="_blank"]):not([rel^="lightbox"]):not([data-rel^="lightbox"]):not([data-toggle="lightbox"])',
		loading: true,
		loadingParentElement: 'html', //animsition wrapper element
		loadingClass: 'wowed-loading',
		unSupportCss: [],
		loadingInner: '\
		<div class="container loader">\
			<div class="row align-items-center h-100">\
				<div class="col-12 loader-image">\
					<div class="drawBox">\
						<span>\
							<img src="/images/web/logo-no-border-01.svg" alt="" width="300">\
						</span>\
					</div>\
				</div>\
			</div>\
		</div>',
		timeout: false,
		timeoutCountdown: 5000,
		onLoadEvent: true,
		browser: ['animation-duration', '-webkit-animation-duration'],
		overlay: false,
		overlayClass: 'animsition-overlay-slide',
		overlayParentElement: 'body',
		transition: function (url) {
			window.location.href = url;
		}
	});

	$('.wowed-loading img').on('load', function () {
		$('.wowed-loading .drawBox').addClass('draw');
	});

	/* Form labels */
	// Trim Polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	if (!String.prototype.trim) {
		(function () {
			// Make sure we trim BOM and NBSP
			var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			String.prototype.trim = function () {
				return this.replace(rtrim, '');
			};
		})();
	}

	[].slice.call(document.querySelectorAll('.form-animate .inquriy-form-field input, .form-animate .inquriy-form-field textarea, .form-animate .inquriy-form-field select')).forEach(function (inputEl) {
		// in case the input is already filled..
		if (inputEl.value.trim() !== '') {
			classie.add(inputEl.parentNode.parentNode, 'input-has-value');
		}
		// events:
		inputEl.addEventListener('focus', onInputFocus);
		inputEl.addEventListener('blur', onInputBlur);
	});

	function onInputFocus(ev) {
		classie.add(ev.target.parentNode.parentNode, 'input-has-value');
	}

	function onInputBlur(ev) {
		if (ev.target.value.trim() === '') {
			classie.remove(ev.target.parentNode.parentNode, 'input-has-value');
		}
	}

	$('.main-button').append('<div class="main-line-1"></div><div class="main-line-2"></div><div class="main-line-3"></div><div class="main-line-4"></div>');

	$('.community-map-legend div').on('click', function () {
		filterNeighbourhoods($(this).prop('id'));
	});

	if ($('#listings-category').length) {
		$('#listings-category').on('change', function (e) {
			var listingStatus;

			if ($('#listings-search input[type="search"]').val() != '') {
				if ($(this).val() != -1) {
					listingStatus = '/wp-json/wp/v2/listing?orderby=date&order=desc&listing_cats=' + $(this).val() + '&per_page=100&search="' + $('#listings-search input[type="search"]').val() + '"';
					$('.pagination').hide();
				} else {
					listingStatus = '/wp-json/wp/v2/listing?orderby=date&order=desc&per_page=100&search="' + $('#listings-search input[type="search"]').val() + '"';
				}
			} else {
				if ($(this).val() != -1) {
					listingStatus = '/wp-json/wp/v2/listing?listing_cats=' + $(this).val();
					$('.pagination').hide();
				} else {
					listingStatus = '/wp-json/wp/v2/listing?per_page=9';
					$('.pagination').show();
				}
			}

			$.ajax({
				type: 'GET',
				url: listingStatus,
				beforeSend: function () {
					$('.listings').html('<i class="fa fa-spinner-third fa-spin"></i>');
				},
				success: function (data) {
					var listings = '';

					if (data != '') {
						$.each(data, function (index, value) {
							listings += '<div class="list-offering-block col-lg-4">';
							listings += '<a href="' + value.link + '">';

							listings += '<div class="background-c h-100" style="';

							if (value.featured_image) {
								listings += 'background-image: url(' + value.featured_image + ')';
							} else {
								listings += 'background-color: grey;';
							}

							listings += '">';
							listings += '<div class="list-status font-oswald-heading background-navy">';

							if (value.acf.listing_status) {
								listings += '<span class="text-uppercase">' + value.acf.listing_status + '</span>';
							}

							listings += '</div>'; // .list-status

							listings += '<div class="list-offering-information">';
							listings += '<div>';

							if (value.acf.listing_sold_price) {
								listings += '<h4 class="list-offering-location font-oswald-heading">' + value.title.rendered + '</h4>';
								listings += '<hr>';
								listings += '<div>';

								if (value.acf.listing_sold_price) {
									listings += '<p class="font-oswald-heading">$' + value.acf.listing_sold_price + '</p>';
								} else {
									listings += '<p class="font-oswald-heading">$' + value.acf.listing_asking_price + '</p>';
								}

								listings += '</div>';
								listings += '<button class="main-button">Learn More</button>';
								listings += '</div>';
							}

							listings += '</div>'; // .list-offering-information
							listings += '</div>'; // .background-c
							listings += '</a>';
							listings += '</div>'; // .list-offering-block

							$('.listings').html(listings);
							$(window).trigger('scroll');
						});
					} else {
						$('.listings').empty();
					}
				},
				fail: function (data) {
					console.log(data);
				},
				headers: {
					'Cache-Control': 'max-age=86400'
				},
				cache: true
			});
		});
	}

	if ($('#listings-search').length) {
		$('#listings-search').on('submit', function (e) {
			e.preventDefault();
			var listingAddress;

			if ($('#listings-search input[type="search"]').val() != '') {
				if ($('#listings-category').val() != -1) {
					listingAddress = '/wp-json/wp/v2/listing?orderby=date&order=desc&listing_cats=' + $('#listings-category').val() + '&per_page=100&search="' + $('#listings-search input[type="search"]').val() + '"';
				} else {
					listingAddress = '/wp-json/wp/v2/listing?orderby=date&order=desc&per_page=100&search="' + $('#listings-search input[type="search"]').val() + '"';
				}

				$('.pagination').hide();
			} else {
				listingAddress = '/wp-json/wp/v2/listing?orderby=date&order=desc&per_page=9&ignore_custom_sort=true';
				$('.pagination').show();
			}

			$.ajax({
				type: 'GET',
				url: listingAddress,
				beforeSend: function () {
					$('.listings').html('<i class="fa fa-spinner-third fa-spin"></i>');
				},
				success: function (data) {
					var listings = '';

					if (data != '') {
						$.each(data, function (index, value) {
							listings += '<div class="list-offering-block col-lg-4">';
							listings += '<a href="' + value.link + '">';

							listings += '<div class="background-c h-100" style="';

							if (value.featured_image) {
								listings += 'background-image: url(' + value.featured_image + ')';
							} else {
								listings += 'background-color: grey;';
							}

							listings += '">';
							listings += '<div class="list-status font-oswald-heading background-navy">';

							if (value.acf.listing_status) {
								listings += '<span class="text-uppercase">' + value.acf.listing_status + '</span>';
							}

							listings += '</div>'; // .list-status

							listings += '<div class="list-offering-information">';
							listings += '<div>';

							if (value.acf.listing_sold_price) {
								listings += '<h4 class="list-offering-location font-oswald-heading">' + value.title.rendered + '</h4>';
								listings += '<hr>';
								listings += '<div>';

								if (value.acf.listing_sold_price) {
									listings += '<p class="font-oswald-heading">$' + value.acf.listing_sold_price + '</p>';
								} else {
									listings += '<p class="font-oswald-heading">$' + value.acf.listing_asking_price + '</p>';
								}

								listings += '</div>';
								listings += '<button class="main-button">Learn More</button>';
								listings += '</div>';
							}

							listings += '</div>'; // .list-offering-information
							listings += '</div>'; // .background-c
							listings += '</a>';
							listings += '</div>'; // .list-offering-block

							$('.listings').html(listings);
							$(window).trigger('scroll');
						});
					} else {
						$('.listings').empty();
					}
				},
				fail: function (data) {
					console.log(data);
				},
				error: function (data) {
					console.log(data);
				},
				headers: {
					'Cache-Control': 'max-age=86400'
				},
				cache: true
			});
		});
	}

	if ($('.blog #news-category, .category #news-category, .search #news-category').length) {
		$('.blog #news-category, .category #news-category, .search #news-category').on('change', function (e) {
			var blogCategory;

			if ($('#news-search input[type="search"]').val() != '') {
				if ($(this).val() != -1) {
					blogCategory = '/wp-json/wp/v2/posts?orderby=date&order=desc&categories=' + $(this).val() + '&per_page=100&search="' + $('#news-search input[type="search"]').val() + '"&_embed';
					$('.pagination').hide();
				} else {
					blogCategory = '/wp-json/wp/v2/posts?orderby=date&order=desc&per_page=100&search="' + $('#news-search input[type="search"]').val() + '"&_embed';
				}
			} else {
				if ($(this).val() != -1) {
					blogCategory = '/wp-json/wp/v2/posts?categories=' + $(this).val() + '&_embed';
					$('.pagination').hide();
				} else {
					blogCategory = '/wp-json/wp/v2/posts?per_page=4&_embed';
					$('.pagination').show();
				}
			}

			$.ajax({
				type: 'GET',
				url: blogCategory,
				beforeSend: function () {
					$('.news-posts').html('<i class="fa fa-spinner-third fa-spin"></i>');
				},
				success: function (data) {
					var blogs = '';

					if (data != '') {
						$.each(data, function (index, value) {
							blogs += '<article id="post-' + value.id + '" class="hentry col-12 col-md-6">';
							blogs += '<div class="h-100">';
							blogs += '<a href="' + value.link + '">';
							blogs += '<div class="background-c" style="';

							if (value.featured_image) {
								blogs += 'background-image: url(' + value.featured_image + ')';
							} else {
								blogs += 'background-image: url(\'images/news-fallback.jpg\')';
							}

							blogs += '">';

							if (value._embedded['wp:term']['0']['0'].name) {
								blogs += '<div class="news-cat-name wowable fadeInRight">';
								blogs += '<h5 class="font-oswald-heading">' + value._embedded['wp:term']['0']['0'].name + '</h5>';
								blogs += '</div>';
							}

							blogs += '</div>'; // .background-c

							blogs += '<div class="news-excerpt p-3">';
							blogs += '<h3 class="font-oswald-heading text-uppercase wowable fadeInUp">' + value.title.rendered + '</h3>';
							blogs += '<div class="wowable fadeInUp">' + value.excerpt.rendered + '</div>';
							blogs += '<span class="d-block text-right arrow-with-underline wowable fadeInUp">Read More</span>';
							blogs += '</div>';
							blogs += '</a>';
							blogs += '</div>';
							blogs += '</article>';

							$('.news-posts').html(blogs);
							$(window).trigger('scroll');
						});
					} else {
						$('.news-posts').empty();
					}
				},
				fail: function (data) {
					console.log(data);
				},
				headers: {
					'Cache-Control': 'max-age=86400'
				},
				cache: true
			});
		});
	}

	if ($('.blog #news-search, .category #news-search, .search #news-search').length) {
		$('.blog #news-search, .category #news-search, .search #news-search').on('submit', function (e) {
			e.preventDefault();
			var blogSearch;

			if ($('#news-search input[type="search"]').val() != '') {
				if ($('#news-category').val() != -1) {
					blogSearch = '/wp-json/wp/v2/posts?orderby=date&order=desc&categories=' + $('#news-category').val() + '&per_page=100&search="' + $('#news-search input[type="search"]').val() + '"&_embed';
				} else {
					blogSearch = '/wp-json/wp/v2/posts?orderby=date&order=desc&per_page=100&search="' + $('#news-search input[type="search"]').val() + '"&_embed';
				}

				$('.pagination').hide();
			} else {
				blogSearch = '/wp-json/wp/v2/posts?orderby=date&order=desc&per_page=4&ignore_custom_sort=true&_embed';
				$('.pagination').show();
			}

			$.ajax({
				type: 'GET',
				url: blogSearch,
				beforeSend: function () {
					$('.news-posts').html('<i class="fa fa-spinner-third fa-spin"></i>');
				},
				success: function (data) {
					var blogs = '';

					if (data != '') {
						$.each(data, function (index, value) {
							blogs += '<article id="post-' + value.id + '" class="hentry col-12 col-md-6">';
							blogs += '<div class="h-100">';
							blogs += '<a href="' + value.link + '">';
							blogs += '<div class="background-c" style="';

							if (value.featured_image) {
								blogs += 'background-image: url(' + value.featured_image + ')';
							} else {
								blogs += 'background-image: url(\'images/news-fallback.jpg\')';
							}

							blogs += '">';

							if (value._embedded['wp:term']['0']['0'].name) {
								blogs += '<div class="news-cat-name wowable fadeInRight">';
								blogs += '<h5 class="font-oswald-heading">' + value._embedded['wp:term']['0']['0'].name + '</h5>';
								blogs += '</div>';
							}

							blogs += '</div>'; // .background-c

							blogs += '<div class="news-excerpt p-3">';
							blogs += '<h3 class="font-oswald-heading text-uppercase wowable fadeInUp">' + value.title.rendered + '</h3>';
							blogs += '<div class="wowable fadeInUp">' + value.excerpt.rendered + '</div>';
							blogs += '<span class="d-block text-right arrow-with-underline wowable fadeInUp">Read More</span>';
							blogs += '</div>';
							blogs += '</a>';
							blogs += '</div>';
							blogs += '</article>';

							$('.news-posts').html(blogs);
							$(window).trigger('scroll');
						});
					} else {
						$('.news-posts').empty();
					}
				},
				fail: function (data) {
					console.log(data);
				},
				error: function (data) {
					console.log(data);
				},
				headers: {
					'Cache-Control': 'max-age=86400'
				},
				cache: true
			});
		});
	}

	$(window).on('load', function () {
		// Trigger scroll event on page load.
		$(this).trigger('scroll');

		// Polyfill for IE position: sticky
        if ($('.approach-guide').length) {
            Stickyfill.add($('.approach-guide'));
        }

		$('.community-nav a, .communities a, .community-favs-btn').on('click', function (e) {
			e.preventDefault();

			$('html, body').animate({
				scrollTop: ($($(this).attr('href')).offset().top - 50)
			}, 800);
		});

		$('.panel-slider').flexslider({
			animation: "fade",
			controlNav: true,
			directionNav: false
		});

		$('.list-offering-slides').flexslider({
			animation: "slide",
			itemWidth: 210,
			itemMargin: 15,
			minItems: 1,
			maxItems: 3,
			controlNav: false
		});

		$('.testimonial-slider').flexslider({
			animation: "slide",
			controlNav: false,
			directionNav: true
		});

		$('.media-slides').flexslider({
			animation: "slide",
			controlNav: true,
			directionNav: true
		});

		$('.gb-slider').flexslider({
			animation: "slide",
			itemWidth: 210,
			itemMargin: 15,
			minItems: 1,
			maxItems: 3,
			controlNav: false
		});
	});

	// Function which adds the 'wowed' class to any '.wowable' in view
	var doAnimations = function () {
		// Calc current offset and get all wowables
		var offset = $(window).scrollTop() + $(window).height(),
			$wowables = $('.wowable');

		// Unbind scroll handler if we have no wowables
		if ($wowables.length == 0) {
			$(window).off('scroll', doAnimations);
		}

		// Check all wowables and animate them if necessary
		$wowables.each(function (i) {
			var $wowable = $(this);
			if (($wowable.offset().top + $wowable.height() - 20) < offset) {
				$wowable.removeClass('wowable').addClass('wowed');
			}
		});
	};

	// Hook doAnimations on scroll, and trigger a scroll
	$(window).on('scroll', doAnimations);
	$(window).trigger('scroll');

	/* Every time the window is scrolled ... */
	$(window).on('load scroll', function () {
		/* Check the location of each desired element */
		$('.hideme').each(function (i) {
			var bottom_of_object = $(this).offset().top + $(this).outerHeight();
			var bottom_of_window = $(window).scrollTop() + $(window).height();

			/* If the object is completely visible in the window, fade it it */
			if (bottom_of_window > bottom_of_object) {
				$(this).animate({
					'opacity': '1'
				}, 500);
			}
		});

		$('.drawBox').each(function (i) {
			if (($(window).scrollTop() + $(window).height() / 2) >= $(this).offset().top) {
				$(this).addClass('draw');
			}
		});

		if ($('.golden-border').length) {
			if (($(window).scrollTop() + $(window).height() / 2) >= $('.golden-border').offset().top) {
				$('.golden-border').addClass('animate');
			}
		}

		if ($('.communities, .back-to-top').length) {
			if (($(window).scrollTop() + ($(window).height() / 2)) >= $('.communities').offset().top) {
				$('.back-to-top').addClass('show');
			} else {
				$('.back-to-top').removeClass('show');
			}

			if ($(window).scrollTop() >= ($('.community-favs').offset().top / 1.2)) {
				$('.back-to-top').removeClass('show');
			}
		}
	});

	var $wrapper = jQuery('.MovieWrapper');

	if ($wrapper.length === 0) {
	  return;
	}

	var $ytVideos = jQuery('.MovieWrapper.youtube');
	var $vimeoVideos = jQuery('.MovieWrapper.vimeo');

	var ytTag = document.createElement('script');
	var vimeoTag = document.createElement('script');

	var ytApiScript = "https://www.youtube.com/iframe_api";
	var vimeoApiScript = "https://player.vimeo.com/api/player.js";

	var firstScriptTag = document.getElementsByTagName('script')[0];

	if ($ytVideos.length !== 0 && isScriptLoaded(ytApiScript) == false ) {
	  ytTag.src = ytApiScript;
	  firstScriptTag.parentNode.insertBefore(ytTag, firstScriptTag);
	}
	if ($vimeoVideos.length !== 0 && isScriptLoaded(vimeoApiScript) == false ) {
	  vimeoTag.src = vimeoApiScript;
	  firstScriptTag.parentNode.insertBefore(vimeoTag, firstScriptTag);
	}

	var ytPlayerControls = {
	  'enablejsapi' : 1,
	  'origin': window.location.origin,
	  'controls': 1,
	  'modestbranding' : 0,
	  'showinfo' : 0,
	  'rel' : 0,
	  'autoplay' : 0,
	  'loop' : 0
	};



	window.onYouTubePlayerAPIReady = function() {
	  $ytVideos.each(function() {
		$el = $(this);
		var playerID = $el.find('.YTplayer').attr('ID');
		var vidData = $el.data();
		var overlay = $el.find('.video-layer-over');

		var newPlayer = new YT.Player(playerID, {
		  videoId : vidData.video,
		  playerVars: ytPlayerControls
		});

		players[playerID] = newPlayer;

		overlay.on("click",function(event){
		  toggleOverlay(event.currentTarget,'start');
		});

	  });
	};

	$('.MovieWrapper.vimeo .video-layer-over').click(function( event ) {
		toggleOverlay(event.currentTarget, 'start');
	});


	function toggleOverlay(target, action) {
	  var $target = $( target );
	  var $playerDiv = $target.parent(".MovieWrapper").find(".YTplayer");
	  var service = $target.parent(".MovieWrapper").data('service');

	  if ( service === 'vimeo' ) {
		  var playID = $target.parent(".MovieWrapper").attr("id");
		  var $targetPlayer = new Vimeo.Player(playID);
	  } else {
		  var playID = $playerDiv.attr("id");
		  var $targetPlayer = players[playID];
	  }



	  if (action == 'start') {
		$target.toggleClass('show');
		setTimeout(
		  function()
		  {
			$target.toggleClass('z-hide');
		  }, 150);
		  if ( service === 'vimeo' ) {
			  $targetPlayer.play();
		  } else {
			  $targetPlayer.playVideo();
		  }
	  } else {
		$target.toggleClass('z-hide');
		setTimeout(
		  function()
		  {
			$target.toggleClass('show');
		  }, 150);
	  }
	}

	function isScriptLoaded(url) {
	  if (!url) {
		  url = "https://www.youtube.com/iframe_api";
	  }

	  var scripts = document.getElementsByTagName('script');

	  for (var i = scripts.length; i--;) {
		  if (scripts[i].src == url) {
			  return true;
		  }
	  }
	  return false;
  }
  });
