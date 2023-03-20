/*
* Slide 베너 스크립트
* PC, 모바일 공통 사용 가능
* 작성자 : 김승규
*/
(function($){
	$.fn.slide_common = function (settings) {
		settings = jQuery.extend({
			auto : false,
			btn_prev : null,
			btn_next : null,
			btn_pasing : null,
			list : null,
			speed : 800,
			interval : 2000,
			loop : true
		}, settings);

		var opts = [];
		opts = $.extend({}, $.fn.slide_common.defaults, settings);

		return this.each(function () {

			var _this = this;

			$.fn.extend(this, slide_common);
			this.opts = opts;
			_this.init();	
		});
	};
	var slide_common = {
		init : function(){
			var _this =  this;
			this.list_wrap = $(this).children(":first-child");
			this.list = this.list_wrap.children();
			this.totalCnt = this.list.length;
			this.prev = $(this).find(".image_slide_left");
			this.next = $(this).find(".image_slide_right");
			this.pasing_wrap = $(this).find(".image_slide_btns");
			this.pasing = this.pasing_wrap.children();
			this.order = 0;
			this.next_order = 0;
			this.stop = false;
			this._auto = this.opts.auto;
			this._speed = this.opts.speed;
			this.interval_time = this.opts.interval_time;
			this.auto_obj = "";
			this.imgType1 = '';
			this.loop = this.opts.loop;
			this.leftMove = true;
			this.rightMove = true;
			this.list_wrap.css({
				"position" : "relative",
				"overflow" : "hidden"
			});

			try{
				this.list_wrap.prepend(this.list.eq(0).clone().css("visibility","hidden"));
			}catch(e){}
			
			this.list.each(function(n) {
				$(this).css({
						"position" : "absolute",
						"top" : 0,
						"width" : "100%",
						"backgroundColor" : "#fff"
					});
				if(n == 0){
					$(this).css("left",0);
				}else{
					$(this).css("left","100%");
				}
			});

			this.pasing.css("cursor","pointer");
			if(this.list.length <= 1) {
				this.next.hide();
				this.prev.hide();
				this.pasing.hide();
				return false;
			}

			if(this.loop){
				this.prev.bind("click", function() {
					_this.action(-1, false);
				});
			}else{
				this._auto =  false;
				this.prev.css("opacity",0.3);
				this.leftMove = false;
			}

			this.next.bind("click", function() {
				_this.action(1, false);
			});

			

			this.next.bind("mouseenter", function() {
				_this.stopAuto();
			});

			this.prev.bind("mouseleave", function() {
				_this.autoRolling();
			});

			$(this).bind("mouseenter",function() {
				_this.stopAuto();
			});

			$(this).bind("mouseleave",function() {
				_this.autoRolling();
			});

			this.pasing_wrap.bind("mouseenter",function() {
				_this.stopAuto();
			});

			this.pasing_wrap.bind("mouseleave",function() {
				_this.autoRolling();
			});

			$(this).on("touchstart", function(e) {
				_this.stopAuto();
				if(e.type == "touchstart" && e.originalEvent.touches.length <= 1) {
					this.startX = e.originalEvent.touches[0].pageX;
					this.startY = e.originalEvent.touches[0].pageY;
				}
			});

			$(this).on("touchmove", function(e) {
				if(e.type == "touchmove" && e.originalEvent.touches.length <= 1){
					this.moveX = e.originalEvent.touches[0].pageX - this.startX;
					this.moveY = e.originalEvent.touches[0].pageY - this.startY;
					if(this.moveX > 10 && this.leftMove){
						this.action(-1, false);	
					}else if (this.moveX < -10 && this.rightMove){
						this.action(1, false);
					}
				}
			});

			$(this).on("touchend", function(e) {
				_this.autoRolling();
			});

			if(this.pasing.length != 0){
				var img_length1 = this.pasing.eq(0).find("img").attr("src").length - 3;
				this.imgType1 = this.pasing.eq(0).find("img").attr("src").substr(img_length1 , 3);

				this.pasing.bind("click", function() {
					if(!_this.stop){
						_this.next_order = $(this).index();
						if(_this.order == $(this).index()){
							return false;
						}else if(_this.order > $(this).index()){
							_this.action(-1, true);
						}else{
							_this.action(1, true);
						}
					}
				});
				try{
					this.pasing.eq(0).find("img").attr("src", this.pasing.eq(0).find("img").attr("src").replace("."+this.imgType1,"_on."+this.imgType1));
				}catch(e){}
			}

			this.autoRolling();
		},

		action : function(direction, pClick) {
			var _this = this;
			if(!this.stop){
				this.stop = true;
				if(!pClick){
					if(direction == 1){
						if(!this.loop){
							_this.prev.css("opacity",1.0);
							_this.prev.bind("click", function() {
								_this.action(-1, false);
							});
							_this.leftMove = true;
						}

						if(_this.order >= _this.totalCnt - 1){
							_this.next_order = 0;
						}else{
							_this.next_order = _this.order + direction*1;
						}
						
						if(_this.next_order >= _this.totalCnt - 1){
							if(!this.loop){
								_this.next.css("opacity",0.3);
								_this.next.unbind('click');
								_this.rightMove = false;
							}
						}
					}else if(direction == -1){
						if(!this.loop){
							_this.next.css("opacity",1.0);
							_this.next.bind("click", function() {
								_this.action(1, false);
							});
							_this.rightMove = true;
						}
						if(_this.order <= 0){
							_this.next_order = _this.totalCnt - 1;
						}else{
							_this.next_order = _this.order + direction*1;
						}

						if(_this.next_order <= 0){
							if(!this.loop){
								_this.prev.css("opacity",0.3);
								_this.prev.unbind('click');
								_this.leftMove = false;
							}
						}
					}
				}else{
					if(!this.loop){
						if(direction == 1){
							_this.prev.css("opacity",1.0);
							_this.prev.bind("click", function() {
								_this.action(-1, false);
							});
							
							if(_this.next_order >= _this.totalCnt - 1){
								_this.next.css("opacity",0.3);
								_this.next.unbind('click');
							}
						}else if(direction == -1){
							_this.next.css("opacity",1.0);
							_this.next.bind("click", function() {
								_this.action(1, false);
							});


							if(_this.next_order <= 0){
								_this.prev.css("opacity",0.3);
								_this.prev.unbind('click');
							}
						}
					}
				}

				this.list.eq(this.order).stop().animate({"left" : (-direction*100)+"%"},this._speed,function() {
					$(this).css("left",(direction*100)+"%");
				});

				this.list.eq(this.next_order).css("left", (direction*100)+"%").stop().animate({"left" : "0%"},this._speed,function() {
					_this.stop = false;
					_this.order = _this.next_order;
				});

				if(this.pasing.length != 0){
					this.pasing.each(function(n){
						if(n  == _this.next_order){
							$(this).find("img").attr("src", $(this).find("img").attr("src").replace("."+_this.imgType1,"_on."+_this.imgType1));
							$(this).addClass("on");
						}else{
							$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_on."+_this.imgType1,"."+_this.imgType1));
							$(this).removeClass("on");
						}
					});
				}

				this.actionCallBack();
			}
		},

		autoRolling : function() {
			var _this = this;
			if(this._auto){
				this.auto_obj = setInterval(function() {
					_this.action(1, false);
				},_this.interval_time);
			}
		},

		stopAuto : function() {
			clearInterval(this.auto_obj);
		},

		actionCallBack : function() {
			// 스라이드 액션 후 실행 함수
			// this.order 현재 페이지 숫자
			// this.next_order 다음 페이지 숫자
		}
	};
})(jQuery);

/*
* 레코벨 함수 설명
* 
* 유형 1 (selectRBAPI -> selectRBPrdList) -> some funciton(callback)
* 1. 파라미터 (조회할 코드, 상품번호, 카테고리번호 등등)로 레코벨 API를 호출한다. (selectRBAPI)
* -> 2. jsonp로 받은 상품번호로 한샘몰의 상품을 조회한다. (selectRBPrdList)
* -> 3. callback 실행
* 
* 유형 2 productGrid -> (selectRBAPI -> selectRBPrdList) -> productRelGrid
* 1. 파라미터 (상품번호)로 한샘몰의 상품을 조회한다. (productGrid)
* -> 2. 조회한 상품으로 레코벨 API를 호출한다. (selectRBPrdList)
* -> 3. callback 함수인 productRelGrid 실행
*  
* 파라미터 설명
* rb_type			: 조회할 유형 [API 호출시 필수값]
* format			: ajax 호출 후 리턴 받을 유형 (json, jsonp) [API 호출시 필수값]
* size				: 리턴받을 상품 갯수 [API 호출시 필수값]
* page				: html 슬라이드시 보여줄 page
* row_list			: html 슬라이드시 보여줄 한 page의 노출 갯수
* img_size			: html 이미지 사이즈
* rccode			: 레코벨에 Logger를 전달하기 위한 코드(임의로 생성 : SEAR001_S001)
* st				: 검색어
* gridObj			: html 슬라이드를 포함한 html element
* fn_empty_prd		: 결과가 없거나 최소갯수의 결과보다 적을때 callback 함수
* fn_empty_prd_rel	: 결과가 없거나 최소갯수의 결과보다 적을때 callback 함수
* fn_second_prd_rel	: 결과가 없거나 최소갯수의 결과보다 적을때 보완재 혹은 대체재 callback 함수
* fn_complete		: 실행후 마지막 callback 함수
* callback			: selectRBAPI -> selectRBPrdList 후에 실행되는 callback 함수
*/

/*
* 레코벨 API 호출하여 상품번호를 가져온다
* PC, 모바일 공통 사용
* 작성자 : 이상필
*/
function selectRBAPI(settings) {
	try {
		var protocal = "http://";
		if (document.location.protocol === "https:") { protocal = "https://"; }

		setTimeout(function() {
			if (settings.rb_type === "a001" || settings.rb_type === "a002" || settings.rb_type === "a003" || settings.rb_type === "a005" || settings.rb_type === "a062") {
				
				if (settings.iids != "") {

					var ajaxData = {cuid : '26703490-8b5d-420c-b95a-39bfd7a6e9f1', format : settings.format, size : settings.size, iids : settings.iids, callback : ''}
					if (typeof settings.cps != "undefined") { // 방어로직 여부(true,false)
						ajaxData.cps = settings.cps;
					}
					if (typeof settings.cpt != "undefined") { // 방어로직 종류(m001~004, t001)
						ajaxData.cpt = settings.cpt;
					}
					
					$.ajax({
						url: protocal + 'api.eigene.io/rec/'+ settings.rb_type,
						type: 'post',
						data: ajaxData,
						dataType : 'jsonp',
						async : false,
						cache : false,
						success: function(json) {
							var gdsNo = "";
							for(var i=0; i < json.results.length ;i++) {
								(gdsNo === "") ? gdsNo = json.results[i].itemId : gdsNo += "," + json.results[i].itemId;
							}
							settings.gdsNo = gdsNo;
							selectRBPrdList(settings);
						},
						error: function(xhr, textStatus, errorThrown){
						}
					});
				}
			}

			if (settings.rb_type === "s001") {
				
				var ajaxData = {cuid : '26703490-8b5d-420c-b95a-39bfd7a6e9f1', format : settings.format, size : settings.size, st : settings.st, callback : ''}
				if (typeof settings.cps != "undefined") { // 방어로직 여부(true,false)
					ajaxData.cps = settings.cps;
				}
				if (typeof settings.cpt != "undefined") { // 방어로직 종류(m001~004, t001)
					ajaxData.cpt = settings.cpt;
				}
				
				$.ajax({
					url: protocal + 'api.eigene.io/rec/'+ settings.rb_type,
					type: 'post',
					data: ajaxData,
					dataType : 'jsonp',
					async : false,
					cache : false,
					success: function(json) {
						var gdsNo = "";
						for(var i=0; i < json.results.length ;i++) {
							(gdsNo === "") ? gdsNo = json.results[i].itemId : gdsNo += "," + json.results[i].itemId;
						}
						settings.gdsNo = gdsNo;
						selectRBPrdList(settings);
					},
					error: function(xhr, textStatus, errorThrown){
					}
				});
			}

			if (settings.rb_type === "c001") {
				$.ajax({
					url: protocal + 'api.eigene.io/rec/'+ settings.rb_type,
					type: 'post',
					data: {cuid : '26703490-8b5d-420c-b95a-39bfd7a6e9f1', format : settings.format, size : settings.size, cids : settings.ctgNo, callback : ''},
					dataType : 'jsonp',
					async : false,
					cache : false,
					success: function(json) {
						var gdsNo = "";
						for(var i=0; i < json.results.length ;i++) {
							(gdsNo === "") ? gdsNo = json.results[i].itemId : gdsNo += "," + json.results[i].itemId;
						}
						settings.gdsNo = gdsNo;
						selectRBPrdList(settings);
					},
					error: function(xhr, textStatus, errorThrown){
					}
				});
			}

			if (settings.rb_type === "t001" || settings.rb_type === "m002" || settings.rb_type === "m003" || settings.rb_type === "m004") {

				var d = new Date();
				var s =
					leadingZeros(d.getFullYear(), 4) + '-' +
					leadingZeros(d.getMonth() + 1, 2) + '-' +
					leadingZeros(d.getDate(), 2) + 'T' +
					leadingZeros(d.getHours(), 2) + ':' +
					leadingZeros(d.getMinutes(), 2) + ':' +
					leadingZeros(d.getSeconds(), 2) + 'Z';
				$.ajax({
					url: protocal + 'api.eigene.io/rec/'+ settings.rb_type,
					type: 'post',
					data: {cuid : '26703490-8b5d-420c-b95a-39bfd7a6e9f1', format : settings.format, size : settings.size, cids : settings.ctgNo, date : s,  callback : ''},
					dataType : 'jsonp',
					async : false,
					cache : false,
					success: function(json) {
						var gdsNo = "";
						for(var i=0; i < json.results.length ;i++) {
							(gdsNo === "") ? gdsNo = json.results[i].itemId : gdsNo += "," + json.results[i].itemId;
						}
						settings.gdsNo = gdsNo;
						selectRBPrdList(settings);
					},
					error: function(xhr, textStatus, errorThrown){
					}
				});
			}

			if (settings.rb_type === "m002") {
				$.ajax({
					url: protocal + 'api.eigene.io/rec/'+ settings.rb_type,
					type: 'post',
					data: {cuid : '26703490-8b5d-420c-b95a-39bfd7a6e9f1', format : settings.format, size : settings.size, callback : ''},
					dataType : 'jsonp',
					async : false,
					cache : false,
					success: function(json) {
						var gdsNo = "";
						for(var i=0; i < json.results.length ;i++) {
							(gdsNo === "") ? gdsNo = json.results[i].itemId : gdsNo += "," + json.results[i].itemId;
						}
						settings.gdsNo = gdsNo;
						selectRBPrdList(settings);
					},
					error: function(xhr, textStatus, errorThrown){
					}
				});
			}
			
			if (settings.rb_type === "m001") {
				$.ajax({
					url: protocal + 'api.eigene.io/rec/'+ settings.rb_type,
					type: 'post',
					data: {cuid : '26703490-8b5d-420c-b95a-39bfd7a6e9f1', format : settings.format, size : settings.size, callback : ''},
					dataType : 'jsonp',
					async : false,
					cache : false,
					success: function(json) {
						var gdsNo = "";
						for(var i=0; i < json.results.length ;i++) {
							(gdsNo === "") ? gdsNo = json.results[i].itemId : gdsNo += "," + json.results[i].itemId;
						}
						settings.gdsNo = gdsNo;
						selectRBPrdList(settings);
					},
					error: function(xhr, textStatus, errorThrown){
					}
				});
			}
		}, 0);
	} catch (e) {
	}
}

