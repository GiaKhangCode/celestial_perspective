import React, { useState, useEffect } from 'react';
import { TarotResponse } from '../types';

interface TarotResultProps {
  result: TarotResponse;
  onReset: () => void;
}

const TarotResult: React.FC<TarotResultProps> = ({ result, onReset }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Determine if the card is reversed based on the AI response
  const isReversed = result.orientation.toLowerCase().includes('ngược');

  // Construct image URL based on cardId (using Sacred Texts PKT archive as a reliable source)
  const imageUrl = `https://www.sacred-texts.com/tarot/pkt/img/${result.cardId}.jpg`;

  const handleCardClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      // Delay showing content slightly to match the flip animation duration
      setTimeout(() => {
        setShowContent(true);
      }, 600);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col items-center">
      
      {/* 
        CARD FLIP AREA 
        This area stays visible always. The card flips in place.
      */}
      <div className="mb-10 relative group perspective-1000" style={{ perspective: '1000px' }}>
        <div 
          onClick={handleCardClick}
          className={`relative w-64 h-[380px] md:w-72 md:h-[430px] transition-all duration-1000 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : 'hover:-translate-y-2'}`}
          style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          
          {/* --- CARD BACK (Face Down) --- */}
          <div 
            className="absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-2xl border-2 border-gold-500/30 bg-mystic-900 overflow-hidden"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
             {/* Card Back Pattern */}
             <div className="w-full h-full bg-mystic-900 relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#aa8c2c 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }}></div>
                <div className="w-32 h-32 rounded-full border-2 border-gold-500/40 flex items-center justify-center bg-mystic-950/80 backdrop-blur-sm">
                   <span className="text-5xl animate-pulse-slow">✨</span>
                </div>
                
                {/* "Tap to Reveal" Hint - Only visible before flip */}
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <span className="inline-block px-3 py-1 bg-black/40 text-gold-400 text-xs uppercase tracking-widest rounded-full border border-gold-500/20 animate-bounce">
                    Chạm để lật bài
                  </span>
                </div>
             </div>
          </div>

          {/* --- CARD FRONT (Face Up) --- */}
          <div 
            className="absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-2xl bg-white overflow-hidden flex items-center justify-center"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden', 
              transform: 'rotateY(180deg)' 
            }}
          >
            {/* Real Tarot Image */}
            <div className={`w-full h-full p-2 bg-[#fffbf0] ${isReversed ? 'rotate-180' : ''} transition-transform duration-700`}>
               <img 
                 src={imageUrl} 
                 alt={result.cardName} 
                 className="w-full h-full object-contain border border-gray-900/10 rounded-lg"
                 onError={(e) => {
                   // Fallback if image fails
                   (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x500?text=' + encodeURIComponent(result.cardName);
                 }}
               />
            </div>
            
            {/* Overlay for Reversed Label if needed */}
            {isReversed && (
              <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-md transform rotate-180">
                NGƯỢC
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 
        READING CONTENT 
        Revealed only after the card is flipped 
      */}
      <div className={`w-full transition-all duration-1000 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none h-0 overflow-hidden'}`}>
        <div className="glass-panel rounded-2xl p-8 md:p-10 space-y-8 relative overflow-hidden">
          {/* Decorative top glow */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>

          <div className="text-center space-y-2">
            <div className="inline-block px-4 py-1 bg-white/10 rounded-full border border-white/10 backdrop-blur-md mb-4">
              <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-purple-300 font-serif">THÔNG ĐIỆP TAROT HÔM NAY</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-1 text-gold-400">{result.cardName}</h2>
            <p className="text-mystic-300 font-sans text-sm uppercase tracking-wider opacity-80">
              Vị trí: <span className={isReversed ? "text-red-300" : "text-green-300"}>{result.orientation}</span>
            </p>
          </div>

          <div className="space-y-6">
            {/* Section 1: Meaning */}
            <div className="relative bg-mystic-900/40 rounded-xl p-6 border border-mystic-500/20 transition-transform hover:scale-[1.01] duration-500">
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                <span className="text-xl">✨</span>
              </div>
              <h3 className="text-xl font-serif text-purple-300 mb-3 ml-6">Ý Nghĩa Lá Bài</h3>
              <p className="text-mystic-100 leading-relaxed font-sans">{result.meaning}</p>
            </div>

            {/* Section 2: Today's Interpretation */}
            <div className="relative bg-mystic-900/40 rounded-xl p-6 border border-mystic-500/20 transition-transform hover:scale-[1.01] duration-500 delay-100">
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                <span className="text-xl">🌞</span>
              </div>
              <h3 className="text-xl font-serif text-purple-300 mb-3 ml-6">Thông Điệp Hôm Nay</h3>
              <p className="text-mystic-100 leading-relaxed font-sans">{result.todayInterpretation}</p>
            </div>

            {/* Section 3: Advice */}
            <div className="relative bg-mystic-900/40 rounded-xl p-6 border border-mystic-500/20 transition-transform hover:scale-[1.01] duration-500 delay-200">
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                <span className="text-xl">🌱</span>
              </div>
              <h3 className="text-xl font-serif text-purple-300 mb-3 ml-6">Lời Khuyên</h3>
              <p className="text-mystic-100 leading-relaxed font-sans">{result.advice}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-center">
            <button
              onClick={onReset}
              className="text-mystic-300 hover:text-white text-sm font-sans tracking-wider underline decoration-mystic-500/50 hover:decoration-white underline-offset-4 transition-all"
            >
              RÚT LÁ BÀI KHÁC
            </button>
          </div>
        </div>
        
        <div className="text-center mt-6 pb-10">
          <p className="text-xs text-mystic-400/60 font-sans">
            *Việc giải bài Tarot chỉ mang tính chất giải trí và tham khảo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TarotResult;