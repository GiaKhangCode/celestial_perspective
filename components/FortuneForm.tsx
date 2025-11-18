import React, { useState } from 'react';
import { Topic, FortuneRequest } from '../types';

interface FortuneFormProps {
  onSubmit: (data: FortuneRequest) => void;
  isLoading: boolean;
}

const FortuneForm: React.FC<FortuneFormProps> = ({ onSubmit, isLoading }) => {
  const [birthdate, setBirthdate] = useState('');
  const [topic, setTopic] = useState<Topic>(Topic.GENERAL);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthdate && topic) {
      onSubmit({ birthdate, topic });
    }
  };

  // SVG Icons
  const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mystic-300 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
  );

  const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mystic-300 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
    </svg>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto relative z-10">
      
      <div className="space-y-2">
        <label htmlFor="birthdate" className="block text-sm font-medium text-mystic-100 font-sans tracking-wide">
          Ngày sinh
        </label>
        <div className="relative group">
          <CalendarIcon />
          <input
            type="date"
            id="birthdate"
            required
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-mystic-500/30 rounded-lg focus:ring-2 focus:ring-mystic-400 focus:border-transparent outline-none text-white placeholder-mystic-300 transition-all duration-300 hover:bg-white/15"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="topic" className="block text-sm font-medium text-mystic-100 font-sans tracking-wide">
          Bạn muốn tìm hiểu về?
        </label>
        <div className="relative group">
          <SparklesIcon />
          <select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value as Topic)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-mystic-500/30 rounded-lg focus:ring-2 focus:ring-mystic-400 focus:border-transparent outline-none text-white appearance-none cursor-pointer transition-all duration-300 hover:bg-white/15"
          >
            {Object.values(Topic).map((t) => (
              <option key={t} value={t} className="bg-mystic-900 text-white">
                {t}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-mystic-300">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-6 rounded-lg text-white font-serif font-bold text-lg tracking-widest transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-mystic-600/20
          ${isLoading 
            ? 'bg-mystic-700 cursor-not-allowed opacity-70' 
            : 'bg-gradient-to-r from-mystic-600 to-indigo-600 hover:from-mystic-500 hover:to-indigo-500 hover:shadow-mystic-500/50 border border-white/10'
          }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Đang hỏi ý kiến các vì sao...</span>
          </span>
        ) : (
          "XEM VẬN MỆNH CỦA TÔI"
        )}
      </button>
    </form>
  );
};

export default FortuneForm;