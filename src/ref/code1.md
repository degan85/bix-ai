<BIX5 backgroundColor="transparent" alpha="1" fontSize="11" fontFamily="KBFGTextM">
	<Options>
		<Caption text="" height="1" color="#333333" textAlign="center" fontSize="15" fontFamily="NanumGothic" fontWeight="normal" paddingLeft="0" paddingRight="0" paddingTop="0" paddingBottom="3" backgroundColor="transparent"/>
		<Legend position="bottom" display="block" backgroundColor="#ffffff" borderStyle="none" hAlign="center" vAlign="middle" color="#545045" useVisibleCheck="true" paddingLeft="10" paddingRight="10" paddingTop="7" paddingBottom="7" borderRadius="8"/>
	</Options>

    <!-- 콤마 포맷만 (데이터는 JS에서 천원으로 변환) -->
    <UnitFormatter id="unitfmt" useThousandsSeparator="true" units="" unitSymbols="[,]" divisor="1" rounding="none"/>

    <DateFormatter id="dateFmt" formatString="YYYY/MM/DD"/>
    <SeriesInterpolate id="si"/>
    <SeriesSlide id="ss" direction="up"/>

    <Line2DChart showDataTips="true" _cType="Line2DChart" gutterLeft="NaN" gutterRight="NaN" canDropSeriesLabels="false" dataTipDisplayMode="axis">
    	<horizontalAxis>
    		<CategoryAxis id="hAxis" categoryField="영업일"/>
    	</horizontalAxis>
    	<verticalAxis>
    		<LinearAxis id="vAxis" formatter="{unitfmt}" minimum="NaN" maximum="NaN" interval="NaN"/>
    	</verticalAxis>

    	<series>
    		{{#if meta.columns.length}}
    		{{#each meta.columns}}
    		<Line2DSeries id="{{this}}" formatter="{unitfmt}" dashLinePlacement="after" dashLinePattern="3" dashLineSeperatePos="0" lineStyle="normal" labelPosition="none" yField="{{this}}" displayName="{{this}}" showDataEffect="{ss}" color="#808080" itemRenderer="CircleItemRenderer" form="segment" _nodeName="Line2DSeries" radius="4" fill="{{lookup @root.meta.fills @index}}">
    			<fills>
    				<SolidColor color="{{lookup @root.meta.fills @index}}" alpha="1"/>
    			</fills>
    			<stroke>
    				<Stroke color="{{lookup @root.meta.fills @index}}" weight="2" alpha="1"/>
    			</stroke>
    			<lineStroke>
    				<Stroke color="{{lookup @root.meta.fills @index}}" weight="3" alpha="1"/>
    			</lineStroke>
    		</Line2DSeries>
    		{{/each}}
    		{{else}}
    		<Line2DSeries id="전체경영목표" formatter="{unitfmt}" dashLinePlacement="after" dashLinePattern="3" dashLineSeperatePos="0" lineStyle="dashLine" labelPosition="none" yField="경영목표" displayName="경영목표" showDataEffect="{ss}" color="#808080" itemRenderer="CircleItemRenderer" form="segment" _nodeName="Line2DSeries" radius="4" fill="#f6f6f6">
    			<fills>
    				<SolidColor color="#f6f6f6" alpha="1"/>
    			</fills>
    			<stroke>
    				<Stroke color="#bab19d" weight="2" alpha="1"/>
    			</stroke>
    			<lineStroke>
    				<Stroke color="#bab19d" weight="3" alpha="1"/>
    			</lineStroke>
    		</Line2DSeries>

    		<Line2DSeries id="당월CMIP" formatter="{unitfmt}" dashLinePlacement="after" dashLinePattern="3" dashLineSeperatePos="0" lineStyle="normal" labelPosition="none" yField="당월CMIP" displayName="당월" showDataEffect="{ss}" color="#808080" itemRenderer="CircleItemRenderer" form="curve" _nodeName="Line2DSeries" radius="4" fill="#f38530">
    			<fills>
    				<SolidColor color="#f38530" alpha="1"/>
    			</fills>
    			<stroke>
    				<Stroke color="#f38530" weight="2" alpha="1"/>
    			</stroke>
    			<lineStroke>
    				<Stroke color="#f38530" weight="3" alpha="1"/>
    			</lineStroke>
    		</Line2DSeries>

    		<Line2DSeries id="전월CMIP" formatter="{unitfmt}" dashLinePlacement="after" dashLinePattern="3" dashLineSeperatePos="0" lineStyle="normal" labelPosition="none" yField="전월CMIP" displayName="전월" showDataEffect="{ss}" color="#808080" itemRenderer="CircleItemRenderer" form="segment" _nodeName="Line2DSeries" radius="4" fill="#ffbc00">
    			<fills>
    				<SolidColor color="#ffbc00" alpha="1"/>
    			</fills>
    			<stroke>
    				<Stroke color="#ffbc00" weight="2" alpha="1"/>
    			</stroke>
    			<lineStroke>
    				<Stroke color="#ffbc00" weight="3" alpha="1"/>
    			</lineStroke>
    		</Line2DSeries>
    		{{/if}}
    	</series>

    	<horizontalAxisRenderers>
    		<Axis2DRenderer axis="{hAxis}" showLine="true" color="#333333" placement="left" labelRotation="0">
    			<axisStroke>
    				<Stroke color="#a4a4a4" alpha="1"/>
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
    				<Stroke color="#ddd5cc" alpha="1" weight="1"/>
    			</horizontalStroke>
    			<verticalStroke>
    				<Stroke color="#ddd5cc" alpha="1" weight="1"/>
    			</verticalStroke>
    			<borderStroke>
    				<Stroke color="#eeeeee" alpha="1" weight="1"/>
    			</borderStroke>
    		</GridLines>
    	</backgroundElements>
    </Line2DChart>

</BIX5>

<script>
	/**
	* component를 사용할 준비가 되면 호출합니다.
	*/
	widget.componentReadyHandler = function(componentId){
		widget.setLayoutMetaData({columns:[]});

		widget.fills = {
			"1본부": "#ffbc00",
			"2본부": "#f38530",
			"3본부": "#c1550b",
			"4본부": "#756d63",
			"5본부": "#c4bba6",
			"지사": "#b5b5b5"
		};

		widget.getSlide().addEventListener("tabBtnClick", widget.tabBtnClickHandler);
	};

	widget.tabBtnClickHandler = function(e){
		if(!e.detail?.value) return;
		var value = e.detail.value;
		var colors = value.map(a => widget.fills[a]);

		widget.setLayoutMetaData({columns:value,fills:colors});
		widget.getBindingSourceObject().setParam({본부:value});
		widget.getBindingSourceObject().serviceStart();
	};

	/**
	* 데이터 변형 사용자 정의 함수를 등록합니다.
	* - CMIP 원단위 -> 천원단위로 변환(÷1000)
	*/
	widget.setTransformSourceHandler(function(topic, payload){
		if (!payload) return payload;

		// payload가 배열(행 리스트)인 케이스 대응
		if (Array.isArray(payload)) {
			for (var i = 0; i < payload.length; i++) {
				var row = payload[i];
				if (!row || row.__scaled) continue;

				for (var k in row) {
					if (!Object.prototype.hasOwnProperty.call(row, k)) continue;
					if (k === "영업일") continue;

					var v = row[k];
					if (typeof v === "number" && isFinite(v)) {
						row[k] = v / 1000; // 천원 단위
					}
				}

				row.__scaled = true;
			}
			return payload;
		}

		// payload가 객체이고 내부에 list/data 같은 배열이 있는 케이스까지 커버(필요시 확장)
		return payload;
	});

	/**
	* component가 삭제되기 전 호출됩니다.
	*/
	widget.componentRemoveHandler = function(){
		// 기존 코드에 syncClickHandler로 되어 있었는데, 등록한 핸들러와 맞춰서 제거
		widget.getSlide().removeEventListener("tabBtnClick", widget.tabBtnClickHandler);
	};
</script>
