'use client'

import { useState } from 'react'

// 차트 타입 템플릿
const CHART_TEMPLATES = [
  {
    id: 'line-chart',
    icon: '📈',
    name: '라인 차트',
    description: '시계열 데이터를 라인으로 표시',
    prompt: '시간에 따른 추이를 보여주는 라인 차트. X축은 날짜, Y축은 값. 여러 시리즈 비교 가능.',
    columns: '날짜, 당월, 전월, 목표',
    type: 'chart',
  },
  {
    id: 'bar-chart',
    icon: '📊',
    name: '바 차트',
    description: '카테고리별 값을 바로 비교',
    prompt: '카테고리별 실적을 보여주는 가로 바 차트. 그라데이션 색상, 값 라벨 표시.',
    columns: '분류, CMIP',
    type: 'chart',
  },
  {
    id: 'data-grid',
    icon: '📋',
    name: '데이터 그리드',
    description: '정렬 가능한 테이블 형태',
    prompt: '순위, 본부, 지점, 실적을 보여주는 데이터 그리드. 1~3위는 아이콘으로 표시, 숫자는 천단위 콤마.',
    columns: '순위, 본부, 지점, CMIP',
    type: 'chart',
  },
]

// HTML 위젯 템플릿
const WIDGET_TEMPLATES = [
  {
    id: 'kpi-card',
    icon: '💰',
    name: 'KPI 카드',
    description: '핵심 지표를 강조하는 카드',
    prompt: '그라데이션 배경의 KPI 카드. 제목, 큰 숫자 값, 증감률 표시. 증가는 빨강 화살표, 감소는 파랑 화살표.',
    columns: '총CMIP, 증감',
    type: 'widget',
  },
  {
    id: 'multi-kpi',
    icon: '🎯',
    name: '멀티 KPI',
    description: '여러 지표를 한 카드에',
    prompt: '하나의 카드에 여러 KPI를 세로로 나열. 각 항목에 제목, 값, 증감 표시. 구분선으로 분리.',
    columns: '전체, 전체증감, 신규, 신규증감',
    type: 'widget',
  },
  {
    id: 'animated-card',
    icon: '✨',
    name: '애니메이션 카드',
    description: '눈에 띄는 애니메이션 효과',
    prompt: '그라데이션 배경이 흐르는 애니메이션 + 두근두근(bounce) 효과 + 테두리 빛 효과가 있는 카드. 클릭하면 상세 팝업.',
    columns: '총CMIP, 총건수',
    type: 'widget',
  },
  {
    id: 'ranking-card',
    icon: '🏆',
    name: '순위 카드',
    description: '상위 순위를 카드로 표시',
    prompt: '1~3위를 보여주는 순위 카드. 금/은/동 아이콘, 이름, 실적 표시. 1위는 반짝이는 애니메이션.',
    columns: '순위, 이름, 실적',
    type: 'widget',
  },
  {
    id: 'button-group',
    icon: '🔘',
    name: '버튼 그룹',
    description: '새로고침, 내보내기 등 액션',
    prompt: '가로로 나열된 버튼들. 새로고침(파랑), 엑셀 내보내기(초록), 상세보기(회색). 호버 효과.',
    columns: '',
    type: 'widget',
  },
  {
    id: 'tab-filter',
    icon: '🔍',
    name: '탭 필터',
    description: '탭 형태의 필터 버튼',
    prompt: '탭 형태로 필터를 선택하는 버튼 그룹. 선택된 탭은 강조 표시. 클릭 시 다른 위젯에 이벤트 전달.',
    columns: '',
    type: 'widget',
  },
]

// 애니메이션 옵션
const ANIMATION_OPTIONS = [
  { id: 'none', name: '없음', icon: '⚪' },
  { id: 'bounce', name: '두근두근', icon: '💓' },
  { id: 'gradient', name: '그라데이션', icon: '🌈' },
  { id: 'blink', name: '반짝임', icon: '✨' },
  { id: 'border', name: '테두리 빛', icon: '💫' },
]

// 색상 테마
const COLOR_THEMES = [
  { id: 'kb', name: 'KB 옐로우', colors: ['#ffbc00', '#f38530'] },
  { id: 'blue', name: '블루', colors: ['#667eea', '#764ba2'] },
  { id: 'green', name: '그린', colors: ['#11998e', '#38ef7d'] },
  { id: 'orange', name: '오렌지', colors: ['#ff512f', '#f09819'] },
  { id: 'dark', name: '다크', colors: ['#434343', '#000000'] },
]

