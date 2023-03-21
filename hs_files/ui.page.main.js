/**
 * ui.page.main.js
 * 메인페이지
 **/


/* ---------------------------------------------------
통합 게이트 배너
--------------------------------------------------- */
;(function($){
	$.fn.gateSlide = function () {
		return this.each(function () {
			$.fn.extend(this, gateSlide);
			this.init();	
		});
	};

	let gateSlide = {
		init : function(){
			if($(this).hasClass("onAct")){
				return true;
			}else{
				$(this).addClass("onAct");
			}
			let that = this;
			this.list_wrap = $(this).find(".list-wrap");
			this.list = this.list_wrap.children();
			this.totalCnt = this.list.length;
			this.prev = $(this).find(".gatebn-sld-prev");
			this.next = $(this).find(".gatebn-sld-next");
			this.pause = $(this).find(".pause-btns");
			this.pasing_wrap = $(this).find(".gatebn-sld-btns");
			this.proc = $(this).find(".gate-proc .bars");
			this.pasing = "";
			this.order = 0;
			this.next_order = 0;
			this.interval_time = 0;
			this.dragStart = false;
			this.min_dist = 30;
			this.next_ = 0;
			this.inti_act = false;
			this.width = $(this).outerWidth();

			this.list.eq(0).addClass("onimg");

			if(this.totalCnt <= 1){
				this.proc.hide();
				this.prev.hide();
				this.next.hide();
				return false;
			}

			if(typeof  $(this).attr("auto") !== 'undefined' && $(this).attr("auto") != ""){
				this.auto = true;
				this.interval_time = parseInt($(this).attr("auto"));
			}else{
				this.auto = false;
			}
			
			this.getSpeed = parseFloat(this.list.css("transition-duration"));
			this.speed = this.getSpeed;
			this.auto_obj = "";
			this.imgType1 = "";
			this.startX = 0;
			this.startY = 0;
			this.moveX = 0;
			this.moveY = 0;
			this.leftMove = false;
			this.rightMove = false;
			this.slideCnt = $(this).find(".cnts_num");
			this.slideTot = $(this).find(".cnts_tot");

			this.proc.width((1/this.totalCnt)*100+"%");

			if($(this).attr("limited") != ""){
				this.limited = true;
				this.auto = false;
			}else{
				this.limited = false;
			}
			this.pClick =  true;
			
			if(this.pasing_wrap.children().length == 0){
				for(let k=0;k < this.totalCnt;k++){
					this.pasing_wrap.append('<span></span>');
				}
			}

			this.pasing = this.pasing_wrap.children();
			this.slideTot.text(this.totalCnt);
			if(this.limited) this.prev.css("opacity",0.4);

			this.prev.on('click',(function(e) {
				if(this.list_wrap.hasClass("animated")){
					return false;
				}
				e.stopPropagation();
				let that = this;
				this.list.each(function(n){
					if(n != that.order){
						$(this).addClass("prev-go");
					}
				});
				this.touchMove(1, 0);
				setTimeout(function(){that.action(-1);},50);
			}).bind(this));

			this.next.on('click',(function(e) {
				if(this.list_wrap.hasClass("animated")){
					return false;
				}
				let that = this;
				e.stopPropagation();
				this.touchMove(-1, 0);
				setTimeout(function(){that.action(1);},50);
			}).bind(this));

			this.list.on("touchstart", (function(e) {
				this.moveX = 0;
				this.stopAuto();
				this.leftMove = false;
				this.rightMove = false;
				if(e.type == "touchstart" && e.originalEvent.touches.length <= 1) {
					this.startX = e.originalEvent.touches[0].pageX;
					this.startY = e.originalEvent.touches[0].pageY;
				}
			}).bind(this));

			this.list.on("touchmove", (function(e) {
				if(e.type == "touchmove" && e.originalEvent.touches.length <= 1){
					this.moveX = e.originalEvent.touches[0].pageX - this.startX;
					this.moveY = e.originalEvent.touches[0].pageY - this.startY;

					let w = this.moveX < 0 ? this.moveX * -1 : this.moveX;
					let h = this.moveY < 0 ? this.moveY * -1 : this.moveY;
					if ((w <  h)) {
						this.moveX = 0;
					} else {
						e.stopPropagation();
						e.preventDefault();
						this.touchMove(this.moveX);
					}
				}
			}).bind(this));

			this.list.on("touchend", (function(e) {
				if(this.inti_act) {
					this.list.css({"transition-duration":"0s","margin":0,"z-index":1});
				}else{
					if(this.leftMove){
						this.action(-1);
					}

					if(this.rightMove){
						this.action(1);
					}
				}
				
				this.inti_act = false;
				if(this.auto) this.autoAction();
			}).bind(this));

			this.list.on("mousedown", (function(e){
				e.preventDefault();
				this.dragStart = true;
				this.list_wrap.removeClass("dragged");
				this.stopAuto();
				this.leftMove = false;
				this.rightMove = false;
				this.startX = e.pageX;
				this.startY = e.pageY;
			}).bind(this));

			this.list.on("mousemove", (function(e){
				e.preventDefault();
				this.moveX = e.pageX - this.startX;
				this.moveY = e.pageY - this.startY;
				
				if(this.dragStart && Math.abs(this.moveX) > 0){
					this.list_wrap.addClass("dragged");
					this.touchMove(this.moveX);
				}
			}).bind(this));

			this.list.on("mouseup", (function(e){
				this.dragStart = false;
				this.list_wrap.removeClass("dragged");
				if(this.inti_act) {
					this.list.css({"transition-duration":"0s","margin":0,"z-index":1});
				}else{
					if(this.leftMove){
						this.action(-1);
					}

					if(this.rightMove){
						this.action(1);
					}
				}
				this.inti_act = false;
				if(this.auto) this.autoAction();
			}).bind(this));

			this.list_wrap.on("mouseleave",(function(e) {
				if(this.dragStart) {$(e.target).trigger("mouseup");}
			}).bind(this));

			$(this).on("mouseenter",(function() {
				this.stopAuto();
			}).bind(this));

			$(this).on("mouseleave",(function() {
				this.autoAction();
			}).bind(this));

			this.pause.on("click",(function(e) {
				if($(this).attr("auto") != ""){
					if($(e.target).hasClass("paused")){
						this.auto = true;
						this.autoAction();
						$(e.target).removeClass("paused");
					}else{
						this.auto = false;
						this.stopAuto();
						$(e.target).addClass("paused");
					}
				}
			}).bind(this));

			if(this.auto) {
				this.autoAction();
				this.limited = false;
			}

			if(this.pasing.length > 0){
				this.pasing.eq(0).addClass("on");
				this.pasing.on("click", function(e) {
					let n = $(this).index();
					let dc = 1;
					if(that.order <= n){
						dc = 1;
					}else{
						dc = -1;
					}
					that.touchMove(-dc, 0, n);
					setTimeout(function(){that.action(dc, n);},50);
				});
			}
		},

		action : function(d, pNum) {
			let that = this;

			if(pNum == this.order) return false;

			if(this.list_wrap.hasClass("animated")){
				return false;
			}else{ 
				this.list_wrap.addClass("animated");
			}

			if(this.limited){
				if(d == 1){
					if(this.order >= this.totalCnt - 1){
						return false;
					}
				}else{
					if(this.order <= 0){
						return false;
					}
				}
			}
			

			if(d == 1){
				if(this.order >= this.totalCnt - 1){
					this.order = -1;
				}
				this.next_order = this.order + 1;
			}else if(d == -1){
				if(this.order <= 0){
					this.next_order = this.totalCnt - 1;
				}else{
					this.next_order = this.order - 1;
				}
			}

			if(pNum >= 0){
				this.next_order = pNum;
			}else{
				this.speed = this.getSpeed;
			}

			this.list.removeClass("prev-go");
			this.list.eq(this.order).css({"transition-duration":""+this.speed+"s","margin-left":-d*50+"%","z-index":1});
			this.list.eq(this.next_order).addClass("onimg").css({"transition-duration":""+this.speed+"s","top":0,"left":d*100+"%","margin-left":-d*100+"%","z-index":2});
			this.list.eq(this.next_order).find(".gatebn-list").css({"transition-duration":""+this.speed+"s","margin-left":0});

			let times = setTimeout((function(){
				this.list_wrap.removeClass("animated");
				this.list.removeClass("prev-go");
				this.list.eq(this.order).removeClass("onimg").css({"transition-duration":"0s","position":"absolute","top":0,"left":"300%", "margin":"auto","z-index":1});
				this.list.eq(this.order).find(".gatebn-list").css({"transition-duration":"0s","margin-left":-this.width/2});
				this.list.eq(this.next_order).css({"transition-duration":"0s","position":"relative","top":"auto","left":"auto", "margin":"auto","z-index":1});
				this.leftMove = false;
				this.rightMove = false;
				this.startX = 0;
				this.startY = 0;
				this.moveX = 0;
				this.moveY = 0;

				this.order = this.next_order;

				//콜백 함수
				//this.actionCallBack();

				clearTimeout(times);
			}).bind(this),this.speed*1000);

			if(this.pasing.length > 0){
				this.pasing.each(function(n) {
					if(that.next_order == n){
						$(this).addClass("on");
						that.proc.width(((n+1)/that.totalCnt)*100+"%");
					}else{
						$(this).removeClass("on");
					}
				});
			}

			this.slideCnt.text(this.next_order + 1);
		},

		touchMove : function(dist, p, ne){
			let that = this;
			this.width = $(this).outerWidth();

			if(this.list_wrap.hasClass("animated")){
				return "acted";
			}

			let d2 = 0;

			p == 0 ? this.min_dist = 1 : this.min_dist = this.min_dist;

			if(dist > this.min_dist){
				this.leftMove = true;
				this.rightMove = false;
			}
			
			if (dist < -this.min_dist){
				this.leftMove = false;
				this.rightMove = true;
			}

			if(Math.abs(dist) <= this.min_dist){ 
				this.inti_act = true;
			}else{
				this.inti_act = false;
			}

			if(dist > 0){
				d2 = -1;
				if(this.order == 0){
					next_ = this.totalCnt - 1;
				}else {
					next_ = this.order - 1;
				}
			}else{
				d2 = 1;
				if(this.order + 1 == this.totalCnt){
					next_ = 0;
				}else{
					next_ = this.order + 1;
				}
			}
			if(ne || ne == 0) next_ = ne;
			this.list.eq(this.order).css({"transition-duration":"0s","margin-left":dist/2,"z-index":1});
			if(dist > 0){
				if(this.order == 0 && this.limited){
					this.inti_act = true;
				}else{
					this.list.each(function(n) {
						if(n != that.order && n != next_){
							$(this).css("margin-left",0);
						}
					});
					
					this.list.eq(next_).addClass("prev-go").css({"top":0,"left":d2*100+"%","transition-duration":"0s","margin-left":dist,"z-index":2});
					this.list.eq(next_).find(".gatebn-list").css({"transition-duration":"0s","margin-left":this.width/2 - dist/2});
				}
			}else{
				if(this.order + 1 == this.totalCnt && this.limited){
					this.inti_act = true;
				}else{
					this.list.each(function(n) {
						if(n != that.order && n != next_){
							$(this).css("margin-left",0);
						}
					});
					this.list.eq(next_).css({"top":0,"left":d2*100+"%","transition-duration":"0s","margin-left":dist,"z-index":2});
					this.list.eq(next_).find(".gatebn-list").css({"transition-duration":"0s","margin-left":-this.width/2 - dist/2});
				}
			}
		},

		autoAction : function() {
			let that = this;
			this.stopAuto();
			if(this.auto){
				this.auto_obj = setInterval((function() {
					this.next.trigger("click");
				}).bind(this),this.interval_time);
			}
		},

		stopAuto : function() {
			clearInterval(this.auto_obj);
		},

		actionCallBack : function() {
			if(this.limited){
				if(this.order >= this.totalCnt - 1){
					this.next.css("opacity",0.4);
				}else{
					this.next.css("opacity",1);
				}

				if(this.order <= 0){
					this.prev.css("opacity",0.4);
				}else{
					this.prev.css("opacity",1);
				}
			}
		}
	};
})(jQuery);
$(function() {
	$(".gatebn-sld").gateSlide();
});




