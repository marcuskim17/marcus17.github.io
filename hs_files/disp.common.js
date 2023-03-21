/*
* 모바일 전시 컴포넌트 관련 스크립트 모음
* 작성자 : 김동진
* 작성일 : 2021.03.10
*/

/**
 * 전시 홈아이디어 컴포넌트 관련 스크립트
 * 페이징이 필요한 컴포넌트는 1개만 운영한다는 전제조건이 있어서,  #currentPageNo 등과 같은 페이징 객체는 중복으로 있을수 없음.
 * @author 김동진
 * @since 2021.03.04
 */
var dispHomeIdea = {

	// 전문가 컨텐츠 1,2단 셋팅 YH. LEE
	setHomeIdeaListType : function(componentNo, type) {
		var homeList = $("#div_"+componentNo).find('.type-list');

		if(type == 1){				//1단
			$("#div_"+componentNo).find("[name=homeList]").hide();
			$("#div_"+componentNo).find("[name=homeImageList]").show();
			homeList.removeClass("row");
			homeList.removeClass("col");
		}else {						//2단
			$("#div_"+componentNo).find("[name=homeList]").show();
			$("#div_"+componentNo).find("[name=homeImageList]").hide();
			homeList.addClass("row");
			homeList.addClass("col");
		}

		var homeListLi = homeList.find("li");
		for (var data of homeListLi) {
			var infoNode = $(data).find('#addrInfo');
			var scrapSNode = $(data).find('#scrapS');
			var scrapLNode = $(data).find('#scrapL');
			var vr = $(data).find('.vr');
			if(type == 1) {
				$(infoNode).show();
				$(scrapSNode).hide();
				$(scrapLNode).show();
				$(vr).show();
			} else {
				$(infoNode).hide();
				$(scrapSNode).show();
				$(scrapLNode).hide();
				$(vr).hide();
			}
		}
	}


	// 홈아이디어 목록 1단 이미지 플리킹 셋팅
	,setHomeIdeaListType1 : function(componentNo) {
		$("#div_"+componentNo).find("[name=homeList]").hide();
		//$("#div_"+componentNo).find("[name=homeImageList]").show();
		var homeList = $("#div_"+componentNo+" .homeIdeaList").find("li");

		for (var data of homeList) {
			var liNode = $(data).find('.prd-img');
			if ($(liNode).hasClass("R") || $(liNode).hasClass("H") || $(liNode).hasClass("A") || $(liNode).hasClass("F") || $(liNode).hasClass("K")) {
				$(liNode).addClass("prd-img-on");
			}
		}
	}

	// 홈아이디어 리스트 2단 레이아웃
	, homeMasonry : function(componentNo) {
		var homeListItem = "";
		if(typeof(componentNo)=="undefined"){ // 홈아이디어 목록 화면에서 호출
			homeListItem = $('.home-list:not(.home-type-list) .list-node');
		} else { // 홈아이디어 전시 컴포넌트 목록 에서 호출
			homeListItem = $("#div_"+componentNo).find('.home-list:not(.home-type-list) .list-node');
		}

		var homeListH = 0;
		homeListItem.each(function(index, el) {
			homeListH += $(el).outerHeight() ;
			homeListItem.closest('.home-list').height( homeListH/2 + (homeListItem.last().outerHeight()/2 + 50));
		});
	}

	// 페이징이 필요한 컴포넌트 로딩시 스크롤 페이징 이벤트 등록
	, addScrollPagingEvent : function(componentNo) {
		$(window).bind("scroll",function() {
			try{
				var isBottom = $(".mall-footer").height() ? $(".mall-footer").outerHeight():0;

				if($(window).scrollTop() + $(window).height() + isBottom >= $("body").height() - addBottomHeight){
					if (isBack == "N" && hasListData && ! isListLoading) {
						var page = Number($("#ajaxListFrm").find("#currentPageNo").val())+1;
						$("#ajaxListFrm").find("#currentPageNo").val(page);

						if(page <= $("#ajaxListFrm").find("#pageCount").val()){
							dispHomeIdea.getDispHomeIdeaList(componentNo);
						} else {
							console.log("더이상 게시물이 없습니다.");
							$("#ajaxListFrm").find("#currentPageNo").val($("#ajaxListFrm").find("#pageCount").val());
						}
					}
				}
			}catch(e){}
		});
	}

	// 필터 선택시
	, onSelFilter : function(selObj) {
		$("#currentPageNo").val(1);
		var componentNo = $(selObj).attr("id").split("_")[2];
		var filterGrpCd = $(selObj).data("filterGrpcd");
		var optionCd = $(selObj).val();
		var optionText = $("#"+$(selObj).attr("id")+" option:selected").text();
		var arrFilter = eval("arrFilter_"+componentNo+"_"+filterGrpCd);

		if(optionCd == ""){
			$("#divSelectOption_"+componentNo+" ul li[id^='"+filterGrpCd+"']").remove(); // 해당 그룹필터에 해당되는 li 전부삭제

			// 해당 필터 조회값 초기화
			while(arrFilter.length > 0) {
				arrFilter.pop();
			}
		} else {
			var li_id = filterGrpCd+"_"+optionCd+"_"+componentNo;
			if($("#divSelectOption_"+componentNo+" ul li[id='"+li_id+"']").length == 0){
				var liHtml = "<li id='"+li_id+"'>";
				liHtml += '<button onclick="dispHomeIdea.delFilterOption(\''+ li_id +'\');">'+optionText+'</button>';
				liHtml += "</li>";
				$("#divSelectOption_"+componentNo+" ul").prepend(liHtml);
				arrFilter.push(optionCd); // 해당 필터 조회값에 옵션 원소 추가
			}
		}

		dispHomeIdea.showHomeIdeaDivSelectArea(componentNo);
		if(isBack == "N"){
			dispHomeIdea.getDispHomeIdeaList(componentNo);
		}
	}

	// 정렬 선택시
	, onSelSort : function(componentNo,  sortValue) {
		$("#currentPageNo").val(1);
		$.each($("#pop-sort li a"), function(k,v){
			if(sortValue == $(v).data("pop-sort")) {
				$(v).addClass("on");
			} else {
				$(v).removeClass("on");
			}
		});
		var sortText = "";
		if (sortValue == "N") {
			sortText = "최근인기순";
		} else if (sortValue == "F") {
			sortText = "역대인기순";
		} else if (sortValue == "R") {
			sortText = "최근등록순";
		}
		$("#sortName").html(sortText);
		$("#sel_sort_"+componentNo).val(sortValue);
		dispHomeIdea.getDispHomeIdeaList(componentNo);
		popup_closeV1('pop-sort');
	}

	// 시도 선택시
	, onSelSido : function(selObj) {
		$("#currentPageNo").val(1);
		var componentNo = $(selObj).attr("id").split("_")[2];
		var sidoCd = $(selObj).val();

		var text = '<option value=\"\">시/군/구를 선택하세요</option>';
		$("#sel_apart_"+componentNo).empty().append(text);

		if(sidoCd == ""){
			text = '<option value=\"\">시/도를 선택하세요</option>';
			$("#sel_sigungu_"+componentNo).empty().append(text);
		} else {
			$("#js-loading").show();
			$.ajax({
				url : "/m/mhomeIdea/selectUsableSggList.do",
				type : 'GET',
				dataType : 'json',
				async : false, // hash 처리시 자동선택 처리를 위해 동기방식으로 조회
				data : { sidoCd : sidoCd },
				success : function(data) {
					var text = '<option value=\"\">전체</option>';
					$.each(data.list, function(key, val) {
						text += '<option value=\"' + val.SggCd + '\">' + val.SggNm + '</option>';
					});
					$("#sel_sigungu_"+componentNo).empty().append(text);
				},
				error:function(request, status, error){
					console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					$("#js-loading").hide();
				}
			});
		}

		if(isBack == "N"){
			dispHomeIdea.getDispHomeIdeaList(componentNo);
		}
	}

	// 시군구 선택시
	, onSelSigungu : function(selObj) {
		$("#currentPageNo").val(1);
		var componentNo = $(selObj).attr("id").split("_")[2];
		var sidoCd = $("#sel_sido_"+componentNo).val();
		var sigungu = $(selObj).val();

		if(sigungu == ""){
			var text = '<option value=\"\">시/군/구를 선택하세요</option>';
			$("#sel_apart_"+componentNo).empty().append(text);
		} else {
			$("#js-loading").show();
			$.ajax({
				url : "/m/mhomeIdea/selectUsableApartList.do",
				type : 'GET',
				dataType : 'json',
				async : false, // hash 처리시 자동선택 처리를 위해 동기방식으로 조회
				data : { sidoCd : sidoCd, sggCd : sigungu },
				success : function(data) {
					var text = '<option value=\"\">전체</option>';
					$.each(data.list, function(key, val) {
						text += '<option value=\"' + val.AddrAptNm + '\">' + val.AddrAptNm + '</option>';
					});
					$("#sel_apart_"+componentNo).empty().append(text);
				},
				error:function(request, status, error){
					console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					$("#js-loading").hide();
				}
			});
		}

		if(isBack == "N"){
			dispHomeIdea.getDispHomeIdeaList(componentNo);
		}
	}

	// 아파트 선택시
	, onSelApart : function(selObj) {
		$("#currentPageNo").val(1);
		var componentNo = $(selObj).attr("id").split("_")[2];
		if(isBack == "N"){
			dispHomeIdea.getDispHomeIdeaList(componentNo);
		}
	}

	// 필터 옵션 삭제
	, delFilterOption : function(li_id) {
		$("#currentPageNo").val(1);
		var filterGrpCd = li_id.split("_")[0];
		var optionCd = li_id.split("_")[1];
		var componentNo = li_id.split("_")[2];
		var arrFilter = eval("arrFilter_"+componentNo+"_"+filterGrpCd);
		arrFilter.splice(arrFilter.indexOf(optionCd), 1); // 필터 조회값 배열에서 해당옵션에 해당되는 원소제거

		$("#"+li_id).remove();
		dispHomeIdea.showHomeIdeaDivSelectArea(componentNo);
		dispHomeIdea.getDispHomeIdeaList(componentNo);

		// 해당 그룹필터에 선택된 옵션이 없으면 해당 그룹필터 셀렉스박스를 '전체' 로 선택처리
		var selectedFilterOptCnt = $("#divSelectOption_"+componentNo+" ul li[id^='"+filterGrpCd+"']").length;
		if(selectedFilterOptCnt == 0){
			$("#sel_"+filterGrpCd+"_"+componentNo).val("");
		}
	}

	// 선택된 옵션 영역 노출/숨김 처리
	, showHomeIdeaDivSelectArea : function(componentNo) {
		var selOptionCnt = $("#divSelectOption_"+componentNo+" ul li").length;
		if(selOptionCnt > 0) {
			$("#divSelectOption_"+componentNo).show();
		} else {
			$("#divSelectOption_"+componentNo).hide();
		}
	}

	// 홈아이디어 조회 (페이징 기능이 있는 컴포넌트에서만 호출)
	, getDispHomeIdeaList : function(componentNo, firstSearchYn) {
		$("#js-loading").show();
		isListLoading = true;
		var adType = $("#div_"+componentNo).data("adtype");
		var acctNo = $("#div_"+componentNo).data("acctno");
		var dispComponentType = "";
		if($("#div_"+componentNo).data("dispcomponenttype") != null && $("#div_"+componentNo).data("dispcomponenttype") != "undefined") {
			dispComponentType = $("#div_"+componentNo).data("dispcomponenttype");
		}

		// 홈아이디어 파라미터 변수
		var constType = "";
		var houseTypeCd = "";
		var area2 = "";
		var area2Type = "";
		var spaceTypeCdList = "";
		var familyTypeCd = "";
		var styleCdList = "";
		var colorCdList = "";
		var costCd = "";
		var type = "";
		var regType = "";
		var channel = "";
		var sidoCd = "";
		var sggCd = "";
		var apartCd = "";
		var bayType = "";
		var detailConstructionCdList = "";
		var extensionCdList = "";

		// 자동구성 타입인경우 필터별로 설정되었는지 여부값
		var constTypeFilterYn = "";
		var houseTypeCdFilterYn = "";
		var area2FilterYn = "";
		var spaceTypeCdListFilterYn = "";
		var familyTypeCdFilterYn = "";
		var styleCdListFilterYn = "";
		var colorCdListFilterYn = "";
		var costCdFilterYn = "";
		var typeFilterYn = "";
		var regTypeFilterYn = "";
		var channelFilterYn = "";
		var bayTypeFilterYn = "";
		var detailConstructionCdListFilterYn = "";
		var extensionCdListFilterYn = "";

		// 필터에 해당되는 배열객체가 없는경우 '' 로 할당
		try {constType = 		eval("arrFilter_"+componentNo+"_CD114").toString(); 	constTypeFilterYn="Y";} 		catch (e) {constType = "";}
		try {houseTypeCd = 	eval("arrFilter_"+componentNo+"_CD106").toString(); 			houseTypeCdFilterYn="Y";}		catch (e) {houseTypeCd = "";}
		try {area2 = 				eval("arrFilter_"+componentNo+"_CD102").toString(); 			area2FilterYn="Y";area2Type="B";} 				catch (e) {area2 = "";}
		try {spaceTypeCdList = eval("arrFilter_"+componentNo+"_CD104").toString(); 		spaceTypeCdListFilterYn="Y";} catch (e) {spaceTypeCdList = "";}
		try {familyTypeCd =	 	eval("arrFilter_"+componentNo+"_CD101").toString(); 			familyTypeCdFilterYn="Y";} 	catch (e) {familyTypeCd = "";}
		try {styleCdList = 		eval("arrFilter_"+componentNo+"_CD103").toString(); 			styleCdListFilterYn="Y";} 		catch (e) {styleCdList = "";}
		try {colorCdList =	 	eval("arrFilter_"+componentNo+"_CD105").toString(); 			colorCdListFilterYn="Y";} 		catch (e) {colorCdList = "";}
		try {costCd = 				eval("arrFilter_"+componentNo+"_CD107").toString(); 			costCdFilterYn="Y";} 			catch (e) {costCd = "";}
		try {type = 				eval("arrFilter_"+componentNo+"_CD100").toString(); 			typeFilterYn="Y";} 				catch (e) {type = "";}
		try {regType = 			eval("arrFilter_"+componentNo+"_CD108").toString(); 			regTypeFilterYn="Y";} 			catch (e) {regType = "";}
		try {channel = 			eval("arrFilter_"+componentNo+"_CHANNEL").toString(); 		channelFilterYn="Y";} 			catch (e) {channel = "";}
		try {bayType = 			eval("arrFilter_"+componentNo+"_CD117").toString(); 		bayTypeFilterYn="Y";} 			catch (e) {bayType = "";}
		try {detailConstructionCdList = 			eval("arrFilter_"+componentNo+"_CD119").toString(); 		detailConstructionCdListFilterYn="Y";} 			catch (e) {detailConstructionCdList = "";}
		try {extensionCdList = 			eval("arrFilter_"+componentNo+"_CD155").toString(); 		extensionCdListFilterYn="Y";} 			catch (e) {extensionCdList = "";}

		var param = {
			 "currentPageNo": $("#ajaxListFrm").find("#currentPageNo").val()
			, "recordCountPerPage": $("#ajaxListFrm").find("#recordCountPerPage").val()
			, "sort": $("#sel_sort_"+componentNo).val()
	    	, "constType": constType
	    	, "houseTypeCd": houseTypeCd
	    	, "area2": area2
			, "area2Type": area2Type
	    	, "spaceTypeCdList": spaceTypeCdList
	    	, "familyTypeCd": familyTypeCd
	    	, "styleCdList": styleCdList
	    	, "colorCdList": colorCdList
	    	, "costCd": costCd
	    	, "type": type
	    	, "regType": regType
    		, "channel": channel
    		, "bayType": bayType
    		, "detailConstructionCdList": detailConstructionCdList
    		, "extensionCdList": extensionCdList
	    	, "adType": adType
	    	, "acctNo": acctNo
    		, "componentNo": componentNo
    		, "firstSearchYn": firstSearchYn == "Y" ? "Y" : "N" // 컴포넌트 화면 진입 최초조회 여부
    		, "filterText": ''
			, "filterVal": ''
			, "dispComponentType":dispComponentType
		};
		var param33 = {}; // 필터+홈아이디어 타입용 추가 파라미터
		var param34 = {}; // 필터+자동구성 타입용 추가 파라미터
		var param99 = {}; // 자동구성 타입용 추가 파라미터

		// 컴포넌트 데이터 타입에 따른 추가 파라미터로 셋팅
		if(adType == "33") { // 필터+홈아이디어 타입
			param33 = {
				"threeDUrlYn": $("#threeDUrlYn_"+componentNo).is(":checked") ? "Y" : "N"
				, "modulecode":"constcase"
			};

			if(firstSearchYn == "Y") { // 컴포넌트 화면 진입 최초조회인 경우
				param33.threeDUrlYn = "N";
			}
		} else if(adType == "34") { // 필터+자동구성 타입
			var area2Range = ""; // 자동구성 타입에 설정된 평형대 필터의 전체옵션
			if(area2FilterYn == "Y"){
				$("#sel_CD102_"+componentNo).find("option").each(function() {
					if($(this).val() != ""){
						area2Range += ","+$(this).val();
					}
				});
				if(area2Range.charAt(0) === ',') area2Range = area2Range.slice(1); // 맨앞자리에 , 제거
			}
			param34 = {
				"threeDUrlYn": $("#threeDUrlYn_"+componentNo).is(":checked") ? "Y" : "N"
				, "constTypeFilterYn": constTypeFilterYn
				, "houseTypeCdFilterYn": houseTypeCdFilterYn
				, "area2FilterYn": area2FilterYn
				, "area2Range": area2Range
				, "spaceTypeCdListFilterYn": spaceTypeCdListFilterYn
				, "familyTypeCdFilterYn": familyTypeCdFilterYn
				, "styleCdListFilterYn": styleCdListFilterYn
				, "colorCdListFilterYn": colorCdListFilterYn
				, "costCdFilterYn": costCdFilterYn
				, "typeFilterYn": typeFilterYn
				, "regTypeFilterYn": regTypeFilterYn
				, "channelFilterYn": channelFilterYn
				, "bayTypeFilterYn": bayTypeFilterYn
				, "detailConstructionCdListFilterYn": detailConstructionCdListFilterYn
				, "extensionCdListFilterYn": extensionCdListFilterYn
				, "modulecode":"constcase"
			};

			if(firstSearchYn == "Y") { // 컴포넌트 화면 진입 최초조회인 경우
				param34.threeDUrlYn = "N";
			}
		} else if(adType == "99"){ // 자동구성 타입
			// 아파트 필터의 직무코드 조합 파라미터
			var dutyCdList = "";
			if($("#chk01_"+componentNo).is(":checked")){
				dutyCdList += ",R";
			}
			if($("#chk02_"+componentNo).is(":checked")){
				dutyCdList += ",K";
			}
			if($("#chk03_"+componentNo).is(":checked")){
				dutyCdList += ",F";
			}
			if($("#chk04_"+componentNo).is(":checked")){
				dutyCdList += ",H";
			}
			if(dutyCdList.charAt(0) === ',') dutyCdList = dutyCdList.slice(1); // 맨앞자리에 , 제거

			param99 = {
				"sidoCd": $("#sel_sido_"+componentNo).val()
				, "sggCd": $("#sel_sigungu_"+componentNo).val()
				, "addrAptNm": $("#sel_apart_"+componentNo).val()
				, "constType": dutyCdList
				, "modulecode":"constcase"
			};
		}

		var finalParam = Common.mergeObj(param, param33, param34, param99);


		$.ajax({
			url : "/m/mhomeIdea/getHomeIdeaListAjax.do",
			type : 'POST',
			data: finalParam,
			dataType : 'html',
			cache : false,
			async : true,
			success  : function(html) {
				if(param.currentPageNo == 1){
					$("#ulHomeIdeaList_"+componentNo).html(html).promise().done(dispHomeIdea.listCallback(componentNo));
				} else {
					$("#ulHomeIdeaList_"+componentNo).append(html).promise().done(dispHomeIdea.listCallback(componentNo));
				}

				$("#js-loading").hide();
				isListLoading = false;

				// hash 처리 조회인경우
				if (isBack == "Y") {
					$("#currentPageNo").val(listCount);
					$("#recordCountPerPage").val(recordCountPerPage); // 해쉬된 목록 만큼 자동조회 후 초기화
					$("#pageCount").val(pageCount);
					isBack = "N";
					setTimeout(function(){
						$(window).scrollTop(initScrollTop);
					},0);
					document.location.hash = "";
				}
			},
			error:function(request, status, error){
				console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				$("#js-loading").hide();
			},
			complete:function() {
				if ($(".before-after").length > 0) {
			    	$(".before-after").twentytwenty();
				}
			}
		});
	}

	// 홈아이디어 목록 조회후 실행함수
	, listCallback : function(componentNo) {
		$("#ulHomeIdeaList_"+componentNo).find('script').remove();

		if ($("#ulHomeIdeaList_"+componentNo).find('li').length == 0) {
			$("#ulHomeIdeaList_"+componentNo).hide();
			$("#searchEmpty_"+componentNo).show();
			hasListData = false;
		} else {
			$("#ulHomeIdeaList_"+componentNo).show();
			$("#searchEmpty_"+componentNo).hide();
			hasListData = true;
		}

		var adType = $("#div_"+componentNo).data("adtype");
		if(adType == "99"){
			$("#divSelectOption_"+componentNo).show();

			if($("#sel_sido_"+componentNo).val() == ""){ // 선택없을 때
				$("#resultText_"+componentNo).html("<li><span>전체</span></li>");

			} else if($("#sel_sigungu_"+componentNo).val() == ""){ // '시/도' 만 선택한 경우
				$("#resultText_"+componentNo).html("<li><span>"+$("#sel_sido_"+componentNo+" option:selected").text()+"</span></li>");

			} else if($("#sel_apart_"+componentNo).val() == ""){ // '시/도', '시/군/구'만 선택한 경우
				$("#resultText_"+componentNo).html("<li><span>"+$("#sel_sido_"+componentNo+" option:selected").text() + "</span></li><li><span>" + $("#sel_sigungu_"+componentNo+" option:selected").text()+"</span></li>");

			} else { // 시/도', '시/군/구', '아파트' 선택한 경우
				$("#resultText_"+componentNo).html("<li><span>"+$("#sel_sido_"+componentNo+" option:selected").text() + "</span></li><li><span>" + $("#sel_sigungu_"+componentNo+" option:selected").text() + "</span></li><li><span>" + $("#sel_apart_"+componentNo+" option:selected").text()+"</span></li>");
			}
		}
		dispHomeIdea.setHomeIdeaListType1(componentNo); // 홈아이디어 1단 타입 목록 셋팅
		componentEventBinding();
	}

	// 홈아이디어 상세화면 이동
	, goDetail : function(seq, wiseLogParam) {
		var listScrollTop = $(window).scrollTop();
		var screenHash = "";
		if($("#currentPageNo").length > 0){
			screenHash = listScrollTop + ";" + $("#currentPageNo").val() + ";" + $("#pageCount").val();
		} else {
			screenHash = listScrollTop; // 페이징처리 없는 컴포넌트만 있는경우 높이값만 전달
		}

		var componentHash = "";
		var adType = "";
		var componentNo = "";
		$("[id^='div_']").each(function(){
			if(typeof($(this).data("adtype")) !== "undefined") {
				adType = $(this).data("adtype");
				componentNo = $(this).attr("id").split("_")[1];
			}
		});

		if(adType == "33" || adType == "34") {
			// 홈아이디어 필터x컨텐츠 : ex) 75608|33|F|chk1Yn_N|CD101_02|CD101_01
			componentHash = ";" + componentNo + "|" + adType + "|" + $("#sel_sort_"+componentNo).val() + "|chk1Yn_" + ($("#threeDUrlYn_"+componentNo).is(":checked") ? "Y" : "N");

			$("[id^='sel_CD']").each(function(){
				var filterGrpCd = $(this).attr("id").split("_")[1];
				$("#divSelectOption_"+componentNo+" ul li[id^='"+filterGrpCd+"']").each(function(){
					componentHash += "|" + filterGrpCd + "_" + $(this).attr("id").split("_")[1];
				});
			});

		} else if(adType == "99"){
			// 아파트 필터 자동구성 : ex) 75608|99|F|chk1Yn_N|chk2Yn_N|chk3Yn_Y|chk4Yn_Y|sido_11|sigungu_680||apart_2
			componentHash = ";" + componentNo + "|" + adType + "|" + $("#sel_sort_"+componentNo).val()
												+ "|chk1Yn_" + ($("#chk01_"+componentNo).is(":checked") ? "Y" : "N")
												+ "|chk2Yn_" + ($("#chk02_"+componentNo).is(":checked") ? "Y" : "N")
												+ "|chk3Yn_" + ($("#chk03_"+componentNo).is(":checked") ? "Y" : "N")
												+ "|chk4Yn_" + ($("#chk04_"+componentNo).is(":checked") ? "Y" : "N");

			$("[id^='sel_']").not("[id^='sel_sort_']").each(function(){
				if($(this).val() != "") {
					var filterGrpCd = $(this).attr("id").split("_")[1];
					var optionCd = "";
					if(filterGrpCd == "apart"){ // 아파트 필터의 옵션값은 한글이라 선택된 셀렉트박스의 인덱스값으로 보내준다.
						optionCd = $("#"+$(this).attr("id")+" option").index( $("#"+$(this).attr("id")+" option:selected") );
					} else {
						optionCd = $(this).val();
					}
					componentHash += "|" + filterGrpCd + "_" + optionCd;
				}
			});
		}

		document.location.hash = "#" + screenHash + componentHash;
		var hlink = "/m/homeIdea/contents/homeIdeaDetail.do?seq="+seq;
		if(wiseLogParam != null && wiseLogParam.length > 0){
			hlink = hlink + "&wlp=" + wiseLogParam;
		}
		location.href = hlink;
	}

	// 홈아이디어 좋아요 클릭
	, homeLike : function(seq, element) {
		if (Common.cookieIsLogin() == true) { // 21.02.01.전소정.메인 GEN HTML에서  로그인값체크 안됨
			is_login = true;
		}

		if (!is_login) {
			popupConfirm(LOGIN_CONFIRM_MESSAGE, loginGo);
		} else {
			var likeType = $(element).hasClass("on") ? "D" : "I";
			$.ajax({
				url      : "/m/mhomeIdea/homeLike.do",
				type     : 'POST',
				data	 :	{seq : seq , likeType : likeType},
				dataType : 'json',
				cache    : false,
				async    : false,
				success : function(json) {
					$(element).toggleClass("on");
				},
				error:function(request, status, error){
					if (request.responseText.indexOf("success") > 0) {
						$(element).toggleClass("on");
						var likeCount = request.responseText.split("likeCount")[1].split("=")[1].split("}")[0];
						$(element).prev().find('.prd-opt-like').text(likeCount);
						$(element).find('span').html(likeCount);
						// 여러개의 컴포넌트에서 같은 홈아이디어 게시물이 있는경우 동일하게 처리 (2021.03.04 김동진)
						$("[id^='homeIdeaNode_']").each(function(){
							var homeSeq = $(this).attr("id").split("_")[1];
							if(seq == homeSeq){
								if(likeType == "I"){
									$(this).find(".scrap").addClass("on");
								} else {
									$(this).find(".scrap").removeClass("on");
								}
							}
						});
					} else {
						popupConfirm(LOGIN_CONFIRM_MESSAGE, loginGo);
						console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					}
				}
			});
		}
	}

	// html gen 화면에서 데이터 갱신필요 (좋아요 여부, 좋아요 카운트, 뷰 카운트를 갱신)
	, setHomeIdeaLikeDetailCntAjax : function(componentNo) {

		if(typeof componentNo !== "undefined"){		//여기로 오는건 일단 없는듯.
			if($("#div_"+componentNo).find("[id^='homeIdeaNode_']").length == 0) return; // 해당 컴포넌트내의 홈아이디어 목록만 갱신(홈아이디어1단, 2단, 필터X홈아이디어 컴포넌트에서 호출)
		} else {
			if($("[id^='homeIdeaNode_']").length == 0 && $("[id^='homeIdeaContentNode_']").length == 0) return;  // main.html 에서 호출시에는 모든 홈아이디어 목록 갱신
		}

		var homeSeqList = "";		//1단 마스터 seq
		var homeSeqListCol = "";	//2단 마스터 seq
		var homeContentSeqList = "";	//2단 contentSeq
		if(typeof componentNo !== "undefined"){
			$("#div_"+componentNo).find("[id^='homeIdeaNode_']").each(function(){
				var homeSeq = $(this).attr("id").split("_")[1];
				homeSeqList += ","+ homeSeq;
			});
		} else{
			$("[id^='homeIdeaNode_']").each(function(){
				var homeSeq = $(this).attr("id").split("_")[1];
				homeSeqList += ","+ homeSeq;
			});

			$("[id^='homeIdeaContentNode_']").each(function(){
				var homeSeq = $(this).attr("id").split("_")[1];
				homeSeqListCol += ","+ homeSeq;
				var homeContentSeq = $(this).attr("id").split("_")[2];
				homeContentSeqList += ","+ homeContentSeq;
			});
		}

		if(homeSeqList.charAt(0) === ',') homeSeqList = homeSeqList.slice(1); // 맨앞자리에 , 제거
		if(homeSeqListCol.charAt(0) === ',') homeSeqListCol = homeSeqListCol.slice(1); // 맨앞자리에 , 제거
		if(homeContentSeqList.charAt(0) === ',') homeContentSeqList = homeContentSeqList.slice(1); // 맨앞자리에 , 제거

		$.ajax({
	        url      : "/m/mhomeIdea/selectHomeLikeListAjax.do",
			data 	 : { homeSeqList : homeSeqList, homeSeqListCol : homeSeqListCol, homeContentSeqList : homeContentSeqList },
	        type     : 'get',
	        dataType : "json",
	        cache    : false,
	        async    : true,
	        success  : function(result) {
	        	if(typeof result.homeLikeList !== "undefined" && result.homeLikeList.length > 0){
	        		for (var i = 0 ; i < result.homeLikeList.length ; i++) {
	        			var seq = result.homeLikeList[i].seq;

	        			var $likeElement, $viewElement, $myLikeElement;
	        			if(typeof componentNo !== "undefined"){
		        			$myLikeElement = $("#div_"+componentNo).find("[id^='homeIdeaNode_"+seq+"']").find('.scrap');
	        			} else {
		        			$myLikeElement = $("[id^='homeIdeaNode_"+seq+"']").find('.scrap');
	        			}

	        			if(typeof result.homeLikeList[i].myLikeCnt !== "undefined" && result.homeLikeList[i].myLikeCnt == 1){
	        				$myLikeElement.addClass("on");
	        			} else {
	        				$myLikeElement.removeClass("on");
	        			}
	        		}
	        	}
				if(typeof result.homePicLikeList !== "undefined" && result.homePicLikeList.length > 0){
					for (var i = 0 ; i < result.homePicLikeList.length ; i++) {
						var seq = result.homePicLikeList[i].seq;
						var componentSeq = result.homePicLikeList[i].componentSeq;

						var $myPicLikeElement;
						if(typeof componentNo !== "undefined"){
						} else {
							$myPicLikeElement = $("[id^='homeIdeaContentNode_"+seq+"_"+componentSeq+"']").find('.scrap');
						}

						if(typeof result.homePicLikeList[i].myPicLikeCnt !== "undefined" && result.homePicLikeList[i].myPicLikeCnt == 1){
							$myPicLikeElement.addClass("on");
						} else {
							$myPicLikeElement.removeClass("on");
						}
					}
				}
	        },
			error:function(request, status, error){
				console.log(error)
			}
	    });
	}

	// 홈아이디어 컨텐츠 좋아요/취소(공간x사진)
	, homeIdeaContentLike: function(seq, contentSeq, element) {
		if(!Common.cookieIsLogin()) {
			popupConfirm(LOGIN_CONFIRM_MESSAGE, loginGo);
		} else {
			$.ajax({
				url      : "/m/homeIdea/contents/homeIdeaContentLike.do",
				type     : 'POST',
				data	 :	{seq : seq , contentSeq : contentSeq},
				dataType : 'json',
				cache    : false,
				async    : false,
				success : function(json) {
					$(element).toggleClass("on");
				},
				error:function(request, status, error){
					if (request.responseText.indexOf("success") > 0) {
						var likeCount = request.responseText.split("likeCount")[1].split("=")[1].split("}")[0];
						$(element).toggleClass("on");
						$(element).siblings(".scrap-cnt").text(likeCount);
					} else {
						popupConfirm(LOGIN_CONFIRM_MESSAGE, loginGo);
						console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					}
				}
			});
		}
	}

	// 홈아이디어 플래그 클릭시 해당 GNB 페이지 이동 2022.12.19 YH. LEE
	/* param
	- contentsTypeCd : 컨텐츠종류(String)
	- sortType : 정렬값(String)
	- filterList : 세부필터 리스트(JSON 문자열)
	 */
	, goHomeIdeaGnbList: function (contentsTypeCd, sortType, filterList, wiseLogParam) {
// WiseLogParam 추가 2023.03.08 M.Park
		try {
			//해당 GNB의 AppLink Val 조회 (DISPTemplateDef_T.TemplateType)
			var mallType = "HOMEIDEA";
			var screenType = "M";
			var moduleCode = "";
			var linkUrl = "";
			var appLinkFilterList = new Object();
			appLinkFilterList.sortType = sortType;

			switch (contentsTypeCd) {
				case "C" :
				case "V" :
					moduleCode = "constcase";	//시공사례,3D제안
					linkUrl = SERVER_HTTPS_URL + "/m/main.do?MallType=HOMEIDEA&module=constcase" + ( wiseLogParam ? "&wlp=" + wiseLogParam : ""); // WiseLogParam 추가 2023.03.08 M.Park
					break;
				case "E" :
					moduleCode = "magazine";	//매거진
					linkUrl = SERVER_HTTPS_URL + "/m/main.do?MallType=HOMEIDEA&module=magazine" + ( wiseLogParam ? "&wlp=" + wiseLogParam : "");// WiseLogParam 추가 2023.03.08 M.Park
					break;
				case "I" :
					moduleCode = "spaceandphoto";	//공간x사진
					linkUrl = SERVER_HTTPS_URL + "/m/main.do?MallType=HOMEIDEA&module=spaceandphoto" + ( wiseLogParam ? "&wlp=" + wiseLogParam : "");// WiseLogParam 추가 2023.03.08 M.Park
					let $filterEle = $("#spacePhotoFilterNode li.on"); // 펄터 선택된 엘리먼트
					if($filterEle.length > 0) {
						filterList = JSON.stringify({spaceTypeCdList: $filterEle.data("cd")});
					}
					break;
			}

			if(filterList != null && filterList != '')  {
				var parsedStr = JSON.parse(filterList);
				for(var key in parsedStr) {
					appLinkFilterList[key] = parsedStr[key];
				}
			}

			$.ajax({
				url      : "/m/mhomeIdea/getTemplateTypeAjax.do",
				type     : 'POST',
				data	 :	{mallType : mallType , screenType : screenType , moduleCode : moduleCode},
				dataType : 'json',
				cache    : false,
				async    : false,
				success : function(data) {
					openAppLinkV5(mallType, "GNB", linkUrl, data.appLinkVal, "", "", JSON.stringify(appLinkFilterList));
				},
				error:function(request, status, error){
					console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				}
			});

		}catch (e) {
			console.log(e.message);
		}
	}

	/*
		매거진 상세 페이지로 이동 22.12.21 YH. LEE
	 */
	, goMagazineDetail : function(seq, wiseLogParam, sort, page, categoryCd) {
		try {
			if(seq == null || seq == 0 || seq == '') {
				popupAlert("잘못된 접근입니다. 다시 시도해주세요.", function () {
					return;
				});
			} else {
				const listScrollTopD = $(window).scrollTop(); // 스크롤높이
				if(sort == null || sort == '') sort = "R"; //default 최근등록순 R
				if(page == null || page == '') page = 1;
				// 정렬순서|현제페이지|스크롤위치
				document.location.hash =
					"#" + sort + "|"
					+ page + "|"
					+ listScrollTopD + "|"
					+ categoryCd;

				location.href = "/m/homeIdea/contents/magazineDetail.do?seq="+seq
					+ "&sortType="+sort
					+ "&curPage="+page
					+ ( wiseLogParam ? "&wlp=" + wiseLogParam : "" ); // WiseLogParam 추가 2023.03.08 M.Park
			}
		}catch (e) {
			console.log(e.message);
		}
	}

	/*
		매장 좋아요/취소 22.12.30 YH. LEE
	 */
	, shopLike : function(shopIdx, ele) {
		if(!Common.cookieIsLogin()) {
			popupConfirm(LOGIN_CONFIRM_MESSAGE, loginGo);
		} else {
			$.ajax({
				url      : "/m/mhomeIdea/shopLike.do",
				type     : 'POST',
				data	 :	{shopIdx : shopIdx},
				dataType : 'json',
				cache    : false,
				async    : false,
				success : function(json) {
					$(ele).toggleClass("on");
				},
				error:function(request, status, error){
					if (request.responseText.indexOf("success") > 0) {
						$(ele).toggleClass("on");
					} else {
						popupConfirm(LOGIN_CONFIRM_MESSAGE, loginGo);
						console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
					}
				}
			});
		}
	}

	/*
		GNB> 시공사례 추천 아파트/3D 전문가 (html gen 화면에서 데이터 갱신) YH. LEE 2023.01.02
	 */
	, setShopLikeAjax : function(componentNo) {
		if($("[id^='shopNode_']").length == 0) return;

		var shopIdxList = "";
		$("[id^='shopNode_']").each(function(){
			var shopIdx = $(this).attr("id").split("_")[1];
			shopIdxList += ","+ shopIdx;
		});

		if(shopIdxList.charAt(0) === ',') shopIdxList = shopIdxList.slice(1); // 맨앞자리에 , 제거

		$.ajax({
			url      : "/m/mhomeIdea/selectShopLikeListAjax.do",
			data 	 : { shopIdxList : shopIdxList },
			type     : 'get',
			dataType : "json",
			cache    : false,
			async    : true,
			success  : function(result) {
				if(typeof result.shopLikeList !== "undefined" && result.shopLikeList.length > 0){
					for (var i = 0 ; i < result.shopLikeList.length ; i++) {
						var idx = result.shopLikeList[i].idx;

						var $myLikeElement;
						$myLikeElement = $("[id^='shopNode_"+idx+"']").find('.scrap');

						if(typeof result.shopLikeList[i].myLikeCnt !== "undefined" && result.shopLikeList[i].myLikeCnt == 1){
							$myLikeElement.addClass("on");
						} else {
							$myLikeElement.removeClass("on");
						}
					}
				}
			},
			error:function(request, status, error){
				console.log(error)
			}
		});
	}

	/*
		// GNB> 추천 > 홈아이디어 추천(상품기반) 컴포넌트 (html gen 화면에서 데이터 갱신) YH. LEE 2023.02.06
	 */
	, setRecomHomeIdeaWithPrd : function() {
		try{
			// if( Common.getCookie("HS_RECENT_GDSNOS") == '' ) return;
			var recentGdsNo = Common.getCookie("HS_RECENT_GDSNOS").split(",")[0].split("|")[0];
			if( recentGdsNo == '' || typeof recentGdsNo == 'undefined') return;

			$.ajax({
				url      : "/m/mhomeIdea/setRecomHomeIdeaWithPrdAjax.do",
				data 	 : { recentGdsNo : recentGdsNo },
				type     : 'get',
				dataType : "json",
				cache    : false,
				async    : true,
				success  : function(result) {
					//console.log('result',result)
					if(result.recomGdsInfo) {
						//console.log(result);
						var data = result.recomGdsInfo.gdsInfo;
						var titleHtml = "";
						titleHtml += "최근 본 상품으로 꾸민<br>홈스타일링 아이디어";
						titleHtml += "<span class='comp-more'>";
						titleHtml += "<a href=\"javascript:;location.href='/m/mhomeIdea/recomHomeIdeaWithPrdDetail.do?gdsNo="+ data.gdsNo +"'\">더보기";
						titleHtml += "</a></span>";

						var brandNm = "";
						if(data.brandNm) {
							brandNm = data.brandNm;
						} else if(data.saleCorpNm) {
							brandNm = data.saleCorpNm;
						} else {
							brandNm = "한샘 매장가구";
						}

						$("#recomHomeIdeaWithPrd_Title").html(titleHtml); // 최상단 title, 더보기링크 변경
						$("#recomHomeIdeaWithPrd_GdsDetailLink").find("a").attr("href", "/m/mgoods/goodsDetailMall.do?gdsNo=" + data.gdsNo); // 상품상세 페이지 링크
						$("#recomHomeIdeaWithPrd_GdsImg").html("<img src=\'" + image_server_url + "/hsimg" + data.imgPath_S + "\' onerror=\"onErrorImg(this)\">"); //상품 썸네일 이미지 변경
						$("#recomHomeIdeaWithPrd_GdsTitleType").html("최근 본 상품");	// 상품 타입 문구 변경 (조회시:최근본상품, 추천상품 없을시:한샘추천상품)
						$("#recomHomeIdeaWithPrd_BrandNm").html(brandNm);	// 상품브랜드명
						$("#recomHomeIdeaWithPrd_GdsNm").html(data.gdsNm);	// 상품명

						var homeIdeaList = result.recomGdsInfo.homeIdeaVOList;
						var listHtml = "";
						$.each(homeIdeaList, function(i,v) {
							var tempCss = (v.wishYn) ? " on" : "";
							listHtml += "<li><div class='thumb'><button class='scrap"+ tempCss +"' onclick=\"dispHomeIdea.homeIdeaContentLike('"+v.seq+"','"+v.contentSeq+"',this)\"></button>";
							listHtml += "<a href=\"javascript:;location.href='/m/homeIdea/contents/spaceAndPhotoDetail.do?contentSeq="+ v.contentSeq +"'\">";
							listHtml += "<img src='"+ image_server_url + "/hsimg" + v.mainImgUrl+"' onerror=\"onErrorImg(this)\"></a>";
							listHtml += "</div></li>";
							if(i == 3) return false;
						});

						$("#recomHomeIdeaWithPrd_HomeIdeaList").html(listHtml);		// 홈아이디어 data list
						if(result.recomGdsInfo.homeIdeaVOListSize > 3) $('.recomHomeIdeaWithPrd').show();
					}
				},
				error:function(request, status, error){
					console.log(error)
				}
			});


		} catch (e) {
			console.log(e.message);
		}

		/*
		if($("[id^='shopNode_']").length == 0) return;

		var shopIdxList = "";
		$("[id^='shopNode_']").each(function(){
			var shopIdx = $(this).attr("id").split("_")[1];
			shopIdxList += ","+ shopIdx;
		});

		if(shopIdxList.charAt(0) === ',') shopIdxList = shopIdxList.slice(1); // 맨앞자리에 , 제거

		$.ajax({
			url      : "/m/mhomeIdea/selectShopLikeListAjax.do",
			data 	 : { shopIdxList : shopIdxList },
			type     : 'get',
			dataType : "json",
			cache    : false,
			async    : true,
			success  : function(result) {
				if(typeof result.shopLikeList !== "undefined" && result.shopLikeList.length > 0){
					for (var i = 0 ; i < result.shopLikeList.length ; i++) {
						var idx = result.shopLikeList[i].idx;

						var $myLikeElement;
						$myLikeElement = $("[id^='shopNode_"+idx+"']").find('.scrap');

						if(typeof result.shopLikeList[i].myLikeCnt !== "undefined" && result.shopLikeList[i].myLikeCnt == 1){
							$myLikeElement.addClass("on");
						} else {
							$myLikeElement.removeClass("on");
						}
					}
				}
			},
			error:function(request, status, error){
				console.log(error)
			}
		});

		*/
	}

};



