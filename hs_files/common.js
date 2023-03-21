Number.prototype.numberFormat = function(){
    if(this==0) return 0;

    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = (this + '');

    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

    return n;
};

$(function(){

	$.ajaxSetup({
		async : true,
		cache : true,
		beforeSend : function(xhr){
			xhr.setRequestHeader("ajax",true);
		},
		/*	,complete : function(xhr, textStatus){


		}*/
		error: function(xhr, textStatus, errorThrown){
			if(SERVER_TYPE == "LOCAL" || SERVER_TYPE == "DEV")
				popupAlert(SYSTEM_ERROR_MESSAGE);
		}
	});

	window.onpageshow = function(event){
		if(event.persisted || (window.performance && window.performance.getEntriesByType('navigation')[0].toJSON().type == "back_forward")){
			//뒤로가기로 진입했을 경우 상품 스크랩 재조회(상세에서 스크랩 설정/해제된 case 체크)
			isWishList = "N";
			arrWishGdsNoList = new Array();
			wishGdsNoList();
		}
	}
});

var Common = {};

/**
 * 팝업 윈도우 화면의 중간에 위치.
 *
 * @param winUrl 새창 url
 * @param winName 새창 이름
 * @param winWidth 창 넓이
 * @param winHeight 창 높이
 * @param winScroll 스크롤 여부 (yes|no)
 * @param winResize 리사이즈 여부 (yes|no)
 * @param winLeft 창 좌측 위치 값이 없으면 해상도 가로값
 * @param winTop 창 탑 위치 값이 없다면 해상도 세로값
 *
 * 예) Common.popUpWindow('주소','윈도우이름',500,400,'yes','no');
 *
 */
Common.popUpWindow = function( winUrl, winName, winWidth, winHeight, winScroll, winResize, winLeft, winTop) {
	if(typeof(winLeft)=="undefined") winLeft = parseInt((window.screen.width-parseInt(winWidth))/2, 10); //해상도가로
	if(typeof(winTop)=="undefined") winTop = parseInt((window.screen.height-parseInt(winHeight))/2, 10); //해상도세로
	if( ((window.screen.height-80)-winHeight)<0 ){
		winHeight = window.screen.height-80;
		winTop = 0;
	}
	var newWin=window.open(winUrl, winName,"width="+winWidth+",height="+winHeight+",scrollbars="+winScroll+",resizable="+winResize+",left=" + winLeft + ",top=" + winTop+",directories=no,status=no,menubar=no");
	if(newWin) newWin.focus();
};

/* 모바일 공통 alert (2020.12.24 모바일 alert 함수 공통화) 
*  ex) popupAlert("메세지<br/>입니다", function(){console.log('alert 콜백');});
*/
function popupAlert(msg, callback){
	// 2019 개편(V3)이후 화면만 해당. 해당 css 리소스가 있는경우만
	if($("#alert-pop").length > 0 && $(".m-dim").length > 0 && typeof popup_openV1 !== "undefined"){
		msg = msg.replace(/\r\n/gi, "<br/>");
		msg = msg.replace(/\n/gi, "<br/>");
		$("#alert-pop .pop-cont .pop-txt").html(msg);
		setTimeout(function(){
			popup_openV1('alert-pop');
			//포커스 이벤트와 레이어 팝업시 키보드가 동시 노출되는 현상 수정 [HF-300] - 2022.11.18
			if(typeof callback == 'undefined'){
				$(':focus').blur();
			}
		}, 200);
		
		$("#alert-pop #alertOk").off('click').on('click', function (e) {
			if(typeof callback == 'function'){
                callback();
            }
        });
	} else {
		// 일반 system alert
		alert(msg);
		if(typeof callback == 'function'){
            callback();
        }
	}
}

/* 모바일 공통 confirm (2020.12.24 모바일 confirm 함수 공통화)
*  ex) popupConfirm("조회하시겠습니까?", function(confirmFlag){ console.log(confirmFlag); });
*/
function popupConfirm(msg, callback){
	// 2019 개편(V3)이후 화면만 해당. 해당 css 리소스가 있는경우만
	if($("#alert-pop2").length > 0 && $(".m-dim").length > 0 && typeof popup_openV1 !== "undefined"){
		msg = msg.replace(/\r\n/gi, "<br/>");
		msg = msg.replace(/\n/gi, "<br/>");
		$("#alert-pop2 .pop-cont .pop-txt").html(msg);
		setTimeout(function(){
			popup_openV1('alert-pop2');
			//포커스 이벤트와 레이어 팝업시 키보드가 동시 노출되는 현상 수정 [HF-300] - 2022.11.18
			if(typeof callback == 'undefined'){
				$(':focus').blur();
			}
		}, 200);
		
		$("#alert-pop2 #confirmOk").off('click').on('click', function (e) {
			if(typeof callback == 'function'){
                callback(true);
            }
        });
		
		$("#alert-pop2 #confirmCancel").off('click').on('click', function (e) {
			if(typeof callback == 'function'){
                callback(false);
            }
        });
		
	} else {
		// 일반 system confirm
		if(typeof callback == 'function'){
            callback(confirm(msg));
        }
	}
}

/* 모바일 공통 비회원 주문 로그인 안내 confirm (상품상세에서 호출)
*  ex) popupNonmemberConfirm( function(confirmFlag){ console.log(confirmFlag); });
*/
function popupNonmemberConfirm(callback){
	setTimeout(function(){
		popup_openV1('pop-spot__nonmember');
	}, 1);
	
	$("#pop-spot__nonmember #nonmemberConfirmOk").off('click').on('click', function (e) {
		if(typeof callback == 'function'){
               callback(true);
           }
    });
	
	$("#pop-spot__nonmember #nonmemberConfirmCancel").off('click').on('click', function (e) {
		if(typeof callback == 'function'){
               callback(false);
           }
    });
}

//로그인 페이지 이동 스크립트
Common.goLogin = function(returnUrl){

	if (Common.cookieIsLogin()) {
		popupAlert(LOGIN_ALERT_MESSAGE_ALREADY_LOGIN);
		return;
	}

	popupAlert(LOGIN_ALERT_MESSAGE, function(){
		if(returnUrl){ //리턴 url 값이 있다면 해당 url로
			openLoginReturnUrl(fnStripHttp(returnUrl));
		}else{
			openLoginReturnUrl(fnStripHttp(location.href));
		}
	});
};

//로그인 페이지 이동 스크립트
Common.goLoginNoAlert = function(returnUrl){
	if(returnUrl){ //리턴 url 값이 있다면 해당 url로
		openLoginReturnUrl(fnStripHttp(returnUrl));
	}else{
		openLoginReturnUrl(fnStripHttp(location.href));
	}
};

Common.goLoginNoAlertWithParam = function(strParam){
	if(strParam){ //리턴 url 값이 있다면 해당 url로
		openLoginReturnUrl(fnStripHttp(location.href)+"&"+strParam);
	}else{
		openLoginReturnUrl(fnStripHttp(location.href));
	}
};

Common.goLoginNoAlertWithParam2 = function(returnUrl, strParam){
	openLoginReturnUrl(fnStripHttp(returnUrl)+"&"+strParam);
};

Common.goLoginNoAlertWithoutParam = function(){
	openLoginReturnUrl();
};

/* 회원가입 */
Common.goRegist = function(){
// 간편회원가입 주석처리 - 2020-06.11 임승혁
//	document.location.href = "/m/mcustomer/newMemberIntro.do";
	if (Common.cookieIsLogin()) {
		popupAlert(LOGIN_ALERT_MESSAGE_ALREADY_LOGIN);
		return;
	}

	document.location.href = "/m/mcustomer/newMembershipCerti.do";
};

Common.goRegistWithParam = function(strParam){
	if (Common.cookieIsLogin()) {
		popupAlert(LOGIN_ALERT_MESSAGE_ALREADY_LOGIN);
		return;
	}

	document.location.href = "/m/mcustomer/newMemberIntro.do?"+strParam;
};

Common.goUrl = function(url){
	location.href = url;
};

/* 네이버 로그인 */
Common.goNaverLogin = function(returnUrl){	
	if (returnUrl != null && typeof(returnUrl) != "undefined") {
		Common.setCookie("oauthNaverCookieReturnUrl", returnUrl, 1);
	}	
	Common.popUpWindow("/naverOauth/loginPopup.do", "naverAuthorizePopup", 460, 530, "no", "yes");
};

/* 페이코 로그인 */
Common.goPaycoLogin = function(returnUrl){	
	if (returnUrl != null && typeof(returnUrl) != "undefined") {
		Common.setCookie("oauthPaycoCookieReturnUrl", returnUrl, 1);
	}	
	Common.popUpWindow("/paycoOauth/loginPopup.do", "paycoAuthorizePopup", 460, 530, "no", "yes");
};

function fnStripHttp(_url) {
	// MALLDVLPRJ-1170 라이브커머스에서 한샘몰 로그인 페이지로 넘어온경우 (2021.02.04 김동진)
	if(_url.indexOf("mall.saucelive.net") > -1 || _url.indexOf(".sauceflex.com") > -1) {
		
	} else if(_url.indexOf("remodeling.hanssem.com") > -1) {		//마이한샘 메인에서 리모델링 페이지로 넘어갈 경우 replace 처리안함 - 2023.01.18 김재욱
		
	} else { // 그 외 .hanssem.com url
		//_url = _url.replace(/^https?:\/\//,'').replace(/^http?:\/\//,'');
		_url = encodeURIComponent(_url.replace(/^.*\/\/[^\/]+/, ''));
	}
	return _url;
}
//*******************************링크 끝*******************************

/* 스크랩 담기 */
Common.addWishList = function(gdsNo, fnc, obj, dupYN){

	dupYN = dupYN || "N";

	// 스크랩 대상이 리모델링 상품이면 스크랩 구분을 GR로 넣고 리모델링용 스크랩 정보를 추가로 셋팅함
	var wishGbnCd = "";
	var title = "";
	var imgUrl = "";
	var detailUrl = "";
	if($(obj).attr("deptcd") == 'RH'){
		wishGbnCd = 'GR';
		title = $(obj).attr("title");
		imgUrl = $(obj).attr("imgUrl");
		detailUrl = $(obj).attr("detailUrl");
	} else {
		wishGbnCd = 'GS';
	}

	$.ajax({
        url      : "/m/mgoods/insertWishList.do?dupYN=" + dupYN,
        type     : 'post',
        data	 : {targetNo : gdsNo, wishGbnCd : wishGbnCd, title : title, imgUrl : imgUrl, detailUrl : detailUrl},
        dataType : 'json',
        cache    : false,
        async    : false,
        success  : function(json) {

        	/* L: 로그인 필요, Y : 스크랩 등록, D : 삭제 */
    		if($.isFunction(fnc)){
    			fnc(json.wishResult);
    		}
    		
    		if(json.wishResult == "Y"){
    			//아이겐 tracking
        		window._eglqueue = window._eglqueue || [];
				_eglqueue.push(['setVar','cuid','26703490-8b5d-420c-b95a-39bfd7a6e9f1']);
				_eglqueue.push(['setVar','itemId',gdsNo]);
				_eglqueue.push(['setVar','userId',Base64.decode(Common.getCookie("loginCookieNo"))]);
				_eglqueue.push(['track','like']);
				if (SERVER_TYPE == 'REAL') {
					setTimeout(function() {
						(function(s,x){s=document.createElement('script');s.type='text/javascript';
						s.async=true;s.defer=true;s.src=(('https:'==document.location.protocol)?'https':'http')+
						'://logger.eigene.io/js/logger.min.js';
						x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);})();
					}, 0);
				}
			}
        }
    });
};


/**
* 쿠키 셋팅
* @param name 쿠키이름
* @param value 쿠키값
* @param expiredays 날짜 ( 1:하루 )
*
* setCookie( "Notice", "done" , 1); 하루동안 쿠키 저장
*/
Common.setCookie = function( name, value, expiredays ){
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
};

/**
* 쿠키값 가져오기
* @param name 쿠키이름
* @return String 쿠키값
*
* getCookie(쿠키이름)
*/
Common.getCookie = function(name){
	var prefix = name + "=";
	var cookieStartIndex = document.cookie.indexOf(prefix);
	if (cookieStartIndex == -1)
		return "";
	var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
	if (cookieEndIndex == -1)
		cookieEndIndex = document.cookie.length;
	return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
};

/**
* 쿠키 소멸
* @param name 쿠키이름
*/
Common.clearCookie = function(name){
	var today = new Date();
	//어제 날짜를 쿠키 소멸 날짜로 설정한다.
	var expire_date = new Date(today.getDate() - 1);
	document.cookie = name + "= " + "; path=/; expires=" + expire_date.toGMTString();
};

/*String.prototype.toInt = function () {
    if (/^-/.test(this)) {
        return this.replace(/\..*$/g, '').replace(/[^\d]/g, '') * -1;
    } else {
        return this.replace(/\..*$/g, '').replace(/[^\d]/g, '') * 1;
    }
};
String.prototype.toNum = function () {
    if (/^-/.test(this)) {
        return this.replace(/(\.[^\.]+)\..*$/g, '$1').replace(/[^\d\.]/g, '');
    } else {
        return this.replace(/(\.[^\.]+)\..*$/g, '$1').replace(/[^\d\.]/g, '');
    }
};
*/

String.prototype.toNum2 = function (type) {
	if(typeof this == 'string' || type == "A") {
		if (/^-/.test(this)) {
	        return this.replace(/(\.[^\.]+)\..*$/g, '$1').replace(/[^\d\.]/g, '') * -1.0;
	    } else {
	        return this.replace(/(\.[^\.]+)\..*$/g, '$1').replace(/[^\d\.]/g, '') * 1.0;
	    }
	}
};
String.prototype.numberFormat = function (type) {
	var ret = "";
	if(typeof this == 'string' || type == "A") {
		var num = (this.toNum2("A") + '').split(/\./);
		var commal = function (text) {
			var ret = text.replace(/(\d)(\d{3},)/g, '$1,$2');
			if (ret == text) return ret;
			return commal(ret);
		};
		var commar = function (text) {
			var ret = text.replace(/(,\d{3})(\d)/g, '$1,$2');
			if (ret == text) return ret;
			return commar(ret);
		};
		var ret = commal(num[0].replace(/(\d)(\d{3})$/g, '$1,$2'));
		if (num.length > 1) {
			ret += '.' + commar(num[1].replace(/^(\d{3})(\d)/g, '$1,$2'));
		}
	}

	return ret;
};