/* ---------------------------------------------------
메인 공통 슬라이드 배너
--------------------------------------------------- */
 ;(function($){
	$.fn.mainSwipe = function(){
		return this.each(function() {
			$.fn.extend(this, mainSwipe);
			this.init();
		});
	};

	var mainSwipe = {
		init : function(){
			if($(this).hasClass("swipeBinded")){
				return false;
			}else{
				$(this).addClass("swipeBinded");
			}

			var _this = this;
			this.moveX = 0;
			this.moveY = 0;
			this.page_cnt = 0;
			this.scroll = false;
			this.drag = false;
			this.sect_total = 0;
			this.menu_flick_pos = 0;

			$(".flick-container").off("touchstart");
			$(".flick-container").off("touchmove");
			$(".flick-container").off("touchend");
			$(".flick-container").off("touchcancel");
			$(".flick-container").off("webkitTransitionEnd transitionend");

			this.sect_total = $(".main-sect").length;

			$(".main-lnb-list li").click(function() {
				_this.page_cnt = $(this).index();
				_this.swipeCallBack();
				
				// GNB를 직접 클릭처리했을경우 module 파라미터만 주소창에 노출처리 (2021.09.09 김동진)
				if(mainGnbClickFlag) {
					var gnb	= $(this).attr("data-gnb");
					var url	= location.origin + location.pathname + "?module="+ gnb;
					history.replaceState(null, '', url);
				}
			});

			// 제외 목록
			var existList = [".m-pop", ".map"]; // 홈아이디어GNB - 평형대필터팝업 열린 케이스(평형대슬라이드 드래그), 홈아이디어GNB - 아파트찾기 - 지도 드래그

			// 앱에서 실행시, 아파트 찾기는 flicking을 적용시키지 않는다. 2023.01.15 M,Park			
			if ( fnIsApp() ) {
//				alert("앱 : 플리킹 실행 안함")
				existList.push(".rst-view");
				existList.push(".contents.apt>.flick-wrap");
			} else {
//				alert("웹 : 플리킹 실행 함")
				$(".flick-container").on("touchstart", function(e) {
					if(isGnbSwipeExist(e.target, existList)) return; // 제외대상이 걸린 경우 리턴 2022.12.15 김대오
					e.stopPropagation();
					if($(this).is(":animated")) return;
					this.moveX = 0;
					if(e.type == "touchstart" && e.originalEvent.touches.length <= 1) {
						startX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
						startY = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
						this.scroll = false;
					}
				});
	
				$(".flick-container").on("touchmove", function(e) {
					if(isGnbSwipeExist(e.target, existList)) return; // 제외대상이 걸린 경우 리턴 2022.12.15 김대오
					e.stopPropagation();
					if($(this).is(":animated")) return;
					if((e.type == "touchmove" && e.originalEvent.touches.length <= 1)) {
						this.moveX = (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX) - startX;
						this.moveY = (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY) - startY;
	
						var w = this.moveX < 0 ? this.moveX * -1 : this.moveX;
						var h = this.moveY < 0 ? this.moveY * -1 : this.moveY;
	
						if ((w < h || this.scroll) && !this.drag) {
							this.moveX = 0;
							this.scroll = true;
							this.drag = false;
						} else {
							e.preventDefault();
							this.scroll = false;
							this.drag = true;
							//$(this).css("margin-left",this.moveX);
						}
					}
				});
	
				$(".flick-container").on("touchend", function(e) {
					if(isGnbSwipeExist(e.target, existList)) return; // 제외대상이 걸린 경우 리턴 2022.12.15 김대오
					e.stopPropagation();	
					if($(this).is(":animated")) return;
					if(Math.abs(this.moveX) > 100 && !this.scroll){
						if(this.moveX > 0){
							d = 1;
						}else{
							d = -1;
						}
						
						$(this).css({'margin-left':0});
						if(this.moveX < 0){
							if(this.page_cnt < this.sect_total - 1){
								this.page_cnt ++;
							}else{
								this.page_cnt = 0;
							}
						}else if(this.moveX != 0){
							if(this.page_cnt > 0){
								this.page_cnt --;
							}else{
								this.page_cnt = this.sect_total - 1;
							}
						}
						this.pageflick_act = true;
						
						// callback 함수 -  페이지 전환 완료시 실행 부분
						if(this.moveX != 0) this.swipeCallBack();
						
						this.drag = false;
						this.scroll = true;
					}else{
						$(this).css({'margin-left':0});
						this.drag = false;
						this.scroll = false;
					}
				});
			}

			//스토어홈 스크랩 상품 체크 - .do일 경우는 서버에서 스크랩정보 조회하는 것으로 class on 표시, html gen일 경우에만 해당 조회 로직 호출함.
			if(location.href.indexOf(".html") > -1){
				isWishList = "N";
				arrWishGdsNoList = new Array();
				wishGdsNoList();
			}
		},

		swipeCallBack : function(n){

			var _this = this;

			$(window).scrollTop(0);
			$(".main-lnb-list li").removeClass("on");
			$(".main-lnb-list li").eq(this.page_cnt).addClass("on");
			$(".main-lnb-scroll").stop().animate({scrollLeft:$(".main-lnb-scroll").scrollLeft() + $(".main-lnb-list li").eq(this.page_cnt - (this.page_cnt > 0 ? 1 : 0) ).position().left - 6}, 300);

/* 해당부분이 신규 퍼블 레이아웃과 맞지 않음 확인 필요 - 2022.11.03 M.Park */
/* 해당 내용이 다시 정해지기 전까지 해당 소스를 살려놔야 할 것 같습니다. */

			$(".main-sect").removeClass("center-on right-on left-on");
			if(this.page_cnt == 0){
				$(".main-sect").eq(this.page_cnt).addClass("center-on");
				$(".main-sect").eq(this.page_cnt + 1).addClass("right-on");
				$(".main-sect").eq(this.sect_total - 1).addClass("left-on");
			}else if(this.page_cnt == this.sect_total - 1){
				$(".main-sect").eq(this.page_cnt).addClass("center-on");
				$(".main-sect").eq(0).addClass("right-on");
				$(".main-sect").eq(this.page_cnt - 1).addClass("left-on");
			}else{
				$(".main-sect").eq(this.page_cnt).addClass("center-on");
				$(".main-sect").eq(this.page_cnt + 1).addClass("right-on");
				$(".main-sect").eq(this.page_cnt - 1).addClass("left-on");
			}
// 이동했을때 이동한 GNB의 화면을 새로 만들어주기 위해서 호출 2022.12.15 M.Park
			try {
				addGNBDisplay();
			} catch (e) {
				// 위 함수가 없으면 무시함.
			}
/* */
/* // 해당 내용이 다시 정해지기 전까지 해당 소스를 살려놔야 할 것 같습니다. */

			// 상단 고정된 메뉴 초기화
			$(".main-lnb-scroll").removeClass("is-hide");
			$(".fix-navi-scroll").css({"position":"static","top":"auto"}).scrollLeft(0);
			$(".fix-navi-scroll li").removeClass("on");
			$(".fix-navi-scroll li:first-child").addClass("on");
			
			// 지금인기 GNB 화면에서 카테고리 드랍시 추가되었던 css 초기화(2021.09.15 김동진)
			$("html").removeClass("navi-popup has-modal");
			
			if (typeof singleFixClick === "function") {
				singleFixClick("fix-navi","fix-navi-scroll","fix-conts");
			}
			
			/* gnb 메뉴 호출 시작 */
			//GNB메뉴 호출
			var prev_idx = (this.page_cnt == 0 ? (this.sect_total - 1) : this.page_cnt - 1);
			var next_idx = (this.page_cnt == this.sect_total ? 0 : this.page_cnt + 1);
			
			//Prev Menu
			if ($(".main-sect").eq(prev_idx).data("isLoad") == "N") {
				// getSubMenu(prev_idx, $(".main-sect").eq(prev_idx).data("contsLink"), 300);
			}
			//Cur Menu
			if ($(".main-sect").eq(this.page_cnt).data("isLoad") == "N") {
				getSubMenu(this.page_cnt, $(".main-sect").eq(this.page_cnt).data("contsLink"), 0);
			}
			//Next Menu
			if ($(".main-sect").eq(next_idx).data("isLoad") == "N") {
				// getSubMenu(next_idx, $(".main-sect").eq(next_idx).data("contsLink"), 300);
			}
			
			$(".main-sect").data("isGrid", "N");
			
			if ($(".main-sect").eq(this.page_cnt).data("module") == "home" && getJsonFromUrl().module == "home") {
			} else {
//				2022.11.02 M.Park 왜 지우는지 확인 필요
//				$(".main-sect").empty();
//				gridMainSubConts(this.page_cnt);
			}

			// 아파트로찾기 일때
			if ($(".main-sect.center-on").data("module") == "apartment") {
				$('body').addClass('hf')
				$('.footer').hide();
			} else {
				$('body').removeClass('hf')
				$('.footer').show();
			}
			
			setFlickingMenu($(".main-sect").eq(this.page_cnt).data("module"));
			/* gnb 메뉴 호출 끝 */
			
			// GNB 선택시마다(클릭, 플리킹) 해당 GNB의 서브메뉴 이벤트 감지 재실행을 위해서 호출 (2021.01.05 김동진)
			subFixClick("fix-sub-navi","fix-sub-navi-obj","fix-conts");

			// 샘LIVE 선택시 마다 알림받기 여부, 뷰 카운트를 갱신 (html gen 화면에서 데이터 갱신필요) (2022.06.28 김대오)
			if($(".center-on").data("module") == "slive") {
				if (location.href.indexOf("/m/main.html") > -1) {
					dispSamlive.setSamLiveNotiDetailCntAjax();
				}
			}

			//스토어홈 스크랩 상품 체크 - .do일 경우는 서버에서 스크랩정보 조회하는 것으로 class on 표시, html gen일 경우에만 해당 조회 로직 호출함.
			if(location.href.indexOf(".html") > -1){
				isWishList = "N";
				arrWishGdsNoList = new Array();
				wishGdsNoList();
			}
		}
	};
})(jQuery);
$(function() {	// 이미지 슬라이드 바인드 부분
	$(".flick-container").mainSwipe();
});

