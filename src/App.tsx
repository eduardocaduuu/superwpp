import { useState, useMemo } from 'react';
import { Reseller, DashboardStats } from './types';
import { normalizeString } from './utils/normalize';
import { exportToExcel } from './utils/exportExcel';
import { FileUploader } from './components/FileUploader';
import { DashboardHeader } from './components/DashboardHeader';
import { FiltersBar } from './components/FiltersBar';
import { ResellerGrid } from './components/ResellerGrid';

function App() {
  // Estado principal
  const [allResellers, setAllResellers] = useState<Reseller[]>([]);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [cityFilter, setCityFilter] = useState('');
  const [structureFilter, setStructureFilter] = useState('');

  // Listas únicas para dropdowns (memoizadas)
  const uniqueCities = useMemo(() => {
    const cities = allResellers
      .map(r => r.cidade)
      .filter(c => c && c.trim() !== '');
    return Array.from(new Set(cities)).sort();
  }, [allResellers]);

  const uniqueStructures = useMemo(() => {
    const structures = allResellers
      .map(r => r.CodigoEstrutura)
      .filter(s => s && s.trim() !== '');
    return Array.from(new Set(structures)).sort();
  }, [allResellers]);

  // Dados filtrados (memoizados para performance)
  const filteredResellers = useMemo(() => {
    return allResellers.filter(reseller => {
      // Filtro de status
      if (statusFilter === 'active' && !reseller.isActive) return false;
      if (statusFilter === 'inactive' && reseller.isActive) return false;

      // Filtro de cidade
      if (cityFilter && reseller.cidade !== cityFilter) return false;

      // Filtro de estrutura
      if (structureFilter && reseller.CodigoEstrutura !== structureFilter) return false;

      // Filtro de busca
      if (searchTerm) {
        const normalizedSearch = normalizeString(searchTerm);

        const searchableFields = [
          reseller.Nome,
          reseller.CodigoRevendedor,
          reseller.CPFCNPJ,
          reseller.TelCelular,
          reseller.TelResidencial,
          reseller.cidade,
          reseller.CodigoEstrutura,
        ];

        const matchesSearch = searchableFields.some(field =>
          normalizeString(field).includes(normalizedSearch)
        );

        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [allResellers, searchTerm, statusFilter, cityFilter, structureFilter]);

  // Estatísticas (memoizadas)
  const stats: DashboardStats = useMemo(() => {
    const total = allResellers.length;
    const active = allResellers.filter(r => r.isActive).length;
    const inactive = total - active;

    // Top 3 cidades por quantidade
    const cityCount: { [key: string]: number } = {};
    allResellers.forEach(r => {
      if (r.cidade && r.cidade.trim() !== '') {
        cityCount[r.cidade] = (cityCount[r.cidade] || 0) + 1;
      }
    });

    const topCities = Object.entries(cityCount)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    return { total, active, inactive, topCities };
  }, [allResellers]);

  const handleDataLoaded = (data: Reseller[]) => {
    setAllResellers(data);
    // Reset filtros quando carregar novos dados
    setSearchTerm('');
    setStatusFilter('all');
    setCityFilter('');
    setStructureFilter('');
  };

  const handleExport = () => {
    exportToExcel(filteredResellers, 'revendedores_filtrados');
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Upload Section */}
        <div className="mb-8">
          <FileUploader onDataLoaded={handleDataLoaded} />
        </div>

        {/* Dashboard Content */}
        {allResellers.length > 0 && (
          <>
            {/* Header com KPIs */}
            <DashboardHeader stats={stats} />

            {/* Filtros */}
            <FiltersBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              cityFilter={cityFilter}
              onCityChange={setCityFilter}
              structureFilter={structureFilter}
              onStructureChange={setStructureFilter}
              cities={uniqueCities}
              structures={uniqueStructures}
              onExport={handleExport}
              filteredCount={filteredResellers.length}
            />

            {/* Grid de Revendedores */}
            <ResellerGrid resellers={filteredResellers} />
          </>
        )}

        {/* Empty State Inicial */}
        {allResellers.length === 0 && (
          <div className="glass-card p-12 text-center mt-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-green/20 to-lime-green/20 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-emerald-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Pronto para começar!
            </h2>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Faça upload de uma planilha (.xlsx ou .csv) com os dados dos revendedores
              para visualizar o dashboard completo.
            </p>
            <div className="glass-card inline-block px-6 py-3">
              <p className="text-sm text-emerald-green font-medium">
                Colunas necessárias: Nome, CodigoEstrutura, Situacao
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