//3자리 콤마 구분
Common.GetNumberFormat = function(str) {
	return str.numberFormat("A");
};

//히든생성
Common.makeHidden = function(hiddenName, hiddenValue) {
  var objHidden = document.createElement("input");
  objHidden.type = "hidden";
  objHidden.id = hiddenName;
  objHidden.name = hiddenName;
  objHidden.value = hiddenValue;

  return objHidden;
};

/**
 * JSP -> Controller Base64 암복호화 처리 (한글깨짐 해결)
 * User : Base64.encode(str);
 * 2014.09.23 백승익 추가
 * */
var Base64 = {
		// private property
		_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

		// public method for encoding
		encode : function (input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;

			input = Base64._utf8_encode(input);

			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);

				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;

				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}

				output = output +
				this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
				this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
			}
			return output;
		},

		// public method for decoding
		decode : function (input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;

			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

			while (i < input.length) {
				enc1 = this._keyStr.indexOf(input.charAt(i++));
				enc2 = this._keyStr.indexOf(input.charAt(i++));
				enc3 = this._keyStr.indexOf(input.charAt(i++));
				enc4 = this._keyStr.indexOf(input.charAt(i++));

				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;

				output = output + String.fromCharCode(chr1);

				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
			}
			output = Base64._utf8_decode(output);
			return output;
		},

		// private method for UTF-8 encoding
		_utf8_encode : function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";

			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		},

		// private method for UTF-8 decoding
		_utf8_decode : function (utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;

			while ( i < utftext.length ) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}
				else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}

}

Common.commentVideoUrl = function(videoUrl){

	var youtubeVideoUniqueVal;
	var youtubeIframeUrl = "https://www.youtube.com/embed/";

	/* 유투브 */
	if(videoUrl.indexOf("/youtu.be/") > -1){
		youtubeVideoUniqueVal = videoUrl.substring(videoUrl.lastIndexOf("/") + 1);
		return youtubeIframeUrl + youtubeVideoUniqueVal;
	}else if(videoUrl.indexOf("//www.youtube.com/embed/") > -1){
		return videoUrl;
	}else if(videoUrl.indexOf("//www.youtube.com/watch?v=") > -1){
		youtubeVideoUniqueVal = videoUrl.substring(videoUrl.lastIndexOf("=") + 1);
		return youtubeIframeUrl + youtubeVideoUniqueVal;
	}

	/* 네이버 */
	if(videoUrl.indexOf("//serviceapi.nmv.naver.com/flash/convertIframeTag.nhn") > -1){
		if(videoUrl.indexOf("&width") > -1){
			return  videoUrl.substring(0, videoUrl.indexOf("&width"));
		}else{
			return videoUrl;
		}
	}

	return "";
};

//로그인 여부
Common.cookieIsLogin = function(){

	var cookie_is_login = false;
	var cookie_login_id = Common.getCookie("loginCookieId");

    if (cookie_login_id != null && cookie_login_id != "") {
    	cookie_is_login = true;
    }

    return cookie_is_login;
}

/**
* 모바일 여부
* @return boolean
*/
Common.isMobile = function(){	
	try {
		/* userAgent에서 app에서 추가한 값을 확인하여 모바일 여부 체크, 2021.02.22, yong*/
		var deviceChannelByAgent = Common.getDeviceChannel();
		if( $.trim(deviceChannelByAgent) != "" ) {
			return true;
		}
		
		var deviceChannel = Base64.decode(Common.getCookie("deviceChannel"));
		if( $.trim(deviceChannel) != "" ) {
			return true;
		} else {
			return false;
		}
	} catch(e) {
		if (window.console) {console.log(e);}
	}
	return false;
};

/**
 * 로그아웃
 * @param returnUrl
 * 수정 16.11.01 로그아웃 실행 후, 페이지 이동처리 추가 (김동진)
 * 예) logout(); [로그아웃 후, 메인으로 이동(default)]
 * 예) logout("void"); [로그아웃 후, 페이지 이동없음]
 * 예) logout("/csCenter/csMain.do"); [로그아웃 후, 특정페이지로 이동]
 */
Common.logout = function(returnUrl) {
	if(fnIsApp()) {
		try {
			try {
				webkit.messageHandlers.userLogoutHandler.postMessage("logout");
			} catch (err) {
				window.hssMobile.logout();
			}
		} catch (err) {}
	} else {
		$.ajax({
			url: "/customer/logout.do",
			data: {"deviceAppId": ""},		//deviceAppId이 앱에서 자동 로그인 처리시 사용되는 값인데 앱에서는 무조건 자동 로그인이므로 빈값으로 변경 - 2023.02.23 김재욱
			type: 'get',
			dataType: 'jsonp',
			cache: false,
			async: false,
			success: function (json) {
				if (typeof returnUrl === "undefined") {
					location.href = "/m/main.do?MallType=MAIN";
				} else if (returnUrl == "void") {
				} else {
					location.href = encodeURIComponent(returnUrl);
				}
			}
		});
	}
};

/**
 * 로그아웃 후 메인페이지 이동
 * 21.02.23 로그아웃 ajax에서 페이지 이동으로 수정
 */
Common.logoutReturnMain = function(){
	location.href="/customer/logoutReturnMain.do";
}

/**
 * 로그아웃시 재확인 메시지 출력
 */
Common.logoutConfirm = function(returnUrl) {
	popupConfirm("한샘몰에서 로그아웃을<br />하시겠습니까?", function(confirmFlag) {
		if(confirmFlag) {
			if(fnIsApp()) {
				try {
					try {
						webkit.messageHandlers.userLogoutHandler.postMessage("logout");
					} catch (err) {
						window.hssMobile.logout();
					}
				} catch (err) {}
			} else {
				// 로그아웃 후 메인으로 이동
				$.ajax({
					url: SERVER_HTTPS_URL + "/customer/logout.do",
					data: {"deviceAppId": deviceAppId},
					type: 'get',
					dataType: 'jsonp',
					cache: false,
					async: false,
					success: function (json) {
						if (typeof returnUrl === "undefined") {
							location.href = "/m/main.do?MallType=MAIN";
						} else if (returnUrl == "void") {
						} else {
							location.href = encodeURIComponent(returnUrl);
						}
					}
				});
			}
		}
	});
};

 /**
  * CSRF 방지 토큰값 생성 (2020.07.01, yong)
  */
var generateCsrfToken = function() { 
	function generateRandomString(length) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for(var i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length)); 
		}
		return text;
	}
	return btoa(generateRandomString(32));
}

/**
 * SMS 인증 번호 확인
 * @param emmaCerfNum 인증키
 * @param cerfiOwnPhone 인증번호
 * @returns {Boolean}
 */
function cerfiCheck(emmaCerfNum, cerfiOwnPhone) {
	var resultCd = false;
	$.ajax({
		url: "/m/mcustomer/checkCerfNumAjax.do",
		type: "post",
		data: { "emma_cerf_num" : emmaCerfNum, "cerfi_own_phone": cerfiOwnPhone },
		dataType : 'json',
		async : false,
		cache : false,
		success: function(json) {
			if(json.resultCode == "success") {
				resultCd = true;
			}
		},
		error: function(xhr, textStatus, errorThrown) {

		}
	});

	return resultCd;
}

/**
 * 숫자에 천단위 콤마 표기
 * @param n
 * @returns
 */
function commify(n) {
	var reg = /(^[+-]?\d+)(\d{3})/;		// 정규식
	n += "";		// 숫자를 문자열로 변환

	while (reg.test(n))
		n = n.replace(reg, "$1" + "," + "$2");
	return n;
}

/*----- 2017.02.17 Merge 영역 : Start -----*/
/* -------------------------------- 공통 레이어 ----------------------------- */
function commonModalFn(objID){
	$(".layer_mask").show();
	$(".layer_mask").css({"opacity":0.6});
	$("#"+objID).css("margin-top", -($("#"+objID).height()/2));
	$("#"+objID).css("margin-left",-($("#"+objID).width()/2));
	$("#"+objID).fadeIn();
	$(".commonModal_close a").click(function() {
		$("#"+objID).hide();
		$(".layer_mask").fadeOut();
	});
	$(".layer_mask").click(function() {
		$("#"+objID).hide();
		$(".layer_mask").fadeOut();
	});
}

/**
 * 우측 사이드 메뉴 오픈
 * @returns {}
 * @since 2018.02.22 작성
 */
function side_menu_open(){
	if ($(".side_view").length > 0) {
		$("html").addClass("has-modal");
		$("body").prepend('<div class="o-dimed is-active"></div>');
		$(".side_view").show().stop().animate({'right':0}, 300);
		sideMenuMyPage();
	} else {
		setTimeout(function(){ side_menu_open(); }, 250);
	}
}

/**
 * 우측 사이드 메뉴 닫기, 카테고리 전체 보기 버튼 Event Bind
 * @returns {}
 * @since 2018.02.22 작성
 */
function side_menu_act(){
	$(".side_close").click(function() {
		$("html").removeClass("has-modal");
		$(".o-dimed").remove();
		$(".side_view").stop().animate({'right':'-82%'}, 300, function(){
			$(this).hide();
			$(".sub_category").hide();
		});
	});
	$(".cate_view").click(function() {
		$(".sub_category").show().stop().animate({'right':'-100%'}, 300, function() {
			$(this).hide();
		});
	});
}

/**
 * 우측 사이드 메뉴 로그인 영역 및 카운트 조회
 * @returns {}
 * @since 2018.02.22 작성
 */
function sideMenuMyPage(){
	var login_btn_html = "";
	if (Common.cookieIsLogin()) {
		login_btn_html += "<div class=\"userid\"><span class=\"id_txt\">"+$.cookie("loginCookieName")+"</span>님</div>";
		login_btn_html += "<a href=\"javascript:;\" onclick=\"Common.logoutConfirm();\" class=\"log_btn on\">로그아웃</a>";
		
		$("#side_view_menu_order a").attr("href", "/m/mmyorder/goOrder.do?_PAGE_GB=A");
		$("#side_view_menu_review a").attr("href", "/m/mmypage/goodsAppraisalList.do");
	} else {
		login_btn_html += "<a href=\"javascript:;\" onclick=\"Common.goLoginNoAlertWithParam('util=login');return false;\" class=\"log_btn\">로그인</a>";
		
		$("#side_view_menu_order a").attr("onclick", "Common.goLoginNoAlertWithParam2('/m/mmyorder/goOrder.do?_PAGE_GB=A', '');return false;");
		$("#side_view_menu_review a").attr("onclick", "Common.goLoginNoAlert('/m/mmypage/goodsAppraisalList.do');return false;");
	}
	$("#side_view").find(".log_info").html(login_btn_html);
		
	$.ajax({
		url : "/common/orderCntAjax.do",
		type : 'get',
		dataType : "json",
		cache : false,  
		success : function(json){
			if(json.orderCnt > 0){
				$("#side_view").find("#orderCnt").text(json.orderCnt);
				$("#side_view").find("#orderCnt").show();
			} else {
				$("#side_view").find("#orderCnt").hide();
			}
			if(json.goodsAppraisalBeforeWhiteCnt > 0){
				$("#side_view").find("#beforeWriteCnt").text(json.goodsAppraisalBeforeWhiteCnt);
				$("#side_view").find("#beforeWriteCnt").show();
			} else {
				$("#side_view").find("#beforeWriteCnt").hide();
			}
			if(json.wishCnt > 0){
				$("#side_view").find("#wishCnt").text(json.wishCnt);
				$("#side_view").find("#wishCnt").show();
			} else {
				$("#side_view").find("#wishCnt").hide();
			}
			if(json.cartCnt > 0){
				$("#side_view").find("#cartCnt").text(json.cartCnt);
				$("#side_view").find("#cartCnt").show();
			} else {
				$("#side_view").find("#cartCnt").hide();
			}
		}
	});	
}
$(function() {
	side_menu_act();
	
	//팝업 호출(상품상세) [2021. 10. 26.][FRODO][MALLDVLPRJ-1540]
	//앱다운로드 레이어 복원으로 앱다운로드 팝업주석처리  [2022. 02. 27.][안서영][MALLDVLPRJ-1659]	
	/*if(location.pathname.indexOf("/m/mgoods/goodsDetailMall") > - 1) { // 상품상세
		get_gds_popup();
	}*/
	
	// 앱다운로드 레이어 복원  [2022. 02. 27.][안서영][MALLDVLPRJ-1659]
	var appDownLayerCallBack = ''; // 앱다운로드 레이어 콜백함수
	if(location.pathname.indexOf("/m/main.") > - 1) { // 메인
		appDownLayerCallBack = get_main_popup;
	} else if(location.pathname.indexOf("/m/mgoods/goodsDetailMall") > - 1) { // 상품상세
		appDownLayerCallBack = get_gds_popup;
	}
	// 앱다운로드 레이어
	if($("#pop-app").length > 0){
		// 검색페이지 앱다운로드 레이어 노출 제외 처리(MALLDVLPRJ-1822) 2022.06.24 임승혁
		if(location.pathname.indexOf("/m/msearch/search.") == - 1) {
			appDownLayer(appDownLayerCallBack);
		}
	}
});


// side_view 함수 끝
/* // -------------------------------- 공통 레이어 ----------------------------- */

/**
 * 뒤로가기
 * @returns
 */