/*
* 상품번호로 한샘몰의 상품정보를 가져온다.
* PC, 모바일 공통 사용
* 작성자 : 이상필
*/
function selectRBPrdList(settings) {
	if (settings.callback.name == "gridVideoLayerGoods") { //모바일 메인 연관상품 조회
		settings.gdsNo = (settings.gdsNo == "" ? settings.iids : settings.gdsNo +","+ settings.iids);
	}

	$.ajax({
		url: "/goods/prdListForRecobellAjax.do",
		type: 'post',
		cache: false,
		dataType : 'json',
		data:{gdsno : settings.gdsNo, ctgNo : settings.ctgNo, img_size : settings.img_size },
		contentType:'application/x-www-form-urlencoded; charset=UTF-8',
		error: function(xhr, textStatus, error){
		}, success: function(result) {
			settings.result = result;
			if (typeof settings.callback === "function") { settings.callback(settings) };
		}
	});
}

/**
 * (PC POPUP)
 * 장바구니 담기 완료 팝업에 추천영역 노출하기
 * 2022-02-16,ghoney
 */
function openAddCartComplete(settings) {
	// 기존에 사용했던 dim 이 없어지지 않는 현상이 있어서 기존dim을 없애준다.  
	if($(".ui-modal-dim").length > 0 && $(".ui-modal-dim").is(":visible")) {
		$( "#ui-modal-area, #ui-modal-area .ui-modal-dim" ).css( "display", "none" );
	}
	
	$("#alert-pop3 .alert-cont").html("장바구니에 상품을 담았습니다.");
	$("#alert-pop3 #confirmOk3").text("장바구니 보기");
	$("#alert-pop3 #confirmCancel3").text("쇼핑 계속하기");
	
	var page = settings.page;
	var row_list = settings.row_list;
	var gridObj = settings.gridObj;
	var json_temp = eval(settings.result);

	var arr = settings.gdsNo.split(","), gds_cnt = 1;
	var json = [];
	var html = "";
	html += '<ul class="ui-sld-view">';

	var priceTxt = "";
	var minPrice = "";
	var maxPrice = "";
				
	//우선순위 정렬
	for(var j=0; j < arr.length; j++) {
		for(var i=0; i < json_temp.data.length; i++) {
			if (json_temp.data[i].gdsStatCd === "N" && Number(arr[j]) === Number(json_temp.data[i].gdsNo) && gds_cnt <= (page * row_list)) {
				json.push(json_temp.data[i]);
				gds_cnt++;
			}
		}
	}
	//row_list 갯수보다 적으면 영역을 감춘다.
	if (json.length < row_list) {
		if (typeof settings.fn_empty_prd === "function") { settings.fn_empty_prd(); }
	} else {
		for(var i=0; i < json.length ;i++) {
			if (i <= (page * row_list) - 1) {
				if(i % row_list === 0){
					html += '<li class="ui-sld-list">'
						+ '<div class="pthumb-list">'
						+	'<ul>';
				}
				
				//가격
				priceTxt = '';
				minPrice = json[i].couponPrc;
				maxPrice = json[i].normalSalePrc; 
				
				if (parseInt(json[i].dcPrc, 10) < parseInt(json[i].couponPrc, 10)) {
					minPrice = parseInt(json[i].dcPrc, 10);
				}
				
				html += '	<li>'
					+ '			<div class="pthumb">'
					+ '				<div class="pthumb-img">'
					+ '					<a href="/goods/goodsDetailMall.do?gdsNo='+ json[i].gdsNo +'&rccode='+ settings.rccode +'&goodsdetail=with_goods" target="_blank" title="새창열림"">'
					+ '						<img class="js-lazy" src="/resources/images/common/blank.gif" data-lazy="'+ json[i].imgPathL +'" onerror="this.src=\'/resources/images/common/noimage/04_128x128.jpg\'" alt="'+ json[i].gdsNm +'" width="128" height="128">'
					+ '					</a>'
					+ '				</div>'
					+ '				<a class="pthumb-name" href=""/goods/goodsDetailMall.do?gdsNo='+ json[i].gdsNo +'&rccode='+ settings.rccode +'&goodsdetail=with_goods" target="_blank" title="새창열림"">'
					+ '					<div class="pthumb-brand">'+json[i].brandNm+'</div>'
					+ '					<div class="pthumb-prd">'+ json[i].gdsNm +'</div>'
					+ '				</a>'
					+ '				<div class="pthumb-prc">'
					+ '					<div class="pthumb-cur">'+ Common.GetNumberFormat(minPrice) +'원</div>';
				if (minPrice < maxPrice) {
					// percent = Math.ceil(100 - (minPrice / maxPrice) * 100);
					percent = Math.round(((maxPrice - minPrice) / maxPrice + Number.EPSILON) * 100);
					html += '			<div class="pthumb-sale">'+ Common.GetNumberFormat(maxPrice) +'원</div>'
					+ '					<div class="pthumb-rate">'+percent+'<span class="unit">%</span></div>';
				}
					html += '				</div>'
					+ '			</div>'
					+ '		</li>	';			
				if((i+1) % row_list === 0 && i>0 || (i+1) === json.length){
					html += '		</ul>'
						+ '		</div>'
						+ '</li>';
				}
			}
		}
		html += '</ul>'
			+	'<a href="javascript:;" class="ui-sld-prev ctr-btn">이전 보기</a>'
			+	'<a href="javascript:;" class="ui-sld-next ctr-btn">다음 보기</a>';
		gridObj.empty();
		gridObj.html(html);
		
		if (typeof settings.fn_complete === "function") { settings.fn_complete(); }

		setTimeout(function(){
			$("#recomGoodsList").removeClass("onAct");
			$("#recomGoodsList").uiSld();
		}, 500);
		page = null, row_list = null, json_temp = null, arr = null, gds_cnt = null, json = null, html = null, priceTxt = null, minPrice = null, maxPrice = null;
	}
	
	popOpen('alert-pop3');
	
	var deferred = new $.Deferred();
	$("#alert-pop3 #confirmOk3").off('click').on('click', function (e) {
		location.href = "/order/goCart.do";
    });
	
	$("#alert-pop3 #confirmCancel3").off('click').on('click', function (e) {
		deferred.reject(); // 취소버튼 클릭시 .fail 이 호출됨
    });
	
	$("#alert-pop3 .pop-close").off('click').on('click', function (e) {
		deferred.reject(); // X버튼 클릭시 .fail 이 호출됨
    });
	return deferred.promise();
}

/**
 * (MOBILE POPUP)
 * 장바구니 담기 후 callback으로 호출되는 팝업
 * 장바구니 이동 confirm 및 추천상품 영역 노출
 */