function isGnbSwipeExist(target, existArr) {
	var rtn = false;
	if(target && existArr && $.isArray(existArr)) {
		for (var i = 0; i < existArr.length; i++) {
			var exist = existArr[i];
			if($(target).parents(exist).length > 0) {
				rtn = true;
				break;
			}
		}
	}
	return rtn;
}
/* ---------------------------------------------------
메인 상단 메뉴 고정 시작
--------------------------------------------------- */
function mainMenuFixed(){
	// 상단 배너 닫기
	$(".top-fix-close").click(function() {
		$('.top-fix-list').animate({"height":0}, 10, function(){
			$('.top-fix').height($(".top-fix-obj").height());
		});
		$(".main-lnb-scroll").animate({"top":0},10);
		$(".fix-navi-scroll").animate({"top":$(".main-lnb").height()},10);
	});

	$(window).bind("scroll",function() {
		$(".main-lnb").height($(".main-lnb-scroll").height());
		try{
			if($(window).scrollTop() > $(".top-fix").offset().top){
				$(".top-fix").height($(".top-fix-obj").height());
				$(".top-fix-obj").css({"position":"fixed","top":0});
			}else{
				$(".top-fix").css({"height":"auto"});
				$(".top-fix-obj").css({"position":"static","top":"auto"});
			}

			if($(window).scrollTop() > $(".main-lnb").offset().top - $(".top-fix-obj").height()){
				$(".main-lnb-scroll").css({"position":"fixed","top":$(".top-fix-obj").height()});
			}else{
				$(".main-lnb-scroll").css({"position":"static","top":"auto"});
			}
		}catch(e){}
	});
	
}