function historyBack() {
	if(!fnIsApp()){
		if(document.referrer == ""){
			document.location.href = "/m/main.do?MallType=MAIN";
		}else{
			if(typeof isKmc != "undefined") {
				if(isKmc == true) {
					isKmc = false;
					$("#kmcSubmit").hide();		//본인인증 iframe 숨김
					
					if(kmcWhere === "updateMembershipCustomer") {
						/* 모바일 회원정보변경(통합멤버십회원) UI */
						$("#pageContDiv").show();
						$(".float-page-btn").show();
					} else if(kmcWhere === "updateMembershipCerti") {
						/* 통합멤버십 가입전환시 본인인증 화면 */
			    		$(".phone-check-comp").show();
			    		$(".terms-comp").show();		//이용 약관 노출
					} else if(kmcWhere === "noActionMemeberInfo") {
						/* 휴면회원 계정안내 화면 */
			    		$("div.mem-dormant").show();
					} else if(kmcWhere === "memberSearchInfo") {
						/* 아이디/비밀번호 찾기 화면 */
			    		$("div.idpw").show();
					} else if(kmcWhere === "updateMembershipMallCustomer") {
						/* 매장고객 회원정보변경용이지만 현재 미사용 - 2023.01.06 김재욱 */
			    		$("main").show();
					} else if(kmcWhere === "newMembershipCerti") {
						/* 회원가입 */
			    		$("div.join-wrap").show();
					} else if(kmcWhere === "updateStoreCustomerMbs") {
						/* 매장고객 회원정보변경 */
			    		$("main").show();
					} else{
						history.back(); // (HF-331) 일부 페이지 뒤로가기 불가한 현상 수정
					}
				} else {
					if(kmcWhere === "updateMembershipCustomer") {
						//모바일 회원정보변경으로 진입하는 방법은 두가지.
						//첫번째는 마이한샘에서 정보변경을 통해 진입하는 방법과 두번째는 휴면해제성공 또는 아이핀키 없는 회원의 본인인증성공 후 정보변경 화면으로 진입하는 방법이다.
						//첫번째 방법으로 진입시 뒤로가기는 기존 로직과 동일하며 두번째 방법으로 진입시 뒤로가기는 마이한샘 메인화면으로 돌아가야 한다 - 2023.01.16 김재욱
						if(typeof originHistoryLength != "undefined" && originHistoryLength != "") {		//두번째 방법으로 진입
							history.go(((history.length - (originHistoryLength - 2)) * -1));
						} else {		//첫번째 방법으로 진입
							history.back();
						}
					} else {
						if(kmcCount == 0) {
							history.back();
						} else {
							history.go((history.length - (historyLength - 1)) * -1);
						}
					}
				}
			} else {
				//뒤로가기 원페이지 히스토리수가 있으면 해당 페이지로 이동 - 2023.01.13 김재욱
				if(typeof originHistoryLength != "undefined" && originHistoryLength != "") {
					history.go(((history.length - (originHistoryLength - 1)) * -1));
				} else {		//없으면 그전 히스토리
					history.back();
				}
			}
		}
	}else{
		if (!appPopupClose()) {
			if(typeof isKmc != "undefined") {
				if(kmcWhere === "updateMembershipCustomer") {
					/* 모바일 회원정보변경(통합멤버십회원) UI */
					if(isKmc == true) {
						$("#kmcSubmit").hide();
						$("#pageContDiv").show();
						$(".float-buy-btn").eq(0).show();
						isKmc = false;
					} else {
						if(kmcCount == 0) {
							history.back();
						} else {
							history.go((history.length - (historyLength - 1)) * -1);
						}
					}
				}else{
					history.back(-1);					
				}
			}else{
				history.back(-1);
			}
		}
	}
}

/**
 * 검색페이지로이동
 * @param ctgNo 중카테고리번호
 * @returns
 */
function appPopupClose() {
	var _returnUrl = (typeof returnUrl !== "undefined" ? returnUrl : ""); //로그인 페이지의 param 처리
	if (location.href.indexOf(appWebviewCloseParam) > -1 || _returnUrl.indexOf(appWebviewCloseParam) > -1) {
		if (isIOSWebKit) {
			try {
				webkit.messageHandlers.popupCloseHandler.postMessage(location.href);
			} catch(err) {
				if (window.console) {console.log(err.message);}
			}
		} else {
			if ($("#appCheck").length == 0) {
			    var iframe = document.createElement('iframe');
			    iframe.setAttribute("style", "display:none;");
			    iframe.setAttribute("id", "appCheck");
			    document.body.appendChild(iframe);
			}
			$("#appCheck").attr("src", "hss://hanssem.mobile.nativePopupClose");
			iframeError = setTimeout(error, 500);
			clearTimeout(iframeError);
		}
		return true;
	} else {
		return false;
	}
}

/**
 * 검색페이지로이동
 * @returns
 */
function goSearch() {
	location.href = "/m/msearch/searchKeyword.do";
}

/**
 * 중카테고리목록페이지로이동
 * @param ctgNo 중카테고리번호
 * @returns
 */
function goLCategoryList(ctgNo) {
	location.href = "/m/mcategory/goHsmLctgy.do?ctgrNo="+ctgNo+"&categoryall=L"+ctgNo;
}


/**
 * 소카테고리목록페이지로이동
 * @param ctgNo 소카테고리번호
 * @returns
 */
function goMCategoryList(ctgNo) {
	location.href = "/m/mcategory/goHsmMctgy.do?ctgrNo="+ctgNo+"&categoryall=M"+ctgNo;
}

/**
 * isApp
 * @return true/false
 * @history
 * 2021.02.19 | yong | userAgent에 앱구분코드(AOS : HSAppAOS/{버전} , IOS : HSAppIOS/{버전})가 있으면 true (HMOAPPOP-106)
 */
var isApp = false;
function fnIsApp() {
	var _userAgnet = window.navigator.userAgent;
	if(_userAgnet.match("HSAppAOS") || _userAgnet.match("HSAppIOS")) {
		isApp = true 
	} else {
		var deviceChannel = "";
		
		try {
			deviceChannel = Base64.decode(Common.getCookie("deviceChannel"));
		} catch(e) {
			deviceChannel = "MOWEB";
		}
		
		if(deviceChannel == "MOAPP"){
			isApp = true;
		}
	}
	
    return isApp;
}

/**
 * fnAppVersion
 * @return appVersionCode(122)
 * @history
 * user-agent sample Mozilla/5.0 (Linux; Android 12; SM-G977N Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/102.0.5005.125 Mobile Safari/537.36 Android 12, SM-G977N, HSAppAOS/4.4.5
 * return sample HSAppAOS/4.4.5 > 445
 */

function fnAppVersionCode(){
	var appVersion = 0;
	if (fnAppDeviceGubn() == null || fnAppDeviceGubn() == undefined) {
		return appVersion
	}

	try {
		var useragent = navigator.userAgent;
		var appVersionName = useragent.split("/")[useragent.split("/").length - 1].replace(/\./gi, '');
		appVersion = parseInt(appVersionName)
	} catch (e) {
	}
	return appVersion
}

function fnAppDeviceGubn() {
	var useragent = navigator.userAgent;
	if (useragent.match("HSAppAOS")) {
		return 'AND'
	} else if (useragent.match("HSAppIOS")) {
		return 'IOS'
	} else {
		return null;
	}
}

function fnLnbOpen() {
	if(fnIsApp()){
		try {
			webkit.messageHandlers.callbackHandler.postMessage("lnb");
		}catch(e) {
			try {
				window.hssMobile.openDrawer();
			}catch(err) {
				if (window.console) {console.log(err);}
			}
			if (window.console) {console.log(e);}
		}
	} else {
		side_menu_open();
	}
}

/*----- 2017.02.17 Merge 영역 : End -----*/
function closeIframe(){
	$("#LGD_PAYMENTWINDOW").hide();
}


//*******************************날짜관련 함수 SART *******************************
/**
 * 현재일부터 theOffsetInSeconds 만큼 변경된 날짜를 얻는다. (yyyyMMddHHmmss)
 * @returns 20170630183255
 * @author 김동진
 * @since 2017.06.30
 */
Common.getStrDateInSeconds = function(theOffsetInSeconds){
	var strFullDate;
	$.ajax({
        url      : "/common/getStrDateInSeconds.do",
        type     : 'get',
        data     : {"theOffsetInSeconds" : theOffsetInSeconds},
        dataType : 'text',
        cache    : false,
        async    : false,
        success  : function(result) {
        	strFullDate = result;
        }
    });
	return strFullDate;
};

/**
 * 기간조회 text에 입력된 날짜가 유효한 형식인지 체크하는 함수
 * @author 김재욱
 * @since 2018.08.21
 */
Common.validateDate = function(objID) {
	var datePrev = "";
	$("#" + objID).focus(function () {
		datePrev = $(this).val(); 
	}).focus(function () {
		$("#" + objID).val($("#" + objID).val().replace(/\./g,""));
	}).change(function () {
		if ( $("#" + objID).val() == "") {
			return true;
		}
		
		if ( !Common.isDate($("#" + objID).val()) ) {
			popupAlert("입력가능한 형식이 아닙니다.<br/>(yyyyMMdd)");
			$(this).val(datePrev); 
			return false;
		}
	}).blur(function () {
		if ( $("#" + objID).val().length == 8 ) {
			$("#" + objID).val($("#" + objID).val().substring(0, 4) + "." + $("#" + objID).val().substring(4, 6) + "." + $("#" + objID).val().substring(6, 8));
		}
		
	});
};

/** 
 * 날짜 validation check 
 * 400년마다 어쩌구, 100년 마다 어쩌구는 무시한다. ( 이 시스템을 2100년이후에 쓸거면 그때가서 수정해라 )
 * 1900년 2월 29일은 존재하지 않고, 2100년 2월 29일은 존재하지 않는다.
 *
 * @param 값
 * @return boolean 
 * @author M.Park
 */
Common.isDate = function(dateValue) {
	try {
		if ( dateValue == undefined || dateValue == null ) {
			return false;
		}
		
		var year	= 0;
		var month	= 0;
		var day		= 0;
		
		year = eval(dateValue.substring(0,4));
		
		if ( dateValue.length == 10 ) {
			month	= eval(dateValue.substring(5,7));
			day		= eval(dateValue.substring(8,10));
		} else if ( dateValue.length == 8 ) {
			month	= eval(dateValue.substring(4,6));
			day		= eval(dateValue.substring(6,8));
		} else {
			return false;
		}
		
		if ( day <= 0 || day >= 32) {
			return false;
		} else if ( month > 12 || month <= 0) {
			return false;
		} else if ( year < 1900 ) {
			return false;
		}
		
		var lastDay = 31;
		
		switch (month) {
			case 4, 6, 9, 11:
				lastDay = 30;
				break;
			case 2:
				if ( year % 4 == 0 ) {
					lastDay = 29;
				} else {
					lastDay = 28;
				}
				break;
			default:
				lastDay = 31;
				break;
		}
		
		if ( lastDay < day ) {
			return false;
		}
	} catch ( exception ) {
		return false;
	}
	
	return true;
};
//*******************************날짜관련 함수 END *******************************

/* 동영상 레이어 */
var movie_pos_Y = 0, videoPlayerHtml;
function openVideoCloudLayer(gdsNo, videoID) {
	if (videoID == null || videoID == "") {
	} else {
		var _v;
		if (videoID.indexOf(",") == -1) {
			_v = videoID;
		} else {
			_v = videoID.split(",")[0];
		}
		
		movie_pos_Y = $(window).scrollTop();
		$("html").addClass("has-modal");
		
		if ($("#gds_video_pop").length == 0) {
			$("body").append('<div class="fit_layer" id="gds_video_pop"></div>');
		}
		$("#gds_video_pop").append(
			'<div class="fit_layer_wrap">'
			+	'<div class="layer_tit">동영상</div>'
			+	'<div class="layer_cont">'
			+		'<div class="yscroll_obj YScroll">'
			+			'<div class="video_sect">'
			+				'<div class="video_area" id="video_obj"></div>'
			+				'<div class="video_prd">'
			+					'<div class="video_prd_list rels" id="recobell_video_gds_layer">'
			+						'<div class="m_prd_tit">연관 상품</div>'
			+					'</div>'
			+					'<div class="video_prd_list" id="recobell_video_gds_rel_layer">'
			+						'<div class="m_prd_tit">추천 상품</div>'
			+					'</div>'
			+				'</div>'
			+			'</div>'
			+		'</div>'
			+	'</div>'
			+	'<a href="javascript:;" class="layer_close"><img src="/resources/mobile/images/m_common/layer_close.png" /></a>'
			+'</div>'
		);
		//$(".no_bubble").on('touchmove touchstart touchend touchcancel webkitTransitionEnd transitionend', function(e){e.preventDefault();e.stopPropagation();});
		$("#gds_video_pop").addClass("fitOn");
		
		$(".is-ios .YScroll").YScroll();
		setTimeout(function(){
			gridGdsLayerVideo("MW_goods", _v, "video_obj");
		}, 0);
		if (isWishList == "N") {
			setTimeout(function(){
				wishGdsNoList();
			}, 0);
		}	
		
		/* 동영상 레이어 닫기 */
		$(".fit_layer .layer_close").click(function() {
			$("html").removeClass("has-modal");
			$("#gds_video_pop").removeClass("fitOn");
			$("#gds_video_pop").empty();
			$('html,body').scrollTop(movie_pos_Y);
		});
		
		/* 레코벨 */
		selectRBAPI({
			rb_type				: "a001",
			cpt					: "m001",
			format				: "jsonp",
			size				: "50",
			page				: 1,
			row_list			: 50,
			img_size			: 100,
			rccode				: "MO_VIDEOL_A001",
			channel				: "M",
			iids				: gdsNo,
			gridObj				: $("#recobell_video_layer"),
			fn_empty_prd		: function(){
									$("#recobell_video_layer").hide();
								},
			fn_empty_prd_rel	: "",
			fn_second_prd_rel	: "",
			fn_complete			: "",
			callback			: gridVideoLayerGoods
		});
	}
}

function gridGdsLayerVideo(rbChannel, videoId, el_id) {
	var playerId = "", autoplay = "";
	if (rbChannel == "MW_goods") {
		playerId = "ByaMSIB2M";
		autoplay = " muted autoplay playsinline ";
	} else if (rbChannel == "MW") {
		playerId = "ByaMSIB2M";
		autoplay = " muted autoplay playsinline ";
	} else if (rbChannel == "TV") {
		playerId = "Sy51CogGX";
	} else if (rbChannel == "MW_best") {
		playerId = "";
	}
	//gridGdsVideo(rbChannel, playerId, videoId, autoplay, el_id);
	//gridYoutubeComponentLayer(rbChannel, videoId, el_id, 360, 202, true);
	gridWecandeoComponentLayer(rbChannel, videoId, el_id, 360, 202, true);
}

