'use client'

import { useState } from 'react'

// 차트 타입 템플릿
const CHART_TEMPLATES = [
  {
    id: 'line-chart',
    icon: '📈',
    name: '라인 차트',
    description: '시계열 추이',
    prompt: 'Line2DChart로 시간에 따른 추이. X축 날짜, Y축 값. 당월/전월/목표 비교.',
    columns: '영업일, 당월CMIP, 전월CMIP, 목표',
  },
  {
    id: 'bar-chart',
    icon: '📊',
    name: '바 차트',
    description: '카테고리 비교',
    prompt: 'Bar2DChart로 카테고리별 실적 비교. 그라데이션 색상, 라벨 표시.',
    columns: '분류, CMIP',
  },
  {
    id: 'combo-chart',
    icon: '🎯',
    name: '목표 vs 실적',
    description: '목표 달성률 차트',
    prompt: 'Combination2DChart로 목표 대비 실적. VTarget2DResultSeries로 실적, VTarget2DGoalSeries로 목표. 달성률 라벨 표시.',
    columns: '제휴사, 당월CMIP, 목표CMIP, 진행율',
  },
  {
    id: 'data-grid',
    icon: '📋',
    name: '데이터 그리드',
    description: '순위 테이블',
    prompt: 'DataGrid로 순위 테이블. 1-3위 아이콘, 숫자 천단위 콤마, labelJsFunction 사용.',
    columns: '순위, 본부, 지점, CMIP',
  },
]

// HTML 위젯 템플릿
const WIDGET_TEMPLATES = [
  {
    id: 'kpi-card',
    icon: '💰',
    name: 'KPI 카드',
    description: '핵심 지표 강조',
    prompt: 'KPI 카드. 그라데이션 배경, 제목, 큰 숫자, 증감 화살표. 증가=빨강, 감소=파랑.',
    columns: '총CMIP, 증감',
  },
  {
    id: 'multi-kpi',
    icon: '🎯',
    name: '멀티 KPI',
    description: '여러 지표 나열',
    prompt: 'HTML 위젯으로 여러 KPI 세로 나열. 각 항목에 제목, 값, 증감. {{#each meta.columns}} 사용. 구분선.',
    columns: '전체, 전체증감, 신규, 신규증감',
  },
  {
    id: 'animated-card',
    icon: '✨',
    name: '애니메이션 카드',
    description: 'bounce + gradient',
    prompt: '애니메이션 카드. 그라데이션 배경 흐름 + bounce 효과 + 테두리 빛. 클릭시 모달 팝업.',
    columns: '총CMIP, 총건수',
  },
  {
    id: 'tab-filter',
    icon: '🔘',
    name: '탭 버튼',
    description: '필터 탭 버튼',
    prompt: '탭 버튼 그룹. 클릭시 active 클래스 변경, BIX5.dashboard.createEvent로 이벤트 디스패치. propertyOptions로 색상/패딩 설정 가능.',
    columns: '',
  },
  {
    id: 'ranking-card',
    icon: '🏆',
    name: '순위 카드',
    description: '1-3위 강조',
    prompt: '순위 카드. 1위 금색 반짝임 애니메이션, 2위 은색, 3위 동색. setAggregateCompleteHandler로 순위 계산.',
    columns: '본부, 지점, CMIP',
  },
  {
    id: 'icon-card',
    icon: '🖼️',
    name: '아이콘 카드',
    description: '아이콘 + 값',
    prompt: 'HTML 카드. 왼쪽 아이콘(iconSrc), 오른쪽 제목+값+증감. iconWidth로 크기 조절. propertyOptions에 ResourceSelector 포함.',
    columns: '전체, 전체증감',
  },
]

// 애니메이션 옵션
const ANIMATION_OPTIONS = [
  { id: 'none', name: '없음', icon: '⚪' },
  { id: 'bounce', name: '두근두근', icon: '💓' },
  { id: 'gradient', name: '그라데이션', icon: '🌈' },
  { id: 'blink', name: '반짝임', icon: '✨' },
  { id: 'border', name: '테두리 빛', icon: '💫' },
  { id: 'fliping', name: '뒤집힘', icon: '🔄' },
]

// 색상 테마
const COLOR_THEMES = [
  { id: 'kb', name: 'KB 옐로우', colors: ['#ffbc00', '#f38530'] },
  { id: 'blue', name: '블루', colors: ['#667eea', '#764ba2'] },
  { id: 'green', name: '그린', colors: ['#11998e', '#38ef7d'] },
  { id: 'orange', name: '오렌지', colors: ['#ff512f', '#f09819'] },
  { id: 'dark', name: '다크', colors: ['#434343', '#000000'] },
]

// 출력 탭
type OutputTab = 'layout' | 'script' | 'options' | 'all'

