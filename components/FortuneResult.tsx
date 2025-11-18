import React from 'react';
import { FortuneResponse, Topic } from '../types';

interface FortuneResultProps {
  result: FortuneResponse;
  birthdate: string;
  topic: Topic;
  onReset: () => void;
}

const FortuneResult: React.FC<FortuneResultProps> = ({ result, birthdate, topic, onReset }) => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up relative z-10">
      <div className="glass-panel rounded-2xl p-8 md:p-10 space-y-8 relative overflow-hidden">
        {/* Decorative top glow */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50"></div>

        <div className="text-center space-y-2">
          <div className="inline-block px-4 py-1 bg-white/10 rounded-full border border-white/10 backdrop-blur-md mb-4">
             <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-gold-400 font-serif">KẾT QUẢ BÓI VUI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-1">Các Vì Sao Đã Lên Tiếng</h2>
          <p className="text-mystic-300 font-sans">
            Dự đoán về <span className="text-white font-semibold">{topic}</span> • Sinh ngày <span className="text-white font-semibold">{birthdate}</span>
          </p>
        </div>

        <div className="space-y-8">
          {/* Section 1: Personality */}
          <div className="relative bg-mystic-900/40 rounded-xl p-6 border border-mystic-500/20 transition-transform hover:scale-[1.01] duration-500">
            <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg border border-white/20">
               <span className="text-xl">🧬</span>
            </div>
            <h3 className="text-xl font-serif text-gold-400 mb-3 ml-6">Phân tích Tính cách</h3>
            <p className="text-mystic-100 leading-relaxed font-sans">{result.personality}</p>
          </div>

          {/* Section 2: Future */}
          <div className="relative bg-mystic-900/40 rounded-xl p-6 border border-mystic-500/20 transition-transform hover:scale-[1.01] duration-500 delay-100">
            <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg border border-white/20">
               <span className="text-xl">🔮</span>
            </div>
             <h3 className="text-xl font-serif text-gold-400 mb-3 ml-6">Dự đoán Tương lai</h3>
             <p className="text-mystic-100 leading-relaxed font-sans">{result.prediction}</p>
          </div>

          {/* Section 3: Advice */}
          <div className="relative bg-mystic-900/40 rounded-xl p-6 border border-mystic-500/20 transition-transform hover:scale-[1.01] duration-500 delay-200">
            <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg border border-white/20">
               <span className="text-xl">🌱</span>
            </div>
            <h3 className="text-xl font-serif text-gold-400 mb-3 ml-6">Lời khuyên cho Bạn</h3>
            <p className="text-mystic-100 leading-relaxed font-sans">{result.advice}</p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 text-center">
          <button
            onClick={onReset}
            className="text-mystic-300 hover:text-white text-sm font-sans tracking-wider underline decoration-mystic-500/50 hover:decoration-white underline-offset-4 transition-all"
          >
            HỎI CÂU KHÁC
          </button>
        </div>
      </div>
      
      <div className="text-center mt-6">
         <p className="text-xs text-mystic-400/60 font-sans">
           *Thông tin này chỉ mang tính chất giải trí và tham khảo.
         </p>
      </div>
    </div>
  );
};

export default FortuneResult;