//위캔디오 동영상 영역 셋팅(layer 화면용) (2021.04.12 김동진)
function gridWecandeoComponentLayer(rbChannel, videoId, el_id, width, height, isAutoplay) {
	if ($("#"+el_id).length > 0) {
		$("#"+el_id).empty();

		var playerHTML = '<iframe src=\"https://play.wecandeo.com/video/v/?key=' + videoId + '\"'
		playerHTML += ' frameborder=\"0\" allowfullscreen allow=\autoplay;fullscreen;\"';
		playerHTML += ' style=\"width:'+width+'px; height:'+height+'px;\"></iframe>';
		
		$("#"+el_id).append(playerHTML);
	}
}

//관심상품 조회
var isWishList = "N", arrWishGdsNoList = new Array();
function wishGdsNoList() {
	if (Common.cookieIsLogin() && isWishList == "N" && arrWishGdsNoList.length == 0) {
		$.ajax({
			url : "/common/mobileHtmlWishListAjax.do",
			type : 'get',
			dataType : "json",
			cache : false,  
			success : function(json){
				isWishList = "Y";
				arrWishGdsNoList = json.wishGdsList;
				fillWishFlag();
			}
		});
	}
}

//관심상품 표시 [2022. 11. 15.][FRODO][IYVG-323]
function fillWishFlag() {
	$(".btn-bookmark").each(function(i){
		$(this).removeClass("on");
		for (var x=0; x < arrWishGdsNoList.length; x++) {
			if ($(this).attr("gdsNo") == arrWishGdsNoList[x]) {
				$(this).addClass("on");
			}
		}
	});

	//list-node로 페이징하는 컴포넌트가 있어서 처리
	$(".list-node[data-gds-no]").each(function(){
		$(this).attr("data-bookmark-flag","N");
		for (var x=0; x < arrWishGdsNoList.length; x++) {
			if ($(this).attr("data-gds-no") == arrWishGdsNoList[x]) {
				$(this).attr("data-bookmark-flag","Y");
			}
		}
	});
	
	//상품상세 스크랩 표시 2023.02.22 김재욱
	if($(".btn.like").length > 0) {
		for (var x=0; x < arrWishGdsNoList.length; x++) {
			if ($(".btn.like").attr("gdsNo") == arrWishGdsNoList[x]) {
				$(".btn.like").addClass("on");
			}
		}
	}
}

//관심상품 클릭 [2022. 11. 15.][FRODO][IYVG-323]
function myWishList(obj, gdsNo) {
	if (!Common.cookieIsLogin()) {
		popupConfirm(LOGIN_CONFIRM_MESSAGE, function(confirmFlag){
			if(confirmFlag){
				Common.goLoginNoAlert(location.pathname + location.search);
			}
		});
	} else {
		Common.addWishList(gdsNo, function (result) {
			if (result == "Y") {
				arrWishGdsNoList.push(gdsNo);
				$(".btn-bookmark[gdsNo='" + gdsNo + "']").each(function (i) {
					$(this).addClass("on");
				});
			} else {
				$(".btn-bookmark[gdsNo='" + gdsNo + "']").each(function (i) {
					$(this).removeClass("on");
				});
				for (var x = 0; x < arrWishGdsNoList.length; x++) {
					if (arrWishGdsNoList[x] == gdsNo) {
						arrWishGdsNoList.splice(x, 1);
					}
				}
			}
		}, obj);
	}
}

/**
 * 프리미엄멤버십 회원여부 조회
 * @returns boolean
 * @author 김동진
 * @since 2018.05.23
 */
Common.isPremiumMShip = function() {
	var premiumMShipFlag = false;
	$.ajax({
        url      : "/common/isPremiumMShip.do",
        type     : 'get',
        cache    : false,
        async    : false,
        success  : function(result) {
        	premiumMShipFlag = result;
        }
    });
	return premiumMShipFlag;
};

//카카오 상담서비스 안내 알림톡 요청(ALLDVLPRJ-1091)(2020 한샘몰개편) 2020-11-09 by.박형준
Common.kakaoTalkSend = function(){
	// 로그인 체크
	if( !Common.cookieIsLogin() ){
		popupConfirm(LOGIN_CONFIRM_MESSAGE, function(confirmFlag){
			if( confirmFlag ){
				Common.goLoginNoAlertWithParam('util=login');
			}
		});			
		return;
	}
	else{
		// 휴대폰 번호 체크
		var resultBool = false;
		$.ajax({
			 url : "/customer/custValidationCheckAjax.do"
		    ,type : "post"
		    ,data : { mobileNo : "" }
		    ,dataType : "json"
		    ,cache : false
		    ,async : false
			,success : function(data){
				if( data.resultCode == "success" ){
					resultBool = true;
				}
				else if( data.resultCode == "errMobileNo" || data.resultCode == "fail" ){
					resultBool = false;
					popupConfirm(errMobileNoMsg, function(confirmFlag){
						if( confirmFlag ){
							location.href = "/m/mmypage/customer/custInfoPasswordCheck.do";
						}
					});
				}
			}
			,error : function(xhr, textStatus, errorThrown){
				popupAlert("처리중 오류가 발생했습니다. 관리자에게 문의바랍니다.");
				resultBool = false;
			}
		});
		
		// 카카오 안내 알림톡 발송
		if( resultBool ){
			$.ajax({
				url : "/common/kakaoNoticeTalkSendAjax.do",
				type : "get",
				dataType : "json",
				cache : false,
				success: function(data){
					if( data.resultCode == "success" ){
						popupAlert("회원정보에 등록된 번호로 <br />문자/알림톡이 발송 되었습니다");
					}
					else if( data.resultCode == "errMobileNo" ){
						popupConfirm(errMobileNoMsg, function(confirmFlag){
							if( confirmFlag ){
								location.href = "/m/mmypage/customer/custInfoPasswordCheck.do";
							}
						});
					}
					else{
						popupAlert("일시적인 오류입니다. 잠시 후에 다시 시도해주세요. 불편을 드려 죄송합니다.");
					}
					return false;
				}
			});	
		}
	}
};

//상품 옵션 레이어
var isGdsOptionLayerLoad = false;
function getGdsOption(gdsNo, action) {
	// adjust app event 트래킹
	if(isApp) {
		var adjustTokenKey = ADJUST_EVT_TOKEN_ADDED_TO_CART;
		var cookie_login_id;
		var param = {
				"token" : adjustTokenKey
				,"gdsNo" : gdsNo
		}
		
		adjustEvtTracking(adjustTokenKey);
		
		// with callback
		if(Common.cookieIsLogin) {
			cookie_login_id = Common.getCookie("loginCookieId");
			cookie_login_id = window.atob(cookie_login_id);
			param.custId = cookie_login_id;
		}
		
		adjustEvtTrackingWithCallback(param);
	}
	
	$("#ly-option-select, #ly-addition-select, #ly-addition-option-select, #ly-purchase-precautions").remove();
	$("#gdsOptionlayer, #counselArea").empty();
	$("#ui-datepicker-div").remove(); //상담신청 켈린더	

	if (!isGdsOptionLayerLoad) {
		if (action == "BUY") {
			if(!Common.cookieIsLogin()){
				popupConfirm("로그인을 하시겠습니까?<br/><br/>비회원으로 주문 시 할인 및 적립혜택을 받으실 수 없습니다.", function(confirmFlag){
					if(confirmFlag){
						if ($("#ly-tv").length > 0 && $("#ly-tv").hasClass("is-active") && $("#gdsOptionTVParam").val() != "") { //메인 TV 레이어
							Common.goLoginNoAlert(location.href.replace(location.hash, "") +"_" + 
									$("#isTVHomeShowParam").val() + "TVSeq_"+ $("#gdsOptionTVParamMediaSeq").val() +"_"+ gdsNo +"_"+ $("#gdsOptionTVParamMediaID").val() +"_TVlogin");
							return;
						}
						if ($("#ly-mctg0503-more").hasClass("is-active")) { //중카 상품 컴포넌트 레이어
							var orderCd = $("#orderCd").val();
							var dataType = $(".list-control__button").attr("data-type");
							listScrollTop = $(window).scrollTop();
							location.hash = "#" + listCount + "_" + orderCd + "_" + dataType + "_"+gdsNo+"_"+ listScrollTop+"_"+(Number(backCount)+1)+"_ly-mctg0503-more";
						}
						
						Common.goLoginNoAlertWithParam("");
						return;
					}
				});
			}
		}
		
		isGdsOptionLayerLoad = true;
		
		$.ajax({
			url      : "/m/mgoods/goodsDetailMallOptionAjax.do?gdsNo=" + gdsNo,
			type     : 'get',
			dataType : 'html',
			cache    : false,
			async    : true,
			success : function(html) {
				$("#gdsOptionlayer").empty().append(html);
				buyOptionLayer.init();
				$('.buy__handler-button').click();
				isGdsOptionLayerLoad = false;
			}
		});
	}
}

/***
 * 구매하기
 */
var buyOptionLayer = {
	init : function(){
		var _this = this;
		_this.buildCache();
		//if( _this.type == 'more' ){
			_this.bindEvent();
		//}
		//$("#ly-icon_cart").remove();
	},
	buildCache : function(){
		var _this = this;
		_this.$buy = $('.buy');
		_this.$buy.show();
		if( !_this.$buy.length ) return ;
		_this.$handler = $('.buy__handler-button');
		_this.type = _this.$buy.attr('class').split('buy--')[1];
		_this.$cart = _this.$buy.find('[data-buy-button]');
	},
	toggle : function(){
		var _this = this;
		if( _this.$buy.hasClass('is-expand') ){
			// 닫기
			_this.$buy.removeClass('is-expand');
			_this.$cart.hide(function(){
				$("#ly-option-select, #ly-addition-select, #ly-addition-option-select, #ly-purchase-precautions").empty();
				$("#gdsOptionlayer, #counselArea").empty();
				$("#ui-datepicker-div").empty(); //상담신청 켈린더
			});
		} else {
			// 열기
			if ($("#ly-mctg0503-more").hasClass("is-active")) {
				$("#ly-mctg0503-more").css("z-index", 999);
			}
			$("#ly-tv").css("z-index", 999);
			_this.$buy.addClass('is-expand');
			_this.$cart.show();
		}
	},
	bindEvent : function(){
		var _this = this;

		_this.$handler && _this.$handler.on('click',function(e){
			e.preventDefault();
			_this.toggle();
		});

		_this.$buy.find('[data-buy-button="buy"]').on('click',function(e){
			if( !_this.$buy.hasClass('is-expand') ){
				e.stopPropagation();
				e.preventDefault();
			}
		})

	},
	cart : function(){
		$('.toast-cart').show().addClass('is-active').one( UI.animationEndName , function(){
			$(this).hide().removeClass('is-active');
			$("#ly-icon_cart").remove();
		});
	},
	modalGroup : function(){
		//그룹모달
		$('[data-js="modal-group"]').each(function(){
			var $this = $(this);
			$this.hsModal( $.extend({}, {"type":"group"}, $this.data('option') ) );
		});
	}
};


/**
 * properties 값 조회
 * @param 프로퍼티키
 * @returns 프로퍼티값
 * @author 김동진
 * @since 2019.02.28
 */
Common.getProperties = function(propKey){
	var propValue;
	$.ajax({
        url      : "/common/getProperties.do",
        type     : 'get',
        data     : {"propKey" : propKey},
        dataType : 'text',
        cache    : false,
        async    : false,
        success  : function(result) {
        	propValue = result;
        }
    });
	return propValue;
};

/**
 * adjust 트래킹(앱 이벤트 트래킹) 
 * @param eventToken
 * @author yong
 * @since 2019.07.25
 * @returns
 */
function adjustEvtTracking(token) {
	// IOS
	if (isIOSWebKit) {
		try {
			webkit.messageHandlers.adjustHandler.postMessage(token);
		} catch(err) {
			if (window.console) {console.log(err.message);}
		}
	// AOS
	} else {
		try {
			var url = 'hss://hanssem.mobile.adjust';
			var param = 'token=' + token;
			if (!$("#appCheck").length) {
				var iframe = document.createElement('iframe');
			    iframe.setAttribute("style", "display:none;");
			    iframe.setAttribute("id", "appCheck");
			    document.body.appendChild(iframe);
			}
			
			$("#appCheck").attr("src", url + "?" + param);
			iframeError = setTimeout(error, 500);
			clearTimeout(iframeError);
		} catch(err) {
			if (window.console) {console.log(err.message);}
		}
	}
}

/**
 * adjust 트래킹(앱 이벤트 트래킹 with callback)
 * @author yong
 * @since 2019.08.21
 * @param arrParams
 * @returns
 */
function adjustEvtTrackingWithCallback(arrParams) {
	var cvtParam = "";
	for(var key in arrParams) {
		cvtParam += key + "=" +  arrParams[key] + "&";
	}
	cvtParam = cvtParam.substr(0, cvtParam.length - 1);
	
	// IOS
	if (isIOSWebKit) {
		try {
			webkit.messageHandlers.adjustHandlerWithCallback.postMessage(cvtParam);
		} catch(err) {
			if (window.console) {console.log(err.message);}
		}
	// AOS
	} else {
		try {
			var url = 'hss://hanssem.mobile.adjustWithCallback';
			if (!$("#appCheck").length) {
				var iframe = document.createElement('iframe');
			    iframe.setAttribute("style", "display:none;");
			    iframe.setAttribute("id", "appCheck");
			    document.body.appendChild(iframe);
			}
			
			$("#appCheck").attr("src", url + "?" + cvtParam);
			iframeError = setTimeout(error, 500);
			clearTimeout(iframeError);
		} catch(err) {
			if (window.console) {console.log(err.message);}
		}
	}
}

/**
 *  appsFlyer 트래킹(모바일 앱 이벤트 트래킹)
 * @author hhj
 * @since 2022.02.27
 * @param arrParams
 **	@example evnet=af_complete_registration&af_registration_method=email
 * @returns
 */