$(function() {
	mainMenuFixed();
});

var _posi = $(window).scrollTop();
var preOrder = 0;
var topY = 0;
var addY = 0;

function singleFixClick(wrapClass, titleClass, contsClass){

	if($(".center-on ."+wrapClass).hasClass("fix-on")){
		return false;
	}else{
		$(".center-on ."+wrapClass).addClass("fix-on");
	}

	$(".center-on ."+wrapClass).height($(".center-on ."+wrapClass).height());
	$(".center-on .main-fix-navi ."+titleClass).find("li").click(function() {
		if(preOrder >= $(this).index()) {
			addY = $(".main-lnb").height();
		}else{
			addY = 0;
		}

		$('html,body').scrollTop($(".center-on ."+contsClass).eq($(this).index()).offset().top - addY - topY);
		preOrder = $(this).index();
	});

	$(".center-on .main-fix-tab ."+titleClass).find("li").click(function() {
		$('html,body').scrollTop($(".center-on .main-fix-tab .fix-navi").offset().top - addY - topY);
		$(".center-on .main-fix-tab ."+contsClass).hide();
		$(".center-on .main-fix-tab ."+contsClass).eq($(this).index()).show();
		$(".center-on .main-fix-tab ."+titleClass).find("li").removeClass("on");
		$(".center-on .main-fix-tab ."+titleClass).find("li").eq($(this).index()).addClass("on");
		$(".center-on .main-fix-tab ."+titleClass).stop().animate({scrollLeft:$(".center-on .main-fix-tab ."+titleClass).scrollLeft() + $(".center-on .main-fix-tab ."+titleClass).find("li").eq($(this).index() - ($(this).index() > 0 ? 1 : 0) ).position().left}, 300);
	});

}

