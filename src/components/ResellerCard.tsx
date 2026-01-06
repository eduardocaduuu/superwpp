import React, { useState } from 'react';
import { Reseller } from '../types';
import { normalizePhone } from '../utils/normalize';

interface ResellerCardProps {
  reseller: Reseller;
}

export const ResellerCard: React.FC<ResellerCardProps> = ({ reseller }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCopyComplete = () => {
    const completeInfo = `
Nome: ${reseller.Nome}
Celular: ${normalizePhone(reseller.TelCelular)}
Residencial: ${normalizePhone(reseller.TelResidencial)}
Cidade: ${reseller.cidade}
    `.trim();

    handleCopy(completeInfo, 'complete');
  };

  const formatPhone = (phone: string) => {
    const normalized = normalizePhone(phone);
    return normalized || 'Não informado';
  };

  const cleanPhoneForCall = (phone: string) => {
    return phone.replace(/\D/g, '');
  };

  return (
    <div className="glass-card-hover p-6 flex flex-col h-full">
      {/* Header: Nome + Badge Status */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-white leading-tight flex-1 mr-2">
            {reseller.Nome || 'Sem nome'}
          </h3>
          <span className={reseller.isActive ? 'badge-active' : 'badge-inactive'}>
            {reseller.isActive ? 'ATIVO' : 'INATIVO'}
          </span>
        </div>

        {/* Código Revendedor + CPF/CNPJ */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <span className="text-emerald-green">ID:</span>
            <span>{reseller.CodigoRevendedor || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-emerald-green">Doc:</span>
            <span>{reseller.CPFCNPJ || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Destaque: Código Estrutura */}
      <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-emerald-green/10 to-lime-green/10 border border-emerald-green/30">
        <p className="text-xs text-gray-400 mb-1">Código Estrutura</p>
        <p className="text-2xl font-bold text-emerald-green">
          {reseller.CodigoEstrutura || 'N/A'}
        </p>
      </div>

      {/* Contatos */}
      <div className="space-y-3 mb-4 flex-1">
        {/* Celular */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1">
            <svg
              className="w-5 h-5 text-neon-green flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">Celular</p>
              {reseller.TelCelular ? (
                <a
                  href={`tel:${cleanPhoneForCall(reseller.TelCelular)}`}
                  className="text-sm text-gray-200 hover:text-neon-green transition-colors"
                >
                  {formatPhone(reseller.TelCelular)}
                </a>
              ) : (
                <p className="text-sm text-gray-500">Não informado</p>
              )}
            </div>
          </div>
          {reseller.TelCelular && (
            <button
              onClick={() => handleCopy(normalizePhone(reseller.TelCelular), 'celular')}
              className="p-2 glass-card hover:bg-emerald-green/10 rounded-lg transition-all"
              title="Copiar celular"
            >
              {copiedField === 'celular' ? (
                <svg
                  className="w-4 h-4 text-neon-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-emerald-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Residencial */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1">
            <svg
              className="w-5 h-5 text-lime-green flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">Residencial</p>
              {reseller.TelResidencial ? (
                <a
                  href={`tel:${cleanPhoneForCall(reseller.TelResidencial)}`}
                  className="text-sm text-gray-200 hover:text-lime-green transition-colors"
                >
                  {formatPhone(reseller.TelResidencial)}
                </a>
              ) : (
                <p className="text-sm text-gray-500">Não informado</p>
              )}
            </div>
          </div>
          {reseller.TelResidencial && (
            <button
              onClick={() => handleCopy(normalizePhone(reseller.TelResidencial), 'residencial')}
              className="p-2 glass-card hover:bg-emerald-green/10 rounded-lg transition-all"
              title="Copiar residencial"
            >
              {copiedField === 'residencial' ? (
                <svg
                  className="w-4 h-4 text-neon-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-emerald-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Cidade */}
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-emerald-green flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div className="flex-1">
            <p className="text-xs text-gray-500">Cidade</p>
            <p className="text-sm text-gray-200">{reseller.cidade || 'Não informado'}</p>
          </div>
        </div>
      </div>

      {/* Ação: Copiar Completo */}
      <button
        onClick={handleCopyComplete}
        className="btn-secondary w-full flex items-center justify-center gap-2"
      >
        {copiedField === 'complete' ? (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Copiado!
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copiar Contato Completo
          </>
        )}
      </button>
    </div>
  );
};
