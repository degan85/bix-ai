import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// 레퍼런스 코드 로드 (빌드 시 포함)
async function loadReferenceCode(): Promise<string> {
  try {
    const refDir = path.join(process.cwd(), 'src/ref')
    const files = ['code1.md', 'code2.md', 'code3.md', 'code4.md']
    let content = ''
    
    for (const file of files) {
      try {
        const filePath = path.join(refDir, file)
        const fileContent = await fs.readFile(filePath, 'utf-8')
        content += `\n\n### ${file}\n${fileContent.slice(0, 3000)}...`
      } catch {
        // 파일 없으면 스킵
      }
    }
    return content
  } catch {
    return ''
  }
}

const SYSTEM_PROMPT = `당신은 BIX5 대시보드 솔루션 전문가입니다. 사용자의 요청에 따라 BIX5 위젯 코드를 생성합니다.

## BIX5 핵심 구조

### 1. 기본 XML 구조 (차트용)
\`\`\`xml
<BIX5 backgroundColor="transparent" fontSize="11" fontFamily="KBFGTextM">
  <Options>
    <Legend position="bottom" display="block"/>
  </Options>
  <UnitFormatter id="unitfmt" useThousandsSeparator="true" divisor="1000"/>
  <!-- 차트 컴포넌트 -->
</BIX5>
\`\`\`

### 2. HTML 위젯 구조 (커스텀 UI용)
모든 CSS는 #{{id}}로 스코핑 필수!
\`\`\`html
<style>
  #{{id}} .card { ... }
</style>
<div class="card">
  {{NumberFormatter data.[0].값 precision=0 thousandsSeparator=","}}
</div>
<script>
widget.componentReadyHandler = function(componentId) { };
</script>
\`\`\`

## 차트 타입별 코드

### Line2DChart (라인 차트)
\`\`\`xml
<Line2DChart showDataTips="true" dataTipDisplayMode="axis">
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
  <backgroundElements>
    <GridLines direction="horizontal">
      <horizontalStroke><Stroke color="#ddd5cc" weight="1"/></horizontalStroke>
    </GridLines>
  </backgroundElements>
</Line2DChart>
\`\`\`

### Bar2DChart (바 차트)
\`\`\`xml
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
        <Bar2DSeries xField="값" displayName="라벨" itemRenderer="SemiCircleBarItemRenderer" labelPosition="outside">
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
\`\`\`

### DataGrid (데이터 그리드)
\`\`\`xml
<DataGrid headerColors="[#dfdfdf,#dfdfdf]" color="#545045" 
  alternatingItemColors="[#ffffff,#f0f0f0]" fontSize="11" 
  selectionMode="none" headerHeight="28" rowHeight="24"
  horizontalGridLineColor="rgba(221,221,221,1)">
  <columns>
    <DataGridColumn dataField="컬럼명" headerText="헤더" textAlign="center" width="100"/>
    <DataGridColumn dataField="숫자" headerText="값" textAlign="right" 
      itemRenderer="HtmlItem" labelJsFunction="@widget.labelJsFunc"/>
  </columns>
</DataGrid>
\`\`\`

## Handlebars 문법

### 데이터 바인딩
- 단일 값: \`{{data.[0].컬럼명}}\`
- 숫자 포맷: \`{{NumberFormatter data.[0].값 precision=0 thousandsSeparator="," nanSign="-"}}\`
- 반복문: \`{{#each data}}{{this.컬럼명}}{{/each}}\`
- 조건부: \`{{#ifCond value '>' 0}}증가{{else}}감소{{/ifCond}}\`
- 메타 컬럼: \`{{#each meta.columns}}{{this.label}}{{/each}}\`
- lookup: \`{{lookup @root.meta.colors @index}}\`

### 증감 표시 패턴
\`\`\`html
<div class="distance{{#ifCond data.[0].증감 '>' 0}} up{{/ifCond}}{{#ifCond data.[0].증감 '<' 0}} down{{/ifCond}}">
  <svg viewBox="0 0 16 16"><path d="M7.022 1.566..."/></svg>
  {{NumberFormatter data.[0].증감 nanSign="-" useNegativeSign="false"}}
</div>
\`\`\`

## 애니메이션 패턴

### 두근두근 (bounce)
\`\`\`css
#{{id}} { animation: bounce{{id}} 3s infinite; }
@keyframes bounce{{id}} {
  0% { box-shadow:8px 8px 15px rgba(0,0,0,0.5); transform:scale(1); }
  50% { box-shadow:0px 2px 2px rgba(0,0,0,0.2); transform:scale(0.99); }
  100% { box-shadow:8px 8px 15px rgba(0,0,0,0.5); transform:scale(1); }
}
\`\`\`

### 그라데이션 애니메이션
\`\`\`css
#{{id}} {
  background-image: linear-gradient(130deg, #ffe476, #ffa800, #ffe476);
  background-size: 1100% 1100%;
  animation: animateBg{{id}} 10s linear infinite;
}
@keyframes animateBg{{id}} {
  0% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
\`\`\`

### 반짝임 (blink)
\`\`\`css
#{{id}} .val { animation: blink{{id}} 2.5s infinite; }
@keyframes blink{{id}} {
  0%, 22%, 36%, 75% { color: #fff; text-shadow: 0 0 0.6rem #ff5200; }
  28%, 33%, 82%, 97% { color: #333; text-shadow: none; }
}
\`\`\`

### 테두리 빛 애니메이션
\`\`\`css
#{{id}} .lightBorderspan span:nth-child(1) {
  top: 0; left: -100%; width: 100%; height: 2px;
  background: linear-gradient(90deg, transparent, #ff7400);
  animation: btn-anim1{{id}} 1s linear infinite;
}
@keyframes btn-anim1{{id}} { 0% { left: -100%; } 50%,100% { left: 100%; } }
\`\`\`

## 스크립트 패턴

### 기본 핸들러
\`\`\`javascript
widget.componentReadyHandler = function(componentId) {
  // 초기화
};

widget.setTransformSourceHandler(function(topic, payload) {
  // 데이터 변환 (예: 천원 단위)
  if (Array.isArray(payload)) {
    payload.forEach(row => {
      for (var k in row) {
        if (typeof row[k] === 'number') row[k] = row[k] / 1000;
      }
    });
  }
  return payload;
});

widget.componentRemoveHandler = function() { };
\`\`\`

### 순위 표시 함수
\`\`\`javascript
widget.labelJsFunctionRank = function(item, value, column) {
  if (item.순위 == 1) return '<img src="/images/gold.png">';
  if (item.순위 == 2) return '<img src="/images/silver.png">';
  if (item.순위 == 3) return '<img src="/images/bronze.png">';
  return value;
};
\`\`\`

### 숫자 포맷 함수
\`\`\`javascript
widget.labelJsFunctionNum = function(item, value, column) {
  if (typeof value === 'number') {
    return Math.floor(value).toLocaleString('ko-KR');
  }
  return value;
};
\`\`\`

### 이벤트 리스너
\`\`\`javascript
widget.getSlide().addEventListener("tabBtnClick", widget.tabBtnClickHandler);

widget.tabBtnClickHandler = function(e) {
  if (!e.detail?.value) return;
  widget.getBindingSourceObject().setParam({필터: e.detail.value});
  widget.getBindingSourceObject().serviceStart();
};
\`\`\`

### 모달 다이얼로그
\`\`\`javascript
widget.clickFunc = function() {
  var dialogEle = widget.querySelector('#' + widget.id + '-modal');
  widget.modal = $(dialogEle).dialog({
    title: '상세보기',
    autoOpen: false, width: 800, height: 600, modal: true
  });
  widget.modal.dialog("open");
};
\`\`\`

## 색상 팔레트 (KB 스타일)
- Primary: #ffbc00 (KB 옐로우)
- Secondary: #f38530 (오렌지)
- Accent: #c1550b (다크 오렌지)
- Text: #545045, #333333
- Border: #ddd5cc
- Up: #ef4d4d (빨강)
- Down: #0065ff (파랑)

## 출력 규칙
1. 코드만 출력 (설명 없이)
2. 마크다운 코드블록 사용하지 않음
3. CSS는 반드시 #{{id}}로 스코핑
4. 차트는 <BIX5> 태그로 감싸기
5. HTML 위젯은 <style>, <div>, <script> 순서로

사용자 요청에 맞는 BIX5 코드를 생성하세요.`

