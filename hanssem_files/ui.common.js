/**
 * ui.common.js
 * 공통 스크립트
 **/
/* ---------------------------------------------------
touchstart passive mode
Unable to preventDefault inside passive event listener invocation. 으로 해당 적용 보류
--------------------------------------------------- */
// jQuery.event.special.touchstart = {
// 	setup: function( _, ns, handle ){
// 		this.addEventListener("touchstart", handle, { passive: true });
// 	}
// };
// jQuery.event.special.touchmove = {
// 	setup: function( _, ns, handle ){
// 		this.addEventListener("touchmove", handle, { passive: true });
// 	}
// };

/* ---------------------------------------------------
extensive script
--------------------------------------------------- */
/* 터치제한 공통클래스 함수 */
$(function() {
	/* 터치 제한 */
	/* touchEventInit(); */
	setTimeout(function(){
		touchEventInit();
	},1000);
	
	// dim 클릭시 모든 팝업 초기화
	$(".m-dim").click(function() {
		popupInit();
	});
	
	subTopFix();
	
	// 텍스트 말줄임 펼치기 스크립트
	$(document).on("click",".more-txt",function(){ // 동적생성 엘리먼트의 클릭 이벤트를 위해서 수정(2021.07.23 김동진)
		if(!$(this).hasClass("cut")){
			$(this).addClass("cut");
		}else{
			$(this).removeClass("cut");
		}
	});

	$(document).on("click",".more-txt-btn a",function(){ // 동적생성 엘리먼트의 클릭 이벤트를 위해서 수정(2021.07.23 김동진)
		if(!$(this).parents(".more-txt-btn").siblings(".more-txt").hasClass("cut")){
			$(this).parents(".more-txt-btn").siblings(".more-txt").addClass("cut");
		}else{
			$(this).parents(".more-txt-btn").siblings(".more-txt").removeClass("cut");
		}
	});

	// 상품후기 텍스트 말줄임 펼치기
	$(document).on("click",".review-text .more-text",function(){ 
		if($(this).hasClass("on")){
			$(this).removeClass("on").text('더보기').closest('.review-text').removeClass('on');
		}else{
			$(this).addClass("on").text('접기').closest('.review-text').addClass('on');
		}
	});

	// 상품후기 판매자 텍스트 말줄임 펼치기
	$(document).on("click",".comment .more-text",function(){ 
		if($(this).hasClass("on")){
			$(this).removeClass("on").text('더보기').closest('.comment').removeClass('on');
		}else{
			$(this).addClass("on").text('접기').closest('.comment').addClass('on');
		}
	});
	
	wholeAccordion('acco-list', 'acco-tit', 200);
	
	if($(".star-range").length > 0){
		$(".star-range").starScore();
	}
	
	// 한샘 모바일 리뉴얼 2020 common.js
	var re20_scrTop = $(window).scrollTop();
	var re20_posi = 0;

	// 플로팅 탭 마이한샘 메뉴
	$(".floating-tab .f-my").on("click", function () {
		$(this).addClass("on");
	});
	$(".m-dim").on("click", function () {
		if (!$(".pop-my").hasClass("focus-pop")) {
			$(".floating-tab .f-my").removeClass("on");
		}
	});

	subFixClick("fix-sub-navi","fix-sub-navi-obj","fix-conts");
	subFixedNavi("fix-sub-navi","fix-sub-navi-obj","fix-conts");
	
	re20SearchFixed();			/* 기초 데이터 */
	re20SearchFixedEventBind();	/* 이벤트 바인드 */
	if($(".comp-sld").length > 0){
		$(".comp-sld").hsmSwipe({ speed : 350}); /* 슬라이드 */
	}

	$('.pay-table__tr').click(function(){
		$('.pay-table__tr').removeClass('active');
		$(this).addClass('active');
	});
	
	//$(".tab-act").moTabAction();
	
	// 이미지 슬라이드 바인드 부분
	/*
	$(".comp-sld").hsmSwipe({
		speed : 350
	});
	*/

	//selectOnAct();
});

/* 터치 제한 이벤트 함수화 (2021.80.26 김동진) */
function touchEventInit(){
	$(".double-touch").on("touchstart", function(e) {e.stopImmediatePropagation();});$(".double-touch").on("touchmove", function(e) {e.stopImmediatePropagation();});$(".double-touch").on("touchend", function(e) {e.stopImmediatePropagation();});
}



/* ---------------------------------------------------
팝업 기존 오류 예외 처리
--------------------------------------------------- */
$(function() {
	$(document).on("click", ".m-pop-close", function(e){
		$(".o-dimed").removeClass("is-active");
	});
});


/* ---------------------------------------------------
공통 툴팁 팝업
--------------------------------------------------- */
function tooltip(toolPop){
	$(toolPop).toggleClass("show");
	$(toolPop + " .m-pop-close").click(function(){
		$(this).parents(toolPop).removeClass("show");
	});
}



/* ---------------------------------------------------
timer (main)
--------------------------------------------------- */
function dispTimerFn(timerObj,timerVar) {
	//동일객체 setTimeout 이벤트 발생 방지
	if ($(timerObj).data("timerEndTime") != timerVar && timerVar != "" && timerVar != undefined) {
		return;
	}
	var endTime = timerVar;
	var nowTime = dispConvertTime(disp_js_yyyy_mm_dd_hh_mm_ss_mi(), 1);

	if (endTime > disp_js_yyyy_mm_dd_hh_mm_ss_mi()) {
		dday = dispConvertTime(endTime, 1);
		days = (dday - nowTime) / 1000 / 60 / 60 / 24;
		daysRound = Math.floor(days);
		hours = (dday - nowTime) / 1000 / 60 / 60;
		hoursRound = Math.floor(hours);
		hoursRound = hoursRound - (daysRound * 24);
		minutes = (dday - nowTime) / 1000 /60 - (24 * 60 * daysRound) - (60 * (Math.floor((dday - nowTime) / 1000 / 60 / 60 - (24 * daysRound))));
		minutesRound = Math.floor(minutes);
		seconds = (dday - nowTime) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * (Math.floor((dday - nowTime) / 1000 / 60 / 60 - (24 * daysRound)))) - (60 * minutesRound);
		secondsRound = Math.round(seconds);
		
		nowTime.setMilliseconds(nowTime.getMilliseconds() + 80);
		miSeconds = nowTime.getMilliseconds();

		//3자리
		miSecondsRound = Math.round(miSeconds);

		//2자리
		miSecondsRound = Math.round(miSeconds / 10);
		
		var regex = /[^0-9]/g;
		var result = timerObj.replace(regex, "");
		
		/* 두자리수일 때 */
		if (Number(daysRound) != 0) {
			$(".div_day"+result).css('display', '');
			$(".div_time"+result).css('display', 'none');
			if($(timerObj +" .day-wrap .day").length > 0 ){
				$(timerObj + " " + ".day").html(dispChageImage("D", parseInt(daysRound, 10)));
			}else {
				$(timerObj + " " + ".day").html(dispChageImage("T", parseInt(daysRound, 10)));
			}
		} else {
			$(".div_day"+result).css('display', 'none');
			$(".div_time"+result).css('display', '');
			if($(timerObj +" .day-wrap .day").length > 0 ){
				$(timerObj + " " + ".day").html(dispChageImage("D", parseInt(daysRound, 10)));
			}else {
				$(timerObj + " " + ".day").html(dispChageImage("T", parseInt(daysRound, 10)));
			}


		}
		/* // 두자리수일 때 */

		/* 한자리수일 때 
		$(timerObj + " " + ".timer-day").html(dispChageImage("D", parseInt(daysRound, 10)));
		// 한자리수일 때 */

		var hour = (parseInt(Math.floor(hours), 10)).toString();
		$(timerObj + " " + ".timer-hour").html("");
		if (Number(daysRound) != 0) {
			if (hour < 10) {
				$(timerObj + " " + ".timer-hour").append("<span>" + dispTimerFnNumber(0) + "</span>");
			}
			for(var i=0 ;i < hour.length ;i++){
				$(timerObj + " " + ".timer-hour").append("<span>" + dispTimerFnNumber(hour.substring(i, i+1)) + "</span>");
			}
		}

		/* 한자리수일 때 
		$(timerObj + " " + ".timer-hour").html(dispChageImage("D", parseInt(daysRound, 10)));
		// 한자리수일 때 */

		var h = parseInt(hoursRound, 10).toString();
		if (Number(hoursRound) != 0) {
			if (parseInt(hoursRound, 10) > 9) {
				//$(timerObj + " " + ".timer-hour-1").html(dispTimerFnNumber(h.substring(0, 1)));
				//$(timerObj + " " + ".timer-hour-2").html(dispTimerFnNumber(h.substring(1, 2)));
				$(timerObj + " " + ".hour").html(dispTimerFnNumber(h.substring(0, 2)));
			} else {
				//$(timerObj + " " + ".timer-hour-1").html(dispTimerFnNumber(0));
				//$(timerObj + " " + ".timer-hour-2").html(dispTimerFnNumber(h));
				$(timerObj + " " + ".hour").html(dispTimerFnNumber(h.substring(0, 2)).toString().padStart(2,'0'));
			}
		} else {
			$(timerObj + " " + ".timer-colon").eq(0).hide();
			//$(timerObj + " " + ".timer-hour-1").html(dispTimerFnNumber(0));
			//$(timerObj + " " + ".timer-hour-2").html(dispTimerFnNumber(h));
			$(timerObj + " " + ".hour").html(dispTimerFnNumber(h.substring(0, 2)).toString().padStart(2,'0'));
		}

		var m = parseInt(minutesRound, 10).toString();
		if (parseInt(minutesRound, 10) > 9) {
			//$(timerObj + " " + ".timer-minute-1").html(dispTimerFnNumber(m.substring(0, 1)));
			//$(timerObj + " " + ".timer-minute-2").html(dispTimerFnNumber(m.substring(1, 2)));
			$(timerObj + " " + ".minute").html(dispTimerFnNumber(m.substring(0, 2)));
		} else {
			//$(timerObj + " " + ".timer-minute-1").html(dispTimerFnNumber(0));
			//$(timerObj + " " + ".timer-minute-2").html(dispTimerFnNumber(m));
			$(timerObj + " " + ".minute").html(dispTimerFnNumber(m.substring(0, 2)).toString().padStart(2,'0'));
		}

		var s = parseInt(secondsRound, 10).toString();
		if (parseInt(secondsRound, 10) > 9) {
			//$(timerObj + " " + ".timer-second-1").html(dispTimerFnNumber(s.substring(0, 1)));
			//$(timerObj + " " + ".timer-second-2").html(dispTimerFnNumber(s.substring(1, 2)));
			$(timerObj + " " + ".second").html(dispTimerFnNumber(s.substring(0, 2)));
		} else {
			//$(timerObj + " " + ".timer-second-1").html(dispTimerFnNumber(0));
			//$(timerObj + " " + ".timer-second-2").html(dispTimerFnNumber(s));
			$(timerObj + " " + ".second").html(dispTimerFnNumber(s.substring(0, 2)).toString().padStart(2,'0'));
		}

		//3자리
		if (miSecondsRound == 1000) { $(timerObj + " " + ".timer-msecond").html(".000");}
		if (miSecondsRound < 1000) { $(timerObj + " " + ".timer-msecond").html("." + miSecondsRound);}
		if (miSecondsRound < 100) { $(timerObj + " " + ".timer-msecond").html(".0" + miSecondsRound);}
		if (miSecondsRound < 10) { $(timerObj + " " + ".timer-msecond").html(".00" + miSecondsRound);}

		//2자리
		if (miSecondsRound == 100) { $(timerObj + " " + ".timer-msecond").html(".00");}
		if (miSecondsRound < 100) { $(timerObj + " " + ".timer-msecond").html("." + miSecondsRound);}
		if (miSecondsRound < 10) { $(timerObj + " " + ".timer-msecond").html(".0" + miSecondsRound);}

		newtime = window.setTimeout(function(){dispTimerFn(timerObj,timerVar);}, 1000);

		/* 밀리세컨드 카운트 시
		newtime = window.setTimeout(function(){dispTimerFn(timerObj,timerVar);}, 80);
		 */

	} else {
		//시간 종료
		$(timerObj + " " + ".day").html("<span>0</span><span>0</span>");
		$(timerObj + " " + ".day-wrap").hide();
		//$(timerObj + " " + ".timer-hour").html("<span>"+dispTimerFnNumber(0)+"</span>"+"<span>"+dispTimerFnNumber(0)+"</span>");
		//$(timerObj + " " + ".timer-hour-1").html(dispTimerFnNumber(0));
		//$(timerObj + " " + ".timer-hour-2").html(dispTimerFnNumber(0));
		$(timerObj + " " + ".hour").html("<span>"+dispTimerFnNumber(0)+"</span>"+"<span>"+dispTimerFnNumber(0)+"</span>");
		//$(timerObj + " " + ".timer-minute-1").html(dispTimerFnNumber(0));
		//$(timerObj + " " + ".timer-minute-2").html(dispTimerFnNumber(0));
		$(timerObj + " " + ".minute").html("<span>"+dispTimerFnNumber(0)+"</span>"+"<span>"+dispTimerFnNumber(0)+"</span>");
		//$(timerObj + " " + ".timer-second-1").html(dispTimerFnNumber(0));
		//$(timerObj + " " + ".timer-second-2").html(dispTimerFnNumber(0));
		$(timerObj + " " + ".second").html("<span>"+dispTimerFnNumber(0)+"</span>"+"<span>"+dispTimerFnNumber(0)+"</span>");
		$(timerObj + " " + ".timer-msecond").html(".00");
		$(timerObj + " " + ".timer-end").show();
		//popupAlert('이벤트가 종료되었습니다');
	}
}
function dispConvertTime(time, types) {
	var arrTime = time.split(" ");
	var a = arrTime[0];
	var b = arrTime[1];

	var temp = a.split("-");
	var temp1 = b.split(":");
	var temp2 = b.split(".");

	var returnTime;
	
	if (types == 1) {
		returnTime = new Date( Number(temp[0]), Number(temp[1])-1,Number(temp[2]),Number(temp1[0]),Number(temp1[1]),Number(temp1[2]),(isNaN(Number(temp2[1])) ? 0 : Number(temp2[1])));
	} else {
		returnTime = temp[0] + Number(temp[1]) - 1 + temp[2] + temp1[0] + temp1[1] + temp1[2];
	}
	return returnTime;
}
function dispChageImage(types, val) {
	var txt = "";
	if (val > 9) {
		var no = val.toString();
		for (i=0;i < no.length;i++) {
			txt += dispTimerFnNumber(parseInt(no.substring(i, i +1), 10));
		}
	} else {
		if (types == "D") {
			txt = dispTimerFnNumber(parseInt(val, 10));
		} else {
			txt = dispTimerFnNumber(parseInt(val, 10)).toString().padStart(2,'0');
		}
	}
	return txt;
}
function dispTimerFnNumber(no) {
	var countNum = no;
	//var img = "<img src='http://image.hanssem.com/hsimg/mall/event/2015/201504/img/ten-deal-num-"+ no +".png' />";
	return countNum;
}
function disp_js_yyyy_mm_dd_hh_mm_ss_mi () {
 now = new Date();
 year = "" + now.getFullYear();
 month = "" + (now.getMonth() + 1);if (month.length == 1) { month = "0" + month;}
 day = "" + now.getDate();if (day.length == 1) { day = "0" + day;}
 hour = "" + now.getHours();if (hour.length == 1) { hour = "0" + hour;}
 minute = "" + now.getMinutes();if (minute.length == 1) { minute = "0" + minute;}
 second = "" + now.getSeconds();if (second.length == 1) { second = "0" + second;}
 miSecond = "" + now.getMilliseconds();
 if (miSecond.length == 1) { miSecond = "00" + miSecond;}
 if (miSecond.length == 2) { miSecond = "0" + miSecond;}
 return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "." + miSecond;
}



