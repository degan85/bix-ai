# 레이아웃

<style>

	#{{id}} {
		{{#if @root.meta.bgGradient}}
		background-image: linear-gradient({{@root.meta.gradientDeg}}deg, {{@root.meta.gradientColorF}} 0%, {{@root.meta.gradientColorS}} 100%);
		{{/if}}
		{{#if @root.meta.gradientStus}}
		background-image: linear-gradient({{@root.meta.gradientDeg}}deg, {{@root.meta.gradientColorF}}, {{@root.meta.gradientColorS}},{{@root.meta.gradientColorF}});
		background-size: 1100% 1100%;
		{{/if}}
		{{#if @root.meta.flipingStus}}
		backface-visibility: hidden;
		transform: perspective(800px);
		transform-style: preserve-3d;
		{{/if}}

		{{#if @root.meta.gradientStus}}
		{{#if @root.meta.flipingStus}}
		animation: {{id}}animateBg {{@root.meta.gradientTime}}s linear infinite, fliping{{id}} {{@root.meta.flipingTime}}s infinite;
		{{else}}
		animation: {{id}}animateBg {{@root.meta.gradientTime}}s linear infinite;
		{{/if}}
		{{else}}
		{{#if @root.meta.flipingStus}}
		animation: fliping{{id}} {{@root.meta.flipingTime}}s infinite;
		{{/if}}
		{{/if}}
	}

	@keyframes {{id}}animateBg {
		0% { background-position: 100% 100%; }
		100% { background-position: 0% 0%; }
	}

	@keyframes fliping{{id}} {
		0% {
			transform: rotateY(0deg); /* 초기 위치 */
		}
		10% {
			transform: rotateY(0deg); /* 최종 위치, 초기 회전 복구 */
		}
		18% {
			transform: rotateY(90deg); /* 최종 위치, 초기 회전 복구 */
		}
		26% {
			transform: rotateY(0deg); /* 최종 위치, 초기 회전 복구 */
		}
		100% {
			transform: rotateY(0deg); /* 최종 위치, 초기 회전 복구 */
		}
	}
	.{{className}} .c-box {
		width: 100%;
		height: 100%;
		{{#if meta.bgImage}}
		background-image:url({{meta.bgImgUrl}});
		background-size:{{meta.bgSize}}%;
		background-position-x:{{meta.bgXPosition}}%;
		background-position-y:{{meta.bgYPosition}}%;
		background-repeat:no-repeat;
		{{/if}}
		padding:0 {{@root.meta.rlPadding}}px;
		display:flex;
	}

	.{{className}} .c-box .contentWrap{
		flex: 1 1 auto;
		padding-left:15px;
	}

	.{{className}} .c-box .iconWrap{
		display:flex;
		align-items:center;
		justify-content:center;
	}

	.{{className}} .c-box .iconWrap img{
		width:{{meta.iconWidth}}px;
	}

	.{{className}} .c-box .group{
		width: 100%;
		height: calc(100% / ({{meta.columns.length}} / 2));
		display:flex;
		flex-wrap:wrap;
		align-content:space-between;
		padding: {{meta.udPadding}}px {{@root.meta.rlPadding}}px;
	}
	.{{className}} .c-box .title > div{
		font-family: {{meta.TitleFont.fontFamily}};
		font-size: {{meta.TitleFont.fontSize}}px;
		font-weight: {{meta.TitleFont.fontWeight}};
		color: {{meta.TitleFont.color}};
		letter-spacing: {{meta.TitleFont.letterSpacing}}px;
		line-height: {{meta.TitleFont.lineHeight}};
		border-radius: {{@root.meta.titleBorderPx}}px;
		padding: {{@root.meta.titlePaddingH}}px {{@root.meta.titlePaddingV}}px; 
		justify-content: {{meta.TitleFont.textAlign}};
		display: flex;
		align-items:center;
		border-radius:{{meta.titleBorderPx}}px;
		/*height:{{meta.titleHeight}}px;
		width:{{meta.titleWidth}}px;*/
	}
	.{{className}} .c-box .img{
		margin-right:15px;
	}
	.{{className}} .valWrap{
		text-align: {{meta.valFont.textAlign}};
		display: flex;
		justify-content: end;
		align-items: center;
	}
	.{{className}} .valWrap .val{
		font-family: {{meta.valFont.fontFamily}};
		font-size: {{meta.valFont.fontSize}}px;
		font-weight: {{meta.valFont.fontWeight}};
		color: {{meta.valFont.color}};
		letter-spacing: {{meta.valFont.letterSpacing}}px;
		line-height: {{meta.valFont.lineHeight}};
	}

	.{{className}} .valWrap .unit{
		font-family: {{meta.unitFont.fontFamily}};
		font-size: {{meta.unitFont.fontSize}}px;
		font-weight: {{meta.unitFont.fontWeight}};
		color: {{meta.unitFont.color}};
	}

	.{{className}} .c-box .group:not(:last-child) {
		border-bottom: {{@root.meta.lineHeight}}px solid {{@root.meta.lineColor}};
	}

	/* 두근두근 모션 */
	{{#if @root.meta.bounceStus}}
	.{{className}} {
		animation: bounce{{id}} {{@root.meta.bounceTime}}s infinite;
	}
	{{/if}}

	@keyframes bounce{{id}} {
		0% {
			box-shadow:8px 8px 15px rgba(0,0,0,0.5);
			transform:scale(1);
		}
		50% {
			box-shadow:0px 2px 2px rgba(0,0,0,0.2);
			transform:scale(0.99);
		}
		100% {
			box-shadow:8px 8px 15px rgba(0,0,0,0.5);
			transform:scale(1);
		}
	}

	.{{className}} .c-box .distance{
		background-color: {{meta.diffBgColor}};
		padding: 5px 10px;
		border-radius: 30px;
		margin-left: 5px;
		font-family: {{meta.diffFont.fontFamily}};
		font-size: {{meta.diffFont.fontSize}}px;
		justify-content: {{meta.diffFont.textAlign}};
		font-weight: {{meta.diffFont.fontWeight}};
		color: {{meta.diffFont.color}};
		letter-spacing: {{meta.diffFont.letterSpacing}}px;
		line-height: {{meta.diffFont.lineHeight}};
		font-style: {{meta.diffFont.fontStyle}};
		text-decoration: {{meta.diffFont.textDeco}};
		display:flex;
		align-items:center;
		justify-content:center;
	}
	.{{className}} .c-box .distance svg{
		margin-right:5px;
	}
	.{{className}} .c-box .distance.up svg{
		fill: {{meta.plusColor}};
	}
	.{{className}} .c-box .distance.down svg{
		fill: {{meta.minusColor}};
		transform:rotate(180deg)
	}
</style>
<div class="c-box">
	<div class="iconWrap">
		<img src="{{@root.meta.iconSrc}}">
	</div>
	<div class="contentWrap">
		<div class="group">
			<div class=" title">
				<div style="background-color:{{meta.titleBgColor.[0]}};">
					{{#if @root.meta.manualTextArray}}
					{{lookup @root.meta.manualTextArray 0}}
					{{else}}
					{{@root.meta.columns.0.label}}
					{{/if}}
				</div>
			</div>
			<div class="w-100 valWrap">
				<div>
					<spen class="val" style="color:{{lookup meta.valEachColor 0}}">
						{{NumberFormatter (lookup data.[0] meta.columns.[0].alias) nanSign="-"}}
					</spen>
					<spen class="unit">
						{{#if @root.meta.unitTextArray}}
						{{lookup @root.meta.unitTextArray 0}}
						{{/if}}
					</spen>
				</div>
				<div class="distance{{#ifCond (lookup data.[0] meta.columns.[1].alias) '>' 0}} up{{/ifCond}}{{#ifCond (lookup data.[0] meta.columns.[1].alias) '<' 0}} down{{/ifCond}}">
					<svg xmlns="http://www.w3.org/2000/svg" width="{{@root.meta.arrowSize}}" height="{{@root.meta.arrowSize}}" fill="currentColor" class="mr-2" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767z"/>
					</svg>
					{{NumberFormatter (lookup data.[0] meta.columns.[1].alias) nanSign="-"  useNegativeSign="false"}}
				</div>
			</div>
		</div>
		<div class="group">
			<div class=" title">
				<div style="background-color:{{meta.titleBgColor.[1]}};">
					{{#if @root.meta.manualTextArray}}
					{{lookup @root.meta.manualTextArray 1}}
					{{else}}
					{{@root.meta.columns.[2].label}}
					{{/if}}
				</div>
			</div>
			<div class="w-100 valWrap">
				<div>
					<spen class="val" style="color:{{lookup meta.valEachColor 1}}">
						{{NumberFormatter (lookup data.[0] meta.columns.[2].alias) nanSign="-"}}
					</spen>
					<spen class="unit">
						{{#if @root.meta.unitTextArray}}
						{{lookup @root.meta.unitTextArray 2}}
						{{/if}}
					</spen>
				</div>
				<div class="distance{{#ifCond (lookup data.[0] meta.columns.[3].alias) '>' 0}} up{{/ifCond}}{{#ifCond (lookup data.[0] meta.columns.[3].alias) '<' 0}} down{{/ifCond}}">
					<svg xmlns="http://www.w3.org/2000/svg" width="{{@root.meta.arrowSize}}" height="{{@root.meta.arrowSize}}" fill="currentColor" class="" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767z"/>
					</svg>
					{{NumberFormatter (lookup data.[0] meta.columns.[3].alias) nanSign="-" useNegativeSign="false"}}
				</div>
			</div>
		</div>
	</div>
</div>

# 스크립트

<script>
	BIX5.unregisterHelper("isEven");
	BIX5.registerHelper("isEven", function(value){
		return (value % 2) === 0;
	});

	/**
	* component를 사용할 준비가 되면 호출합니다.
	*/
	widget.componentReadyHandler = function(componentId){

		// [GUI] 타이틀명, 단위를 정리해서 LayoutMetaData 전달 start
		var lm = widget.getLayoutMetaData();
		var manualTextArray = lm.manualText.split(',');
		var unitTextArray = lm.unitText.split(',');

		var bgImgArray = lm.imgUrl.split(',');

		var valColorF = lm.valColorF;
		var valColorS = lm.valColorS;
		var valColorT = lm.valColorT;

		var valColorArr = []; 

		valColorArr[0] = valColorF;
		valColorArr[1] = valColorS;
		valColorArr[2] = valColorT;

		if(manualTextArray.length== 1 && manualTextArray[0] == "") {
			manualTextArray = [];
		}
		if(unitTextArray.length== 1 && unitTextArray[0] == "") {
			unitTextArray = [];
		}

		if(bgImgArray.length== 1 && bgImgArray[0] == "") {
			bgImgArray = [];
		}
		if(valColorArr.length== 1 && valColorArr[0] == "") {
			valColorArr = [];
		}
		widget.putLayoutMetaData("manualTextArray",manualTextArray);
		widget.putLayoutMetaData("unitTextArray",unitTextArray);
		widget.putLayoutMetaData("bgImgArray",bgImgArray);
		widget.putLayoutMetaData("valColorArr",valColorArr);
		widget.setLayoutMetaData(widget.getLayoutMetaData());
		// [GUI] 타이틀명을 LayoutMetaData로 정리해서 전달 end
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

	}
</script>

# 컴포넌트 옵션

{
"customStyle": true,
"propertyOptions": [
{
"label": "아이콘",
"children": [
{
"label": "아이콘 경로",
"control": "ResourceSelector",
"type": "image",
"attribute": "iconSrc"
},
{
"label": "아이콘 크기",
"control": "NumericStepper",
"minimum": 0,
"maximum": 1000,
"stepSize": 1,
"attribute": "iconWidth"
}
]
},
{
"label": "제목",
"attribute": "TitleFont",
"children": [
{
"label": "제목(콤마 구분)",
"control": "TextInput",
"attribute": "manualText"
},
{
"label": "제목 폰트 설정",
"control": "FontController",
"attribute": "TitleFont",
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
"label": "너비",
"control": "NumericStepper",
"minimum": 0,
"maximum": 1000,
"stepSize": 1,
"attribute": "titleWidth"
},
{
"label": "높이",
"control": "NumericStepper",
"minimum": 0,
"maximum": 1000,
"stepSize": 1,
"attribute": "titleHeight"
},
{
"label": "제목 배경 색상",
"control": "ColorPalette",
"attribute": "titleBgColor",
"width": 150,
"size": 1,
"useTransparent": true,
"useOpacity": true,
"editable": true
},
{
"label": "제목 모서리 둥글기",
"control": "NumericStepper",
"minimum": 0,
"maximum": 300,
"stepSize": 1,
"attribute": "titleBorderPx"
},
{
"label": "제목 패딩 (상하)",
"control": "NumericStepper",
"minimum": 0,
"maximum": 300,
"stepSize": 1,
"attribute": "titlePaddingH"
},
{
"label": "제목 패딩 (좌우)",
"control": "NumericStepper",
"minimum": 0,
"maximum": 300,
"stepSize": 1,
"attribute": "titlePaddingV"
}
]
},
{
"label": "데이터 값",
"attribute": "DataFont",
"children": [
{
"label": "값 폰트 설정",
"control": "FontController",
"attribute": "valFont",
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
"label": "데이터 값 폰트색상",
"control": "ColorPalette",
"attribute": "valEachColor",
"width": 130,
"size": 1,
"useTransparent": true,
"useOpacity": true,
"editable": true
},
{
"label": "단위(콤마로 구분)",
"control": "TextInput",
"attribute": "unitText"
},
{
"label": "단위 폰트 설정",
"control": "FontController",
"attribute": "unitFont",
"tools": [
"fontFamily",
"fontSize",
"color"
]
},
{
"label": "대비 값 폰트 설정",
"control": "FontController",
"attribute": "diffFont",
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
"label": "대비 값 배경 색상",
"control": "ColorSelector",
"attribute": "diffBgColor",
"useOpacity": true
},
{
"label": "증가 색상",
"control": "ColorSelector",
"attribute": "plusColor"
},
{
"label": "감소 색상",
"control": "ColorSelector",
"attribute": "minusColor"
},
{
"label": "화살표 크기",
"control": "NumericStepper",
"minimum": 0,
"maximum": 300,
"stepSize": 1,
"attribute": "arrowSize"
}
]
},
{
"label": "내용 상하 패딩 크기",
"control": "NumericStepper",
"minimum": 0,
"maximum": 100,
"stepSize": 1,
"attribute": "udPadding"
},
{
"label": "내용 좌우 패딩 크기",
"control": "NumericStepper",
"minimum": 0,
"maximum": 100,
"stepSize": 1,
"attribute": "rlPadding"
},
{
"label": "구분선 두께",
"control": "NumericStepper",
"minimum": 0,
"maximum": 100,
"stepSize": 1,
"attribute": "lineHeight"
},
{
"label": "구분선 색상",
"control": "ColorSelector",
"attribute": "lineColor"
},
{
"label": "배경 이미지",
"control": "SlideButton",
"attribute": "bgImage",
"children": [
{
"label": "이미지 경로",
"control": "ResourceSelector",
"type": "image",
"attribute": "bgImgUrl"
},
{
"label": "이미지 크기(%)",
"control": "NumericStepper",
"minimum": 0,
"maximum": 1000,
"stepSize": 1,
"attribute": "bgSize"
},
{
"label": "이미지 X위치(%)",
"control": "NumericStepper",
"minimum": 0,
"maximum": 1000,
"stepSize": 1,
"attribute": "bgXPosition"
},
{
"label": "이미지 Y위치(%)",
"control": "NumericStepper",
"minimum": 0,
"maximum": 1000,
"stepSize": 1,
"attribute": "bgYPosition"
}
]
},
{
"label": "두근두근 모션 (그림자 포함)",
"control": "SlideButton",
"attribute": "bounceStus",
"children": [
{
"label": "두근두근 모션 범위 시간(초)",
"control": "NumericStepper",
"minimum": 0,
"maximum": 100,
"stepSize": 0.1,
"attribute": "bounceTime"
}
]
},
{
"label": "뒤집힘 모션",
"control": "SlideButton",
"attribute": "flipingStus",
"children": [
{
"label": "뒤집힘 모션 범위 시간(초)",
"control": "NumericStepper",
"minimum": 0,
"maximum": 100,
"stepSize": 0.1,
"attribute": "flipingTime"
}
]
},
{
"label": "배경 그라데이션",
"control": "SlideButton",
"attribute": "bgGradient",
"children": [
{
"label": "그라데이션 각도",
"control": "NumericStepper",
"minimum": 0,
"maximum": 300,
"stepSize": 1,
"attribute": "gradientDeg"
},
{
"label": "그라데이션 색상1",
"control": "ColorSelector",
"attribute": "gradientColorF",
"useOpacity": true
},
{
"label": "그라데이션 색상2",
"control": "ColorSelector",
"attribute": "gradientColorS",
"useOpacity": true
},
{
"label": "그라데이션 애니메이션",
"control": "SlideButton",
"attribute": "gradientStus"
},
{
"label": "애니메이션 시간(초)",
"control": "NumericStepper",
"minimum": 0,
"maximum": 100,
"stepSize": 0.1,
"attribute": "gradientTime"
}
]
}
],
"layoutMetaData": {
"columns": [
{
"id": 380,
"name": "전체",
"label": "전체",
"dataType": "numeric",
"size": 42,
"memo": "전체",
"aggregate": "",
"alias": "전체",
"category": "dimension"
},
{
"id": 381,
"name": "전체nn",
"label": "전체nn",
"dataType": "numeric",
"size": 43,
"memo": "전체nn",
"aggregate": "",
"alias": "전체nn",
"category": "dimension"
}
],
"titleSize": 18,
"unitText": "",
"unitSize": 14,
"valFontFamily": "Malgun Gothic",
"valAlign": "right",
"valSize": 24,
"lineSize": 100,
"lineHeight": 1,
"udPadding": 10,
"rlPadding": 0,
"bounceStus": false,
"bounceTime": 3,
"manualText": "전체",
"manualTextArray": [
"전체"
],
"unitTextArray": [],
"unitAlign": "right",
"TitleFont": {
"fontFamily": "KBFGDisplayM",
"fontSize": 18,
"color": "#3c301d",
"textAlign": "center",
"verticalAlign": "top",
"fontWeight": "normal",
"fontStyle": "normal",
"textDeco": "none",
"isGradient": false,
"backgroundImage": "none",
"lineHeight": 1.5,
"letterSpacing": 0
},
"DataFont": {
"fontFamily": "Malgun Gothic",
"fontSize": 16,
"color": "#000000",
"textAlign": "left",
"verticalAlign": "top",
"fontWeight": "normal",
"fontStyle": "normal",
"textDeco": "none",
"letterSpacing": 0,
"lineHeight": 1.5,
"isGradient": false,
"backgroundImage": "none"
},
"UnitFont": {
"fontFamily": "Malgun Gothic",
"fontSize": 16,
"color": "#000000",
"textAlign": "left",
"verticalAlign": "top",
"fontWeight": "normal",
"fontStyle": "normal",
"textDeco": "none",
"letterSpacing": 0,
"lineHeight": 1.5,
"isGradient": false,
"backgroundImage": "none"
},
"valFont": {
"fontFamily": "KBFGDisplayB",
"fontSize": 21,
"color": "#333333",
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
"unitFont": {
"fontFamily": "Pretendard-SemiBold",
"fontSize": 1,
"color": "#353535",
"textAlign": "left",
"verticalAlign": "top",
"fontWeight": "normal",
"fontStyle": "normal",
"textDeco": "none",
"letterSpacing": 4,
"lineHeight": 1.7,
"isGradient": false,
"backgroundImage": "none"
},
"titleBgOpacity": 0.2,
"titleBorderColor": "#86c1e0",
"titleBorderPx": 0,
"titlePaddingH": 0,
"titlePaddingV": 0,
"lineColor": "rgba(255,228,156,1)",
"imgUrl": "/images/4da0bfc85abf36c89dd9f1acc594c151,/images/42f49d0490c7b44196782c88fa1e2844,/images/4a13aea06d4b87f8a27dbedbbbd4b66a",
"bgImgArray": [
"/images/4da0bfc85abf36c89dd9f1acc594c151",
"/images/42f49d0490c7b44196782c88fa1e2844",
"/images/4a13aea06d4b87f8a27dbedbbbd4b66a"
],
"imgSize": 80,
"imgXposition": 20,
"imgYposition": 44,
"titleWidth": 0,
"titleHeight": 0,
"titleBgColor": [
"transparent",
"transparent"
],
"valEachColor": [
"rgba(51,51,51,1)",
"rgba(51,51,51,1)"
],
"valColorArr": [
null,
null,
null
],
"bgImgUrl": "/images/4cad342648ba8d49bd681be0e4feaf06",
"bgSize": 25,
"bgXPosition": 7,
"bgYPosition": 30,
"bgImage": false,
"flipingStus": false,
"flipingTime": 4,
"iconSrc": "/images/4c938e9389d67d0d87d99c3269a354be",
"iconWidth": 50,
"iconHeight": 150,
"diffFont": {
"fontFamily": "KBFGTextB",
"fontSize": 14,
"color": "#3c301d",
"textAlign": "left",
"verticalAlign": "top",
"fontWeight": "normal",
"fontStyle": "normal",
"textDeco": "none",
"letterSpacing": 0,
"lineHeight": 1.2,
"isGradient": false,
"backgroundImage": "none"
},
"plusColor": "rgba(239,77,77,1)",
"minusColor": "rgba(0,101,255,1)",
"bgGradient": true,
"gradientDeg": 300,
"gradientColorF": "rgba(252,175,22,1)",
"gradientColorS": "rgba(255,228,118,1)",
"gradientStus": false,
"gradientTime": 3,
"diffBgColor": "rgba(255,243,200,0.5)",
"arrowSize": 10
},
"isMultiView": false,
"multiViewRow": 2,
"multiViewColumn": 2,
"multiViewSubCategoryField": {},
"multiViewFillType": null,
"marginLeft": 15,
"marginTop": 0,
"marginRight": 15,
"marginBottom": 0,
"isAutoServiceStart": true,
"dedicated": false,
"isDataLimit": false,
"dataLimit": 10000,
"referenceResources": [
{
"type": "image",
"id": "4cad342648ba8d49bd681be0e4feaf06",
"label": "전체.png",
"attribute": "bgImgUrl"
},
{
"type": "image",
"id": "482e5e72405fa0799f2cfac2f0101e04",
"label": "kb라이프파트너스.png",
"attribute": "iconSrc"
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
"showInteractiveFilteringMenu": false,
"bindingSource": "454f431cf1fffab6b2e929739bc5c47c",
"referenceSources": [],
"classList": [],
"interactiveFiltering": false,
"dynamicFiltering": true
}