export default function Home() {
  const [description, setDescription] = useState('')
  const [columns, setColumns] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'chart' | 'widget' | 'custom'>('widget')
  const [selectedAnimation, setSelectedAnimation] = useState('none')
  const [selectedTheme, setSelectedTheme] = useState('kb')

  const handleGenerate = async (customDesc?: string, customCols?: string, widgetType?: string) => {
    const desc = customDesc || description
    const cols = customCols || columns
    
    if (!desc) return
    
    setIsLoading(true)
    try {
      // 애니메이션 및 테마 정보 추가
      let enhancedDesc = desc
      if (selectedAnimation !== 'none') {
        const animOption = ANIMATION_OPTIONS.find(a => a.id === selectedAnimation)
        enhancedDesc += `\n애니메이션: ${animOption?.name} 효과 적용`
      }
      const theme = COLOR_THEMES.find(t => t.id === selectedTheme)
      if (theme) {
        enhancedDesc += `\n색상: ${theme.colors[0]}에서 ${theme.colors[1]}로 그라데이션`
      }

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
    } catch (error) {
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
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const templates = activeTab === 'chart' ? CHART_TEMPLATES : WIDGET_TEMPLATES

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl shadow-lg shadow-orange-500/30">
                ⚡
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  BIX AI
                </h1>
                <p className="text-xs text-gray-400">BIX5 코드 자동 생성기</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-1 rounded bg-white/5">Claude Sonnet</span>
              <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-400">PRO</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* 탭 선택 */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('chart')}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'chart'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-orange-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            📊 차트
          </button>
          <button
            onClick={() => setActiveTab('widget')}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'widget'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-orange-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            🎨 HTML 위젯
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'custom'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-orange-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            ✏️ 직접 입력
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* 왼쪽: 입력 영역 (3칸) */}
          <div className="lg:col-span-2 space-y-5">
            {activeTab !== 'custom' ? (
              <>
                {/* 템플릿 갤러리 */}
                <div className="space-y-3">
                  <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <span>{activeTab === 'chart' ? '📊' : '🎨'}</span>
                    {activeTab === 'chart' ? '차트 타입' : '위젯 템플릿'}
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => handleTemplateClick(template)}
                        disabled={isLoading}
                        className="group p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all text-left disabled:opacity-50"
                      >
                        <div className="text-xl mb-1.5">{template.icon}</div>
                        <div className="font-medium text-sm text-white group-hover:text-amber-400 transition-colors">
                          {template.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {template.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 옵션 패널 */}
                {activeTab === 'widget' && (
                  <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    {/* 애니메이션 선택 */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 mb-2">✨ 애니메이션</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {ANIMATION_OPTIONS.map((anim) => (
                          <button
                            key={anim.id}
                            onClick={() => setSelectedAnimation(anim.id)}
                            className={`px-2.5 py-1.5 text-xs rounded-lg transition-all ${
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

                    {/* 색상 테마 */}
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 mb-2">🎨 색상 테마</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {COLOR_THEMES.map((theme) => (
                          <button
                            key={theme.id}
                            onClick={() => setSelectedTheme(theme.id)}
                            className={`px-2.5 py-1.5 text-xs rounded-lg transition-all flex items-center gap-1.5 ${
                              selectedTheme === theme.id
                                ? 'bg-white/10 border border-white/20'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                          >
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}
                            />
                            {theme.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* 직접 입력 */
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-semibold text-gray-300 mb-2">📝 원하는 위젯 설명</h2>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="예: 파란색 그라데이션 배경의 KPI 카드, 제목은 '총 매출', 큰 숫자로 값 표시, 증감률도 화살표와 함께..."
                    className="w-full h-28 p-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 resize-none text-sm text-white placeholder-gray-500 transition-all"
                  />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-gray-300 mb-2">📊 데이터 컬럼 (선택)</h2>
                  <input
                    type="text"
                    value={columns}
                    onChange={(e) => setColumns(e.target.value)}
                    placeholder="예: 매출액, 증감, 목표달성률"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 text-sm text-white placeholder-gray-500 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">SQL 결과 컬럼명을 콤마로 구분</p>
                </div>

                {/* 옵션 패널 */}
                <div className="space-y-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 mb-2">✨ 애니메이션</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {ANIMATION_OPTIONS.map((anim) => (
                        <button
                          key={anim.id}
                          onClick={() => setSelectedAnimation(anim.id)}
                          className={`px-2 py-1 text-xs rounded-lg transition-all ${
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
                </div>

                <button
                  onClick={() => handleGenerate()}
                  disabled={isLoading || !description}
                  className={`w-full py-3 rounded-xl font-semibold transition-all text-sm ${
                    isLoading || !description
                      ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black shadow-lg shadow-orange-500/25'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      생성 중...
                    </span>
                  ) : (
                    '⚡ 코드 생성'
                  )}
                </button>
              </div>
            )}

            {/* 사용 가이드 */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <h3 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                <span>📖</span> BIX5 적용 방법
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-300 text-xs">
                <li>템플릿 클릭 또는 직접 입력 후 코드 생성</li>
                <li><strong>복사</strong> 버튼 클릭</li>
                <li>BIX5 에디터 → <strong>HTML 위젯</strong> 추가</li>
                <li>HTML 탭에 붙여넣기 → <strong>저장</strong></li>
              </ol>
            </div>
          </div>

          {/* 오른쪽: 출력 영역 (3칸) */}
          <div className="lg:col-span-3 rounded-xl overflow-hidden border border-white/10 bg-[#111]">
            <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">generated-bix5-code.html</span>
              </div>
              {generatedCode && (
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors ${
                    copied 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-white/10 hover:bg-white/20 text-gray-300'
                  }`}
                >
                  {copied ? '✅ 복사됨!' : '📋 복사'}
                </button>
              )}
            </div>
            <div className="p-4 overflow-auto h-[600px]">
              <pre className="text-xs font-mono text-gray-300 whitespace-pre-wrap leading-relaxed">
                {isLoading ? (
                  <span className="text-amber-400 flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    AI가 BIX5 코드를 생성하고 있습니다...
                  </span>
                ) : generatedCode ? (
                  generatedCode
                ) : (
                  <span className="text-gray-500">
{`// 👈 왼쪽에서 템플릿을 선택하거나 직접 입력하세요

// ⚡ BIX5 코드가 여기에 생성됩니다
// 📋 복사 버튼을 눌러 BIX5 에디터에 붙여넣으세요

// 지원 기능:
// - Line2DChart, Bar2DChart, DataGrid
// - HTML 위젯 (KPI 카드, 버튼, 필터 등)
// - 애니메이션 (bounce, gradient, blink, border)
// - Handlebars 데이터 바인딩
// - 이벤트 핸들러`}
                  </span>
                )}
              </pre>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-gray-500">
          BIX AI © 2026 | BIX5 비개발자를 위한 AI 코드 생성기 | Powered by Claude
        </div>
      </footer>
    </div>
  )
}
