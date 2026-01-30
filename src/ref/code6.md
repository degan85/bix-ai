# 레이아웃 1

<BIX5 backgroundColor="transparent" alpha="1" fontSize="15" padding="10" _ver="2" fontFamily="KBFGTextM">
	<Options>
		<Caption text="" color="#333333" textAlign="center" fontSize="15" fontFamily="NanumGothic" fontWeight="normal" paddingLeft="0" paddingRight="0" paddingTop="0" paddingBottom="5" backgroundColor="transparent" height="1"/>
		<SubCaption text="" height="1" color="#999999" textAlign="center" fontSize="13" fontFamily="" fontWeight="normal" paddingLeft="0" paddingRight="0" paddingTop="0" paddingBottom="0" backgroundColor="transparent"/>
		<Legend position="top" display="none" backgroundColor="#ffffff" borderStyle="none" hAlign="right" vAlign="middle" color="#545045" useVisibleCheck="true" paddingLeft="10" paddingRight="10" paddingTop="7" paddingBottom="7" borderRadius="8" width="0" height="0"/>
	</Options>
	<UnitFormatter id="unitfmt" useThousandsSeparator="true" units="" unitSymbols="[,K,M,G,T]" divisor="1000" rounding="none"/>
	<DateFormatter id="dateFmt" formatString="YYYY/MM/DD"/>
	<SeriesInterpolate id="si"/>
	<SeriesSlide id="ss" direction="right"/>
	<Combination2DChart showDataTips="true" _cType="Combination2DChart" canDropSeriesLabels="false" dataTipDisplayMode="axis" gutterLeft="1" gutterRight="1" gutterTop="1" gutterBottom="1" dataTipJsFunction="@widget.dataTipJsFunc">
		<horizontalAxis>
			<CategoryAxis id="hAxis" categoryField="제휴사" formatter=""/>
		</horizontalAxis>
		<verticalAxis>
			<LinearAxis id="vAxis" formatter="{unitfmt}" minimum="NaN" maximum="NaN" interval="NaN"/>
		</verticalAxis>
		<series>
			<Column2DSet type="overlaid" columnWidthRatio="NaN">
				<series>
					<VTarget2DResultSeries id="{{meta.result}}" yField="{{meta.result}}" formatter="{unitfmt}" displayName="{{meta.result}}" labelPosition="outside" showDataEffect="{si}" color="#333333" columnWidthRatio="0.35" outsideLabelJsFunction="@widget.outsideLabelFunc">
						<fills>
							<SolidColor color="#ffbc00" alpha="1"/>
						</fills>
					</VTarget2DResultSeries>
					<VTarget2DGoalSeries id="{{meta.goal}}" itemRenderer="BoxItemRenderer" formatter="{unitfmt}" yField="{{meta.goal}}" displayName="{{meta.goal}}" labelPosition="none" showDataEffect="{si}" color="#756d63" outsideLabelJsFunction="@widget.outsideLabelFunc2" interactive="false">
						<stroke>
							<Stroke color="#bab19d" weight="2" alpha="1"/>
						</stroke>
						<fills>
							<SolidColor color="#bab19d" alpha="0.2"/>
						</fills>
					</VTarget2DGoalSeries>
				</series>
			</Column2DSet>
		</series>
		<horizontalAxisRenderers>
			<Axis2DRenderer axis="{hAxis}" showLine="true" color="#d3d3d3" placement="left" fontSize="15">
				<axisStroke>
					<Stroke color="#dfdfdf" alpha="0"/>
				</axisStroke>
			</Axis2DRenderer>
		</horizontalAxisRenderers>
		<verticalAxisRenderers>
			<Axis2DRenderer axis="{vAxis}" showLine="true" placement="left" color="#777777">
				<axisStroke>
					<Stroke color="#eeeeee" alpha="0"/>
				</axisStroke>
			</Axis2DRenderer>
		</verticalAxisRenderers>
		<backgroundElements>
			<GridLines direction="horizontal" showBorderStroke="false">
				<horizontalStroke>
					<Stroke color="#e8e0cf" alpha="1" weight="1"/>
				</horizontalStroke>
				<verticalStroke>
					<Stroke color="#e8e0cf" alpha="1" weight="1"/>
				</verticalStroke>
				<borderStroke>
					<Stroke color="#eeeeee" alpha="1" weight="1"/>
				</borderStroke>
			</GridLines>
		</backgroundElements>
	</Combination2DChart>
</BIX5>

# 스크립트 1

