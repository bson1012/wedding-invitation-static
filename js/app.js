$('.slider-single').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	swipe: true,
	arrows: false,
	fade: true,
	adaptiveHeight: true,
	infinite: true,
	asNavFor: '.slider-nav'
});

$('.slider-nav').slick({
	slidesToShow: 5,
	slidesToScroll: 1,
	dots: false,
	infinite: true,
	asNavFor: '.slider-single',
	forThum: true,
	focusOnSelect: true,
	prevArrow: $('#prev_arrow'),
	nextArrow: $('#next_arrow')
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
	window.open("https://map.naver.com/?menu=location&pinType=place&title=" + destination + "&lng=" + lon + "&lat=" + lat);
}

// modal

$(document).ready(function () {
	//canvas init
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	//canvas dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;

	//snowflake particles
	var mp = 25; //max particles
	var particles = [];
	for (var i = 0; i < mp; i++) {
		particles.push({
			x: Math.random() * W, //x-coordinate
			y: Math.random() * H, //y-coordinate
			r: Math.random() * 4 + 1, //radius
			d: Math.random() * mp //density
		})
	}

	//Lets draw the flakes
	function draw() {
		ctx.clearRect(0, 0, W, H);

		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		ctx.beginPath();
		for (var i = 0; i < mp; i++) {
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
		}
		ctx.fill();
		update();
	}

	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	function update() {
		angle += 0.01;
		for (var i = 0; i < mp; i++) {
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
			p.x += Math.sin(angle) * 2;

			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if (p.x > W + 5 || p.x < -5 || p.y > H) {
				if (i % 3 > 0) //66.67% of the flakes
				{
					particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d };
				}
				else {
					//If the flake is exitting from the right
					if (Math.sin(angle) > 0) {
						//Enter from the left
						particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d };
					}
					else {
						//Enter from the right
						particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d };
					}
				}
			}
		}
	}

	//animation loop
	setInterval(draw, 33);

	var txt_copy_normal = "복사버튼을 눌러주세요.";
	var txt_copy_success = "복사 되었습니다.";
	$modal = $("#bank");
	$(".bank").bind("click", function () {

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
		$modal.find("#copy_account").attr("data-clipboard-text", b_copy);
		$(".part").show();
		$cnt++;

		if ($(this).attr("names1") && $(this).attr("bank1") && $(this).attr("account1")) {
			b_title = $(this).attr("title1");
			b_name = $(this).attr("names1");
			b_bank = $(this).attr("bank1");
			b_acc = $(this).attr("account1");
			b_copy = $(this).attr("copy1");
			$modal.find(".part1 .title").text(b_title);
			$modal.find(".part1 .name").text(b_name);
			$modal.find(".part1 .bankname").text(b_bank);
			$modal.find(".part1 .account").text(b_acc);
			$modal.find(".part1 #copy_account1").attr("data-clipboard-text", b_copy);
			$(".part1").show();
			$cnt++;
		}
		if ($(this).attr("names2") && $(this).attr("bank2") && $(this).attr("account2")) {
			b_title = $(this).attr("title2");
			b_name = $(this).attr("names2");
			b_bank = $(this).attr("bank2");
			b_acc = $(this).attr("account2");
			b_copy = $(this).attr("copy2");
			$modal.find(".part2 .title").text(b_title);
			$modal.find(".part2 .name").text(b_name);
			$modal.find(".part2 .bankname").text(b_bank);
			$modal.find(".part2 .account").text(b_acc);
			$modal.find(".part2 #copy_account2").attr("data-clipboard-text", b_copy);
			$(".part2").show();
			$cnt++;
		}
		$(".tooltiptext1").text(txt_copy_normal);
		$modal.addClass("on");
		$(".modal-content").addClass("height" + $cnt);
	});

	$(".modal .close").bind("click", function () {
		$modal.removeClass("on");
		$(".tooltiptext1").text(txt_copy_normal);
		$(".bank_group").hide();
		$(".modal-content").removeClass("height1").removeClass("height2").removeClass("height3");
	});
	window.onclick = function (event) {
		if (event.target.id == "bank") {
			$modal.removeClass("on");
			$(".tooltiptext1").text(txt_copy_normal);
		}
	}
	var clip = new ClipboardJS('.btn_bank_copy');
	clip.on('success', function (e) {
		//$(".tooltiptext").fadeIn().delay(800).fadeOut();
		$(".tooltiptext1").text(txt_copy_success);;
	});

});
