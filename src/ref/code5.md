# 레이아웃

<style>
	#{{id}}{
		animation: bounce{{id}} {{#if @root.meta.bounceStus}}{{@root.meta.bounceTime}}{{else}}0{{/if}}s infinite {{#if @root.meta.gradientStus}},{{id}}animateBg {{@root.meta.gradientTime}}s linear infinite;{{/if}};
		{{#if @root.meta.bgGradient}}
		background-image: linear-gradient({{@root.meta.gradientDeg}}deg, {{@root.meta.gradientColor1}} 0%, {{@root.meta.gradientColor2}} 50%, {{@root.meta.gradientColor3}} 100%);
		{{/if}}
		{{#if @root.meta.gradientStus}}
		background-image: linear-gradient({{@root.meta.gradientDeg}}deg, {{@root.meta.gradientColor1}}, {{@root.meta.gradientColor2}}, {{@root.meta.gradientColor3}}, {{@root.meta.gradientColor1}}, {{@root.meta.gradientColor2}}, {{@root.meta.gradientColor3}}, {{@root.meta.gradientColor1}}, {{@root.meta.gradientColor2}}, {{@root.meta.gradientColor3}}, {{@root.meta.gradientColor1}}, {{@root.meta.gradientColor2}}, {{@root.meta.gradientColor3}}, {{@root.meta.gradientColor1}}, {{@root.meta.gradientColor2}}, {{@root.meta.gradientColor3}}, {{@root.meta.gradientColor1}}, {{@root.meta.gradientColor2}});
		background-size: 1100% 1100%;
		{{/if}}
	}

	#{{id}}:hover{
		cursor:pointer;
		filter:brightness(0.9);
		transition:all .2s ease-in-out;
	}

	@keyframes {{id}}animateBg {
		0% { background-position: 100% 100%; }
		100% { background-position: 0% 0%; }
	}

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

	.{{className}} .c-box {
		border-radius:10px;
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
	}

	.{{className}} .c-box .group{
		width: 100%;
		height: calc(100% / {{meta.columns.length}});
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
		/*	padding: {{@root.meta.titlePaddingH}}px {{@root.meta.titlePaddingV}}px; */
		justify-content: {{meta.TitleFont.textAlign}};
		display: flex;
		align-items:center;
		border-radius:{{meta.titleBorderPx}}px;
		height:{{meta.titleHeight}}px;
		width:{{meta.titleWidth}}px;
	}
	.{{className}} .c-box .img{
		margin-right:15px;
	}
	.{{className}} .valWrap{
		text-align: {{meta.valFont.textAlign}};
	}
	.{{className}} .valWrap .val{
		display:flex;
		align-items:center;
		font-family: {{meta.valFont.fontFamily}};
		font-size: {{meta.valFont.fontSize}}px;
		font-weight: {{meta.valFont.fontWeight}};
		color: {{meta.valFont.color}};
		letter-spacing: {{meta.valFont.letterSpacing}}px;
		line-height: {{meta.valFont.lineHeight}};
		justify-content:end;
	}
	.{{className}} .group:first-child .valWrap .val{
		{{#if @root.meta.blinkTxt}}
		animation: blink{{id}} {{@root.meta.blinkTime}}s infinite;
		{{/if}}
	}

	.{{className}} .group:first-child .valWrap .val img{
		{{#if @root.meta.blinkTxt}}
		animation: blinkImg{{id}} {{@root.meta.blinkTime}}s infinite;
		{{/if}}
	}

	/*반짝이는 애니메이션*/
	@keyframes blink{{id}} {
		0%,
		22%,
		36%,
		75% {
			color: {{meta.blinkFontColor}};
			text-shadow: 0 0 0.6rem {{@root.meta.blinkColor}}, 0 0 1.5rem {{@root.meta.blinkColor}},
				-0.2rem 0.1rem 1rem {{@root.meta.blinkColor}}, 0.2rem 0.1rem 1rem {{@root.meta.blinkColor}},
				0 -0.5rem 2rem {{@root.meta.blinkColor}}, 0 0.5rem 3rem {{@root.meta.blinkColor}};
		}
		28%,
		33% {
			color: {{meta.valFont.color}};
			text-shadow: none;
		}
		82%,
		97% {
			color:{{meta.valFont.color}};
			text-shadow: none;
		}
	}

	@keyframes blinkImg{{id}} {
		0%,
		22%,
		36%,
		75% {
			filter: drop-shadow(0 0 0.1rem {{@root.meta.blinkImgColor}})
				drop-shadow(0 0 0.2rem {{@root.meta.blinkImgColor}})
				drop-shadow(-0.05rem 0.05rem 0.3rem {{@root.meta.blinkImgColor}})
				drop-shadow(0.05rem 0.05rem 0.3rem {{@root.meta.blinkImgColor}})
				drop-shadow(0 -0.1rem 0.5rem {{@root.meta.blinkImgColor}})
				drop-shadow(0 0.1rem 0.7rem {{@root.meta.blinkImgColor}});
		}
		28%,
		33% {
			filter: none;
		}
		82%,
		97% {
			filter: none;
		}
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

	#{{id}} .lightBorderBox {
		position: relative;
		width:100%;
		height:100%;
		text-decoration: none;
		text-transform: uppercase;
		overflow: hidden;
		transition: 3s;
		margin-top: 0.5px;
		letter-spacing: 4px
	}

	#{{id}} .lightBorderBox .lightBorderspan span {
		position: absolute;
		display: block;
	}

	#{{id}} .lightBorderBox .lightBorderspan span:nth-child(1) {
		top: 0;
		left: -100%;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, transparent, {{meta.borderAniColor}});
		animation: btn-anim1{{id}} 1s linear infinite;
	}

	@keyframes btn-anim1{{id}} {
		0% {
			left: -100%;
		}
		50%,100% {
			left: 100%;
		}
	}

	#{{id}} .lightBorderBox .lightBorderspan span:nth-child(2) {
		top: -100%;
		right: 0;
		width: 2px;
		height: 100%;
		background: linear-gradient(180deg, transparent, {{meta.borderAniColor}});
		animation: btn-anim2{{id}} 1s linear infinite;
		animation-delay: .25s
	}

	@keyframes btn-anim2{{id}} {
		0% {
			top: -100%;
		}
		50%,100% {
			top: 100%;
		}
	}

	#{{id}} .lightBorderBox .lightBorderspan span:nth-child(3) {
		bottom: 0;
		right: -100%;
		width: 100%;
		height: 2px;
		background: linear-gradient(270deg, transparent, {{meta.borderAniColor}});
		animation: btn-anim3{{id}} 1s linear infinite;
		animation-delay: .5s
	}

	@keyframes btn-anim3{{id}} {
		0% {
			right: -100%;
		}
		50%,100% {
			right: 100%;
		}
	}

	#{{id}} .lightBorderBox .lightBorderspan span:nth-child(4) {
		bottom: -100%;
		left: 0;
		width: 2px;
		height: 100%;
		background: linear-gradient(360deg, transparent, {{meta.borderAniColor}});
		animation: btn-anim4{{id}} 1s linear infinite;
		animation-delay: .75s
	}

	@keyframes btn-anim4{{id}} {
		0% {
			bottom: -100%;
		}
		50%,100% {
			bottom: 100%;
		}
	}

	#{{id}}-modal {
		padding: 0; 
		overflow: hidden;
	}

	#{{id}} .popupBadge{
		background-color:rgba(246,134,31,0.8);
		border:1px solid #f6861f;
		color:#ffffff;
		position:absolute;
		top:5px;
		right:5px;
		border-radius:5px;
		width:25px;
		height:25px;
		display:flex;
		align-items:center;
		justify-content:center;
		font-size:18px;
	}