/* ---------------------------------------------------
slide node
--------------------------------------------------- */
;(function($){
	$.fn.hsmSwipe = function (settings) {
		settings = jQuery.extend({
			btn_prev : null,
			btn_next : null,
			btn_pasing : null,
			list : null,
			speed : 300
		}, settings);

		var opts = [];
		opts = $.extend({}, $.fn.hsmSwipe.defaults, settings);
		
		return this.each(function () {

			var _this = this;

			$.fn.extend(this, hsmSwipe);
			this.opts = opts;
			_this.init();	
		});
	};
	var hsmSwipe = {
		init : function(){
			if($(this).hasClass("swipe-On")){
				return false;
			}else{
				$(this).addClass("swipe-On");
			}

			var _this =  this;
			this.list_wrap = $(this).children(":first-child");
			this.list = this.list_wrap.children();
			this.totalCnt = this.list.length;
			this.prev = $(this).find(".hsm-swipe-prev");
			this.next = $(this).find(".hsm-swipe-next");
			this.pasing_wrap = $(this).find(".hsm-swipe-paging");
			this.page_cnt = $(this).find(".hsm-swipe-cnt");
			this.order = $(this).find("li.on").index()>-1?$(this).find("li.on").index():0;
			this.next_order = 0;
			this.autoPlay = false;
			this.auto_obj = 0;
			this.speed = this.opts.speed;
			this.interval_time = 0;
			this.auto_obj = "";
			this.start_X = 0;
			this.start_Y = 0;
			this.move_X = 0;
			this.move_Y = 0;
			this.scroll_act = false;
			this.drag_act = false;
			this.direct = 1;
			this.slideCnt = $(this).find(".hsm-swipe-num");
			this.slideTot = $(this).find(".hsm-swipe-tot");
			this.proc = $(this).find(".hsm-proc .bars");

			clearInterval(this.auto_obj);
			this.prev.off('click');
			this.next.off('click');
			this.list_wrap.off("touchstart");
			this.list_wrap.off("touchmove");
			this.list_wrap.off("touchend");
			this.list_wrap.off("touchcancel");
			this.list_wrap.off("webkitTransitionEnd transitionend");
			this.list.eq(this.order).addClass("on");

			if(this.totalCnt <= 1) {
				this.prev.hide();
				this.next.hide();
				this.pasing_wrap.hide();
				this.page_cnt.hide();
				this.proc.hide();
				return false;
			}
			
			this.proc.width((1/this.totalCnt)*100+"%");

			if($(this).attr("auto_play") != "undefined" && $(this).attr("auto_play") != null){
				this.autoPlay = true;
				this.interval_time = parseInt(parseInt($(this).attr("auto_play")));
			}

			
			this.list.eq(this.order+1).css('left','100%');

			if(this.autoPlay) this.autoAction();

			this.slideCnt.text(this.order+1);
			this.slideTot.text(this.totalCnt);

			this.list.each(function(n){
				if(_this.order == n){
					_this.pasing_wrap.append($('<span class="on"></span>').on('click',function() {
						if(_this.order == $(this).index()) return false;
						_this.speed = 0;
						_this.order = $(this).index() - 1;
						_this.clickAction(-1);
					}));
				}else{
					_this.pasing_wrap.append($('<span></span>').on('click',function() {	
						if(_this.order == $(this).index()) return false;
						_this.speed = 0;
						_this.order = $(this).index();
						_this.order = $(this).index() - 1;
						_this.clickAction(-1);
					}));
				}
			});


			this.prev.on('click',function() {
				_this.clickAction(1);
			});

			this.next.on('click',function() {
				_this.clickAction(-1);
			});

			$(this).on("touchstart", function(e){
				this.stopAuto();
			});

			$(this).on("touchend", function(e){
				if(this.autoPlay) this.autoAction();
			});

			this.list_wrap.on("touchstart", function(e) {
				e.stopPropagation();
				_this.stopAuto();
				if(_this.list_wrap.is(":animated")) return false;
				_this.scroll_act = false;
				_this.move_X = 0;
				_this.move_Y = 0;
				if(e.type == "touchstart" && e.originalEvent.touches.length <= 1) {
					_this.start_X = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
					_this.start_Y = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY;
					_this.scrollact = false;
				}
			});

			this.list_wrap.on("touchmove", function(e) {
				e.stopPropagation();

				if(_this.list_wrap.is(":animated")) return false;
				if(e.type == "touchmove" && e.originalEvent.touches.length <= 1){
					_this.move_X = (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX) - _this.start_X;
					_this.move_Y = (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY) - _this.start_Y;
					var w = _this.move_X < 0 ? _this.move_X * -1 : _this.move_X;
					var h = _this.move_Y < 0 ? _this.move_Y * -1 : _this.move_Y;

					if ((w < h || _this.scroll_act) && !_this.drag_act) {
						_this.move_X = 0;
						_this.scroll_act = true;
						_this.drag_act = false;
					} else {
						e.preventDefault();
						_this.posi();
						$(this).css("left",_this.move_X+'px');
					}
				}
			});

			this.list_wrap.on("touchend", function(e) {
				e.stopPropagation();

				if(_this.list_wrap.is(":animated")) return false;
				var d = 1;
				if(_this.scroll_act) {
					_this.drag_act = false;
					_this.scroll_act = false;
				} else {
					if(Math.abs(_this.move_X) > 20){
						if(_this.move_X > 0){
							d = 1;
						}else{
							d = -1;
						}
						_this.action(d);
					}else{
						$(this).css("left",0);
					}
				}
				if(_this.autoPlay) _this.autoAction();
			});
		},

		action : function(d) {
			var _this = this;

			this.proc.width(((this.next_order+1)/_this.totalCnt)*100+"%");
			this.list_wrap.stop().animate({'left':d*100+'%'}, this.speed, function() {
				_this.drag_act = false;
				_this.scroll_act = true;
				_this.speed = _this.opts.speed;
				if(_this.move_X != 0) _this.actionEnd();
			});
			this.actionCallBack();
		},

		posi : function(){
			var _this = this;
			
			this.scroll_act = false;
			this.drag_act = true;
			if(this.move_X > 0){
				if(this.order == 0){
					this.next_order = this.totalCnt - 1;
				}else{
					this.next_order = this.order - 1;
				}
				this.direct = -1;
				
			}else{
				if(this.order == _this.totalCnt - 1){
					this.next_order = 0;
				}else{
					this.next_order = this.order + 1;
				}
				this.direct = 1;
			}
			this.list.eq(this.next_order).css({'display':'block','left':this.direct*100+'%'});
			if(this.list.eq(this.next_order).find("img").is('[data-imsi]')){
				this.list.eq(this.next_order).find("img").attr("src", this.list.eq(this.next_order).find("img").attr("data-imsi"));
				this.list.eq(this.next_order).find("img").removeAttr("data-imsi");
			}
		},

		actionEnd : function(){
			var _this = this;

			var next_over = this.next_order+1 > this.totalCnt - 1 ? 0 : this.next_order+1;
			this.list.removeClass("on");
			this.list.each(function(n) {
				if(n == _this.next_order){
					_this.list.eq(n).addClass("on").css({'left':0});
				}else if(n == next_over){
					_this.list.eq(n).removeClass("on").css({'display':'none','left':'100%'});
				}else{
					_this.list.eq(n).removeClass("on").css({'display':'none','left':'200%'});
				}
			});
			if(_this.direct > 0){
				this.order++;
				if(this.order > this.totalCnt - 1) this.order = 0;
			}else{
				this.order--;
				if(this.order < 0) this.order = this.totalCnt - 1;
			}
			this.list_wrap.css({'left':0});
		},

		clickAction : function(cd){
			var _this = this;

			_this.move_X = cd*20;
			_this.scroll_act = false;
			_this.posi();
			_this.action(cd);
		},

		autoAction : function() {
			var _this = this;
			
		
			if(this.autoPlay){
				_this.auto_obj = setInterval(function(){
					_this.clickAction(-1);
				},_this.interval_time);
			}
		},

		stopAuto : function() {
			var _this = this;
			clearInterval(this.auto_obj);
		},

		actionCallBack : function() {
			var _this = this;
			
			this.slideCnt.text(this.next_order+1);
			this.pasing_wrap.children().each(function(n) {
				if(n == _this.next_order){
					$(this).addClass("on");
				}else{
					$(this).removeClass("on");
				}
			});
		}
	};
})(jQuery);

/* ---------------------------------------------------
tab view 함수
--------------------------------------------------- */
;(function($){
	$.fn.moTabAction = function(){
		return this.each(function() {
			$.fn.extend(this, moTabAction);
			this.init();
		});
	};

	var moTabAction = {
		init : function(){
			if($(this).hasClass("tab-act-on")){
				return false;
			}else{
				$(this).addClass("tab-act-on");
			}

			var _this = this;
			this.tab_tit = $(this).find(".page-tab-menu").children();
			this.tab_cont_list = $(this).find(".page-tab-cont").children();
			this.amount = this.tab_cont_list.length;
			this.option = $(this).attr("option");
			this.imgType = '';

			if(this.amount <= 1) return false;

			
			if(this.tab_tit.eq(0).find("img").length > 0){
				var img_length = this.tab_tit.eq(0).find("img").attr("src").length - 3;
				this.imgType = this.tab_tit.eq(0).find("img").attr("src").substr(img_length , 3);
			}

			this.tab_tit.on("click", function(){
				_this.actTab($(this).index());
			});
		},

		actTab : function(n){
			var _this = this;
			this.tab_tit.each(function(k) {
				if(k == n){
					$(this).addClass("on");
					if($(this).find("img").length > 0){
						$(this).find("img").attr("src", $(this).find("img").attr("src").replace("."+_this.imgType,"_on."+_this.imgType));
					}
					_this.tab_cont_list.eq(k).addClass("tab-on").show();
				}else{
					$(this).removeClass("on");
					if($(this).find("img").length > 0){
						$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_on."+_this.imgType,"."+_this.imgType));
					}
					_this.tab_cont_list.eq(k).removeClass("tab-on").hide();
				}
			});
		}
	};
})(jQuery);

/* ---------------------------------------------------
컨텐츠 탭
--------------------------------------------------- */
function contTab(tabOrd, tabObjId, tabClass, bodyClass){
	var tabBodys = $("#"+tabObjId+" ."+bodyClass);
	var tabTitles = $("#"+tabObjId+" ."+tabClass);
	tabBodys.hide();
	tabBodys.eq(tabOrd).show();
	tabTitles.each(function(n) {
		$(this).click(function() {
			tabTitles.removeClass("on");
			tabBodys.hide();
			tabTitles.find("img").each(function(n) {
				$(this).attr("src", $(this).attr("src").replace("-on.jpg",".jpg"));
			});

			$(this).addClass("on");
			$(this).find("img").each(function() {
				$(this).attr("src", $(this).attr("src").replace(".jpg","-on.jpg"));
			});
			tabBodys.eq(n).show();
		});
		$(this).click(function() {
			return false;
		});
	});
	tabTitles.eq(tabOrd).trigger('click');
}





/* ---------------------------------------------------
팝업 오픈 함수
--------------------------------------------------- */
var pop_cur_orderV1 = 0;
var pop_scrollTop = 0;
function popup_openV1(objID, clickObj){
	var speed = 200;

	if($("#"+objID).hasClass("focus-pop")){
		return false;
	}

	if(pop_cur_orderV1 == 0) { 
		pop_scrollTop = $(window).scrollTop();
		$("body").css("margin-top",-pop_scrollTop);
	}

	$("html").addClass("has-modal");
	$(".m-pop").removeClass("focus-pop");

	pop_cur_orderV1++;
	$(".m-dim").css("z-index", pop_cur_orderV1+1001).show();

	if($("#"+objID).hasClass("buy-layer") || $("#"+objID).hasClass("option-layer")){
		$("#"+objID).addClass("focus-pop").removeClass("init").data("opener",clickObj).css({"z-index": pop_cur_orderV1+1001,"display":"flex"}).data("pop-order",pop_cur_orderV1);
	}else{
		$("#"+objID).addClass("focus-pop").removeClass("init").data("opener",clickObj).css({"z-index": pop_cur_orderV1+1001}).data("pop-order",pop_cur_orderV1).show();
	}
	if($("#"+objID).hasClass("alert")){
		speed = 0;
		$("#"+objID).animate({"bottom":0}, speed, function(){});
	}else if($("#"+objID).hasClass("side-pop")){
		$("#"+objID).animate({"left":0}, speed, function(){});
		var sideMenuImg = $("#"+objID).find(".m-menu-category").find("img");
		if (!sideMenuImg.hasClass("js-lazy--end") && !sideMenuImg.hasClass("js-lazy")) {
			sideMenuImg.addClass("js-lazy");
		}
	}else{
		$("#"+objID).animate({"bottom":0}, speed, function(){});
	}

	// 상품후기 상세 스크롤 상단
	if($("#"+objID).hasClass("review-detail")) {
		$('.esld-view li').scrollTop(0);
	}
	

	$(".star-range").starScore();

	// 필터 아이템 포커싱 상단 정렬
	if ( objID == 'pop-filter' && clickObj !== 'all' ) {
		$('#'+objID).find('.filter-list-box').each(function(idx, el) {
			idx += 1;
			$('#'+objID).find('.filter-cont-list').append($('[data-id=item'+ idx + ']'));
		});
		$('#'+objID).find('.filter-cont-list').prepend($('#'+clickObj));
		$('#'+clickObj).children().addClass('on').next().slideDown();
		$('#'+clickObj).siblings().children().removeClass('on').next().slideUp();
		$('.pop-filter .m-pop-cont').scrollTop(0);
	}
	else {
		$('#'+objID).find('.filter-list-box').each(function(idx, el) {
			idx += 1;
			$('#'+objID).find('.filter-cont-list').append($('[data-id=item'+ idx + ']'));
		});
		$('#'+objID).find('.accor-tit').removeClass('on').next().slideUp();
		$('.pop-filter .m-pop-cont').scrollTop(0);
	}

	// 포토후기 모아보기의 팝업
	if (objID == 'pop-review-detail') {
		$("#"+objID).find('.esld-list').each(function(i, el) {
			if(clickObj == $(this).attr("name")){
				$(this).addClass("on");
				$(this).css('left','0px');
				$(this).css('position', 'relative');
				$(this).css('margin-left','0px');
				$(this).show();
				//$("#"+objID).find('.esld-paging span').eq($(this).index()).click();
				$("#"+objID).find('.esld-paging span').eq($("#"+objID).find("li.on").index()).click();
			}else{
				$(this).removeClass("on");
			}
		});
	}

	//상품 후기 이미지 확대팝업 후 on 클래스 변경처리
	if(objID.indexOf('viewer-layer-') > -1) {
		var viewNo = objID.split("-")[2];
		var idxCnt = $("#image-viewer-"+viewNo).find("li.on").index();
		if($("#"+objID).find(".hsm-swipe-list").length > 0){
			$("#viewer-layer-"+viewNo).find("li").each(function(ii){
				$(this).removeClass("on");
				$("#viewer-layer-"+viewNo).find("li").css('left','');
				$("#viewer-layer-"+viewNo).find("li").hide();
				$("#viewer-layer-"+viewNo).find("span").removeClass("on");//페이징 초기화
			});

			$("#viewer-layer-"+viewNo).find("li").eq(idxCnt).addClass("on");
			$("#viewer-layer-"+viewNo).find("li").eq(idxCnt).css('left','0px');
			$("#viewer-layer-"+viewNo).find("li").eq(idxCnt).show();
			$("#viewer-layer-"+viewNo).find("span").eq(idxCnt).addClass("on");//페이징 재설정
			//슬라이드 로딩
			$("#viewer-layer-"+viewNo).find("div.hsm-swipe").addClass("comp-sld");
			$(".comp-sld").hsmSwipe({
				speed : 350
			});
		}
	}

	// 플로팅 마이 팝업
	if($("#"+objID).hasClass("pop-my")){
		$('.floating-tab').addClass('on');
	}
}



function popup_closeV1(objID, clickObj){
	var speed = 200;
	pop_cur_orderV1--;
	$(".m-dim").css("z-index", pop_cur_orderV1+1001);
	if(parseInt($("#"+objID).data("pop-order")) <= 1) {
		$("html").removeClass("has-modal");
		$("body").css("margin-top",0);
		$(".m-dim").hide();
		$("#"+objID).removeClass("focus-pop").css("z-index", 1001).data("pop-order",0);

		$(".m-pop").each(function(n){
			$(this).removeClass("focus-pop");
			$(this).data("pop-order",0);
		});

		$(window).scrollTop(pop_scrollTop);
		pop_scrollTop = 0;
	}else{
		$(".m-pop").each(function(n){
			if(parseInt($(this).data("pop-order")) == pop_cur_orderV1) $(this).addClass("focus-pop");
		});
	}
	
	if(objID == 'alert-pop' || $("#"+objID).hasClass("alert") || $("#"+objID).hasClass("spot-pop")){
		speed = 0;
		$("#"+objID).animate({"bottom":"-100%"}, speed, function(){
			$(this).addClass("init").removeClass("focus-pop").css("z-index", 1001).data("pop-order",0).hide();
		});
	}else if($("#"+objID).hasClass("side-pop")){
		$("#"+objID).animate({"left":"-100%"}, speed, function(){
			$(this).addClass("init").removeClass("focus-pop").css("z-index", 1001).data("pop-order",0).hide();
		});
	}else if($("#"+objID).hasClass("buy-layer") || $("#"+objID).hasClass("cart-layer")){
		//상품상세에서 팝업 close 시 bottom 버튼도 같이 hidden되는 이슈로 hidden 처리하지 않도록 수정함.
		$("#"+objID).animate({"bottom":"-100%"}, speed, function() {
		});
	} else{
		$("#"+objID).animate({"bottom":"-100%"}, speed, function(){
			$(this).addClass("init").removeClass("focus-pop").css("z-index", 1001).data("pop-order",0).hide();
			if ($("#"+objID).hasClass('pop-prd-free')) {
				$(this).find('.fix-tab-scroll').css({"position":"static"}).removeClass("on");
				$('.pop-prd-free .m-pop-cont').scrollTop(0);
			}

		});
	}

	// 포토후기 모아보기의 팝업
	if (objID == 'pop-review-detail') {
		$("#"+objID).find('.hsm-swipe-prev, .hsm-swipe-next').hide();
	}

	//상품 후기 이미지 확대팝업 후 on 클래스 변경처리
	if(objID.indexOf('viewer-layer-') > -1) {
		var viewNo = objID.split("-")[2];
		
		if($("#"+objID).find(".hsm-swipe-list").length > 0){
			$("#viewer-layer-"+viewNo).find("li").each(function(ii){
				$(this).removeClass("on");
				$("#viewer-layer-"+viewNo).find("li").css('left','');
				$("#viewer-layer-"+viewNo).find("li").hide();
				$("#viewer-layer-"+viewNo).find("span").remove();//페이징 초기화
			});
			$("#viewer-layer-"+viewNo).find("div.hsm-swipe").removeClass("comp-sld");
			$("#viewer-layer-"+viewNo).find("div.hsm-swipe").removeClass("swipe-On");
		}
	}
}


// 팝업 초기화
function popupInit(){
	pop_cur_orderV1 = 0;
	$(".m-dim").css("z-index", 1000).hide();
	
	$(".m-pop").each(function(n){
		$(this).removeClass("focus-pop");
		$(this).css({"z-index":1001, "bottom":"-100%"}).data("pop-order",0);
	});

	$("html").removeClass("has-modal");
	$("body").css("margin-top",0);
	
	$(window).scrollTop(pop_scrollTop);
	pop_scrollTop = 0;

	if ($('.floating-tab').hasClass('on')) {
		/*
		$('.floating-tab').removeClass('on');
		$('.floating-tab-list .item').removeClass('on');
		*/
	}
}



/* ---------------------------------------------------
여러 객체 상단 고정
--------------------------------------------------- */
function subTopFix(){
	// 상단 배너 닫기
	$(".top-fix-close").click(function() {
		$('.top-fix-list').animate({"height":0}, 10, function(){
			$('.top-fix').height($(".top-fix-obj").height());
		});
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
		}catch(e){}
		// 22.10.23 헤더 투명화 수정 - 이광열
		try{
			if($(window).scrollTop() > $(".head-off-end").offset().top){
				$(".head").removeClass("off");
			}else{
				$(".head").addClass("off");
			}
		}catch(e){}
		try{
			if($(window).scrollTop() > $(".top-fix").offset().top){
				$(".main.head").addClass('fixed');
				$(".main.head").removeClass("off");
			}else{
				$(".main.head").removeClass('fixed');
				$(".main.head").addClass("off");
			}
		}catch(e){}
	});
}