function appsFlyerEvtTracking(arrParams) {
	var cvtParam = "";
	for(var key in arrParams) {
		cvtParam += key + "=" +  arrParams[key] + "&";
	}
	cvtParam = cvtParam.substr(0, cvtParam.length - 1);
	// IOS
	if (isIOSWebKit) {
		try {
			webkit.messageHandlers.appsFlyerHandlerWithCallback.postMessage(cvtParam);
		} catch(err) {
			if (window.console) {console.log(err.message);}
		}
		// AOS
	} else {
		try {
			var url = 'hss://hanssem.mobile.appsFlyerWithCallback';
			if (!$("#appsFlyer").length) {
				var iframe = document.createElement('iframe');
				iframe.setAttribute("style", "display:none;");
				iframe.setAttribute("id", "appsFlyer");
				document.body.appendChild(iframe);
			}

			$("#appsFlyer").attr("src", url + "?" + cvtParam);
			iframeError = setTimeout(error, 500);
			clearTimeout(iframeError);
		} catch(err) {
			if (window.console) {console.log(err.message);}
		}
	}
}
/**
 * 앱다운로드 레이어 열기
 * @returns result
 * @author 이상필
 * @since 2019.08.29
 */
function appDownLayer(_callback) {	
	// 로컬스토리지는 http, https 구간이 서로 공유가 되지 않는 문제로 쿠키방식으로 변경(2021.02.03 김동진)
	// IOS 쿠깨지는 현상으로 userAgent에 추가된 앱 구분 코드로 한번 더 체크함(2021.02.23 yong)	
	var _deviceChannel;
	var _userAgnet = window.navigator.userAgent;
	if(_userAgnet.match("HSAppAOS") || _userAgnet.match("HSAppIOS")) {
		_deviceChannel = 'MOAPP'; 
	} else {
		if (deviceChannel == undefined || deviceChannel == "") {
			_deviceChannel = 'MOWEB';
		} else {
			_deviceChannel = deviceChannel;
		}
	}
	var _location = location.href;

	if (_deviceChannel == 'MOWEB') {
		if (Common.getCookie("APP_DOWNLOAD_POPUP_LOADED") != "done"
			&& Common.getCookie("EZWEL_USERKEY") == ""									 // [이지웰] 이지웰통한 접속인 경우 "메인 앱다운로드유도팝업" 실행시키지 않기 위해 추가(모바일메인개편)
			&& !(_userAgnet.match("KAKAOTALK") && _userAgnet.match(("ch-home"))) // 카카오 채널로 인입된경우 앱 유도 팝업 예외 처리(MALLDVLPRJ-1456)
			&& !(_location.match("utm_source=nave") && _location.match("utm_medium=cps")) // 네이버 검색으로 인입된경우 앱 유도 팝업 예외 처리(MALLDVLPRJ-1516)
			&& Common.getCookie("naverUid")=="" // 네이버 검색으로 인입된경우 앱 유도 팝업 예외 처리(MALLDVLPRJ-1558)
		) {
			//앱유도 방식이 팝업->배너 형태로 바뀜 [2021. 10. 26.][FRODO][MALLDVLPRJ-1540]
			/*$("#app-banner").show();
			$('.app-down-banner').slideDown(200);*/
			//팝업 형태 앱다운로드 레이어 복원  [2022. 02. 27.][안서영][MALLDVLPRJ-1659]
			popup_openV1('pop-app');

			if (typeof _callback === "function") {
				_callback();	//get_main_popup 또는 get_gds_popup 호출
			}
		} else {
			if (typeof _callback === "function") {
				_callback();
			}
		}
	} else {
		if (typeof _callback === "function") {
			_callback();
		}
	}
}

/**
 * 앱 다운로드 레이어 닫기
 * @returns result
 * @author 이상필
 * @since 2019.08.29
 */
//
function closeAppDownload() {	
	// 로컬스토리지는 http, https 구간이 서로 공유가 되지 않는 문제로 쿠키방식으로 변경(2021.02.03 김동진)
	Common.setCookie("APP_DOWNLOAD_POPUP_LOADED", "done", 1);
	//$('.app-down-banner').slideUp(200); //앱배너 감추기 [2021. 10. 26.][FRODO][MALLDVLPRJ-1540]
	popup_closeV1('pop-app');//팝업 형태 앱다운로드 레이어 복원  [2022. 02. 27.][안서영][MALLDVLPRJ-1659]    
	
	//앱유도 방식이 팝업->배너 형태로 바뀌었으므로, 하위 주석처리  [2021. 10. 26.][FRODO][MALLDVLPRJ-1540]	
	//팝업 형태 앱다운로드 레이어 복원  [2022. 02. 27.][안서영][MALLDVLPRJ-1659]
	if(location.pathname.indexOf("/m/mgoods/goodsDetailMall.do") > - 1) { // 기존상품상세에서만 딤처리가 안없어지는 현상. V3 상품상세 오픈하면 소스 제거하기로 협의(2020.01.08 김동진)
    	$(".m-dim").hide();
    }
	
    if (typeof get_main_popup === "function") { //메인에서만 실행
		get_main_popup();
	} else if (typeof get_gds_popup === "function") { //상품상세에서만 실행
		// [DT]상품상세팝업 기능 삭제 - 2023.1.4
		//get_gds_popup();
	}

}

/**
 * 검색 팝업 열기
 * @author 이상필
 * @since 2019.11.12
 */
function newSearchKeyWordOpen() {	
	if(fnIsApp()){

		var searchTab = "searchTab=";

		//아파트로 찾기 상세 or 시공사례 상세 경우
		if(location.href.indexOf("apartmentDetail.do") > 0 || location.href.indexOf("homeIdeaDetail.do") > 0) {
			searchTab = "searchTab=constcase";
		//사진 상세 인 경우
		} else if(location.href.indexOf("spaceAndPhotoDetail.do") > 0) {
			searchTab = "searchTab=pic";
		//마이한샘 인 경우
		} else if(location.href.indexOf("/m/mcsCenter") > 0 || location.href.indexOf("/m/mmypage") > 0) {
			searchTab = "searchTab=";
		//그외의 스토어 화면 인 경우
		} else {
			searchTab = "searchTab=goods";
		}

		try {
			//webkit.messageHandlers.goSearchHandler.postMessage("search");
			webkit.messageHandlers.goSearchHandler.postMessage(searchTab);

		}catch(err) {
			try {
				if (document.getElementById("appCheck") == null) {
				    var iframe = document.createElement('iframe');
				    iframe.setAttribute("style", "display:none;");
				    iframe.setAttribute("id", "appCheck");
				    document.body.appendChild(iframe);
				}
				//document.getElementById("appCheck").src="hss://hanssem.mobile.openSearch";
				document.getElementById("appCheck").src="hss://hanssem.mobile.openSearch?"+searchTab;
				iframeError = setTimeout(error, 500);
				clearTimeout(iframeError);
			}catch(e) {
				if (window.console) {console.log(e);}
			}
			if (window.console) {console.log(err);}
		}
	} else {
		//popup_openV1('m-search');
		//$("#_searchKey").val("");
		//$("#_searchKey").focus();
		//Search.init();
		let request = commonFnObj.func.getJsonFromUrl();
		let mallType = request.MallType ? request.MallType : '' ;
		let module = request.module ? request.module : '' ;
		if(location.href.indexOf("/m/main.html") > 1 || mallType == 'MAIN') {		// 통합 메인
			location.href = "/m/msearch/searchMain.do";
		} else if(location.href.indexOf("/m/homeidea.html") > 1 || module == 'recommend' || module == 'apartment' || module == 'spaceandphoto' || module == 'magazine' || module == 'constcase') {		// 홈아이디어인 경우
			if(module == 'apartment' || module == 'constcase') {	// GNB>아파트로찾기,시공사례인 경우
				location.href = "/m/msearch/searchMain.do?searchTab=constcase";
			} else if (module == 'spaceandphoto') {	// GNB>공간x사진
				location.href = "/m/msearch/searchMain.do?searchTab=pic";
			} else {	//나머지
				location.href = "/m/msearch/searchMain.do";
			}
		} else {
			//마이한샘에서 검색할 경우 searchTab 제외 - 2023.01.26 김재욱
			if(location.href.indexOf("/m/mcsCenter") > 0 || location.href.indexOf("/m/mmypage") > 0) {
				location.href = "/m/msearch/searchMain.do";
			} else {
				location.href = "/m/msearch/searchMain.do?searchTab=goods";
			}
		}
	}
}

/**
 * 각 상세페이지에서 js 없는 경우도 있어 재생성
 * 2023.01.12 YH. LEE
 */
