# API de Agendamento Médico

API desenvolvida em **Node.js** com **TypeScript**, **Serverless Framework** e **AWS Lambda** para gerenciamento de agendamentos médicos.

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

### Base URL
- **Local**: `http://localhost:3000`
- **AWS**: `https://[api-id].execute-api.[region].amazonaws.com/dev`

### Endpoints

#### 1. Buscar Agendas e Horários dos Médicos

**GET** `/agendas`

Retorna uma lista de médicos com suas respectivas agendas e horários disponíveis.

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
  "data": [
    {
      "id": "1",
      "medico": {
        "id": "1",
        "nome": "Dr. João Silva",
        "especialidade": "Cardiologia",
        "crm": "12345-SP"
      },
      "data": "2024-10-05",
      "horarios": [
        {
          "id": "1",
          "hora": "08:00",
          "disponivel": true
        },
        {
          "id": "2",
          "hora": "09:00",
          "disponivel": true
        }
      ]
    }
  ],
  "message": "Agendas encontradas com sucesso"
}
```

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
      "id": "5",
      "medico": "Dr. João Silva",
      "paciente": "Carlos Almeida",
      "data_horario": "2024-10-05 09:00",
      "status": "confirmado",
      "data_criacao": "2024-09-25T10:30:00.000Z"
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
│   ├── interface/           # Interfaces
│   └── mocks/              # Dados mockados
├── agendamento/             # Domínio de agendamento
│   ├── controller/          # Controllers
│   ├── service/            # Lógica de negócio
│   ├── interface/          # Interfaces
│   └── mocks/             # Dados mockados
├── handlers/               # Handlers das funções Lambda
├── types/                  # Tipos TypeScript
├── utils/                  # Utilitários
│   ├── response.ts        # Padronização de respostas
│   └── validation.ts      # Validações
└── __tests__/             # Testes
```

## 🧪 Testes

O projeto inclui testes unitários abrangentes para:

- **AgendaService**: Testes da lógica de negócio de agendas
- **AgendamentoService**: Testes da lógica de negócio de agendamentos
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

## 📊 Monitoramento

- Logs estruturados
- Tratamento de erros centralizado
- Métricas AWS CloudWatch

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvedor - Renato Carvalho