<script>
	/**
		* component를 사용할 준비가 되면 호출합니다.
		*/
	widget.componentReadyHandler = function(componentId){
		widget.setLayoutMetaData({goal:"목표CMIP",result:"당월CMIP"});
		widget.getSlide().addEventListener("CMIPbtnClick", widget.CMIPbtnClickHandler);
	}

	widget.outsideLabelFunc = function(seriesId, index, data, values){
		if(seriesId == '진행율') return `${values[1]}%`;
		return (values[1] == null || values[1] === '') ? '' : values[1].toLocaleString();
	}

	widget.outsideLabelFunc2 = function(seriesId, index, data, values){
		if(seriesId == '계획률') return "";
		return (values[1] == null || values[1] === '') ? '' : values[1].toLocaleString();
	}

	widget.CMIPbtnClickHandler = function(e){
		if(e?.detail?.value == 'CMIP')
			widget.setLayoutMetaData({goal:"목표CMIP",result:"당월CMIP"});
		else
			widget.setLayoutMetaData({goal:"계획률",result:"진행율"});
	}

	widget.dataTipJsFunc = function(seriesId, seriesName, index, xName, yName, data, values){
		return values[0]+"<br>누적건수 : "+ ((data.당월건수 == null || data.당월건수 === '') ? '' : data.당월건수).toLocaleString();
	}

	/**
		* 데이터 변형 사용자 정의 함수를 등록합니다.
		* 콜백함수에 인자로 topic, payload가 전달됩니다.
		* payload: 수신된 데이터. 해당 값은 참조된 값이기 때문에 유의하여 사용 바랍니다.
		*/
	widget.setTransformSourceHandler(function(topic, payload){
		return payload;
	});

	/**
		* component가 삭제되기 전 호출됩니다.
		*/
	widget.componentRemoveHandler = function(){
		widget.getSlide().removeEventListener("CMIPbtnClick", widget.CMIPbtnClickHandler);
	}
</script>

# 컴포넌트 옵션 1

{
"customStyle": true,
"propertyOptions": [],
"layoutMetaData": {
"goal": "목표CMIP",
"result": "당월CMIP"
},
"isMultiView": false,
"multiViewRow": 2,
"multiViewColumn": 2,
"multiViewSubCategoryField": {},
"multiViewFillType": null,
"marginLeft": 15,
"marginTop": 0,
"marginRight": 15,
"marginBottom": 20,
"isAutoServiceStart": false,
"dedicated": false,
"isDataLimit": true,
"dataLimit": 10000,
"referenceResources": [
{
"id": "4f4aa2fe87cc219ba2a13984565fbdb4",
"label": "seo.png",
"type": "image",
"using": "background"
}
],
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
"vars": "",
"componentLayoutId": "Target_vs_Actual-Linear_2D_Color",
"bindingSource": "4c4695ce64b2891e84b40f8cf4c7a146",
"referenceSources": [],
"interactiveFiltering": false,
"dynamicFiltering": true,
"filterField": "제휴사",
"interactiveFilteringAxis": true
}

# 레이아웃 2

<style>
	#{{id}} .tabBtnWrap {
		color: #000;
		font-family: notoSans; 
		height: 100%;
		display:flex;
		align-items:end;
		justify-content:end;
	}
	#{{id}} .tabBtnWrap .tabBtn {
		border: 0;
		border-radius: {{meta.borderRadius}}px {{meta.borderRadius}}px 0 0; 
		background-color: {{meta.btnBgColor}}; 
		height: 90%;
		padding:{{meta.paddingTp}}px {{meta.paddingRg}}px {{meta.paddingBt}}px {{meta.paddingLf}}px;
		font-family: {{meta.font.fontFamily}};
		font-size: {{meta.font.fontSize}}px;
		text-align: {{meta.font.textAlign}};
		font-weight: {{meta.font.fontWeight}};
		color: {{meta.font.color}};
		vertical-align: {{meta.font.verticalAlign}};
		letter-spacing: {{meta.font.letterSpacing}}px;
		line-height: {{meta.font.lineHeight}};
		font-style: {{meta.font.fontStyle}};
		text-decoration: {{meta.font.textDeco}};
		margin-right:{{meta.distance}}px;
	}
	#{{id}} .tabBtnWrap .tabBtn:hover{
		color: {{meta.hoverColor}};
	}
	#{{id}} .tabBtnWrap .tabBtn.active{
		background-color: {{meta.activeBgColor}};
		color: {{meta.activeColor}};
		/*	box-shadow: rgb(199, 201, 205) 7px 7px 10px 0px, rgb(255, 255, 255) -7px -7px 10px 0px;*/
	}
</style>

<div class="tabBtnWrap">
	<button class="tabBtn active" onclick="@widget.clickEvent(0,this)">CMIP</button>
	<button class="tabBtn" onclick="@widget.clickEvent(1,this)">달성률</button>