/* ---------------------------------------------------
컨텐츠 타이틀 고정
--------------------------------------------------- */
function fixTit(){
	$(".fix-tit").height($(".fix-tit").height());
	var fixLnbHeight = $(".main-lnb").length == 0 ? 0 : $(".main-lnb").height(); /* 있으면 값, 없으면 0 */
	$(window).bind("scroll",function() {
		scrTop = $(window).scrollTop();
		topY = $(".top-fix").height() + fixLnbHeight;
		try{
			if($(window).scrollTop() > $(".fix-tit").offset().top - topY){
				$(".fix-tit-obj").css({"position":"fixed","top":topY}).addClass("on");
			}else{
				$(".fix-tit-obj").css({"position":"static"}).removeClass("on");
			}
		}catch(e){}
		posi = scrTop;
	});
}
$(function(){
	fixTit();
});





/* ---------------------------------------------------
fixed slide tab 고정 슬라이드 탭
--------------------------------------------------- */
/* 고정 슬라이드 탭 */
function subFixTab(fixArea, types){
	let fixTitHeight = $(".fix-tit").length == 0 ? 0 : $(".fix-tit").height(); /* 있으면 값, 없으면 0 */
	let fixLnbHeight = $(".main-lnb").length == 0 ? 0 : $(".main-lnb").height(); /* 있으면 값, 없으면 0 */
	let topY = $(".top-fix").height() + fixTitHeight + fixLnbHeight;
	let moreBtn = $("#"+fixArea+" .fixtab-tab-obj").find(".btn-tab-drop");
	let addY = 40;

	types == 1 ? addY = 54 : addY = 40;
	
	/*버튼 감추기 기능 (탭 display:none 때문에) 임시로 막음 230206 김승규
	if($("#"+fixArea+" .fixtab-list > ul").outerWidth() > $(window).width() || $("#"+fixArea+" .fixtab-list > ul").outerWidth() == 0){
		moreBtn.show();
	}else{
		moreBtn.hide();
	}
	*/

	moreBtn.off("click").on("click", function(){
		if($(this).hasClass("tab-open")){
			$(this).removeClass("tab-open");
			$(this).closest(".fixtab-tab-obj").find(".fixtab-list").removeClass("on");
			let onTab = $(this).closest(".fixtab-tab-obj").find("li.on"); //선택탭
			onTab = onTab.index() > 0 ? onTab.prev() : onTab;
			$(this).closest(".fixtab-tab-obj").find(".fixtab-list").stop().animate({scrollLeft:onTab.offset().left},200);
		}else{
			$(this).addClass("tab-open");
			$(this).closest(".fixtab-tab-obj").find(".fixtab-list").addClass("on");
		}
	});

	$("#"+fixArea+" .fixtab-list").find("li").off("click").on("click", function() {
		$("body").addClass("clickMove"); // 23.01.12 수정 body에 clickMove클래스 추가해서 해더 스크롤 이벤트 제약함 김승규

		$(".main-lnb-scroll").css("top",0);
		$(".move-fix").css("height","0");
		$(".move-fix-obj").css("height","0");
		$(".move-fix-obj").css("position","absolute");
		$(".move-head").css("position","static");

		let scrTop = $(window).scrollTop();
		let btn = $(this).closest(".fixtab-tab-obj").find(".btn-tab-drop");

		if(btn.hasClass("tab-open")){
			btn.removeClass("tab-open");
			$(this).closest(".fixtab-tab-obj").find(".fixtab-list").removeClass("on");
			let onTab = $(this).closest(".fixtab-tab-obj").find("li.on"); //선택탭
			onTab = onTab.index() > 0 ? onTab.prev() : onTab;
			$(this).closest(".fixtab-tab-obj").find(".fixtab-list").stop().animate({scrollLeft:onTab.offset().left},200);
		}

		if($("#"+fixArea).hasClass("no-fixed")){

		}else{
			$("html, body").stop().animate({scrollTop:$("#"+fixArea).offset().top - addY},100,function(){
				setTimeout(function(){
					$("body").removeClass("clickMove");
				},500);
			});
		}
	
		$("#"+fixArea+" .fixtab-list").find("li").removeClass("on");
		$("#"+fixArea+" .fixtab-list").find("li").eq($(this).index()).addClass("on");
		let onTab = $("#"+fixArea+" .fixtab-list").find("li.on"); //선택탭
		onTab = onTab.index() > 0 ? onTab.prev() : onTab;
		$("#"+fixArea+" .fixtab-list").stop().animate({scrollLeft:$("#"+fixArea+" .fixtab-list").scrollLeft() + onTab.offset().left}, 200);
		$("#" + fixArea + " .fixtab-cont").removeClass("on").hide();
		$("#" + fixArea + " .fixtab-cont").eq($(this).index()).addClass("on").show();
	});

	$(window).bind("scroll",function() {
		if($("#"+fixArea).hasClass("no-fixed")) return "no-fixed";

		let scrTop = $(window).scrollTop();
		topY = $(".top-fix").height() + fixTitHeight + fixLnbHeight;
		try{
			if($(window).scrollTop() > $("#"+fixArea+" .fixtab-tab").offset().top - topY && $(window).scrollTop() <= $("#"+fixArea).offset().top + $("#"+fixArea).height()  - topY){
				$("#"+fixArea+" .fixtab-tab-obj").css({"position":"fixed","top":topY}).addClass("on");
			}else{
				$("#"+fixArea+" .fixtab-tab-obj").css({"position":"static"}).removeClass("on");
			}
		}catch(e){}
	});
}
/*
$(function(){
	subFixTab("fixtab-best-1");
	subFixTab("fixtab-best-1", 1); 브랜드샵 상단 높이 다를때
});
*/

/* 고정 슬라이드 내비 */
function subFixNavi(fixArea){
	var fixTitHeight = $(".fix-tit").length == 0 ? 0 : $(".fix-tit").height(); /* 있으면 값, 없으면 0 */
	var fixLnbHeight = $(".main-lnb").length == 0 ? 0 : $(".main-lnb").height(); /* 있으면 값, 없으면 0 */
	var topY = $(".top-fix").height() + fixTitHeight + fixLnbHeight;
	var moreBtn = $("#"+fixArea+" .fixnavi-tab-obj").find(".btn-tab-drop");

	/*버튼 감추기 기능 (탭 display:none 때문에) 임시로 막음 230206 김승규
	if($("#"+fixArea+" .fixtab-list > ul").outerWidth() > $(window).width()){
		moreBtn.show();
	}else{
		moreBtn.hide();
	}
	*/

	moreBtn.off("click").on("click", function(){
		if($(this).hasClass("tab-open")){
			$(this).removeClass("tab-open");
			$(this).closest(".fixnavi-tab-obj").find(".fixtab-list").removeClass("on");
			let onTab = $(this).closest(".fixnavi-tab-obj").find("li.on"); //선택탭
			onTab = onTab.index() > 0 ? onTab.prev() : onTab;
			$(this).closest(".fixnavi-tab-obj").find(".fixtab-list").stop().animate({scrollLeft:onTab.offset().left},200);
		}else{
			$(this).addClass("tab-open");
			$(this).closest(".fixnavi-tab-obj").find(".fixtab-list").addClass("on");
		}
	});

	$("#"+fixArea+" .fixnavi-tab-obj").find("li").off("click").on("click",function() {
		$("body").addClass("clickMove");

		$(".main-lnb-scroll").css("top",0);
		$(".move-fix").css("height","0");
		$(".move-fix-obj").css("height","0");
		$(".move-fix-obj").css("position","absolute");
		$(".move-head").css("position","static");

		let scrTop = $(window).scrollTop();
		let btn = $(this).closest(".fixnavi-tab-obj").find(".btn-tab-drop");

		if(btn.hasClass("tab-open")){
			btn.removeClass("tab-open");
			$(this).closest(".fixnavi-tab-obj").find(".fixtab-list").removeClass("on");
			$(this).closest(".fixnavi-tab-obj").find(".fixtab-list").stop().animate({scrollLeft:$(this).closest(".fixnavi-tab-obj").find("li.on").offset().left},200);
		}

		$("html, body").stop().animate({scrollTop:$("#"+fixArea+" .fixnavi-cont").eq($(this).index()).offset().top - $("#"+fixArea+" .fixnavi-tab").height() - 40},100,function(){
			setTimeout(function(){
				$("body").removeClass("clickMove");
			},500);
		});
	});

	$(window).bind("scroll",function() {
		var scrTop = $(window).scrollTop();
		topY = $(".top-fix").height() + fixTitHeight + fixLnbHeight;
		try{
			if($(window).scrollTop() > $("#"+fixArea+" .fixnavi-tab").offset().top - topY && $(window).scrollTop() <= $("#"+fixArea).offset().top + $("#"+fixArea).height()  - topY){
				$("#"+fixArea+" .fixnavi-tab-obj").css({"position":"fixed","top":topY}).addClass("on");	
			}else{
				$("#"+fixArea+" .fixnavi-tab-obj").css({"position":"static"}).removeClass("on");
			}

			
			$("#"+fixArea+" .fixnavi-cont").each(function(n) {
				if($(window).scrollTop() >= $(this).offset().top - $("#"+fixArea+" .fixnavi-tab").height() - topY -5 && $(window).scrollTop() <= $(this).offset().top + $(this).outerHeight(true)  - $("#"+fixArea+" .fixnavi-tab").height() - topY -5){
					$("#"+fixArea+" .fixtab-list").find("li").eq(n).addClass("on");
					$("#"+fixArea+" .fixtab-list").find("li").eq(n).siblings().removeClass("on");
					let onTab = $("#"+fixArea+" .fixnavi-tab-obj").find("li.on"); //선택탭
					onTab = onTab.index() > 0 ? onTab.prev() : onTab;
					$("#"+fixArea+" .fixtab-list").stop().animate({scrollLeft:$("#"+fixArea+" .fixtab-list").scrollLeft() + onTab.offset().left}, 100);
				}
			});
		}catch(e){}
	});
}
/*
$(function(){
	subFixNavi("fixnavi-1");
});
*/



/* ---------------------------------------------------
헤드 탭 head tab
--------------------------------------------------- */
/* 컨텐츠 헤드 탭 */
function headTab(headTabArea){
	$("#"+headTabArea+" .headtab-list").find("li").off("click").on("click", function() {
		if ($(this).closest(".apt-type").length) {
			if ($(window).scrollTop() > 370) {
				$(window).scrollTop( $(".headtab-cont.on").offset().top - 120);
			}
		} else {
			$(window).scrollTop(0);
		}

		$("#"+headTabArea+" .headtab-list").find("li").removeClass("on");
		$("#"+headTabArea+" .headtab-list").find("li").eq($(this).index()).addClass("on");
		$("#"+headTabArea+" .headtab-list").stop().animate({scrollLeft:$("#"+headTabArea+" .headtab-list").scrollLeft() + $("#"+headTabArea+" .headtab-list").find("li").eq($(this).index() - ($(this).index() > 0 ? 1 : 0) ).position().left}, 300);
		$("#"+headTabArea+" .headtab-cont").removeClass("on").hide();
		$("#"+headTabArea+" .headtab-cont").eq($(this).index()).addClass("on").show();
	});
}
/*
$(function(){
	headTab("headtab-1");
});
*/



/* ---------------------------------------------------
기획전 고정 슬라이드 탭
--------------------------------------------------- */
function multiObjFix(wrapClass, titleClass, contsClass, fixArea){
	var topY = $(".top-fix").height();
	$("#"+fixArea+" ."+wrapClass).height($("#"+fixArea+" ."+wrapClass).height());
	$("#"+fixArea+" ."+titleClass).find("li").click(function() {
		$('html,body').scrollTop($("#"+fixArea+" ."+contsClass).eq($(this).index()).offset().top - $("#"+fixArea+" ."+wrapClass).height() - topY);
	});

	$(window).bind("scroll",function() {
		var scrTop = $(window).scrollTop();
		topY = $(".top-fix").height();
		try{
			if($(window).scrollTop() > $("#"+fixArea+" ."+wrapClass).offset().top - topY && $(window).scrollTop() <= $("#"+fixArea).offset().top + $("#"+fixArea).height()  - topY){
				$("#"+fixArea+" ."+titleClass).css({"position":"fixed","top":topY}).addClass("on");	
			}else{
				$("#"+fixArea+" ."+titleClass).css({"position":"static"}).removeClass("on");
			}

			$("#"+fixArea+" ."+contsClass).each(function(n) {
				if($(window).scrollTop() >= $(this).offset().top - $("#"+fixArea+" ."+wrapClass).height() - topY -5){
					$("#"+fixArea+" ."+titleClass).find("li").removeClass("on");
					$("#"+fixArea+" ."+titleClass).find("li").eq(n).addClass("on");
					$("#"+fixArea+" ."+titleClass).stop().animate({scrollLeft:$("#"+fixArea+" ."+titleClass).scrollLeft() + $("#"+fixArea+" ."+titleClass).find("li").eq(n - (n > 0 ? 1 : 0) ).position().left}, 300);
				}
			});
		}catch(e){}
	});
}
/*
$(function(){
	multiObjFix("fix-navi-act","fix-navi-scroll","fix-navi-conts", "fix-navi-1");
});
*/


function multiFixTab(wrapClass, titleClass, contsClass, fixArea, option){
	var topY = $(".top-fix").height();
	$("#"+fixArea+" ."+wrapClass).height($("#"+fixArea+" ."+wrapClass).height());
	$("#"+fixArea+" ."+titleClass).find("li").off("click").on("click", function() {
		$('html,body').scrollTop($("#"+fixArea).offset().top - topY);
		$("#"+fixArea+" ."+titleClass).find("li").removeClass("on");
		$("#"+fixArea+" ."+titleClass).find("li").eq($(this).index()).addClass("on");
		$("#"+fixArea+" ."+titleClass).stop().animate({scrollLeft:$("#"+fixArea+" ."+titleClass).scrollLeft() + $("#"+fixArea+" ."+titleClass).find("li").eq($(this).index() - ($(this).index() > 0 ? 1 : 0) ).position().left}, 300);

		if($("#"+fixArea+" ."+contsClass).length <= 1){
			// ajax 함수 호출부분
			ajaxAddTabConts(fixArea, contsClass, option);
		}else{
			$("#"+fixArea+" ."+contsClass).removeClass("on").hide();
			$("#"+fixArea+" ."+contsClass).eq($(this).index()).addClass("on").show();
		}
	});

	$(window).bind("scroll",function() {
		var scrTop = $(window).scrollTop();
		topY = $(".top-fix").height();
		try{
			if($(window).scrollTop() > $("#"+fixArea+" ."+wrapClass).offset().top - topY && $(window).scrollTop() <= $("#"+fixArea).offset().top + $("#"+fixArea).height()  - topY){
				$("#"+fixArea+" ."+titleClass).css({"position":"fixed","top":topY}).addClass("on");	
			}else{
				$("#"+fixArea+" ."+titleClass).css({"position":"static"}).removeClass("on");
			}
		}catch(e){}
	});

	// 무료배송 대체상품 레이어팝업
	$('.pop-prd-free .m-pop-cont').on("scroll",function() {
		var scrTop = $('.pop-prd-free .m-pop-cont').scrollTop();
		topY = $(".m-pop-tit").outerHeight();
		try{
			if(scrTop > $("#"+fixArea+" ."+wrapClass).offset().top - topY && scrTop <= $("#"+fixArea).offset().top + $("#"+fixArea).height()  - topY){
				$("#"+fixArea+" ."+titleClass).css({"position":"fixed","top":topY}).addClass("on");	
			}else{
				$("#"+fixArea+" ."+titleClass).css({"position":"static"}).removeClass("on");
			}
		}catch(e){}
	});
}

/*
$(function(){
	multiFixTab("fix-tab-act","fix-tab-scroll","fix-tab-conts", "fix-tab-1","");
});
*/








/* ---------------------------------------------------
기획전 상단 고정 탭기능 함수
--------------------------------------------------- */
function multiObjFix(wrapClass, titleClass, contsClass, fixArea){
	var topY = $(".top-fix").height();
	$("#"+fixArea+" ."+wrapClass).height($("#"+fixArea+" ."+wrapClass).height());
	$("#"+fixArea+" ."+titleClass).find("li").click(function() {
		$('html,body').scrollTop($("#"+fixArea+" ."+contsClass).eq($(this).index()).offset().top - $("#"+fixArea+" ."+wrapClass).height() - topY);
	});

	$(window).bind("scroll",function() {
		var scrTop = $(window).scrollTop();
		topY = $(".top-fix").height();
		try{
			if($(window).scrollTop() > $("#"+fixArea+" ."+wrapClass).offset().top - topY && $(window).scrollTop() <= $("#"+fixArea).offset().top + $("#"+fixArea).height()  - topY){
				$("#"+fixArea+" ."+titleClass).css({"position":"fixed","top":topY}).addClass("on");	
			}else{
				$("#"+fixArea+" ."+titleClass).css({"position":"static"}).removeClass("on");
			}

			$("#"+fixArea+" ."+contsClass).each(function(n) {
				if($(window).scrollTop() >= $(this).offset().top - $("#"+fixArea+" ."+wrapClass).height() - topY -5){
					$("#"+fixArea+" ."+titleClass).find("li").removeClass("on");
					$("#"+fixArea+" ."+titleClass).find("li").eq(n).addClass("on");
					$("#"+fixArea+" ."+titleClass).stop().animate({scrollLeft:$("#"+fixArea+" ."+titleClass).scrollLeft() + $("#"+fixArea+" ."+titleClass).find("li").eq(n - (n > 0 ? 1 : 0) ).position().left}, 300);
				}
			});
		}catch(e){}
	});
}
/*
$(function(){
	multiObjFix("fix-navi-act","fix-navi-scroll","fix-navi-conts", "fix-navi-1");
});
*/