</style>
<div class="c-box {{#if meta.borderAni}}lightBorderBox{{/if}}" onclick="widget.clickFunc()" type="button">
	<div class="popupBadge">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
			<path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
			<path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
		</svg>
	</div>
	{{#if data.length}}
	{{#each data as |row|}}
	{{#each @root.meta.columns as |column|}}
	<!-- 이 안에다 꾸며둔 카드위젯을 넣으면 데이터 컬럼 갯수에 따라 카드위젯을 만들 수 있다. (값 : lookup row column.name / 컬럼명 : column.label / 순서 : @index) -->
	<div class="group">
		<!--{{#if @root.meta.bgImgArray}}
 <div class="img">
 <img src="{{lookup @root.meta.bgImgArray @index}}" style="height:{{@root.meta.imgSize}}%">
 </div>
 {{/if}}-->
		<div class=" title">
			<div style="background-color:{{lookup @root.meta.titleBgColor @index}};">
				{{#if @root.meta.manualTextArray}}
				{{lookup @root.meta.manualTextArray @index}}
				{{else}}
				{{column.label}}
				{{/if}}
			</div>
		</div>
		<div class="w-100 valWrap">
			<!-- 단위 위치정렬이 왼쪽일때 start -->
			{{#ifCond @root.meta.unitAlign '==' 'left'}}
			<spen class="unit">
				{{#if @root.meta.unitTextArray}}
				{{lookup @root.meta.unitTextArray @index}}
				{{/if}}
			</spen>
			{{/ifCond}}
			<!-- end -->
			<div class="val" style="color:{{lookup @root.meta.valEachColor @index}}">
				{{NumberFormatter (lookup row column.alias) nanSign="0"}}
			</div>
			<!-- 단위 위치정렬이 오른쪽일때 start -->
			{{#ifCond @root.meta.unitAlign '==' 'right'}}
			<spen class="unit">
				{{#if @root.meta.unitTextArray}}
				{{lookup @root.meta.unitTextArray @index}}
				{{/if}}
			</spen>
			{{/ifCond}}
			<!-- end -->
		</div>
	</div>
	<!-- 이안꾸 끝 -->
	{{/each}}
	{{/each}}
	{{else}}
	<!-- 데이터셋이 연동되어 있지 않을 때 보여질 카드위젯 입력 -->
	<div class="group">
		<div class="w-100 title">컬럼을 선택하세요</div>
		<div class="w-100 valWrap">
			<spen class="val">0</spen>
			<spen class="unit">{{lookup @root.meta.unitTextArray 0}}</spen>
		</div>
	</div>
	<!-- 끝 -->
	{{/if}}

    {{#if meta.borderAni}}
    <div class="lightBorderspan">
    	<span></span>
    	<span></span>
    	<span></span>
    	<span></span>
    </div>
    {{/if}}

</div>
<div id="{{id}}-modal" style="display:none;">
	<iframe id="{{id}}-ifame" style="width:100%; height:100%; border: 0; padding: 0;" frameborder="0"></iframe>
</div>

# 스크립트

<script>
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

		var blinkColor = lm.blinkColor;
		let blinkImgColor = blinkColor.replace(/(\d+,\s*\d+,\s*\d+,\s*)\d(\.\d+)?/, '$10.5'); // 0.5
		widget.putLayoutMetaData("blinkImgColor",blinkImgColor);

		widget.putLayoutMetaData("manualTextArray",manualTextArray);
		widget.putLayoutMetaData("unitTextArray",unitTextArray);
		widget.putLayoutMetaData("bgImgArray",bgImgArray);
		widget.putLayoutMetaData("valColorArr",valColorArr);
		widget.setLayoutMetaData(widget.getLayoutMetaData());
		// [GUI] 타이틀명을 LayoutMetaData로 정리해서 전달 end
	}

	widget.clickFunc = function(){
		// 기존 모달이 존재하면 삭제
		if (widget.modal) {
			widget.modal.dialog("destroy");  // jQuery UI 다이얼로그 제거
			//widget.modal.remove();  // DOM 요소 제거
			//widget.modal = null;
		}

		// 새 모달을 생성
		widget.createDialogFunc();
		widget.openmodal();
	}

	// 모달 생성 
	widget.openmodal = function() {
		if (widget.modal.dialog("isOpen")) {
			widget.modal.dialog("close");
		}
		widget.modal.dialog("open");
	};

	widget.createDialogFunc = function(){

		// 권한 - 전체일경우만 팝업 오픈
		var org_mng_gbn = dashboard.getDefaultParameter().org_mng_gbn;
		if (org_mng_gbn != "N") return;

		var dialogEle1 = widget.querySelector(`#${widget.id}-modal`);
		var iframe = $(dialogEle1).find('iframe');
		var newSrc = '/dashboards/49f267b7ace2f6daba214b61891005b9?org_mng_gbn=' + dashboard.getDefaultParameter().org_mng_gbn;
		iframe.attr('src', newSrc);

		widget.modal = $(dialogEle1).dialog({
			title: '연간 누적 실적 상세',
			autoOpen: false,
			width: 1515,
			height: 975,
			resizable: false,
			modal:true,
			open: function() {
				//widget.createModalChart();
			},
			classes: {
				"ui-dialog": "kb_modal"
			}
		});
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

# 컴포넌트 옵션

{
"customStyle": true,
"propertyOptions": [
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
"label": "제목 보더 둥글기",
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
"label": "제목 배경 색상",
"control": "ColorSelector",
"attribute": "titleBgColor",
"repeatTarget": "column",
"useOpacity": true
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
}
]
},
{
"label": "데이터 값 폰트색상",
"control": "ColorSelector",
"attribute": "valEachColor",
"repeatTarget": "column"
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
"label": "배경 그라데이션",
"control": "SlideButton",
"attribute": "bgGradient",
"children": [
{
"label": "그라데이션 각도",
"control": "NumericStepper",
"minimum": -360,
"maximum": 360,
"stepSize": 1,
"attribute": "gradientDeg"
},
{
"label": "그라데이션 색상1",
"control": "ColorSelector",
"attribute": "gradientColor1",
"useOpacity": true
},
{
"label": "그라데이션 색상2",
"control": "ColorSelector",
"attribute": "gradientColor2",
"useOpacity": true
},
{
"label": "그라데이션 색상3",
"control": "ColorSelector",
"attribute": "gradientColor3",
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
},
{
"label": "테두리 애니메이션",
"control": "SlideButton",
"attribute": "borderAni",
"children": [
{
"label": "테두리 색상",
"control": "ColorSelector",
"attribute": "borderAniColor"
}
]
},
{
"label": "반짝임 애니메이션",
"control": "SlideButton",
"attribute": "blinkTxt",
"children": [
{
"label": "애니메이션 시간(초)",
"control": "NumericStepper",
"minimum": 0,
"maximum": 100,
"stepSize": 0.1,
"attribute": "blinkTime"
},
{
"label": "텍스트 색상",
"control": "ColorSelector",
"attribute": "blinkFontColor",
"useOpacity": true
},
{
"label": "그림자 색상",
"control": "ColorSelector",
"attribute": "blinkColor",
"useOpacity": true
}
]
}
],
"layoutMetaData": {
"columns": [
{
"id": 625,
"name": "총CMIP",
"label": "총CMIP",
"dataType": "numeric",
"size": 42,
"memo": "총CMIP",
"aggregate": "",
"alias": "총CMIP",
"category": "dimension"
},
{
"id": 626,
"name": "총 건수",
"label": "총 건수",
"dataType": "numeric",
"size": 34,
"memo": "총 건수",
"aggregate": "",
"alias": "총 건수",
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
"rlPadding": 5,
"bounceStus": false,
"bounceTime": 1.5,
"manualText": "총 CMIP,총 건수",
"manualTextArray": [
"총 CMIP",
"총 건수"
],
"unitTextArray": [],
"unitAlign": "right",
"TitleFont": {
"fontFamily": "KBFGDisplayM",
"fontSize": 19,
"color": "#333333",
"textAlign": "center",
"verticalAlign": "top",
"fontWeight": "normal",
"fontStyle": "normal",
"textDeco": "none",
"isGradient": false,
"backgroundImage": "none",
"lineHeight": 1,
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
"fontSize": 28,
"color": "#333333",
"textAlign": "right",
"verticalAlign": "top",
"fontWeight": "normal",
"fontStyle": "normal",
"textDeco": "none",
"letterSpacing": 0,
"lineHeight": 1,
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
"titleBorderPx": 30,
"titlePaddingH": 5,
"titlePaddingV": 20,
"lineColor": "rgba(255,188,0,1)",
"imgUrl": "/images/4da0bfc85abf36c89dd9f1acc594c151,/images/42f49d0490c7b44196782c88fa1e2844,/images/4a13aea06d4b87f8a27dbedbbbd4b66a",
"bgImgArray": [
"/images/4da0bfc85abf36c89dd9f1acc594c151",
"/images/42f49d0490c7b44196782c88fa1e2844",
"/images/4a13aea06d4b87f8a27dbedbbbd4b66a"
],
"imgSize": 80,
"imgXposition": 20,
"imgYposition": 44,
"titleWidth": 115,
"titleHeight": 30,
"titleBgColor": [
"rgba(255,255,255,0.9)",
"rgba(255,255,255,0.9)"
],
"valEachColor": [
"#353535",
"#353535"
],
"valColorArr": [
null,
null,
null
],
"bgImgUrl": "/images/47180e7507c55aba9b112cb29aa43284",
"bgSize": 57,
"bgXPosition": 117,
"bgYPosition": 50,
"bgImage": true,
"bgGradient": true,
"gradientDeg": 130,
"gradientColor1": "rgba(255,228,118,1)",
"gradientColor2": "rgba(255,168,0,1)",
"gradientColor3": "rgba(255,168,0,1)",
"gradientStus": true,
"gradientTime": 10,
"borderAni": false,
"borderAniColor": "rgba(255,116,0,1)",
"blinkTxt": true,
"blinkTime": 2.5,
"blinkColor": "rgba(255,82,0,1)",
"blinkFontColor": "rgba(255,255,255,1)",
"blinkImgColor": "rgba(255,82,0,0.5)"
},
"isMultiView": false,
"multiViewRow": 2,
"multiViewColumn": 2,
"multiViewSubCategoryField": {},
"multiViewFillType": null,
"marginLeft": 0,
"marginTop": 0,
"marginRight": 0,
"marginBottom": 0,
"isAutoServiceStart": false,
"dedicated": false,
"isDataLimit": false,
"dataLimit": 10000,
"referenceResources": [
{
"type": "image",
"id": "47180e7507c55aba9b112cb29aa43284",
"label": "총건수.png",
"attribute": "bgImgUrl"
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
"bindingSource": "4ee8342ee0a1544d9135dc0046a0a11b",
"referenceSources": [],
"classList": [],
"interactiveFiltering": false,
"dynamicFiltering": true
}