function singleFixedNavi(wrapClass, titleClass, contsClass){
	
	topY = $(".top-fix").height() + $(".main-lnb").height();

	$(window).bind("scroll",function() {
		var scrTop = $(window).scrollTop();
		topY = $(".top-fix").height() + $(".main-lnb").height();
		try{
			if($(window).scrollTop() > $(".center-on ."+wrapClass).offset().top - topY + $(".center-on ."+wrapClass).height() && $(window).scrollTop() <= $(".center-on .fix-wrap").offset().top + $(".center-on .fix-wrap").height()  - topY){
				if(!$(".center-on ."+titleClass).hasClass("on")){
					$(".center-on ."+titleClass).css({"position":"fixed","top":topY}).addClass("on");
				}
				if(scrTop > _posi) {
					//Down 
					$(".main-lnb-scroll").addClass("is-hide");
					$(".center-on ."+titleClass).css({"top":$(".top-fix").height()});
					addY = 0;
				} else {
					//UP
					$(".main-lnb-scroll").removeClass("is-hide");
					$(".center-on ."+titleClass).css({"top":$(".top-fix").height() + $(".main-lnb").height()});
					addY = $(".main-lnb").height();
				}
			}else{
				$(".center-on ."+titleClass).css({"position":"static"}).removeClass("on");
				$(".main-lnb-scroll").removeClass("is-hide");
			}

			$(".center-on .main-fix-navi ."+contsClass).each(function(n) {
				if($(window).scrollTop() >= $(this).offset().top - addY - topY - 5){
					$(".center-on .main-fix-navi  ."+titleClass).find("li").removeClass("on");
					$(".center-on .main-fix-navi  ."+titleClass).find("li").eq(n).addClass("on");
					$(".center-on .main-fix-navi  ."+titleClass).stop().animate({scrollLeft:$(".center-on .main-fix-navi  ."+titleClass).scrollLeft() + $(".center-on .main-fix-navi  ."+titleClass).find("li").eq(n - (n > 0 ? 1 : 0) ).position().left}, 300);
					preOrder = n;
				}
			});
		}catch(e){}
		_posi = scrTop;
	});
}

