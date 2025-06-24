# Collection Postman - API Agendamento Médico

Esta collection contém todas as chamadas da API de Agendamento Médico com exemplos de sucesso e falha para facilitar os testes e integração.

## 📋 Como Importar

1. **Abra o Postman**
2. **Clique em "Import"** (botão no canto superior esquerdo)
3. **Selecione o arquivo** `postman_collection.json`
4. **Clique em "Import"**

## 🔧 Configuração

### Variáveis de Ambiente

A collection utiliza as seguintes variáveis:

- **`baseUrl`**: URL base para desenvolvimento local
  - Valor padrão: `http://localhost:3000`
- **`awsUrl`**: URL base para ambiente AWS
  - Valor padrão: `https://[api-id].execute-api.[region].amazonaws.com/dev`

### Como Configurar as Variáveis

1. **No Postman, clique em "Environments"** (ícone de engrenagem)
2. **Crie um novo ambiente** ou use o "Globals"
3. **Adicione as variáveis**:
   - `baseUrl` = `http://localhost:3000`
   - `awsUrl` = `https://[api-id].execute-api.[region].amazonaws.com/dev`

## 📚 Endpoints Disponíveis

### 🏥 Agendas

#### 1. **GET /agendas - Buscar todas as agendas**
- **URL**: `{{baseUrl}}/agendas`
- **Descrição**: Retorna todas as agendas de todos os médicos
- **Exemplos incluídos**:
  - ✅ Sucesso - Todas as agendas

#### 2. **GET /agendas - Filtrar por médico**
- **URL**: `{{baseUrl}}/agendas?medico=Dr. João Silva`
- **Descrição**: Retorna agendas de um médico específico
- **Exemplos incluídos**:
  - ✅ Sucesso - Médico encontrado
  - ✅ Sucesso - Médico não encontrado (array vazio)

#### 3. **GET /agendas - Filtrar por data**
- **URL**: `{{baseUrl}}/agendas?data=2024-10-05`
- **Descrição**: Retorna agendas de uma data específica
- **Exemplos incluídos**:
  - ✅ Sucesso - Data válida
  - ❌ Erro - Formato de data inválido

#### 4. **GET /agendas - Filtrar por médico e data**
- **URL**: `{{baseUrl}}/agendas?medico=Dr. João Silva&data=2024-10-05`
- **Descrição**: Retorna agendas de um médico em uma data específica
- **Exemplos incluídos**:
  - ✅ Sucesso - Médico e data encontrados

### 📅 Agendamentos

#### 1. **POST /agendamento - Criar agendamento**
- **URL**: `{{baseUrl}}/agendamento`
- **Método**: POST
- **Body**: JSON com dados do agendamento
- **Exemplos incluídos**:
  - ✅ Sucesso - Agendamento criado
  - ❌ Erro - Body ausente
  - ❌ Erro - Médico vazio
  - ❌ Erro - Paciente vazio
  - ❌ Erro - Data/hora no passado
  - ❌ Erro - Formato de data/hora inválido
  - ❌ Erro - Horário já ocupado

## 🧪 Como Usar os Exemplos

### Para Testar Cenários de Sucesso

1. **Selecione o endpoint** desejado
2. **Clique em "Send"** para executar a requisição
3. **Verifique a resposta** no painel inferior
4. **Compare com os exemplos** incluídos na collection

### Para Testar Cenários de Erro

1. **Selecione o endpoint** desejado
2. **Modifique os parâmetros** para simular o erro
3. **Clique em "Send"** para executar
4. **Verifique o código de status** e mensagem de erro

## 📊 Códigos de Status HTTP

| Código | Significado | Descrição |
|--------|-------------|-----------|
| 200 | OK | Requisição bem-sucedida |
| 201 | Created | Recurso criado com sucesso |
| 400 | Bad Request | Dados inválidos na requisição |
| 404 | Not Found | Recurso não encontrado |
| 500 | Internal Server Error | Erro interno do servidor |

## 🔍 Exemplos de Uso Prático

### Testando o Endpoint de Agendas

```bash
# Buscar todas as agendas
curl -X GET "http://localhost:3000/agendas"

# Filtrar por médico
curl -X GET "http://localhost:3000/agendas?medico=Dr. João Silva"

# Filtrar por data
curl -X GET "http://localhost:3000/agendas?data=2024-10-05"

# Filtrar por médico e data
curl -X GET "http://localhost:3000/agendas?medico=Dr. João Silva&data=2024-10-05"
```

### Testando o Endpoint de Agendamentos

```bash
# Criar agendamento válido
curl -X POST "http://localhost:3000/agendamento" \
  -H "Content-Type: application/json" \
  -d '{
    "agendamento": {
      "medico": "Dr. João Silva",
      "paciente": "Carlos Almeida",
      "data_horario": "2024-10-05 09:00"
    }
  }'

# Testar erro de dados inválidos
curl -X POST "http://localhost:3000/agendamento" \
  -H "Content-Type: application/json" \
  -d '{
    "agendamento": {
      "medico": "",
      "paciente": "Carlos Almeida",
      "data_horario": "2024-10-05 09:00"
    }
  }'
```

## 🚀 Dicas de Uso

1. **Use as variáveis de ambiente** para alternar entre local e AWS
2. **Teste todos os cenários** incluindo sucesso e falha
3. **Verifique os headers** de resposta para CORS
4. **Monitore os logs** do servidor durante os testes
5. **Use os exemplos como referência** para implementação

## 📝 Notas Importantes

- **Formato de data**: Use sempre `YYYY-MM-DD` para datas
- **Formato de data/hora**: Use sempre `YYYY-MM-DD HH:MM` para agendamentos
- **Headers**: Sempre inclua `Content-Type: application/json` para POST
- **CORS**: A API está configurada para aceitar requisições de qualquer origem

## 🔗 Links Úteis

- [Documentação da API](../README.md)
- [Serverless Framework](https://www.serverless.com/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [Postman Documentation](https://learning.postman.com/)

---

**Desenvolvido por**: Renato Carvalho  
**Versão**: 1.0.0  
**Data**: 2024 