function multiFixTab(wrapClass, titleClass, contsClass, fixArea, option){
	var topY = $(".top-fix").height();
	$("#"+fixArea+" ."+wrapClass).height($("#"+fixArea+" ."+wrapClass).height());
	$("#"+fixArea+" ."+titleClass).find("li").off("click").on("click", function() {
		$('html,body').scrollTop($("#"+fixArea).offset().top - topY);
		$("#"+fixArea+" ."+titleClass).find("li").removeClass("on");
		$("#"+fixArea+" ."+titleClass).find("li").eq($(this).index()).addClass("on");
		$("#"+fixArea+" ."+titleClass).stop().animate({scrollLeft:$("#"+fixArea+" ."+titleClass).scrollLeft() + $("#"+fixArea+" ."+titleClass).find("li").eq($(this).index() - ($(this).index() > 0 ? 1 : 0) ).position().left}, 300);

		if($("#"+fixArea+" ."+contsClass).length <= 1){
			// ajax 함수 호출부분
			ajaxAddTabConts(fixArea, contsClass, option);
		}else{
			$("#"+fixArea+" ."+contsClass).removeClass("on").hide();
			$("#"+fixArea+" ."+contsClass).eq($(this).index()).addClass("on").show();
		}
	});

	$(window).bind("scroll",function() {
		var scrTop = $(window).scrollTop();
		topY = $(".top-fix").height();
		try{
			if($(window).scrollTop() > $("#"+fixArea+" ."+wrapClass).offset().top - topY && $(window).scrollTop() <= $("#"+fixArea).offset().top + $("#"+fixArea).height()  - topY){
				$("#"+fixArea+" ."+titleClass).css({"position":"fixed","top":topY}).addClass("on");	
			}else{
				$("#"+fixArea+" ."+titleClass).css({"position":"static"}).removeClass("on");
			}
		}catch(e){}
	});

	// 무료배송 대체상품 레이어팝업
	$('.pop-prd-free .m-pop-cont').on("scroll",function() {
		var scrTop = $('.pop-prd-free .m-pop-cont').scrollTop();
		topY = $(".m-pop-tit").outerHeight();
		try{
			if(scrTop > $("#"+fixArea+" ."+wrapClass).offset().top - topY && scrTop <= $("#"+fixArea).offset().top + $("#"+fixArea).height()  - topY){
				$("#"+fixArea+" ."+titleClass).css({"position":"fixed","top":topY}).addClass("on");	
			}else{
				$("#"+fixArea+" ."+titleClass).css({"position":"static"}).removeClass("on");
			}
		}catch(e){}
	});
}

/*
$(function(){
	multiFixTab("fix-tab-act","fix-tab-scroll","fix-tab-conts", "fix-tab-1","");
});
*/


function ajaxAddTabConts(fixArea, contsClass, option){
	//ajax 관련 소스
}








/* ---------------------------------------------------
단일 객체 상단 고정
--------------------------------------------------- */
/* 사용성 없을 때 삭제될 소스 - 신규 소스 아래 기술 */
function objFixed(){
	$(".fix-sub").height($(".fix-sub").height());
	var fixSub2Height = null;
	if ($(".fix-sub2").length > 0){
		fixSub2Height = $(".fix-sub2").height();
	}
	$(".fix-sub2").height(fixSub2Height);
	$(".fix-sub3").height($(".fix-sub3").height());

	$(window).bind("scroll",function() {
		re20_scrTop = $(window).scrollTop();
		try{
			if($(window).scrollTop() > $(".fix-sub").offset().top - $(".top-fix").height()){
				$(".fix-sub-cont").css({"position":"fixed","top":$(".top-fix").height()}).addClass("on");
				
			}else{
				$(".fix-sub-cont").css({"position":"static"}).removeClass("on");
			}
		}catch(e){}

		try{
			if(re20_scrTop > re20_posi){
				// down
				if($(window).scrollTop() > $(".fix-sub2").offset().top - ($(".top-fix").height() + $(".fix-sub").height()) ){
					$(".fix-sub-cont2").css({"position":"static"});
				}
			}else{
				// up
				if($(window).scrollTop() > $(".fix-sub2").offset().top - ($(".top-fix").height() + $(".fix-sub").height()) ){
					$(".fix-sub-cont2").css({"position":"fixed","top":$(".top-fix").height() + $(".fix-sub").height()})
				}else{
					$(".fix-sub-cont2").css({"position":"static"});
				}
			}
		}catch(e){}
		try{
			if(re20_scrTop > re20_posi){
				// down
				if($(window).scrollTop() > $(".fix-sub3").offset().top - ($(".top-fix").height() + $(".fix-sub").height() + fixSub2Height)){
					$(".fix-sub-cont3").css({"position":"static"});
				}
			}else{
				// up
				if($(window).scrollTop() > $(".fix-sub3").offset().top - ($(".top-fix").height() + $(".fix-sub").height() + fixSub2Height) ){
					$(".fix-sub-cont3").css({"position":"fixed","top":$(".top-fix").height() + $(".fix-sub").height() + fixSub2Height})
				}else{
					$(".fix-sub-cont3").css({"position":"static"});
				}
			}
		}catch(e){}
		re20_posi = re20_scrTop;
	});
}
objFixed();
/* // 사용성 없을 때 삭제될 소스 - 신규 소스 아래 기술 */










/* ---------------------------------------------------
최하단 스크롤시 하단 내용 추가
--------------------------------------------------- */
function scrollBottomAdd(){
	var isBottom = $(".footer").height() ? $(".footer").outerHeight():0;
	var addAct = true;
	$(window).bind("scroll",function() {
		try{
			if($(window).scrollTop() + $(window).height() + isBottom >= $("body").height() - 150 && addAct){
				//$("#adds").append("<div style='height:300px;'>aaa</div>");
			}
		}catch(e){}
	});
}

/* ---------------------------------------------------
이미지 OnError
--------------------------------------------------- */
function onErrorImg(obj) {
	//$(obj).addClass("no-img");
	$(obj).attr("src", "/resources/mo/images/common/no-img.png");
}

function onErrorImg2(obj) {
	$(obj).addClass("no-img");
	$(obj).attr("src", "/resources/images/common/noimage/04_128x128.jpg");
}


/* ---------------------------------------------------
검색 아코디언 스크립트
--------------------------------------------------- */

function searchAccordion(dtClass){
	$("."+dtClass).off("click").on('click', function(e) {
		if($(this).hasClass("on")){
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}
		$(this).next().stop().slideToggle();
		e.stopImmediatePropagation();
	});
}



/* ---------------------------------------------------
검색 필터 아코디언 스크립트
--------------------------------------------------- */

function filterAccordion(){
	$(".item label").off("click").on('click', function(e) {
		var _this			= $(this);
		var _siblings		= _this.closest("li").siblings();
		var _slideTarget	= _siblings.find(".ck-depth");
		var _uncheckTargets	= _siblings.find("input:radio");
		
		_slideTarget.removeClass("on");
		_slideTarget.slideUp();
		_uncheckTargets.prop('checked', false);

		if($(this).closest(".item").hasClass("on")){
			//$(this).closest(".item").removeClass("on");
		}else{
			//$(this).closest(".item").addClass("on");
			//$(this).closest(".item").next().slideDown();
		}
		
		e.stopImmediatePropagation();
	});
}


/* ---------------------------------------------------
일반 아코디언 스크립트
--------------------------------------------------- */

function wholeAccordion(wrapClass, dtClass, speed){

	// 주의 해당 객체 click 이벤트 모두 해체 및 초기화
	$("."+wrapClass).find("."+dtClass).unbind('click'); 
	$("."+wrapClass).find("."+dtClass).removeClass("on");
	$("."+wrapClass).find("."+dtClass).next().hide();

	$("."+wrapClass).each(function() {
		var fView = $(this).attr("first-view") - 1;
		$(this).find("."+dtClass).eq(fView).addClass("on");
		$(this).find("."+dtClass).eq(fView).next().show();
	});
	
	$("."+wrapClass).find("."+dtClass).click(function() {
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			$(this).next().stop().slideUp(speed);
		}else{
			$(this).siblings("."+dtClass).removeClass("on");
			$(this).siblings("."+dtClass).next().stop().slideUp(speed);
			$(this).addClass("on");
			$(this).next().stop().slideDown(speed);
		}
	});
}

/* ---------------------------------------------------
범위 슬라이더 스크립트
--------------------------------------------------- */

function makeRangeSlider ( el ){

	var $wrap = $( el ),
		$limit = $wrap.find('.search-range-limit'),
		$limit_min = $wrap.find('.search-range-limit--min'),
		$limit_max = $wrap.find('.search-range-limit--max'),
		$input_min = $wrap.find('.search-range__input-min'),
		$input_max = $wrap.find('.search-range__input-max'),
		$text_min = $wrap.find('.search-range__text--min'),
		$text_max = $wrap.find('.search-range__text--max'),
		$slider = $wrap.find('.search-range__slider'),

		limit_min = Number( $limit_min.val() ),
		limit_max = Number( $limit_max.val() );

	var step = $slider.data('step'),
		unit = $slider.data('unit');

	var priceRangeSlider = $slider.get(0);
	
	noUiSlider.create( priceRangeSlider, {
		start: [Number( $limit_min.val() ), Number( $limit_max.val() )],
		connect: true,
		step: step,
		range: {
			'min': Number( $limit_min.val() ),
			'max': Number( $limit_max.val() )
		},
		format: {
			to: function ( value ) {
				return parseFloat( value ).toFixed(0);
			},
			from: function ( value ) {
				return (value+'').replace(/,/gi,'').replace('원','');
			}
		}
	});

	$text_min.text( limit_min.toLocaleString() + unit);
	$text_max.text( limit_max.toLocaleString() + unit);

	priceRangeSlider.noUiSlider.on('update', function( values  ) {
		var min_t = ( isNaN(values[0]) ? 0 : values[0]);
		var max_t = ( isNaN(values[1]) ? 0 : values[1]);
		$input_min.val(min_t);
		$input_max.val(max_t);
		
		/* [박동진] 2020개편 슬라이더를 변경 했을 때 min, max문자도 변경 되도록 변경 */
		$text_min.text( min_t + unit );
		$text_max.text( max_t + unit );
	});

	//인풋폼 변화 체크
	$input_min.on('change',function(e){
		priceRangeSlider.noUiSlider.set( [ $input_min.val(), $input_max.val() ] );
	});
	$input_max.on('change',function(e){
		priceRangeSlider.noUiSlider.set( [ $input_min.val(), $input_max.val() ] );
	});
	
	// Limit 값 출력
	$limit.on('change',function(){
		limit_min = Number( $limit_min.val() );
		limit_max = Number( $limit_max.val() );

		$text_min.text( limit_min.toLocaleString() + unit);
		$text_max.text( limit_max.toLocaleString() + unit);
		priceRangeSlider.noUiSlider.updateOptions({
			range: {
				min: limit_min,
				max: limit_max
			},
			start: [ limit_min, limit_max ]
		});
	});
	
	// [박형준] 최소값 최대값 같을때 disabled 처리 - 장희동( ui.libs.js : 'range' 'min' and 'max' cannot be equal. 에러 주석처리 )
	if( $limit_min.val() == $limit_max.val() ){
		priceRangeSlider.setAttribute('disabled', true);
	}
	
	// [박동진] 객체 생성 후 슬라이드 객체 리턴하도록 처리 - 전소정 2020-09-23
	return priceRangeSlider;
}

/* ---------------------------------------------------
컴포넌트 이벤트 Binding 
--------------------------------------------------- */
var isComponentEventBinding = false;
function componentEventBinding() {
	if (typeof singleFixClick === "function") {
		singleFixClick("fix-navi","fix-navi-scroll","fix-conts");
	}
	
	$(".comp-sld").hsmSwipe({
		speed : 350
	});
	$(".ui-component .timer").each(function(i){
		var timeRegExp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])\s([1-9]|[01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
		if ($(this).attr("id") != "" && $(this).attr("id") != undefined && timeRegExp.test($(this).data("timerEndTime"))) {
			dispTimerFn("#" + $(this).attr("id"), $(this).data("timerEndTime"));
		} else {
			$(this).find(".timer-end").show();
		}
	});
	/* timer class가 퍼블에서 제거됨 */
	$(".ui-component .timer2").each(function(i){
		var timeRegExp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])\s([1-9]|[01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
		if ($(this).attr("id") != "" && $(this).attr("id") != undefined && timeRegExp.test($(this).data("timerEndTime"))) {
			dispTimerFn("#" + $(this).attr("id"), $(this).data("timerEndTime"));
		} else {
			$(this).find(".timer-end").show();
		}
	});
	
	/* 메인 카테고리별 인기상품 컴포넌트 더보기 이벤트 (Best Pick) */
	if (!isComponentEventBinding) {
		isComponentEventBinding = true;
		$(window).bind("scroll",function() {
			try{
				if ($(".main-fix-navi").length > 0) {
					//if (typeof getJsonFromUrl() === "object" && getJsonFromUrl().module.toUpperCase() == "HOME") {
						/**java module=HOME으로 들어오고 js => 소문자 home이여서 데이터가 나오지 않음 맞춰주기 위해 수정 20221122jkm*/
						$(".main-fix-navi .fixnavi-cont").each(function(i){
							if ($(window).scrollTop() + 800 > $(this).offset().top) {
								$(this).find("li").each(function(e){
									if ($(this).data("display") == "N") {
										$(this).data("display", "Y");
										
										var $li = $(this);
										var $gds_template = $("#templateGds").clone();

										$gds_template.removeAttr("id");
										$gds_template.show();
										$gds_template.find(".prd-link").attr("href", $li.data("href"));
										$gds_template.find(".prd-info-link").attr("href", $li.data("href"));

		                                $gds_template.find(".thumb img").removeClass();
		                                $gds_template.find(".thumb img").attr("src", "");
		                                $gds_template.find(".thumb img").attr("data-lazy", $li.data("img"));
		                                $gds_template.find(".thumb img").addClass("js-lazy");	// 2023.02.28 M.Park [ 복사된 이미지가 보였다 사라지는 현상. ]
		
										$gds_template.find(".brand-name").text($li.data("brandNm"));
										$gds_template.find(".prd-name-txt").text($li.data("gdsNm"));
// 슈퍼플래그 이미지 정보 추가 2022.09.02 M.Park ( MALLDVLPRJ-1895 )
										if ( $li.data("superflag") ) {
											$gds_template.find(".superflag img").attr("src", $li.data("superflag"));
											$gds_template.find(".superflag").show();
										}
										$gds_template.find(".btn-bookmark").attr("gdsNo",$li.data("gds-no")).attr("onclick","myWishList(this,"+$li.data("gds-no")+")");
										// 스크랩 된 상태에서 clone 했을대, 복사된 객체도 스크랩이 되어있음. 2023.02.10 M.Park
			                            if($(this).data("bookmark-flag") == "Y") {
			                                $gds_template.find(".btn-bookmark").addClass("on");
			                            } else {
			                            	$gds_template.find(".btn-bookmark").removeClass("on");
			                            }

										$unitNmStr = ( $li.data("unitNm") && $li.data("unitNm") != '' ) ? '<span class="unit">' + $li.data("unitNm") + '</span>' : "" ;
										$appUnitNmStr = ( $li.data("appUnitNm") && $li.data("appUnitNm") != '' ) ? '<span class="unit">' + $li.data("appUnitNm") + '</span>' : "" ;
										if ($(this).data("percentage") != "0") {
											$gds_template.find(".prd-prc-cur").html('<span class="num">' + $li.data("prcCur") + '</span>' + $unitNmStr);
											$gds_template.find(".prd-prc-market").html('<span class="num">' + $li.data("prcMarket") + '</span>');
											if($li.data("unitNm") && $li.data("unitNm") != '') {
												$gds_template.find(".prd-prc-market").append($li.data('marketUnitNm'));
											}
											$gds_template.find(".prd-rate").html($li.data("percentage") + '<span class="unit">%</span>');
										} else {
											$gds_template.find(".prd-prc-cur").html('<span class="num">' + $li.data("prcCur") + '</span>' + $unitNmStr);
											$gds_template.find(".prd-prc-market").hide();
											$gds_template.find(".prd-rate").hide();
										}
										
										if ($(this).data("appPercentage") != "0") {
											$gds_template.find(".app-prc .prd-prc-cur").html('<span class="num">' + $li.data("appPrcCur") + '</span>' + $appUnitNmStr);
											$gds_template.find(".app-prc .prd-prc-market").html('<span class="num">' + $li.data("appPrcMarket") + '</span>');
											if($li.data("appUnitNm") && $li.data("appUnitNm") != '') {
												$gds_template.find(".app-prc .prd-prc-market").append($li.data('appMarketUnitNm'));
											}
											$gds_template.find(".app-prc .prd-rate").html($li.data("appPercentage") + '<span class="unit">%</span>');
										} else {
											$gds_template.find(".app-prc .prd-prc-cur").html('<span class="num">' + $li.data("appPrcCur") + '</span>' + $appUnitNmStr);
											$gds_template.find(".app-prc .prd-prc-market").hide();
											$gds_template.find(".app-prc .prd-rate").hide();
										}
										
										$gds_template.find(".prd-opt-score").text($li.data("evalScore"));
										$gds_template.find(".prd-opt-reply").text($li.data("evalCnt"));
										
										if($li.data("tag") === "") {
											$gds_template.find(".prd-tag").remove();
										} else {
											$gds_template.find(".prd-tag").html($li.data("tag"));
										}
										
										if(($li.data("radiusYn") || "Y") == "N") {
											$gds_template.find(".prd-img").addClass("prd-img-on"); 
										}
										
										$li.append($gds_template);
									}
								});
								$(this).find(".more-btn").show();
							}
						});
					//}
				}
				
				if ($(".flick-wrap").length > 0) {
					if (typeof getJsonFromUrl() === "object" && getJsonFromUrl().module == "best") {
						var bottomHeight = $(".mall-footer").height() ? $(".mall-footer").outerHeight():0;
						if($(window).scrollTop() + $(window).height() + bottomHeight >= $("body").height()){
							var moreIndex = -1, rowCnt = 20;
							$("div[data-module=best]").find(".fixtab-list li").each(function(i){
								if ($(this).hasClass("on")) {
									moreIndex = i;
								}
							});
							
							var $lis = $("div[data-module=best]").find(".fixtab-cont").eq(moreIndex);
							if ($lis.data("loadEnd") != "Y" && moreIndex > -1) {
								$lis.find("li").each(function(e){
									if ($(this).data("display") != "Y" && rowCnt > 0) {
										$(this).show();
										$(this).attr("data-display", "Y");
										rowCnt--;
										
										var $li = $(this);
										var $gds_template = $("#templateGds").clone();
										$gds_template.removeAttr("id");
										$gds_template.show();
										$gds_template.find(".prd-link").attr("href", $li.data("href"));
										$gds_template.find(".prd-info-link").attr("href", $li.data("href"));

				                        $gds_template.find(".thumb img").removeClass();
				                        $gds_template.find(".thumb img").attr("src", "");
				                        $gds_template.find(".thumb img").attr("data-lazy", $li.data("img"));
				                        $gds_template.find(".thumb img").addClass("js-lazy");	// 2023.02.28 M.Park [ 복사된 이미지가 보였다 사라지는 현상. ]
				
										$gds_template.find(".brand-name").text($li.data("brandNm"));
										$gds_template.find(".prd-name-txt").text($li.data("gdsNm"));
										$unitNmStr = ( $li.data("unitNm") && $li.data("unitNm") != '' ) ? '<span class="unit">' + $li.data("unitNm") + '</span>' : "" ;
										$appUnitNmStr = ( $li.data("appUnitNm") && $li.data("appUnitNm") != '' ) ? '<span class="unit">' + $li.data("appUnitNm") + '</span>' : "" ;
										if ($(this).data("percentage") != "0") {
											$gds_template.find(".prd-prc-cur").html('<span class="num">' + $li.data("prcCur") + '</span>' + $unitNmStr);
											$gds_template.find(".prd-prc-market").html('<span class="num">' + $li.data("prcMarket") + '</span>');
											if($li.data("unitNm") && $li.data("unitNm") != '') {
												$gds_template.find(".prd-prc-market").append($li.data('marketUnitNm'));
											}
											$gds_template.find(".prd-rate").html($li.data("percentage") + '<span class="unit">%</span>');
										} else {
											$gds_template.find(".prd-prc-cur").html('<span class="num">' + $li.data("prcCur") + '</span>' + $unitNmStr);
											$gds_template.find(".prd-prc-market").hide();
											$gds_template.find(".prd-rate").hide();
										}
										
										if ($(this).data("appPercentage") != "0") {
											$gds_template.find(".app-prc .prd-prc-cur").html('<span class="num">' + $li.data("appPrcCur") + '</span>' + $appUnitNmStr);
											$gds_template.find(".app-prc .prd-prc-market").html('<span class="num">' + $li.data("appPrcMarket") + '</span>');
											if($li.data("appUnitNm") && $li.data("appUnitNm") != '') {
												$gds_template.find(".app-prc .prd-prc-market").append($li.data('appMarketUnitNm'));
											}
											$gds_template.find(".app-prc .prd-rate").html($li.data("appPercentage") + '<span class="unit">%</span>');
										} else {
											$gds_template.find(".app-prc .prd-prc-cur").html('<span class="num">' + $li.data("appPrcCur") + '</span>' + $appUnitNmStr);
											$gds_template.find(".app-prc .prd-prc-market").hide();
											$gds_template.find(".app-prc .prd-rate").hide();
										}
										
										$gds_template.find(".prd-opt-score").text($li.data("evalScore"));
										$gds_template.find(".prd-opt-reply").text($li.data("evalCnt"));
										
										if($li.data("tag") === "") {
											$gds_template.find(".prd-tag").remove();
										} else {
											$gds_template.find(".prd-tag").html($li.data("tag"));
										}
										
										if(($li.data("radiusYn") || "Y") == "N") {
											$gds_template.find(".prd-img").addClass("prd-img-on"); 
										}
										
										$li.append($gds_template);
									}
								});
								
								var x = 0;
								$lis.find("li").each(function(e){
									if ($(this).data("display") == undefined) {
										x++;
									}
								});
								if (x == 0){
									$lis.attr("data-load-end", "Y");
								}
							}
						}
					}
				}
			}catch(e){}
		});
	}
	
	$(".double-touch").on("touchstart", function(e) {e.stopImmediatePropagation();});$(".double-touch").on("touchmove", function(e) {e.stopImmediatePropagation();});$(".double-touch").on("touchend", function(e) {e.stopImmediatePropagation();});

	$(".carousel-scroll").carouselLeft();
}

