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