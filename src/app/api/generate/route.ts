import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `당신은 BIX5 대시보드 솔루션 전문가입니다. 사용자의 요청에 따라 BIX5 HTML 위젯 코드를 생성합니다.

## BIX5 HTML 위젯 필수 규칙

1. **CSS 스코핑**: 모든 CSS 선택자는 반드시 #{{id}} 로 시작해야 합니다.
   - 올바른 예: #{{id}} .card { ... }
   - 잘못된 예: .card { ... }

2. **Handlebars 데이터 바인딩**:
   - 단일 값: {{data.[0].컬럼명}}
   - 숫자 포맷: {{NumberFormatter data.[0].컬럼명 precision=0 thousandsSeparator=","}}
   - 반복문: {{#each data}} ... {{/each}}

3. **JavaScript**: widget 객체 사용
   - widget.componentReadyHandler = function(componentId) {}
   - widget._customHandler = function(event) { ... }

## 출력 형식

반드시 아래 형식으로 코드만 출력하세요 (설명 없이):

<style>
  #{{id}} .클래스명 {
    /* CSS */
  }
</style>

<div class="컨테이너">
  <!-- HTML -->
</div>

<script>
// JavaScript (필요한 경우만)
</script>

## 디자인 가이드라인
- 모던하고 깔끔한 디자인
- 적절한 패딩과 마진
- 부드러운 그림자 효과
- 호버 효과 추가
- 반응형 고려

## 예제

### KPI 카드 예제
<style>
  #{{id}} .kpi-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    padding: 20px;
    color: white;
    text-align: center;
  }
  #{{id}} .kpi-value {
    font-size: 32px;
    font-weight: bold;
  }
  #{{id}} .kpi-label {
    font-size: 14px;
    opacity: 0.9;
  }
</style>

<div class="kpi-card">
  <div class="kpi-label">총 매출</div>
  <div class="kpi-value">{{NumberFormatter data.[0].매출액 precision=0 thousandsSeparator=","}}</div>
  <div class="kpi-unit">원</div>
</div>

### 버튼 예제
<style>
  #{{id}} .btn-group {
    display: flex;
    gap: 10px;
    padding: 10px;
  }
  #{{id}} .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
  }
  #{{id}} .btn-primary {
    background: #3b82f6;
    color: white;
  }
  #{{id}} .btn-primary:hover {
    background: #2563eb;
  }
</style>

<div class="btn-group">
  <button class="btn btn-primary" onclick="widget._refreshHandler(event)">
    🔄 새로고침
  </button>
</div>

<script>
widget._refreshHandler = function(event) {
  alert("새로고침!");
}
</script>

코드만 출력하세요. 설명이나 마크다운 코드블록 없이 순수 HTML/CSS/JS만 출력합니다.`

const WIDGET_PROMPTS: Record<string, string> = {
  'kpi-card': 'KPI 카드 (숫자를 강조하는 카드 위젯)',
  'button': '버튼 위젯',
  'card-grid': '카드 그리드 (여러 카드를 그리드로 배열)',
  'table': '데이터 테이블',
  'search': '검색/필터 UI',
  'custom': '사용자 정의 위젯',
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API 키가 설정되지 않았습니다. Vercel 환경변수를 확인해주세요.' },
        { status: 500 }
      )
    }

    const { widgetType, description, columns } = await request.json()

    if (!description) {
      return NextResponse.json({ error: '설명을 입력해주세요' }, { status: 400 })
    }

    const widgetTypeDesc = WIDGET_PROMPTS[widgetType] || '위젯'
    const columnsInfo = columns ? `\n\n사용 가능한 데이터 컬럼: ${columns}` : ''

    const userPrompt = `${widgetTypeDesc}를 만들어주세요.

요구사항:
${description}${columnsInfo}

BIX5 HTML 위젯 코드를 생성해주세요. #{{id}} 스코핑과 Handlebars 문법을 정확히 사용하세요.`

    // Dynamic import to avoid build-time error
    const OpenAI = (await import('openai')).default
    const openai = new OpenAI({ apiKey })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    let code = completion.choices[0]?.message?.content || ''
    
    // Remove markdown code blocks if present
    code = code.replace(/```html?\n?/g, '').replace(/```\n?/g, '').trim()

    return NextResponse.json({ code })
  } catch (error) {
    console.error('Error generating code:', error)
    return NextResponse.json(
      { error: '코드 생성 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
