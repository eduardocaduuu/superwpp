import React from 'react';

interface FiltersBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: 'all' | 'active' | 'inactive';
  onStatusChange: (value: 'all' | 'active' | 'inactive') => void;
  cityFilter: string;
  onCityChange: (value: string) => void;
  structureFilter: string;
  onStructureChange: (value: string) => void;
  cities: string[];
  structures: string[];
  onExport: () => void;
  filteredCount: number;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  cityFilter,
  onCityChange,
  structureFilter,
  onStructureChange,
  cities,
  structures,
  onExport,
  filteredCount,
}) => {
  return (
    <div className="w-full mb-8">
      <div className="glass-card p-6">
        {/* Search Bar and Export */}
        <div className="mb-4 flex gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-emerald-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar por nome, CPF/CNPJ, telefone, cidade, código..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="input-glass w-full pl-12 pr-4"
            />
          </div>

          {/* Export Button */}
          <button
            onClick={onExport}
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
            title={`Exportar ${filteredCount} registro${filteredCount !== 1 ? 's' : ''} para Excel`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="hidden md:inline">Exportar Excel</span>
            <span className="md:hidden">Excel</span>
            <span className="badge-active ml-1">{filteredCount}</span>
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Situação</label>
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value as 'all' | 'active' | 'inactive')}
              className="input-glass w-full cursor-pointer"
            >
              <option value="all">Todos</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Cidade</label>
            <select
              value={cityFilter}
              onChange={(e) => onCityChange(e.target.value)}
              className="input-glass w-full cursor-pointer"
            >
              <option value="">Todas as cidades</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Structure Filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Código Estrutura</label>
            <select
              value={structureFilter}
              onChange={(e) => onStructureChange(e.target.value)}
              className="input-glass w-full cursor-pointer"
            >
              <option value="">Todas as estruturas</option>
              {structures.map((structure) => (
                <option key={structure} value={structure}>
                  {structure}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || statusFilter !== 'all' || cityFilter || structureFilter) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {searchTerm && (
              <span className="badge-active">
                Busca: {searchTerm}
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-2 hover:text-white"
                >
                  ×
                </button>
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="badge-active">
                {statusFilter === 'active' ? 'Ativos' : 'Inativos'}
                <button
                  onClick={() => onStatusChange('all')}
                  className="ml-2 hover:text-white"
                >
                  ×
                </button>
              </span>
            )}
            {cityFilter && (
              <span className="badge-active">
                Cidade: {cityFilter}
                <button
                  onClick={() => onCityChange('')}
                  className="ml-2 hover:text-white"
                >
                  ×
                </button>
              </span>
            )}
            {structureFilter && (
              <span className="badge-active">
                Estrutura: {structureFilter}
                <button
                  onClick={() => onStructureChange('')}
                  className="ml-2 hover:text-white"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