function openAddCartCompletePopup(settings){
	var page = settings.page;
	var row_list = settings.row_list;
	var gridObj = settings.gridObj;
	var json_temp = eval(settings.result);

	var arr = settings.gdsNo.split(","), gds_cnt = 1;
	var json = [];
	var html = "";
	html += '<div class="ui-list-items">';

	var priceTxt = "";
	var minPrice = "";
	var maxPrice = "";
	
	if(appMaxPrice > appMinPrice) {
		// appPercent = Math.ceil(100 - (appMinPrice / appMaxPrice) * 100);
		appPercent = Math.round(((appMaxPrice - appMinPrice) / appMaxPrice + Number.EPSILON) * 100);
	}
				
	//우선순위 정렬
	for(var j=0; j < arr.length; j++) {
		for(var i=0; i < json_temp.data.length; i++) {
			if (json_temp.data[i].gdsStatCd === "N" && Number(arr[j]) === Number(json_temp.data[i].gdsNo) && gds_cnt <= (page * row_list)) {
				json.push(json_temp.data[i]);
				gds_cnt++;
			}
		}
	}
	//row_list 갯수보다 적으면 영역을 감춘다.
	if (json.length < row_list) {
		if (typeof settings.fn_empty_prd === "function") { settings.fn_empty_prd(); }
	} else {
		html += '<ul class="scroll-list-dp">';
		for(var i=0; i < json.length ;i++) {
			if (i <= (page * row_list) - 1) {
				//가격
				priceTxt = '';
				minPrice = json[i].couponPrc;
				maxPrice = json[i].normalSalePrc; 
				
				if (parseInt(json[i].dcPrc, 10) < parseInt(json[i].couponPrc, 10)) {
					minPrice = parseInt(json[i].dcPrc, 10);
				}
				
				//APP 가격
				var appMinPrice = json[i].moAppCouponPrc;
				var appMaxPrice = json[i].normalSalePrc;
				var appPercent = 0;		
				if(appMaxPrice > appMinPrice) {
					// appPercent = Math.ceil(100 - (appMinPrice / appMaxPrice) * 100);
					appPercent = Math.round(((appMaxPrice - appMinPrice) / appMaxPrice + Number.EPSILON) * 100);
				}		

				html += '	<li>'
					+ '			<div class="prd-view">'
					+ '				<a class="prd-info-link" href="/goods/goodsDetailMall.do?gdsNo='+ json[i].gdsNo +'&rccode='+ settings.rccode +'&goodsdetail=with_goods">'
					+ '					<div class="prd-img prd-img-on">'
					+ '						<div class="thumb"><img class="js-lazy" src="/resources/images/common/blank.gif" data-lazy="'+ json[i].imgPathL +'" onerror="this.src=\'/resources/images/common/noimage/04_128x128.jpg\'" alt="'+ json[i].gdsNm +'"></div>';

				if ( json[i].badgeImgPath_1 ) {
					html += '				<span class="superflag"><img src="' + json[i].badgeImgPath_1 + '"></span>';
				} 

				html += '				</div>'
					+ '					<div class="prd-info">'
					+ '						<div class="prd-brand"><div class="brand-name">'+json[i].brandNm+'</div></div>'
					+ '						<div class="prd-name"><div class="prd-name-txt">'+ json[i].gdsNm +'</div></div>'
					+ '					<div class="prd-prc">';

				// MOWEB
				if(json[i].prcViewTypCd == "A" || json[i].prcViewTypCd == "B") {	//평/m당 단가인 경우 XXX만원으로 표시
					html += '	    	<div class="prd-prc-cur">'+ Common.GetNumberFormat((json[i].normalSalePrc > json[i].moWebCouponPrc ? json[i].unitDcPricePerSqureMeter : json[i].unitNormalPricePerSqureMeter));
					if(json[i].unitNm != "") html += '<span class="unit">' + json[i].unitNm;
				} else if(json[i].prcViewTypCd == "Z") {		//견적 상담인 경우
					html += '	    	<div class="prd-prc-cur"><strong class="consulting">견적 상담</strong>';
				} else {
					html += '	    	<div class="prd-prc-cur">'+ Common.GetNumberFormat(json[i].moWebCouponPrc);
					if(json[i].unitNm != "") html += '<span class="unit">' + json[i].unitNm;
				}
				if(json[i].unitNm != "") {
					html += '			</span>';
				}
				html += '	    	</div>\n';

				if(json[i].normalSalePrc > json[i].moWebCouponPrc && json[i].prcViewTypCd != "Z") {
					html += '	    <div class="prd-rate">'+ json[i].dcRate +'<span class="unit">%</span></div>\n';
					if(json[i].prcViewTypCd == "A" || json[i].prcViewTypCd == "B") {
						html += '	<div class="prd-prc-market">'+ Common.GetNumberFormat(json[i].unitNormalPricePerSqureMeter) +'<span class="unit">만원대</span></div>\n';
					} else {1
						html += '	<div class="prd-prc-market">'+ Common.GetNumberFormat(json[i].normalSalePrc) +'</div>\n';
					}
				}

				// MOAPP
				html += '	    	<div class="prd-prc app-prc">\n';
				if(json[i].prcViewTypCd == "A" || json[i].prcViewTypCd == "B") {		//평/m당 단가인 경우 XXX만원으로 표시
					html += '	    	<div class="prd-prc-cur">'+ Common.GetNumberFormat((json[i].normalSalePrc > json[i].moAppCouponPrc ? json[i].unitDcPricePerSqureMeter : json[i].unitNormalPricePerSqureMeter));
					if(json[i].unitNm != "") html += '<span class="unit">' + json[i].unitNm;
				} else if(json[i].prcViewTypCd == "Z") {		//견적 상담인 경우
					html += '	    	<div class="prd-prc-cur"><strong class="consulting">견적 상담</strong>';
				} else {
					html += '	    	<div class="prd-prc-cur">'+ Common.GetNumberFormat(json[i].moAppCouponPrc);
					if(json[i].unitNm != "") html += '<span class="unit">' + json[i].unitNm;
				}
				if (json[i].dealGoodsYN == "Y" || json[i].dealGoodsYN == "1") {
					html += '~';
				}
				if(json[i].unitNm != "") {
					html += '			</span>';
				}
				html += '	    	</div>\n';

				if(json[i].normalSalePrc > json[i].moAppCouponPrc > 0 && json[i].prcViewTypCd != "Z") {
					html += '	    <div class="prd-rate">'+ json[i].dcRate +'<span class="unit">%</span></div>\n';
					if(json[i].prcViewTypCd == "A" || json[i].prcViewTypCd == "B") {
						html += '	<div class="prd-prc-market">'+ Common.GetNumberFormat(json[i].unitNormalPricePerSqureMeter) +'<span class="unit">만원대</span></div>\n';
					} else {
						html += '	<div class="prd-prc-market">'+ Common.GetNumberFormat(json[i].normalSalePrc) +'</div>\n';
					}
				}


				html + '				</div>'
					+ '				</a>'
					+ '			</div>'
					+ '		</li>';
			}
		}
		html += '	</ul>';
		gridObj.empty();
		gridObj.html(html);
		
		if (typeof settings.fn_complete === "function") { settings.fn_complete(); }

		setTimeout(function(){
			
			
		}, 500);
		page = null, row_list = null, json_temp = null, arr = null, gds_cnt = null, json = null, html = null, priceTxt = null, minPrice = null, maxPrice = null;
	}
	
	
	popup_openV1("cart-layer");
}


	
function newProductRelGrid(settings) {
	var html = "";
	var page = settings.page;
	var row_list = settings.row_list;
	var gridObj = settings.gridObj;
	var json_temp = eval(settings.result); // 한샘몰 상품목록
	var arr = settings.gdsNo.split(","); // 레코벨 api 호출결과(상품번호)
	var gds_cnt = 1;
	var json = [];
	
	// ex) 레코벨에서 12건 조회 후, 한샘몰 상품결과가 9건만 조회될시엔 9건만 노출된다.
	for(var j=0; j < arr.length; j++) {
		for(var i=0; i < json_temp.data.length; i++) {
			if (json_temp.data[i].gdsStatCd === "N" && Number(arr[j]) === Number(json_temp.data[i].gdsNo) && gds_cnt <= (page * row_list)) {
				json.push(json_temp.data[i]);
				gds_cnt++;
			}
		}
	}
	
	if (json.length === 0) {
		// 상품이 없을경우
	} else {
		for(var i=0; i < json.length ;i++) {
			if (settings.rccode == "MO_MCTGY003_A002") {
				html += newCtgRBGridPrd(json[i], settings.rccode, settings.channel, "");
			} else if (settings.rccode == "MO_MCTGY003_A005") {
				html += newCtgRBGridPrd(json[i], settings.rccode, settings.channel, "");
			} else if (settings.rccode == "MO_SEAR003_S001") { // 모바일 검색결과 없을시
				html += newRBGridPrd2(json[i], settings.rccode, settings.channel, "");
			} else if (settings.rccode.endsWith("_V3")) { // 2019 모바일개편(2022.12.19 현재 모바일 상품상세 하단의 함께 본 상품/함께 구매한 상품 두군데 사용중 - 김재욱)
				html += newRBGridPrd_V3(json[i], settings.rccode, settings.channel, "");
			} else if (settings.rccode == "MO_CART002_A003" || settings.rccode == "MO_ORDC001_A003") { // 장바구니 추천 상품 영역, 주문완료 추천 상품 영역
				html += newRBGridPrd_V4(json[i], settings.rccode, settings.channel, "");
			} else if (settings.rccode == "MO_CART002_A062" || settings.rccode == "MO_ORDC001_A062") { // 장바구니 추천 상품 영역, 주문완료 추천 상품 영역
				html += newRBGridPrd_V4(json[i], settings.rccode, settings.channel, "");
			} else if (settings.rccode == "MO_CART001_A005") { // 장바구니 일시품절 대체 상품 영역
				html += newRBGridPrd2(json[i], settings.rccode, settings.channel, "");
			}  else {
				html += newRBGridPrd(json[i], settings.rccode, settings.channel, "");
			}
		}
	}
	
	//스크랩 조회 - 2022.12.19 김재욱
	if(settings.rccode.endsWith("_V3") ||		//모바일 상품상세 함께 본 상품/함께 구매한 상품
		settings.rccode == "MO_CART002_A003" || settings.rccode == "MO_ORDC001_A003" ||		//장바구니 추천 상품 영역, 주문완료 추천 상품 영역
		settings.rccode == "MO_CART002_A062" || settings.rccode == "MO_ORDC001_A062"		//장바구니 추천 상품 영역, 주문완료 추천 상품 영역
		) {	
		wishGdsNoList();
	}
	
	if (settings.title !== "" && settings.title !== undefined) {
		gridObj.find(".suggest__head").html(settings.title);
	}
	
	if (gridObj.find(".c-grid--album").length > 0) {
		gridObj.find(".c-grid--album").empty();
		gridObj.find(".c-grid--album").html(html);
	} else if(settings.rccode == "MO_CART002_A003" || settings.rccode == "MO_ORDC001_A003") {
		gridObj.show();
		gridObj.find(".scroll-list-dp").empty();
		gridObj.find(".scroll-list-dp").html(html);
	} else if(settings.rccode == "MO_CART002_A062" || settings.rccode == "MO_ORDC001_A062") {
		gridObj.show();
		gridObj.find(".scroll-list-dp").empty();
		gridObj.find(".scroll-list-dp").html(html);
	} else if(settings.rccode == "MO_CART001_A005") {
		gridObj.show();
		gridObj.find(".prds-wrap").empty();
		gridObj.find(".prds-wrap").html(html);
	} else {
		gridObj.empty();
		gridObj.html(html);
	}

	if (typeof settings.fn_complete === "function") { settings.fn_complete(); }
}	
	

/*
* 상품번호로 한샘몰의 상품정보를 가져온다.
* PC, 모바일 공통 사용
* 2022.06.07 현재 사용처 없음. 하단의 RBGridPrd 메소드 내 퍼블을 PC용으로 교체함에 따라 모바일에서 이 함수를 사용하게 된다면 분기가 필요함 - 김재욱(MALLDVLPRJ-1670)
* 작성자 : 이상필
*/
function productRelGrid(settings) {
	var html = "";
	var page = settings.page;
	var row_list = settings.row_list;
	var gridObj = settings.gridObj;
	var json_temp = eval(settings.result);
	var arr = settings.gdsNo.split(","), gds_cnt = 1;
	var json = [];
	
	//우선순위 정렬
	for(var j=0; j < arr.length; j++) {
		for(var i=0; i < json_temp.data.length; i++) {
			if (json_temp.data[i].gdsStatCd === "N" && Number(arr[j]) === Number(json_temp.data[i].gdsNo) && gds_cnt <= (page * row_list)) {
				json.push(json_temp.data[i]);
				gds_cnt++;
			}
		}
	}
	if (json.length < row_list) {
		//대체제
		if (typeof settings.fn_second_prd_rel === "function") { settings.fn_second_prd_rel(); }
		//상품이 없을 경우
		if (typeof settings.fn_empty_prd_rel === "function") { settings.fn_empty_prd_rel(); }
	} else {
		if (json.length === 0) {
			html = '			<div class="no_result" style="width:906px;height:267px;">'
				+ '					<div class="no_result_txt">함께 구매하신 상품이 존재하지 않습니다.</div>'
				+ '				</div>';
		} else {
			
			for(var i=0; i < json.length ;i++) {
				if (i <= (page * row_list) - 1) {
					if (i === 0) {
						html += "<li class='image_slide_list'>"
							+ "		<div class='recom_cust_list'>";
					}
					
					html += RBGridPrd(json[i], settings.rccode, settings.channel);
					
					if ((i + 1) % row_list === 0 && i > 0 && i !== (page * row_list) - 1) {
						html += "	</div>"
							+ "	</li>"
							+ "	<li class='image_slide_list'>"
							+ "		<div class='recom_cust_list'>";
					}
				}
			}
			html += "				</div>"
				+ "				</li>";
		}

		html = '<div class="recom_cust">'
			+ '		<div class="recom_cust_wrap">'
			+ '			<div class="image_slide cust_image_slide">'
			+ '				<ul class="image_slide_view">'
			+ html
			+ '				</ul>'
			+ '				<a href="javascript:;" class="image_slide_left"><img src="/resources/images/common/btn_banner_rolling_left.gif" alt="이전상품보기" /></a>'
			+ '				<a href="javascript:;" class="image_slide_right"><img src="/resources/images/common/btn_banner_rolling_right.gif" alt="다음상품보기" /></a>'
			+ '			</div>'
			+ '		</div>'
			+ '	</div>';

		if (settings.title !== "" && settings.title !== undefined) {
			gridObj.find(".recom_title").html(settings.title);
		}
		gridObj.find(".recom_rel_view").empty();
		gridObj.find(".recom_rel_view").html(html);
		gridObj.find(".cust_image_slide").slide_common({
			speed : 400,
			interval_time : 4000,
			auto : false,
			loop : false
		});
		gridObj.show();
		if (typeof settings.fn_complete === "function") { settings.fn_complete(); }
		html = null, page = null, row_list = null, gridObj = null, json_temp = null, arr = null, gds_cnt = null, json = null;
	}
}

