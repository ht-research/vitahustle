/* Non-critical fonts */
document.addEventListener("DOMContentLoaded",function(){var style=document.createElement("style");style.textContent=`@font-face{font-family:"Lato";src:url("https://d2izr24fok1gc0.cloudfront.net/vita1/Lato-Regular.woff2")format("woff2");font-weight:normal;font-style:normal;font-display:swap;}@font-face{font-family:"Druk Text Super Trial";src:url("https://d2izr24fok1gc0.cloudfront.net/vita1/DrukText-Super.woff2")format("woff2"),url("https://d2izr24fok1gc0.cloudfront.net/vita1/DrukText-Super.woff")format("woff");font-weight:900;font-style:normal;font-display:swap;}@font-face{font-family:"Lato Bold";src:url("https://d2izr24fok1gc0.cloudfront.net/vita1/Lato-Bold.woff2")format("woff2");font-weight:bold;font-style:normal;font-display:swap;}@font-face{font-family:"FKGrotesk Regular";src:url("https://d2izr24fok1gc0.cloudfront.net/vita1/FKGroteskNeue-Regular.woff2")format("woff2");font-weight:400;font-style:normal;font-display:swap;}@font-face{font-family:"SohneBreit Kraftig";src:url("https://d2izr24fok1gc0.cloudfront.net/vita1/soehne-breit-dreiviertelfett.woff2")format("woff2");font-weight:500;font-style:normal;font-display:swap;}`;document.head.appendChild(style);});
/* Start Section product_3_section_5 */
var addCartText="&lt;strong&gt;ADD TO CART&lt;/strong&gt;";var soldOutText="";document.addEventListener('DOMContentLoaded',function(){const decrementButton=document.getElementById('decrement-button');const incrementButton=document.getElementById('increment-button');const quantityInput=document.getElementById('quantity-input');decrementButton.addEventListener('click',function(){let currentValue=parseInt(quantityInput.value,10);if(currentValue>1){quantityInput.value=currentValue-1;}});incrementButton.addEventListener('click',function(){let currentValue=parseInt(quantityInput.value,10);quantityInput.value=currentValue+1;});var swiper=new Swiper('.product-3-thumbnails-ZRdfYYHdAm',{direction:'horizontal',slidesPerView:'4.5',spaceBetween:10,grabCursor:true,loop:false,slideToClickedSlide:true,watchSlidesVisibility:true,watchSlidesProgress:true,navigation:{nextEl:'.product-3-thumbnails-ZRdfYYHdAm .product-3-thumbnails-next',prevEl:'.product-3-thumbnails-ZRdfYYHdAm .product-3-thumbnails-prev',},breakpoints:{768:{direction:'vertical',slidesPerView:'auto',spaceBetween:13,},},});var Swipes2=new Swiper('.product-3-carousel-ZRdfYYHdAm',{shortSwipes:true,resizeObserver:true,observer:true,observeParents:true,loop:false,slidesPerView:1,grabCursor:true,navigation:{nextEl:'.product-3-carousel-ZRdfYYHdAm .swiper-button-next',prevEl:'.product-3-carousel-ZRdfYYHdAm .swiper-button-prev',},pagination:{el:'.swiper-pagination',clickable:true,},thumbs:{swiper:swiper,},});document.querySelectorAll('[data-swatches-option]').forEach(function(targetAll){targetAll.querySelector('[data-selected-name]').innerHTML=targetAll.querySelector('[data-index-value]:checked').value;var flavorBtns=targetAll.querySelectorAll('[data-index-value]');flavorBtns.forEach(function(btn){btn.addEventListener('click',function(){targetAll.querySelector('[data-selected-name]').innerHTML=btn.getAttribute('data-index-value');var flavor=btn.getAttribute('value');if(flavor.toLowerCase()=="vanilla"){Swipes2.slideTo(1,1000,true);}
else if(flavor.toLowerCase()=="chocolate"){Swipes2.slideTo(0,1000,true);}
else{console.log("Flavor does not exist.");}
document.querySelector('[data-variant-selection]').value=btn.getAttribute('value');document.querySelector('[data-variant-selection]').dispatchEvent(new Event('change'));});});});document.querySelector('[data-variant-selection]').addEventListener('change',(event)=>{var varID=event.target.options[event.target.selectedIndex].getAttribute('data-id');var varAvailable=event.target.options[event.target.selectedIndex].getAttribute('data-available');event.target.closest('form').querySelector('[name="id"]').value=varID;document.querySelectorAll('[data-selling-plans]').forEach(function(plan){plan.classList.add('selling_plan_theme_integration--hidden');});var defaultAddCartText='Add to Cart';var defaultSoldOutText='Sold Out';var addCartText=window.addCartText||defaultAddCartText;var soldOutText=window.soldOutText||defaultSoldOutText;function decodeHTMLEntities(text){var textarea=document.createElement('textarea');textarea.innerHTML=text;return textarea.value;}
addCartText=decodeHTMLEntities(addCartText);soldOutText=decodeHTMLEntities(soldOutText);if(varAvailable=='false'){event.target.closest('form').querySelector('[type="submit"]').innerHTML=soldOutText;event.target.closest('form').querySelector('[type="submit"]').setAttribute('disabled','disabled');event.target.closest('form').querySelector('[name="selling_plan"]').setAttribute('disabled','disabled');}else{event.target.closest('form').querySelector('[type="submit"]').innerHTML=addCartText;event.target.closest('form').querySelector('[type="submit"]').removeAttribute('disabled');document.querySelector(`[data-selling-plans="${varID}"]`).classList.remove('selling_plan_theme_integration--hidden');}});if(document.querySelector('[data-selling-plans]')!=null){document.querySelectorAll('[data-selling-plans]').forEach(function(target){target.querySelector('select').addEventListener('change',function(event){target.closest('[data-section-id]').querySelector('[name="selling_plan"]').removeAttribute('disabled');target.closest('[data-section-id]').querySelector('[name="selling_plan"]').value=event.target.options[event.target.selectedIndex].getAttribute('data-selling-plan-id');});target.querySelectorAll('[data-type-selection]').forEach(function(typeSelection){typeSelection.addEventListener('change',function(event){if(event.target.value=='one-time'){target.closest('[data-section-id]').querySelector('[name="selling_plan"]').setAttribute('disabled','disabled');}else{target.closest('[data-section-id]').querySelector('[name="selling_plan"]').removeAttribute('disabled');}});});});}});
/* End Section product_3_section_5 */
/* Start Section reviews_2_section_6 */
document.addEventListener('DOMContentLoaded',function(){const players=Array.from(document.querySelectorAll('.plyr-template--reviews_2_section_6')).map(p=>{const player=new Plyr(p,{controls:[],fullscreen:{enabled:false},autoplay:false});return{player,videoId:p.id};});function pauseAllVideos(exceptIndex=-1){players.forEach(({player},index)=>{if(index!==exceptIndex&&!player.paused){player.pause();document.getElementById(`play-button-template--reviews_2_section_6-${index+1}`).classList.remove('hidden-template--reviews_2_section_6');}});}
players.forEach(({player},index)=>{const playButton=document.getElementById(`play-button-template--reviews_2_section_6-${index+1}`);const videoSpinner=document.getElementById(`spinner-template--reviews_2_section_6-${index+1}`);playButton.addEventListener('click',function(){event.preventDefault();event.stopPropagation();pauseAllVideos(index);videoSpinner.classList.remove('spinner-hidden-template--reviews_2_section_6');player.play().then(()=>{}).catch(error=>{videoSpinner.classList.add('spinner-hidden-template--reviews_2_section_6');});playButton.classList.add('hidden-template--reviews_2_section_6');});player.on('canplay',function(){videoSpinner.classList.add('spinner-hidden-template--reviews_2_section_6');});player.on('waiting',function(){videoSpinner.classList.remove('spinner-hidden-template--reviews_2_section_6');});player.on('playing',function(){videoSpinner.classList.add('spinner-hidden-template--reviews_2_section_6');});player.on('pause',function(){playButton.classList.remove('hidden-template--reviews_2_section_6');});player.on('ended',function(){playButton.classList.remove('hidden-template--reviews_2_section_6');});player.elements.container.addEventListener('click',function(){event.preventDefault();event.stopPropagation();if(!player.paused){player.pause();playButton.classList.remove('hidden-template--reviews_2_section_6');videoSpinner.classList.add('spinner-hidden-template--reviews_2_section_6');}});});var swiper=new Swiper('.reviews-section-2-template--reviews_2_section_6',{slidesPerView:1,spaceBetween:10,pagination:{el:'.reviews-section-2-template--reviews_2_section_6 .swiper-pagination',clickable:true,},navigation:{nextEl:'.reviews-section-2-template--reviews_2_section_6 .swiper-button-next',prevEl:'.reviews-section-2-template--reviews_2_section_6 .swiper-button-prev',},breakpoints:{640:{slidesPerView:1,spaceBetween:15,},768:{slidesPerView:3.2,spaceBetween:15,},1024:{slidesPerView:4.2,spaceBetween:20,},},on:{slideChangeTransitionEnd:function(){const activeIndex=swiper.realIndex;pauseAllVideos();const playButton=document.getElementById(`play-button-template--reviews_2_section_6-${activeIndex+1}`);if(playButton){playButton.classList.remove('hidden-template--reviews_2_section_6');}}}});const videos=document.querySelectorAll(`.reviews-section-2-template--reviews_2_section_6 video[data-lazyposter]`);const lazyLoadPoster=(video)=>{const posterSrc=video.getAttribute('data-lazyposter');if(posterSrc){video.setAttribute('poster',posterSrc);video.removeAttribute('data-lazyposter');}
const plyrInstance=players.find(obj=>obj.videoId===video.id);if(plyrInstance){if(posterSrc){plyrInstance.player.poster=posterSrc;plyrInstance.player.play();plyrInstance.player.pause();}}};const observer=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(entry.isIntersecting){const video=entry.target;lazyLoadPoster(video);observer.unobserve(video);}});});videos.forEach(video=>{observer.observe(video);});});
/* End Section reviews_2_section_6 */
/* Start Section video-overlay_9 */
const close=document.getElementById("close");const main=document.getElementById("vdoMain");close.onclick=function(){main.style.display="none";document.querySelector('.video-overlay-template--video-overlay_9 [data-video-parent]').innerHTML="";}
document.addEventListener('DOMContentLoaded',function(){const player=new Plyr('#video-template--video-overlay_9',{controls:[],fullscreen:{enabled:false},autoplay:false});const playButton=document.getElementById(`play-button-template--video-overlay_9`);const videoSpinner=document.getElementById(`spinner-template--video-overlay_9`);function pauseVideo(){if(!player.paused){player.pause();playButton.classList.remove('hidden-template--video-overlay_9');videoSpinner.classList.add('spinner-hidden-template--video-overlay_9');}}
playButton.addEventListener('click',function(event){event.preventDefault();event.stopPropagation();pauseVideo();player.play().then(()=>{}).catch(error=>{videoSpinner.classList.add('spinner-hidden-template--video-overlay_9');});playButton.classList.add('hidden-template--video-overlay_9');});player.on('canplay',function(){videoSpinner.classList.add('spinner-hidden-template--video-overlay_9');});player.on('waiting',function(){videoSpinner.classList.remove('spinner-hidden-template--video-overlay_9');});player.on('playing',function(){videoSpinner.classList.add('spinner-hidden-template--video-overlay_9');});player.on('pause',function(){playButton.classList.remove('hidden-template--video-overlay_9');});player.on('ended',function(){playButton.classList.remove('hidden-template--video-overlay_9');});player.elements.container.addEventListener('click',function(event){event.preventDefault();event.stopPropagation();pauseVideo();});});
/* End Section video-overlay_9 */

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
