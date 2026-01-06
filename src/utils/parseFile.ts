import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Reseller } from '../types';
import { isActiveStatus, formatCPFCNPJ } from './normalize';

// Mapeamento de colunas: aceita variações comuns (case-insensitive)
const COLUMN_MAPPING: { [key: string]: string[] } = {
  CodigoRevendedor: ['codigorevendedor', 'codigo_revendedor', 'cod_revendedor', 'codigo revendedor'],
  Nome: ['nome', 'name', 'razao social', 'razaosocial'],
  CPFCNPJ: ['cpfcnpj', 'cpf/cnpj', 'cpf_cnpj', 'cpf cnpj', 'documento'],
  Situacao: ['situacao', 'situação', 'status', 'situacao_cadastral'],
  CodigoEstrutura: ['codigoestrutura', 'codigo_estrutura', 'cod_estrutura', 'codigo estrutura', 'estrutura', 'codigoestruturacomercial', 'codigoestrutura_comercial', 'codigo_estrutura_comercial', 'codigo estrutura comercial', 'estruturacomercial', 'estrutura_comercial', 'estrutura comercial'],
  TelResidencial: ['telresidencial', 'tel_residencial', 'telefone_residencial', 'tel residencial', 'fone residencial'],
  TelCelular: ['telcelular', 'tel_celular', 'telefone_celular', 'tel celular', 'celular', 'fone celular'],
  cidade: ['cidade', 'city', 'municipio', 'município']
};

// Detecta o nome real da coluna baseado nas variações
const findColumnName = (headers: string[], variations: string[]): string | null => {
  const normalizedHeaders = headers.map(h => h.toLowerCase().trim());

  for (const variation of variations) {
    const index = normalizedHeaders.indexOf(variation);
    if (index !== -1) {
      return headers[index];
    }
  }

  return null;
};

// Mapeia headers do arquivo para o formato esperado
const mapHeaders = (headers: string[]): { [key: string]: string } => {
  const mapping: { [key: string]: string } = {};

  console.log('📄 Headers originais da planilha:', headers);
  console.log('📄 Headers normalizados:', headers.map(h => h.toLowerCase().trim()));

  Object.entries(COLUMN_MAPPING).forEach(([targetField, variations]) => {
    const found = findColumnName(headers, variations);
    if (found) {
      mapping[targetField] = found;
      console.log(`✅ Mapeamento: "${targetField}" ← "${found}"`);
    } else {
      console.log(`❌ Campo "${targetField}" não encontrado. Variações procuradas:`, variations);
    }
  });

  return mapping;
};

// Processa os dados brutos para o formato Reseller
const processData = (rawData: any[], headerMapping: { [key: string]: string }): Reseller[] => {
  return rawData.map(row => {
    const reseller: Reseller = {
      CodigoRevendedor: row[headerMapping.CodigoRevendedor] || '',
      Nome: row[headerMapping.Nome] || '',
      CPFCNPJ: formatCPFCNPJ(row[headerMapping.CPFCNPJ] || ''),
      Situacao: row[headerMapping.Situacao] || '',
      CodigoEstrutura: row[headerMapping.CodigoEstrutura] || '',
      TelResidencial: row[headerMapping.TelResidencial] || '',
      TelCelular: row[headerMapping.TelCelular] || '',
      cidade: row[headerMapping.cidade] || '',
      isActive: isActiveStatus(row[headerMapping.Situacao] || '')
    };

    return reseller;
  });
};

// Valida se as colunas obrigatórias estão presentes
export const validateRequiredColumns = (headerMapping: { [key: string]: string }): string[] => {
  const requiredFields = ['Nome', 'CodigoEstrutura', 'Situacao'];
  const missing: string[] = [];

  console.log('🔍 Colunas detectadas:', headerMapping);
  console.log('📋 Colunas mapeadas:', Object.keys(headerMapping));

  requiredFields.forEach(field => {
    if (!headerMapping[field]) {
      missing.push(field);
      console.log(`❌ Coluna obrigatória "${field}" não encontrada`);
    } else {
      console.log(`✅ Coluna "${field}" encontrada como "${headerMapping[field]}"`);
    }
  });

  return missing;
};

// Parser para arquivos XLSX
export const parseXLSX = (file: File): Promise<{ data: Reseller[]; errors: string[] }> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Converte para JSON mantendo strings
        const rawData = XLSX.utils.sheet_to_json(worksheet, {
          defval: '',
          raw: false // Mantém como string para não perder zeros à esquerda
        });

        if (rawData.length === 0) {
          resolve({ data: [], errors: ['Arquivo vazio ou sem dados válidos'] });
          return;
        }

        // Mapeia headers
        const headers = Object.keys(rawData[0] as Record<string, unknown>);
        const headerMapping = mapHeaders(headers);

        // Valida colunas obrigatórias
        const missingColumns = validateRequiredColumns(headerMapping);
        if (missingColumns.length > 0) {
          resolve({
            data: [],
            errors: [`Colunas obrigatórias não encontradas: ${missingColumns.join(', ')}`]
          });
          return;
        }

        // Processa dados
        const processedData = processData(rawData, headerMapping);

        resolve({ data: processedData, errors: [] });
      } catch (error) {
        resolve({
          data: [],
          errors: [`Erro ao processar arquivo XLSX: ${error instanceof Error ? error.message : 'Erro desconhecido'}`]
        });
      }
    };

    reader.onerror = () => {
      resolve({ data: [], errors: ['Erro ao ler o arquivo'] });
    };

    reader.readAsBinaryString(file);
  });
};

// Parser para arquivos CSV
export const parseCSV = (file: File): Promise<{ data: Reseller[]; errors: string[] }> => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          if (results.data.length === 0) {
            resolve({ data: [], errors: ['Arquivo CSV vazio ou sem dados válidos'] });
            return;
          }

          // Mapeia headers
          const headers = Object.keys(results.data[0] as Record<string, unknown>);
          const headerMapping = mapHeaders(headers);

          // Valida colunas obrigatórias
          const missingColumns = validateRequiredColumns(headerMapping);
          if (missingColumns.length > 0) {
            resolve({
              data: [],
              errors: [`Colunas obrigatórias não encontradas: ${missingColumns.join(', ')}`]
            });
            return;
          }

          // Processa dados
          const processedData = processData(results.data, headerMapping);

          resolve({ data: processedData, errors: [] });
        } catch (error) {
          resolve({
            data: [],
            errors: [`Erro ao processar CSV: ${error instanceof Error ? error.message : 'Erro desconhecido'}`]
          });
        }
      },
      error: (error) => {
        resolve({ data: [], errors: [`Erro ao ler CSV: ${error.message}`] });
      }
    });
  });
};

// Parser principal: detecta tipo e chama parser apropriado
export const parseFile = async (file: File): Promise<{ data: Reseller[]; errors: string[] }> => {
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (extension === 'csv') {
    return parseCSV(file);
  } else if (extension === 'xlsx' || extension === 'xls') {
    return parseXLSX(file);
  } else {
    return { data: [], errors: ['Formato de arquivo não suportado. Use .xlsx ou .csv'] };
  }
};