// PC 상품카드형 V4 html (2021.05.12 김동진)
function makePcGdsType1_V4(json, rccode, rankYn, gdsImgSize) {
	try {
		// 상품라벨
		var labelHtml = "<div class='pthumb-opt'>";
		var labelCnt = 0;
		if(json.nextDayBsYnFlag == "Y"){
			labelHtml += "<div class='popt medlv'><span class='medlv-tag'>내맘배송</span></div>";
			labelCnt++;
		}
		if(json.diyYnFlag == "Y"){
			labelHtml += "<div class='popt'>DIY</div>";
			labelCnt++;
		}
		if(json.preSaleYnFlag == "Y"){
			labelHtml += "<div class='popt'>사전판매</div>";
			labelCnt++;
		}
		if(json.newYnFlag == "Y" && labelCnt < 3){
			labelHtml += "<div class='popt'>신상품</div>";
			labelCnt++;
		}
		if(json.addSaleWebYnFlag == "Y" && labelCnt < 3){
			labelHtml += "<div class='popt'>추가할인</div>";
			labelCnt++;
		}
		if(json.giftYnFlag == "Y" && labelCnt < 3){
			labelHtml += "<div class='popt'>사은품</div>";
			labelCnt++;
		}
		if(json.lowPriceYnFlag == "Y" && labelCnt < 3){
			labelHtml += "<div class='popt'>최저가</div>";
			labelCnt++;
		}
		labelHtml += "</div>";

		var pthumbImgClass = "pthumb-img";
		if(labelCnt >= 1){
			pthumbImgClass += " img-on";
		} else {
			labelHtml = "";
		}
		
		var rankHtml = "";
		if(rankYn == "Y"){
			rankHtml = '<div class="prank">'+json.rNum+'</div>';
		}
		
		var gdsLink = "/goods/goodsDetailMall.do?gdsNo=" + json.gdsNo+"&rccode="+rccode;
		
		var brandNm = "";
		if (json.brandNm != '' && json.brandNm != null) {
			brandNm = json.brandNm;
		} else {
			brandNm = json.saleCorpNm;
		}
		
		var minPrice = json.couponPrc;
		var maxPrice = json.normalSalePrc;
		var percent = 0;
		
		if (json.dcPrc < json.couponPrc) {
			minPrice = json.dcPrc;
		}
		
		if(maxPrice > minPrice) {
			// percent = Math.ceil(100 - (minPrice / maxPrice) * 100);
			percent = Math.round(((maxPrice - minPrice) / maxPrice + Number.EPSILON) * 100);
		}
		
		var evalScore = (json.gdsEval_Score != "0" && (json.gdsEval_Score+"").indexOf(".") > -1 ? json.gdsEval_Score : json.gdsEval_Score +".0")

		var html = '<li>\n';
		html += 			rankHtml + "\n";
		html += '			<div class="pthumb">\n';
		html += '				<div class="'+pthumbImgClass+'">\n';
		html += '					<a href="'+gdsLink+'">\n';
		html += '						<img class="js-lazy" src="/resources/images/common/blank.gif" data-lazy="' + json.imgPathL + '" onerror="onErrorImg(this)" />\n';
// 슈퍼플래그 이미지
		if (json.badgeImgPath_1 ) {
			html += 					' <span class="superflag"><img src="' + json.badgeImgPath_1 + '"></span>';
		}
		html += '					</a>\n';
		html += '				</div>\n';
		html += 				labelHtml + "\n"
		html += '				<a class="pthumb-name" href="'+gdsLink+'">\n';
		html += '					<div class="pthumb-brand">'+brandNm+'</div>\n';
		html += '					<div class="pthumb-prd">'+json.gdsNm+'</div>\n';
		html += '				</a>\n';
		html += '				<div class="pthumb-prc">\n';
		html += '					<div class="pthumb-cur">'+Common.GetNumberFormat(minPrice)+'</div>\n';
		if(percent != 0){
		html += '					<div class="pthumb-sale">'+Common.GetNumberFormat(maxPrice)+'</div>\n';
		html += '					<div class="pthumb-rate">'+percent+'<span class="unit">%</span></div>\n';
		}
		html += '				</div>\n';
		html += '				<div class="pthumb-user">\n';
		html += '					<a class="user-score" href="'+gdsLink+'&gdsEvalFocus=Y"><span class="num">'+evalScore+'</span></a>\n';
		html += '					<a class="user-review" href="'+gdsLink+'&gdsEvalFocus=Y"><span class="num">'+Common.GetNumberFormat(json.gdsEval_Cnt)+'</span></a>\n';
		html += '				</div>\n';
		html += '			</div>\n';
		html += '		</li>\n';
		return html;
	} finally {
		html = null;
	}
}

/*
* 상품번호로 한샘몰의 상품정보를 가져온다.
* 모바일 사용
* 작성자 : 박동진
* 
* 2022.05.12 M.Park - searchResult.jsp 1곳에서만 사용함. 저쪽으로 옮기는것이 효과적으로 보임.
*/
function mProductRelGrid(settings) {
	var html			= "";
	var page			= settings.page;
	var row_list		= settings.row_list;
	var gridObj			= settings.gridObj;
	var searchKeyArea	= gridObj.find(".search-val");
	var json_temp		= eval(settings.result);
	var arr				= settings.gdsNo.split(","), gds_cnt = 1;
	var json			= [];
	
	//우선순위 정렬
	for(var j=0; j < arr.length; j++) {
		for(var i=0; i < json_temp.data.length; i++) {
			if (json_temp.data[i].gdsStatCd === "N" && Number(arr[j]) === Number(json_temp.data[i].gdsNo) && gds_cnt <= (page * row_list)) {
				json.push(json_temp.data[i]);
				gds_cnt++;
			}
		}
	}
	if (json.length < row_list) {
		//대체제
		if (typeof settings.fn_second_prd_rel === "function") { settings.fn_second_prd_rel(); }
		//상품이 없을 경우
		if (typeof settings.fn_empty_prd_rel === "function") { settings.fn_empty_prd_rel(); }
	} else {
		if (json.length === 0 || json.length < 3) {
			gridObj.hide();
		} else {
			json = json.slice(0, 9);
			for(var i=0; i < json.length ;i++) {
				html += mRBGridPrd(json[i], settings, settings.channel);
			}
		}

		/* 검색에 셋팅 */
		searchKeyArea.text(settings.st||"");
		gridObj.find(".scroll-list-dp").empty();
		gridObj.find(".scroll-list-dp").html(html);
		gridObj.show();
		if (typeof settings.fn_complete === "function") { settings.fn_complete(); }
		html = null, page = null, row_list = null, gridObj = null, json_temp = null, arr = null, gds_cnt = null, json = null;
	}
}

function newCtgRBGridPrd(json, rccode, channel, wlp) {
	try {
		//가격
		var priceTxt = "";
		var minPrice = json.couponPrc;
		var maxPrice = json.normalSalePrc;
		minPrice = (Number(json.dcPrc) < Number(json.couponPrc)) ? Number(json.dcPrc) : Number(json.couponPrc); //PC 할인가
		
		var html = '<li>\n';
		if (channel === "M") {
			if (wlp != "") {
				wlp = "&wlp="+wlp;
			}
			html += '	<a href="/m/mgoods/goodsDetailMall.do?gdsNo='+ json.gdsNo +'&rccode='+ rccode + wlp +'" class="c-card__anchor">\n';
		} else {
			html += '	<a href="/goods/goodsDetailMall.do?gdsNo='+ json.gdsNo +'&rccode='+ rccode +'" class="c-card__anchor">\n';
		}
		if (json.overseaDeliveryYN == '1') {
			html += '		<span class="c-card__label c-card__label--overseas">해외</span>\n';
		}
		html += '	    	<img class="js-lazy" data-lazy="'+json.imgPathL+'" src="/resources/mobile/images/common/noimage/198x198.jpg" onerror="this.src=\'/resources/images/common/noimage/07_198x198.jpg\'" alt="'+ json.gdsNm +'">\n';
		html += '			<span class="prd_name">'+ json.gdsNm +'</span>\n';
		if (minPrice < maxPrice) {
			/*html += '		<strong class="prc_cur">'+ Common.GetNumberFormat(maxPrice) +'</strong>\n';*/
		}
		html += '			<strong class="prc_cur">'+ Common.GetNumberFormat(minPrice) +'</strong>\n';
		html += '		</a>\n';
		html += '</li>\n';
		
		return html;
	} finally {
		priceTxt = null, minPrice = null, maxPrice = null, html = null; 
	}
}

function newRBGridPrd(json, rccode, channel, wlp) {
	try {
		//가격
		var priceTxt = "";
		var minPrice = json.couponPrc;
		var maxPrice = json.normalSalePrc;
		
		minPrice = (Number(json.dcPrc) < Number(json.couponPrc)) ? Number(json.dcPrc) : Number(json.couponPrc); //할인가
	
		var html = '<li class="c-grid__item">\n';
		html += '	<div class="c-card">\n';
		if (channel === "M") {
			
			if (wlp != "") {
				wlp = "&wlp="+wlp;
			}
			
			html += '		<a href="/m/mgoods/goodsDetailMall.do?gdsNo='+ json.gdsNo +'&rccode='+ rccode + wlp +'" class="c-card__anchor">\n';
		} else {
			html += '		<a href="/goods/goodsDetailMall.do?gdsNo='+ json.gdsNo +'&rccode='+ rccode +'" class="c-card__anchor">\n';
		}
		
		html += '	    	<span class="c-card__thumb"><img class="js-lazy" data-lazy="'+json.imgPathL+'" src="/resources/mobile/images/common/noimage/198x198.jpg" onerror="this.src=\'/resources/images/common/noimage/07_198x198.jpg\'" alt="'+ json.gdsNm +'"></span>\n';
		//html += '			<span class="c-card__label c-card__label--recommend">추천</span>\n';
		
		
		if (json.overseaDeliveryYN == '1') {
			html += '<span class="c-card__label c-card__label--overseas">해외</span>\n';
		}
		html += '	    	<div class="c-card__cont">\n';
		html += '				<strong class="c-card__name">'+ json.gdsNm +'</strong>\n';
		if (minPrice < maxPrice) {
			/*html += '			<span class="c-card__original-price"><s>'+ Common.GetNumberFormat(maxPrice) +'</s>원</span>\n';*/
		}
		html += '				<em class="c-card__price"><span class="c-card__price__number">'+ Common.GetNumberFormat(minPrice) +'</span>원</em>\n';
		html += '	    	</div>\n';
		html += '		</a>\n';
		html += '	</div>\n';
		html += '</li>\n';
		
		return html;
	} finally {
		priceTxt = null, minPrice = null, maxPrice = null, html = null; 
	}
}

/*
* json 형태의 상품정보로 html 소스를 그려준다.
* 2019 모바일개편 상품상세용
* 작성자 : 김동진
*/
function newRBGridPrd_V3(json, rccode, channel, wlp) {
	try {
		//가격 고시정보 개편 - 2022.12.19 김재욱(MALLDVLPRJ-1670)
		var gdsPrcTypCd = json.gdsPrcTypCd;		//상품 가격 유형
		var prcViewTypCd = json.prcViewTypCd;		//가격 노출 형식
		var prcTextTypCd = json.prcTextTypCd;		//가격 노출 텍스트
		var unitNormalPricePerSqureMeter = json.unitNormalPricePerSqureMeter;		//평/m당 단가
		var unitDcPricePerSqureMeter = json.unitDcPricePerSqureMeter;		//평/m당 할인 단가
		var unitNm = json.unitNm;		//단위
		
		if (wlp != "") {
			wlp = "&wlp="+wlp;
		}
		
		var html = "";
		html += '<li>\n';
		html += '	<div class="prd-view">\n';
		html += '		<a class="prd-link" href="/m/mgoods/goodsDetailMall.do?gdsNo='+ json.gdsNo +'&rccode='+ rccode + wlp +'">\n';
		html += '			<div class="prd-img">\n';
		html += '				<div class="thumb"><img src="/resources/mo/images/common/blank.gif" class="js-lazy" data-lazy="'+json.imgPathL+'" onerror="onErrorImg(this);" alt="'+ json.gdsNm +'"></div>\n';

		if ( json.badgeImgPath_1 ) {
			html +=	'			<span class="superflag"><img src="' + json.badgeImgPath_1 + '"></span>';
		}
		
		html += '			</div>\n';
		html += '		</a>\n';
		
		html += '		<button class="btn-bookmark" gdsNo="' + json.gdsNo + '" onclick="myWishList(this, ' + json.gdsNo + ')">스크랩</button>';
		
		html += '		<a class="prd-link" href="/m/mgoods/goodsDetailMall.do?gdsNo='+ json.gdsNo +'&rccode='+ rccode + wlp +'">\n';
		html += '			<div class="prd-info">\n';
		html += '				<div class="prd-brand"><div class="brand-name">' + (json.brandNm != '' && json.brandNm != null ? json.brandNm : json.saleCorpNm) + '</div></div>\n';
		html += '				<div class="prd-name"><div class="prd-name-txt">'+ json.gdsNm +'</div></div>\n';
		
		html += '				<div class="prd-prc">\n';
		
		if(prcViewTypCd == "A" || prcViewTypCd == "B") {		//평/m당 단가인 경우 XXX만원으로 표시
			html += '				<div class="prd-prc-cur">'+ Common.GetNumberFormat((json.normalSalePrc > json.moWebCouponPrc ? unitDcPricePerSqureMeter : unitNormalPricePerSqureMeter));
			if(unitNm != "") html += '<span class="unit">' + unitNm;
		} else if(prcViewTypCd == "Z") {		//견적 상담인 경우
			html += '				<div class="prd-prc-cur"><strong class="consulting">견적 상담</strong>';
		} else {
			html += '				<div class="prd-prc-cur">'+ Common.GetNumberFormat(json.moWebCouponPrc);
			if(unitNm != "") html += '<span class="unit">' + unitNm;
		}
		if (json.dealGoodsYN == "Y" || json.dealGoodsYN == "1") {
			html += '~';
		}
		if(unitNm != "") {
			html += '				</span>';
		}
		html += '				</div>\n';
		
		if(json.normalSalePrc > json.moWebCouponPrc && prcViewTypCd != "Z") {
			html += '			<div class="prd-rate">'+ json.dcRate +'<span class="unit">%</span></div>\n';
			if(prcViewTypCd == "A" || prcViewTypCd == "B") {
				html += '		<div class="prd-prc-market">'+ Common.GetNumberFormat(unitNormalPricePerSqureMeter) +'<span class="unit">만원대</span></div>\n';
			} else {
				html += '		<div class="prd-prc-market">'+ Common.GetNumberFormat(json.normalSalePrc) +'</div>\n';
			}
		}
		
		html += '				<div class="prd-prc app-prc">\n';
		if(prcViewTypCd == "A" || prcViewTypCd == "B") {		//평/m당 단가인 경우 XXX만원으로 표시
			html += '				<div class="prd-prc-cur">'+ Common.GetNumberFormat((json.normalSalePrc > json.moAppCouponPrc ? unitDcPricePerSqureMeter : unitNormalPricePerSqureMeter));
			if(unitNm != "") html += '<span class="unit">' + unitNm;
		} else if(prcViewTypCd == "Z") {		//견적 상담인 경우
			html += '				<div class="prd-prc-cur"><strong class="consulting">견적 상담</strong>';
		} else {
			html += '				<div class="prd-prc-cur">'+ Common.GetNumberFormat(json.moAppCouponPrc);
			if(unitNm != "") html += '<span class="unit">' + unitNm;
		}
		if (json.dealGoodsYN == "Y" || json.dealGoodsYN == "1") {
			html += '~';
		}
		if(unitNm != "") {
			html += '				</span>';
		}
		html += '				</div>\n';
		
		if(json.normalSalePrc > json.moAppCouponPrc > 0 && prcViewTypCd != "Z") {
			html += '			<div class="prd-rate">'+ json.appDcRate +'<span class="unit">%</span></div>\n';
			if(prcViewTypCd == "A" || prcViewTypCd == "B") {
				html += '		<div class="prd-prc-market">'+ Common.GetNumberFormat(unitNormalPricePerSqureMeter) +'<span class="unit">만원대</span></div>\n';
			} else {
				html += '		<div class="prd-prc-market">'+ Common.GetNumberFormat(json.normalSalePrc) +'</div>\n';
			}
		}

		html += '			</div>\n';
		html += '		</a>\n';
		html += '	</div>\n';
		html += '</li>\n';
		
		return html;
	} finally {
		minPrice = null, maxPrice = null, html = null;
	}
}