$(function() {	
	singleFixClick("fix-navi","fix-navi-scroll","fix-conts");
	singleFixedNavi("fix-navi","fix-navi-scroll","fix-conts");
	
	if ($(".main-fix-navi").length > 0) {	// home_category_prd.jsp 에서만 사용. 해당 소스 이동 필요. 2023.02.07 M.Park
		if (typeof getJsonFromUrl() === "object" && getJsonFromUrl().module == "home") {
			if ($(window).scrollTop() + 400 > $(".main-fix-navi").offset().top) {
				$("div[data-module=home]").find(".main-fix-navi .fix-conts").each(function(i){
					$(this).find(".list-node").show();
					$(this).data("display", "Y");
				});
			}
		}
	}
});
/* ---------------------------------------------------
메인 상단 메뉴 고정 끝
--------------------------------------------------- */


/**
 * 메인 GNB 메뉴
 * @returns result
 * @author 이상필
 */
var mainSubContList = new Array();
function gridMainSubConts(idx) {
	var _module = $(".main-sect").eq(idx).data("module");
	$(mainSubContList).each(function(i, item){
		if (_module == item.module && $(".main-sect").eq(idx).data("isGrid") != "Y") {
			$(".main-sect").eq(idx).empty().append(item.html);
			$(".main-sect").eq(idx).data("isGrid", "Y");
			componentEventBinding();
		}
	});	
}
				
