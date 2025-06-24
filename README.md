# API de Agendamento Médico

API desenvolvida em **Node.js** com **TypeScript**, **Serverless Framework** e **AWS Lambda** para gerenciamento de agendamentos médicos.
Objectivo realizar teste tecnico para vaga DESENVOLVEDOR DE BACK END PLENO da empresa **Leve Saúde**.
requisitos: `https://succinct-tadpole-fde.notion.site/Teste-T-cnico-13ee9214de4e479b8f6e87752a358078`

## 🚀 Tecnologias Utilizadas

- **Node.js** (v18+)
- **TypeScript**
- **Serverless Framework**
- **AWS Lambda**
- **AWS API Gateway**
- **Jest** (Testes)
- **Joi** (Validação)
- **ESLint** + **Prettier** (Qualidade de código)

## 📋 Pré-requisitos

- Node.js v18 ou superior
- npm ou yarn
- AWS CLI configurado (para deploy)
- Serverless Framework CLI

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd api-agendamento-medico
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o AWS CLI** (opcional, apenas para deploy)
```bash
aws configure
```

## 🏃‍♂️ Como Executar

### Desenvolvimento Local

Para executar a API localmente usando o serverless-offline:

```bash
npm run dev
```

A API estará disponível em: `http://localhost:3000`

### Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

### Qualidade de Código

```bash
# Verificar linting
npm run lint

# Corrigir problemas de linting automaticamente
npm run lint:fix

# Formatar código
npm run format
```

### Build

```bash
npm run build
```

### Deploy

```bash
# Deploy para ambiente de desenvolvimento
npm run deploy

# Deploy para produção
npm run deploy:prod
```

## 📚 Documentação da API

### Collection Postman

Para facilitar os testes da API, foi criada uma collection completa do Postman com todos os endpoints e exemplos de sucesso e falha.

