var customFeatureProduct = window.customFeatureProduct;


window.onload=function() {
	$(".input-plan-type[value='subscribe']").prop('checked', true).change();
}

$('.input-plan-type').change(function(){
	if($(this).attr("value")=="subscribe"){
		$(".featured-product__plan-block-subscribe").show('slow');
		$(".featured-product__plan-one-time").hide('slow');
		$(".product__button_add-to-cart").hide();
		$(".product__button_subscribe").show();
		$(".product__total-compare-price").show();
		$(".product__total-compare-text").show();
		$(".product__save").show();
		checkQuantity();
	}
	if($(this).attr("value")=="one-time"){
		$(".featured-product__plan-one-time").show('slow');
		$(".featured-product__plan-block-subscribe").hide('slow');
		$(".input-last-change[value='no']").prop('checked', true);
		$(".product__button_add-to-cart").show();
		$(".product__button_subscribe").hide();
		$(".product__total-compare-price").hide();
		$(".product__total-compare-text").hide();
		$(".product__save").hide();
		checkQuantity();
	}
});

$(".input-last-change").change(function(){
   if($(this).attr("value")=="yes"){
		$(".input-plan-type[value='subscribe']").prop('checked', true).change();
   }
});

function checkQuantity() {
	var vanilla_quantity =  parseInt($(".quantity-vanilla").val(), 10);
	if (isNaN(vanilla_quantity) || vanilla_quantity < 0) {
		vanilla_quantity = 0;
	}
	var chocolate_quantity = parseInt($(".quantity-chocolate").val(), 10);
	if (isNaN(chocolate_quantity) || chocolate_quantity < 0) {
		chocolate_quantity = 0;
	}
	var total_quantity = vanilla_quantity + chocolate_quantity;
	var plan_type_checked = $('input[name="plan-type"]:checked').val();
	if (plan_type_checked=="subscribe") {
		if (vanilla_quantity > 0 && chocolate_quantity > 0) {
			var mix_image_id = customFeatureProduct.subscribe_mix_image_id;
			var newMedia = document.querySelector('[data-media-id="'+ mix_image_id +'"]');
			if(newMedia) {
				var slickId = newMedia.getAttribute("data-slick-index");
				//$('.featured-product__gallery-list').slick('slickGoTo', slickId);
			}
		} else if (vanilla_quantity > 0 && chocolate_quantity == 0) {
			var vanilla_image_id = customFeatureProduct.subscribe_vanilla_image_id;
			var newMedia = document.querySelector('[data-media-id="'+ vanilla_image_id +'"]');
			if(newMedia) {
				var slickId = newMedia.getAttribute("data-slick-index");
				//$('.featured-product__gallery-list').slick('slickGoTo', slickId);
			}
		} else if (chocolate_quantity > 0 && vanilla_quantity == 0) {
			var chocolate_image_id = customFeatureProduct.subscribe_chocolate_image_id;
			var newMedia = document.querySelector('[data-media-id="'+ chocolate_image_id +'"]');
			if(newMedia) {
				var slickId = newMedia.getAttribute("data-slick-index");
				//$('.featured-product__gallery-list').slick('slickGoTo', slickId);
			}
		}
	} else if (plan_type_checked=="one-time") {
		if (vanilla_quantity == 0 && chocolate_quantity > 0) {
			var one_time_chocolate_image_id = customFeatureProduct.one_time_chocolate_image_id;
			var newMedia = document.querySelector('[data-media-id="'+ one_time_chocolate_image_id +'"]');
			if(newMedia) {
				var slickId = newMedia.getAttribute("data-slick-index");
				//$('.featured-product__gallery-list').slick('slickGoTo', slickId);
			}
		} else if (vanilla_quantity > 0 && chocolate_quantity == 0) {
			var one_time_vanilla_image_id = customFeatureProduct.one_time_vanilla_image_id;
			var newMedia = document.querySelector('[data-media-id="'+ one_time_vanilla_image_id +'"]');
			if(newMedia) {
				var slickId = newMedia.getAttribute("data-slick-index");
				//$('.featured-product__gallery-list').slick('slickGoTo', slickId);
			}
		} else {
			var one_time_mix_image_id = customFeatureProduct.one_time_mix_image_id;
			var newMedia = document.querySelector('[data-media-id="'+ one_time_mix_image_id +'"]');
			if(newMedia) {
				var slickId = newMedia.getAttribute("data-slick-index");
				//$('.featured-product__gallery-list').slick('slickGoTo', slickId);
			} else {
				//$('.featured-product__gallery-list').slick('slickGoTo', 0);
			}
		}
	}
	checkEven(total_quantity);
	сhangeTotalPrice(total_quantity);
	if (total_quantity >= 7) {
		$('.featured-product__alert_max-quantity').removeClass('visually-hidden');
		$('.quantity__button_plus').attr("disabled", true);
	} else if (total_quantity == 0) {
		$('.product__button_subscribe').attr("disabled", true);
		$('.product__button_add-to-cart').attr("disabled", true);
	} else {
		$('.quantity__button_plus').attr("disabled", false);
		$('.featured-product__alert_max-quantity').addClass('visually-hidden');
		$('.product__button_add-to-cart').attr("disabled", false);
	}
}