/**
 * 메인 GNB 메뉴
 * @returns result
 * @author 이상필
 *
 * 2022.04.06 cache 비활성화 > 활성화로 변경
 */
function getSubMenu(index, _url, delay) {
	$(".main-sect").eq(index).data("isLoad", "ING");
	setTimeout(function() {
		$.ajax({
			url : _url,
			type : 'get',
			dataType : "html",
			async : true,
			cache : true,
			success : function(html){
				$(".main-sect").eq(index).data("isLoad", "Y");
				$(".main-sect").eq(index).removeData("contsLINK");
				$(".main-sect").eq(index).find(".error_notice").remove();
				var mainSubCont = new Object();
				mainSubCont.module = $(".main-sect").eq(index).data("module");
				mainSubCont.html = html;
				mainSubContList.push(mainSubCont);

				//ajax 로딩 지연으로 다시한번 html grid 실행
				if (index == $(".main-sect[data-module="+ getJsonFromUrl().module +"]").index()) {
					//gridMainSubConts($(".main-lnb-list li").index($(".main-lnb-list li[class=on]")));
					// gnb-샘LIVE li class명 추가로 인한 선택자 변경 2022.07.08 김대오
					gridMainSubConts($(".main-lnb-list li").index($(".main-lnb-list li.on")));
				}
			},
			error : function(xhr, textStatus, errorThrown){
				$(".main-sect").eq(index).find(".loading_bar").hide();
				$(".main-sect").eq(index).find(".error_notice").show();
				$(".main-sect").eq(index).data("isLoad", "N");
			}
		});
	}, delay);
}

/**
 * url moudle 파라미터 추가
 * @returns result
 * @author 이상필
 */
function setFlickingMenu(moduleName) {
	if (moduleName == null) {
		return;
	}
	if ( typeof window.history.pushState == 'function') {
		var paramObject = getJsonFromUrl();
		var paramString = '?'+$.param( $.extend( paramObject,{'module':moduleName}) );
		var paramHash = "";

		try {
			n_click_logging(location.origin + location.pathname + "?module="+ moduleName, location.href);
		} catch(e) {
		}
		
		//hash 값이 있는경우 hash값을 그대로 넘겨줌 (2020.09.21 김동진)
		if (paramObject.module.toLowerCase() == "brandshop" || paramObject.module.toLowerCase() == "tv" || paramObject.module.toLowerCase() == "event"
			|| paramObject.module.toLowerCase() == "deal" || paramObject.module.toLowerCase() == "spaceandphoto" || paramObject.module.toLowerCase() == "magazine" || paramObject.module.toLowerCase() == "constcase") {
			if(location.hash != "") {
				paramHash = location.hash;
			}
		}
			
		//param 초기화 현상 (MALLDVLPRJ-1667)2022.02.16 JKM 기존SNB있을때 조건문 삭제
		window.history.replaceState( {'module':moduleName}, null, paramString);	
		
		// history.replaceState 로 hash값을 넣게되면 특정 단말기에서 해쉬값을 못받는 경우가 있어서 해쉬값을 넣어주는 방식을 아래와 같이 변경(2020.10.15 김동진)
		if (paramHash != "") {
			location.hash = paramHash;
		}
		
		//트래킹 전송 부분
		ga('set', 'page', location.pathname + "?module="+ moduleName);
		ga('send', 'pageview');
	}
}

