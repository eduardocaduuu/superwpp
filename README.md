# Dashboard de Revendedores

Dashboard moderno e futurista para visualização de dados de revendedores com design em gradientes verdes e interface glassmorphism.

## Características

- Upload de planilhas Excel (.xlsx) e CSV
- Design futurista com gradientes verdes e efeito glassmorphism
- Visualização em cards responsivos
- Busca avançada e filtros múltiplos
- KPIs em tempo real
- Copiar contatos para clipboard
- Click-to-call para telefones
- 100% client-side (sem backend)
- Otimizado para performance com 3.000+ registros

## Tecnologias

- React 18
- TypeScript
- Vite
- TailwindCSS
- xlsx (SheetJS) para parsing de Excel
- papaparse para parsing de CSV

## Instalação Local

### Pré-requisitos

- Node.js 16+ e npm

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/eduardocaduuu/superwpp.git
cd superwpp
```

2. Instale as dependências:
```bash
npm install
```

3. Rode o projeto em desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:5173
```

## Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

## Deploy no Render (Gratuito)

### Opção 1: Deploy via Dashboard do Render

1. Faça push do código para o GitHub
2. Acesse [render.com](https://render.com) e faça login
3. Clique em "New +" e selecione "Static Site"
4. Conecte seu repositório GitHub
5. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
6. Clique em "Create Static Site"

### Opção 2: Deploy via render.yaml (Recomendado)

Crie um arquivo `render.yaml` na raiz do projeto:

```yaml
services:
  - type: web
    name: reseller-dashboard
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

Depois faça push para o GitHub e conecte no Render.

## Formato da Planilha

### Colunas Obrigatórias

- `CodigoRevendedor` - Código único do revendedor
- `Nome` - Nome/Razão Social
- `CPF/CNPJ` - Documento
- `Situacao` - Status (Ativo/Inativo)
- `CodigoEstrutura` - Código da estrutura/grupo
- `TelResidencial` - Telefone residencial
- `TelCelular` - Telefone celular
- `cidade` - Cidade

### Variações de Nomes Aceitas

O sistema aceita variações case-insensitive:
- `CodigoRevendedor`, `codigo_revendedor`, `cod_revendedor`
- `CPF/CNPJ`, `cpfcnpj`, `cpf_cnpj`, `documento`
- `Situacao`, `situação`, `status`
- `cidade`, `city`, `municipio`
- etc.

### Exemplo de Arquivo

Veja o arquivo `exemplo_revendedores.csv` incluído no projeto.

## Funcionalidades

### Upload
- Drag & drop ou clique para selecionar
- Suporta .xlsx e .csv
- Validação automática de colunas
- Mensagens de erro claras

### Busca
Busca em tempo real por:
- Nome
- CPF/CNPJ
- Telefones
- Cidade
- Código Revendedor
- Código Estrutura

### Filtros
- Status: Todos / Ativos / Inativos
- Cidade (dropdown dinâmico)
- Código Estrutura (dropdown dinâmico)

### Cards
Cada card exibe:
- Nome (destaque)
- Badge Ativo/Inativo
- Código Revendedor e CPF/CNPJ
- Código Estrutura (destaque)
- Telefone Celular (click-to-call)
- Telefone Residencial (click-to-call)
- Cidade
- Botões para copiar contatos

### KPIs
- Total de revendedores
- Total ativos
- Total inativos
- Top 3 cidades

## Estrutura do Projeto

```
src/
├── components/
│   ├── FileUploader.tsx      # Upload de arquivos
│   ├── DashboardHeader.tsx   # Header com KPIs
│   ├── FiltersBar.tsx        # Busca e filtros
│   ├── ResellerCard.tsx      # Card de revendedor
│   └── ResellerGrid.tsx      # Grade de cards
├── utils/
│   ├── parseFile.ts          # Parser XLSX/CSV
│   └── normalize.ts          # Normalização de dados
├── types.ts                  # TypeScript types
├── App.tsx                   # Componente principal
├── main.tsx                  # Entry point
└── index.css                 # Estilos Tailwind
```

## Personalização

### Cores

Edite `tailwind.config.js` para alterar o esquema de cores:

```js
colors: {
  'neon-green': '#39FF14',
  'emerald-green': '#50C878',
  'lime-green': '#32CD32',
}
```

### Validação de Status

Edite `src/utils/normalize.ts` função `isActiveStatus()` para ajustar quais valores são considerados "ativos".

## Performance

- Memoização com `useMemo` para filtros e estatísticas
- Renderização otimizada de listas grandes
- Parsing client-side eficiente
- Build otimizado com Vite

## Suporte a Navegadores

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Licença

MIT

## Autor

Desenvolvido com Claude Code