var commonFnObj = {
	func : {
		getJsonFromUrl: function () {
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
	}
}

/**
 * 검색 팝업 레이어 닫기
 * @author 이상필
 * @since 2019.11.12
 */
function closeSearchPopup() {
	if (!fnIsApp()) {
		if (location.pathname == "/m/msearch/searchKeyword.do") {
			history.back();
		} else {
			popup_closeV1('m-search');
			Search.setLayer();
		}
	} else {
		if (location.pathname == "/m/msearch/searchKeyword.do") { //앱에서 검색 진입 화면 호출하였을 경우 레이어 닫기 처리
			if (!appPopupClose()) {
				history.back();
			}
		} else {
			if ($("#m-search").hasClass("focus-pop")) {
				popup_closeV1('m-search');
				Search.setLayer();
			}
		}
	}
}

/**
 * 우측 사이드 메뉴 열기
 * @author 이상필
 * @since 2019.11.12
 */
function newFnLnbOpen() {
	if(fnIsApp()){
		try {
			webkit.messageHandlers.callbackHandler.postMessage("lnb");
		}catch(err) {
			try {
				window.hssMobile.openDrawer();
			}catch(e) {
				if (window.console) {console.log(e);}
			}
			if (window.console) {console.log(err);}
		}
	} else {
		lnbMenu.sideMenuOpen();
	}
}

/**
 * 우측 사이드 메뉴 닫기
 * @author 이상필
 * @since 2019.11.12
 */
function newFnLnbClose() {
	history.back();
}

var lnbMenu = {
	//우측 사이드 메뉴 오픈
	sideMenuOpen : function() {
		if ($("#m-menu").length > 0) {
			lnbMenu.sideMenuMyPage();
		} else {
			setTimeout(function(){ lnbMenu.sideMenuOpen(); }, 250);
		}
	},
	//우측 사이드 메뉴 로그인 영역 및 카운트 조회
	sideMenuMyPage : function() {
		popup_openV1('m-menu', {speed:250,direct:'left'});
		
		var login_btn_html = "<span class=\"m-menu-message-txt\">안녕하세요</span>";
		if (Common.cookieIsLogin()) {
			if ($.cookie("loginCookieName") == null || $.cookie("loginCookieName") == ''){ 
				login_btn_html += "<a href=\"/m/mmypage/myPageMain.do\" class=\"user-txt\"> <span class=\"user-name\">"+"소셜미인증"+"</span></a>";
			}else{
				login_btn_html += "<a href=\"/m/mmypage/myPageMain.do\" class=\"user-txt\"> <span class=\"user-name\">"+$.cookie("loginCookieName")+"</span>님 </a>";
			}
		} else {
			login_btn_html += "<a href=\"javascript:;\" onclick=\"Common.goLoginNoAlertWithParam('util=login');return false;\" class=\"log_btn\"> 로그인 해주세요 </a>";
		}
		$("#m-menu").find(".log-message").html(login_btn_html);
		
		$.ajax({
			url : "/common/orderCntAjax.do",
			type : 'get',
			dataType : "json",
			cache : false,  
			success : function(json){
				if(json.orderCnt > 0){
					$("#m-menu").find("#orderCnt").text(json.orderCnt);
					$("#m-menu").find("#orderCnt").show();
				} else {
					$("#m-menu").find("#orderCnt").hide();
				}
			}
		});
		
		window.history.pushState({url:location.href}, "LNB", location.href);
	}, 
	//우측 사이드 메뉴 중카테고리 조회
	getMidCategory : function(ctgNo) {
		var params = "ctgNo="+$.trim(ctgNo);
		if ($("#m-menu .m-menu-category-list[data-ctg-no='"+ ctgNo +"'] .list-sub li").length == 0) {
			$.ajax({
				url : "/m/mcategory/getMallMobLnbCategoryAjax.do",
				type : "get",
				data : params,
				dataType: "json",
				success : function(json){
					var categoryHtml = '<li><a href="/m/mcategory/goHsmLctgy.do?ctgrNo='+ctgNo+'&amp;categoryall=L'+ctgNo+'">전체보기</a></li>';
					for (var i = 0; i < json.gnbMList.length; i++) {
						categoryHtml += '<li><a href="/m/mcategory/goHsmMctgy.do?ctgrNo='+json.gnbMList[i].ctgNo+'&amp;categoryall=M'+json.gnbMList[i].ctgNo+'">'+json.gnbMList[i].ctgNm+'</a></li>';
					}
					$("#m-menu .m-menu-category-list[data-ctg-no='"+ ctgNo +"'] .list-sub").empty().append(categoryHtml);
					lnbMenu.slideAction(ctgNo);
					$("#m-menu .m-menu-category-list[data-ctg-no='"+ ctgNo +"'] .list-cont").click();
				},error : function(xhr, textStatus, errorThrown){
				}
			});
		}
	},
	slideAction : function(ctgNo) {
		var $obj = $("#m-menu .m-menu-category-list[data-ctg-no='"+ ctgNo +"'] .list-cont");
		$obj.click(function(n) {
			var _this = $(this);
			if($(this).parent().hasClass("on")){
				$(this).parent().removeClass("on");
				$(this).next().slideUp();
			}else{
				$(this).parent().addClass("on");
				$(this).next().slideDown(400, function(){
					//$(".m-menu-cont").scrollTop($(".m-menu-cont").scrollTop() + _this.parent().position().top);	
					$(".m-menu-cont").stop().animate({scrollTop:$(".m-menu-cont").scrollTop() + _this.parent().position().top}, 300);
				});
				$(this).parent().siblings().removeClass("on");
				$(this).parent().siblings().find(".list-sub").slideUp();
			}
		});
	}
}

/**
 * 로그인 체크 없이 callBackUrl로 페이지 이동시켜주는 함수
 * @author 김재욱
 * @since 2021.11.10
 * @param callBackUrl
 */
function pageOpenWithoutLoginCheck(callBackUrl) {
	// MOAPP
	if(fnIsApp()){
		// App 툴바에서 최초 진입시 isNativePopup=Y 같은 파라미터가 포함될 경우 유지
		// 하단 플로팅 메뉴 아이콘의 url로 이동시 파라미터가 누락되어 broswer history가 쌓이는 것을 방지(app에서 뒤로가기시 같은화면 나옴)
		if (location.pathname == callBackUrl) {
			location.href = callBackUrl + location.search;
		} else {
			location.href = callBackUrl;
		}
		// MOWEB
	} else {
		location.href = callBackUrl;
	}
}

/**
 * 비로그인 상태면 로그인 화면으로 갔다가 callBackUrl로 페이지 이동시켜주는 함수
 * @author 김재욱
 * @since 2021.11.10
 * @param callBackUrl
 */
function pageOpenWithLoginCheck(callBackUrl) {
	// MOAPP
	if(fnIsApp()){
		// 로그인 여부 확인
		if(!Common.cookieIsLogin()) {
			try {
				// IOS
				webkit.messageHandlers.openLoginHandler.postMessage(callBackUrl);
			} catch(err) {
				try {
					// AOS
					var url = 'hss://hanssem.mobile.openLogin';
					if (!$("#appCheck").length) {
						var iframe = document.createElement('iframe');
					    iframe.setAttribute("style", "display:none;");
					    iframe.setAttribute("id", "appCheck");
					    document.body.appendChild(iframe);
					}
					$("#appCheck").attr("src", url + "?callbackUrl=" + callBackUrl);
					iframeError = setTimeout(error, 500);
					clearTimeout(iframeError);
				}catch(e) {
					if (window.console) {console.log(e);}
				}
				if (window.console) {console.log(err);}
			}
		} else {
			// App 툴바에서 최초 진입시 isNativePopup=Y 같은 파라미터가 포함될 경우 유지
			// 하단 플로팅 메뉴 아이콘의 url로 이동시 파라미터가 누락되어 broswer history가 쌓이는 것을 방지(app에서 뒤로가기시 같은화면 나옴)
			if (location.pathname == callBackUrl) {
				location.href = callBackUrl + location.search;
			} else {
				location.href = callBackUrl;
			}
			
		}
	// MOWEB
	} else {
		if(Common.cookieIsLogin()) {
			location.href = callBackUrl;
		} else {
			Common.goLoginNoAlert(callBackUrl);
		}
	}
}

/**
 * 하단 플로팅 탭바 이동
 * @author 이상필
 * @since 2020.04.01
 * @returns
 */
function goBottomTbaMenu(link) {
	// MOAPP
	if(fnIsApp()){
		// App 툴바에서 최초 진입시 isNativePopup=Y 같은 파라미터가 포함될 경우 유지
		// 하단 플로팅 메뉴 아이콘의 url로 이동시 파라미터가 누락되어 broswer history가 쌓이는 것을 방지(app에서 뒤로가기시 같은화면 나옴)
		if (location.pathname == link) {
			location.href=link + location.search;
		} else {
			location.href=link;
		}
	// MOWEB
	} else {
		location.href=link;
	}
}

//인풋박스에서 숫자만 입력받는 함수 ex) onkeypress="javascript:checkNumber();"
function checkNumber() {
	if(!window.event && !e) return;
	var keyCode = window.event ? window.event.keyCode : e.witch;
	
	if((48 <= keyCode && keyCode <= 57) || keyCode == 0 || keyCode == 8) {
		return;
	} else {
		if(window.event) window.event.returnValue = false;
		else e.preventDefault();
	}
}

/**
 * 글자수 체크(byte 기반) alert 처리 없이 글자입력만 제한
 * @author 김동진
 * @param e (체크대상)
 * @param size (허용할 byte 사이즈)
 * @returns
 */
function byteCheckNoAlert(obj, maxByte) {
    var str = obj.value;
    var str_len = str.length;
 
    var rbyte = 0;
    var rlen = 0;
    var one_char = "";
    var str2 = "";
 
    for (var i = 0; i < str_len; i++) {
        one_char = str.charAt(i);
 
        if (escape(one_char).length > 4) {
            rbyte += 2; //한글2Byte
        } else {
            rbyte++; //영문 등 나머지 1Byte
        }
 
        if (rbyte <= maxByte) {
            rlen = i + 1; //return할 문자열 갯수
        }
    }
 
    if (rbyte > maxByte) {
        str2 = str.substr(0, rlen); //문자열 자르기
        obj.value = str2;
        byteCheckNoAlert(obj, maxByte);
    }
}

/**
 * 글자수 체크(length 기반)
 * @author 김동진
 * @param e (체크대상)
 * @param o (리턴값 출력대상)
 * @param size (허용할 글자 사이즈)
 * @returns
 */
function lengthCheckTextarea(e, o, size) {
    $(e).on("keyup", function() {
		var len = $(e).val().length;
		if (len > size) {
			$(e).blur();
			popupAlert(size + "자 이상 <br>입력할수 없습니다.", function() {
				$(e).val($(e).val().substring(0, size));
				$(e).focus();
			});
			$(o).text(size);
		} else {
			$(o).text(len);
		}
    });
}

/**
 * 앱 구동시 웹뷰로부터 호출받는 함수 (IOS)
 * @param appVersion
 * @author 김동진
 * @since 2019.11.29
 */
Common.initAppInfo_ios = function(appVersion){
	Common.setCookie("APP_VERSION", appVersion, 1);
};
/**
 * 앱 구동시 웹뷰로부터 호출받는 함수 (android)
 * @param appVersion
 * @author 김동진
 * @since 2019.11.29
 */
Common.initAppInfo_android = function(appVersion){
	Common.setCookie("APP_VERSION", appVersion, 1);
};

/**
 * 한샘닷컴
 * @param goFamilyGroupSite
 * @author 이상필
 * @since 2019.11.29
 */
function goFamilyGroupSite(group_site) {
	var url = "", sUrl = "", uri = "m/common/redirect.do", familyParam = "";
	if (group_site == "DOTCOM") {
		url = "https://www.hanssem.com/m/main/main.do";
		sUrl = "https://mall.hanssem.com/m/common/redirect.do?family=DOTCOM";
		familyParam = "DOTCOM";
	} else if (group_site == "MALL") {
		url = SERVER_URL;
		sUrl = "http://mall.hanssem.com/m/common/redirect.do?family=MALL";
		familyParam = "MALL";
	}
	if(fnIsApp() && group_site == "DOTCOM"){
		url += "?isNew=Y";
	}
	if(typeof nLogger === "undefined"){
		var _script = document.createElement('script');
		_script.src = "//mall.hanssem.com/resources/js/log/nlogger.js";
		document.body.appendChild(_script);
		_script.onload = function () {
			nLogger.configure({
				nth_service_id: "REAL_MOWEB",
				nth_uid_key: "loginCookieId"

			});
			nLogger.log();
			nLogger.event(uri, {family:familyParam});
		}
	}else{
		nLogger.event(uri, {family:familyParam});
	}
	n_click_logging(sUrl, location.href);
	sUrl = sUrl.replace("https://mall.hanssem.com", "");
	sUrl = sUrl.replace("http://mall.hanssem.com", "");
	ga('set', 'page', sUrl);
	ga('send', 'pageview');
	
	if (group_site == "DOTCOM") {
		window.open(url);
	} else {
		location.href = url;
	}
}

// StringBuffer(MALLDVLPRJ-637)
var StringBuffer = function(){
	this.buffer = new Array();
};
StringBuffer.prototype.append = function(str){
	this.buffer.push(str);
	return this;
};
StringBuffer.prototype.toString = function(){
	return this.buffer.join("");
};

// 두개날짜 차이 일수계산(MALLDVLPRJ-637)
function dateDiff( date1, date2 ){
    var diffDate_1 = date1 instanceof Date ? date1 :new Date(date1);
    var diffDate_2 = date2 instanceof Date ? date2 :new Date(date2);
 
    diffDate_1 =new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
    diffDate_2 =new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());

    var diff = diffDate_2.getTime()-diffDate_1.getTime();
    diff = Math.ceil(diff / (1000 * 3600 * 24));

    if( diff >= 0 )	diff++;
    else			diff--;
    
    return diff;
}

// 날짜포멧(MALLDVLPRJ-637)
function YMDFormatter( num ){
	if( !num ) return "";
	var formatNum = "";

	// 공백제거
	num = num.replace(/\s/gi, "");

	try{
		if( num.length == 8 ){
			formatNum = num.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
		}
	}
	catch(e){
		formatNum = num;
	}

	return formatNum;
}

// 영문 숫자 체크
function AlpahaNumberCheck( obj ){
	if( obj.value == "" ) return;
	
	if( !ParamValidate.isAlphaNumber(obj.value) ){
		popupAlert("영문(대/소문자),숫자의 조합으로 입력해주세요.");
		obj.value = "";
		return;
	}
}

// 숫자 to 콤마
function NumberToComma(num){
	try {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}catch(e){
		return num;
	}
}

/**
 * APP 로그인 화면 호출
 * @author 이상필
 * @since 2020.02.24
 * @returns
 */
function callAppLogin(returnUrl) {
	// MOAPP
	if(fnIsApp() && !Common.cookieIsLogin()) {
		var callBackUrl = (returnUrl == undefined ? "" : returnUrl);
		// 콜백URL이 없는 경우 마이한샘으로 랜딩
		if (callBackUrl == "") {
			callBackUrl = "/m/mmypage/myPageMain.do";
		}
		
		//App V3 에서는 returnUrl 값을 decoding 하여 넘김
		try {
			callBackUrl = decodeURIComponent(callBackUrl);
		} catch(e) {
			if (window.console) {console.log(e);}
		}
		
		// MALLDVLPRJ-1170 라이브커머스에서 한샘몰 로그인 페이지로 넘어온경우 (2021.02.04 김동진)
		// 소스플랙스에서 넘어온 경우 콜백값 삭제 (21.10.01 허용 - 앱개발자 요청)
		if(callBackUrl.indexOf("mall.saucelive.net") > -1 || callBackUrl.indexOf(".sauceflex.com") > -1) {
			callBackUrl = "";
		} else { // 그 외 .hanssem.com url
			if (location.protocol == "http:") {
				if (SERVER_URL == callBackUrl.substring(0, SERVER_URL.length)) {
					callBackUrl = callBackUrl.substring(SERVER_URL.length, callBackUrl.length)
				}
			} else if (location.protocol == "https:") {
				if (SERVER_HTTPS_URL == callBackUrl.substring(0, SERVER_HTTPS_URL.length)) {
					callBackUrl = callBackUrl.substring(SERVER_HTTPS_URL.length, callBackUrl.length)
				}
			}
		}

		try {
			// IOS
			webkit.messageHandlers.openLoginHandler.postMessage(callBackUrl);
			return true;
		} catch(err) {
			try {
				// AOS
				var url = 'hss://hanssem.mobile.openLogin';
				if (document.getElementById("appCheck") == null) {
					var iframe = document.createElement('iframe');
				    iframe.setAttribute("style", "display:none;");
				    iframe.setAttribute("id", "appCheck");
				    document.body.appendChild(iframe);
				}
				document.getElementById("appCheck").src = url + "?callbackUrl=" + callBackUrl; 
				iframeError = setTimeout(error, 500);
				clearTimeout(iframeError);
				return true;
			}catch(e) {
				if (window.console) {console.log(e);}
			}
			if (window.console) {console.log(err);}
		}
	}
	return false;
}

/**
 * APP 로그인 화면 호출
 * @author 이상필
 * @since 2020.02.24
 * @returns
 */
function openLoginReturnUrl(returnUrl) {
	var retUrl = (returnUrl == undefined ? "" : returnUrl); 

	if(callAppLogin(retUrl)){
		// MOAPP
	} else {
		var _userAgnet = window.navigator.userAgent;
		if(_userAgnet.match("KAKAOTALK") && _userAgnet.match(("ch-home"))){ //카카오 웹 임베디드

			if (typeof Kakao === "undefined") {
				var _script = document.createElement('script');
				_script.src = "//developers.kakao.com/sdk/js/kakao.min.js";
				document.body.appendChild(_script);
				_script.onload = function () {
					openLoginReturnUrl(returnUrl);
				}
				return;
			}

			if(!Kakao.isInitialized()) {
				Kakao.init(KAKAOSYNC_KEY);
			}

			let state = generateCsrfToken();

			Common.setCookie("oauthKakaoCookieReturnUrl", retUrl);
			Common.setCookie("oauthKakaoCookieState", state, 1);

			Kakao.Auth.authorize({
				redirectUri: MOBILE_SERVER_URL+'/kakaoOauth/callback.do',
				state : state
			});
			return;

		}else{
			// MPAPP V2, MOWEB
			location.href="/m/mcustomer/mallLoginMain.do?returnUrl="+ retUrl;
		}

	}
}

/**
 * APP 웹뷰 화면 닫기
 * @author 이상필
 * @since 2020.02.24
 * @returns
 */
function closeWebView() {
	var app_version = Common.getCookie("APP_VERSION");
	if (fnIsApp() && app_version != "" && app_version != _empty_app_version) {
		try {
			webkit.messageHandlers.popupCloseHandler.postMessage(location.href);
		} catch(err) {
			try {
				if (document.getElementById("appCheck") == null) {
				    var iframe = document.createElement('iframe');
				    iframe.setAttribute("style", "display:none;");
				    iframe.setAttribute("id", "appCheck");
				    document.body.appendChild(iframe);
				}
				document.getElementById("appCheck").src="hss://hanssem.mobile.nativePopupClose";
				iframeError = setTimeout(error, 500);
				clearTimeout(iframeError);
			}catch(e) {
				if (window.console) {console.log(e);}
			}
			if (window.console) {console.log(err);}
		}
	}
}

/**
 * APP 메인 화면 호출
 * @author 이상필
 * @since 2020.02.24
 * @returns
 */
function callAppMain(channel) {
	if (fnIsApp()) {		//앱링크 호출로 변경 - 2023.01.26 김재욱
		openAppLinkV5(channel, "GNB", "", "", "", "", "");
	}
}

