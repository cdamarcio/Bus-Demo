# BusEscolar
### Sistema Inteligente de Monitoramento do Transporte Escolar

![version](https://img.shields.io/badge/version-v1.1-blue)
![status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![platform](https://img.shields.io/badge/platform-React%20Native-blue)
![database](https://img.shields.io/badge/database-SQLite-orange)
![security](https://img.shields.io/badge/security-AES--256-green)

---

# Visão Geral

O **BusEscolar** é um sistema de monitoramento e auditoria do transporte escolar desenvolvido para a **Prefeitura de Conceição do Araguaia (SEMEC)**.

A solução foi projetada para operar em **modo Offline First**, garantindo funcionamento em regiões rurais com baixa conectividade.

O sistema realiza:

- identificação biométrica de alunos
- rastreamento de rotas escolares
- auditoria de embarque
- geração de relatórios de viagem
- sincronização automática de dados

---

# Principais Funcionalidades

## Identificação Facial Offline
Reconhecimento biométrico local utilizando **Edge Computing** com:

- Google ML Kit
- TensorFlow Lite

Tempo médio de validação:

---

## Monitoramento de Rotas

Registro automático de localização GPS durante o trajeto:

- coleta periódica de coordenadas
- auditoria de rotas
- conformidade com FNDE / INEP

---

## Sincronização Inteligente

Fila de sincronização para ambientes com conectividade limitada:

- armazenamento local
- envio automático ao detectar rede
- tolerância à falhas

---

## Relatórios de Auditoria

Geração automática de relatórios contendo:

- alunos presentes
- alunos ausentes
- quilometragem percorrida
- histórico de viagens

Exportação em:

---

## Registro Manual de Embarque

Sistema de fallback para casos de falha biométrica.

---

# Arquitetura do Sistema

---

# Tecnologias Utilizadas

## Frontend Mobile

- React Native
- Expo
- TypeScript

## Reconhecimento Biométrico

- Google ML Kit
- TensorFlow Lite

## Banco Local

- SQLite
- SQLCipher
- AES-256

## Backend

- API REST
- PostgreSQL

## Segurança

- autenticação JWT
- criptografia de dados sensíveis

---

# Estrutura do Projeto

---

# Interface do Sistema

## Dashboard

Controle de viagens e monitoramento.

## Validação Biométrica

Tela de reconhecimento facial do aluno.

## Registro de Embarque

Confirmação de embarque e presença.

---

# Identidade Visual

O sistema utiliza cores baseadas no brasão municipal de **Conceição do Araguaia**:

- Verde
- Amarelo
- Azul

Interface otimizada para:

- uso em tablets
- operação em movimento
- alto contraste

---

# Requisitos de Software

Antes de instalar o projeto, certifique-se de possuir:

Node.js (LTS)

Git

VS Code

Android Studio (Android 10+)

---

# Instalação

Clone o repositório:
git clone https://github.com/cdamarcio/Bus.git

Entre na pasta:
cd Bus


Instale as dependências:
npm install

Execute o projeto:
npx expo start


---

# Roadmap do Projeto

## v1.1
- reconhecimento facial offline
- rastreamento GPS
- sincronização inteligente
- relatórios de auditoria

## v1.2 (planejado)

- integração com portal da SEMEC
- painel web administrativo
- dashboard de gestão de rotas

## v2.0 (planejado)

- inteligência artificial para otimização de rotas
- análise preditiva de transporte escolar

---

# Licença

Projeto desenvolvido para fins institucionais e acadêmicos.

---

# Autor

Márcio Rodrigues de Oliveira  
Engenheiro de Software