/* ---------------------------------------------------
상품 별점 주기
--------------------------------------------------- */

// ;(function($){
// 	$.fn.starScore = function(){
// 		return this.each(function() {
// 			$.fn.extend(this, starScore);
// 			this.init();
// 		});
// 	};

// 	var starScore = {
// 		init : function(){
// 			var _this = this;
// 			this.posiLeft = $(this).offset().left;
// 			this.setArea = $(this).find(".star-area");
// 			this.starPoint = $(this).find(".star-pointer");
// 			this.getPoint = $(this).find(".get-point");
// 			this.startX = 0;
// 			this.moveX = 0;

// 			this.setArea.on("touchstart", function(e) {
// 				if(e.type == "touchstart" && e.originalEvent.touches.length <= 1) {
// 					_this.startX = 0;
// 					_this.moveX = 0;
// 					_this.startX = e.originalEvent.touches[0].pageX;
// 				}
// 			});

// 			this.setArea.on("touchmove", function(e) {
// 				if(e.type == "touchmove" && e.originalEvent.touches.length <= 1){
// 					_this.moveX = e.originalEvent.touches[0].pageX - _this.startX;
// 					_this.starPoint.css("width", _this.startX + _this.moveX - _this.posiLeft);
// 				}
// 			});

// 			this.setArea.on("touchend", function(e) {
// 				var pointSet = _this.startX + _this.moveX - _this.posiLeft;
// 				if(pointSet > 0 && pointSet < 36){
// 					_this.starPoint.css("width", 36);
// 					_this.getPoint.val(2);
// 				}
				
// 				if(pointSet >= 36 && pointSet < 72){
// 					_this.starPoint.css("width", 72);
// 					_this.getPoint.val(4);
// 				}
				
// 				if( pointSet >= 72 && pointSet < 108){
// 					_this.starPoint.css("width", 108);
// 					_this.getPoint.val(6);
// 				}
				
// 				if(pointSet >= 108 && pointSet < 144){
// 					_this.starPoint.css("width", 144);
// 					_this.getPoint.val(8);
// 				}

// 				if(pointSet >= 144 && pointSet <= 170){
// 					_this.starPoint.css("width", 170);
// 					_this.getPoint.val(10);
// 				}
// 			});
			
// 		}
// 	};
// })(jQuery);

;(function($){
	$.fn.starScore = function(){
		return this.each(function() {
			$.fn.extend(this, starScore);
			this.init();
		});
	};

	var starScore = {
		init : function(){
			var _this = this;
			this.posiLeft = $(this).offset().left;
			this.setArea = $(this).find(".star-area");
			this.starPoint = $(this).find(".star-pointer");
			this.getPoint = $(this).find(".get-point");
			this.startX = 0;
			this.moveX = 0;

			this.setArea.on("touchstart", function(e) {
				if(e.type == "touchstart" && e.originalEvent.touches.length <= 1) {
					_this.startX = 0;
					_this.moveX = 0;
					_this.startX = e.originalEvent.touches[0].pageX;
				}
			});

			this.setArea.on("touchmove", function(e) {
				if(e.type == "touchmove" && e.originalEvent.touches.length <= 1){
					_this.moveX = e.originalEvent.touches[0].pageX - _this.startX;
					_this.starPoint.css("width", _this.startX + _this.moveX - _this.posiLeft);
				}
			});

			this.setArea.on("touchend", function(e) {
				var pointSet = _this.startX + _this.moveX - _this.posiLeft;
				if(pointSet < 47){
					_this.starPoint.css("width", 0);
					_this.getPoint.val(0);
				}
				
				// 별점 시스템 10점 > 5점화 [2021. 08. 27.][김동진][MALLDVLPRJ-1358]
				if(pointSet > 0 && pointSet < 30){
					_this.starPoint.css("width", 30);
					_this.getPoint.val(1);
				}
				
				if(pointSet >= 30 && pointSet < 62){
					_this.starPoint.css("width", 62);
					_this.getPoint.val(2);
				}
				
				if( pointSet >= 62 && pointSet < 94){
					_this.starPoint.css("width", 94);
					_this.getPoint.val(3);
				}
				
				if(pointSet >= 94 && pointSet < 126){
					_this.starPoint.css("width", 126);
					_this.getPoint.val(4);
				}

				if(pointSet >= 126 && pointSet <= 160){
					_this.starPoint.css("width", 160);
					_this.getPoint.val(5);
				}
			});
		}
	};
})(jQuery);

/* ---------------------------------------------------
ScrollEnd Event높이 추가 전역변수
--------------------------------------------------- */
var addBottomHeight = 150;


/* ---------------------------------------------------
셀렉트된 레이어 on 추가 함수
--------------------------------------------------- */
function selectOnAct(){
	$(".buy-select-area").children().each(function() {
		$(this).off("click").on("click", function() {
			$(this).siblings().removeClass("on");
			$(this).addClass("on");
		});
	});
}

/* ---------------------------------------------------
장바구니 담기 알림
--------------------------------------------------- */
function toastCart(){
	var html = '<div class="toast-cart"><div class="toast-cart-obj">장바구니에 담겼습니다</div></div>';
	$('body').append(html);
	$('.toast-cart').addClass('on');
	setTimeout(function(){
		$('.toast-cart').removeClass('on');
		setTimeout(function(){
			$('.toast-cart').remove();
		}, 1000);
	}, 1000);
}


/* ---------------------------------------------------
Safari 브라우저에서 keypad 활성화 후 경고창 띄울 때 사용 
--------------------------------------------------- */
function delayAlert(msg){
	setTimeout(function(){
		popupAlert(msg);
	}, 1);
}

//고정 메뉴 클릭시 가로 스크롤링
function subFixClick(wrapClass, titleClass, contsClass, forceYn){
	var _forceYn = forceYn||"N";
	
	if(_forceYn == "Y") {
		$(".center-on ."+wrapClass).addClass("fix-on");
	} else {
		if($(".center-on ."+wrapClass).hasClass("fix-on")){
			return false;
		}else{
			$(".center-on ."+wrapClass).addClass("fix-on");
		}
	}

	$(".center-on .main-fix-navi ."+titleClass + " .fix-sub-scrl").find("li").off("click").on("click", function() {
		$(".btn-navi-drop.btn-navi-drop-close").trigger('click'); //11.15 닫기 기능 추가 수정 
		if(preOrder >= $(this).index()) {
			if($(".main-lnb").length>0){
				addY = $(".main-lnb").height();
			}else{
				addY = 0;
			}
		}else{
			addY = 0;
		}

		$('html,body').scrollTop($(".center-on ."+contsClass).eq($(this).index()).offset().top - addY - topY);
		preOrder = $(this).index();
	});

	$(".center-on .main-fix-tab ."+titleClass + " .fix-sub-scrl").find("li").off("click").on("click", function() {
		if($(".main-lnb").length>0){
			addY = $(".main-lnb").height();
		}else{
			addY = 0;
		}
		// $('html,body').scrollTop($(".center-on .main-fix-tab .fix-sub-navi").offset().top - addY - topY);
		$(".center-on .main-fix-tab ."+contsClass).hide();
		$(".center-on .main-fix-tab ."+contsClass).eq($(this).index()).show();
		$(".center-on .main-fix-tab ."+titleClass + " .fix-sub-scrl").find("li").removeClass("on");
		$(".center-on .main-fix-tab ."+titleClass + " .fix-sub-scrl").find("li").eq($(this).index()).addClass("on");
		$(".center-on .main-fix-tab ."+titleClass + " .fix-sub-scrl").stop().animate({scrollLeft:$(".center-on .main-fix-tab ."+titleClass + " .fix-sub-scrl").scrollLeft() + $(".center-on .main-fix-tab ."+titleClass + " .fix-sub-scrl").find("li").eq($(this).index() - ($(this).index() > 0 ? 1 : 0) ).position().left}, 300);
		// 탭 이동시 스크롤 초기화
		$(window).scrollTop(initScrollTop);
	});
}

// 고정 메뉴 상단 고정
function subFixedNavi(wrapClass, titleClass, contsClass){	
	topY = $(".top-fix").height() + $(".main-lnb").height();

	$(window).bind("scroll",function() {
		re20_scrTop = $(window).scrollTop();
		topY = $(".top-fix").height() + $(".main-lnb").height() ;
		try{
			if($(window).scrollTop() > $(".center-on ."+wrapClass).offset().top - topY && $(window).scrollTop() <= $(".center-on .fix-wrap").offset().top + $(".center-on .fix-wrap").height()  - topY){
				if(!$(".center-on ."+titleClass).hasClass("on")){
					$(".center-on ."+titleClass).css({"position":"fixed","top":$(".main-lnb").height()}).addClass("on");
					//$(".fix-sub-navi .btn-navi-drop").css("top", $(".main-lnb").height() + 8);
				}
				if(re20_scrTop > re20_posi) { 
					if($(window).scrollTop() >  $(".center-on ."+wrapClass).offset().top){
						$(".main-lnb-scroll").addClass("is-hide");
						$(".center-on ."+titleClass).css({"top":$(".top-fix").height()});
						//$(".fix-sub-navi .btn-navi-drop").css("top", "8px");
					}
					
					addY = 0;
				} else {
					//UP
					$(".main-lnb-scroll").removeClass("is-hide");
					$(".center-on ."+titleClass).css({"top":$(".top-fix").height() + $(".main-lnb").height()});
					addY = $(".main-lnb").height();
					//$(".fix-sub-navi .btn-navi-drop").css("top", "60px");
				}
			}else{
				$(".center-on ."+titleClass).css({"position":"static"}).removeClass("on");
				$(".main-lnb-scroll").removeClass("is-hide");
					//$(".fix-sub-navi .btn-navi-drop").css("top", "");
			}

			$(".center-on .main-fix-navi ."+contsClass).each(function(n) {
				if($(window).scrollTop() >= $(this).offset().top - addY - topY - 5){
					$(".center-on .main-fix-navi  ."+titleClass + " .fix-sub-scrl").find("li").removeClass("on");
					$(".center-on .main-fix-navi  ."+titleClass + " .fix-sub-scrl").find("li").eq(n).addClass("on");
					$(".center-on .main-fix-navi  ."+titleClass + " .fix-sub-scrl").stop().animate({scrollLeft:$(".center-on .main-fix-navi  ."+titleClass + " .fix-sub-scrl").scrollLeft() + $(".center-on .main-fix-navi  ."+titleClass + " .fix-sub-scrl").find("li").eq(n - (n > 0 ? 1 : 0) ).position().left}, 300);
					preOrder = n;
				}
			});
		}catch(e){}
		re20_posi = re20_scrTop;
	});
}



/* ------------------------ 기존툴팁 --------------------------- */

/* 툴팁팝업 */
$(function () {
    $(".point-tooltip").click(function(){
        $(this).next().toggleClass("show")
    });
    $(".tooltip-pop .m-pop-close").click(function(){
        $(this).parents(".tooltip-pop").removeClass("show")
    });
});

// 2020-10-20 개별로 사용하던 내맴배송 툴팁 팝업 공통으로 사용
// 내맴배송 툴팁 팝업
function tooltipEvent(){
	$('.tooltip-pop').toggleClass("show");
	$(".tooltip-pop .m-pop-close").click(function(){
		$(this).parents(".tooltip-pop").removeClass("show");
	});
}

/* ------------------------ // 기존툴팁 --------------------------- */




// 2020-10-20 소팅바 스크롤다운 케이스 수정
// 내맘배송 소팅바 고정
var scrollTop = $(window).scrollTop();
var lastScrollTop = 0;

/* 검색 화면 관련 변수 */
var sortFixCont, sortFixSubCont, fixSubH;

/*
	# fixSubH 변경값 적용
	 - 필터를 선택 하거나 전부 해제 했을 경우에는 fixSubH 값이 달라져야함
*/
function re20SearchFixedCalc(){
	fixSubH			= sortFixSubCont.height();
	$(".search-fix").css({height: $(".search-fix").height() + 'px', paddingBottom: fixSubH + 'px'});
}

function re20SearchFixed(){
	sortFixCont		= $(".search-fix-cont");
	sortFixSubCont	= $('.search-fix .search-fix-sub');
	
	re20SearchFixedCalc();
}

/* 이벤트 바인드는 한번만 하면 되므로 분리 */
function re20SearchFixedEventBind() {
	$(window).bind("scroll",function() {
		scrollTop = $(window).scrollTop();
		var searchFixH = $(".top-fix").height() + $('.fix-sub').height();
		if($(".search-fix").length > 0){
			if($(window).scrollTop() > $(".search-fix").offset().top - searchFixH){
				sortFixCont.css({top: searchFixH}).addClass("on");

				if (scrollTop >= lastScrollTop) {
					if($('.search-fix-cont').hasClass('on')){
						sortFixSubCont.css({top: '-' + fixSubH + 'px'});
						
					}else{
						sortFixSubCont.css('top', '0');
					}
				}else{
					sortFixSubCont.css('top', '0');

					if($('.filter-scroll-list.on').length == 0){
						sortFixSubCont.css({top: '0px'});
					}
				}
			
				lastScrollTop = scrollTop;
				
			}else{
				sortFixCont.css({top: 0}).removeClass("on");
				sortFixSubCont.css({"position":"absolute","top": 0})
			}
		}
	});
}

function slideCompEvent(selector){
	if($(selector).hasClass('on')){
		$(selector).parents('.slide-wrap-comp').find('.slide-f-con').removeClass('on');
		$(selector).parents('.slide-wrap-comp').find('.slide-b-con').slideUp(300);  
		$(selector).data('click', 1);
	}

	if(!$(selector).data('click')){
		$(selector).parents('.slide-wrap-comp').find('.slide-f-con').addClass('on');
		$(selector).parents('.slide-wrap-comp').find('.slide-b-con').slideDown(300);
		$(selector).data('click', 1);
	}else{
		$(selector).parents('.slide-wrap-comp').find('.slide-f-con').removeClass('on');
		$(selector).parents('.slide-wrap-comp').find('.slide-b-con').slideUp(300);
		$(selector).data('click', 0);
	}
}

