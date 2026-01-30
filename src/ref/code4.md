# 레이아웃

<BIX5 backgroundColor="transparent" alpha="1" fontSize="13" fontFamily="KBFGTextM">
	<Options>
		<Caption text="" height="1" color="#333333" textAlign="center" fontSize="15" fontFamily="NanumGothic" fontWeight="normal" paddingLeft="0" paddingRight="0" paddingTop="0" paddingBottom="5" backgroundColor="transparent"/>
		<SubCaption text="" height="1" color="#999999" textAlign="center" fontSize="13" fontFamily="" fontWeight="normal" paddingLeft="0" paddingRight="0" paddingTop="0" paddingBottom="0" backgroundColor="transparent"/>
		<Legend position="bottom" display="none" backgroundColor="transparent" borderStyle="none" hAlign="center" width="0" height="0"/>
	</Options>
	<UnitFormatter id="unitfmt" useThousandsSeparator="true" units="" unitSymbols="[,K,M,G,T]" divisor="1000" rounding="nearest"/>
	<DateFormatter id="dateFmt" formatString="YYYY/MM/DD"/>
	<SeriesInterpolate id="si"/>
	<SeriesSlide id="ss" direction="right"/>
	<Bar2DChart showDataTips="true" barWidthRatio="0.7" barWidthMinRatio="1" _cType="Bar2DChart" gutterTop="1" gutterBottom="1" gutterLeft="NaN" gutterRight="NaN">
		<horizontalAxis>
			<LinearAxis id="hAxis" formatter="{unitfmt}" minimum="NaN" maximum="NaN" interval="NaN"/>
		</horizontalAxis>
		<verticalAxis>
			<CategoryAxis id="vAxis" categoryField="분류" formatter=""/>
		</verticalAxis>
		<series>
			<Bar2DSet type="clustered">
				<series>
					<Bar2DSeries id="CMIP" itemRenderer="SemiCircleBarItemRenderer" labelPosition="outside" xField="CMIP" displayName="CMIP" showDataEffect="{si}" color="#333333" _nodeName="Bar2DSeries" formatter="{unitfmt}">
						<fills>
							<LinearGradient angle="0">
								<entries>
									<GradientEntry ratio="1" color="#ffa133"/>
									<GradientEntry ratio="0" color="#ffc820" alpha="0.5"/>
								</entries>
							</LinearGradient>
						</fills>
					</Bar2DSeries>
				</series>
			</Bar2DSet>
		</series>
		<horizontalAxisRenderers>
			<Axis2DRenderer axis="{hAxis}" showLine="true" color="#333333" placement="left">
				<axisStroke>
					<Stroke color="#eeeeee" alpha="1"/>
				</axisStroke>
			</Axis2DRenderer>
		</horizontalAxisRenderers>
		<verticalAxisRenderers>
			<Axis2DRenderer axis="{vAxis}" showLine="true" placement="left" color="#333333" canDropLabels="false" textAlign="right">
				<axisStroke>
					<Stroke color="#eeeeee" alpha="1"/>
				</axisStroke>
			</Axis2DRenderer>
		</verticalAxisRenderers>
		<backgroundElements>
			<GridLines direction="vertical" showBorderStroke="false">
				<horizontalStroke>
					<Stroke color="#d8d8d8" alpha="0" weight="1"/>
				</horizontalStroke>
				<verticalStroke>
					<Stroke color="#d8d8d8" alpha="0" weight="1"/>
				</verticalStroke>
				<borderStroke>
					<Stroke color="#eeeeee" alpha="0" weight="1"/>
				</borderStroke>
			</GridLines>
		</backgroundElements>
	</Bar2DChart>
</BIX5>

# 스크립트

<script>
	/**
	* component를 사용할 준비가 되면 호출합니다.
	*/
	widget.componentReadyHandler = function(componentId){

	}

	widget.setAggregateCompleteHandler(function(payload){
		var layoutMetaData = widget.getLayoutMetaData();

		var newData = payload.length > layoutMetaData.dataLimitRow ? payload.slice(0, layoutMetaData.dataLimitRow) : payload;
		var event = BIX5.dashboard.createEvent('productCmipEvent', false, false, {data:newData});
		widget.getSlide().dispatchEvent(event);

		return newData.reverse();
	});

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

	}
</script>

# 컴포넌트 옵션

{
"customStyle": true,
"propertyOptions": [
{
"label": "데이터 갯수",
"control": "NumericStepper",
"minimum": 1,
"maximum": 15,
"stepSize": 1,
"attribute": "dataLimitRow"
}
],
"layoutMetaData": {
"dataLimitRow": 10
},
"isMultiView": false,
"multiViewRow": 2,
"multiViewColumn": 2,
"multiViewSubCategoryField": {},
"multiViewFillType": null,
"marginLeft": 15,
"marginTop": 10,
"marginRight": 70,
"marginBottom": 10,
"isAutoServiceStart": false,
"dedicated": false,
"isDataLimit": true,
"dataLimit": 10000,
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
"vars": "",
"componentLayoutId": "Bar-Bar",
"bindingSource": "4d9bc65f8f0e9c0ab6e575ee30e6429a",
"referenceSources": [],
"interactiveFiltering": false,
"dynamicFiltering": true,
"filterField": "분류",
"interactiveFilteringAxis": true
}