/**
 * 전시 샘live 컴포넌트 관련 스크립트
 * @author 김대오
 * @since 2022.06.20
 */
const dispSamlive = {
	// 타업체광고에서 진입 시 utm쿠키 처리
	 samliveUtmInit: function () {
		let cookieName = "samLiveUtm"; // 샘라이브 utm쿠키명
		let samLiveUtmCookie = Common.getCookie(cookieName);
		let utmParam = dispSamlive.getUtmParam();
		// utm쿠키가 없고 utm파라미터가 존재할때만 utm쿠키 생성(30분)
		if(!samLiveUtmCookie && utmParam) {
			let date = new Date();
			date.setTime(date.getTime() + (1*60*60*1000)/2);
			document.cookie = cookieName + "=" + escape( utmParam ) + "; path=/; expires=" + date.toUTCString() + ";";
		}
	 }
	// 파라미터로 넘어온 utm파라미터만 추출
	, getUtmParam: function() {
		const utmList = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
		let utmParam = "";
		$.each(utmList, function(i,v){
			var val = Common.urlParam(v);
			if(val) {
				if(!utmParam) {
					utmParam = v + "=" + val;
				} else {
					utmParam = utmParam + "&" + v + "=" + val;
				}
			}
		});
		return utmParam;
	}
	// 방송 화면으로 이동(플레이어 화면으로 이동)
	, goLiveCommercePlayer : function(sauceflexPlayerUrl, broadcastId) {
		let playUrl = "";
		let accessToken = "";
		if (Common.cookieIsLogin()) {
			accessToken = Common.getLiveCommerceAccessToken();
		}

		let returnUrl = location.href;
		// 샘라이브 방송상세화면에서 X버튼을 눌러서 해당 페이지로 돌아온경우 뒤로가기시 메인으로 이동하기 위한 파라미터 셋팅
		if(location.href.indexOf("samLiveMain.do") > -1 || location.href.indexOf("liveScheduleList.do") > -1 || location.href.indexOf("liveVodList.do") > -1){
			returnUrl = location.protocol + "//" + location.host + location.pathname + "?sauceflexRefererYn=Y";
		}

		if (accessToken != "") {
			playUrl = sauceflexPlayerUrl + "/broadcast/" + broadcastId + "?accessToken=" + accessToken + "&returnUrl=" + encodeURIComponent(returnUrl);
		} else {
			playUrl = sauceflexPlayerUrl + "/broadcast/" + broadcastId + "?returnUrl=" + encodeURIComponent(returnUrl);
		}

		Common.setCookie("liveCommerceCookieReturnUrl", returnUrl, 1);
		location.href = playUrl;
	}

	// 방송 화면으로 이동(플레이어 화면으로 이동) - 이전 화면으로 돌아올 경우 현재 상태를 유지하기 위함
	, goLiveCommercePlayerHash: function(sauceflexPlayerUrl, broadcastId) {
		location.hash = "#"+ $(window).scrollTop() + "_"
			+ dispSamlive.V.paging.listCount + "_"
			+ dispSamlive.V.paging.totalRecordCount + "_"
			+ dispSamlive.V.paging.pageSize + "_"
			+ dispSamlive.V.grpCd
		;
		dispSamlive.goLiveCommercePlayer(sauceflexPlayerUrl, broadcastId);
	}

	// 방송상세화면 바로가기(위캔디오)
	, goShotTipDetail: function(mediaSeq) {
		location.href = "/m/msamLive/liveShortTipDetail.do?mediaSeq="+mediaSeq;
	}

	// 최상단 방송에 노출될 카운트 모드
	// case01 : 방송시작이 3시간 이상 남은경우 디데이 모드
	// case02 : 방송시작이 3시간 전인경우 타이머 모드
	// case03 : 방송 중 인경우
	// case04 : 방송 종료 인경우
	, eGetTime : function(eTimeObj, index, biginTimeVar, endTimeVar) {
		var endTime = biginTimeVar;
		var beginTimeStr = biginTimeVar.substring(0, 19);
		var endTimeStr = endTimeVar.substring(0, 19);

		var nowTime = dispConvertTime(disp_js_yyyy_mm_dd_hh_mm_ss_mi(), 1);
		dday = dispConvertTime(endTime, 1);
		days = (dday - nowTime) / 1000 / 60 / 60 / 24;
		daysRound = Math.floor(days);
		hours = (dday - nowTime) / 1000 / 60 / 60;
		hoursRound = Math.floor(hours);
		hoursRound = hoursRound - (daysRound * 24);
		minutes = (dday - nowTime) / 1000 / 60 - (24 * 60 * daysRound) - (60 * (Math.floor((dday - nowTime) / 1000 / 60 / 60 - (24 * daysRound))));
		minutesRound = Math.floor(minutes);
		seconds = (dday - nowTime) / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * (Math.floor((dday - nowTime) / 1000 / 60 / 60 - (24 * daysRound)))) - (60 * minutesRound);
		secondsRound = Math.round(seconds);

		nowTime.setMilliseconds(nowTime.getMilliseconds() + 80);
		miSeconds = nowTime.getMilliseconds();

		//3자리
		miSecondsRound = Math.round(miSeconds);

		//2자리
		miSecondsRound = Math.round(miSeconds / 10);

		var nowTimeStr = disp_js_yyyy_mm_dd_hh_mm_ss_mi().substring(0, 19);

		var beginTimeStr_YYYY = beginTimeStr.substring(0, 4);
		var beginTimeStr_MM = beginTimeStr.substring(5, 7);
		var beginTimeStr_DD = beginTimeStr.substring(8, 10);
		var beginTimeStr_HH = beginTimeStr.substring(11, 13);
		var beginTimeStr_MM = beginTimeStr.substring(14, 16);
		var beginTimeStr_SS = beginTimeStr.substring(17, 19);

		var nowTimeStr_YYYY = nowTimeStr.substring(0, 4);
		var nowTimeStr_MM = nowTimeStr.substring(5, 7);
		var nowTimeStr_DD = nowTimeStr.substring(8, 10);
		var nowTimeStr_HH = nowTimeStr.substring(11, 13);
		var nowTimeStr_MM = nowTimeStr.substring(14, 16);
		var nowTimeStr_SS = nowTimeStr.substring(17, 19);

		// IOS 웹뷰에서도 만족하는 new Date 형식 으로 변경 -> '2020/09/01 00:00:00'
		//var diffSeconds = (new Date(beginTimeStr) - new Date(nowTimeStr)) / 1000;
		var tempBeginTimeStr = beginTimeStr.substring(0, 4) + "/" + beginTimeStr.substring(5, 7) + "/" + beginTimeStr.substring(8, 10) + " " + beginTimeStr.substring(11, 13) + ":" + beginTimeStr.substring(14, 16) + ":" + beginTimeStr.substring(17, 19);
		var tempNowTimeStr = nowTimeStr.substring(0, 4) + "/" + nowTimeStr.substring(5, 7) + "/" + nowTimeStr.substring(8, 10) + " " + nowTimeStr.substring(11, 13) + ":" + nowTimeStr.substring(14, 16) + ":" + nowTimeStr.substring(17, 19);
		var diffSeconds = (new Date(tempBeginTimeStr) - new Date(tempNowTimeStr)) / 1000;


		var countingSec = 10800; // 3시간의 초단위
		/*
		console.log("nowTimeStr : " + nowTimeStr);
		console.log("beginTimeStr : " + beginTimeStr);
		console.log("endTimeStr : " + endTimeStr);
		console.log("diffSeconds : " + diffSeconds);
		console.log("countingSec : " + countingSec);
		*/

		if(diffSeconds > countingSec) { // 초단위로 계산된 값이 3시간 이상 남은경우 (D-Day 모드)
			//console.log("D-Day 모드");
			$(".countdownMode-"+index).hide();
			$(".onairMode-"+index).hide();
			$(".ddayMode-"+index).show();
			$(".ddayMode-"+index+" .date .month").html( parseInt(beginTimeStr.substring(5, 7)) );		//01월 -> 1월로 표시하기 위한 파싱
			$(".ddayMode-"+index+" .date .day").html( parseInt(beginTimeStr.substring(8, 10)) );		//05일 -> 5일로 표시하기 위한 파싱
			$(".ddayMode-"+index+" .time .hour").html( beginTimeStr.substring(11, 13) );
			$(".ddayMode-"+index+" .time .minute").html( beginTimeStr.substring(14, 16) );
			// 3시간 이상일 경우는 속도 문제를 감안하여 30분 단위로 갱신
			let interval = 1000 * 10 * 60 * 3;
			newtime = window.setTimeout(function() { dispSamlive.eGetTime(eTimeObj, index, biginTimeVar, endTimeStr); }, interval);

		} else if (diffSeconds <= countingSec && nowTimeStr < beginTimeStr) { // 카운팅 모드
			//console.log("카운팅 모드");
			$(".ddayMode-"+index).hide();
			$(".onairMode-"+index).hide();
			$(".countdownMode-"+index).show();

			var h = parseInt(hoursRound, 10).toString();
			var hourStr = "";
			if (parseInt(hoursRound, 10) > 9) {
				hourStr += dispTimerFnNumber(h.substring(0, 1));
				hourStr += dispTimerFnNumber(h.substring(1, 2));
			} else {
				hourStr += dispTimerFnNumber(0);
				hourStr += dispTimerFnNumber(h);
			}
			$("#etimer-hour-"+index).html(hourStr);

			var m = parseInt(minutesRound, 10).toString();
			var minStr = "";
			if (parseInt(minutesRound, 10) > 9) {
				minStr += dispTimerFnNumber(m.substring(0, 1));
				minStr += dispTimerFnNumber(m.substring(1, 2));
			} else {
				minStr += dispTimerFnNumber(0);
				minStr += dispTimerFnNumber(m);
			}
			$("#etimer-minute-"+index).html(minStr);

			var s = parseInt(secondsRound, 10).toString();
			var secStr = "";
			if (parseInt(secondsRound, 10) > 9) {
				secStr += dispTimerFnNumber(s.substring(0, 1));
				secStr += dispTimerFnNumber(s.substring(1, 2));
			} else {
				secStr += dispTimerFnNumber(0);
				secStr += dispTimerFnNumber(s);
			}
			$("#etimer-sec-"+index).html(secStr);

			// url 자동이동처리 Y값 달고 왔을 때만 자동이동처리
			var autoplay = Common.urlParam("autoplay");
			autoplay = autoplay ? autoplay.toUpperCase() : "";
			if(autoplay == "Y") {
				// 방송중 모드에서 샘라이브 방송url로 자동이동처리
				var broadcastId = $('#broadcastId-' + index).val();
				var sauceflexPlayerUrl = $('#sauceflexPlayerUrl-' + index).val();
				var countingSec = 600; // 10분의 초단위
				if (diffSeconds <= countingSec) { // 방송시작시간이 10분전 이내인경우 방송화면 자동이동처리
					// 최초한번만 자동이동 처리 => 자동이동된 쿠키가 없을때만 실행
					var cookieCheckTime = Common.getCookie("samLiveAutoMove_" + broadcastId);
					if (cookieCheckTime == "") {
						// 샘라이브 방송url로 자동이동처리
						setTimeout(function () {
							dispSamlive.autoGoLiveCommerce(sauceflexPlayerUrl, broadcastId);
						}, dispSamlive.V.autoMoveSetTimeout); // 수초뒤 방송화면으로 자동이동
					}
				}
			}

			newtime = window.setTimeout(function() { dispSamlive.eGetTime(eTimeObj, index, biginTimeVar, endTimeStr); }, 1000);

		} else if (nowTimeStr >= beginTimeStr && nowTimeStr < endTimeStr) { // 방송중 모드
			//console.log("방송중 모드");
			$(".countdownMode-"+index).hide();
			$(".ddayMode-"+index).hide();
			$(".onairMode-"+index).show();
			$(".onair-div-"+index).show();
			$('#onairModeText-'+index).text('지금 방송중');

			// url 자동이동처리 Y값 달고 왔을 때만 자동이동처리
			var autoplay = Common.urlParam("autoplay");
			autoplay = autoplay ? autoplay.toUpperCase() : "";
			if(autoplay == "Y") {
				// 방송중 모드에서 샘라이브 방송url로 자동이동처리(커머스)
				var broadcastId = $('#broadcastId-' + index).val();
				var sauceflexPlayerUrl = $('#sauceflexPlayerUrl-' + index).val();
				var cookieCheckTime = Common.getCookie("samLiveAutoMove_" + broadcastId);
				if (cookieCheckTime == "") {
					setTimeout(function () {
						dispSamlive.autoGoLiveCommerce(sauceflexPlayerUrl, broadcastId);
					}, dispSamlive.V.autoMoveSetTimeout); // 수초뒤 방송화면으로 자동이동
				} else {
					newtime = window.setTimeout(function () {
						dispSamlive.eGetTime(eTimeObj, index, biginTimeVar, endTimeStr);
					}, 1000);
				}
			}
		} else if(nowTimeStr >= endTimeStr){ // 방송종료 모드
			//console.log("방송종료 모드");
			$(".countdownMode-"+index).hide();
			$(".ddayMode-"+index).hide();
			$(".onairMode-"+index).show();
			$(".onair-div-"+index).hide();
			$('#onairModeText-'+index).text('방송 종료');
		}  else { // 실행안되야 정상인 부분
			console.log("else > " + diffSeconds);
			//newtime = window.setTimeout(function() { dispSamlive.eGetTime(eTimeObj, index, biginTimeVar, endTimeStr); }, 1000);
		}
	}

	// 샘라이브 방송url 자동이동 처리
	, autoGoLiveCommerce(sauceflexPlayerUrl, broadcastId) {
		Common.setCookie("samLiveAutoMove_"+broadcastId, "Y" , 1);
		dispSamlive.goLiveCommercePlayer(sauceflexPlayerUrl, broadcastId);
	}

	// 공통변수
	, V: {
		paging : {
			 currentPageNo: 1
			,recordCountPerPage: 10
			,totalRecordCount: 0
			,rowCount: 10
			,listCount: 1
			,pageSize: 0
		}
		,ajaxUrl: "" // 조회할 ajaxUrl
		,isBack: "N"
		,initScrollTop: 0
		,isListLoading: false
		,hasListData: false
		,hashSearchYn: "N"
		,searchType: "" // 검색타입(schedule:편성표, shorttip:숏팁, vod:지난영상)
		,grpCd: "" // 카테고리
		,autoMoveSetTimeout : 300 // 자동이동 되기전 대기시간 : 0.3초
	}

	// 변수값 초기화
	, resetVariable: function() {
		dispSamlive.V.paging.currentPageNo = 1;
		dispSamlive.V.paging.recordCountPerPage = 10;
		dispSamlive.V.paging.totalRecordCount = 0;
		dispSamlive.V.paging.rowCount = 10;
		dispSamlive.V.paging.listCount = 1;
		dispSamlive.V.paging.pageSize = 0;

		dispSamlive.V.isBack = "N";
		dispSamlive.V.initScrollTop = 0;
		dispSamlive.V.isListLoading = false;
		dispSamlive.V.hasListData = false;
		dispSamlive.V.hashSearchYn = "N";
		dispSamlive.V.grpCd = "";
	}

	// 페이징이 필요한 컴포넌트 로딩시 스크롤 페이징 이벤트 등록
	, addScrollPagingEvent: function() {
		$(window).bind("scroll",function() {
			try{
				let isBottom = $(".mall-footer").height() ? $(".mall-footer").outerHeight():0;
				if($(window).scrollTop() + $(window).height() + isBottom >= $("body").height() - addBottomHeight){
					if (dispSamlive.V.isBack == "N" && dispSamlive.V.hasListData && ! dispSamlive.V.isListLoading) {
						let page = Number(dispSamlive.V.paging.currentPageNo) + 1;
						dispSamlive.V.paging.currentPageNo = page;
						dispSamlive.V.paging.listCount = page;
						if(page <= dispSamlive.V.paging.pageSize){
							dispSamlive.getList();
						} else {
							console.log("더이상 게시물이 없습니다.");
						}
					}
				}
			}catch(e){}
		});
	}

	// 편성표, 숏팁, 지난방송보기 목록 조회
	, getList: function() {
		dispSamlive.V.isListLoading = true;
		$("#js-loading").show();

		let param = {
			 currentPageNo: dispSamlive.V.paging.currentPageNo
			,recordCountPerPage: dispSamlive.V.paging.recordCountPerPage
			,totalRecordCount: dispSamlive.V.paging.totalRecordCount
			,searchType: dispSamlive.V.searchType
			,hashSearchYn: dispSamlive.V.hashSearchYn
			,grpCd: dispSamlive.V.grpCd
		}

		$.ajax({
			url      : dispSamlive.V.ajaxUrl,
			type     : 'post',
			data	 : param,
			dataType : 'html',
			cache    : false,
			async    : true,
			error:function(request, status, error){
				console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				$("#js-loading").hide();
			},
			success : function(html) {
				dispSamlive.V.isListLoading = false;
				$("#tvMedeaListDiv").append(html).find("img").on('load', function(){
					$("#js-loading").hide();
					if (dispSamlive.V.isBack == "Y") {
						dispSamlive.V.paging.currentPageNo = dispSamlive.V.paging.listCount;
						dispSamlive.V.paging.recordCountPerPage = dispSamlive.V.paging.rowCount;// 해쉬된 목록 만큼 자동조회 후 초기화
						dispSamlive.V.isBack = "N";
						dispSamlive.V.hashSearchYn = "N";
						setTimeout(function(){
							$(window).scrollTop(dispSamlive.V.initScrollTop);
						},0);
					}
				});
			}
		});
	}

	// 해쉬값 세팅
	, setTvHashParam: function() {
		let HashLocationName = document.location.hash;
		HashLocationName = HashLocationName.replace('#','');
		let hashArr = HashLocationName.split("_");
		dispSamlive.V.initScrollTop = hashArr[0]; // Top Position
		dispSamlive.V.paging.listCount = hashArr[1]; // Page
		let totalRecordCount = hashArr[2]; //목록 총 건수
		let pageSize = hashArr[3]; // 총 페이지 수
		let grpCd = hashArr[4]; // 카테고리

		dispSamlive.V.isBack = "Y";
		dispSamlive.V.hashSearchYn = "Y";
		dispSamlive.V.paging.recordCountPerPage = dispSamlive.V.paging.rowCount * Number(dispSamlive.V.paging.listCount);
		dispSamlive.V.paging.currentPageNo = "1";
		dispSamlive.V.paging.totalRecordCount = totalRecordCount;
		dispSamlive.V.paging.pageSize = pageSize;
		dispSamlive.V.grpCd = grpCd;
		//window.location.hash = "";	// Hash값 초기화
		history.replaceState("", document.title, window.location.pathname + window.location.search);

		// 숏팁목록일 경우 카테고리 선택
		if(grpCd && $("#shotTipCategoryUl").length > 0) {
			$.each($("#shotTipCategoryUl li"), function(k,v){
				if(grpCd == $(v).data("grp-cd")) {
					$(v).addClass("on");
				} else {
					$(v).removeClass("on");
				}
			});
		}

		dispSamlive.getList();
	}

	// html gen 화면에서 데이터 갱신필요 (알림받기 여부, 뷰 카운트를 갱신)
	, setSamLiveNotiDetailCntAjax: function(){
		if($("[id^='samLiveNode_']").length == 0) return;  // main.html

		let mediaSeqList = [];
		$("[id^='samLiveNode_']").each(function(){
			var mediaSeq = $(this).attr("id").split("_")[1];
			if(mediaSeq) {
				mediaSeqList.push(mediaSeq);
			}
		});

		if(mediaSeqList.length == 0) { return; }

		$.ajax({
			url      : "/m/msamLive/selectSamLiveNotiDetailCntAjax.do?mediaSeqList="+mediaSeqList.join(","),
			type     : 'get',
			dataType : "json",
			async    : true,
			error:function(request, status, error){
				console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			},
			success  : function(result) {
				if(typeof result.samLiveNotiList !== "undefined" && result.samLiveNotiList.length > 0) {

					for (var i = 0 ; i < result.samLiveNotiList.length ; i++) {
						var mediaSeq = result.samLiveNotiList[i].mediaSeq;
						var myNotiYn = result.samLiveNotiList[i].myNotiYn;
						var viewCnt = result.samLiveNotiList[i].viewCnt;

						var $notiElement, $viewElement;
						$notiElement = $("[id^='samLiveNode_"+mediaSeq+"']").find('.notify');
						$viewElement = $("[id^='samLiveNode_"+mediaSeq+"']").find('.prd-opt-view');

						if($notiElement.length > 0) {
							if(myNotiYn == "Y") {
								$notiElement.addClass("off");
								$notiElement.text("받기완료")
								$notiElement.attr("onclick", "javascript:void(0);");
							} else {
								$notiElement.removeClass("off");
								$notiElement.text("알림받기")
							}
						}

						if($viewElement.length > 0) {
							$viewElement.text( Common.GetNumberFormat(viewCnt) );
						}

						//console.log($notiElement, $viewElement);
					}
				}
			}
		});
	}
};