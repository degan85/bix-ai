# 레이아웃

<BIX5>
	<DataGrid headerColors="[#dfdfdf,#dfdfdf]" color="#545045" alternatingItemColors="[#ffffff,#f0f0f0]" backgroundColor="transparent" _cType="DataGrid" headerStyleName="wAA8F237848F4D8995A0A040FFC396AB3_HeaderStyle" paddingTop="5" paddingBottom="5" headerPaddingTop="2" headerPaddingBottom="2" fontSize="11" selectionMode="none" fontFamily="KBFGTextM" headerHeight="28" headerBorderBottomColor="rgba(199,199,199,1)" headerBorderTopWidth="0" headerBorderTopColor="transparent" borderWidth="0" selectionColor="#fff3c8" rollOverColor="#fff3c8" verticalGridLineColor="transparent" horizontalGridLineColor="rgba(221,221,221,1)" horizontalGridLineStyle="none" headerSeparatorColor="transparent" headerBorderBottomWidth="2" verticalScrollPolicy="auto" verticalAlign="middle" sortableColumns="false" sortExpertMode="true" rowHeight="24" verticalGridLineStyle="none" headerRollOverColor="#d2d2d2">
		<columns>
			<DataGridColumn dataField="순위" headerText="순위" textAlign="center" id="순위" itemRenderer="HtmlItem" labelJsFunction="@widget.labelJsFunctionRank" width="36"/>
			<DataGridColumn dataField="본부" headerText="본부" textAlign="center" id="본부" itemRenderer="HtmlItem" labelJsFunction="@widget.labelJsFunctionAni" width="69"/>
			<DataGridColumn dataField="지점" headerText="지점" id="지점" textAlign="center" itemRenderer="HtmlItem" labelJsFunction="@widget.labelJsFunctionAni" width="36"/>
			<DataGridColumn dataField="CMIP" headerText="CMIP" textAlign="right" id="CMIP" itemRenderer="HtmlItem" labelJsFunction="@widget.labelJsFunctionAni"/>
		</columns>
	</DataGrid>
	<NumberFormatter precision="0" id="정수(#,##0)"/>
	<NumberFormatter precision="1" id="소수점 1자리(#,##0.0)"/>
	<NumberFormatter precision="2" id="소수점 2자리(#,##0.00)"/>
	<NumberFormatter precision="3" id="소수점 3자리(#,##0.000)"/>
	<DateFormatter formatString="YYYY-MM-DD" id="날짜(년-월-일)"/>
	<DateFormatter formatString="YYYY/MM/DD" id="날짜(년/월/일)"/>
	<DateFormatter formatString="MM/DD" id="날짜(월/일)"/>
	<CurrencyFormatter id="통화(원)" alignSymbol="right" currencySymbol="원"/>
	<CurrencyFormatter id="통화(￦)" alignSymbol="left" currencySymbol="￦"/>
	<CurrencyFormatter id="통화($)" alignSymbol="left" currencySymbol="$"/>
	<PercentFormatter id="퍼센트(%)" multiplyHundred="true"/>
	<SpanRowAttribute id="@합계 스타일" styleName="wB7CDB06C80A06F26193DD1B58309C6B9_TotalStyle" backgroundColor="#eeeeee"/>
</BIX5>

<style>
	#{{id}} .txtAni { 
		/*	animation: blink-effect{{id}} 1.5s infinite;*/
	}
	#{{id}} .rankImg img {
		width: 100%;
		height: 100%; 
		object-fit: contain;
	}
	@keyframes blink-effect{{id}} {

		50% {
			opacity: 0;
		}
	}
</style>

# 스크립트

<script>
	/**
	* component를 사용할 준비가 되면 호출합니다.
	*/
	widget.componentReadyHandler = function(componentId){

	}

	widget.setAggregateCompleteHandler(function(payload){
		var newData = JSON.parse(JSON.stringify(payload));

		newData.forEach((item, index) => {
			item.순위 = index + 1;
		})

		return newData;
	});


	/**
	* 데이터 변형 사용자 정의 함수를 등록합니다.
	* 콜백함수에 인자로 topic, payload가 전달됩니다.
	* payload: 수신된 데이터. 해당 값은 참조된 값이기 때문에 유의하여 사용 바랍니다.
	*/
	widget.setTransformSourceHandler(function(topic, payload){
		return payload;
	});

	widget.labelJsFunctionAni = function(item, value, column){
		if(item.순위 == 1){
			if (typeof value === 'number') {
				return '<div class="txtAni" style=" height:16px;">' + Math.floor(value).toLocaleString('ko-KR') + '</div>';
			}else{
				return '<div class="txtAni" style=" height:16px;">' + value + '</div>';
			}
		}else{
			if (typeof value === 'number') {
				return Math.floor(value).toLocaleString('ko-KR');
			}else{
				return value
			}
		}
	}

	widget.labelJsFunctionRank = function(item, value, column){
		if(item.순위 == 1){
			return '<div class="rankImg txtAni" style="width:100%; height:16px; ">'+'<img src="/images/432ef4e1382a450ab68be7b8cea109df">'+'</div>';
		}else if(item.순위 == 2){
			return '<div class="rankImg " style="width:100%; height:16px;">'+'<img src="/images/49c584fe2b9f4099852f8f89c77ba011">'+'</div>';
		}else if(item.순위 == 3){
			return '<div class="rankImg " style="width:100%; height:16px;">'+'<img src="/images/4a91e955f66e59629fdf88c2bd0c853b">'+'</div>';
		}else{
			return '<div class="" style="width:100%; height:16px;">'+ value +'</div>';
		}
	}
	/**
	* component가 삭제되기 전 호출됩니다.
	*/
	widget.componentRemoveHandler = function(){

	}
</script>

# 컴포넌트 옵션

{
"customStyle": false,
"propertyOptions": [],
"layoutMetaData": {},
"isMultiView": false,
"multiViewRow": 2,
"multiViewColumn": 2,
"multiViewSubCategoryField": {},
"multiViewFillType": null,
"marginLeft": 0,
"marginTop": 0,
"marginRight": 0,
"marginBottom": 0,
"isAutoServiceStart": true,
"dedicated": true,
"isDataLimit": true,
"dataLimit": 10,
"referenceResources": [],
"defaultFontSize": 16,
"useDataTransform": false,
"dataTransform": {
"transpose": {
"index": [],
"columns": [],
"values": [],
"valueName": ""
}
},
"userFields": [],
"tabIndex": -1,
"overflow": "hidden",
"showInteractiveFilteringMenu": true,
"bindingSource": "474bb54cf947fe1990abae99563b6370",
"referenceSources": [
{
"type": "image",
"id": "432ef4e1382a450ab68be7b8cea109df",
"label": "1위아이콘"
},
{
"type": "image",
"id": "49c584fe2b9f4099852f8f89c77ba011",
"label": "2위아이콘"
},
{
"type": "image",
"id": "4a91e955f66e59629fdf88c2bd0c853b",
"label": "3위아이콘"
}
],
"hierarchicalField": "",
"interactiveFiltering": false,
"dynamicFiltering": true,
"filterField": "지점",
"headerStyle": {
"font-weight": "bold",
"color": "#545045",
"font-style": "normal",
"font-size": "11px"
},
"totalStyle": {
"font-weight": "bold",
"color": "#333333"
},
"subtotalStyle": {
"font-weight": "bold",
"color": "#333333"
},
"showExportXlsx": true
}