function tabMenuOpen(tab){
	$('.tab-menu-btn').removeClass('on');
	$('.tab-menu-box').removeClass('on');
	$('.tab-menu-btn' + tab).addClass('on');
	$('.tab-menu-box' + tab).addClass('on');
}

function tabMenuOpenDepth2(tab){
	$('.tab-menu-btn-d2').removeClass('on');
	$('.tab-menu-box-d2').removeClass('on');
	$('.tab-menu-btn-d2' + tab).addClass('on');
	$('.tab-menu-box-d2' + tab).addClass('on');
}

function loginGo(bool) {
	if (bool) {
		Common.goLoginNoAlert(location.pathname+location.search);
	}
}

// before & after
$(function() {
	if ($(".before-after").length > 0) {
    	$(".before-after").twentytwenty();
	}
});



/* ---------------------------------------------------
탭 + 2단목록 CASE (탭 열기/닫기) fix-sub-navi
--------------------------------------------------- */
$(document).ready(function() {
	// 탭 열기
	$(".btn-navi-drop-open").on("click", function () {
		$(this).hide();
		$(this).siblings(".btn-navi-drop-close").show();
		$(this).siblings(".fix-sub-scrl").addClass("on");
		$(this).parents(".fix-sub-navi").height($(this).siblings(".fix-sub-scrl").height());
	});

	// 탭 닫기
	$(".btn-navi-drop-close").on("click", function () {
		$(this).siblings(".btn-navi-drop-open").show();
		$(this).hide();
		$(this).siblings(".fix-sub-scrl").removeClass("on");
		$(this).parents(".fix-sub-navi").height($(this).siblings(".fix-sub-scrl").height());
	});
});




/* ---------------------------------------------------
헤더.서브메뉴,상단고정탭 스크롤 up/down 포지션
--------------------------------------------------- */
var _position = $(window).scrollTop(); 
$(window).scroll(function() {
    var scroll = $(window).scrollTop();

	if($(window).scrollTop() + $(window).height() >= $("body").height()){ 
		$(".floating-tab").css("bottom",0);
		// 마이한샘 하단 고정 버튼
		$(".float-page-btn").css("bottom",61);
		$("nav.tab-bar").css("bottom",0);// 앱 구버전 floating 탭바(임시)
	}else{
		if(!($("body").hasClass("clickMove"))){ // 23.01.12 수정 -  body에 clickMove클래스 추가 되면 작동 안됨 탭 메뉴 클릭과 연결되어 있음 subFixTab();
			if (scroll == _position) {
				// 스크롤값의 갱신이 제대로 안되는경우가 있어서 추가
				return false;
			} else if (scroll > _position) {
				//Down 내렸을 때
				/* UI/UX 팀 스크롤 업다운에 따라 bnb 값 움직이는 것으로 인터랙션 확정(이광열) */
				$(".floating-tab").css("bottom",-(parseInt($(".floating-tab").height())));
				/* // UI/UX 팀 스크롤 업다운에 따라 bnb 값 움직이는 것으로 인터랙션 확정(이광열) */

				$("nav.tab-bar").css("bottom",-(parseInt($("nav.tab-bar").height())));// 앱 구버전 floating 탭바(임시)
				/* 몰메인 헤더 움직임 */
				$(".move-fix").css("height","0");
				$(".move-fix-obj").css("height","0");
				$(".move-fix-obj").css("position","absolute");
				$(".move-head").css("position","static");

				// 아파트 찾기 
				$(".apt-layout .search-bar").css({"top":"40px"});

				// gnb 시공사례 필터
				$(".main-sect .sect-tit + .filter-wrap").css('top', '40px');
				// 마이한샘 하단 고정 버튼
				$(".float-page-btn").css("bottom",0);
			} else {
				//UP 올렸을 때
				$(".floating-tab").css("bottom",0);
				$("nav.tab-bar").css("bottom",0);// 앱 구버전 floating 탭바(임시)
				/* 몰메인 헤더 움직임 */
				$(".move-fix-obj").height($(".move-head").height());
				$(".move-fix-obj").css("position","relative");
				$(".move-head").css({"position":"fixed","top":"0"});

				// 아파트 찾기 
				$(".apt-layout .search-bar").css({"top":"-62px"});

				// gnb 시공사례 필터
				$(".main-sect .sect-tit + .filter-wrap").css('top', '88px');

				// 마이한샘 하단 고정 버튼
				$(".float-page-btn").css("bottom",61);
			}
		}
		_position = scroll;
	}

	if($(window).scrollTop() <= 0) $(".floating-tab").css("bottom",0);
	if($(window).scrollTop() <= 0) $("nav.tab-bar").css("bottom",0);// 앱 구버전 floating 탭바(임시)

	if(scroll > $(window).height() / 3){
		$(".go-top").css("transform","scale(1)");
	}else{
		$(".go-top").css("transform","scale(0)");
	}

	// 스크롤이 최하단에 도달했을 때
	// if(scroll == $(document).height() - $(window).height()){ 
	// 	$(".go-top").css("transform","scale(1)");
	// }


	// 멤버십 혜택: 페이지 상단 버튼 숨김
	if($('.membership-benefit').length){
		$(".go-top").css("transform","scale(0)");
	}

});


/* ---------------------------------------------------
모바일 상품후기 이미지 관련 스크립트 공통화 (2021.07.23 김동진)
모바일 상품상세, 딜상품상세, 상품후기 목록에서 사용
--------------------------------------------------- */
//상품후기 이미지 뷰어 호출
function openViewerLayer(gdsEvalNo){
	if($("#viewer-layer-"+gdsEvalNo).find(".viewer-btn-next").length > 0) { // 이미지가 2개 이상있는경우
		var currentIdx = Number($("#imgViewerSeq_"+gdsEvalNo).val());
		displayPrevNextBtn(gdsEvalNo, currentIdx);
		$("#viewer-layer-"+gdsEvalNo).find(".viewer-img img").attr("src", $("#imgViewerSrc_"+gdsEvalNo+"_"+currentIdx).val());
	}
	popup_openV1('viewer-layer-'+gdsEvalNo);
}

// 상품후기 이전, 다음 이미지 선택
function setEvalImage(gdsEvalNo, num) {
	var currentIdx = Number($("#imgViewerSeq_"+gdsEvalNo).val()) + num;
	$("#imgViewerSeq_"+gdsEvalNo).val(currentIdx);
	$("#viewer-layer-"+gdsEvalNo).find(".viewer-img img").attr("src", $("#imgViewerSrc_"+gdsEvalNo+"_"+currentIdx).val());
	displayPrevNextBtn(gdsEvalNo, currentIdx);
}

// 상품후기 이전, 다음 버튼 이미지 [노출, 미노출] 처리
function displayPrevNextBtn(gdsEvalNo, currentIdx){
	if($("#viewer-layer-"+gdsEvalNo).find("[id^='imgViewerSrc_']").length == currentIdx+1) { // 가장 마지막 이미지인경우
		$("#viewer-layer-"+gdsEvalNo).find(".viewer-btn-next").hide();
	} else {
		$("#viewer-layer-"+gdsEvalNo).find(".viewer-btn-next").show();
	}
	
	if(currentIdx == 0) {
		$("#viewer-layer-"+gdsEvalNo).find(".viewer-btn-prev").hide();
	} else {
		$("#viewer-layer-"+gdsEvalNo).find(".viewer-btn-prev").show();
	}
}

//상품후기 썸네일 이미지 선택
function onThumEvalImage(gdsEvalNo, liIndex) {
	if($("#ulImglist_"+gdsEvalNo+" li").length <= 1) return;
	
	$("#ulImglist_"+gdsEvalNo+" li").removeClass("on");
	$("#ulImglist_"+gdsEvalNo+" li").eq(liIndex).addClass("on");
	$("#imgViewerSeq_"+gdsEvalNo).val(liIndex);
	$("#image-viewer-"+gdsEvalNo).find(".image-viewer-node img").attr("src", $("#ulImglist_"+gdsEvalNo+" li").eq(liIndex).find("img").data("orgSrc"));
}
/* ---------------------------------------------------
// 모바일 상품후기 이미지 관련 스크립트 공통화
--------------------------------------------------- */


// 샘라이브 다시보기 비디오 활성화 (스크립트 함수화 2021.08.18 김동진)
function vodPreviewInit(){
	var isChkScroll;
    var chkVideoOnH = function(a, b) {
        var _this = $(b),
            _thisOffset = _this.offset().left,
            _winWidth = $('.scroll-list').width() - 100,
            _scrollLeft = $('.scroll-list').scrollLeft();

        if (_thisOffset <= _winWidth) {
            isChkScroll = !0;
            _this.addClass('on');
            _this.prev().prev().removeClass('on');
        } else {
            isChkScroll = !1;
            if (isChkScroll === false) {
                _this.removeClass('on');
            }
        }
    };

    $('.scroll-list').scroll(function() {
       $('.ssem-review-comp .scroll-list-dp li:not(.more)').each(chkVideoOnH);
    });
    $('.ssem-review-comp .scroll-list-dp li:not(.more)').each(chkVideoOnH);

	// 2022.12.1 수정 김승규
    var chkVideoOnV = function(a, b) {
        var _this = $(b),
            _thisOffset = _this.offset().top,
            _winHeight = $(window).height(),
            _scrollTop = $(window).scrollTop();
        if (_scrollTop < _thisOffset + _this.height() - 100 && _thisOffset <= _winHeight + _scrollTop - 100) {
            _this.addClass('on');
        } else {
			_this.removeClass('on');
        }
    };

	/*
    $(window).scroll(function() {
        $('.ssem-review-list li').each(chkVideoOnV);
    });
	*/
	$(window).on('scroll',() => {
		$('.ssem-review-list li').each(chkVideoOnV);
	});
    //$('.ssem-review-list li').each(chkVideoOnV);
}
$(function() {
	vodPreviewInit();
});



/* ---------------------------------------------------
design selet (주문서-네이버페이)
--------------------------------------------------- */
$(function() {
	function decoSlt(){
		$(".decoslt-tit").click(function() {
			$(".decoslt").addClass("on");
		});
		$(".decoslt-node").click(function() {
			$(this).parents(".decoslt-box").prev().find(".decoslt-txt").html($(this).find("a").html());
			$(".decoslt").removeClass("on");
		});
		$(".decoslt").mouseleave(function() {
			$(".decoslt").removeClass("on");
		});
	}
	decoSlt();
});




/* ---------------------------------------------------
메인 특가 카테고리 탭
--------------------------------------------------- */
function tabBindAct(){
	var startTabs = 0;
	var tab_this = 0;
	$(".tabs-act").each(function(){
		if($(this).hasClass("act-on")){
			return true;
		}else{
			tab_this = $(this).children();
			$(this).addClass("act-on");
			tab_this.eq(startTabs).addClass("on");
			$(".tab-conts-ar").eq(startTabs).show();

			tab_this.on('click',function(n){
				var tabOrder = tab_this.index($(this));
				tab_this.removeClass("on")
				$(".tab-conts-ar").hide();

				$(this).addClass("on");
				$(".tab-conts-ar").eq(tabOrder).show();
				$(".tabs-wrap").stop().animate({scrollLeft:$(this).position().left + $(".tabs-wrap").scrollLeft()},300);
			});
		}
	});
}

$(function() {
	tabBindAct();

	// 인증확인 버튼 활성화
	$(".auth-num").keyup(function() {
		var content = $(this).val();
		if (content.length >= 1) {
			$(this).addClass('on');
		}
		else {
			$(this).removeClass('on');	
		}

		if (content.length >= 6) {
			$(this).val(content.substring(0, 6));
			$('.auth-confirm').removeClass('gray').addClass('black');
		}
		else{
			$('.auth-confirm').removeClass('black').addClass('gray');
		}
	});
});


// esld 슬라이더
(function($){
	$.fn.slideFunc = function (settings) {
		settings = jQuery.extend({
			auto : false,
			btnPrev : null,
			btnNext : null,
			rPaging : null,
			list : null,
			speed : 800,
			interval : 2000
		}, settings);

		var opts = [];
		opts = $.extend({}, $.fn.slideFunc.defaults, settings);
		return this.each(function () {
			var _this = this;
			$.fn.extend(this, slideFunc);
			this.opts = opts;
			_this.init();	
		});
	};

	var slideFunc = {
		init : function(){
			var _this =  this;
			this.listWrap = $(this).children(":first-child");
			this.list = this.listWrap.children();
			this.totalCnt = this.list.length;
			this.prev = $(this).find(".esld-prev");
			this.next = $(this).find(".esld-next");
			this.sPagingWrap = $(this).find(".esld-paging");
			this.sPasing = this.sPagingWrap.children();
			this.order = 0;
			this.nextOrder = 0;
			this.stop = false;
			this.auto = this.opts.auto;
			this.speed = this.opts.speed;
			this.intervalTime = this.opts.intervalTime;
			this.autoObj = "";
			this.startX = 0;
			this.startY = 0;
			this.moveX = 0;
			this.moveY = 0;
			this.leftMove = false;
			this.rightMove = false;
			this.slideCnt = $(this).find(".cnt-num");
			this.slideTot = $(this).find(".cnt-tot");
			this.limited = this.opts.limited;

			if(this.totalCnt <= 1) {
				this.prev.hide();
				this.next.hide();
				return false;
			}

			this.slideTot.text(this.totalCnt);

			if(this.limited) this.prev.addClass('off');

			this.prev.on('click',function() {
				if ($(this).closest('.review-detail')) {
					$(this).closest('.review-detail').find('.m-pop-cont').scrollTop(0);
				}
				_this.speed = 400;
				_this.action(-1);

			});

			this.next.on('click',function() {
				if ($(this).closest('.review-detail')) {
					$(this).closest('.review-detail').find('.m-pop-cont').scrollTop(0);
				}
				_this.speed = 400;
				_this.action(1);
			});

			this.list.on("touchstart", function(e) {
				_this.stopAuto();
				if(e.type == "touchstart" && e.originalEvent.touches.length <= 1) {
					_this.startX = e.originalEvent.touches[0].pageX;
					_this.startY = e.originalEvent.touches[0].pageY;
				}
			});

			this.list.on("touchmove", function(e) {
				if(e.type == "touchmove" && e.originalEvent.touches.length <= 1){
					_this.moveX = e.originalEvent.touches[0].pageX - _this.startX;
					_this.moveY = e.originalEvent.touches[0].pageY - _this.startY;
					
					if (_this.moveY > -20  && _this.moveY < 20) {
						if (_this.moveX > 50){
							_this.leftMove = true;
							_this.rightMove = false;
						}
						
						if (_this.moveX < -50){
							_this.leftMove = false;
							_this.rightMove = true;
						}
					}
				}
			});

			this.list.on("touchend", function(e) {
				_this.speed = 400;
				if(_this.leftMove){
					if ($(this).closest('.review-detail')) {
						$(this).closest('.review-detail').find('.m-pop-cont').scrollTop(0);
					}
					_this.action(-1);
					_this.leftMove = false;
				}

				if(_this.rightMove){
					if ($(this).closest('.review-detail')) {
						$(this).closest('.review-detail').find('.m-pop-cont').scrollTop(0);
					}
					_this.action(1);
					_this.rightMove = false;
				}

				if(_this.auto) _this.autoAction();
			});

			$(this).bind("mouseenter",function() {
				_this.stopAuto();
			});

			$(this).bind("mouseleave",function() {
				_this.autoAction();
			});

			if(this.auto) this.autoAction();

			// 페이징
			if ($(this).closest('.review-detail')) {
				_this.sPagingWrap.html('');//페이징 60개 제한
			}
			this.list.each(function(n){
				_this.sPagingWrap.append($('<span></span>').on('click',function() {	
					_this.speed = 0;
					var dc = 1;
					if(_this.order <= $(this).index()){
						dc = 1;
					}else{
						dc = -1;
					}
					_this.action(dc, $(this).index());
				}));
				if ($(this).closest('.review-detail')) {
					//_this.sPagingWrap.find('span').eq(0).addClass("on");
				}else{
					_this.sPagingWrap.find('span').eq(0).addClass("on");
				}
			});
		},

		action : function(d, pNum) {
			var _this = this;

			if(pNum == this.order) return false;
			if($(this).find(":animated").length >= 1) return false;

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

			this.list.eq(this.order).stop().animate({"marginLeft": -d*100+"%"},this.speed, function() {
				$(this).css({"position" : "absolute","top" : 0, "left" : "100%","marginLeft":0}).removeClass('on');
			});

			if(d == 1){
				if(this.order >= this.totalCnt - 1){
					this.order = -1;
				}
				
				if(pNum >= 0){
					this.nextOrder = pNum;
				}else{
					this.nextOrder = this.order + 1;
				}

				this.list.eq(this.nextOrder).stop().animate({"left":0},this.speed, function() {
					$(this).css("position","relative").addClass('on');
					if(pNum >= 0){
						_this.order = pNum;
					}else{
						_this.order++;
					}

					//콜백 함수
					_this.actionCallBack();
				});
			}else{
				if(pNum >= 0){
					this.nextOrder = pNum;
					this.order = pNum;
				}else{
					this.nextOrder = this.order - 1;

					if(this.order <= 0){
						this.nextOrder = this.totalCnt - 1;
						this.order =  this.totalCnt - 1;
					}else{
						this.order--;
					}
				}
				this.list.eq(this.nextOrder).css("left","-100%").stop().animate({"left":"0"}, this.speed, function() {
					$(this).css("position","relative").addClass('on');

					//콜백 함수
					_this.actionCallBack();
				});
			}

			if(this.sPasing.length > 0){
				this.sPasing.each(function(n) {
					if(_this.nextOrder == n){
						$(this).addClass("on");
					}else{
						$(this).removeClass("on");
					}
				});
			}

			this.slideCnt.text(this.nextOrder + 1); // 페이지 숫자 표시 태그 클래스 .cnt-num
		},

		autoAction : function() {
			var _this = this;

			_this.stopAuto();
			if(this.auto){
				this.autoObj = setInterval(function() {
					_this.action(1);
				},_this.intervalTime);
			}
		},

		stopAuto : function() {
			if(this.auto){
				clearInterval(this.autoObj);
			}
		},

		actionCallBack : function() {
			var _this = this;

			this.sPagingWrap.children().each(function(n) {
				if(n == _this.nextOrder){
					$(this).addClass("on");
				}else{
					$(this).removeClass("on");
				}
			});
			
			if(this.limited){
				if(this.order >= this.totalCnt - 1){
					if ($(this).closest('.review-detail')) {
						sliderOffTrigger(1);
					}else{
						this.next.addClass('off');
					}
				}else{
					this.next.removeClass('off');
				}

				if(this.order <= 0){
					if ($(this).closest('.review-detail')) {
						sliderOffTrigger(-1);
					}else{
						this.prev.addClass('off');
					}
				}else{
					this.prev.removeClass('off');
				}
			}

			// 홈아이디어 튜토리얼 마지막 슬라이드 검출
			if ($(this).closest('.pop-tutorial')) {
				if (this.nextOrder + 1 == this.totalCnt) {
					$(this).closest('.pop-tutorial').find('.float-save-btn, .not-view').show();
				}
				else {
					$(this).closest('.pop-tutorial').find('.float-save-btn, .not-view').hide();
				}
			}
		}
	};
})(jQuery);