/*
* json 형태의 상품정보로 html 소스를 그려준다.
* 2020 모바일개편 주문서 추천 상품용
* 작성자 : 김재욱
*/
function newRBGridPrd_V4(json, rccode, channel, wlp) {
	try {
		var couPonAmt = json.couPonAmt; // 할인쿠폰금액
		var addCouPonAmt = json.addCouponAmt; // 추가할인쿠폰금액
		var isCoupon = false;
		if(couPonAmt + addCouPonAmt > 0) {
			isCoupon = true;
		}

		//WEB 가격
		var priceTxt	= "";
		var minPrice	= json.couponPrc;
		var maxPrice	= json.normalSalePrc;
		var percent		= 0;

		minPrice = (Number(json.dcPrc) < Number(json.couponPrc)) ? Number(json.dcPrc) : Number(json.couponPrc); //할인가

		if(maxPrice > minPrice) {
			// percent		= Math.ceil(100 - (minPrice / maxPrice) * 100);
			percent = Math.round(((maxPrice - minPrice) / maxPrice + Number.EPSILON) * 100);
		}

		//APP 가격
		var appMinPrice = json.moAppCouponPrc;
		var appMaxPrice = json.normalSalePrc;
		var appPercent = 0;

		if(appMaxPrice > appMinPrice) {
			// appPercent = Math.ceil(100 - (appMinPrice / appMaxPrice) * 100);
			appPercent = Math.round(((appMaxPrice - appMinPrice) / appMaxPrice + Number.EPSILON) * 100);
		}

		//가격 고시정보 개편
		var gdsPrcTypCd = json.gdsPrcTypCd;		//상품 가격 유형
		var prcViewTypCd = json.prcViewTypCd;		//가격 노출 형식
		var prcTextTypCd = json.prcTextTypCd;		//가격 노출 텍스트
		var unitNormalPricePerSqureMeter = json.unitNormalPricePerSqureMeter;		//평/m당 단가
		var unitDcPricePerSqureMeter = json.unitDcPricePerSqureMeter;		//평/m당 할인 단가
		var unitNm = json.unitNm;		//단위
		
		minPrice = (Number(json.dcPrc) < Number(json.couponPrc)) ? Number(json.dcPrc) : Number(json.couponPrc); //할인가
	
		if (wlp != "") {
			wlp = "&wlp="+wlp;
		}
		
		var html = "";
		html += '<li >\n';
		html += '	<div class="prd-view">\n';
		html += '		<a class="prd-link" href="/m/mgoods/goodsDetailMall.do?gdsNo='+ json.gdsNo +'&rccode='+ rccode + wlp +'">\n';
		html += '			<div class="prd-img">\n';
		html += '				<div class="thumb"><img src="/resources/mo/images/common/blank.gif" class="js-lazy" data-lazy="'+json.imgPathL+'" onerror="onErrorImg(this);" alt="'+ json.gdsNm +'"></div>\n';

		if ( json.badgeImgPath_1 ) {
			html +=			'<span class="superflag"><img src="' + json.badgeImgPath_1 + '"></span>';
		}
		
		html += '			</div>\n';
		html += '		</a>\n';
		
		html += '		<button class="btn-bookmark" type="button" gdsNo="' + json.gdsNo + '" onclick="myWishList(this, ' + json.gdsNo + ')">스크랩</button>';
		
		html += '		<a class="prd-link" href="/m/mgoods/goodsDetailMall.do?gdsNo='+ json.gdsNo +'&rccode='+ rccode + wlp +'">\n';
		html += '			<div class="prd-info">\n';
		html += '				<div class="prd-brand"><div class="brand-name">' + (json.brandNm != '' && json.brandNm != null ? json.brandNm : json.saleCorpNm) + '</div></div>\n';
		html += '				<div class="prd-name"><div class="prd-name-txt">'+ json.gdsNm +'</div></div>\n';
		
		html += '				<div class="prd-prc">\n';
		if(prcViewTypCd == "A" || prcViewTypCd == "B") {		//평/m당 단가인 경우 XXX만원으로 표시
			html += '				<div class="prd-prc-cur">'+ Common.GetNumberFormat((json.normalSalePrc > json.moWebCouponPrc ? unitDcPricePerSqureMeter : unitNormalPricePerSqureMeter));
			if(unitNm != "") html += '<span class="unit">' + unitNm;
		} else if(prcViewTypCd == "Z") {		//견적 상담인 경우
			html += '				<div class="prd-prc-cur"><strong class="consulting">견적 상담</strong>';
		} else {
			html += '				<div class="prd-prc-cur">'+ Common.GetNumberFormat(json.moWebCouponPrc);
			if(unitNm != "") html += '<span class="unit">' + unitNm;
		}
		if (json.dealGoodsYN == "Y" || json.dealGoodsYN == "1") {
			html += '~';
		}
		if(unitNm != "") {
			html += '				</span>';
		}
		html += '				</div>\n';

		if(json.normalSalePrc > json.moWebCouponPrc && prcViewTypCd != "Z") {
			html += '			<div class="prd-rate">'+ percent +'<span class="unit">%</span></div>\n';
			if(prcViewTypCd == "A" || prcViewTypCd == "B") {
				html += '		<div class="prd-prc-market">'+ Common.GetNumberFormat(unitNormalPricePerSqureMeter) +'<span class="unit">만원대</span></div>\n';
			} else {1
				html += '		<div class="prd-prc-market">'+ Common.GetNumberFormat(json.normalSalePrc) +'</div>\n';
			}
		}

		html += '			<div class="prd-prc app-prc">\n';
		if(prcViewTypCd == "A" || prcViewTypCd == "B") {		//평/m당 단가인 경우 XXX만원으로 표시
			html += '			<div class="prd-prc-cur">'+ Common.GetNumberFormat((json.normalSalePrc > json.moAppCouponPrc ? unitDcPricePerSqureMeter : unitNormalPricePerSqureMeter));
			if(unitNm != "") html += '<span class="unit">' + unitNm;
		} else if(prcViewTypCd == "Z") {		//견적 상담인 경우
			html += '			<div class="prd-prc-cur"><strong class="consulting">견적 상담</strong>';
		} else {
			html += '			<div class="prd-prc-cur">'+ Common.GetNumberFormat(json.moAppCouponPrc);
			if(unitNm != "") html += '<span class="unit">' + unitNm;
		}
		if (json.dealGoodsYN == "Y" || json.dealGoodsYN == "1") {
			html += '~';
		}
		if(unitNm != "") {
			html += '			</span>';
		}
		html += '			</div>\n';

		if(json.normalSalePrc > json.moAppCouponPrc > 0 && prcViewTypCd != "Z") {
			html += '		<div class="prd-rate">'+ appPercent +'<span class="unit">%</span></div>\n';
			if(prcViewTypCd == "A" || prcViewTypCd == "B") {
				html += '	<div class="prd-prc-market">'+ Common.GetNumberFormat(unitNormalPricePerSqureMeter) +'<span class="unit">만원대</span></div>\n';
			} else {
				html += '	<div class="prd-prc-market">'+ Common.GetNumberFormat(json.normalSalePrc) +'</div>\n';
			}
		}
		
		html += '			<div class="prd-opt">\n';
		html += '				<span class="prd-opt-score">'+ 
		(json.gdsEval_Score != "0" && (json.gdsEval_Score+"").indexOf(".") > -1 ? json.gdsEval_Score : json.gdsEval_Score +".0") +'</span>\n';
		html += '				<span class="prd-opt-reply">'+ (Number(json.gdsEval_Cnt) > 9999 ? "9999+" : Common.GetNumberFormat(json.gdsEval_Cnt)) +'</span>\n';
		html += '			</div>\n';
		html += '		</a>\n';
		html += '	</div>\n';
		html += '</li>\n';
		
		return html;
	} finally {
		priceTxt = null, minPrice = null, maxPrice = null, html = null; 
	}
}