const WIDGET_TYPES: Record<string, string> = {
  'line-chart': '라인 차트 (Line2DChart)',
  'bar-chart': '바 차트 (Bar2DChart)',
  'data-grid': '데이터 그리드 (DataGrid)',
  'kpi-card': 'KPI 카드 (HTML 위젯)',
  'button': '버튼 위젯',
  'card-grid': '카드 그리드',
  'custom': '사용자 정의 위젯',
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다. Vercel 환경변수를 확인해주세요.' },
        { status: 500 }
      )
    }

    const { widgetType, description, columns, options } = await request.json()

    if (!description) {
      return NextResponse.json({ error: '설명을 입력해주세요' }, { status: 400 })
    }

    const widgetTypeDesc = WIDGET_TYPES[widgetType] || '위젯'
    const columnsInfo = columns ? `\n사용할 데이터 컬럼: ${columns}` : ''
    const optionsInfo = options ? `\n추가 옵션: ${JSON.stringify(options)}` : ''

    // 레퍼런스 코드 로드 (선택적)
    let referenceCode = ''
    try {
      referenceCode = await loadReferenceCode()
    } catch {
      // 레퍼런스 로드 실패해도 계속 진행
    }

    const userPrompt = `${widgetTypeDesc}를 만들어주세요.

요구사항:
${description}${columnsInfo}${optionsInfo}

${referenceCode ? `\n참고할 실제 BIX5 코드 예제:${referenceCode.slice(0, 5000)}` : ''}

BIX5 위젯 코드를 생성해주세요.`

    let code = ''

    // Anthropic API 우선 사용
    if (process.env.ANTHROPIC_API_KEY) {
      const Anthropic = (await import('@anthropic-ai/sdk')).default
      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [
          { role: 'user', content: SYSTEM_PROMPT + '\n\n' + userPrompt }
        ],
      })

      code = message.content[0].type === 'text' ? message.content[0].text : ''
    } else {
      // OpenAI fallback
      const OpenAI = (await import('openai')).default
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      })

      code = completion.choices[0]?.message?.content || ''
    }
    
    // Remove markdown code blocks if present
    code = code.replace(/```(?:xml|html|css|javascript)?\n?/g, '').replace(/```\n?/g, '').trim()

    return NextResponse.json({ code })
  } catch (error) {
    console.error('Error generating code:', error)
    return NextResponse.json(
      { error: '코드 생성 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