function checkEven(total_quantity) {
	if ( total_quantity % 2 == 0) {
		$('.featured-product__alert_even-quantity').addClass('visually-hidden');
		$('.product__button_subscribe').attr("disabled", false);
	}else{
		if($('input:radio[name="plan-type"]:checked').val()=="subscribe"){
			$('.featured-product__alert_even-quantity').removeClass('visually-hidden');
			$('.product__button_subscribe').attr("disabled", true);
		} 
		if ($('input:radio[name="plan-type"]:checked').val()=="one-time") {
			$('.featured-product__alert_even-quantity').addClass('visually-hidden');
		}
	}
}

function getPriceVariant(variant_id,url) {
 var price_variant="";
 var product_json = url + ".js";

	$.ajax({
		async: false,
		dataType : 'json',
		url: product_json,
		type : 'GET',
		success: function(json) {
			for(var i in json.variants){ 
					if (json.variants[i].id == variant_id) {
						 price_variant = json.variants[i].price;
					}
			}
		}
	});

	return price_variant;
}

function сhangeTotalPrice(total_quantity) {
		var regular_price = customFeatureProduct.regular_price;
		var subscribe_price = +($('.subscribe-price').text());
		//console.log('regular price' + regular_price);
		regular_price = regular_price*total_quantity;
		regular_price = regular_price;
		count_free_gift = parseInt(total_quantity/2);
		var price_bottle = 14.99*count_free_gift;
		var regular_price_without_bittle = regular_price.toFixed(2);
		regular_price = regular_price+price_bottle;
		regular_price = regular_price.toFixed(2);
		subscribe_price = subscribe_price*total_quantity;
		subscribe_price = subscribe_price.toFixed(2);
		save_total = regular_price_without_bittle - subscribe_price;
		if ( total_quantity % 2 == 0) {
			$('.count-free-gift').text(total_quantity);
		} else {
			$('.count-free-gift').text(total_quantity - 1);
		}
	if ($('input:radio[name="plan-type"]:checked').val()=="one-time") {
		$('.product__total-regular-price').text('$' + regular_price_without_bittle);
	} else {
		$('.product__total-compare-price').text('$' + regular_price);
		$('.product__total-regular-price').text('$' + subscribe_price);
		if ( total_quantity % 2 == 0) {
			$('.total-save').text(save_total);
		} else {
			var new_save_total = save_total/total_quantity;
			new_save_total = save_total - new_save_total;
			$('.total-save').text(new_save_total);
		}
	}
}


$(".quantity-vanilla").change(function(){
	checkQuantity();
});
$(".quantity-chocolate").change(function(){
	checkQuantity();
});




if(typeof customFeatureProduct !== "undefined") {
var one_time_price = customFeatureProduct.regular_price;
}
one_time_price = '$' +  one_time_price;
$(".plan-one-time-price").text(one_time_price);