// 모바일 검색결과 없을시, 장바구니 일시품절 대체 상품 영역
function newRBGridPrd2(json, rccode, channel, wlp) {
	try {
		//WEB 가격
		var priceTxt	= "";
		var minPrice	= json.couponPrc;
		var maxPrice	= json.normalSalePrc;
		var percent		= 0;
		
		minPrice = (Number(json.dcPrc) < Number(json.couponPrc)) ? Number(json.dcPrc) : Number(json.couponPrc); //할인가
		
		if(maxPrice > minPrice) {
			// percent		= Math.ceil(100 - (minPrice / maxPrice) * 100);
			percent = Math.round(((maxPrice - minPrice) / maxPrice + Number.EPSILON) * 100);
		}

		//APP 가격
		var appMinPrice = json.moAppCouponPrc;
		var appMaxPrice = json.normalSalePrc;
		var appPercent = 0;
		
		if(appMaxPrice > appMinPrice) {
			// appPercent = Math.ceil(100 - (appMinPrice / appMaxPrice) * 100);
			appPercent = Math.round(((appMaxPrice - appMinPrice) / appMaxPrice + Number.EPSILON) * 100);
		}
		
		var flag_cnt				= 0;		/* 3개 체크 용도 */
		var app_flag_cnt			= 0;
		var RADIUS_YN				= "Y";		/* 태그가 있으면 좌하 둥글게 적용 하지 않는다. */
		var DELI_FEE_YN_FLAG			= "N";		/* 무료배송 노출여부 */
		var PRE_SALE_YN				= "N";		/* 사전판매 노출여부 */
		var NEW_YN					= "N";		/* NEW 노출여부 */
		var ADD_SALE_MOBILE_WEB_YN	= "N";		/* 추가할인 노출여부 WEB */
		var ADD_SALE_MOBILE_APP_YN	= "N";		/* 추가할인 노출여부 APP */
		var GIFT_WEB_YN				= "N";		/* 사은품 노출여부 WEB */
		var GIFT_APP_YN				= "N";		/* 사은품 노출여부 APP */
		var LOW_PRICE_WEB_YN		= "N";		/* 최저가 노출여부 WEB */
		var LOW_PRICE_APP_YN		= "N";		/* 최저가 노출여부 APP */
		//가격 고시정보 개편 - 2022.04.12 김재욱(MALLDVLPRJ-1670)
		var gdsPrcTypCd = json.gdsPrcTypCd;		//상품 가격 유형
		var prcViewTypCd = json.prcViewTypCd;		//가격 노출 형식
		var prcTextTypCd = json.prcTextTypCd;		//가격 노출 텍스트
		var unitNormalPricePerSqureMeter = json.unitNormalPricePerSqureMeter;		//평/m당 단가
		var unitDcPricePerSqureMeter = json.unitDcPricePerSqureMeter;		//평/m당 할인 단가
		var unitNm = json.unitNm;		//단위
		
		/* 무료배송 노출여부 체크 */
		if(json.deliFeeYnFlag == "Y") {
			flag_cnt		= flag_cnt + 1;
			DELI_FEE_YN_FLAG	= "Y";
		}
		
		/* 사전판매 노출여부 체크 */
		if(json.preViewYn == "Y") {
			flag_cnt	= flag_cnt + 1;
			PRE_SALE_YN		= "Y";
		}
		
		/* NEW 노출여부 체크 */
		if(json.newYnFlag == "Y") {
			flag_cnt	= flag_cnt + 1;
			NEW_YN		= "Y";
		}
		
		/* 추가할인 노출여부 체크 WEB */
		if(json.addSaleMobileWebYnFlag == "Y") {
			flag_cnt				= flag_cnt + 1;
			ADD_SALE_MOBILE_WEB_YN	= "Y";
		}
		
		/* 추가할인 노출여부 체크 APP */
		if(json.addSaleMobileAppYnFlag == "Y") {
			app_flag_cnt			= app_flag_cnt + 1;
			ADD_SALE_MOBILE_APP_YN	= "Y";
		}
		
		/* 사은품 노출여부 체크 WEB */
		if(json.giftYnFlag == "Y") {
			flag_cnt	= flag_cnt + 1;
			GIFT_WEB_YN	= "Y";
		}
		
		/* 사은품 노출여부 체크 APP */
		if(json.giftYnFlag == "Y") {
			app_flag_cnt	= app_flag_cnt + 1;
			GIFT_APP_YN		= "Y";
		}
		
		/* 최저가 노출여부 체크 WEB */
		if(json.lowPriceYnFlag == "Y") {
			flag_cnt			= flag_cnt + 1;
			LOW_PRICE_WEB_YN	= "Y";
		}
		
		/* 최저가 노출여부 체크 APP */
		if(json.lowPriceYnFlag == "Y") {
			app_flag_cnt		= app_flag_cnt + 1;
			LOW_PRICE_APP_YN	= "Y";
		}
		
		if(flag_cnt > 0) {
			RADIUS_YN = "N";
		}

		
		var html = '';
		html += '<li class="list-node">\n';
		html += '	<div class="prd-view">\n';

		if (wlp != "") {
			wlp = "&wlp="+wlp;
		}
		html += '		<a class="prd-link" href="/m/mgoods/goodsDetailMall.do?gdsNo='+ json.gdsNo +'&rccode='+ rccode + wlp +'">\n';
		html += '	    	<div class="prd-img '+ (RADIUS_YN == "N" ? "prd-img-on" : "") +'">\n';
		html += '	    		<div class="thumb"><img class="js-lazy" data-lazy="'+json.imgPathL+'" src="/resources/mobile/images/common/noimage/198x198.jpg" alt="'+ json.gdsNm +'" onerror="onErrorImg(this)"></div>\n';
		if ( json.badgeImgPath_1 ) {
			html +=				'<span class="superflag"><img src="' + json.badgeImgPath_1 + '"></span>';
		}
		html += '	    	</div>\n';
		html += '		</a>';
		
		html += '		<button class="btn-bookmark" gdsNo="' + json.gdsNo + '" onclick="myWishList(this, ' + json.gdsNo + ')">스크랩</button>';
		
		html += '		<a class="prd-link" href="/m/mgoods/goodsDetailMall.do?gdsNo='+ json.gdsNo +'&rccode='+ rccode + wlp +'">\n';
		html += '	    	<div class="prd-info">\n';
		html += '	    		<div class="prd-brand">\n';
		html += '	    			<div class="brand-name">\n';
		if (json.brandNm != '' && json.brandNm != null) {
			html += json.brandNm
		} else if (json.saleCorpNm != '' && json.saleCorpNm != null) {
			html += json.saleCorpNm;
		} else {
			html += "한샘 매장가구";
		}
		html += '	    			</div>\n';
		html += '	    		</div>\n';
		
		html += '	    		<div class="prd-name"><div class="prd-name-txt">'+ json.gdsNm +'</div></div>\n';
		
		html += '	    		<div class="prd-prc">\n';
		if(prcViewTypCd == "A" || prcViewTypCd == "B") {		//평/m당 단가인 경우 XXX만원으로 표시
			html += '	    		<div class="prd-prc-cur">'+ Common.GetNumberFormat((json.normalSalePrc > json.moWebCouponPrc ? unitDcPricePerSqureMeter : unitNormalPricePerSqureMeter));
			if(unitNm != "") html += '<span class="unit">' + unitNm;
		} else if(prcViewTypCd == "Z") {		//견적 상담인 경우
			html += '	    		<div class="prd-prc-cur"><strong class="consulting">견적 상담</strong>';
		} else {
			html += '	    		<div class="prd-prc-cur">'+ Common.GetNumberFormat(json.moWebCouponPrc);
			if(unitNm != "") html += '<span class="unit">' + unitNm;
		}
		if (json.dealGoodsYN == "Y" || json.dealGoodsYN == "1") {
			html += '~';
		}
		if(unitNm != "") {
			html += '				</span>';
		}
		html += '	    		</div>\n';
		
		if(json.normalSalePrc > json.moWebCouponPrc && prcViewTypCd != "Z") {
			html += '	    	<div class="prd-rate">'+ percent +'<span class="unit">%</span></div>\n';
			if(prcViewTypCd == "A" || prcViewTypCd == "B") {
				html += '	    	<div class="prd-prc-market">'+ Common.GetNumberFormat(unitNormalPricePerSqureMeter) +'<span class="unit">만원대</span></div>\n';
			} else {1
				html += '	    	<div class="prd-prc-market">'+ Common.GetNumberFormat(json.normalSalePrc) +'</div>\n';
			}
		}
		html += '	    		</div>\n';

		html += '	    		<div class="prd-prc app-prc">\n';
		if(prcViewTypCd == "A" || prcViewTypCd == "B") {		//평/m당 단가인 경우 XXX만원으로 표시
			html += '	    		<div class="prd-prc-cur">'+ Common.GetNumberFormat((json.normalSalePrc > json.moAppCouponPrc ? unitDcPricePerSqureMeter : unitNormalPricePerSqureMeter));
			if(unitNm != "") html += '<span class="unit">' + unitNm;
		} else if(prcViewTypCd == "Z") {		//견적 상담인 경우
			html += '	    		<div class="prd-prc-cur"><strong class="consulting">견적 상담</strong>';
		} else {
			html += '	    		<div class="prd-prc-cur">'+ Common.GetNumberFormat(json.moAppCouponPrc);
			if(unitNm != "") html += '<span class="unit">' + unitNm;
		}
		if (json.dealGoodsYN == "Y" || json.dealGoodsYN == "1") {
			html += '~';
		}
		if(unitNm != "") {
			html += '				</span>';
		}
		html += '	    		</div>\n';
		
		if(json.normalSalePrc > json.moAppCouponPrc > 0 && prcViewTypCd != "Z") {
			html += '	    	<div class="prd-rate">'+ appPercent +'<span class="unit">%</span></div>\n';
			if(prcViewTypCd == "A" || prcViewTypCd == "B") {
				html += '	    	<div class="prd-prc-market">'+ Common.GetNumberFormat(unitNormalPricePerSqureMeter) +'<span class="unit">만원대</span></div>\n';
			} else {
				html += '	    	<div class="prd-prc-market">'+ Common.GetNumberFormat(json.normalSalePrc) +'</div>\n';
			}
		}
		html += '	    		</div>\n';
		
		html += '	    	</div>\n';
		html += '	    	<div class="prd-opt">\n';
		html += '	    		<span class="prd-opt-score">'+ 
			(json.gdsEval_Score != "0" && (json.gdsEval_Score+"").indexOf(".") > -1 ? json.gdsEval_Score : json.gdsEval_Score +".0") +'</span>\n';
		html += '	    		<span class="prd-opt-reply">'+ (Number(json.gdsEval_Cnt) > 9999 ? "9999+" : Common.GetNumberFormat(json.gdsEval_Cnt)) +'</span>\n';
		html += '	    	</div>\n';
		
		/*
			# [웹개발] MO_스토어 전시  [2022. 11. 22.][FRODO][IYVG-5]
			- 상품 플래그 유형/노출우선순위 : 무료배송, 사전판매(NEW 와 겹칠경우 사전판매만 노출), NEW, 추가할인, 사은품, 최저가
		 */
		if(flag_cnt > 0) {
			html += '	    	<div class="prd-tag">\n';
			
			if(DELI_FEE_YN_FLAG == "Y") {
				html += '				<span class="tag-label tag-color-pink">무료배송</span>\n';
				html += '				<span class="tag-label tag-color-pink app-tag">무료배송</span>\n';
			}
			
			if(PRE_SALE_YN == "Y") {
				html += '				<span class="tag-label tag-color-blue">사전판매</span>\n';
				html += '				<span class="tag-label tag-color-blue app-tag">사전판매</span>\n';
			}
			
			if(NEW_YN == "Y" && PRE_SALE_YN != "Y") {
				html += '				<span class="tag-label tag-color-yellow">NEW</span>\n';
				html += '				<span class="tag-label tag-color-yellow app-tag">NEW</span>\n';
			}
			
			if(ADD_SALE_MOBILE_WEB_YN == "Y") {
				html += '				<span class="tag-label">추가할인</span>\n';
			}
			
			if(ADD_SALE_MOBILE_APP_YN == "Y" && fnIsApp()) {
				html += '				<span class="tag-label app-tag">추가할인</span>\n';
			}
			
			if(GIFT_WEB_YN == "Y") {
				html += '				<span class="tag-label">사은품</span>\n';
			}
			
			if(GIFT_APP_YN == "Y" && fnIsApp()) {
				html += '				<span class="tag-label app-tag">사은품</span>\n';
			}
			
			
			if(LOW_PRICE_WEB_YN == "Y") {
				html += '				<span class="tag-label">최저가</span>\n';
			}
			
			if(LOW_PRICE_APP_YN == "Y" && fnIsApp()) {
				html += '				<span class="tag-label app-tag">최저가</span>\n';
			}
			
			html += '	    	</div>\n';
		}
		
		html += '		</a>\n';
		html += '	</div>\n';
		html += '</li>\n';
		return html;
	} finally {
		priceTxt = null, minPrice = null, maxPrice = null, html = null; 
	}
}

/*
* json 형태의 상품정보로 html 소스를 그려준다.
* PC, 모바일 공통 사용
* 2022.06.07 현재 모바일 사용처 없음. 하단의 RBGridPrd 메소드 내 퍼블을 PC용으로 교체함에 따라 모바일에서 이 함수를 사용하게 된다면 분기가 필요함 - 김재욱(MALLDVLPRJ-1670)
* 작성자 : 이상필
*/
function RBGridPrd(json, rccode, channel) {
	try {
		//가격
		var priceTxt = "";
		var minPrice = json.couponPrc;
		var maxPrice = json.normalSalePrc;
		//가격 고시정보 개편 - 2022.04.12 김재욱(MALLDVLPRJ-1670)
		var gdsPrcTypCd = json.gdsPrcTypCd;		//상품 가격 유형
		var prcViewTypCd = json.prcViewTypCd;		//가격 노출 형식
		var prcTextTypCd = json.prcTextTypCd;		//가격 노출 텍스트
		var unitNormalPricePerSqureMeter = json.unitNormalPricePerSqureMeter;		//평/m당 단가
		var unitDcPricePerSqureMeter = json.unitDcPricePerSqureMeter;		//평/m당 할인 단가
		var unitNm = json.unitNm;		//단위
		
		if (parseInt(json.dcPrc, 10) < parseInt(json.couponPrc, 10)) {
			minPrice = parseInt(json.dcPrc, 10);
		}
	
		var html = '<div class="thumb_view" rbGdsNoRed="'+ json.gdsNo +'">';
		if (channel === "M") {
			html += '	<a class="prods_view" href="/m/mgoods/goodsDetailMall.do?gdsNo='+ json.gdsNo +'&rccode='+ rccode +'" >';
		} else {
			if (rccode == "SEAR001_S001") {
				html += '	<a class="prods_view" href="/goods/goodsDetailMall.do?gdsNo='+ json.gdsNo +'&rccode='+ rccode +'&searchKey='+ encodeURI($("#searchKey").val()) +'" target="_blank">';
			} else {
				html += '	<a class="prods_view" href="/goods/goodsDetailMall.do?gdsNo='+ json.gdsNo +'&rccode='+ rccode +'" target="_blank">';
			}
		}
		html += '		<span class="prods_img">'
			+ '				<span class="thumb">';
		html += 				'<img class="js-lazy" src="/resources/images/common/blank.gif" data-lazy="'+json.imgPathL+'" onerror="this.src=\'/resources/images/common/noimage/07_198x198.jpg\'" alt="'+ json.gdsNm +'" />';
// 2022.08.29 슈퍼플래그 이미지 추가 
		if ( json.badgeImgPath_1 ) {
			html +=				'<span class="superflag"><img src="' + json.badgeImgPath_1 + '"></span>';
		}
		
		html += '</span>'
			+ '			</span>'
			+ '			<span class="prods_view_cont">'
			+ '				<span class="prods_name">'+ json.gdsNm +'</span>'
			+ '				<span class="pthumb-prc">';
		if ((minPrice < maxPrice) && prcViewTypCd != "Z") {
			if(prcViewTypCd == "A" || prcViewTypCd == "B") {		//평/m당 단가인 경우 XXX만원으로 표시
				html += '			<span class="pthumb-sale">'+ Common.GetNumberFormat(unitNormalPricePerSqureMeter) +'<span class="unit">만원대</span></span>';
			} else {
				if(unitNm != "") {
					html += '			<span class="pthumb-sale">'+ Common.GetNumberFormat(maxPrice) +'<span class="unit">원</span></span>';
				} else {
					html += '			<span class="pthumb-sale">'+ Common.GetNumberFormat(maxPrice) +'</span>';
				}
			}
		}
		if(prcViewTypCd == "A" || prcViewTypCd == "B") {		//평/m당 단가인 경우 XXX만원으로 표시
			html += '				<span class="pthumb-cur">'+ Common.GetNumberFormat(maxPrice > minPrice ? unitDcPricePerSqureMeter : unitNormalPricePerSqureMeter) +'<span class="unit">' + unitNm + '</span></span>';
		} else if(prcViewTypCd == "Z") {		//견적 상담인 경우
			html += '				<span class="consult-prd">견적 상담</span>';
		} else {
			if(unitNm != "") {
				html += '				<span class="pthumb-cur">'+ Common.GetNumberFormat(minPrice) +'<span class="unit">' + unitNm + '</span></span>';
			} else {
				html += '				<span class="pthumb-cur">'+ Common.GetNumberFormat(minPrice) +'</span>';
			}
		}
			html += '				</span>'
			+ '			</span>'
			+ '		</a>'
			+ '	</div>';
		return html;
	} finally {
		priceTxt = null, minPrice = null, maxPrice = null, html = null; 
	}
}

