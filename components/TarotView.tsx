import React from 'react';

interface TarotViewProps {
  onDraw: () => void;
  isLoading: boolean;
}

const TarotView: React.FC<TarotViewProps> = ({ onDraw, isLoading }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-md mx-auto relative z-10 animate-fade-in">
      <div className="text-center space-y-2 mb-4">
         <h2 className="text-2xl font-serif text-white">Tarot Hàng Ngày</h2>
         <p className="text-mystic-300 text-sm">Tĩnh tâm và rút một lá bài để nhận thông điệp từ vũ trụ.</p>
      </div>

      {/* Card Deck Visual */}
      <button 
        onClick={onDraw}
        disabled={isLoading}
        className={`relative w-56 h-80 md:w-64 md:h-96 rounded-xl shadow-2xl transition-all duration-700 transform perspective-1000
          ${isLoading ? 'animate-pulse-slow scale-95 brightness-110' : 'hover:-translate-y-4 hover:shadow-gold-500/40 hover:rotate-1 group cursor-pointer'}`}
      >
         {/* Card Back Design */}
         <div className="absolute inset-0 bg-gradient-to-br from-mystic-800 to-mystic-950 rounded-xl border-2 border-gold-500/30 p-3 overflow-hidden">
           <div className="w-full h-full border border-gold-500/20 rounded-lg flex items-center justify-center bg-mystic-900/50 relative">
              {/* Pattern Background */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#aa8c2c 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
              
              {/* Center Emblem */}
              <div className="w-24 h-24 rounded-full border-2 border-gold-400/50 flex items-center justify-center relative z-10 bg-mystic-900/80 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                <span className="text-4xl filter drop-shadow-lg">✨</span>
              </div>
              
              {/* Corner decorations */}
              <div className="absolute top-2 left-2 text-gold-500/40">✦</div>
              <div className="absolute top-2 right-2 text-gold-500/40">✦</div>
              <div className="absolute bottom-2 left-2 text-gold-500/40">✦</div>
              <div className="absolute bottom-2 right-2 text-gold-500/40">✦</div>
           </div>
           
           {/* Sheen effect */}
           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
         </div>
      </button>

      <button
        onClick={onDraw}
        disabled={isLoading}
        className={`w-full py-3 px-6 rounded-lg text-white font-serif font-bold text-lg tracking-widest transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-mystic-600/20
          ${isLoading 
            ? 'bg-mystic-700 cursor-not-allowed opacity-70' 
            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/50 border border-white/10'
          }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Đang Kết Nối Vũ Trụ...</span>
          </span>
        ) : (
          "RÚT BÀI NGAY"
        )}
      </button>
    </div>
  );
};

export default TarotView;
