// 2017-03-23 APP변경으로 인한 주석처리
//var ANDRODI_APP_LAUNCH_SCHEME = "intent://runapp#Intent;scheme=hss;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.hanssem.mall;end";
//var ANDRODI_APP_LAUNCH_SCHEME = "http://play.google.com/store/apps/details?id=com.hanssem.mall";
var IOS_APP_LAUNCH_SCHEME = "hss-runapp://";
var IOS_APP_STORE_URL = "http://itunes.apple.com/kr/app/hansaemmol-total-hom-intelieo/id1098454382?mt=8";
var ANDRODI_APP_LAUNCH_SCHEME = "intent://home?#Intent;scheme=hss;package=com.hanssem.mall;end";

var isMobileForAppLaunch = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobileForAppLaunch.Android() || isMobileForAppLaunch.BlackBerry() || isMobileForAppLaunch.iOS() || isMobileForAppLaunch.Opera() || isMobileForAppLaunch.Windows());
    }

};

function onAppLaunchLanding(url) {
    if (isMobileForAppLaunch.Android()) {
        if (url != undefined && url != "") {
            ANDRODI_APP_LAUNCH_SCHEME = ANDRODI_APP_LAUNCH_SCHEME.replace("home?", url);
        }
        location.href = ANDRODI_APP_LAUNCH_SCHEME;
    } else if (isMobileForAppLaunch.iOS()) {
        var visitedAt = (new Date()).getTime();
        if (url != undefined || url != "") {
            location.href = "hss://" + url;
        }
        setTimeout(function () {
            if ((new Date()).getTime() - visitedAt < 2000) {
                location.href = IOS_APP_STORE_URL;
            }
        }, 1500);
        /* setTimeout( function () {
           location.href = IOS_APP_LAUNCH_SCHEME;
       } ,0 ); */
    } else {
    }
}

function onAppLaunch(url) {
	if (url != undefined && url != "") {
		window.open('/m/mAppDownLoad/appLaunchLanding.do?'+url);
	}else{
		window.open('/m/mAppDownLoad/appLaunchLanding.do');
	}
}

/*
    @modify gnb, snb호출 케이스 추가 [2022. 05. 31.][김대오][MALLDVLPRJ-1802]
    customUrl 없을 경우: 기존 프로세스..
    customUrl 있을 경우: (hss://info?gnb=tv&snb=ALL or hss://info?gnb=tv) 호출
 */
function onAppLaunchNoStore(url, customUrl) {

    url = window.location.origin + url;
    if (isMobileForAppLaunch.Android()) {
        var visitedAt = (new Date()).getTime();
        if(customUrl) {
            location.href = "hss://info?"+customUrl;
        } else {
            location.href = "hss://info?url="+encodeURIComponent(url);
        }
        setTimeout(function () {
            if ((new Date()).getTime() - visitedAt < 2000) {
                location.href = url;
            }
        }, 1500);
    } else if (isMobileForAppLaunch.iOS()) {
        var visitedAt = (new Date()).getTime();
        if(customUrl) {
            location.href = "hss://info?"+customUrl;
        } else {
            location.href = "hss://info?url="+encodeURIComponent(url);
        }
        setTimeout(function () {
            if ((new Date()).getTime() - visitedAt < 2000) {
                location.href = url;
            }
        }, 1500);
    } else {
        location.href = url;
    }
}

function onAppLaunchExtUrl(url, url2) {
    //MO APP
    if (fnIsApp()) {
        //로그인 X
        if(!Common.cookieIsLogin()) {
            try {
                Common.goLoginNoAlert(url2);
            } catch(e) {
                alert('다시 시도해주세요.');
            }
        } else {
            var visitedAt = (new Date()).getTime();
            location.href = "hss://info?url="+url;
            setTimeout(function () {
                if ((new Date()).getTime() - visitedAt < 2000) {
                    location.href = decodeURIComponent(url);
                }
            }, 1500);
        }
    //MO WEB
    }else {
        if(!Common.cookieIsLogin()) {
            alert('로그인후 이용가능한 메뉴입니다. 로그인 화면으로 이동합니다.');
            Common.goLoginNoAlertWithParam(decodeURIComponent(url));
        }else{
            location.href = decodeURIComponent(url);
        }
    }


}