/*
* json 형태의 상품정보로 html 소스를 그려준다.
* 모바일 사용
* 작성자 : 박동진
*/
function mRBGridPrd(json, settings, channel) {
	try {
		//가격
		var priceTxt	= "";
		var minPrice	= json.couponPrc;
		var maxPrice	= json.normalSalePrc;
		var percent		= 0;
		var html		= '';
		var link		= '';
		
		if(maxPrice > minPrice) {
			// percent		= Math.ceil(100 - (minPrice / maxPrice) * 100);
			percent = Math.round(((maxPrice - minPrice) / maxPrice + Number.EPSILON) * 100);
		}
		
		/*
		if (parseInt(json.dcPrc, 10) < parseInt(json.couponPrc, 10)) {
			minPrice = parseInt(json.dcPrc, 10);
		}
		*/
		
		link = '/m/mgoods/goodsDetailMall.do?gdsNo='+ json.gdsNo +'&searchPagelist=1&searchKey='+ settings.st +'&rccode='+ settings.rccode;
		
		html += '	<li>';
		html += '		<div class="prd-view">';
		html += '			<a class="prd-link" href="javascript:fn_detail(\''+ link +'\');" >';
		html += '				<div class="prd-img">';
		html += '					<div class="thumb"><img class="js-lazy" src="/resources/mo/images/common/blank.gif" data-lazy="'+json.imgPathL+'" onerror="onErrorImg(this)"></div>';
		if ( json.badgeImgPath_1 ) {
			html +=				'<span class="superflag"><img src="' + json.badgeImgPath_1 + '"></span>';
		}
		html += '				</div>';
		html += '				<div class="prd-info">';
		html += '					<div class="prd-brand"><div class="brand-name">'+(json.brandNm != '' && json.brandNm != null ? json.brandNm : json.saleCorpNm)+'</div></div>';
		html += '					<div class="prd-name"><div class="prd-name-txt">'+ json.gdsNm +'</div></div>';
		html += '					<div class="prd-prc">';

		// MOWEB
		if(json.prcViewTypCd == "A" || json.prcViewTypCd == "B") {		//평/m당 단가인 경우 XXX만원으로 표시
			html += '	    			<div class="prd-prc-cur">'+ Common.GetNumberFormat((json.normalSalePrc > json.moWebCouponPrc ? json.unitDcPricePerSqureMeter : json.unitNormalPricePerSqureMeter));
			if(json.unitNm != "") html += '<span class="unit">' + json.unitNm;
		} else if(json.prcViewTypCd == "Z") {		//견적 상담인 경우
			html += '	    			<div class="prd-prc-cur"><strong class="consulting">견적 상담</strong>';
		} else {
			html += '	    			<div class="prd-prc-cur">'+ Common.GetNumberFormat(json.moWebCouponPrc);
			if(json.unitNm != "") html += '<span class="unit">' + json.unitNm;
		}
		if (json.dealGoodsYN == "Y" || json.dealGoodsYN == "1") {
			html += '~';
		}
		if(json.unitNm != "") {
			html += '					</span>';
		}
		html += '	    			</div>\n';

		if(json.normalSalePrc > json.moWebCouponPrc && json.prcViewTypCd != "Z") {
			html += '	    		<div class="prd-rate">'+ json.dcRate +'<span class="unit">%</span></div>\n';
			if(json.prcViewTypCd == "A" || json.prcViewTypCd == "B") {
				html += '	    	<div class="prd-prc-market">'+ Common.GetNumberFormat(json.unitNormalPricePerSqureMeter) +'<span class="unit">만원대</span></div>\n';
			} else {1
				html += '	    	<div class="prd-prc-market">'+ Common.GetNumberFormat(json.normalSalePrc) +'</div>\n';
			}
		}

		// MOAPP
		html += '	    			<div class="prd-prc app-prc">\n';
		if(json.prcViewTypCd == "A" || json.prcViewTypCd == "B") {		//평/m당 단가인 경우 XXX만원으로 표시
			html += '	    			<div class="prd-prc-cur">'+ Common.GetNumberFormat((json.normalSalePrc > json.moAppCouponPrc ? json.unitDcPricePerSqureMeter : json.unitNormalPricePerSqureMeter));
			if(json.unitNm != "") html += '<span class="unit">' + json.unitNm;
		} else if(json.prcViewTypCd == "Z") {		//견적 상담인 경우
			html += '	    			<div class="prd-prc-cur"><strong class="consulting">견적 상담</strong>';
		} else {
			html += '	    			<div class="prd-prc-cur">'+ Common.GetNumberFormat(json.moAppCouponPrc);
			if(json.unitNm != "") html += '<span class="unit">' + json.unitNm;
		}
		if (json.dealGoodsYN == "Y" || json.dealGoodsYN == "1") {
			html += '~';
		}
		if(json.unitNm != "") {
			html += '					</span>';
		}
		html += '	    			</div>\n';

		if(json.normalSalePrc > json.moAppCouponPrc > 0 && json.prcViewTypCd != "Z") {
			html += '	    		<div class="prd-rate">'+ json.dcRate +'<span class="unit">%</span></div>\n';
			if(json.prcViewTypCd == "A" || json.prcViewTypCd == "B") {
				html += '	    	<div class="prd-prc-market">'+ Common.GetNumberFormat(json.unitNormalPricePerSqureMeter) +'<span class="unit">만원대</span></div>\n';
			} else {
				html += '	    	<div class="prd-prc-market">'+ Common.GetNumberFormat(json.normalSalePrc) +'</div>\n';
			}
		}

		html += '				</div>';
		html += '			</a>';
		html += '		</div>';
		html += '	</li>';
		
		return html;
	} finally {
		priceTxt = null, minPrice = null, maxPrice = null, html = null; 
	}
}

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();
	if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}

/*
* 기준상품을 좌측 영역에 그려준다.
* PC 전용
* 작성자 : 이상필
*/
var rb_ctg_stttings;
function productGrid(settings) {
	var rb_type = settings.rb_type;
	var page = settings.page;
	var row_list = settings.row_list;
	var gridObj = settings.gridObj;
	rb_ctg_stttings = settings;
	if (settings.gdsNo === "" || settings.gdsNo === "0") {
		//데이터가 없을 경우
		if (typeof settings.fn_empty_prd === "function") { settings.fn_empty_prd(); }
	}
	$.ajax({
		url: "/goods/prdListForRecobellAjax.do",
		type: 'post',
		cache: false,
		dataType : 'json',
		data:{gdsno : settings.gdsNo, img_size : settings.img_size},
		contentType:'application/x-www-form-urlencoded; charset=UTF-8',
		error: function(xhr, textStatus, error){
		}, success: function(json) {
			var html = "";
			var ctgNo = "";
			if (json.data.length > 0) {
				//중카테고리는 카테고리 번호를 넘겨준다.
				if (location.href.indexOf("goHsmMctgy.do") > -1) {
					ctgNo = $("#ctgrNo").val();
				}
				for(var i=0; i < json.data.length; i++) {
					html += RBGridPrd(json.data[i], settings.rccode, settings.channel);
					//연관상품을 가져온다
					if (i === 0) {
						selectRBAPI({
							rb_type				: rb_type,
							format				: settings.format,
							size				: settings.size,
							page				: page,
							row_list			: row_list,
							img_size			: settings.img_size,
							rccode				: settings.rccode + "_REL",
							iids				: json.data[i].gdsNo,
							ctgNo				: ctgNo,
							gridObj				: gridObj,
							fn_empty_prd		: settings.fn_empty_prd,
							fn_empty_prd_rel	: settings.fn_empty_prd_rel,
							fn_second_prd_rel	: settings.fn_second_prd_rel,
							fn_complete			: settings.fn_complete,
							callback			: productRelGrid
						});
					}
				}
				
				html += '<div class="prod_paging">'
					+ '		<div class="prod_paging_view">'
					+ '			<a href="javascript:pageingProductRel(\'prev\');" class="view_paging_btn"><img src="/resources/images/common/prod_list_left.png" alt="이전상품보기" /></a>'
					+ '			<div class="view_paging_area">'
					+ '				<span class="view_paging_num">'
					+ '					<strong>1</strong>/<span>'+ json.data.length +'</span>'
					+ '				</span>'
					+ '			</div>'
					+ '			<a href="javascript:pageingProductRel(\'next\');" class="view_paging_btn"><img src="/resources/images/common/prod_list_right.png" alt="다음상품보기" /></a>'
					+ '		</div>'
					+ '	</div>';
				gridObj.find(".recom_rel_prod_view").empty();
				gridObj.find(".recom_rel_prod_view").html(html);
				gridObj.find(".recom_rel_prod_view .thumb_view").hide();
				gridObj.find(".recom_rel_prod_view .thumb_view").eq(0).show();
			}
			gridObj = null, html = null, ctgNo = null;
		}
	});
}

/*
* 기준상품의 좌측 영역에 페이징을 그려준다.
* PC 전용
* 작성자 : 이상필
*/
function pageingProductRel(dir) {
	var gridObj = rb_ctg_stttings.gridObj;
	var cnt = gridObj.find(".recom_rel_prod_view .thumb_view").length;
	var page = Number(gridObj.find(".recom_rel_prod_view").find(".view_paging_num strong").text());
	var ctgNo = "";
	if (location.href.indexOf("goHsmMctgy.do") > -1) {
		ctgNo = $("#ctgrNo").val();
	}
	if (dir === "prev") {
		page--;
		if (page <= 0) { page = 1; }
	} else {
		page++;
		if (page >= cnt) { page = cnt; }
	}
	
	if (page != Number(gridObj.find(".recom_rel_prod_view").find(".view_paging_num strong").text())) {
		gridObj.find(".recom_rel_prod_view .thumb_view").hide();
		gridObj.find(".recom_rel_prod_view .thumb_view").eq(page - 1).show();
		gridObj.find(".recom_rel_prod_view").find(".view_paging_num strong").text(page);
		var gds = gridObj.find(".recom_rel_prod_view .thumb_view").eq(page - 1).attr("rbGdsNoRed");
		selectRBAPI({
			rb_type				: rb_ctg_stttings.rb_type,
			format				: rb_ctg_stttings.format,
			size				: rb_ctg_stttings.size,
			page				: rb_ctg_stttings.page,
			row_list			: rb_ctg_stttings.row_list,
			img_size			: rb_ctg_stttings.img_size,
			rccode				: rb_ctg_stttings.rccode + "_REL",
			iids				: gds,
			ctgNo				: ctgNo,
			gridObj				: rb_ctg_stttings.gridObj,
			fn_empty_prd		: rb_ctg_stttings.fn_empty_prd,
			fn_empty_prd_rel	: rb_ctg_stttings.fn_empty_prd_rel,
			fn_second_prd_rel	: rb_ctg_stttings.fn_second_prd_rel,
			fn_complete			: rb_ctg_stttings.fn_complete,
			callback			: productRelGrid
		});
	}
	gridObj = null,	cnt = null,	page = null, ctgNo = null;
}

/*
* 상품상세에 같이 본 상품, 함께 구매하신 상품을 그려준다.
* PC 전용 (goodsDetail.do의 parsing 사이즈를 늘리지 않으려고 js로 분리하였습니다.)
* 작성자 : 이상필
*/
function goodsDetailRB(settings) {

	var page = settings.page;
	var row_list = settings.row_list;
	var gridObj = settings.gridObj;
	
	var json_temp = eval(settings.result);
	var arr = settings.gdsNo.split(","), gds_cnt = 1;
	var json = [];
	var html = "";
	html += '<div class="ui-list-items">';

	var priceTxt = "";
	var minPrice = "";
	var maxPrice = "";
				
	//우선순위 정렬
	for(var j=0; j < arr.length; j++) {
		for(var i=0; i < json_temp.data.length; i++) {
			if (json_temp.data[i].gdsStatCd === "N" && Number(arr[j]) === Number(json_temp.data[i].gdsNo) && gds_cnt <= (page * row_list)) {
				json.push(json_temp.data[i]);
				gds_cnt++;
			}
		}
	}
	//row_list 갯수보다 적으면 영역을 감춘다.
	if (json.length < row_list) {
		if (typeof settings.fn_empty_prd === "function") { settings.fn_empty_prd(); }
	} else {
		html += '<ul class="ui-list-item">';
		for(var i=0; i < json.length ;i++) {
			if (i <= (page * row_list) - 1) {
				//가격
				priceTxt = '';
				minPrice = json[i].couponPrc;
				maxPrice = json[i].normalSalePrc; 
				
				if (parseInt(json[i].dcPrc, 10) < parseInt(json[i].couponPrc, 10)) {
					minPrice = parseInt(json[i].dcPrc, 10);
				}
				
				html += '	<li>'
					+ '			<a href="/goods/goodsDetailMall.do?gdsNo='+ json[i].gdsNo +'&rccode='+ settings.rccode +'&goodsdetail=with_goods" target="_blank" title="새창열림">'
					+ '				<img class="js-lazy" src="/resources/images/common/blank.gif" data-lazy="'+ json[i].imgPathL +'" onerror="this.src=\'/resources/images/common/noimage/04_128x128.jpg\'" alt="'+ json[i].gdsNm +'" width="128" height="128">';
				
				if ( json[i].badgeImgPath_1 ) {
					html += '				<span class="superflag"><img src="' + json[i].badgeImgPath_1 + '"></span>';
				}
				html += '			</a>'
					+ '			<p>'
					+ '				<span>'+ json[i].gdsNm +'</span>'
					+ '				<span style=\'max-height:none;\'>';
				if (minPrice < maxPrice) {
					html += '			<del>'+ Common.GetNumberFormat(maxPrice) +'</del>원<br />';
				}
				html += '				<span style=\'font-size:14px;line-height:22px;\'><strong style=\'font-size:14px;line-height:22px;\'>'+ Common.GetNumberFormat(minPrice) +'</strong>원</span>';
					+ '				</span>'
					+ '			</p>'
					+ '		</li>';
				if ((i + 1) % row_list === 0 && i > 0 && i !== (page * row_list) - 1) {
					html += '</ul>'
						+ '	<ul class="ui-list-item" style="display:none">';
				}
			}
		}
		html += '	</ul>';
		html += '</div>';
		gridObj.find(".detail_slide_list").empty();
		gridObj.find(".detail_slide_list").html(html);
		
		if (typeof settings.fn_complete === "function") { settings.fn_complete(); }

		setTimeout(function(){
			gridObj.overlayList();
			gridObj = null;
		}, 500);
		page = null, row_list = null, json_temp = null, arr = null, gds_cnt = null, json = null, html = null, priceTxt = null, minPrice = null, maxPrice = null;
	}
}

