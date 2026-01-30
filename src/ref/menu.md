<style>
	#{{id}},
	#{{id}} .BIX5__ContentPane,
	#{{id}} .BIX5__ComponentWrapper{
		overflow:visible !important;
	}
	#{{id}} .header_wrap{
		width:100%;
		height:100%;
		background-repeat:no-repeat;
		display: flex;
		justify-content: space-between;
		align-items: end;
	}
	#{{id}} .content_wrap{
		height:100%;
		display:flex;
		justify-content:space-between;
		align-items: end;
		overflow:hidden;
	}
	#{{id}} .logoWrap {
		height: 100%; 
		display: flex; 
		align-items: center;
		margin-right:40px;
		background-color: #60584c;
		padding:0 20px;
		border-radius: 0 30px 30px 0;
	} 

	#{{id}} .logoWrap svg{
		width:{{meta.logoWidth}}px;
	} 
	/* KB 라이프 파트너스 로고 애니메이션 */
	{{#if meta.logoAnimation}}
	#{{id}} .kblogo1 {
		animation-name:opacity01;
		animation-duration:5s;
		animation-iteration-count:infinite;
		animation-delay: 3s;
	}
	#{{id}} .kblogo2 {
		animation-name:opacity02 ;
		animation-duration:5s;
		animation-iteration-count:infinite;
		animation-delay: 3s;
	}
	#{{id}} .kblogo3 {
		animation-name:opacity03 ;
		animation-duration:5s;
		animation-iteration-count:infinite;
		animation-delay: 3s;
	}
	#{{id}} .kblogo4 {
		animation-name:opacity04 ;
		animation-duration:5s;
		animation-iteration-count:infinite;
		animation-delay: 3s;
	}
	#{{id}} .kblogo5 {
		animation-name:opacity05 ;
		animation-duration:5s;
		animation-iteration-count:infinite;
		animation-delay: 3s;
	}
	#{{id}} .kblogo6 {
		animation-name:opacity06 ;
		animation-duration:5s;
		animation-iteration-count:infinite;
		animation-delay: 3s;
	}
	#{{id}} .kblogo7 {
		animation-name:opacity07 ;
		animation-duration:5s;
		animation-iteration-count:infinite;
		animation-delay: 3s;
	}
	#{{id}} .kblogo8 {
		animation-name:opacity08 ;
		animation-duration:5s;
		animation-iteration-count:infinite;
		animation-delay: 3s;
	}

	@keyframes opacity01{
		0% {
			opacity:0;
		}
		10%{
			opacity:1;
		}
		100%{
			opacity:1;
		}
	}

	@keyframes opacity02{
		0% {
			opacity:0;
		}
		10% {
			opacity:0;
		}
		20%{
			opacity:1;
		}
		100%{
			opacity:1;
		}
	}

	@keyframes opacity03{
		0% {
			opacity:0;
		}
		20% {
			opacity:0;
		}
		30%{
			opacity:1;
		}
		100%{
			opacity:1;
		}
	}

	@keyframes opacity04{
		0% {
			opacity:0;
		}
		30% {
			opacity:0;
		}
		40%{
			opacity:1;
		}
		100%{
			opacity:1;
		}
	}
	@keyframes opacity05{
		0% {
			opacity:0;
		}
		40% {
			opacity:0;
		}
		50%{
			opacity:1;
		}
		100%{
			opacity:1;
		}
	}@keyframes opacity06{
		0% {
			opacity:0;
		}
		50% {
			opacity:0;
		}
		60%{
			opacity:1;
		}
		100%{
			opacity:1;
		}
	}
	@keyframes opacity07{
		0% {
			opacity:0;
		}
		60% {
			opacity:0;
		}
		70%{
			opacity:1;
		}
		100%{
			opacity:1;
		}
	}
	@keyframes opacity08{
		0% {
			opacity:0;
		}
		70% {
			opacity:0;
		}
		80%{
			opacity:1;
		}
		100%{
			opacity:1;
		}
	}
	{{/if}}

	#{{id}} .headerDiv{
		height:100%;
		display:flex;
		align-items:center;
	}
	#{{id}} .headerBtn{
		border: none;
		width: 100px;
		padding:4px 0;
		background-color: {{meta.btnBgColor}};
		border-radius: {{meta.btnBorderRadius}}px;
		margin-right: {{meta.btnDistance}}px;
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
		display:flex;
		{{#ifCond meta.font.textAlign '==' 'center'}}
		justify-content:center;
		{{/ifCond}}
		{{#ifCond meta.font.textAlign '==' 'justify'}}
		justify-content:space-between;
		{{/ifCond}}
		{{#ifCond meta.font.textAlign '==' 'right'}}
		justify-content:end;
		{{/ifCond}}

		{{#ifCond meta.font.verticalAlign '==' 'middle'}}
		align-items:center;
		{{/ifCond}}
		{{#ifCond meta.font.verticalAlign '==' 'bottom'}}
		align-items:end;
		{{/ifCond}}
	}
	#{{id}} .headerDiv:hover .headerBtn {
		color:{{meta.hoverColor}};
		transition:all 0.1s ease-in-out;
	}

	#{{id}} .headerDiv:hover .headerBtn.active{
		color:{{meta.btnAacHover}};
		transition:all 0.1s ease-in-out;
	}

	#{{id}} .headerBtn.active {
		background-color: {{meta.activeBgColor}};
		font-family: {{meta.acfont.fontFamily}};
		font-size: {{meta.acfont.fontSize}}px;
		text-align: {{meta.acfont.textAlign}};
		font-weight: {{meta.acfont.fontWeight}};
		color: {{meta.acfont.color}};
		vertical-align: {{meta.acfont.verticalAlign}};
		letter-spacing: {{meta.acfont.letterSpacing}}px;
		line-height: {{meta.acfont.lineHeight}};
		font-style: {{meta.acfont.fontStyle}};
		text-decoration: {{meta.acfont.textDeco}};
		box-shadow: 3px 3px 7px rgba(0,0,0,0.2);
	}

	@keyframes blink {
		0%,
		22%,
		36%,
		75% {
			color: #ffffff;
			text-shadow: 0 0 0.6rem #2577ff, 0 0 1.5rem #2577ff,
				-0.2rem 0.1rem 1rem #2577ff, 0.2rem 0.1rem 1rem #2577ff,
				0 -0.5rem 2rem #2577ff, 0 0.5rem 3rem #2577ff;
		}
		28%,
		33% {
			color: #2577ff;
			text-shadow: none;
		}
		82%,
		97% {
			color: #2577ff;
			text-shadow: none;
		}
	}

	#{{id}} .tmwh_wrap{
		display: flex; 
		align-items: center;
		height: 100%;
	}

	#{{id}} .tmwh_wrap .weatherDiv{
		font-family: {{meta.rgfont.fontFamily}};
		font-size: {{meta.rgfont.fontSize}}px;
		text-align: {{meta.rgfont.textAlign}};
		font-weight: {{meta.rgfont.fontWeight}};
		color: {{meta.rgfont.color}};
		vertical-align: {{meta.rgfont.verticalAlign}};
		letter-spacing: {{meta.rgfont.letterSpacing}}px;
		line-height: {{meta.rgfont.lineHeight}};
		font-style: {{meta.rgfont.fontStyle}};
		text-decoration: {{meta.rgfont.textDeco}};
	}

	#{{id}} .tmwh_wrap .newIntlDateTimeFormat2 .format{
		font-family: {{meta.datefont.fontFamily}};
		font-size: {{meta.datefont.fontSize}}px;
		text-align: {{meta.datefont.textAlign}};
		font-weight: {{meta.datefont.fontWeight}};
		color: {{meta.datefont.color}};
		vertical-align: {{meta.datefont.verticalAlign}};
		letter-spacing: {{meta.datefont.letterSpacing}}px;
		line-height: {{meta.datefont.lineHeight}};
		font-style: {{meta.datefont.fontStyle}};
		text-decoration: {{meta.datefont.textDeco}};
	}

	#{{id}} .tmwh_wrap > section.divide{
		margin: 0 {{meta.rgDistance}}px; 
		background-color:{{meta.rgHrColor}};
		width: {{meta.rgHrwidth}}px; 
		height: 100%;
	}

	#{{id}} .tmwh_wrap .update .title{
		font-family: {{meta.tlfont.fontFamily}};
		font-size: {{meta.tlfont.fontSize}}px;
		text-align: {{meta.tlfont.textAlign}};
		font-weight: {{meta.tlfont.fontWeight}};
		color: {{meta.tlfont.color}};
		vertical-align: {{meta.tlfont.verticalAlign}};
		letter-spacing: {{meta.tlfont.letterSpacing}}px;
		line-height: {{meta.tlfont.lineHeight}};
		font-style: {{meta.tlfont.fontStyle}};
		text-decoration: {{meta.tlfont.textDeco}};
	}
	#{{id}} .tmwh_wrap .update .date{
		font-family: {{meta.dtfont.fontFamily}};
		font-size: {{meta.dtfont.fontSize}}px;
		text-align: {{meta.dtfont.textAlign}};
		font-weight: {{meta.dtfont.fontWeight}};
		color: {{meta.dtfont.color}};
		vertical-align: {{meta.dtfont.verticalAlign}};
		letter-spacing: {{meta.dtfont.letterSpacing}}px;
		line-height: {{meta.dtfont.lineHeight}};
		font-style: {{meta.dtfont.fontStyle}};
		text-decoration: {{meta.dtfont.textDeco}};
	}


	#{{id}} .fullImg img {
		width: {{meta.flIconWidth}}px; 
	}
	#{{id}} .fullImg {
		border-radius: {{meta.flBorderRadius}}px;
		background-color : {{meta.flBgColor}};
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer; 
		width: {{meta.flWidth}}px; 
		height: {{meta.flHeight}}px; 
	}

	#{{id}} .fullImg:hover {
		background-color : {{meta.flHoverBg}};
		transition:all 0.2s ease-in-out;
	}

	#{{id}} .alarmImg {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 {{meta.flDistance}}px;
		width: {{meta.alarmWidth}}px; 
		height: {{meta.alarmWidth}}px; 
	}
	#{{id}} .alarmImg svg {
		width:100%;
		height:100%;
		cursor: pointer; 
		fill:{{meta.alarmColor}};
	}
	#{{id}} .alarmImg svg:hover{
		fill:{{meta.alarmHvColor}};
		transition:all 0.2s ease-in-out;
	}

	/* digital clock style */
	.time-garak{
		display:flex;
		padding:0px 0px;
		border:none;
	}
	.time-garak div{
		position:relative;
		width:35px;
		text-align:center;
	}
	.time-garak div:nth-child(1)::after,
	.time-garak div:nth-child(2)::after
	{
		content: '.';
		position:absolute;
		right:-3px;
	}
	.time-garak div:nth-child(6)::after,
	.time-garak div:nth-child(7)::after
	{
		content: ':';
		position:absolute;
		right:-3px;
	}
	.time-garak div:last-child{
		font-size:1em;
		display:flex;
		justify-content:start;
		align-items:center;
		color:#ffffff;
	}
	.time-garak div:nth-child(5)::after /*{
	animation:animate 1s steps(1) infinite;
	}*/
	*@keyframes animate {
		0% {
			opacity:1;
		}
		50% {
			opacity:0;
		}
	}


	/*자동 재생 버튼*/
	#{{id}} .formContent_cng{
		display: flex;
		justify-content:{{meta.align}};
		{{#if meta.textAlign}}
		flex-direction: row;
		{{else}}
		flex-direction: row-reverse;
		{{/if}}
	}
	#{{id}} #switch {
		position: absolute;
		/* hidden */
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}
	#{{id}} .switch_label{{id}} {
		position: relative;
		cursor: pointer;
		display: inline-block;
		width: {{meta.switchWidth}}px;
		height: {{meta.switchHeight}}px;
		background: {{@root.meta.btColor3}};
		border-radius: {{meta.swithBrRadius}}px;
		transition: {{meta.speed}}s;
		box-shadow: {{@root.meta.shadowX}}px {{@root.meta.shadowY}}px {{@root.meta.shadowBlur}}px {{meta.shadowColor}} inset;
		margin:0;
	}
	#{{id}} .switch_label{{id}}:hover {
		background: {{@root.meta.btColor2Hover}};
	}
	#{{id}} .onf_btn{{id}} {
		position: absolute;
		top: {{meta.padding}}px;
		left: calc(calc({{meta.switchWidth}}px - calc({{meta.switchHeight}}px - calc({{meta.padding}}px * 2))) - {{meta.padding}}px);
		display: inline-block;
		width: calc({{meta.switchHeight}}px - calc({{meta.padding}}px * 2));
		height:calc({{meta.switchHeight}}px - calc({{meta.padding}}px * 2));
		border-radius: 10px;
		background: {{@root.meta.btColor}};
		transition: {{meta.speed}}s;
		{{#if @root.meta.txtShadowStus}}
		box-shadow: {{@root.meta.shadowX}}px {{@root.meta.shadowY}}px {{@root.meta.shadowBlur}}px rgba(0,0,0,{{@root.meta.shadowOpacity}});
		{{/if}}
		background-size:{{meta.swIconSize}}px;
		background-position:center;
		background-repeat:no-repeat;
	}

	#{{id}} .text-custom{{id}} {
		font-family: {{meta.swFont.fontFamily}};
		font-size: {{meta.swFont.fontSize}}px;
		text-align: {{meta.swFont.textAlign}};
		font-weight: {{meta.swFont.fontWeight}};
		color: {{meta.swFont.color}};
		vertical-align: {{meta.swFont.verticalAlign}};
		letter-spacing: {{meta.swFont.letterSpacing}}px;
		line-height: {{meta.swFont.lineHeight}};
		font-style: {{meta.swFont.fontStyle}};
		text-decoration: {{meta.swFont.textDeco}};
		display:table-cell;
		background-image:{{meta.swFont.backgroundImage}};
		background-clip:text;

		{{#if meta.textAlign}}
		margin-right:{{meta.distance}}px;
		{{else}}
		margin-left:{{meta.distance}}px;
		{{/if}}

	}
	#{{id}} #switch:checked+.switch_label{{id}} {
		background: {{@root.meta.btColor1}};
	}

	#{{id}} #switch:checked+.switch_label{{id}}:hover {
		background: {{@root.meta.btColor2}};
	}

	/* move */
	#{{id}} #switch:checked+.switch_label{{id}} .onf_btn{{id}} {
		left: {{meta.padding}}px;
	}
	/*스위치버튼 설정 끝*/


	/*tooltip*/
	.custom-tooltip-styling{{id}}.ui-tooltip {
		background: rgba(0,0,0,0.8);
		box-shadow:2px 2px 7px rgba(0,0,0,0.5);
		border: 0; 
		font-family: Pretandard-Medium; 
		font-size: 13px; 
		padding: 4px 15px;
		color: #ffffff;
		border-radius: 5px;
		text-transform: uppercase;

	}
	.custom-tooltip-styling{{id}}.ui-tooltip:after  {
		border-top: 7px solid transparent;
		border-left: 7px solid transparent;
		border-right: 7px solid transparent;
		border-bottom: 7px solid rgba(0,0,0,0.8);
		content: "";
		position: absolute;
		top: -20%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
<div class="header_wrap">
	<div class="content_wrap">

    	{{#if meta.logo}}
    	<div class="logoWrap">
    		<svg version="1.1" id="kblifelogo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 349.1 49.4" style="enable-background:new 0 0 349.1 49.4;" xml:space="preserve" height="100%">
    			<style type="text/css">
    				.logo_icon {fill:#F8B500;}
    				.logo_txt {fill:#ffffff;}
    			</style>
    			<path class="logo_icon" d="M61.2,26.4l-0.5-0.3c-1.7-1.7-4.1-2.4-7.3-2.3C50.8,24,48.7,25,47.1,26c0,0,0,0,0-0.1c0-0.8,0.1-1.7,0.2-2.6
    																 c0.1-0.9,0.2-1.8,0.2-2.6c0-0.9-0.1-1.7-0.4-2.4C47,18.1,46.9,18,46.6,18c-0.9,0-2.5,0.6-2.9,1c0,0-0.2,0.5-0.2,0.5
    																 c0,0.9-0.2,3.6-0.4,3.9c0,0-0.1,0.3-0.1,0.3c-0.4,3.8-0.4,7.1,0,10c0,0.3,0.6,0.7,1,0.9c0.5,0.2,1.9-0.2,2.8-0.5
    																 c0,0,0.3-0.1,0.3-0.1c0.3,0,0.4-0.3,0.4-0.6c0,0,0-0.8,0-0.8c0.6-2.5,3.1-5.4,6-5.8c1.6-0.3,2.9,0.2,4,1.3c0.1,0.2,0.4,2-0.6,4
    																 c-0.8,1.5-2.4,2.8-4.5,3.6c-2,0.8-4.2,1.1-6.9,1c-0.1-0.1-2.5-1.7-2.5-1.7c-2.2-1.5-4.8-3.4-7.3-4.3c-0.4-0.2-1.2-0.8-1.7-1.2
    																 l-0.3-0.2c-1.4-1.1-4.1-2.9-6.2-4.3c0,0-1-0.6-1.2-0.8c0-0.1,0-0.2,0-0.2c0.1-0.1,1.4-0.9,1.4-0.9c1.9-1.1,2.8-1.6,2.9-1.9
    																 c0,0,0.2-0.1,0.2-0.1c0,0,4.7-2.6,4.7-2.6c4.5-2.5,9.6-5.3,12.2-8c0,0,0.1-0.4,0.1-0.4l0.1-0.4c0.2-0.6,0.2-1,0-1.6
    																 c0-0.2-0.2-0.3-0.4-0.4c-2.1-0.2-4.8,1-7.2,3.3c-0.6,0.5-1,0.8-1.5,1L38.4,12c-2.7,1.5-8.8,5.3-12,7.3c0.2-3.4,0.8-8.3,1.6-12.3
    																 L28,6.5c0,0-0.3-0.6-0.3-0.6l-0.2-0.4l-0.1,0c-0.6-0.3-1.2-0.2-1.5-0.1l-0.6,0.2l-0.8,0.3C24.2,5.9,24,6,24,6.1
    																 c-1.5,3.7-2.8,9.7-3.1,14.5c-3-1.9-5.8-3.3-7.2-4l0,0l-0.2,0c-0.5-0.1-1.1-0.4-1.7-0.8c-0.1,0-1.2-0.7-1.2-0.7L8.9,14
    																 c0,0-0.5-0.1-0.5-0.1C7.6,14,6.2,15,5.8,15.7c-0.1,0.1-0.1,0.2-0.1,0.3c0,0.1,0,0.3,0.1,0.4l0.1,0.4l0.1,0.2c0.8,0.9,3,2.3,5.1,3.4
    																 l2.4,1.3l3.7,2c0,0,0.6,0.5,0.6,0.5l0.4,0.3c0,0,0.1,0,0.1,0c-1,0.7-6.8,4.5-6.8,4.5L8,31.3c-0.3,0.2-1.7,0.9-2,1
    																 c-0.8,0.3-1.4,0.8-1.6,1.3l-0.1,0.2L4.3,34l0.3,0.2c0,0,0.4,0.2,0.4,0.2l0.4,0.3c0,0,0.4,0.1,0.4,0.1c0.6,0,1.5-0.3,3.3-1.1
    																 c1.6-0.7,5.9-3.3,7.7-4.4l0.8-0.5c0.3,0,0.7-0.2,1-0.5c0.4-0.3,1.2-0.8,1.7-1c0,0,0.3-0.2,0.6-0.3c0,0.1,0,0.2,0,0.2
    																 c0.1,5.6,0.4,9.7,1,12.9l0,0.1l0.1,0.1c0.3,0.4,0.6,1.8,1,3l0.7,2.4c0,0,0.2,0.2,0.2,0.2c0.4,0.3,1.6,0.7,2.4,0.6l0.2,0l0.1-0.3
    																 c0.1-0.4,0.1-0.7,0.1-1.1c0-0.4,0-0.9-0.1-1.5l-0.1-0.8c-0.3-3.9-0.5-9.6-0.5-13.4V29c0.7,0.4,3.6,2.3,3.6,2.3
    																 c5,3.2,12.5,8.1,17.1,9.4c0.2,0.1,0.5,0,0.7-0.2c0,0,0.7-0.4,0.7-0.4l0.1-0.1c0.3-0.1,0.4-0.6,0.5-1c3.8-0.2,9.2-1.7,12-5.3
    																 c1.1-1.4,1.6-3.1,1.6-4.6C62.2,28,61.9,26.9,61.2,26.4"/>

    			<g class="kblogo1">
    				<polygon class="logo_txt" points="75.4,11 79.9,11 79.9,23.5 95,11 101.3,11 85.4,23.6 102.6,39 96.3,39 79.9,24 79.9,39 75.4,39"/>
    				<path class="logo_txt" d="M105.8,11h13.8c6.6,0,10,2.2,10,6.9c0,3.4-2.4,5.7-5.5,6.4v0.1c4.5,0.5,6.6,3.5,6.6,6.8
    																	c0,4.2-3.1,7.8-10.7,7.8h-14.2V11z M110.2,22.8h9.1c3.4,0,5.9-1.3,5.9-4.3c0-2.6-1.2-4.4-6.4-4.4h-8.6V22.8z M110.2,35.9h8.8
    																	c5.5,0,6.9-2.1,6.9-4.9c0-3.2-2.2-5-7.2-5h-8.6V35.9z"/>
    			</g>

    			<g class="kblogo2">
    				<path class="logo_txt" d="M154.6,21.7l-12.8,0v5.5h13.8v3h-17.3V18.7h12.8v-4.6h-12.8V11h16.4V21.7z M159.1,39V10.4h3.6v7.9h3.4v3.1 h-3.4V39H159.1z"/>
    			</g>
    			<g class="kblogo3">
    				<path class="logo_txt" d="M177.9,10.4c1.3,0,2.5,0.2,3.7,0.6c1.1,0.4,2.1,1,3,1.8c0.9,0.8,1.6,1.8,2.1,3.1c0.5,1.2,0.7,2.7,0.7,4.3 c0,1.7-0.3,3.1-0.7,4.3c-0.5,1.2-1.2,2.3-2.1,3.1c-0.9,0.8-1.9,1.5-3,1.8c-1.2,0.4-2.4,0.6-3.7,0.6c-1.3,0-2.5-0.2-3.7-0.6 c-1.2-0.4-2.2-1-3-1.8c-0.9-0.8-1.6-1.8-2-3.1c-0.5-1.2-0.8-2.6-0.8-4.3c0-1.6,0.3-3.1,0.8-4.3c0.5-1.2,1.2-2.2,2-3.1 c0.9-0.8,1.9-1.4,3-1.8C175.4,10.6,176.6,10.4,177.9,10.4 M177.9,26.6c0.8,0,1.5-0.1,2.2-0.4c0.7-0.2,1.3-0.6,1.8-1.2 c0.5-0.5,0.9-1.2,1.2-2c0.3-0.8,0.4-1.7,0.4-2.9c0-1.1-0.1-2-0.4-2.9c-0.3-0.8-0.7-1.4-1.2-2c-0.5-0.5-1.1-0.9-1.8-1.2 c-0.7-0.2-1.5-0.4-2.2-0.4c-0.8,0-1.6,0.1-2.2,0.4c-0.7,0.3-1.3,0.7-1.8,1.2c-0.5,0.5-0.9,1.2-1.2,2c-0.3,0.8-0.5,1.8-0.5,2.9 c0,1.1,0.1,2.1,0.5,2.9c0.3,0.8,0.7,1.5,1.2,2c0.5,0.5,1.1,0.9,1.8,1.2C176.4,26.5,177.1,26.6,177.9,26.6 M190.7,10.4h3.6V39h-3.6 V10.4z"/>
    			</g>

    			<g class="kblogo4">
    				<path class="logo_txt" d="M223.6,24.2h-3.7v-9.5h3.7v-3.1h-23.5v3.1h3.7v9.5h-3.7v3.1h23.5V24.2z M216.3,24.2h-9v-9.5h9V24.2z"/>
    				<rect x="197.5" y="33.7" class="logo_txt" width="28.8" height="3.1"/>
    			</g>

    			<g class="kblogo5">
    				<path class="logo_txt" d="M243.9,14.1h2.8V11h-18.3v3.1h2.5v12.4h-2.5v3.1h18.7v-3.1h-3.2V14.1z M240.3,26.5h-5.9V14.1h5.9V26.5z"/>
    				<polygon class="logo_txt" points="253.4,18.3 253.4,10.4 249.8,10.4 249.8,39 253.4,39 253.4,21.4 257,21.4 257,18.3 	"/>
    			</g>

    			<g class="kblogo6">
    				<polygon class="logo_txt" points="284.3,25.3 264.3,25.3 264.3,21.4 283.9,21.4 283.9,18.3 264.3,18.3 264.3,14.6 284,14.6 284,11.6 260.7,11.6 260.7,28.4 284.3,28.4 	"/>
    				<rect x="258.1" y="33.7" class="logo_txt" width="28.8" height="3.1"/>
    			</g>

    			<g class="kblogo7">
    				<polygon class="logo_txt" points="292.2,11 288.7,11 288.7,29.3 305.6,29.3 305.6,26.2 292.2,26.2 	"/>
    				<polygon class="logo_txt" points="309.7,10.4 309.7,17.4 302.3,17.4 302.3,20.5 309.7,20.5 309.7,39 313.3,39 313.3,10.4 	"/>
    			</g>

    			<g class="kblogo8">
    				<path class="logo_txt" d="M324.7,24.4c1.2-0.7,2.3-1.4,3.3-2.4c1-0.9,2-1.9,2.8-3.2c0.8,1.2,1.7,2.3,2.8,3.2c1.1,0.9,2.2,1.7,3.4,2.4 c1.2,0.7,2.3,1.2,3.5,1.6c1.2,0.4,2.3,0.7,3.3,0.9v-3.1c0,0-0.3-0.1-0.8-0.2c-0.5-0.1-1.2-0.3-1.9-0.7c-0.8-0.3-1.6-0.7-2.5-1.3 c-0.9-0.5-1.8-1.2-2.6-2c-0.8-0.8-1.5-1.7-2.1-2.9c-0.6-1.1-1-2.4-1.1-3.9v-2.1h-4v2.1c-0.1,1.5-0.5,2.8-1,3.9 c-0.6,1.2-1.3,2.1-2.1,2.9c-0.8,0.8-1.7,1.5-2.6,2c-0.9,0.5-1.8,1-2.5,1.3c-0.8,0.3-1.4,0.5-1.9,0.7c-0.5,0.1-0.8,0.2-0.8,0.2v3.1 c1-0.2,2.1-0.5,3.3-0.9C322.4,25.6,323.6,25.1,324.7,24.4"/>
    				<rect x="316.5" y="33.7" class="logo_txt" width="28.7" height="3.1"/>
    			</g>
    		</svg>
    	</div>
    	{{/if}}
    	<div class="headerDiv" id="menuHeaderDiv0" style="display:none !important;">
    		<button class="headerBtn" onclick="widget.clickMainMenuBtn(this,0)" id="">메인</button>
    	</div>
    	<div class="headerDiv" id="menuHeaderDiv1" style="display:none !important;">
    		<button class="headerBtn" onclick="widget.clickMainMenuBtn(this,1)" id="">대시보드</button>
    	</div>
    	<div class="headerDiv" id="menuHeaderDiv2" style="display:none !important;">
    		<button class="headerBtn" onclick="widget.clickMainMenuBtn(this,2)" id="">일보고</button>
    	</div>
    	<div class="headerDiv" id="menuHeaderDiv3" style="display:none !important;">
    		<button class="headerBtn" onclick="widget.clickMainMenuBtn(this,3)" id="">지점별</button>
    	</div>
    	<div class="headerDiv" id="menuHeaderDiv4" style="display:none !important;">
    		<button class="headerBtn" onclick="widget.clickMainMenuBtn(this,4)" id="">주보고</button>
    	</div>
    	<div class="headerDiv" id="menuHeaderDiv5" style="display:none !important;">
    		<button class="headerBtn" onclick="widget.clickMainMenuBtn(this,5)" id="">조직현황</button>
    	</div>
    	<div class="headerDiv" id="menuHeaderDiv6" style="display:none !important;">
    		<button class="headerBtn" onclick="widget.clickMainMenuBtn(this,6)" id="">위해촉현황</button>
    	</div>
    	<div class="headerDiv" id="menuHeaderDiv7" style="display:none !important;">
    		<button class="headerBtn" onclick="widget.clickMainMenuBtn(this,7)" id="">트렌드</button>
    	</div>
    </div>
    <div class="tmwh_wrap">

    	{{#if meta.weather}}
    	<div id="weatherDiv" style="cursor:pointer" onclick="@widget.weatherClickFunc()"></div>
    	<section class="divide"></section>
    	{{/if}}

    	{{#if meta.date}}
    	<div class="newIntlDateTimeFormat2">
    		<div class="format"></div>
    	</div>
    	<section class="divide"></section>
    	{{/if}}

    	{{#if meta.update}}
    	<div class="update"><span class="title">{{meta.udtitle}}</span><span class="date">{{data.0.최종업데이트일시}}</span></div>
    	<section class="divide"></section>
    	{{/if}}

    	{{#if meta.autoSwitch}}
    	<div class="formContent_cng">
    		<div class="text-custom{{id}}">{{meta.text}}</div>
    		<div class="d-flex align-items-center">
    			<input type="checkbox" id="switch" onchange="@widget.slideShow(this)">
    			<label for="switch" class="switch_label{{id}}">
    				<span class="onf_btn{{id}}"></span>
    			</label>
    		</div>
    	</div>
    	<section class="divide"></section>
    	{{/if}}

    	{{#if meta.fullscreen}}
    	<div class="text-custom{{id}}">전체화면</div>
    	<div class="fullImg" onclick="@widget.fullscreenFunc()"><img id="screenImg" src="/images/475ef09a9d129574b1e489b7cf859567"></div>
    	<section class="divide"></section>
    	{{/if}}

    	{{#if meta.alarm}}
    	<div class="alarmImg" onclick="@widget.alaramClick()">
    		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="" viewBox="0 0 16 16" data-toggle="tooltip" data-placement="bottom" title="알람">
    			<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
    		</svg>
    	</div>
    	{{/if}}

    </div>

<script>
	/**
	* component를 사용할 준비가 되면 호출합니다.
	*/
	var whIconWidth = widget.getLayoutMetaData().whIconWidth;
	var whIconDistance = widget.getLayoutMetaData().whIconDistance;
	var retryCount = 0;
	var maxRetries = 3;

	widget.componentReadyHandler = function(componentId){

		// 그룹정보 조회
		var datasetId = '40887251fb4d91bf9389190a7b7bc1df';
		var param = {};

		$.ajax({
			type : 'post',
			url : BIX5.getContextPath() + '/api/datasources/' + datasetId,
			dataType : 'json',
			beforeSend : function(xhr){
				//대시보드 고유 토큰을 헤더에 설정합니다.
				xhr.setRequestHeader("Dashboard-Token", widget.getRoot().getDashboardToken());
				xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
			},
			//파라미터를 설정합니다. 사용하지 않더라도 빈 객체를 보내야 합니다.
			data: JSON.stringify(param),
			error: function(xhr, status, error){
				alert('AJAX 데이터셋 호출 에러');
				console.log('AJAX 데이터셋 호출 에러 발생');
				console.log(error);
			},
			success : function(result){
				widget.rdsFunc(result.dataset);
			}
		});

		var lm = widget.getLayoutMetaData();

		// 툴팁설정
		$(widget.querySelectorAll('[data-toggle="tooltip"]')).tooltip({
			position: {
				my: "center top",
				at: "center bottom"
			},
			tooltipClass: "custom-tooltip-styling"+widget.id
		});


		if(lm.date){
			const meta = widget.getLayoutMetaData();
			const option = meta.option;
			opt={
				day:'2-digit',
				month:'2-digit',
				year:'numeric',
				hour:'2-digit',
				minute:'2-digit',
				weekday:'short'
			}
			const nation = meta.nation;
			const format = widget.querySelector(".format");
			const interval = setInterval(function(){
				const now = new Intl.DateTimeFormat(nation,opt).format(new Date());
				format.textContent = now;
			},1000);
		}

		if(lm.weather){
			widget.baseTimeNow(); //단기예보 api
			setInterval(function() { widget.baseTimeNow(); }, 3600000); // 1시간마다 실행
		}

		if(lm.autoSwitch){
			widget.getSlide().addEventListener('autoSelectEvent', widget.autoSelectEventHandler);

			/*자동 슬라이드 버튼*/
			widget.switchEle = widget.querySelector('#switch');
			widget.switchEle.checked= true;
			widget.getSlide().addEventListener('clickMainMenuBtn', widget.clickMainMenuBtnHandler);
		}

		widget.addEventListener("dataComplete", widget.dataCompleteHandler);
	}

	var org_mng_gbn = "";
	widget.rdsFunc = function(e) {
		var group = e[0]?.그룹;

		const role = group;
		const roleGroups = {
			영업: ["사업본부장", "AM", "SM", "SL", "LP"],
			지사: ["지사본부장", "MD", "BM", "FC"],
			본부: ["본사"],
			본부2: ["본사2"]
		};

		// 문자열 → 배열로 변환 및 공백 제거
		const roles = role.split(",").map(item => item.trim());

		// 그룹 결과를 담을 Set (중복 제거 목적)
		const matchedGroups = new Set();

		// 각 역할이 어느 그룹에 속하는지 찾기
		roles.forEach(r => {
			for (const [group, groupRoles] of Object.entries(roleGroups)) {
				if (groupRoles.includes(r)) {
					matchedGroups.add(group);
				}
			}
		});

		var groupArr = [...matchedGroups];

		if (groupArr.length === 0) {
			return false;
		}

		// 우선순위에 따라 그룹 체크
		if (groupArr.includes('영업')) {
			org_mng_gbn = 'Y';
		} else if (groupArr.includes('지사')) {
			org_mng_gbn = 'J';
		} else if (groupArr.includes('본부')) {
			// 본부2가 함께 있으면 Z, 아니면 N
			if (groupArr.includes('본부2')) {
				org_mng_gbn = 'Z';
			} else {
				org_mng_gbn = 'N';
			}
		} else {
			return false;
		}
	}

	widget.dataCompleteHandler = function() {
		if (org_mng_gbn == 'J') {
			//widget.getDashboard().setSelectedIndex(Number(1));	
		}

		var menuHeaderDiv0 = document.getElementById("menuHeaderDiv0");
		var menuHeaderDiv1 = document.getElementById("menuHeaderDiv1");
		var menuHeaderDiv2 = document.getElementById("menuHeaderDiv2");
		var menuHeaderDiv3 = document.getElementById("menuHeaderDiv3");
		var menuHeaderDiv4 = document.getElementById("menuHeaderDiv4");
		var menuHeaderDiv5 = document.getElementById("menuHeaderDiv5");
		var menuHeaderDiv6 = document.getElementById("menuHeaderDiv6");
		var menuHeaderDiv7 = document.getElementById("menuHeaderDiv7");

		// 본부(본사)
		if (org_mng_gbn == 'N') {
			menuHeaderDiv0.style.display = '';
			menuHeaderDiv1.style.display = '';
			menuHeaderDiv2.style.display = '';
			menuHeaderDiv3.style.display = '';
			menuHeaderDiv4.style.display = '';
			menuHeaderDiv5.style.display = '';
			menuHeaderDiv6.style.display = '';

			widget.getDashboard().setSelectedIndex(Number(0));
			$(widget.querySelector(" .headerBtn.active")).removeClass("active");
			document.querySelector("#menuHeaderDiv0 button").classList.add("active");
		}
		// 본부2(본사2)
		else if (org_mng_gbn == 'Z') {
			menuHeaderDiv0.style.display = '';
			menuHeaderDiv1.style.display = '';
			menuHeaderDiv2.style.display = '';
			menuHeaderDiv3.style.display = '';
			menuHeaderDiv4.style.display = '';
			menuHeaderDiv5.style.display = '';
			menuHeaderDiv6.style.display = '';
			menuHeaderDiv7.style.display = '';

			widget.getDashboard().setSelectedIndex(Number(0));
			$(widget.querySelector(" .headerBtn.active")).removeClass("active");
			document.querySelector("#menuHeaderDiv0 button").classList.add("active");
		}
		// 영업조직
		else if (org_mng_gbn == 'Y') {
			menuHeaderDiv0.style.display = '';
			menuHeaderDiv1.style.display = '';
			menuHeaderDiv2.style.display = '';
			menuHeaderDiv3.style.display = '';
			menuHeaderDiv4.style.display = '';
			menuHeaderDiv5.style.display = '';

			widget.getDashboard().setSelectedIndex(Number(0));
			$(widget.querySelector(" .headerBtn.active")).removeClass("active");
			document.querySelector("#menuHeaderDiv0 button").classList.add("active");
		}
		// 지사조직
		else {
			menuHeaderDiv1.style.display = '';
			menuHeaderDiv2.style.display = '';
			menuHeaderDiv3.style.display = '';
			menuHeaderDiv4.style.display = '';

			$(widget.querySelector(" .headerBtn.active")).removeClass("active");
			document.querySelector("#menuHeaderDiv1 button").classList.add("active");
		}
	}

	//===========================================================
	widget.alaramClick = function(){

		window.parent.postMessage({ childData : 'alert' }, '*');

		/*
		if(parent.document)
			$('#alarm-view', parent.document).trigger("click");
			*/
	}

	//===================================================================

	widget.autoSelectEventHandler = function(e){
		var btnArr = widget.querySelectorAll('.headerBtn');
		let currentIndex = Array.from(btnArr).findIndex(btn => btn.classList.contains('active'));

		widget.isAutoClick = false;

		widget.startInterval = function() {
			widget.interval = setInterval(() => {
				currentIndex = (currentIndex + 1) % btnArr.length;
				widget.isAutoClick = true;
				btnArr[currentIndex].click();
				widget.isAutoClick = false;
			}, 10000);
		}

		if (e.detail) {
			clearInterval(widget.interval);
		} else {
			widget.startInterval();
		}
	}

	//===================================================================

	widget.clickMainMenuBtn = function(t,idx){

		if (!widget.isAutoClick){
			clearInterval(widget.interval);
		}

		/*
		if(idx > widget.getDashboard().getNumSlides() - 1 || [4,7].includes(idx)){
			Swal.fire({
				icon: 'info',
				title: '서비스 준비중입니다',
			});
			return;
		}
		*/

		widget.getDashboard().setSelectedIndex(Number(idx));
		$(widget.querySelector(" .headerBtn.active")).removeClass("active");
		$(t).addClass("active");
	}

	//===================================================================

	widget.fullscreenFunc = function(){
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
			document.getElementById("screenImg").src = "/images/475ef09a9d129574b1e489b7cf859567";
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
				document.getElementById("screenImg").src = "/images/4a2f6bf594e6d885be94d5bd77299b0d";
			}
		}
	}

	//==================================================================================

	widget.weatherClickFunc = function(){
		window.open('https://www.weather.go.kr/w/index.do', '_blnk');

	}
	//=================================================================================
	widget.baseTimeNow = function(){

		/**
		$.ajax({
			url:'https://db.garak.co.kr:8443/api/weather.do',
			method:"GET",
			dataType: "json",
			success : function(result){
				var weatherData = result.weatherInfo.today;


				var weatherString = weatherData.weather[0].description;
				var imgCode = weatherData.weather[0].icon;
				var imgCode2 = imgCode.replace(/n/g, "d");
				var imageUrl = `https://garak.bix5.nethttps://garak.bix5.net/static/images/${imgCode2}.png`;
				var tmp = weatherData.main.temp;

				var weatherDiv = widget.querySelector('#weatherDiv')
				weatherDiv.innerHTML= `${weatherString} ${Math.round(tmp)} °C<img src=${imageUrl} style="width:${whIconWidth}px;margin-left:
${whIconDistance}px;">`


			}
		})
		*/

		var today = new Date(); // 현재 날짜, 시간 데이터
		var year = today.getFullYear(); // 년도
		var month =  (today.getMonth() + 1 < 10 ? '0' : '' ) + (today.getMonth() + 1);  // 월
		var date = (today.getDate() < 10 ? '0' : '' ) + today.getDate();  // 날짜
		var hours = (today.getHours() < 10 ? '0' : '' ) + today.getHours() + '00'; // 시간
		var paramHours; // 기상청 시각 데이터를 넣을 변수

		var arr = ['0200', '0500', '0800', '1100', '1400', '1700', '2000', '2300']; 

		for(var i in arr){ // 기상청 단기예보 시각 갯수만큼 돈다
			var time = arr[i]; 
			if(time > hours){ // 기상청 단기예보 시각이 현재 시간보다 클 때
				paramHours = arr[i-2]; // 기상청 데이터가 baseTime의 1시간 후 데이터 부터 나오기 때문에 -2를 한다.
				break;
			}
		}

		// api url과 api key, 현재 날짜, 시각 데이터 등을 가져와 최종 url을 만든다. 
		var apiURL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
		var apiKey = "nEV3ii2%2B%2BQx%2FlOcC4W9PFXRDzAEeaL9saxCefl7bLKs6i1DIa9B1joBwZZfSj8V5whJnvwYyWMc7l7hL%2F9bqQA%3D%3D";
		var apiPage = "1";
		var apiRows = "1000";
		var apiDataType = "JSON";
		var apiBaseDate = year + "" + month + date;
		var apiBaseTime = paramHours;
		var apiNx = "62"; // 좌표 위치는 서울 고정
		var apiNy = "125"; 
		var searchURL = apiURL + "?serviceKey=" + apiKey + "&pageNo=" + apiPage + "&numOfRows=" + apiRows + "&dataType=" + apiDataType + "&base_date=" + apiBaseDate + "&base_time=" + apiBaseTime + "&nx=" + apiNx + "&ny=" + apiNy;

		// 위 url 을 기반으로 ajax를 호출한다.  

		$.ajax({
			url:searchURL,
			method:"GET",
			dataType: "json",
			success : function(result){
				var resultData = result.response.body.items.item;
				var categoryArr1 = ['TMP', 'PTY', 'SKY'];  // SKY 맑음(1), 구름많음(3), 흐림(4)
				var widget1Data = widget.filterFunc(apiBaseDate, categoryArr1, resultData, hours);
				var PTYstring=''
				var SKYstring='';
				var weatherString='';
				var imgURL=''

				if(widget1Data[2].fcstValue==0){
					PTYstring=''
				}else if(widget1Data[2].fcstValue==1){
					PTYstring='비'
					imgURL='https://garak.bix5.net/static/images/비.png'
				}else if(widget1Data[2].fcstValue==2){
					PTYstring='비/눈'
					imgURL='https://garak.bix5.net/static/images/비_눈.png'
				}else if(widget1Data[2].fcstValue==3){
					PTYstring='눈'
					imgURL='https://garak.bix5.net/static/images/눈.png'
				}else if(widget1Data[2].fcstValue==4){
					PTYstring='소나기'
					imgURL='https://garak.bix5.net/static/images/소나기.png'
				}

				if(widget1Data[2].fcstValue==0){
					if(widget1Data[1].fcstValue==1){
						SKYstring='맑음'
						imgURL='https://garak.bix5.net/static/images/맑음.png'
					}else if(widget1Data[1].fcstValue==3){
						SKYstring='구름많음'
						imgURL='https://garak.bix5.net/static/images/구름많음.png'
					}else if(widget1Data[1].fcstValue==4){
						SKYstring='흐림'
						imgURL='https://garak.bix5.net/static/images/흐림.png'
					}
					weatherString=SKYstring
				}else{
					weatherString=PTYstring
				}

				var weatherDiv = widget.querySelector('#weatherDiv');
				//	weatherDiv.innerHTML= `${weatherString} ${widget1Data[0].fcstValue} °C<img src=${imgURL} style="width:${whIconWidth}px;margin-left:
				//${whIconDistance}px;">`

				weatherDiv.innerHTML= `${weatherString} ${widget1Data[0].fcstValue} °C`
			},
			error : function(request, status, error){
				console.log("단기예보 (현재시각) ajax 에러");
				console.log(request);
				console.log(status);
				console.log(error);

				if(retryCount < maxRetries) {
					retryCount++;
					console.log(`재시도 중... (${retryCount}/${maxRetries})`);
					setTimeout(widget.baseTimeNow, 30000); // 1분 후에 다시 시도
				} else {
					alert("에러발생 콘솔창을 확인해주세요");
				}
			}

		})

	}

	//=================================================================================

	widget.filterFunc = function(today, categoryArr, data, hours){

		if(!today){
			var newData = data.filter(function(item, index, array){
				for(var i in categoryArr){
					var category = categoryArr[i];
					if(item.category == category)
						return item;
				}
			});
		} else if(!hours){
			var newData = data.filter(function(item, index, array){
				for(var i in categoryArr){
					var category = categoryArr[i];
					if(item.fcstDate == today && item.category == category)
						return item;
				}
			});
		}else{
			var newData = data.filter(function(item, index, array){
				for(var i in categoryArr){
					var category = categoryArr[i];
					if(item.fcstDate == today && item.category == category && item.fcstTime == hours)
						return item;
				}
			});
		}
		return newData;
	}

	//===================================================================

	widget.slideShow = function(e){
		var autoSelectEvent = BIX5.dashboard.createEvent('autoSelectEvent', false, false,widget.switchEle.checked);
		widget.getSlide().dispatchEvent(autoSelectEvent);
	}

	//=========================================================

	widget.clickMainMenuBtnHandler=function(e){
		isAutoClick=e.detail.isAutoClick
		if(!isAutoClick){
			widget.switchEle.checked= true;
		}
	}

	/**
	* 데이터 변형 사용자 정의 함수를 등록합니다.
	* 콜백함수에 인자로 topic, payload가 전달됩니다.
	* payload: 수신된 데이터. 해당 값은 참조된 값이기 때문에 유의하여 사용 바랍니다.
	*/
	widget.setTransformSourceHandler(function(topic, payload){
		return payload;
	});

	widget.componentRemoveHandler = function(){
		widget.getSlide().removeEventListener('autoSelectEvent', widget.autoSelectEventHandler);
		clearInterval(widget.interval);
		widget.getSlide().removeEventListener('clickMainMenuBtn', widget.clickMainMenuBtnHandler);
		widget.removeEventListener("dataComplete", widget.dataCompleteHandler);
	}
</script>