function error() {
    hssMobile_gubun({code: 0});
}

function hssMobile_gubun(result){
    if(result.code == 1){
            isApp = true;
    }else{
            isApp = false;
    }
}

/**
 * 주문수 조회
 * @author 김재욱
 * @since 2020.04.08
 * @returns
 */
function orderCnt() {
	$.ajax({
		url : "/common/orderCntAjax.do",
		type : "get",
		dataType : "json",
		cache : false,
		success : function(json) {
			if(json.orderCnt > 0) {
				$("#m-menu").find("#orderCnt").text(json.orderCnt);
				$("#m-menu").find("#orderCnt").show();
			} else {
				$("#m-menu").find("#orderCnt").hide();
			}
		}
	});
}

//[박형준] 핸드폰번호 유효성체크(MALLDVLPRJ-1020) - 이승주
var errMobileNoMsg = "등록되어있는 휴대폰번호가 없습니다. 회원정보변경에서 등록 후 이용하시겠습니까?";
Common.mobileNoCheck = function( gubun, mobileNo ){
	var resultBool = false;
	
	$.ajax({
		 url : "/customer/custValidationCheckAjax.do"
	    ,type : "post"
	    ,data : { mobileNo : mobileNo }
	    ,dataType : "json"
	    ,cache : false
	    ,async : false
		,success : function(data){
			if( data.resultCode == "success" ){
				resultBool = true;
				
				if( gubun == "csQna" ){
					$("#divTel").show();
					$("#userHtel").val(data.mobileNo);
					formCheckBtn();
				}else if( gubun =="notiOfStock"){
					var moTel = data.mobileNo;
					$("#userNotiTel").text(moTel);
				}
			}
			else if( data.resultCode == "errMobileNo" || data.resultCode == "fail" ){
				popupConfirm(errMobileNoMsg, function(confirmFlag){
					if( confirmFlag ){
						location.href = "/m/mmypage/customer/custInfoPasswordCheck.do";
					}
				});
				if( gubun == "goods" ){
					$("#SMS_SEND").prop("checked", false);
				}
				else if( gubun == "csQna" ){
					$("#divTel").hide();
					$("#userHtel").val("");
					$("#smsYNCheck").prop("checked", false);
				}
			}
			else if( data.resultCode == "noLogin" ){
				popupAlert(LOGIN_ALERT_MESSAGE);
				if( gubun == "goods" ){
					$("#SMS_SEND").prop("checked", false);
				}
				else if( gubun == "csQna" ){
					$("#divTel").show();
				}
			}			
		}
		,error : function(xhr, textStatus, errorThrown){
			popupAlert("처리중 오류가 발생했습니다. 관리자에게 문의바랍니다.");
			
			if( gubun == "goods" ){
				$("#SMS_SEND").prop("checked", false);
			}
			else if( gubun == "csQna" ){
				$("#divTel").hide();
				$("#userHtel").val("");
				$("#smsYNCheck").prop("checked", false);
			}
		}
	});
	
	return resultBool;
}

/**
 * 기획전 이벤트 쿠폰 발급 관련
 */
var isEventIng = false; //이벤트 발급 진행상태 
/*[안서영] 이벤트 난수쿠폰 등록 (MALLDVLPRJ-1061) - 송덕만 */
function addCouponRandom(evNo, cpNo, msg){
	/* evNo: 이벤트 번호, cpNo: 난수쿠폰번호, msg: 쿠폰명 */
	if(isEventIng){
		console.log('요청 중입니다 잠시만 기다려주세요');
		return;
	}
	if(cpNo == ''){		
		popupAlert('쿠폰번호를 입력해주세요.');
		return false;		
	}else{
		 var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
		if(regExp.test(cpNo)){
			cpNo = cpNo.replace(regExp, '');
		}
		cpNo =	cpNo.toUpperCase();

		$.ajax({
				url: '/eventmst/addCouponRandom.do',
				data :{
					'evNo':evNo, 
					'paramEvCode':cpNo
				},
				type: 'post',
				cache: false,
				async: false,
				dataType : 'json',
				contentType:'application/x-www-form-urlencoded; charset=UTF-8',
				beforeSend(jqXHR, settings) {
					isEventIng = true;
				},
				error: function(xhr, textStatus, error) {}, 
				success: function(data) {
					var r_code = data.result.flag;
					var r_msg = data.result.message;
					
					if(r_msg == undefined){
						return;
					}
					
					if(r_code == '1'){
						popupConfirm(r_msg, function(confirmFlag){
							if(confirmFlag){
								Common.goLoginNoAlert();
							}
						});
					}else if(r_code == '0'){
						popupAlert(msg+r_msg);
					}else{
						popupAlert(r_msg);
					}
				},complete:function () {
					isEventIng = false;
				}
		});
	}
}

/*[안서영] 한샘몰 재구매이벤트 쿠폰다운로드 (MALLDVLPRJ-1066) - 송덕만 */
function addCouponTargetMember(evNo, msg){
	/* evNo: 이벤트 번호, msg: 쿠폰명 */
	if(isEventIng){
		console.log('요청 중입니다 잠시만 기다려주세요');
		return;
	}
	$.ajax({
			url: '/eventmst/addCouponTargetMember.do',
			data :{
				'evNo':evNo
			},
			type: 'post',
			cache: false,
			async: false,
			dataType : 'json',
			contentType:'application/x-www-form-urlencoded; charset=UTF-8',
			beforeSend(jqXHR, settings) {
				isEventIng = true;
			},
			error: function(xhr, textStatus, error) {}, 
			success: function(data) {
				var r_code = data.result.flag;
				var r_msg = data.result.message;
				
				if(r_msg == undefined){
					return;
				}
				
				if(r_code == '1'){
					popupConfirm(r_msg, function(confirmFlag){
						if(confirmFlag){
							Common.goLoginNoAlert();
						}
					});
				}else if(r_code == '0'){
					popupAlert(msg+r_msg);
				}else{
					popupAlert(r_msg);
				}
			},complete:function () {
				isEventIng = false;
			}
	});
}


/*[안서영] 신규가입자 전용 APP 5% 추가 할인쿠폰(MALLDVLPRJ-1075) - 송덕만 */
function addCouponNormal(evNo,couponDiv,msg,userCode){
	/* evNo: 이벤트 번호, userCode:사용자입력값, msg: 쿠폰명 */
	if(isEventIng){
		console.log('요청 중입니다 잠시만 기다려주세요');
		return;
	}
	if(userCode == undefined){
		userCode = '';
	}
	$.ajax({
			url: '/eventmst/addCouponNormal.do',
			data :{
				'evNo':evNo,
				'couponDiv':couponDiv,
				'cuponKey':userCode
			},
			type: 'post',
			cache: false,
			async: false,
			dataType : 'json',
			contentType:'application/x-www-form-urlencoded; charset=UTF-8',
			beforeSend(jqXHR, settings) {
				isEventIng = true;
			},
			error: function(xhr, textStatus, error) {}, 
			success: function(data) {
				var r_code = data.result.flag;
				var r_msg = data.result.message;
				
				if(r_msg == undefined){
					return;
				}
				
				if(r_code == '1'){
					popupConfirm(r_msg, function(confirmFlag){
						if(confirmFlag){
							Common.goLoginNoAlert();
						}
					});
				}else if(r_code == '0'){
					popupAlert(msg+r_msg);
				}else{
					popupAlert(r_msg);
				}
			},complete:function () {
				isEventIng = false;
			}
	});
}

/*[안서영] 쿠폰 일괄 발급(MALLDVLPRJ-1130) - 송덕만 */
function addCouponGrpNormal(evNo,couponDiv,msg,validity){
	/* evNo: 이벤트 번호, msg: 쿠폰명 */
	if(isEventIng){
		console.log('요청 중입니다 잠시만 기다려주세요');
		return;
	}
	$.ajax({
			url: '/eventmst/addCouponGrpNormal.do',
			data :{
				'evNo':evNo,
				'couponDiv':couponDiv
			},
			type: 'post',
			cache: false,
			async: false,
			dataType : 'json',
			contentType:'application/x-www-form-urlencoded; charset=UTF-8',
			beforeSend(jqXHR, settings) {
				isEventIng = true;
			},
			error: function(xhr, textStatus, error) {}, 
			success: function(data) {
				var r_code = data.result.flag;
				var r_msg = data.result.message;
				
				if(r_msg == undefined){
					return;
				}
				
				if(r_code == '1'){
					popupConfirm(r_msg, function(confirmFlag){
						if(confirmFlag){
							Common.goLoginNoAlert();
						}
					});
				}else if(r_code == '0'){
					var expireDtMsg = '';
					if(validity){
						expireDtMsg = validity;
					}
					popupAlert(msg + r_msg + "<br/>" + expireDtMsg);
				}else{
					popupAlert(r_msg);
				}
			},complete:function () {
				isEventIng = false;
			}
	});
}

/*[안서영] 기획전 응모하기 (MALLDVLPRJ-1155) - 송덕만*/
function addEnterEvent(evNo,applyType){
	/* evNo: 이벤트 번호, 
	   popupId:응모완료시 보일 popup의 id값   -> applyType:응모상품타입으로 용도 변경 */
	if(isEventIng){
		console.log('요청 중입니다 잠시만 기다려주세요');
		return;
	}
	/*응모시*/
	if( applyType != ""){
		/*마케팅 정보동의여부 id가 있을때만  마케팅 정보 수신 동의 확인 (MALLDVLPRJ-1390)*/
		if($("#custAgree").length > 0  &&  !$("#custAgree").is(":checked")){
			popupAlert("개인정보 제공에 동의한 후 응모할 수 있습니다.");
			return;
		}
	}
	$.ajax({
		url: '/eventmst/addEnterEvent.do',
		data :{
			'evNo':evNo,
			'applyType':applyType
		},
		type: 'post',
		cache: false,
		async: false,
		dataType : 'json',
		contentType:'application/x-www-form-urlencoded; charset=UTF-8',
		beforeSend(jqXHR, settings) {
			isEventIng = true;
		},
		error: function(xhr, textStatus, error) {}, 
		success: function(data) {
			var r_code = data.result.flag;
			var r_msg = data.result.message;
			
			if(r_msg == undefined){
				return;
			}
			
			r_msg = r_msg.replace("<br>","\n");
			r_msg = r_msg.replace("<br/>","\n");
			
			if(r_code == '1'){
				if(confirm(r_msg)){
					Common.goLoginNoAlert();  
				}
			}else if(r_code == '0'){					
				//if(popupId != "" && popupId != null){
				//	$("#"+popupId).addClass(popupId);
				//}else{
					alert(r_msg);
				//}
			}else{
				alert(r_msg);
			}
		},complete:function () {
			isEventIng = false;
		}
	});
}

/*[안서영] 기획전 자동 응모하기 (MALLDVLPRJ-1155) - 송덕만*/
function addEnterAuto(evNo,applyType){
	/* 마케팅 정보 수신 동의 확인 (MALLDVLPRJ-1390)*/
	if($("#custAgree").length > 0  &&  !$("#custAgree").is(":checked")){
		popupAlert("개인정보 제공에 동의한 후 응모할 수 있습니다.");
		return;
	}else{
		addEnterEvent(evNo,applyType);
	}
}

/*[안서영] 난수번호 무제한 인원 쿠폰발급 (MALLDVLPRJ-1284) - 송덕만*/
function addCouponCode(evNo, couponType, couponCode, userCode){
	if(couponCode != userCode){
		popupAlert('쿠폰 번호를 확인해 주시기 바랍니다');
		return;
	}else{
		addCouponNormal(evNo,couponType, '');
	}	
}

/*마일리지 이벤트 (MALLDVLPRJ-1972) - 송덕만 */
function addMileageEvent(evNo, msg){
	if(isEventIng){
		console.log('요청 중입니다 잠시만 기다려주세요');
		return;
	}
	$.ajax({
		url: '/eventmst/addMileageEvent.do',
		data :{
			'evNo':evNo
		},
		type: 'post',
		cache: false,
		async: false,
		dataType : 'json',
		contentType:'application/x-www-form-urlencoded; charset=UTF-8',
		beforeSend(jqXHR, settings) {
			isEventIng = true;
		},
		error: function(xhr, textStatus, error) {},
		success: function(data) {
			var r_code = data.result.flag;
			var r_msg = data.result.message;

			if(r_msg == undefined){
				return;
			}
			
			if(r_code == '1'){
				popupConfirm(r_msg, function(confirmFlag){
					if(confirmFlag){
						Common.goLoginNoAlert();
					}
				});
			}else if(r_code == '0'){
				popupAlert(msg+r_msg);
			}else{
				popupAlert(r_msg);
			}
		},complete:function () {
			isEventIng = false;
		}
	});
}
/** 기획전 이벤트 쿠폰 발급 관련 END **/

/**
 * 라이브커머스 로그인 연동용 세션키 조회
 * @author 김동진
 * @since 2021.01.11
 * @returns sessionKey
 */