**🔗 Collection Pública:**
- [API Agendamento Médico - Collection Postman](https://www.postman.com/gold-crater-405622/teste-tecnico/collection/gfonp7z/api-agendamento-mdico)

**📁 Arquivos disponíveis:**
- `postman_collection.json` - Collection para importar no Postman
- `POSTMAN_COLLECTION_README.md` - Guia completo de uso da collection

**🚀 Como usar:**
1. **Opção 1**: Clique no link público acima e importe diretamente
2. **Opção 2**: Importe o arquivo `postman_collection.json` no Postman
3. Configure as variáveis de ambiente (`baseUrl`, `awsUrl`)
4. Teste todos os cenários incluindo sucesso e falha

### Base URL
- **Local**: `http://localhost:3000`
- **AWS**: `https://[api-id].execute-api.[region].amazonaws.com/dev`

### Endpoints

#### 1. Buscar Agendas e Horários dos Médicos

**GET** `/agendas`

Retorna uma lista de médicos com suas respectivas agendas e horários disponíveis, agrupados por médico.

**Query Parameters:**
- `medico` (opcional): Nome do médico para filtrar
- `data` (opcional): Data específica no formato YYYY-MM-DD

**Exemplo de Requisição:**
```bash
curl -X GET "http://localhost:3000/agendas?medico=Dr. João Silva&data=2024-10-05"
```

**Exemplo de Resposta:**
```json
{
  "success": true,
  "data": {
    "medicos": [
      {
        "id": "1",
        "nome": "Dr. João Silva",
        "especialidade": "Cardiologia",
        "horarios_disponiveis": [
          "2024-10-05 09:00",
          "2024-10-05 10:00",
          "2024-10-05 11:00"
        ]
      },
      {
        "id": "2",
        "nome": "Dra. Maria Santos",
        "especialidade": "Dermatologia",
        "horarios_disponiveis": [
          "2024-10-06 14:00",
          "2024-10-06 15:00"
        ]
      }
    ]
  },
  "message": "Agendas encontradas com sucesso"
}
```

**Resposta sem filtros (todos os médicos):**
```json
{
  "success": true,
  "data": {
    "medicos": [
      {
        "id": "1",
        "nome": "Dr. João Silva",
        "especialidade": "Cardiologia",
        "horarios_disponiveis": [
          "2024-10-05 09:00",
          "2024-10-05 10:00",
          "2024-10-05 11:00",
          "2024-10-06 09:00"
        ]
      },
      {
        "id": "2",
        "nome": "Dra. Maria Santos",
        "especialidade": "Dermatologia",
        "horarios_disponiveis": [
          "2024-10-05 14:00",
          "2024-10-05 15:00",
          "2024-10-06 14:00",
          "2024-10-06 15:00"
        ]
      },
      {
        "id": "3",
        "nome": "Dr. Carlos Oliveira",
        "especialidade": "Ortopedia",
        "horarios_disponiveis": [
          "2024-10-05 16:00",
          "2024-10-05 17:00"
        ]
      }
    ]
  },
  "message": "Agendas encontradas com sucesso"
}
```

### Formato de Retorno - GET /agendas

O endpoint `/agendas` foi atualizado para retornar os dados agrupados por médico, facilitando a visualização dos horários disponíveis:

**Estrutura da Resposta:**
- `medicos`: Array de médicos com seus horários disponíveis
- Cada médico contém:
  - `id`: Identificador único do médico
  - `nome`: Nome completo do médico
  - `especialidade`: Especialidade médica
  - `horarios_disponiveis`: Array de horários no formato "YYYY-MM-DD HH:MM"


#### 2. Marcar Agendamento do Paciente

**POST** `/agendamento`

Permite que o paciente marque um horário de consulta com um médico.

**Body da Requisição:**
```json
{
  "agendamento": {
    "medico": "Dr. João Silva",
    "paciente": "Carlos Almeida",
    "data_horario": "2024-10-05 09:00"
  }
}
```

**Exemplo de Requisição:**
```bash
curl -X POST "http://localhost:3000/agendamento" \
  -H "Content-Type: application/json" \
  -d '{
    "agendamento": {
      "medico": "Dr. João Silva",
      "paciente": "Carlos Almeida",
      "data_horario": "2024-10-05 09:00"
    }
  }'
```

**Exemplo de Resposta:**
```json
{
  "success": true,
  "data": {
    "mensagem": "Agendamento realizado com sucesso",
    "agendamento": {
      "medico": "Dr. João Silva",
      "paciente": "Carlos Almeida",
      "data_horario": "2024-10-05 09:00"
    }
  },
  "message": "Agendamento criado com sucesso"
}
```

### Códigos de Status HTTP

- **200**: Sucesso
- **201**: Criado com sucesso
- **400**: Requisição inválida
- **404**: Recurso não encontrado
- **500**: Erro interno do servidor

## 🏗️ Estrutura do Projeto

```
src/
├── agenda/                    # Domínio de agenda
│   ├── controller/           # Controllers
│   ├── service/             # Lógica de negócio
│   ├── interfaces/          # Interfaces
│   └── mocks/              # Dados mockados
├── agendamento/             # Domínio de agendamento
│   ├── controller/          # Controllers
│   ├── service/            # Lógica de negócio
│   ├── interfaces/          # Interfaces
│   └── mocks/             # Dados mockados
├── handlers/               # Handlers das funções Lambda
├── types/                  # Tipos TypeScript
│   └── index.ts           # Interfaces e tipos (Medico, Agenda, Agendamento, etc.)
├── utils/                  # Utilitários
│   ├── response.ts        # Padronização de respostas
│   └── validation.ts      # Validações
└── __tests__/             # Testes
```

### Principais Tipos

- **Medico**: Informações do médico (id, nome, especialidade, crm)
- **Agenda**: Agenda de um médico em uma data específica
- **Agendamento**: Agendamento de consulta completo (com id, status, data_criacao)
- **AgendamentoSimplificado**: Agendamento simplificado (apenas medico, paciente, data_horario)
- **MedicoComHorarios**: Médico com lista de horários disponíveis
- **AgendasResponse**: Resposta do endpoint GET /agendas
- **AgendamentoResponse**: Resposta do endpoint POST /agendamento

## 🧪 Testes

O projeto inclui testes unitários abrangentes para:

- **AgendaService**: Testes da lógica de negócio de agendas
  - `buscarAgendas()`: Busca tradicional de agendas
  - `buscarAgendasFormatadas()`: Novo método que retorna dados agrupados por médico
  - `buscarAgendaPorId()`: Busca de agenda específica
  - `verificarDisponibilidade()`: Verificação de disponibilidade de horário
- **AgendamentoService**: Testes da lógica de negócio de agendamentos
- **AgendamentoController**: Testes do controller de agendamentos
  - Formato de resposta simplificado
  - Validação de entrada
- **ValidationUtil**: Testes das validações de dados

### Executar Testes

```bash
# Todos os testes
npm test

# Testes com cobertura
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

## 🔧 Configurações

### TypeScript
- Configurado com strict mode
- Target: ES2020
- Módulo: CommonJS

### ESLint
- Regras para TypeScript
- Configurações para boas práticas

### Prettier
- Formatação consistente
- Configurações para legibilidade

### Jest
- Configurado para TypeScript
- Cobertura de código
- Setup automático

## 🚀 Deploy

### Pré-requisitos para Deploy

1. **AWS CLI configurado**
2. **Credenciais AWS válidas**
3. **Serverless Framework instalado globalmente**

```bash
npm install -g serverless
```

### Deploy para AWS

```bash
# Deploy para desenvolvimento
npm run deploy

# Deploy para produção
npm run deploy:prod
```

### Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente:

- `NODE_ENV`: Ambiente de execução (dev, prod)
- `AWS_REGION`: Região AWS (padrão: us-east-1)

## 📝 Validações

### Agendamento
- **Médico**: Obrigatório, mínimo 3 caracteres
- **Paciente**: Obrigatório, mínimo 3 caracteres
- **Data/Hora**: Obrigatório, formato YYYY-MM-DD HH:MM, deve ser futura

### Agenda Query
- **Médico**: Opcional, mínimo 3 caracteres
- **Data**: Opcional, formato YYYY-MM-DD

## 🔒 Segurança

- Validação de entrada em todos os endpoints
- Sanitização de dados
- Headers CORS configurados
- Tratamento de erros padronizado

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvedor - Renato Carvalho