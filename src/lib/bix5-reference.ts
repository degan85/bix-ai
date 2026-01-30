// BIX5 레퍼런스 코드에서 추출한 핵심 패턴들

export const BIX5_PATTERNS = {
  // 기본 구조
  root: `<BIX5 backgroundColor="transparent" alpha="1" fontSize="11" fontFamily="KBFGTextM">
  <Options>
    <Caption text="" height="1" color="#333333" textAlign="center" fontSize="15" fontFamily="NanumGothic"/>
    <Legend position="bottom" display="block" backgroundColor="#ffffff"/>
  </Options>
  <!-- 컴포넌트 -->
</BIX5>`,

  // 포매터들
  formatters: {
    number: `<NumberFormatter precision="0" id="정수(#,##0)"/>`,
    unit: `<UnitFormatter id="unitfmt" useThousandsSeparator="true" units="" unitSymbols="[,K,M,G,T]" divisor="1000" rounding="nearest"/>`,
    date: `<DateFormatter id="dateFmt" formatString="YYYY/MM/DD"/>`,
    currency: `<CurrencyFormatter id="통화(원)" alignSymbol="right" currencySymbol="원"/>`,
    percent: `<PercentFormatter id="퍼센트(%)" multiplyHundred="true"/>`,
  },

  // 차트 타입들
  charts: {
    line2D: `<Line2DChart showDataTips="true" dataTipDisplayMode="axis">
      <horizontalAxis>
        <CategoryAxis id="hAxis" categoryField="날짜"/>
      </horizontalAxis>
      <verticalAxis>
        <LinearAxis id="vAxis" formatter="{unitfmt}"/>
      </verticalAxis>
      <series>
        <Line2DSeries yField="값" displayName="라벨" itemRenderer="CircleItemRenderer" radius="4">
          <fills><SolidColor color="#f38530"/></fills>
          <lineStroke><Stroke color="#f38530" weight="3"/></lineStroke>
        </Line2DSeries>
      </series>
    </Line2DChart>`,

    bar2D: `<Bar2DChart showDataTips="true" barWidthRatio="0.7">
      <horizontalAxis>
        <LinearAxis id="hAxis" formatter="{unitfmt}"/>
      </horizontalAxis>
      <verticalAxis>
        <CategoryAxis id="vAxis" categoryField="분류"/>
      </verticalAxis>
      <series>
        <Bar2DSet type="clustered">
          <series>
            <Bar2DSeries xField="값" displayName="라벨" itemRenderer="SemiCircleBarItemRenderer">
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
    </Bar2DChart>`,

    dataGrid: `<DataGrid headerColors="[#dfdfdf,#dfdfdf]" color="#545045" 
      alternatingItemColors="[#ffffff,#f0f0f0]" fontSize="11" 
      selectionMode="none" headerHeight="28" rowHeight="24"
      horizontalGridLineColor="rgba(221,221,221,1)" 
      verticalGridLineColor="transparent">
      <columns>
        <DataGridColumn dataField="컬럼명" headerText="헤더" textAlign="center"/>
      </columns>
    </DataGrid>`,
  },

  // 애니메이션 패턴
  animations: {
    bounce: `@keyframes bounce{{id}} {
      0% { box-shadow:8px 8px 15px rgba(0,0,0,0.5); transform:scale(1); }
      50% { box-shadow:0px 2px 2px rgba(0,0,0,0.2); transform:scale(0.99); }
      100% { box-shadow:8px 8px 15px rgba(0,0,0,0.5); transform:scale(1); }
    }`,

    gradient: `@keyframes {{id}}animateBg {
      0% { background-position: 100% 100%; }
      100% { background-position: 0% 0%; }
    }`,

    blink: `@keyframes blink{{id}} {
      0%, 22%, 36%, 75% { 
        color: #fff;
        text-shadow: 0 0 0.6rem #ff5200, 0 0 1.5rem #ff5200;
      }
      28%, 33%, 82%, 97% { color: #333; text-shadow: none; }
    }`,

    fliping: `@keyframes fliping{{id}} {
      0%, 10% { transform: rotateY(0deg); }
      18% { transform: rotateY(90deg); }
      26%, 100% { transform: rotateY(0deg); }
    }`,
  },

  // HTML 위젯 스타일 패턴
  htmlWidget: {
    kpiCard: `<style>
  #{{id}} .c-box {
    width: 100%; height: 100%;
    padding: 0 {{@root.meta.rlPadding}}px;
    display: flex;
    {{#if @root.meta.bgGradient}}
    background-image: linear-gradient({{@root.meta.gradientDeg}}deg, {{@root.meta.gradientColorF}} 0%, {{@root.meta.gradientColorS}} 100%);
    {{/if}}
  }
  #{{id}} .title { font-family: KBFGDisplayM; font-size: 18px; color: #3c301d; }
  #{{id}} .val { font-family: KBFGDisplayB; font-size: 28px; color: #333; }
  #{{id}} .distance { background-color: rgba(255,243,200,0.5); padding: 5px 10px; border-radius: 30px; }
  #{{id}} .distance.up svg { fill: #ef4d4d; }
  #{{id}} .distance.down svg { fill: #0065ff; transform: rotate(180deg); }
</style>`,

    borderAnimation: `#{{id}} .lightBorderBox { position: relative; overflow: hidden; }
#{{id}} .lightBorderspan span { position: absolute; display: block; }
#{{id}} .lightBorderspan span:nth-child(1) { top: 0; left: -100%; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #ff7400); animation: btn-anim1{{id}} 1s linear infinite; }
@keyframes btn-anim1{{id}} { 0% { left: -100%; } 50%,100% { left: 100%; } }`,
  },

  // 스크립트 패턴
  scripts: {
    basic: `widget.componentReadyHandler = function(componentId) {
  // 초기화 코드
};

widget.setTransformSourceHandler(function(topic, payload) {
  // 데이터 변환 (예: 천원 단위로 변환)
  if (Array.isArray(payload)) {
    payload.forEach(row => {
      for (var k in row) {
        if (typeof row[k] === 'number') row[k] = row[k] / 1000;
      }
    });
  }
  return payload;
});

widget.componentRemoveHandler = function() {
  // 정리 코드
};`,

    eventHandler: `widget.getSlide().addEventListener("tabBtnClick", widget.tabBtnClickHandler);

widget.tabBtnClickHandler = function(e) {
  if (!e.detail?.value) return;
  var value = e.detail.value;
  widget.getBindingSourceObject().setParam({필터: value});
  widget.getBindingSourceObject().serviceStart();
};`,

    labelFunction: `widget.labelJsFunction = function(item, value, column) {
  if (typeof value === 'number') {
    return Math.floor(value).toLocaleString('ko-KR');
  }
  return value;
};`,

    modalDialog: `widget.clickFunc = function() {
  var dialogEle = widget.querySelector('#' + widget.id + '-modal');
  widget.modal = $(dialogEle).dialog({
    title: '상세보기',
    autoOpen: false,
    width: 800,
    height: 600,
    modal: true
  });
  widget.modal.dialog("open");
};`,
  },

  // Handlebars 헬퍼
  handlebars: {
    numberFormat: `{{NumberFormatter data.[0].컬럼명 precision=0 thousandsSeparator="," nanSign="-"}}`,
    ifCondition: `{{#ifCond value '>' 0}}증가{{else}}감소{{/ifCond}}`,
    each: `{{#each data}}{{this.컬럼명}}{{/each}}`,
    lookup: `{{lookup @root.meta.colors @index}}`,
    metaColumns: `{{#each meta.columns}}<div>{{this.label}}: {{lookup @root.data.[0] this.alias}}</div>{{/each}}`,
  },

  // 컴포넌트 옵션 패턴
  componentOptions: {
    propertyOption: `{
  "label": "제목",
  "control": "TextInput",
  "attribute": "titleText"
}`,
    fontController: `{
  "label": "폰트 설정",
  "control": "FontController",
  "attribute": "titleFont",
  "tools": ["fontFamily", "fontSize", "color", "fontWeight"]
}`,
    colorSelector: `{
  "label": "배경 색상",
  "control": "ColorSelector",
  "attribute": "bgColor",
  "useOpacity": true
}`,
    slideButton: `{
  "label": "애니메이션",
  "control": "SlideButton",
  "attribute": "useAnimation",
  "children": [...]
}`,
  },
}