// esld 슬라이더 로드
$(function() {
	$(".esld-1").slideFunc({
		speed : 0,				// 이미지 넘어가는 속도
		intervalTime : 3000,	// 동작 간격 시간 1000 = 1초
		auto : false,			// 자동 슬라이드
		limited : true 			// 이미지 유한 슬라이드
	});
});


// 상담방송 - 상담신청 : 공사범위
function part_detail(_this, am) {
	console.log($(_this))
	if (am == '1') {
		$(_this).closest('.rectangle-radio').next('.sub-deps').removeClass('on');
	}
	else if (am == '2') {
		$(_this).closest('.rectangle-radio').next('.sub-deps').addClass('on');
	}
}

$(function() {
	// 상담방송 - 상담신청 : 요청사항 문자 카운팅
	$('.requested').on('keydown keyup', function() {
	    $('.text-cnt').html("("+$(this).val().length+" / 50)");
	    if($(this).val().length >= 50) {
	        $(this).val($(this).val().substring(0, 50));
	        $('.text-cnt').html("(50 / 50)");
	    }
	});

	// 상담방송 - 상담신청 : 미확정 
	$('.flex-chk-list .etc').on('change',function(event) {
		if ( $(this).is(':checked')) {
			$('.part-detail .etc-input').show();
		}
		else{
			$('.part-detail .etc-input').hide();
		}
	});


	// textarea 동적 높이
	$('textarea[data-autoresize]').on('input', function (e) {
		$(this).css('height', 'auto');
		$(this).height(this.scrollHeight);

		if ( $(this).val() !== '') {
			$(this).next('.upload').addClass('on');
		}
		else {
			$(this).next('.upload').removeClass('on');
		}
	});

	if ($('.comment-list').length) {
		$(window).resize(function(event) {
			// 댓글 더보기 버튼 숨김
			$('.comment-list .txt p').each(function(i, el) {
				console.log($(this))
				if ($(el).height() < 70) {
					$(el).closest('.txt').find('.more').hide();
				}
				else{
					$(el).closest('.txt').find('.more').show();
				}
			});
		});
	}

	// 댓글 말줄임 펼치기
	$(document).on("click",".comment-list .txt .more",function(){ 
		if($(this).hasClass("on")){
			$(this).removeClass("on").text('더보기').closest('.txt').removeClass('on');
		}else{
			$(this).addClass("on").text('접기').closest('.txt').addClass('on');
		}
	});


	// 댓글 말줄임 펼치기/닫기 : 전문가 MY 홈아이디어
	$(document).on("click",".my-cont-state .comment .more",function(){ 
		if($(this).hasClass("on")){
			$(this).removeClass("on").text('더보기').prev('p').removeClass('on');
		}else{
			$(this).addClass("on").text('접기').prev('p').addClass('on');
		}
	});

	// 아코디언
    $(document).on('click', '.acc-tit', function(e) {
		e.stopImmediatePropagation();
        $(this).toggleClass('on').next('.acc-con').stop().slideToggle(300);
    });


    // gnb: side-pop 카테고리
    $(document).on('click', '.cate-1dep button', function() {
    	$('.cate-1dep button').removeClass('on');
    	$(this).addClass('on');

    	if ($(this).hasClass('store')) {
    		$('.right-area .inner:not(.store)').removeClass('on');
    		$('.right-area .store').addClass('on')
    	}
    	else if ($(this).hasClass('remodeling')) {
    		$('.right-area .inner:not(.remodeling)').removeClass('on');
    		$('.right-area .remodeling').addClass('on')
    	}
    	else if ($(this).hasClass('homeidea')) {
    		$('.right-area .inner:not(.homeidea)').removeClass('on');
    		$('.right-area .homeidea').addClass('on')
    	}
    });

    // fnb: floating-tab
	/*
    $('.floating-tab-list a').click(function() {
		$(this).parent('.item').siblings().removeClass('on');
		$(this).parent('.item').addClass('on');
	});
	*/

});



/* ---------------------------------------------------
등록이미지 좌표 전시
--------------------------------------------------- */
// 이미지 포인트 팝업 함수
function viewPointers(){
	$(".pointers").on("click",function(){
		let ranges = $(this).closest(".point-area");
		 ranges.find(".pointers").removeClass("on");
		 ranges.find(".point-layer").hide().css({"transform":"none"});
		$(this).addClass("on");

		let parentW = parseInt(ranges.outerWidth());
		let parentH = parseInt(ranges.outerHeight());
		let popWidth = $(this).find(".point-layer").outerWidth();
		let popHeight = $(this).find(".point-layer").outerHeight();
		let ponterLeft = parseInt($(this).offset().left) - ranges.offset().left;
		let ponterTop = parseInt($(this).offset().top) - ranges.offset().top;
		
		if(ponterLeft < popWidth/2){
			$(this).find(".point-layer").show().css({"transform":"translateX(0%)"});
		}

		if(ponterLeft > (popWidth/2) && ponterLeft < parentW - (popWidth+50)/2){
			$(this).find(".point-layer").show().css({"transform":"translateX(-43%)"});
		}

		if(ponterLeft > parentW - (popWidth+50)/2){
			$(this).find(".point-layer").show().css({"transform":"translateX(-86%)"});
		}

		if(popHeight > parentH - (ponterTop + 24)){
			$(this).find(".point-layer").css({"top":-(popHeight + 10)});
		}else{
			$(this).find(".point-layer").css({"top":24});
		}
	});

	$(document).on("click",function(e) {
		if(!$(".pointers").is(e.target)){
			$(".pointers").removeClass("on");
			$(".point-layer").hide();
		}
	});
}


// 이미지 포인트 팝업 재위치 시키는 함수
function relocatePoint(){
	$(window).on("resize",function (){
		if($(".pointers.on").length != 0){
			$(".point-area").each(function(){
				let parentW = parseInt($(this).outerWidth());
				let parentH = parseInt($(this).outerHeight());
				let popWidth = $(this).find(".pointers.on .point-layer").outerWidth();
				let popHeight = $(this).find(".pointers.on .point-layer").outerHeight();
				let ponterLeft = 0;
				let ponterTop = 0;

				if($(this).find(".pointers.on").length != 0){
					ponterLeft = parseInt($(this).find(".pointers.on").offset().left) - $(this).offset().left;
					ponterTop = parseInt($(this).find(".pointers.on").offset().top) - $(this).offset().top;
				
					if(ponterLeft < popWidth/2){
						$(this).find(".pointers.on .point-layer").show().css({"transform":"translateX(0%)"});
					}

					if(ponterLeft > (popWidth/2) && ponterLeft < parentW - (popWidth+50)/2){
						$(this).find(".pointers.on .point-layer").show().css({"transform":"translateX(-43%)"});
					}

					if(ponterLeft > parentW - (popWidth+50)/2){
						$(this).find(".pointers.on .point-layer").show().css({"transform":"translateX(-86%)"});
					}

					if(popHeight > parentH - (ponterTop + 35)){
						$(this).find(".pointers.on .point-layer").css({"top":-(popHeight + 10)});
					}else{
						$(this).find(".pointers.on .point-layer").css({"top":35});
					}
				}
			
			});
		}
	});
}

// 이미지 포인트 찍는 함수
function setPointers(){
	$(".point-img").on("click", function(e) {
		let _top = (e.offsetY/$(this).outerHeight()*100).toFixed(5) + "%";
		let _left = (e.offsetX/$(this).outerWidth()*100).toFixed(5) + "%";
		let addPoint = $(this).parent().next(".spots").css({"top":_top,"left":_left}).clone(true);	
		$(this).parent().append(addPoint);
		$("#point-position").text("top:"+_top+" left:"+_left)
	});
}

$(function() {
	viewPointers();
	relocatePoint();
	setPointers();
});




/* ---------------------------------------------------
자동 아코디언 auto arccodian
--------------------------------------------------- */
;(function($){
	$.fn.accorAuto = function () {
		return this.each(function () {
			$.fn.extend(this, accorAuto);
			this.init();	
		});
	};

	let accorAuto = {
		init : function(){
			if($(this).hasClass("onAct")){
				return true;
			}else{
				$(this).addClass("onAct");
			}
			let that = this;
			this.acoTit = $(this).find(".accorauto-tit");
			this.acoCont = $(this).find(".accorauto-cont");
			this.firstView = $(this).attr("first-view");
			this.totalCnt = this.acoTit.length;
			this.order = 0;
			this.interval_time = 0;

			if($(this).attr("auto") != ""){
				this.auto = true;
				this.interval_time = parseInt($(this).attr("auto"));
			}else{
				this.auto = false;
			}
			
			this.acoTit.on('click',(function(e) {
				let n = that.acoTit.index($(this));
				e.stopPropagation();
				that.action(n);
			}));

			if(this.firstView != undefined || this.firstView != ""){
				try{
					this.acoTit.eq(this.firstView - 1).addClass("on");
					this.acoTit.eq(this.firstView - 1).next().slideDown();
				}catch(e){}
			}

			$(this).on("touchstart", (function(e) {
				this.stopAuto();
			}).bind(this));

			$(this).find(".scroll-list").on("touchstart", (function(e) {
				this.stopAuto();
			}).bind(this));

			$(this).on("touchend", (function(e) {
				if(this.auto) this.autoAction();
			}).bind(this));

			$(this).find(".scroll-list").on("touchend", (function(e) {
				if(this.auto) this.autoAction();
			}).bind(this));
			
			if(this.auto) {
				this.autoAction();
			}
		},

		action : function(ckn){
			this.order = ckn;
			this.acoTit.each(function(n) {
				if(ckn == n){
					if($(this).hasClass("on")){
						$(this).removeClass("on");
					}else{
						$(this).addClass("on");
					}
					$(this).next().slideToggle();
				}else{
					$(this).removeClass("on");
					$(this).next().slideUp();
				}
			});
		},

		autoAction : function() {
			this.stopAuto();
			if(this.auto){
				this.auto_obj = setInterval((function() {
					if(this.order >= this.totalCnt - 1){
						this.order = 0;
					}else{
						this.order++;
					}
					this.action(this.order );
				}).bind(this),this.interval_time);
			}
		},

		stopAuto : function() {
			clearInterval(this.auto_obj);
		}
	};
})(jQuery);
$(function() {
	$(".accorauto").accorAuto();
});
/* // 자동 아코디언 auto arccodian */



function categoryListView(){
	$('.tit-toggle').click(function() {
		if($('.top-fix').hasClass("heiger")){
			$('.top-fix').removeClass("heiger");
			$('.tit-toggle').removeClass('on');
			$('.category-menu').removeClass('on');
			$('.m-dim').hide();
			$("html").removeClass("has-fixed");
		}else{
			$('.top-fix').addClass("heiger");
			$('.tit-toggle').addClass('on');
			$('.category-menu').addClass('on');
			$('.m-dim').show();
			$("html").addClass("has-fixed");
		}
	});
	$(".m-dim").on("click", function () {
		$('.top-fix').removeClass("heiger");
		$('.tit-toggle').removeClass('on');
		$('.category-menu').removeClass('on');
		$("html").removeClass("has-fixed");
	});
}
$(function() {
	categoryListView();
});



/* 수정(한샘통합리뉴얼) – 카테고리더보기 신규 221017 - 한대수 */
/* category-button 이벤트 */
$(document).on('click','.category-button', function(){
	$(this).addClass('on').siblings().removeClass('on');
});
/* category-button-small 이벤트 */
$(document).on('click','.category-button-small', function(){
	$(this).addClass('on').siblings().removeClass('on');
});



/* ---------------------------------------------------
홈아이디어 
--------------------------------------------------- */
$(function() {
	// GNB load 방식 변경에 의해 load후 재 호출을 위해 함수화 하였습니다. 2022.12.16 김대오
	commonHomeIdeaEventBind();
});

// 홈아이디어 이벤트
function commonHomeIdeaEventBind() {
	// 안드로이드 구 버전
	var ua = navigator.userAgent;
	
	if(ua.indexOf("Android 9") > 0) {
		$('body').addClass('old-android');
	} 

	// 지도 터치 스와이프
	var aptStartY, aptEndY, hH = $(window).height();
	$('.rst-view .toggle').on({
		touchstart: function(e) {
			aptStartY = e.originalEvent.changedTouches[0].clientY;
		},

		touchmove: function(e) {
			var _parent = $(this).closest('.apt-cont');
			aptEndY = e.originalEvent.changedTouches[0].clientY;
			curentY = aptEndY - aptStartY;

			if (_parent.hasClass('min')) {
				if ($('body[class*="-app"]').length == 1) {
					$(this).parent('.rst-view').css({
						'touch-action' : 'none',
						'transition' : 'none',
						'overflow' : 'hidden',
						'top' : 'calc(100% + ' + (curentY - 68) +'px)',
						'height' : 'auto',
					});
				} else {
					$(this).parent('.rst-view').css({
						'touch-action' : 'none',
						'transition' : 'none',
						'overflow' : 'hidden',
						'top' : 'calc(100% + ' + (curentY - 129) +'px)',
					});
				}
			} else if (_parent.hasClass('half')) {
				$(this).parent('.rst-view').css({
					'touch-action' : 'none',
					'transition' : 'none',
					'overflow' : 'hidden',
					'top' : 'calc(100% + ' + (curentY - 340) +'px)',
					'height' : 'auto',
				});
			} 
		},

		touchend: function(e) {
			aptEndY = e.originalEvent.changedTouches[0].clientY;
			var _parent = $(this).closest('.apt-cont');
			var _per = aptEndY / hH * 100;

			$(e.target).parent('.rst-view').removeAttr("style");

			if (_parent.hasClass('min')) {
				// 위로
				if(_per < 50){
					$(this).closest('.apt-cont').removeClass('min half');
					$('body').removeClass('hf');
					$(window).scrollTop(0);
				}
				// 중간으로
				else if (aptStartY-aptEndY > 50) {
					$(this).closest('.apt-cont').removeClass('min half').addClass('half');
				}
			}
			else if (_parent.hasClass('half')) {
				// 위로
				if(aptStartY - aptEndY > 50){
					$(this).closest('.apt-cont').removeClass('min half');
					$('body').removeClass('hf');
					$(window).scrollTop(0);
				}
				// 아래로
				else if(aptEndY - aptStartY > 50){
					$(this).closest('.apt-cont').removeClass('min half').addClass('min');
				}
			}
		},

		click: function(e) {
			if ($(this).closest('.apt-cont').hasClass('min')) {
				$(this).closest('.apt-cont').removeClass('min');
				$('body').removeClass('hf')
			}
			else if ($(this).closest('.apt-cont').hasClass('half')) {
				$(this).closest('.apt-cont').removeClass('half');
				$(this).closest('.apt-cont').addClass('min');
			}
		}
	});


	// 지도보기
	$('.rst-view .btn-map').click(function() {
		$(this).removeClass('on').closest('.apt-cont').addClass('min');
		$('body').addClass('hf');
		$(".go-top").css("transform","scale(0)");
		$(window).scrollTop(0);
	});


	// 공간사진 상세 - 팝업
	$('.space-detail .toggle').on({
		touchstart: function(e) {
			aptStartY = e.originalEvent.changedTouches[0].clientY;
		},

		touchmove: function(e) {
			aptEndY = e.originalEvent.changedTouches[0].clientY;
			curentY = aptEndY - aptStartY;

			$('body').css('overflow-y', 'hidden');
			$(this).css({
				'transform': 'translateY('+curentY+'px)',
				'padding-bottom': '100vh'
			});
		},

		touchend: function(e) {
			aptEndY = e.originalEvent.changedTouches[0].clientY;

			// 위로
			if(aptStartY - aptEndY > 50){
				popup_openV1('pop-photo-detail');
				spaceDetailMoreTextBtnDisplay(); // 텍스트 더보기 버튼 show,hide 처리
			}

			$(this).removeAttr("style");
			$('body').removeAttr("style");
		},

		click: function(e) {
			popup_openV1('pop-photo-detail');
			spaceDetailMoreTextBtnDisplay(); // 텍스트 더보기 버튼 show,hide 처리
		}
	});


	// 이미지 줌
	var zoomList = document.querySelectorAll(".panzoom");

	for (var i = 0; i < zoomList.length; i++) {
		var myPanzoom = new Panzoom(zoomList.item(i), {
			panOnlyZoomed : true
		});
	}


	// 셀렉트 selected
	$('select').change(function() {
		if ($('option:eq(0)', this).prop('selected')) {
			$(this).removeClass('on');
		}
		else {
			$(this).addClass('on');
		}
	});

	// 자동완성 레이어
	/* 자동완성 결과 존재유무에 따라 처리하기 위하여 해당화면에서 처리 2022.12.27 김대오
	$(".search-input .keyword").on('click', function(){
		$('.auto-complet').addClass('on');
	});

	$(".search-input .keyword").on("keyup", function() {
		$('.auto-complet').addClass('on');
		if($(this).val().length > 0){
			$('.search-input .reset').show();
		}else{
			$('.search-input .reset').hide();
			$('.auto-complet').removeClass('on');
		}
	});
	 */

	$('.search-input .reset').on('click', function() {
		$('.search-input .keyword').val('');
		$(this).hide();
		$('.auto-complet').removeClass('on');
	});

	$('.auto-complet .close').on('click', function() {
		$('.auto-complet').removeClass('on');
	});


	// 공간사진 상세 body 높이 100% 
	if ($('.contents').hasClass('space-detail')) {
		$('body').addClass('hf')
	}

	
	// 요약 상세정보 토글
	$('.basic-info .more-toggle').on('click', function() {
		$(this).toggleClass('on').siblings('.opt-info-detail').toggleClass('on');
		$('span', this).text($(this).text() == '접기' ? '더보기' : '접기');
	});


	// 인기급상승 더보기 버튼 노출 여부
	$('.pick .list > li').length > 5 ? $('.pick .btn-box').show() : $('.pick .btn-box').hide();

	// 인기급상승 더보기 토글
	$('.pick .btn-more').click(function() {
		$(this).toggleClass('on').closest('.pick').find('.list > li').slice(5).toggle();
		$('span', this).text(function(i, v){
			return v == '목록 더보기' ? '목록 접기' : '목록 더보기'
		});

		if (!$(this).hasClass('on')) {
			$('html,body').animate({
				scrollTop: $(this).offset().top - $(window).height() / 2
			}, 500);
		}
	});


	// 공간사진 사진 상세 페이지 상단 버튼
	$('.m-pop .m-pop-cont').scroll(function () { 
		if($(this).scrollTop() > $(window).height() / 3){
			$(".go-top").css("transform","scale(1)");
		}else{
			$(".go-top").css("transform","scale(0)");
		}
	});

	$('.go-top').click(function () { 
		$('.m-pop .m-pop-cont').scrollTop(0);
	});

}