/**
 * url params to Object
 * @returns result
 * @author 이상필
 */
function getJsonFromUrl() {
	var result = {};
	try {
		var query = location.search.substr(1);
		if( !query ){
			return result;
		}
		query.split("&").forEach(function(part) {
			var item = part.split("=");
			result[item[0]] = decodeURIComponent(item[1]);
		});
	}catch(e){
		return result;
	}
	return result;
}


/**
 * 메인 팝업
 * @returns result
 * @author 이상필
 */
function get_main_popup(){
	var __MAIN_NOTICE_KEY = 'mainPop';
	if (Common.getCookie( __MAIN_NOTICE_KEY ) != "done" && getJsonFromUrl().module == "home") {	//홈메인 진입시에만 노출 [2021. 10. 06.][FRODO][MALLDVLPRJ-1530]
		popup_random_on();
		$("#pop-main .hsm-swipe").addClass("comp-sld");
		if($("#pop-main").find(".hsm-swipe-list").length > 1){
			$("#pop-main .comp-sld").hsmSwipe({
				speed : 350
			});
		}
		//앱유도 팝업이 없는 경우 또는 close했을 경우에만 노출
		if (Common.getCookie("APP_DOWNLOAD_POPUP_LOADED") == "done"
				&& $("#pop-main").find(".hsm-swipe-list").length > 0){
			main_popup_on();
		}
	}
}

/**
 * 한샘몰 몰메인 팝업 노출 알고리즘 변경(MALLDVLPRJ-1626)
 * @returns result
 * @author 안서영
 */
function popup_random_on(){
	var popArr = [];
	var popArrUniq = [];
	var popArrPri = [];
	
	var arrLen = $("#pop-main").find(".hsm-swipe-list").length;//팝업개수
	var renNoArr = randomCnt(arrLen);//랜덤
	
	//랜덤 배열 생성
	$("#pop-main").find(".hsm-swipe-list").each(function(idx){
		popArr.push($(this));
	});
	for (var i = 0 ; i < popArr.length; i++){
		var ranNo = renNoArr[i];
		var thisObj = popArr[ranNo];
		var pObj = new Object();
		pObj.priNo = $(thisObj).find("img").data("priority");
		pObj.thisObj = $(thisObj);
		popArrUniq.push(pObj);//랜덤
	}
	//우선순위 정렬
	for (var i = 0 ; i < popArrUniq.length; i++){
		var rObj = popArrUniq[i];
		var priNo = rObj.priNo;
		if(popArrUniq.length > 1){
			popArrUniq.sort(function(a, b)  {return a.priNo - b.priNo;});
		}
	}
	//팝업 구성
	for (var i = 0 ; i < popArrUniq.length; i++){
		var sortObj = popArrUniq[i].thisObj;
		popArrPri.push($(sortObj));
	}	
	//화면출력
	$("#pop-main .hsm-swipe-view").html('');
	for (var i = 0 ; i <popArrPri.length; i++){
		if(i>3) break; //기존 최대 4개 노출
		var thisObj = popArrPri[i];							
		$("#pop-main .hsm-swipe-view").append($(thisObj));
	}	
}

/**
 * 메인팝업 랜덤정렬
 * @returns result
 * @author 안서영
 */
function randomCnt(selectNo){
	var randomIndexArray = [];
	for (i=0; i<selectNo; i++) {
		randomNum = Math.floor(Math.random() * selectNo);
		if (randomIndexArray.indexOf(randomNum) === -1) {
			randomIndexArray.push(randomNum)
		} else {
			i--;
		}
	}
	return randomIndexArray
}

/**
 * 메인팝업 레이어 열기
 * @returns result
 * @author 이상필
 */
function main_popup_on(){
	popup_openV1('pop-main');
	$("#pop-main #today_done").click(function() {
		Common.setCookie('mainPop', "done", 1);
		popup_closeV1('pop-main');
	});
}

/**
 * 메인 배너 팝업 레이어 열기
 * @returns result
 * @author 이상필
 */
function open_event_detail(dispComponentNo) {
	$("body").append($("#pop-eventall-dumy-" + dispComponentNo));
	$("#pop-eventall-dumy-" + dispComponentNo).find("img").addClass("js-lazy");
	popup_openV1("pop-eventall-dumy-" + dispComponentNo);
}


$(function() {
	/* 2020.11.10. 메인GNB이동시 스크롤 위치 초기화*/
	$(".main-lnb-list li").on("click", function () {
		$("body").css("margin-top", 0);
		setTimeout(function(){
			$(window).scrollTop(0);
		},0);
	});
});