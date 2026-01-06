import * as XLSX from 'xlsx';
import { Reseller } from '../types';

export const exportToExcel = (data: Reseller[], filename: string = 'revendedores_filtrados') => {
  // Prepara os dados para exportação (sem o campo isActive que é interno)
  const exportData = data.map(reseller => ({
    'Código Revendedor': reseller.CodigoRevendedor,
    'Nome': reseller.Nome,
    'CPF/CNPJ': reseller.CPFCNPJ,
    'Situação': reseller.Situacao,
    'Código Estrutura': reseller.CodigoEstrutura,
    'Telefone Residencial': reseller.TelResidencial,
    'Telefone Celular': reseller.TelCelular,
    'Cidade': reseller.cidade
  }));

  // Cria worksheet
  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Ajusta largura das colunas automaticamente
  const columnWidths = [
    { wch: 18 }, // Código Revendedor
    { wch: 30 }, // Nome
    { wch: 18 }, // CPF/CNPJ
    { wch: 12 }, // Situação
    { wch: 18 }, // Código Estrutura
    { wch: 18 }, // Telefone Residencial
    { wch: 18 }, // Telefone Celular
    { wch: 20 }  // Cidade
  ];
  worksheet['!cols'] = columnWidths;

  // Cria workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Revendedores');

  // Gera arquivo e faz download
  const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const finalFilename = `${filename}_${timestamp}.xlsx`;

  XLSX.writeFile(workbook, finalFilename);
};
