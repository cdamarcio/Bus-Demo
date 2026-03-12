# BusEscolar
Sistema Inteligente de Monitoramento do Transporte Escolar

![version](https://img.shields.io/badge/version-v1.1-blue)
![status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![platform](https://img.shields.io/badge/platform-React%20Native-blue)
![database](https://img.shields.io/badge/database-SQLite-orange)
![security](https://img.shields.io/badge/security-AES--256-green)

---

# Visão Geral

O **BusEscolar** é um sistema de monitoramento e auditoria do transporte escolar desenvolvido para a **Prefeitura de Conceição do Araguaia (SEMEC)**.

O sistema opera em **modo Offline First**, permitindo funcionamento em regiões rurais com baixa conectividade.

Principais recursos:

- identificação biométrica de alunos
- rastreamento de rotas
- controle de embarque
- geração de relatórios
- sincronização automática

---

# Documentação Técnica

Arquivos de documentação:

- Arquitetura → docs/arquitetura.md
- Banco de Dados → docs/banco.md
- Fluxo de Embarque → docs/fluxo-embarque.md
- Telas do Sistema → docs/telas.md
- Demonstração → docs/demo.md

---

# Tecnologias Utilizadas

Frontend

- React Native
- Expo
- TypeScript

Reconhecimento Facial

- Google ML Kit
- TensorFlow Lite

Banco de Dados

- SQLite
- SQLCipher

Backend

- API REST
- PostgreSQL

Segurança

- autenticação JWT
- criptografia AES-256

---

# Instalação

Clone o projeto:
git clone https://github.com/cdamarcio/Bus.git

Entre na pasta:

cd Bus


Instale dependências:

npm install


Execute:

npx expo start



---

# Versão

v1.1 — 27/02/2026

Primeira versão completa do sistema BusEscolar.

---

# Autor

Márcio Rodrigues de Oliveira

Engenheiro de Software