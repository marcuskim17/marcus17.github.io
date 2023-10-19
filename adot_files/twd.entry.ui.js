;(function($){
	"use strict";

	var twdEntryUI = function(){
		return {
			initialize: function(){
				this.modal();
				this.placeholder();
				this.checkInput();
				this.ie9select();
				this.raty();
				this.clipboard();
			},
			placeholder: function(){
				$('input, textarea').placeholder();
			},
			checkInput: function(){
				if(!$('.checkbox.input-type').length) return;
				$(document).on('change','.checkbox.input-type input[type=checkbox]',function(){
					$(this).val(addCommas($(this).val().replace(/[^0-9]/g,"")));
				});
			},
			ie9select: function(){
				var isBrowser = navigator.userAgent.toLowerCase();
				if(isBrowser.indexOf('msie 9') != -1){
					if($('select').length){
						$('body').addClass('ie9');
						$('select').selectmenu();
					}
				}
			},
			raty: function(){
				if(!$('.rating-area').length) return;
				$('.rating-area').raty({
					hints: ['', '', '', '', ''],
					starHalf: 'asset/images/base/rate-smile-half.png',
					starOff: 'asset/images/base/rate-smile-off.png',
					starOn: 'asset/images/base/rate-smile-on.png',
					half: true,
					number: 5,
					numberMax: 5,
					starType:'img',
					targetKeep:true
				});
			},
			modal: function(){
				if(!$('[data-modal-target]').length) return;
				function bind(){
					var speed = 120;
					$(document).on('click','[data-modal-target]',function(){
						var winTop = $(window).scrollTop();
						var $target = $($(this).data('modal-target'));
						$('.dimmed').fadeIn(speed);
						$target.fadeIn(speed).addClass('open');
						$('body').addClass('js-entry-noscroll').css('top',-winTop);
						$target.find('.btn-close').focus();
					});
					$(document).on('click','.modal .btn-close, .modal .btn-confirm',function(){
						var scrollTop = Math.abs(parseInt($('body').addClass('js-entry-noscroll').css('top'), 10));
						var targetId = $(this).closest('.modal').attr('id');
						$('body').removeClass('js-entry-noscroll');
						$('.dimmed').fadeOut(speed);
						$(this).closest('.modal').fadeOut(speed).removeClass('open');
						$(window).scrollTop(scrollTop);
						$('[data-modal-target=#'+targetId+']').focus();
					});
					$(document).on('keydown',function(e){
						if(!$('.modal.open .btn-close').length) return;
						if(e.keyCode === 27){
							$('.modal.open .btn-close').trigger('click');
						}
					});
				}
				function focus(){
					$($('[data-modal-target]')).each(function(){
						if($(this).hasClass('has-focus')) return;
						var $target = $($(this).data('modal-target'));
						var $btnClose = $target.find('.btn-close');
						$target.addClass('has-focus');
						$target.prepend('<span class="modal_start" tabindex="0"></span>');
						$target.append('<span class="modal_end" tabindex="0"></span>');
						$('.modal_end').on('focus',function() { $btnClose.focus() });
						$('.modal_start').on('focus',function(){ $btnClose.focus() });
					});
				}
				bind();
				focus();
			},
			clipboard: function(){
				var defaults = {
					$target: $('[data-url-copy]'),
					alertText: '주소가 복사되었습니다.\n원하는 곳에 붙여넣기 해주세요.',
					_textarea: null,
					_text: null,
				};
				if(!defaults.$target.length) return;
				defaults.$target.off('click.clipboard').on('click.clipboard',function(e) {
					e.preventDefault();
					defaults._textarea = document.createElement("textarea");
					defaults._textarea.style.position = 'fixed';
					document.body.appendChild(defaults._textarea);
					defaults._textarea.value = $(this).attr('data-url-copy');
					defaults._textarea.select();
					document.execCommand('copy');
					document.body.removeChild(defaults._textarea);
					$(this).attr('data-url-copy-alert')?defaults._text=$(this).attr('data-url-copy-alert'):defaults._text=defaults.alertText;
					alert(defaults._text);
				});
			},
		}
	}();
	
	$(document).ready(function(){ twdEntryUI.initialize() });
	
})(jQuery);