// 차트 타입별 전체 예제
export const CHART_EXAMPLES = {
  lineChart: `<BIX5 backgroundColor="transparent" fontSize="11" fontFamily="KBFGTextM">
  <Options>
    <Legend position="bottom" display="block"/>
  </Options>
  <UnitFormatter id="unitfmt" useThousandsSeparator="true" divisor="1000"/>
  <Line2DChart showDataTips="true" dataTipDisplayMode="axis">
    <horizontalAxis>
      <CategoryAxis id="hAxis" categoryField="영업일"/>
    </horizontalAxis>
    <verticalAxis>
      <LinearAxis id="vAxis" formatter="{unitfmt}"/>
    </verticalAxis>
    <series>
      <Line2DSeries yField="당월" displayName="당월" itemRenderer="CircleItemRenderer" radius="4">
        <fills><SolidColor color="#f38530"/></fills>
        <lineStroke><Stroke color="#f38530" weight="3"/></lineStroke>
      </Line2DSeries>
      <Line2DSeries yField="전월" displayName="전월" lineStyle="dashLine">
        <fills><SolidColor color="#ffbc00"/></fills>
        <lineStroke><Stroke color="#ffbc00" weight="3"/></lineStroke>
      </Line2DSeries>
    </series>
    <backgroundElements>
      <GridLines direction="horizontal">
        <horizontalStroke><Stroke color="#ddd5cc" weight="1"/></horizontalStroke>
      </GridLines>
    </backgroundElements>
  </Line2DChart>
</BIX5>`,

  barChart: `<BIX5 backgroundColor="transparent" fontSize="13" fontFamily="KBFGTextM">
  <Options>
    <Legend display="none"/>
  </Options>
  <UnitFormatter id="unitfmt" useThousandsSeparator="true" divisor="1000"/>
  <Bar2DChart showDataTips="true" barWidthRatio="0.7">
    <horizontalAxis>
      <LinearAxis id="hAxis" formatter="{unitfmt}"/>
    </horizontalAxis>
    <verticalAxis>
      <CategoryAxis id="vAxis" categoryField="분류"/>
    </verticalAxis>
    <series>
      <Bar2DSet type="clustered">
        <series>
          <Bar2DSeries xField="CMIP" displayName="CMIP" itemRenderer="SemiCircleBarItemRenderer" labelPosition="outside">
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
  </Bar2DChart>
</BIX5>`,

  dataGrid: `<BIX5>
  <DataGrid headerColors="[#dfdfdf,#dfdfdf]" color="#545045" 
    alternatingItemColors="[#ffffff,#f0f0f0]" fontSize="11" 
    selectionMode="none" headerHeight="28" rowHeight="24"
    horizontalGridLineColor="rgba(221,221,221,1)">
    <columns>
      <DataGridColumn dataField="순위" headerText="순위" textAlign="center" width="36"
        itemRenderer="HtmlItem" labelJsFunction="@widget.labelJsFunctionRank"/>
      <DataGridColumn dataField="본부" headerText="본부" textAlign="center" width="69"/>
      <DataGridColumn dataField="지점" headerText="지점" textAlign="center" width="36"/>
      <DataGridColumn dataField="CMIP" headerText="CMIP" textAlign="right"
        itemRenderer="HtmlItem" labelJsFunction="@widget.labelJsFunctionNum"/>
    </columns>
  </DataGrid>
</BIX5>

<script>
widget.labelJsFunctionNum = function(item, value, column) {
  if (typeof value === 'number') {
    return Math.floor(value).toLocaleString('ko-KR');
  }
  return value;
};

widget.labelJsFunctionRank = function(item, value, column) {
  if (item.순위 <= 3) {
    return '<div style="color: #f38530; font-weight: bold;">' + value + '</div>';
  }
  return value;
};
</script>`,
}

// 색상 팔레트
export const COLOR_PALETTES = {
  kb: {
    primary: '#ffbc00',    // KB 옐로우
    secondary: '#f38530',  // 오렌지
    accent: '#c1550b',     // 다크 오렌지
    text: '#545045',       // 텍스트
    border: '#ddd5cc',     // 보더
    background: '#f6f6f6', // 배경
  },
  gradient: {
    yellow: 'linear-gradient(130deg, rgba(255,228,118,1) 0%, rgba(255,168,0,1) 100%)',
    blue: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    green: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  },
  status: {
    up: '#ef4d4d',   // 증가 (빨강)
    down: '#0065ff', // 감소 (파랑)
    equal: '#808080', // 동일 (회색)
  },
}