Common.getLiveCommerceSessionKey = function() {
	var sessionKey = "";
	$.ajax({
        url      : "/liveCommerce/getSessionKeyAjax.do",
        type     : 'get',		
        dataType : 'json',
        cache    : false,
        async    : false,
        success  : function(json) {
        	if(json.resultCode == "success"){
        		sessionKey = json.sessionKey;
        	} else if(json.resultCode == "notLogin"){
        		popupAlert(LOGIN_ALERT_MESSAGE);
        	}
        },
        error:function(request, status, error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
    });
	return sessionKey;
}

/**
 * 라이브커머스 (플레이어 화면으로 이동시 accessToken 필요) 
 * @author 김동진
 * @since 2021.09.08
 * @returns accessToken
 */
Common.getLiveCommerceAccessToken = function() {
	var accessToken = "";
	$.ajax({
        url      : "/liveCommerce/getAccessTokenAjax.do",
        type     : 'get',		
        dataType : 'json',
        cache    : false,
        async    : false,
        success  : function(json) {
        	if(json.resultCode == "success"){
        		accessToken = json.accessToken;
        	}
        },
        error:function(request, status, error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
    });
	return accessToken;
}

/**
 * 라이브커머스 방송 알림예약
 * @param Seq 방송번호
 * @author 김동진
 * @since 2021.01.14
 */
Common.LiveCommerceNoti = function(Seq, btnObj) {
	if( !Common.cookieIsLogin() ){
		popupConfirm(LOGIN_CONFIRM_MESSAGE, function(confirmFlag){
			if(confirmFlag){
				Common.goLoginNoAlert(location.pathname+location.search);
			}
		});
	} else {
		if( Common.mobileNoCheck("LiveCommerceNoti", "") ){
			$.ajax({
				url : "/liveCommerce/liveCommerceNotiAjax.do",
				type : "get",
				dataType : "json",
				data: {"Seq" : Seq},
				cache : false,
				success: function(json){
					if(json.resultCode == "success"){
						popupAlert("알림이 신청되었습니다.<br>방송 10분 전 알림톡으로<br>받아보실 수 있습니다.");
						$(btnObj).addClass("off");
						$(btnObj).text("받기완료");
						$(btnObj).attr("onclick", "javascript:void(0);");
		        	} else if(json.resultCode == "notLogin"){
		        		popupAlert(LOGIN_ALERT_MESSAGE);
		        	} else if(json.resultCode == "alreadyData"){
		        		popupAlert("해당 방송 알림을 이미<br/>예약 하였습니다.");
		        	} else{
						popupAlert("일시적인 오류입니다. 잠시 후에 다시 시도해주세요.<br/>불편을 드려 죄송합니다.");
					}
					return false;
				}
			});			
		}
	}
};

/**
 * html gen 화면인경우 편성표 목록의 알림받기 데이터 갱신
 * @param Seq 방송번호
 * @author 김동진
 * @since 2021.08.31
 */
Common.LiveCommerceNotiSearch = function(Seq) {
	if( Common.cookieIsLogin() ){
		$.ajax({
			url : "/liveCommerce/liveCommerceNotiSearchAjax.do",
			type : "get",
			dataType : "json",
			data: {"Seq" : Seq},
			cache : false,
			success: function(json){
				if(json.resultCode == "success"){
					if(json.myNotiYn == "Y") {
						$("#btn_noti_"+Seq).addClass("off");
						$("#btn_noti_"+Seq).text("받기완료");
						$("#btn_noti_"+Seq).attr("onclick", "javascript:void(0);");
					}
	        	}
			}
		});
	}
};

/**
 * 디바이스 채널 조회
 * @author yong
 * @since 2021.02.19
 * @returns deviceChannel (MOWEB, MOAPP)
 */
Common.getDeviceChannel = function() {
	var _deviceChannel = "MOWEB";
	var _userAgnet = window.navigator.userAgent;
	
	if(_userAgnet.match("HSAppAOS") || _userAgnet.match("HSAppIOS")) {
		_deviceChannel = "MOAPP";
	} else {
		try {
			_deviceChannel = Base64.decode(Common.getCookie("deviceChannel"));
		} catch(e) {
			_deviceChannel = "MOWEB";
		}
	}
	
	return _deviceChannel;
}

/**
 * merge object 함수
 * @author 김동진
 * @since 2021.03.08
 * @returns 
 * ex) var finalParam = Common.mergeObj(param, param2, param3);
 */
Common.mergeObj = function() {
	const newObj = {};
	for (let i = 0; i < arguments.length; i++) {
		for (let att in arguments[i]) { 
			newObj[att] = arguments[i][att]; 
		}
	}
	return newObj;
}

/**
 * GET 파라미터 리턴
 * @author 신호섭
 * @since 2021.05.10
 * @returns 
 * ex) var gdsNo = Common.urlParam("gdsNo");
 */
Common.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}


/**
 * 재입고 상품 알림톡 발송신청여부 확인(MALLDVLPRJ-1443)
 * @author 안서영
 * @since 2021.10.19
 */
Common.gdsRestockNoti = function(gdsNo, lastSelectedVal) {
	popupConfirm("일시품절 된 상품 옵션 입니다. <br />재입고 알림 신청을 하시겠습니까?",function(confirmFlag){
		if(confirmFlag){
			if( !Common.cookieIsLogin() ){
				Common.goLogin(location.pathname+location.search);
				return;
			}
			if( Common.mobileNoCheck("notiOfStock", "") ){
				var selectValArr = "";
				//옵션이 있는 경우
				var eachLength = $("#buy-layer").find(".buy-select").find("select").length;
				if(eachLength > 0){//일반상품
					$("#buy-layer").find(".buy-select").find("select").each(function(idx){		    
					    if(eachLength-1 ==idx){
					    	false;
					    }else{
					    	selectValArr += $(this).val()+"@";
					    }
					});
				}else{
					//딜상품, 또는 옵션이 없는 상품
					eachLength = $("#addProduct").find(".buy-select").find("select").length;
					$("#addProduct").find(".buy-select").find("select").each(function(idx){		    
					    if(eachLength-1 ==idx){
					    	false;
					    }else{
					    	selectValArr += $(this).val()+"@";
					    }
					});
				}
				selectValArr += lastSelectedVal+"@";
				//상품및 옵션정보 조회
				$.ajax({
					url      : "/m/mgoods/goodsDetailMallOptionAjax.do",
					type     : 'post',
					data	 : {gdsNo : gdsNo, pageGubun : "notiOfStock", getGdsGroupCd: 'MALL',selectValArr : selectValArr},
					dataType : 'html',
					cache    : false,
					async    : false,
					success  : function(result) {
						$("#pop-restock-request").html(result);
						$("#pop-restock-request").attr("display:block");
						popup_openV1('pop-restock-request');			
					},
					error:function(request, status, error){
						console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					}
				});
			}else{
				popupAlert('휴대폰 번호를 등록 후 신청 가능합니다.')
				return false;
			}
		}
	});		
};

/**
 * 재입고 상품 알림 신청(MALLDVLPRJ-1443)
 * @author 안서영
 * @since 2021.10.19
 */
function insertNotiOfStock(){	
	var goodsNotiForm = $("#goodsNotiOptFrm").serialize();		
	$.ajax({
		url : "/m/mgoods/insertNotiOfStockAjax.do",
		type : "get",
		data : goodsNotiForm,
		dataType : "json",
		cache : true,
		async : false,
		success : function(data) {			
			var result = data.resultCode;
			if (result != null && result != undefined) {
				if(result =='success'){
					popupAlert('재입고 알림 신청이 완료 되었습니다.');
				}else{
					popupAlert('이미 재입고 알림을 신청하신 상품입니다.');
					return false;
				}	
			}else{
				popupAlert("처리중 오류가 발생했습니다. 잠시 후 재시도 바랍니다.");
			}
			popup_closeV1('pop-restock-request');
		},error:function(request, status, error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});	
}

/**
 * 모바일 웹/앱 링크 열기 - url링크 외 APP Native영역 랜딩 포함(MALLDVLPRJ-1716)
 * @author 전소정
 * @since 2022.04.13
 */
function openAppLink(appLinkTarget, linkUrl, appLinkVal, appLinkSubVal, isNewOpen) {
	if(fnIsApp()){
		if(appLinkVal == null || appLinkVal == ''){
			if(isNewOpen == 'Y'){
				window.open(linkUrl);
			}else{
				document.location.href = linkUrl;				
			}
		}
		var appLink = ''

		try {
			if(appLinkTarget == 'GNB'){
				appLink = 'target=GNB&val=' + appLinkVal;
				if(appLinkSubVal != null && appLinkSubVal != ''){
					appLink = appLink + "&subval=" + appLinkSubVal;
				}
				webkit.messageHandlers.appLink.postMessage(appLink);
			} else if(appLinkTarget == 'CATE'){
				webkit.messageHandlers.appLink.postMessage("target=CATE&val="+appLinkVal);
			} else{
				if(isNewOpen == 'Y'){
					window.open(linkUrl);
				}else{
					document.location.href = linkUrl;
				}
			}
		}catch(err) {
			try {
				if (document.getElementById("appCheck") == null) {
					var iframe = document.createElement('iframe');
					iframe.setAttribute("style", "display:none;");
					iframe.setAttribute("id", "appCheck");
					document.body.appendChild(iframe);
				}

				if(appLinkTarget == 'GNB'){
					appLink = 'hss://hanssem.mobile.appLink?target=GNB&val=' + appLinkVal;
					if(appLinkSubVal != null && appLinkSubVal != ''){
						appLink = appLink + "&subval=" + appLinkSubVal;
					}
					document.getElementById("appCheck").src=appLink;
				} else if(appLinkTarget == 'CATE'){
					document.getElementById("appCheck").src="hss://hanssem.mobile.appLink?target=CATE&val="+appLinkVal;
				} else{
					if(isNewOpen == 'Y'){
						window.open(linkUrl);
					}else{
						document.location.href = linkUrl;
					}
				}
				iframeError = setTimeout(error, 500);
				clearTimeout(iframeError);
			}catch(e) {
				if (window.console) {console.log(e);}
			}
			if (window.console) {console.log(err);}
		}
	} else { /* 모바일 웹 */
		if(isNewOpen == 'Y'){
			window.open(linkUrl);
		}else{
			document.location.href = linkUrl;
		}
	}
}

/* ---------------------------------------------------
스크롤 시 키패드 종료. 구 /mo/js/ui.nonkeypad.js->common.js로 Merge
--------------------------------------------------- */
$(".is-keypad").on("touchstart",function(e) {
	e.stopImmediatePropagation();
	// $("input").focusout().blur();
})

//통합멤버십여부 조회
Common.insMbsJoinCheck = function(){
	var result = false;
	if(Common.cookieIsLogin()){		
		$.ajax({
			url : "/customer/insMbsJoinCheckAjax.do",
			type : "get",
			dataType : "json",
			cache : true,
			async : false,
			success : function(data) {
				var dataResult = data.resultCode;
				if(dataResult == "success"){
					result = true;
				}
			}, error : function(a,b,c){
				console.log("error");
				popupAlert("처리중 오류가 발생했습니다. 잠시 후 재시도 바랍니다.");
			}
		});		
	}else{
		Common.goLogin();
		return false;
	}
	return result;
}

/**
 * 세부 필터값 세팅
 * @author YH. LEE
 * @since 2022.12.19
 */
function setAppLinkFilterList(appLinkFilterList) {
	var returnStr = "";

	try{
		var appLinkFilterListStr = JSON.parse(appLinkFilterList);
		var filterText= "&filterText=";
		var filterVal= "&filterVal=";

		for(var filtername in appLinkFilterListStr) {
			if(filtername == 'sortType'){
				returnStr = "&sortType=" + appLinkFilterListStr[filtername];
			} else{
				filterText += filtername + '_';
				filterVal += appLinkFilterListStr[filtername] + '_';
			}
		}
		returnStr += filterText.slice(0, -1) + filterVal.slice(0, -1);

	}catch (e) {
		console.log(e.message);
	}

	return returnStr;

}

/**
 * 모바일 웹/앱 링크 열기 V5
 *	AppLinkChannel (추가)
 * 		1.MAIN = 통합메인
 * 		2.MALL = 스토어
 * 		3.HOMEIDEA = 홈아이디어
 *		4.REMODELING = 리모델링
 *	appLinkFilterList (추가)
 * 		-세부필터 리스트 (JSON 문자열)
 * @author 이용호
 * @since 2022.12.19
 */
function openAppLinkV5(appLinkChannel, appLinkTarget, linkUrl, appLinkVal, appLinkSubVal, isNewOpen, appLinkFilterList) {
	//세부 필터값 세팅
	var filterListStr = '';
	if(appLinkFilterList != null && appLinkFilterList != '')  {
		filterListStr = setAppLinkFilterList(appLinkFilterList);
	}
	if(appLinkChannel == null || appLinkChannel == '') appLinkChannel = "MALL";	//스토어  default

	if(fnIsApp()){
		var appLink = '';

		try {
			if(appLinkTarget == 'GNB'){
				appLink = 'target=GNB&channel=' + appLinkChannel + '&val=' + appLinkVal;
				if(appLinkSubVal != null && appLinkSubVal != ''){
					appLink = appLink + "&subval=" + appLinkSubVal;
				}
				if(filterListStr != null && filterListStr != '') appLink += filterListStr;
				webkit.messageHandlers.openAppLink.postMessage(appLink);
			} else if(appLinkTarget == 'CATE'){
				webkit.messageHandlers.openAppLink.postMessage("target=CATE&channel=" + appLinkChannel + "&val=" + appLinkVal);
			} else{
				if(filterListStr != null && filterListStr != '') linkUrl += filterListStr;
				if(isNewOpen == 'Y'){
					window.open(linkUrl);
				}else{
					document.location.href = linkUrl;
				}
			}
		}catch(err) {
			try {
				if (document.getElementById("appCheck") == null) {
					var iframe = document.createElement('iframe');
					iframe.setAttribute("style", "display:none;");
					iframe.setAttribute("id", "appCheck");
					document.body.appendChild(iframe);
				}

				if(appLinkTarget == 'GNB'){
					appLink = 'hss://hanssem.mobile.openAppLink?target=GNB&channel=' + appLinkChannel + '&val=' + appLinkVal;
					if(appLinkSubVal != null && appLinkSubVal != ''){
						appLink = appLink + "&subval=" + appLinkSubVal;
					}
					if(filterListStr != null && filterListStr != '') appLink += filterListStr;
					document.getElementById("appCheck").src=appLink;
				} else if(appLinkTarget == 'CATE'){
					document.getElementById("appCheck").src="hss://hanssem.mobile.openAppLink?target=CATE&channel=" + appLinkChannel + "&val=" + appLinkVal;
				} else{
					if(filterListStr != null && filterListStr != '') linkUrl += filterListStr;
					if(isNewOpen == 'Y'){
						window.open(linkUrl);
					}else{
						document.location.href = linkUrl;
					}
				}
				iframeError = setTimeout(error, 500);
				clearTimeout(iframeError);
			}catch(e) {
				if (window.console) {console.log(e);}
			}
			if (window.console) {console.log(err);}
		}
	} else { /* 모바일 웹 */
		if(filterListStr != null && filterListStr != '') linkUrl += filterListStr;
		if(isNewOpen == 'Y'){
			window.open(linkUrl);
		}else{
			document.location.href = linkUrl;
		}
	}
}