// 공간 사진상세정보 팝업 텍스트영역 더보기 버튼 show, hide처리 2023.01.30 김대오
function spaceDetailMoreTextBtnDisplay() {
	let h = 40;
	let $moreTxtEle = $(".pop-photo-detail .txt-wrap .more-txt");
	$moreTxtEle.removeClass("cut");
	//console.log($moreTxtEle.height());
	if($moreTxtEle.height() > h) {
		$moreTxtEle.siblings(".more-txt-btn").show();
	} else {
		$moreTxtEle.siblings(".more-txt-btn").hide();
	}
	setTimeout(function(){
		$moreTxtEle.addClass("cut");
	}, 100);
}



/* ---------------------------------------------------
설문조사 컴포넌트
--------------------------------------------------- */
/* survey open */
function surveyCompFn(dtClass){
	$(".survey-open").off("click").on('click', function(e) {
		
		if($(this).hasClass("on")){
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}
		$(this).next().slideToggle();
		e.stopImmediatePropagation();
	});
}
$(document).ready(function() {
	surveyCompFn();
});
/* // survey open */

/* survey popup */
function evpopFn(popupId){
	$(popupId).show();
	$(".survey-pop-close").click(function() {
		$(this).parents(popupId).hide();
	});
}
/* // survey popup */

/* 인풋 이미지 삭제 */
$(document).ready(function() {
	$(".survey-input").click(function() {
		$(this).addClass('on');
	});
	$(".survey-input").focus(function() {
		$(this).addClass('on');
	});
});


/* 시리즈 리스트 컴포넌트 스크립트(list 가 해당 넓이일 때만 사용 가능) */
;(function($){
	$.fn.carouselLeft = function () {
		return this.each(function () {
			$.fn.extend(this, carouselLeft);
			this.init();
		});
	};

	const carouselLeft = {
		init : function(){
			if($(this).hasClass("onAct")){
				return "acted";
			}else{
				$(this).addClass("onAct");
			}

			this.moveObj = $(this).find('.carousel-ls');
			this.startX = 0;
			this.startY = 0;
			this.moveX = 0;
			this.moveY = 0;
			this.d = 0;
			this.order = 0;
			this.last = 0;
			this.transX = 0;
			this.barWidth = 0;
			this.xPrev = $(this).find('.xPrev');
			this.xNext = $(this).find('.xNext');
			this.xSrlWrap = $(this).find('.xSrlbar-wrap');
			this.xSrlbar =$(this).find('.xSrlbar');

			if(this.moveObj.children().length <= 1){
				$(this).addClass("solo");
				this.xSrlWrap.hide();
				return false;
			}

			this.dist = this.moveObj.children().eq(0).outerWidth();
			this.act = 0;
			this.dragStart = false;

			this.last = this.moveObj.children().length - parseInt($(this).width()/this.moveObj.children().eq(0).outerWidth());
			this.barWidth = 100/(this.last+1);

			this.xSrlbar.width(this.barWidth+'%');

			$(this).on("touchstart", (function(e) {
				e.stopPropagation();
				this.dist = this.moveObj.children().eq(0).outerWidth();
				this.last = this.moveObj.children().length - parseInt($(this).width()/this.moveObj.children().eq(0).outerWidth());

				this.act = 0;
				if(e.type == "touchstart" && e.originalEvent.touches.length <= 1) {
					this.moveObj.removeClass('on');
					this.startX = e.originalEvent.touches[0].pageX;
					this.startY = e.originalEvent.touches[0].pageY;
					this.transX = parseInt(this.moveObj.css("margin-left"));
				}
			}).bind(this));

			$(this).on("touchmove", (function(e) {
				e.stopPropagation();
				if(e.type == "touchmove" && e.originalEvent.touches.length <= 1){
					this.moveX = e.originalEvent.touches[0].pageX - this.startX;
					this.moveY = e.originalEvent.touches[0].pageY - this.startY;

					let w = this.moveX < 0 ? this.moveX * -1 : this.moveX;
					let h = this.moveY < 0 ? this.moveY * -1 : this.moveY;
					if ((w <  h)) {
						this.moveX = 0;
					} else {
						e.preventDefault();
						this.moveObj.css({'margin-left':(this.moveX+this.transX)});
						this.moveX > 0 ? this.d = -1 : this.d = 1;
						if(Math.abs(this.moveX) > 10){
							this.act = 1;
						}else{
							this.act = 0;
						}
					}
				}
			}).bind(this));

			$(this).on("touchend", (function(e) {
				e.stopPropagation();
				if(this.moveX != 0) this.endAct(0);
			}).bind(this));

			$(this).on("mousedown", (function(e){
				e.stopPropagation();
				e.preventDefault();
				this.act = 0;
				this.dragStart = true;
				this.startX = e.pageX;
				this.startY = e.pageY;
				this.moveObj.removeClass('on');
				this.moveObj.removeClass("dragged");
				this.transX = parseInt(this.moveObj.css("margin-left"));
			}).bind(this));

			$(this).on("mousemove", (function(e){
				e.stopPropagation();
				e.preventDefault();
				this.moveX = e.pageX - this.startX;
				this.moveY = e.pageY - this.startY;

				if(this.dragStart && Math.abs(this.moveX) > 0){
					this.moveObj.addClass("dragged");
					this.moveObj.css({'margin-left':(this.moveX+this.transX)});
					this.moveX > 0 ? this.d = -1 : this.d = 1;
					if(Math.abs(this.moveX) > 20){
						this.act = 1;
					}else{
						this.act = 0;
					}
				}
			}).bind(this));

			$(this).on("mouseup", (function(e){
				e.stopPropagation();
				this.dragStart = false;
				this.moveObj.removeClass("dragged");
				if(this.moveX != 0) this.endAct(0);
			}).bind(this));

			$(this).on("mouseleave",(function(e) {
				if(this.dragStart) {$(e.target).trigger("mouseup");}
			}).bind(this));

			this.xPrev.on("click",(function(e){
				this.d = -1;
				this.act = 1;
				this.endAct(-1);
			}).bind(this));
				
			this.xNext.on("click",(function(e){
				this.d = 1;
				this.act = 1;
				this.endAct(1);
			}).bind(this));
		},

		endAct : function(c){
			let lastTransX = this.moveObj.children().length*this.moveObj.children().eq(0).outerWidth() - $(this).width();
			if(this.d <= 0 && this.order == 0){
				if(c == -1){
					this.moveObj.addClass('on').css('margin-left',100);
					setTimeout((function(){
						this.moveObj.css('margin-left',0);
					}).bind(this),300);
					return 'end';
				}
				this.order = 0;
			}else{
				if(this.act == 0 && this.order == this.last){
					this.order = this.order + this.d*1;
				}else{
					this.order = this.order + this.d*1*this.act;
				}
			}

			if(this.d > 0 && this.order >= this.last){
				this.moveObj.addClass('on').css('margin-left',-lastTransX);

				if(this.d > 0 && this.order == this.last+1){
					if(c == 1){
						this.moveObj.addClass('on').css('margin-left',-(lastTransX+100));
						setTimeout((function(){
							this.moveObj.css('margin-left',-lastTransX);
						}).bind(this),300);
					}
				}

				this.order = this.last;
			}else{
				this.moveObj.addClass('on').css('margin-left',-this.dist*this.order);
			}

			
			this.xSrlbar.css('left',this.order*this.barWidth+'%');
			this.moveX = 0;
		}
	};
})(jQuery);

$(function() {
	$(".carousel-scroll").carouselLeft();
});


/* 통합검색 탭 스크롤 스크립트 */
function xscrollSearch(){
	$('.top-fix .search-tab.scroll-list').stop().animate({scrollLeft:parseInt($('.top-fix .search-tab.scroll-list').scrollLeft() + $('.top-fix .search-tab.scroll-list').find("li.on").position().left)}, 1);
}


/* 컨텐츠 슬라이드 컴포넌트 추가에 따른 뷰형 슬라이드 추가 */
/* contents slide */
;(function($){
	$.fn.hsldFn = function (settings) {
		settings = jQuery.extend({
			btn_prev : null,
			btn_next : null,
			btn_pasing : null
		}, settings);

		var opts = [];
		opts = $.extend({}, $.fn.hsldFn.defaults, settings);

		return this.each(function () {

			var _this = this;

			$.fn.extend(this, hsldFn);
			this.opts = opts;
			_this.init();	
		});
	};

	var hsldFn = {
		init : function(){
			if($(this).hasClass("onAct")){
				return true;
			}else{
				$(this).addClass("onAct");
			}

			var _this =  this; 
			this.list_wrap = $(this).find(".list-wrap");
			this.list = this.list_wrap.children();
			this.totalCnt = this.list.length;
			this.prev = $(this).find(".hsld-prev");
			this.next = $(this).find(".hsld-next");
			this.pause = $(this).find(".sld-pause");
			this.pasing_wrap = $(this).find(".hsld-btns");
			this.pasing = "";
			this.order = 0;
			this.next_order = 0;
			this.interval_time = 0;

			if($(this).attr("auto") != ""){
				this.auto = true;
				this.interval_time = parseInt($(this).attr("auto"));
			}else{
				this.auto = false;
			}
			
			this.speed = parseFloat(this.list.css("transition-duration"));
			this.auto_obj = "";
			this.imgType1 = '';
			this.startX = 0;
			this.startY = 0;
			this.moveX = 0;
			this.moveY = 0;
			this.leftMove = false;
			this.rightMove = false;
			this.slideCnt = $(this).find(".sld-num-cur");
			this.slideTot = $(this).find(".sld-num-tot");

			if($(this).attr("limited") != ""){
				this.limited = true;
				this.auto = false;
			}else{
				this.limited = false;
			}
			this.pClick =  true;
			this.pImg = 0;

			if(this.totalCnt <= 1) {
				this.prev.hide();
				this.next.hide();
				return false;
			}

			for(var k=0;k < this.totalCnt;k++){
				this.pasing_wrap.append('<span></span>');
			}

			this.pasing = this.pasing_wrap.children();

			this.slideTot.text(this.totalCnt);

			if(this.limited) this.prev.css("opacity",0.4);

			this.prev.on('click',function() {
				_this.action(-1);
			});

			this.next.on('click',function() {
				_this.action(1);
			});

			this.list.on("touchstart", function(e) {
				_this.stopAuto();
				_this.leftMove = false;
				_this.rightMove = false;
				if(e.type == "touchstart" && e.originalEvent.touches.length <= 1) {
					_this.startX = e.originalEvent.touches[0].pageX;
					_this.startY = e.originalEvent.touches[0].pageY;
				}
			});

			this.list.on("touchmove", function(e) {
				if(e.type == "touchmove" && e.originalEvent.touches.length <= 1){
					_this.moveX = e.originalEvent.touches[0].pageX - _this.startX;
					_this.moveY = e.originalEvent.touches[0].pageY - _this.startY;

					if(_this.moveX > 20){
						_this.leftMove = true;
						_this.rightMove = false;
					}
					
					if (_this.moveX < -20){
						_this.leftMove = false;
						_this.rightMove = true;
					}
				}
			});

			this.list.on("touchend", function(e) {
				if(_this.leftMove){
					_this.action(-1);
				}

				if(_this.rightMove){
					_this.action(1);
				}

				if(_this.auto) _this.autoAction();
			});

			$(this).find(".ctr-btn").on("mouseenter",function() {
				_this.stopAuto();
			});

			$(this).find(".ctr-btn").on("mouseleave",function() {
				_this.autoAction();
			});

			this.pause.on("click",function() {
				if($(this).hasClass("paused")){
					_this.auto = true;
					_this.autoAction();
					$(this).removeClass("paused");
				}else{
					_this.auto = false;
					_this.stopAuto();
					$(this).addClass("paused");
				}
			});

			if(this.auto) {
				this.autoAction();
				this.limited = false;
			}

			if(this.pasing.length > 0){
				this.pImg = this.pasing.eq(0).find("img").length;
				if(this.pImg > 0){
					var img_length1 = this.pasing.eq(0).find("img").attr("src").length - 3;
					this.imgType1 = this.pasing.eq(0).find("img").attr("src").substr(img_length1 , 3);
					this.pasing.eq(0).find("img").attr("src", this.pasing.eq(0).find("img").attr("src").replace("."+this.imgType1,"_on."+this.imgType1));
				}

				this.pasing.eq(0).addClass("on");

				this.pasing.click(function() {
					var dc = 1;
					if(_this.order <= $(this).index()){
						dc = 1;
					}else{
						dc = -1;
					}
					_this.action(dc, $(this).index());
				});
			}
		},

		action : function(d, pNum) {
			var _this = this;

			if(pNum == this.order) return false;
			if($(this).find(":animated").length >= 1) return false;
			

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

			if(!$(this).hasClass("fade-type")){

					this.list.eq(this.order).css({"transition-duration":""+this.speed+"s", "margin-left":-d*100+"%", "z-index":1}).stop().animate({"tabindex":100},this.speed*1000, function() {
						$(this).css({"transition-duration":"0s", "position" : "absolute","top" : 0, "left" : "100%","margin-left":0, "z-index":1});
					});

				}else{
					this.list.eq(this.order).stop().animate({"tabindex":100},this.speed*1000, function() {
						$(this).css({"transition-duration":"0s", "position" : "absolute","top" : 0, "left" : "100%","opacity":0, "z-index":1});
					});
				}

			

			if(d == 1){
				if(this.order >= this.totalCnt - 1){
					this.order = -1;
				}
				
				if(pNum >= 0){
					this.next_order = pNum;
				}else{
					this.next_order = this.order + 1;
				}

				if(!$(this).hasClass("fade-type")){

					this.list.eq(this.next_order).css({"transition-duration":""+this.speed+"s", "margin-left":"-100%","z-index":2}).stop().animate({"tabindex":0},this.speed*1000, function() {
						$(this).css({"transition-duration":"0s", "left":"auto", "position":"relative", "margin-left":0});
						if(pNum >= 0){
							_this.order = pNum;
						}else{
							_this.order++;
						}

						//콜백 함수
						_this.actionCallBack();
					});

				}else{
					this.list.eq(this.next_order).css({"transition-duration":""+this.speed+"s", "left":0, "opacity":1,"z-index":2}).stop().animate({"tabindex":0},this.speed*1000, function() {
						$(this).css({"transition-duration":"0s", "left":"auto", "position":"relative", "z-index":1});
						if(pNum >= 0){
							_this.order = pNum;
						}else{
							_this.order++;
						}

						//콜백 함수
						_this.actionCallBack();
					});
				}

				
			}else{
				if(pNum >= 0){
					this.next_order = pNum;
					this.order = pNum;
				}else{
					this.next_order = this.order - 1;

					if(this.order <= 0){
						this.next_order = this.totalCnt - 1;
						this.order =  this.totalCnt - 1;
					}else{
						this.order--;
					}
				}

				if(!$(this).hasClass("fade-type")){

					this.list.eq(this.next_order).css({"transition-duration":""+this.speed+"s", "left":"-100%","margin-left":"100%"}).stop().animate({"tabindex":0}, this.speed*1000, function() {
						$(this).css({"transition-duration":"0s", "left":"auto", "position":"relative", "margin-left":0, "z-index":1});
						_this.pClick = true;
						//콜백 함수
						_this.actionCallBack();
					});

				}else{

					this.list.eq(this.next_order).css({"transition-duration":""+this.speed+"s", "left":0,"opacity":1,"z-index":2}).stop().animate({"tabindex":0}, this.speed*1000, function() {
						$(this).css({"transition-duration":"0s", "left":"auto", "position":"relative", "z-index":1});
						_this.pClick = true;
						//콜백 함수
						_this.actionCallBack();
					});

				}

			}

			if(this.pasing.length > 0){
				this.pasing.each(function(n) {
					if(_this.next_order == n){
						$(this).addClass("on");
						if(_this.pImg > 0){
							if($(this).find("img").attr("src").indexOf("_on") == -1){
								$(this).find("img").attr("src", $(this).find("img").attr("src").replace("."+_this.imgType1,"_on."+_this.imgType1));
							}
						}
					}else{
						$(this).removeClass("on");
						if(_this.pImg > 0) $(this).find("img").attr("src", $(this).find("img").attr("src").replace("_on."+_this.imgType1,"."+_this.imgType1));
					}
				});
			}

			this.slideCnt.text(this.next_order + 1); // 페이지 숫자 표시 태그 클래스 .sld-num-cur
		},

		autoAction : function() {
			var _this = this;
			_this.stopAuto();
			if(this.auto){
				this.auto_obj = setInterval(function() {
					_this.action(1);
				},_this.interval_time);
			}
		},

		stopAuto : function() {
			clearInterval(this.auto_obj);
		},

		actionCallBack : function() {
			var _this = this;
			
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
/* // contents slide */

