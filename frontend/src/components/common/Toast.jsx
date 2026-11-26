import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Toast = () => {
  const { toast } = useAuth();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed top-6 right-6 z-50 max-w-md animate-bounce-short">
      <div 
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-card-glow border backdrop-blur-xl
          ${isSuccess ? 'bg-[#12241b]/95 border-[#2fd17b]/40 text-emerald-300' : ''}
          ${isError ? 'bg-[#281318]/95 border-rose-500/40 text-rose-300' : ''}
          ${!isSuccess && !isError ? 'bg-[#141b29]/95 border-sky-500/40 text-sky-300' : ''}
        `}
      >
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#2fd17b] flex-shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />}
        
        <p className="text-sm font-medium leading-tight">{toast.message}</p>
      </div>
    </div>
  );
};