</div>

# 스크립트 2

<script>
	/**
	* component를 사용할 준비가 되면 호출합니다.
	*/

	widget.componentReadyHandler = function(componentId){
	}

	widget.clickEvent = function(index, t){
		$(widget.querySelector(".tabBtn.active")).removeClass("active");
		$(t).addClass("active");

		var event = BIX5.dashboard.createEvent('CMIPbtnClick', false, false, {value:$(t).text()});
		widget.getSlide().dispatchEvent(event);
	}
	/**
	* 데이터 변형 사용자 정의 함수를 등록합니다.
	* 콜백함수에 인자로 topic, payload가 전달됩니다.
	* payload: 수신된 데이터. 해당 값은 참조된 값이기 때문에 유의하여 사용 바랍니다.
	*/
	/**
	widget.setTransformSourceHandler(function(topic, payload){
		return payload;
	});
	*/

	/**
	* component가 삭제되기 전 호출됩니다.
	*/
	widget.componentRemoveHandler = function(){


	}
</script>

# 컴포넌트 옵션 2

{
"customStyle": true,
"propertyOptions": [
{
"label": "폰트 설정",
"control": "FontController",
"attribute": "font",
"tools": [
"fontFamily",
"fontSize",
"color",
"textAlign",
"fontWeight",
"fontStyle",
"underline",
"lineThrough",
"letterSpacing",
"lineHeight"
]
},
{
"label": "버튼 배경 색상",
"control": "ColorSelector",
"attribute": "btnBgColor"
},
{
"label": "배경 둥글기",
"control": "NumericStepper",
"minimum": 0,
"maximum": 300,
"stepSize": 1,
"attribute": "borderRadius"
},
{
"label": "패딩(위)",
"control": "NumericStepper",
"minimum": 0,
"maximum": 300,
"stepSize": 1,
"attribute": "paddingTp"
},
{
"label": "패딩(오른쪽)",
"control": "NumericStepper",
"minimum": 0,
"maximum": 300,
"stepSize": 1,
"attribute": "paddingRg"
},
{
"label": "패딩(아래)",
"control": "NumericStepper",
"minimum": 0,
"maximum": 300,
"stepSize": 1,
"attribute": "paddingBt"
},
{
"label": "패딩(왼쪽)",
"control": "NumericStepper",
"minimum": 0,
"maximum": 300,
"stepSize": 1,
"attribute": "paddingLf"
},
{
"label": "사이 간격",
"control": "NumericStepper",
"minimum": 0,
"maximum": 300,
"stepSize": 1,
"attribute": "distance"
},
{
"label": "마우스 오버 폰트 색상",
"control": "ColorSelector",
"attribute": "hoverColor"
},
{
"label": "활성화 버튼 배경 색상",
"control": "ColorSelector",
"attribute": "activeBgColor"
},
{
"label": "활성화 버튼 폰트 색상",
"control": "ColorSelector",
"attribute": "activeColor"
}
],
"layoutMetaData": {
"font": {
"fontFamily": "KBFGDisplayM",
"fontSize": 16,
"color": "#808183",
"textAlign": "right",
"verticalAlign": "top",
"fontWeight": "normal",
"fontStyle": "normal",
"textDeco": "none",
"letterSpacing": 0,
"lineHeight": 1.5,
"isGradient": false,
"backgroundImage": "none"
},
"btnBgColor": "rgba(245,241,228,1)",
"borderRadius": 5,
"hoverColor": "rgba(110,111,113,1)",
"activeBgColor": "rgba(96,88,76,1)",
"activeColor": "rgba(246,246,246,1)",
"paddingTp": 0,
"paddingRg": 20,
"paddingBt": 0,
"paddingLf": 20,
"distance": 7
},
"isMultiView": false,
"multiViewRow": 2,
"multiViewColumn": 2,
"multiViewSubCategoryField": {},
"multiViewFillType": null,
"marginLeft": 10,
"marginTop": 0,
"marginRight": 0,
"marginBottom": 0,
"isAutoServiceStart": true,
"dedicated": false,
"isDataLimit": false,
"dataLimit": 10000,
"referenceResources": [],
"defaultFontSize": 16,
"useDataTransform": false,
"dataTransform": {
"transpose": {
"index": [],
"columns": [],
"values": [],
"valueName": null
}
},
"userFields": [],
"tabIndex": -1,
"overflow": "hidden",
"showInteractiveFilteringMenu": false,
"bindingSource": "",
"referenceSources": [],
"classList": [],
"interactiveFiltering": false,
"dynamicFiltering": true
}
