// Normaliza telefone: remove caracteres não numéricos mas mantém formatação para exibição
export const normalizePhone = (phone: string): string => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');

  // Formatar telefone brasileiro
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }

  return cleaned;
};

// Verifica se a situação indica "ativo"
export const isActiveStatus = (status: string): boolean => {
  if (!status) return false;

  const normalizedStatus = status.toString().trim().toLowerCase();
  const activeValues = ['ativo', 'ativa', 'active', '1', 'sim', 'yes', 'true'];

  return activeValues.includes(normalizedStatus);
};

// Normaliza string removendo acentos e convertendo para lowercase
export const normalizeString = (str: string): string => {
  if (!str) return '';
  return str
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
};

// Formata CPF/CNPJ mantendo zeros à esquerda
export const formatCPFCNPJ = (value: string): string => {
  if (!value) return '';
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length === 11) {
    // CPF: 000.000.000-00
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else if (cleaned.length === 14) {
    // CNPJ: 00.000.000/0000-00
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  return value;
};
