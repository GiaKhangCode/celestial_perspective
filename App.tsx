import React, { useState } from 'react';
import StarField from './components/ui/StarField';
import FortuneForm from './components/FortuneForm';
import FortuneResult from './components/FortuneResult';
import TarotView from './components/TarotView';
import TarotResult from './components/TarotResult';
import { generateFortune, generateTarotReading } from './services/geminiService';
import { FortuneRequest, UIState, AppMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('FORTUNE');
  const [uiState, setUiState] = useState<UIState>({
    isLoading: false,
    error: null,
    result: null,
    tarotResult: null,
  });

  const [requestData, setRequestData] = useState<FortuneRequest | null>(null);

  // Handle Fortune Telling
  const handleFortuneSubmit = async (data: FortuneRequest) => {
    setUiState({ ...uiState, isLoading: true, error: null, result: null });
    setRequestData(data);

    try {
      const result = await generateFortune(data);
      setUiState({ ...uiState, isLoading: false, error: null, result });
    } catch (error: any) {
      setUiState({ 
        ...uiState,
        isLoading: false, 
        error: error.message || "Đã xảy ra lỗi không mong muốn.", 
        result: null 
      });
    }
  };

  // Handle Tarot Drawing
  const handleTarotDraw = async () => {
    setUiState({ ...uiState, isLoading: true, error: null, tarotResult: null });

    try {
      const result = await generateTarotReading();
      setUiState({ ...uiState, isLoading: false, error: null, tarotResult: result });
    } catch (error: any) {
       setUiState({ 
        ...uiState,
        isLoading: false, 
        error: error.message || "Đã xảy ra lỗi không mong muốn.", 
        tarotResult: null 
      });
    }
  };

  const handleReset = () => {
    setUiState({ isLoading: false, error: null, result: null, tarotResult: null });
    setRequestData(null);
  };

  const switchMode = (newMode: AppMode) => {
    setMode(newMode);
    handleReset();
  };

  const hasResult = (mode === 'FORTUNE' && uiState.result) || (mode === 'TAROT' && uiState.tarotResult);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <StarField />
      
      {/* Content Wrapper */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-6 relative z-10">
        
        {/* Header Area */}
        <div className={`transition-all duration-700 ease-in-out flex flex-col items-center mb-6 ${hasResult ? 'mt-8 scale-90' : 'mt-0 scale-100'}`}>
          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg mb-6 animate-float transition-colors duration-500
            ${mode === 'FORTUNE' ? 'bg-gradient-to-tr from-gold-400 to-amber-600 shadow-gold-500/30' : 'bg-gradient-to-tr from-purple-500 to-indigo-600 shadow-purple-500/30'}`}>
             {mode === 'FORTUNE' ? (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
               </svg>
             ) : (
               <span className="text-3xl">🔮</span>
             )}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-mystic-300 text-center drop-shadow-lg">
            Góc Nhìn Thiên Thể
          </h1>
          
          {!hasResult && (
             <div className="mt-8 flex space-x-4 bg-white/5 p-1 rounded-full backdrop-blur-md border border-white/10">
               <button 
                 onClick={() => switchMode('FORTUNE')}
                 className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${mode === 'FORTUNE' ? 'bg-mystic-600 text-white shadow-lg' : 'text-mystic-300 hover:text-white'}`}
               >
                 XEM TỬ VI
               </button>
               <button 
                 onClick={() => switchMode('TAROT')}
                 className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${mode === 'TAROT' ? 'bg-purple-600 text-white shadow-lg' : 'text-mystic-300 hover:text-white'}`}
               >
                 BÓI TAROT
               </button>
             </div>
          )}
        </div>

        {/* Main Interaction Area */}
        <div className="w-full">
          {uiState.error && (
            <div className="max-w-md mx-auto mb-6 p-4 bg-red-900/20 border border-red-500/30 text-red-200 rounded-lg text-center backdrop-blur-sm">
              {uiState.error}
            </div>
          )}

          {mode === 'FORTUNE' ? (
            // FORTUNE MODE
            !uiState.result ? (
              <div className="animate-fade-in">
                <div className="glass-panel p-8 rounded-2xl max-w-lg mx-auto shadow-2xl">
                  <FortuneForm onSubmit={handleFortuneSubmit} isLoading={uiState.isLoading} />
                </div>
              </div>
            ) : (
              requestData && (
                <FortuneResult 
                  result={uiState.result} 
                  birthdate={requestData.birthdate} 
                  topic={requestData.topic} 
                  onReset={handleReset}
                />
              )
            )
          ) : (
            // TAROT MODE
            !uiState.tarotResult ? (
               <TarotView onDraw={handleTarotDraw} isLoading={uiState.isLoading} />
            ) : (
               <TarotResult 
                 result={uiState.tarotResult}
                 onReset={handleReset}
               />
            )
          )}
        </div>
      </div>
      
      <footer className="relative z-10 py-6 text-center text-mystic-500 text-xs font-sans">
        <p>&copy; {new Date().getFullYear()} Góc Nhìn Thiên Thể. Được tạo nên từ Bụi Sao.</p>
      </footer>
    </div>
  );
};

export default App;
