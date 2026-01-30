'use client'

import { useState } from 'react'

// 템플릿 갤러리 데이터
const TEMPLATES = [
  {
    id: 'kpi-sales',
    icon: '💰',
    name: '매출 KPI 카드',
    description: '총 매출을 보여주는 그라데이션 카드',
    prompt: '파란색-보라색 그라데이션 배경의 매출 KPI 카드. 상단에 "총 매출" 라벨, 중앙에 큰 숫자(천단위 콤마), 하단에 "원" 단위 표시. 깔끔하고 모던한 디자인.',
    columns: '매출액',
  },
  {
    id: 'kpi-multi',
    icon: '📊',
    name: '멀티 KPI 그리드',
    description: '여러 지표를 카드 그리드로 표시',
    prompt: '3열 그리드로 배열된 KPI 카드들. 각 카드에 아이콘, 라벨, 숫자값, 증감률 표시. 카드에 그림자 효과, 호버 시 살짝 위로 올라오는 애니메이션. 흰색 배경에 컬러 아이콘.',
    columns: 'icon, label, value, change, changeType',
  },
  {
    id: 'button-group',
    icon: '🔘',
    name: '액션 버튼 그룹',
    description: '새로고침, 내보내기 등 버튼 모음',
    prompt: '가로로 나열된 버튼 그룹. 새로고침(파란색), 엑셀 내보내기(초록색), 상세보기(회색) 버튼. 각 버튼에 이모지 아이콘 포함. 호버 시 색상 진해지는 효과.',
    columns: '',
  },
  {
    id: 'data-table',
    icon: '📋',
    name: '데이터 테이블',
    description: '정렬 가능한 데이터 테이블',
    prompt: '깔끔한 데이터 테이블. 헤더는 회색 배경, 행은 호버 시 하이라이트. 숫자는 오른쪽 정렬, 천단위 콤마. 테두리는 연한 회색.',
    columns: '날짜, 제품명, 카테고리, 매출액, 수량',
  },
  {
    id: 'search-filter',
    icon: '🔍',
    name: '검색/필터 바',
    description: '검색창과 필터 드롭다운',
    prompt: '검색 입력창과 카테고리 선택 드롭다운이 나란히 있는 필터 바. 검색창에 돋보기 아이콘, 드롭다운은 셀렉트 박스. 모던한 둥근 모서리 디자인.',
    columns: '',
  },
  {
    id: 'status-badge',
    icon: '🏷️',
    name: '상태 뱃지 카드',
    description: '상태별 색상 뱃지가 있는 카드',
    prompt: '리스트 형태의 카드들. 각 카드에 제목, 설명, 상태 뱃지(완료-초록, 진행중-파랑, 대기-회색) 표시. 카드 사이 간격 있고 그림자 효과.',
    columns: 'title, description, status',
  },
]

// 예제 프롬프트
const EXAMPLE_PROMPTS = [
  '이번 달 매출을 보여주는 파란색 카드, 숫자는 크게',
  '새로고침, 다운로드, 인쇄 버튼 3개가 나란히',
  '호버하면 커지는 카드 4개 그리드',
  '검색창 + 날짜 필터 + 카테고리 드롭다운',
]

export default function Home() {
  const [description, setDescription] = useState('')
  const [columns, setColumns] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'template' | 'custom'>('template')

  const handleGenerate = async (customDesc?: string, customCols?: string) => {
    const desc = customDesc || description
    const cols = customCols || columns
    
    if (!desc) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          widgetType: 'custom', 
          description: desc, 
          columns: cols 
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

  const handleTemplateClick = (template: typeof TEMPLATES[0]) => {
    setDescription(template.prompt)
    setColumns(template.columns)
    handleGenerate(template.prompt, template.columns)
  }

  const handleExampleClick = (prompt: string) => {
    setDescription(prompt)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl">
              ⚡
            </div>
            <div>
              <h1 className="text-xl font-bold">BIX AI</h1>
              <p className="text-sm text-gray-400">BIX5 코드를 자동으로 생성합니다</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* 탭 선택 */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('template')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'template'
                ? 'bg-white text-black'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            🎨 템플릿에서 시작
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'custom'
                ? 'bg-white text-black'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            ✏️ 직접 입력
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 왼쪽: 입력 영역 */}
          <div className="space-y-6">
            {activeTab === 'template' ? (
              /* 템플릿 갤러리 */
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-200">
                  템플릿 선택
                </h2>
                <p className="text-sm text-gray-400">
                  클릭하면 바로 코드가 생성됩니다
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateClick(template)}
                      disabled={isLoading}
                      className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left disabled:opacity-50"
                    >
                      <div className="text-2xl mb-2">{template.icon}</div>
                      <div className="font-medium text-white group-hover:text-blue-400 transition-colors">
                        {template.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {template.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* 직접 입력 */
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-200 mb-3">
                    원하는 위젯 설명
                  </h2>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="예: 파란색 배경에 매출을 보여주는 카드..."
                    className="w-full h-32 p-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none text-white placeholder-gray-500 transition-all"
                  />
                </div>

                {/* 예제 프롬프트 */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">💡 예제 (클릭해서 사용)</p>
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLE_PROMPTS.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleExampleClick(prompt)}
                        className="px-3 py-1.5 text-xs rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-200 mb-3">
                    데이터 컬럼 (선택)
                  </h2>
                  <input
                    type="text"
                    value={columns}
                    onChange={(e) => setColumns(e.target.value)}
                    placeholder="예: 매출액, 주문수, 고객명"
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-white placeholder-gray-500 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    SQL 결과 컬럼명을 콤마로 구분
                  </p>
                </div>

                <button
                  onClick={() => handleGenerate()}
                  disabled={isLoading || !description}
                  className={`w-full py-4 rounded-xl font-semibold transition-all ${
                    isLoading || !description
                      ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/25'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      생성 중...
                    </span>
                  ) : (
                    '⚡ 코드 생성'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* 오른쪽: 출력 영역 */}
          <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-sm text-gray-400 ml-2">generated-code.html</span>
              </div>
              {generatedCode && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {copied ? '✅ 복사됨!' : '📋 복사'}
                </button>
              )}
            </div>
            <div className="p-4 overflow-auto max-h-[500px]">
              <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
                {isLoading ? (
                  <span className="text-blue-400">⚡ AI가 코드를 생성하고 있습니다...</span>
                ) : generatedCode ? (
                  generatedCode
                ) : (
                  <span className="text-gray-500">
{`// 👈 왼쪽에서 템플릿을 선택하거나
// 직접 설명을 입력하세요

// 생성된 코드는 여기에 표시됩니다
// 복사 버튼을 눌러 BIX5에 붙여넣으세요`}
                  </span>
                )}
              </pre>
            </div>
          </div>
        </div>

        {/* 사용 가이드 */}
        <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10">
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">📖</span> BIX5에 적용하는 방법
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
            <li>위에서 코드를 생성하고 <strong>복사</strong> 버튼 클릭</li>
            <li>BIX5 에디터에서 <strong>HTML 위젯</strong> 추가</li>
            <li>HTML 탭에 복사한 코드 <strong>붙여넣기</strong></li>
            <li>데이터소스 연결 후 <strong>저장</strong></li>
          </ol>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          BIX AI © 2026 | BIX5 비개발자를 위한 AI 코드 생성기
        </div>
      </footer>
    </div>
  )
}