export default function Home() {
  const [description, setDescription] = useState('')
  const [columns, setColumns] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'chart' | 'widget' | 'custom'>('widget')
  const [outputTab, setOutputTab] = useState<OutputTab>('all')
  const [selectedAnimation, setSelectedAnimation] = useState('none')
  const [selectedTheme, setSelectedTheme] = useState('kb')

  // 코드 섹션 분리 (# 레이아웃, # 스크립트, # 컴포넌트 옵션)
  const parseCodeSections = (code: string) => {
    // 섹션 헤더로 분리
    const layoutMatch = code.match(/# 레이아웃\s*([\s\S]*?)(?=# 스크립트|$)/i)
    const scriptMatch = code.match(/# 스크립트\s*([\s\S]*?)(?=# 컴포넌트 옵션|$)/i)
    const optionsMatch = code.match(/# 컴포넌트 옵션\s*([\s\S]*?)$/i)
    
    return {
      layout: layoutMatch ? layoutMatch[1].trim() : '',
      script: scriptMatch ? scriptMatch[1].trim() : '',
      options: optionsMatch ? optionsMatch[1].trim() : '',
      all: code
    }
  }

  const handleGenerate = async (customDesc?: string, customCols?: string, widgetType?: string) => {
    const desc = customDesc || description
    const cols = customCols || columns
    
    if (!desc) return
    
    setIsLoading(true)
    try {
      let enhancedDesc = desc
      if (selectedAnimation !== 'none') {
        const animOption = ANIMATION_OPTIONS.find(a => a.id === selectedAnimation)
        enhancedDesc += `\n애니메이션: ${animOption?.name} (${selectedAnimation}) 효과 적용. @keyframes 포함.`
      }
      const theme = COLOR_THEMES.find(t => t.id === selectedTheme)
      if (theme) {
        enhancedDesc += `\n색상: ${theme.colors[0]} ~ ${theme.colors[1]} 그라데이션`
      }
      enhancedDesc += `\n\n출력 형식: 레이아웃(XML/HTML+CSS), 스크립트(JS), 컴포넌트옵션(JSON) 모두 포함해서 생성.`

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          widgetType: widgetType || 'custom', 
          description: enhancedDesc, 
          columns: cols,
          options: { animation: selectedAnimation, theme: selectedTheme }
        }),
      })
      const data = await response.json()
      if (data.error) {
        setGeneratedCode(`// 에러: ${data.error}`)
      } else {
        setGeneratedCode(data.code || '// 코드 생성 실패')
      }
    } catch {
      setGeneratedCode('// 네트워크 에러가 발생했습니다.')
    }
    setIsLoading(false)
  }

  const handleTemplateClick = (template: typeof WIDGET_TEMPLATES[0]) => {
    setDescription(template.prompt)
    setColumns(template.columns)
    handleGenerate(template.prompt, template.columns, template.id)
  }

  const handleCopy = () => {
    const sections = parseCodeSections(generatedCode)
    const textToCopy = outputTab === 'all' ? generatedCode : sections[outputTab]
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const templates = activeTab === 'chart' ? CHART_TEMPLATES : WIDGET_TEMPLATES
  const sections = parseCodeSections(generatedCode)

  const getDisplayCode = () => {
    if (!generatedCode) return null
    if (outputTab === 'all') return generatedCode
    return sections[outputTab] || `// ${outputTab} 섹션을 찾을 수 없습니다.`
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-lg shadow-lg shadow-orange-500/30">
                ⚡
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  BIX AI
                </h1>
                <p className="text-xs text-gray-400">BIX5 코드 생성기</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-1 rounded bg-white/5">Claude Sonnet</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4">
        {/* 탭 선택 */}
        <div className="flex gap-1.5 mb-4">
          {(['chart', 'widget', 'custom'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {tab === 'chart' ? '📊 차트' : tab === 'widget' ? '🎨 위젯' : '✏️ 직접입력'}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-4">
          {/* 왼쪽: 입력 영역 */}
          <div className="lg:col-span-2 space-y-4">
            {activeTab !== 'custom' ? (
              <>
                {/* 템플릿 갤러리 */}
                <div className="grid grid-cols-2 gap-2">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateClick(template)}
                      disabled={isLoading}
                      className="group p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all text-left disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{template.icon}</span>
                        <span className="font-medium text-sm text-white group-hover:text-amber-400">
                          {template.name}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1">
                        {template.description}
                      </div>
                    </button>
                  ))}
                </div>

                {/* 옵션 */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 mb-2">✨ 애니메이션</h3>
                    <div className="flex flex-wrap gap-1">
                      {ANIMATION_OPTIONS.map((anim) => (
                        <button
                          key={anim.id}
                          onClick={() => setSelectedAnimation(anim.id)}
                          className={`px-2 py-1 text-xs rounded transition-all ${
                            selectedAnimation === anim.id
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-white/5 text-gray-400 hover:bg-white/10'
                          }`}
                        >
                          {anim.icon} {anim.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 mb-2">🎨 색상</h3>
                    <div className="flex flex-wrap gap-1">
                      {COLOR_THEMES.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => setSelectedTheme(theme.id)}
                          className={`px-2 py-1 text-xs rounded flex items-center gap-1 ${
                            selectedTheme === theme.id
                              ? 'bg-white/10 border border-white/20'
                              : 'bg-white/5 text-gray-400 hover:bg-white/10'
                          }`}
                        >
                          <div 
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}
                          />
                          {theme.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* 직접 입력 */
              <div className="space-y-3">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="원하는 위젯 설명..."
                  className="w-full h-24 p-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 resize-none text-sm text-white placeholder-gray-500"
                />
                <input
                  type="text"
                  value={columns}
                  onChange={(e) => setColumns(e.target.value)}
                  placeholder="데이터 컬럼: 매출액, 증감, 목표"
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 text-sm text-white placeholder-gray-500"
                />
                
                {/* 옵션 */}
                <div className="flex flex-wrap gap-1">
                  {ANIMATION_OPTIONS.slice(0, 4).map((anim) => (
                    <button
                      key={anim.id}
                      onClick={() => setSelectedAnimation(anim.id)}
                      className={`px-2 py-1 text-xs rounded ${
                        selectedAnimation === anim.id
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      {anim.icon}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleGenerate()}
                  disabled={isLoading || !description}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm ${
                    isLoading || !description
                      ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 text-black'
                  }`}
                >
                  {isLoading ? '생성 중...' : '⚡ 코드 생성'}
                </button>
              </div>
            )}

            {/* 가이드 */}
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <h3 className="font-semibold text-white text-xs mb-2">📖 BIX5 적용</h3>
              <ol className="list-decimal list-inside space-y-0.5 text-gray-300 text-xs">
                <li>템플릿 선택 → 코드 생성</li>
                <li>필요한 탭(레이아웃/스크립트/옵션) 복사</li>
                <li>BIX5 에디터 HTML 위젯에 붙여넣기</li>
                <li>데이터소스 연결 → 저장</li>
              </ol>
            </div>
          </div>

          {/* 오른쪽: 출력 영역 */}
          <div className="lg:col-span-3 rounded-xl overflow-hidden border border-white/10 bg-[#111] flex flex-col">
            {/* 출력 탭 */}
            <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/10">
              <div className="flex gap-1">
                {([
                  { id: 'all', label: '전체', icon: '📄' },
                  { id: 'layout', label: '레이아웃', icon: '🏗️' },
                  { id: 'script', label: '스크립트', icon: '⚙️' },
                  { id: 'options', label: '옵션', icon: '🎛️' },
                ] as const).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setOutputTab(tab.id)}
                    className={`px-2 py-1 text-xs rounded transition-all ${
                      outputTab === tab.id
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
              {generatedCode && (
                <button
                  onClick={handleCopy}
                  className={`px-2 py-1 text-xs rounded ${
                    copied ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-300'
                  }`}
                >
                  {copied ? '✅ 복사됨' : '📋 복사'}
                </button>
              )}
            </div>

            {/* 코드 출력 */}
            <div className="p-3 overflow-auto flex-1 max-h-[500px]">
              <pre className="text-xs font-mono text-gray-300 whitespace-pre-wrap leading-relaxed">
                {isLoading ? (
                  <span className="text-amber-400 flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    AI가 BIX5 코드 생성 중...
                  </span>
                ) : getDisplayCode() ? (
                  getDisplayCode()
                ) : (
                  <span className="text-gray-500">
{`// 👈 템플릿을 선택하거나 직접 입력하세요

// 생성되는 코드 구조:
// 🏗️ 레이아웃: <BIX5> 또는 <style>+<div>
// ⚙️ 스크립트: widget.componentReadyHandler 등
// 🎛️ 옵션: propertyOptions, layoutMetaData

// 지원 기능:
// - Line2DChart, Bar2DChart, Combination2DChart
// - DataGrid with labelJsFunction
// - HTML 위젯 (KPI, 탭, 순위 등)
// - 애니메이션 (bounce, gradient, blink)
// - 이벤트 디스패치 (createEvent)`}
                  </span>
                )}
              </pre>
            </div>

            {/* 데이터셋 가이드 */}
            {generatedCode && (
              <div className="px-3 py-2 bg-white/5 border-t border-white/10">
                <div className="text-xs text-gray-400">
                  <span className="text-amber-400 font-medium">💡 데이터 연결:</span>{' '}
                  bindingSource에 데이터셋 ID 입력 → 컬럼명은 data.[0].컬럼명으로 접근
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-3 text-center text-xs text-gray-500">
          BIX AI © 2026 | Powered by Claude
        </div>
      </footer>
    </div>
  )
}
