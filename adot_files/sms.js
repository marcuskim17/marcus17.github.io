!function($, document, window) {
	'use strict';
	
	var timer = null;
	var checkTime = null;

	// alert, confirm > modal popup
	var openAlertModal = function(message) {
		var $alertModal = $('#_alert_modal');
		var $alertModalDesc = $alertModal.find('.desc');
		var $dimmed = $('.dimmed');

		// scroll
		var scrollPosition = $(window).scrollTop();
		$(document).on('click','._alert_confirm_modal .btn-close, ._alert_confirm_modal .btn-confirm',function(){
			$(window).scrollTop(scrollPosition);
		});

		$dimmed.show();
		$alertModalDesc.text(message);
		$alertModal.show();
	}

	function postSomeEventSMS($wrap, postData) {
		if ($wrap.data('posting')) {
			return;
		}

		var baseURL = $wrap.data('url');
		if (!baseURL) {
			return;
		}

		var postPayload = {
			promotion : {}
		};
		var i, size;
		for (i = 0, size = postData.length; i < size; i++) {
			var data = postData[i];
			if (data.value === 'Y') {
				postPayload[data.name] = true;
			} else if (data.value === 'N') {
				postPayload[data.name] = false;
			} else if (/^promotion-(.+)$/.test(data.name)) {
				var promotionItem = data.name.replace(/^promotion-(.+)$/, '$1');
				postPayload.promotion[promotionItem] = data.value;
			} else {
				postPayload[data.name] = data.value;

			}
		}

		// DRAW 프로모션
		if ((postPayload.promotion.id == 'A_draw_evt_1')
			|| (postPayload.promotion.id == 'A_draw_evt_2')
			|| (postPayload.promotion.id == 'A_draw_evt_3')
			|| (postPayload.promotion.id == 'A_draw_evt_4')
			|| (postPayload.promotion.id == 'A_draw_evt_5')) {
			// 이름이 입력되지 않은 경우.
			if (!(postPayload.entryName) || $.trim(postPayload.entryName).length === 0) {
				var entryNameRequired = $wrap.find('._article-entry-name').data('required');
				if (entryNameRequired) {
					openAlertModal(entryNameRequired);
					return;
				}
			}

			// 휴대폰 번호가 입력되지 않은 경우.
			if (!(postPayload.entryMobile) || $.trim(postPayload.entryMobile).length === 0) {
				var entryMobileRequired = $wrap.find('._article-entry-mobile').data('required');
				if (entryMobileRequired) {
					openAlertModal(entryMobileRequired);
					return;
				}
			}

			// 휴대폰 번호 입력 길이 체크
			var $entryMobileWrap = $wrap.find('._article-entry-mobile');
			if ($entryMobileWrap.length) {
				if ($entryMobileWrap.val().length < 10 || $entryMobileWrap.val().length > $entryMobileWrap.data('maxlength')) {
					$entryMobileWrap.val($entryMobileWrap.val().substring(0, $entryMobileWrap.data('maxlength')));
					openAlertModal($entryMobileWrap.data('exception'));
					$entryMobileWrap.focus();
					return;
				}
				if (isNaN($entryMobileWrap.val())) {
					openAlertModal($entryMobileWrap.data('validation'));
					$entryMobileWrap.focus();
					return;
				}
			}
		} else {
			// 이름이 입력되지 않은 경우.
			if (!(postPayload.entryName)
					|| $.trim(postPayload.entryName).length === 0) {
				var entryNameRequired = $wrap.find('._article-entry-name').data('required');
				if (entryNameRequired) {
					alert(entryNameRequired);
					return;
				}
			}

			// 생년월일 입력 프로모션일 경우
			if (postPayload.promotion.id == 'Quantum4_baro') {
				// 생년월일
				let birthDate = $('._article-entry-eventCate');
				let birthDateVal = birthDate.val();
				let birthYear = birthDateVal.substring(0,4);
				let result = moment(birthDateVal, 'YYYYMMDD').isValid();

				// 생년월일 미입력
				if (birthDateVal.length === 0) {
					let birthDateRequired = birthDate.data('required');
					if (birthDateRequired) {
						alert(birthDateRequired);
						return;
					}
				}

				// 생년월일 입력 길이 체크
				if (birthDateVal.length > birthDate.data('maxlength') || birthDateVal.length < 8) {
					birthDate.val(birthDateVal.substring(0, birthDate.data('maxlength')));
					alert(birthDate.data('exception'));
					return;
				}

				// 생년월일 유효성 체크
				let now = new Date();
				let nowYear = now.getFullYear();
				let nowMonth = now.getMonth() + 1;
				let nowMonthFormat = nowMonth >= 10 ? nowMonth : "0" + nowMonth;
				let nowDate = now.getDate();
				let nowDateFormat = nowDate >= 10 ? nowDate : "0" + nowDate;
				let today = "" + nowYear + nowMonthFormat + nowDateFormat;

				if (result == true) {
					if (birthDateVal > today || (nowYear -birthYear) >= 150) {
						alert("유효하지 않는 생년월일입니다.");
						birthDate.val("");
						return;
					}
				} else if (result == false) {
					alert("유효하지 않는 생년월일입니다.");
					birthDate.val("");
					return;
				}
			}

			// 휴대폰 번호가 입력되지 않은 경우.
			if (!(postPayload.entryMobile) || $.trim(postPayload.entryMobile).length === 0) {
				var entryMobileRequired = $wrap.find('._article-entry-mobile').data('required');
				if (entryMobileRequired) {
					alert(entryMobileRequired);
					return;
				}
			}

			// 휴대폰 번호 입력 길이 체크
			var $entryMobileWrap = $wrap.find('._article-entry-mobile');
			if ($entryMobileWrap.length) {
				if ($entryMobileWrap.val().length < 10 || $entryMobileWrap.val().length > $entryMobileWrap.data('maxlength')) {
					$entryMobileWrap.val($entryMobileWrap.val().substring(0, $entryMobileWrap.data('maxlength')));
					alert($entryMobileWrap.data('exception'));
					$entryMobileWrap.focus();
					return;
				}
				if (isNaN($entryMobileWrap.val())) {
					alert($entryMobileWrap.data('validation'));
					$entryMobileWrap.focus();
					return;
				}
			}

			// 인증번호 거부 휴대폰번호.
			var denialMobile = [ '01062482644' ];
			if (denialMobile.length > 0) {
				var denialFlag = false;
				$.each(denialMobile, function(index, item) {
					if (postPayload.entryMobile == item) {
						denialFlag = true
						return false;
					}
				});
				if (denialFlag) {
					alert("인증번호 전송을 거부한 휴대폰번호 입니다.");
					return;
				}
			}
		}

		var formAttribute = {
			action : baseURL + '/smsSend',
			method : 'POST'
		};

		$wrap.data('posting', true);
		
		$('._article-entry-mobile').attr('readonly', true);
		
		// 인증 번호 확인
		var persistArticleInternal = function($wrap, formAttribute, postPayload) {
			$.ajax(formAttribute.action, {
				contentType : 'application/json',
				data : JSON.stringify(postPayload),
				method : formAttribute.method,
				dataType : 'json',
				processData : true,
				crossDomain : true,
				xhrFields : {
					withCredentials : true
				}
			}).done(function(data) {
				var response = data.resultResponse;
				if (response.result === 200) {
					var $authWrap = $wrap.find('._auth');
					if ($authWrap) {
						$authWrap.attr('disabled', false);
						var time = 180 * 1000;
						timeInterval(time);

						if (($('input[name="promotion-id"]').val() == 'A_draw_evt_1')
							|| ($('input[name="promotion-id"]').val() == 'A_draw_evt_2')
							|| ($('input[name="promotion-id"]').val() == 'A_draw_evt_3')
							|| ($('input[name="promotion-id"]').val() == 'A_draw_evt_4')
							|| ($('input[name="promotion-id"]').val() == 'A_draw_evt_5')) {
							openAlertModal(response.message)
						} else {
							alert(response.message);
						}
					}
				} else {
					if (($('input[name="promotion-id"]').val() == 'A_draw_evt_1')
						|| ($('input[name="promotion-id"]').val() == 'A_draw_evt_2')
						|| ($('input[name="promotion-id"]').val() == 'A_draw_evt_3')
						|| ($('input[name="promotion-id"]').val() == 'A_draw_evt_4')
						|| ($('input[name="promotion-id"]').val() == 'A_draw_evt_5')) {
						openAlertModal(response.message)
					} else {
						alert(response.message);
					}
				}
			}).always(function() {
				$wrap.data('posting', false);
			});
		};

		persistArticleInternal($wrap, formAttribute, postPayload);
	}

	function timeInterval(time) {
		clearInterval(timer);
		timer = setInterval(function() {
			checkTime = time;
			if (time == 0) {
				clearInterval(timer);
			} else {
				time = time - 1000;
				$(".count-down-area").text(moment(time).format('mm:ss'));
			}
		}, 1000);
	}

	// recaptcha 판별
	function postRecaptchaAuth($wrap, postData) {
		if ($wrap.data('posting')) {
			return;
		}

		var baseURL = $wrap.data('url');
		if (!baseURL) {
			return;
		}

		var formAttribute = {
			action : baseURL + '/captcha',
			method : 'POST'
		};
		
		var sitekey = $('input[name=site-key]').val();
		grecaptcha.ready(function() {
			grecaptcha.execute(sitekey, {
				action : 'submit'
			}).then(
				function(token) {
					var token = {"token" : token};
					$.ajax(formAttribute.action, {
						contentType : 'application/json',
						data : JSON.stringify(token),
						method : formAttribute.method,
						dataType : 'json',
						processData : true,
						crossDomain : true,
						xhrFields : {
							withCredentials : true
						}
					}).done(
						function(data) {
							var response = data.resultResponse;
							if (response.result == 200) {
								postSomeEventAuth($wrap, postData);
							} else {
								alert(response.message);
							}
						}).always(function() {
						$wrap.data('posting', false);
					});
				});
		});
	}
	
	// 인증 번호 인증
	function postSomeEventAuth($wrap, postData) {
		if ($wrap.data('posting')) {
			return;
		}

		var baseURL = $wrap.data('url');
		if (!baseURL) {
			return;
		}

		var postPayload = {
			promotion : {}
		};
		var i, size;
		for (i = 0, size = postData.length; i < size; i++) {
			var data = postData[i];
			if (data.value === 'Y') {
				postPayload[data.name] = true;
			} else if (data.value === 'N') {
				postPayload[data.name] = false;
			} else if (/^promotion-(.+)$/.test(data.name)) {
				var promotionItem = data.name.replace(/^promotion-(.+)$/, '$1');
				postPayload.promotion[promotionItem] = data.value;
			} else {
				postPayload[data.name] = data.value;
			}
		}

		if ((postPayload.promotion.id == 'A_draw_evt_1')
			|| (postPayload.promotion.id == 'A_draw_evt_2')
			|| (postPayload.promotion.id == 'A_draw_evt_3')
			|| (postPayload.promotion.id == 'A_draw_evt_4')
			|| (postPayload.promotion.id == 'A_draw_evt_5')) {
			// 인증번호가 입력되지 않은 경우.
			if (!(postPayload.authNumber) || $.trim(postPayload.authNumber).length === 0) {
				var entryAuthRequired = $wrap.find('._article-auth-number').data('required');
				if (entryAuthRequired) {
					openAlertModal(entryAuthRequired);
					return;
				}
			}

			// 인증번호 입력 길이 체크
			var $entryAuthWrap = $wrap.find('._article-auth-number');
			if ($entryAuthWrap.length) {
				if ($entryAuthWrap.val().length < $entryAuthWrap.data('maxlength')) {
					$entryAuthWrap.val($entryAuthWrap.val().substring(0, $entryAuthWrap.data('maxlength')));
					openAlertModal($entryAuthWrap.data('exception'));
					$entryAuthWrap.focus();
					return;
				}
				if (isNaN($entryAuthWrap.val())) {
					openAlertModal($entryAuthWrap.data('validation'));
					$entryAuthWrap.focus();
					return;
				}
			}
		} else {
			// 인증번호가 입력되지 않은 경우.
			if (!(postPayload.authNumber) || $.trim(postPayload.authNumber).length === 0) {
				var entryAuthRequired = $wrap.find('._article-auth-number').data('required');
				if (entryAuthRequired) {
					alert(entryAuthRequired);
					return;
				}
			}

			// 인증번호 입력 길이 체크
			var $entryAuthWrap = $wrap.find('._article-auth-number');
			if ($entryAuthWrap.length) {
				if ($entryAuthWrap.val().length < $entryAuthWrap.data('maxlength')) {
					$entryAuthWrap.val($entryAuthWrap.val().substring(0, $entryAuthWrap.data('maxlength')));
					alert($entryAuthWrap.data('exception'));
					$entryAuthWrap.focus();
					return;
				}
				if (isNaN($entryAuthWrap.val())) {
					alert($entryAuthWrap.data('validation'));
					$entryAuthWrap.focus();
					return;
				}
			}
		}

		var $authWrap = $wrap.find('._auth');
		var $entryAuthWrap = $wrap.find('._article-auth-number');
		var $authPost = $wrap.find('._auth-post');
		var $smsPost = $wrap.find('._sms-post');

		if (checkTime == 0) {
			if ((postPayload.promotion.id == 'A_draw_evt_1')
				|| (postPayload.promotion.id == 'A_draw_evt_2')
				|| (postPayload.promotion.id == 'A_draw_evt_3')
				|| (postPayload.promotion.id == 'A_draw_evt_4')
				|| (postPayload.promotion.id == 'A_draw_evt_5')) {
				openAlertModal("인증시간이 만료되었습니다.");
			} else {
				alert("인증시간이 만료되었습니다.");
			}
			// $smsPost.attr('disabled', false);
			$entryAuthWrap.val("인증 번호");
			$entryAuthWrap.attr('disabled', true);
			$authPost.attr('disabled', true);
			return;
		}
		
		var formAttribute = {
			action : baseURL + '/authConfirm',
			method : 'POST'
		}
		
		var authParameter = {
			"authNum" : postPayload.authNumber,
			"authMobile" : postPayload.entryMobile,
			"promotion" : postPayload.promotion
		}
		
		var persistArticleInternal = function($wrap, formAttribute, postPayload) {
			$.ajax(formAttribute.action, {
				contentType : 'application/json',
				data : JSON.stringify(authParameter),
				method : formAttribute.method,
				dataType : 'json',
				processData : true,
				crossDomain : true,
				xhrFields : {
					withCredentials : true
				}
			}).done(function(data) {
				var response = data.resultResponse;

				if (response.result === 200 && response.data === true) {
					clearInterval(timer);
					$smsPost.attr('disabled', true);
					$authWrap.attr('disabled', true);

					$entryAuthWrap.val($entryAuthWrap.data('confirm'));
					$(".count-down-area").text('00:00');
					$("._article-auth-confirm").val('true');

					if ((postPayload.promotion.id == 'A_draw_evt_1')
						|| (postPayload.promotion.id == 'A_draw_evt_2')
						|| (postPayload.promotion.id == 'A_draw_evt_3')
						|| (postPayload.promotion.id == 'A_draw_evt_4')
						|| (postPayload.promotion.id == 'A_draw_evt_5')) {
						openAlertModal(response.message);
					} else {
						alert(response.message);
					}
				} else {
					if ((postPayload.promotion.id == 'A_draw_evt_1')
						|| (postPayload.promotion.id == 'A_draw_evt_2')
						|| (postPayload.promotion.id == 'A_draw_evt_3')
						|| (postPayload.promotion.id == 'A_draw_evt_4')
						|| (postPayload.promotion.id == 'A_draw_evt_5')) {
						openAlertModal(response.message);
					} else {
						alert(response.message);
					}
				}
			}).always(function() {
				$wrap.data('posting', false);
			});
		};
		persistArticleInternal($wrap, formAttribute, postPayload);
	}

	var promotionInitializer = function() {
		var $boardWrapEdit = $('._article-edit-wrap');
		if ($boardWrapEdit.length === 1) {
			var $articleForm = $boardWrapEdit.find('._article-form');
			if (!$articleForm.length) {
				return;
			}
			$boardWrapEdit.on('click', '._sms-post', function(event) {
				var $target = $(event.currentTarget);
				// $target.attr('disabled', true);
				postSomeEventSMS($boardWrapEdit, $articleForm.serializeArray());

			});
			$boardWrapEdit.on('click', '._auth-post', function(event) {
				var $target = $(event.currentTarget);
				postRecaptchaAuth($boardWrapEdit, $articleForm.serializeArray());
			});
			var $onlyNumberElements = $boardWrapEdit.find('._only-number');
			if ($onlyNumberElements.length) {
				$onlyNumberElements.on('input blur paste', function() {
					$(this).val($(this).val().replace(/\D/g, ''));
				});
			}
		}
	}

	$(document).ready(promotionInitializer, openAlertModal);

}(jQuery, document, window);