import React from 'react';
import { Reseller } from '../types';
import { ResellerCard } from './ResellerCard';

interface ResellerGridProps {
  resellers: Reseller[];
}

export const ResellerGrid: React.FC<ResellerGridProps> = ({ resellers }) => {
  if (resellers.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-700/50 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-xl text-gray-400 mb-2">Nenhum revendedor encontrado</p>
        <p className="text-sm text-gray-500">
          Tente ajustar os filtros ou fazer upload de um arquivo
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 text-sm text-gray-400">
        Exibindo {resellers.length} revendedor{resellers.length !== 1 ? 'es' : ''}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {resellers.map((reseller, index) => (
          <ResellerCard key={`${reseller.CodigoRevendedor}-${index}`} reseller={reseller} />
        ))}
      </div>
    </div>
  );
};
