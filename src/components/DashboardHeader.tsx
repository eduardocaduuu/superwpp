import React from 'react';
import { DashboardStats } from '../types';

interface DashboardHeaderProps {
  stats: DashboardStats;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ stats }) => {
  return (
    <div className="w-full">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-green via-lime-green to-neon-green bg-clip-text text-transparent mb-2">
          Dashboard de Revendedores
        </h1>
        <p className="text-gray-400">Visualização completa e moderna dos dados</p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total */}
        <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total</p>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-green/20 to-lime-green/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-emerald-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Ativos */}
        <div className="glass-card p-6 hover:scale-105 transition-all duration-300 border-neon-green/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Ativos</p>
              <p className="text-3xl font-bold text-neon-green">{stats.active}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-neon-green/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-neon-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Inativos */}
        <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Inativos</p>
              <p className="text-3xl font-bold text-gray-300">{stats.inactive}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Top Cidades */}
        <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-400 text-sm">Top Cidades</p>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-green/20 to-lime-green/20 flex items-center justify-center">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
          <div className="space-y-2">
            {stats.topCities.slice(0, 3).map((city, index) => (
              <div key={city.city} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-green font-bold text-sm">#{index + 1}</span>
                  <span className="text-gray-300 text-sm truncate max-w-[120px]">
                    {city.city}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">{city.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
