$('.slider-single').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    arrows: false,
    fade: true,
    adaptiveHeight: true,
    infinite: true,
    useTransform: true,
    speed: 400,
    cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
});

$('.slider-nav').slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: false,
    focusOnSelect: true,
    infinite: true,
    arrows: true,
    prevArrow: $('#prev_arrow'),
    nextArrow: $('#next_arrow')
});

$('.slider-single').on('afterChange', function (event, slick, currentSlide) {
    $('.slider-nav').slick('slickGoTo', currentSlide);
    var currrentNavSlideElem = '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
    $('.slider-nav .slick-slide.is-active').removeClass('is-active');
    $(currrentNavSlideElem).addClass('is-active');
});

$('.slider-nav').on('click', '.slick-slide', function (event) {
    event.preventDefault();
    var goToSingleSlide = $(this).data('slick-index');

    $('.slider-single').slick('slickGoTo', goToSingleSlide);
});


// Naver Map

var HOME_PATH = window.HOME_PATH || '.';
var map = new naver.maps.Map(document.getElementById('map'), {
    zoomControl: true,
    zoom: 15
});
map.setCenter(new naver.maps.LatLng(37.5126081, 127.1003355));

var marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(37.5121581, 127.1025555),
    map: map,
    animation: naver.maps.Animation.BOUNCE
});

// Navigation

var lat = 37.5121581
var lon = 127.1025555;
var destination = '시그니엘 서울';

Kakao.init('33581ec31404af43397f6bf90c202f3a');

function kNavi() {
    Kakao.Navi.start({
        name: destination,
        x: lon,
        y: lat,
        coordType: 'wgs84'
    });
}
var appkey = 'l7xx15d07681e3e740d48cf2cbdd92eb24c0';

function tNavi() {
    window.open("https://apis.openapi.sk.com/tmap/app/routes?" + 'appKey=' + appkey + '&name=' + destination +
        "&lon=" + lon + "&lat=" + lat);
}

function nNavi() {
    window.open("https://m.map.naver.com/directions/?" + 'ename=' + destination + "&ex=" + lon + "&ey=" + lat);
}

// modal


$(document).ready(function(){
	
	var txt_copy_normal = "복사버튼을 눌러주세요.";
	var txt_copy_success = "복사 되었습니다.";
	$modal = $("#bank");
	$(".bank").bind("click",function(){
		
		//초기화
		$(".bank_group").hide();
		$(".modal-content").removeClass("height1").removeClass("height2").removeClass("height3");
		$cnt = 0;

		b_title = $(this).attr("title"); 
		b_name = $(this).attr("names");
		b_bank = $(this).attr("bank");
		b_acc = $(this).attr("account");
		b_copy = $(this).attr("copy");
		$modal.find(".title").text(b_title);
		$modal.find(".name").text(b_name);
		$modal.find(".bankname").text(b_bank);
		$modal.find(".account").text(b_acc);
		$modal.find("#copy_account").attr("data-clipboard-text",b_copy);
		$(".part").show();
		$cnt++;

		if( $(this).attr("names1") && $(this).attr("bank1") && $(this).attr("account1") ){
			b_title = $(this).attr("title1"); 
			b_name = $(this).attr("names1");
			b_bank = $(this).attr("bank1");
			b_acc = $(this).attr("account1");
			b_copy = $(this).attr("copy1");
			$modal.find(".part1 .title").text(b_title);
			$modal.find(".part1 .name").text(b_name);
			$modal.find(".part1 .bankname").text(b_bank);
			$modal.find(".part1 .account").text(b_acc);
			$modal.find(".part1 #copy_account1").attr("data-clipboard-text",b_copy);
			$(".part1").show();
			$cnt++;
		}
		if( $(this).attr("names2") && $(this).attr("bank2") && $(this).attr("account2") ){
			b_title = $(this).attr("title2"); 
			b_name = $(this).attr("names2");
			b_bank = $(this).attr("bank2");
			b_acc = $(this).attr("account2");
			b_copy = $(this).attr("copy2");
			$modal.find(".part2 .title").text(b_title);
			$modal.find(".part2 .name").text(b_name);
			$modal.find(".part2 .bankname").text(b_bank);
			$modal.find(".part2 .account").text(b_acc);
			$modal.find(".part2 #copy_account2").attr("data-clipboard-text",b_copy);
			$(".part2").show();
			$cnt++;
		}
		$(".tooltiptext1").text(txt_copy_normal);
		$modal.addClass("on");
		$(".modal-content").addClass("height"+$cnt);
	});

	$(".modal .close").bind("click",function(){
		$modal.removeClass("on");
		$(".tooltiptext1").text(txt_copy_normal);
		$(".bank_group").hide();
		$(".modal-content").removeClass("height1").removeClass("height2").removeClass("height3");
	});
	window.onclick = function(event) {
		if (event.target.id == "bank"){
			$modal.removeClass("on");		
			$(".tooltiptext1").text(txt_copy_normal);
		}
	}
	var clip = new ClipboardJS('.btn_bank_copy');
	clip.on('success', function(e) {
		//$(".tooltiptext").fadeIn().delay(800).fadeOut();
		$(".tooltiptext1").text(txt_copy_success);;
	});

});