$('.product__button_subscribe').click(function(){
	var mix_quantity = 0;
	var vanilla_quantity =  parseInt($(".quantity-vanilla").val(), 10);
	if (isNaN(vanilla_quantity) || vanilla_quantity < 0) {
		vanilla_quantity = 0;
	}
	var chocolate_quantity = parseInt($(".quantity-chocolate").val(), 10);
	if (isNaN(chocolate_quantity) || chocolate_quantity < 0) {
		chocolate_quantity = 0;
	}
	if((vanilla_quantity % 2 == 1) || (chocolate_quantity % 2 == 1)){
		mix_quantity = 1;
		vanilla_quantity = vanilla_quantity - 1;
		chocolate_quantity = chocolate_quantity - 1;
		vanilla_quantity = Math.trunc(vanilla_quantity/2);
		chocolate_quantity = Math.trunc(chocolate_quantity/2);
	} else {
		vanilla_quantity = Math.trunc(vanilla_quantity/2);
		chocolate_quantity = Math.trunc(chocolate_quantity/2);
	}
	var auto_ship = $('#auto-ship').val();

	addItemToCartSubscribe(customFeatureProduct.subscribe_chocolate_30svg_id,chocolate_quantity,customFeatureProduct.subscribe_vanilla_30svg_id,vanilla_quantity,customFeatureProduct.subscribe_mix_30svg_id,mix_quantity,auto_ship);
  });

  function addItemToCartSubscribe(variant_id1,qty1,variant_id2,qty2,variant_id3,qty3,selling_plan) {
	data = {
		items: [
			{
				quantity: qty1,
				id: variant_id1,
				selling_plan: selling_plan
			},
			{
				quantity: qty2,
				id: variant_id2,
				selling_plan: selling_plan
			},
			{
				quantity: qty3,
				id: variant_id3,
				selling_plan: selling_plan
			}
		]
	}
	
	jQuery.ajax({
	  type: 'POST',
	  url: '/cart/add.js',
	  data: data,
	  dataType: 'json',
	  success: function() {  
		fetch(window.Shopify.routes.root + "?sections=cart-drawer")
        .then(res => res.json()).then((res) => {
          const response = $.parseHTML(res['cart-drawer']);          
          
          $('.sidebar-cart').removeAttr('is-empty');
          $('.sidebar-cart').append($(response).find('#CartInSidebar')[0].innerHTML);
          setTimeout(function() {
            $('.sidebar-cart__body').addClass('dataAddedonSideBar');
            $('.sidebar-cart').attr('data-aria-expanded', "true");  
            $('.sidebar-cart').addClass('cartAdded');          
          });          
        })

        fetch(window.Shopify.routes.root + "?sections=header")
        .then(res => res.json()).then((res) => {
          const response = $.parseHTML(res['header']);          
            $('#CartCount').html($(response).find('#CartCount')[0].outerHTML);
        })
	  }
	});
	
  }


$('.product__button_add-to-cart').click(function(){ 
	var vanilla_quantity =  parseInt($(".quantity-vanilla").val(), 10);
	if (isNaN(vanilla_quantity) || vanilla_quantity < 0) {
		vanilla_quantity = 0;
	}
	var chocolate_quantity = parseInt($(".quantity-chocolate").val(), 10);
	if (isNaN(chocolate_quantity) || chocolate_quantity < 0) {
		chocolate_quantity = 0;
	}
	addItemToCart(customFeatureProduct.one_time_vanilla_15svg_id,vanilla_quantity,customFeatureProduct.one_time_chocolate_15svg_id,chocolate_quantity);
});

function addItemToCart(variant_id1,qty1,variant_id2,qty2) {
	data = {
		items: [
			{
				quantity: qty1,
				id: variant_id1
			},
			{
				quantity: qty2,
				id: variant_id2
			}
		]
	}
	
	jQuery.ajax({
	  type: 'POST',
	  url: '/cart/add.js',
	  data: data,
	  dataType: 'json',
	  success: function() { 

        fetch(window.Shopify.routes.root + "?sections=cart-drawer")
        .then(res => res.json()).then((res) => {
          const response = $.parseHTML(res['cart-drawer']);          
          
          $('.sidebar-cart').removeAttr('is-empty');
          $('.sidebar-cart').append($(response).find('#CartInSidebar')[0].innerHTML);
          setTimeout(function() {
            $('.sidebar-cart__body').addClass('dataAddedonSideBar');
            $('.sidebar-cart').attr('data-aria-expanded', "true");  
            $('.sidebar-cart').addClass('cartAdded');          
          });          
        })

        fetch(window.Shopify.routes.root + "?sections=header")
        .then(res => res.json()).then((res) => {
          const response = $.parseHTML(res['header']);          
            $('#CartCount').html($(response).find('#CartCount')[0].outerHTML);
        })
        
	  }
	});
}


$('.smooth-scroll[href*="#"]')
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
	event.preventDefault();
	//console.log('click');
	if (
		location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
		&& 
		location.hostname == this.hostname
	) {
	  var target = $(this.hash);
	  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	  if (target.length) {
		event.preventDefault();
		$('html, body').animate({
		  scrollTop: target.offset().top - 60
		}, 1000, function() {
		  return false;
		});
	  }
	}
  });


$(".read-more__button").click(function() {
    var elem = $(this).text();
    if (elem == "Read More") {
      $(this).text("Read Less");
      $(this).siblings(".split_text").slideDown();
    } else {
      $(this).text("Read More");
      $(this).siblings(".split_text").slideUp();
    }
  });