/*
* 레코벨 API 검색시 상품 갯수가 없을 경우 노출한다.
* PC 전용
* 작성자 : 이상필
*/
function recobellNotRelGds(gridObj) {
	html = '<div class="no_result" style="width:906px;height:267px;">'
		+ '		<div class="no_result_txt">함께 구매하신 상품이 존재하지 않습니다.</div>'
		+ '	</div>';
	gridObj.find(".recom_rel_view").empty();
	gridObj.find(".recom_rel_view").html(html);
}

/*
* 메인 전시 컴포넌트 맞춤추천 [최근 주문한 상품] (mainBannerRecobellGood.jsp)
* 작성자 : 이상필
*/
function getOrderGoods(dISPComponentNo) {
	if (is_login === true) {
		$.ajax({
			url : "/common/goOrderForRecobellAjax.do",
			type : 'post',
			dataType : 'json',
			data : { dateTerm : '2W', pageIdx:1, rowsPerPage:20, stdt:'', eddt:'' },
			async : false,
			cache : false,
			success : function(data) {
				if (data.gdsNo !== "0" && data.gdsNo !== "" && data.gdsNo !== null && data.gdsNo !== undefined) {
					var uniq_gdsNo;
					var arrs = data.gdsNo.split(",");
					var uniq_gdsNo = arrs.reduce(function(a,b){
						if (a.indexOf(b) < 0 ) a.push(b);
						return a;
					},[]);
					selectRBAPI({
						//rb_type				: "a003",
						rb_type				: "a062",
						format				: "jsonp",
						size				: "20",
						page				: 1,
						row_list			: 15,
						img_size			: 550,
						rccode				: "CURTN_A062",
						iids				: uniq_gdsNo.toString(),
						dISPComponentNo		: dISPComponentNo,
						callback			: alignGds
					});
				} else {
					getViewGoods(dISPComponentNo);
				}
			},
			error: function(xhr, textStatus, errorThrown) {
			}
		});
	} else {
		getViewGoods(dISPComponentNo);
	}
}

/*
* 메인 전시 컴포넌트 맞춤추천 [최근 본 상품] (mainBannerRecobellGood.jsp)
* 작성자 : 이상필
*/
function getViewGoods(dISPComponentNo) {
	var gds_str = "", gds_arr;
	var recent = Common.getCookie("HS_RECENT_GDSNOS").split(",");
	var gds_recent_arr = [];

	if (Common.getCookie("HS_RECENT_GDSNOS") != "") {
		for(var i=0; i < recent.length; i++) {
			if (i < 10) {
				gds_arr = recent[i].split("|");
				var _date_str = gds_arr[1];
				var _date = _date_str.split("+")[0];
				var _time = _date_str.split("+")[1];
				var _t1 = new Date().getTime();
				var _t2 = new Date(_date.split("-")[0], Number(_date.split("-")[1]) - 1, _date.split("-")[2], _time.split(":")[0], _time.split(":")[1], _time.split(":")[2], 0).getTime();
				var _diff = (_t1 - _t2)/ (1000 * 60 * 60 * 24);
				if (Math.floor(_diff) <= 3) {
					(gds_str === "") ? gds_str = gds_arr[0] : gds_str += "," + gds_arr[0];
				}
			}
		}
	}

	if (gds_str === "") {
		getBestSearchGoods(dISPComponentNo);
	} else {
		//최근본 상품이 있다면
		selectRBAPI({
			//rb_type				: "a002",
			rb_type				: "a005",
			format				: "jsonp",
			size				: "50",
			page				: 1,
			row_list			: 15,
			img_size			: 550,
			rccode				: "CURN001_A005",
			iids				: gds_str,
			dISPComponentNo		: dISPComponentNo,
			callback			: alignGds
		});
	}
}

/*
* 메인 전시 컴포넌트 맞춤추천 [검색추천] (mainBannerRecobellGood.jsp)
* 작성자 : 이상필
*/
function getBestSearchGoods(dISPComponentNo) {
	selectRBAPI({
		rb_type				: "m004",
		format				: "jsonp",
		size				: "20",
		page				: 1,
		row_list			: 15,
		img_size			: 550,
		rccode				: "CURTN_M004",
		dISPComponentNo		: dISPComponentNo,
		callback			: alignGds
	});
}

//상품정보를 레코벨 순위에 맞춰 json으로 return
function alignGds(settings) {
	var page = settings.page;
	var row_list = settings.row_list;
	var json_temp = eval(settings.result);
	var arr = settings.gdsNo.split(","), gds_cnt = 1;
	var json = [];
	
	//우선순위 정렬
	for(var j=0; j < arr.length; j++) {
		for(var i=0; i < json_temp.data.length; i++) {
			if (json_temp.data[i].gdsStatCd === "N" && Number(arr[j]) === Number(json_temp.data[i].gdsNo) && gds_cnt <= (page * row_list)) {
				json.push(json_temp.data[i]);
				gds_cnt++;
			}
		}
	}
	gridGoods(settings, json);
}

//json 객체를 html 로 그린다.
function gridGoods(settings, json) {
	var html = "";
	var max_cnt = 8;
	for(var i=0; i < max_cnt; i++) {
		var _$div = $("#recobellGoodTemplate").eq(0).clone();
		var priceTxt = "";
		var minPrice = json[i].couponPrc;
		var maxPrice = json[i].normalSalePrc;
		var _img_url = _$div.find(".prods_view").find("img").attr("img_url");
		var _$ul = $(".rocomm_prds_slide"+ settings.dISPComponentNo +" .mall_slide_view li").not(".fill");
		
		if (parseInt(json[i].dcPrc, 10) < parseInt(json[i].couponPrc, 10)) {
			minPrice = parseInt(json[i].dcPrc, 10);
		}
		
		_$div.attr("id","");
		_$div.find(".prods_view").attr("href", "/goods/goodsDetailMall.do?gdsNo=" + json[i].gdsNo +"&rccode="+ settings.rccode);
		
		if ((i + 1) % 4 == 1) {
			_$div.find(".prods_view").find("img").attr("onerror",  "this.src='/resources/images/common/noimage/11_330x330.jpg'");
			_$div.find(".prods_view").find("img").attr("data-src", json[i].imgPathL);
		} else {
			_$div.find(".prods_view").find("img").attr("data-src", _img_url+json[i].imgPath_M+"?"+json[i].modYmdt_str);
		}

		/*
		if ((i + 1) % 4 == 1) {
			_$div.find(".prods_view").find("img").attr("src", _img_url + json[i].imgPath2_L);
		} else {
			_$div.find(".prods_view").find("img").attr("src", json[i].imgPathL);
		}
		*/
		//_$div.find(".prods_view").find("img").attr("src", json[i].imgPathL);
		_$div.find(".prods_view").find(".prods_name").text(json[i].gdsNm);
		if (minPrice < maxPrice) {
			_$div.find(".prods_view").find(".price_market .price_num").text(Common.GetNumberFormat(maxPrice));
			_$div.find(".prods_view").find(".price_market").css("display", "block");
			_$div.find(".prods_view").find(".price_market").show();
		}
		_$div.find(".prods_view").find(".price_discount .price_num").text(Common.GetNumberFormat(minPrice));
		_$div.find(".rank_order").find("img").attr("src", "/resources/images/main/rank_order_" + (Number(i + 1) < 10 ? "0" + Number(i + 1) : Number(i + 1)) + ".png");
		var icon_size = "160";
		if ((i + 1) % 4 == 1) {
			icon_size = "330";
		}
		_$div.css("display", "block");
		
		if ((i + 1) % 4 == 1) {
			var _$t = $("#recobellGoodsSlideTemplate").eq(0).clone();
			_$t.attr("id","");
			_$t.find(".prods_view").find("img").attr("onerror", "this.src='/resources/images/common/noimage/11_330x330.jpg'");			
			_$t.find(".rocomm_prds_main").html(_$div.html());
			$(".rocomm_prds_slide"+ settings.dISPComponentNo +" .mall_slide_view").append(_$t);
		} else if ((i + 1) % 4 == 2) {
			_$ul.find(".rocomm_prds_sub_01").eq(0).html(_$div.html());
		} else if ((i + 1) % 4 == 3) {
			_$ul.find(".rocomm_prds_sub_02").html(_$div.html());
		} else if ((i + 1) % 4 == 0) {
			_$ul.find(".rocomm_prds_sub_01").eq(1).html(_$div.html());
			$(".rocomm_prds_slide"+ settings.dISPComponentNo +" .mall_slide_view li").not(".fill").addClass("fill");
		}
	}
	$(".rocomm_prds_slide"+ settings.dISPComponentNo).mall_slide({
		speed : 400,				//  이미지 넘어가는 속도
		interval_time : 3000,		//  동작 간격 시간 1000 = 1초
		auto : false	,		//  자동 슬라이드 true, false
		limited : false // 이미지 유한 슬라이드
	});
}

/*
* 모바일 메인 비디오레이어
* 작성자 : 이상필
*/
function gridVideoLayerGoods(settings) {
	var html = "";
	var page = settings.page;
	var row_list = settings.row_list;
	var gridObj = settings.gridObj;
	var json_temp = eval(settings.result);
	var arr = settings.gdsNo.split(","), gds_cnt = 1;
	var json = [];
	var addGdsCnt = 0;
	
	if (settings.callback.name == "gridVideoLayerGoods") { //모바일 메인 연관상품 조회
		addGdsCnt = 1;
	}
	
	//우선순위 정렬
	for(var j=0; j < arr.length; j++) {
		for(var i=0; i < json_temp.data.length; i++) {
			if (json_temp.data[i].gdsStatCd === "N" && Number(arr[j]) === Number(json_temp.data[i].gdsNo) && gds_cnt <= (page * row_list) + addGdsCnt) {
				json.push(json_temp.data[i]);
				gds_cnt++;
			}
		}
	}
	
	if (json.length === 0) {
	} else {
		try {
			for(var i=0; i < json.length ;i++) {				
				var html = '<div class="m_prd">'
						+ 	'<div class="prd_view">'
						+ 		'<div class="prd_img"><a href="/goods/goodsDetailMall.do?gdsNo='+ json[i].gdsNo +'&rccode='+ settings.rccode +'"><img class="js-lazy" data-lazy="'+ json[i].imgPathL +'" no-img="/resources/mobile/images/m_common/no_img_1_1.jpg" /></a></div>'
						+ 	'</div>'
						+ 	'<div class="prd_info">'
						+ 		'<div class="prd_name"><a href="/goods/goodsDetailMall.do?gdsNo='+ json[i].gdsNo +'&rccode='+ settings.rccode +'">'+ json[i].gdsNm +'</a></div>';
				var sale = Math.round((1 - json[i].moWebCouponPrc / json[i].normalSalePrc) * 100, 2);
				if (sale > 0) {
					html +=	'<div class="prc_rate">'+ sale +'<span class="info_unit">%</span></div>';
				}
								
				html +=		'<div class="prc_cur">'+ Common.GetNumberFormat(json[i].moWebCouponPrc) +'</div>'
						+   '<div class="prc_cur app-prc">'+ Common.GetNumberFormat(json[i].moAppCouponPrc) +'</div>'
						+ 		'<div class="prd_like" gdsNo="'+ json[i].gdsNo +'"><a class="wishBtn" href="javascript:myWishList(this,'+ json[i].gdsNo +');">좋아요</a></div>'
						+ 	'</div>'
						+ '</div>';
				
				if (settings.iids == json[i].gdsNo) {
					$("#recobell_video_gds_layer").append(html);
				} else {
					$("#recobell_video_gds_rel_layer").append(html);
				}
			}
			fillWishFlag();
		} finally {
		}
	}
}

/*
* 동영상번호로 한샘몰의 동영상정보를 가져온다.
* PC, 모바일 공통 사용
* 작성자 : 이상필
* 
* 2022.05.12 M.Park 사용안함으로 확인중
*/
function selectRBVideoList(settings) {
	if (typeof settings.callback === "function") { settings.callback(settings) };
}