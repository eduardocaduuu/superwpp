import React, { useState, useRef } from 'react';
import { parseFile } from '../utils/parseFile';
import { Reseller } from '../types';

interface FileUploaderProps {
  onDataLoaded: (data: Reseller[]) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onDataLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rowCount, setRowCount] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setFileName(file.name);

    const result = await parseFile(file);

    if (result.errors.length > 0) {
      setError(result.errors.join(', '));
      setIsLoading(false);
      setRowCount(0);
      return;
    }

    setRowCount(result.data.length);
    onDataLoaded(result.data);
    setIsLoading(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className={`glass-card p-8 transition-all duration-300 cursor-pointer ${
          isDragging ? 'border-neon-green border-2 bg-emerald-green/10' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-4">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-green to-lime-green flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          {/* Text */}
          <div className="text-center">
            <p className="text-lg font-semibold text-emerald-green mb-2">
              {isLoading ? 'Processando arquivo...' : 'Arraste ou clique para fazer upload'}
            </p>
            <p className="text-sm text-gray-400">
              Formatos aceitos: .xlsx, .csv
            </p>
          </div>

          {/* File info */}
          {fileName && !isLoading && (
            <div className="glass-card px-4 py-2 flex items-center gap-3">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-200">{fileName}</p>
                <p className="text-xs text-emerald-green">{rowCount} revendedores importados</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg px-4 py-3 max-w-md">
              <p className="text-sm text-red-400">⚠️ {error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
