# Sistema de Monitoramento da Frota Escolar - SEMEC (Conceição do Araguaia)

Este projeto consiste em uma aplicação móvel desenvolvida em **Flutter** para a gestão e monitoramento do transporte escolar municipal de **Conceição do Araguaia - PA**. O foco principal é garantir a segurança dos alunos e a auditoria de rotas através de tecnologias **Offline First** e **Edge Computing**.

## Sobre o Projeto

O sistema foi projetado para operar prioritariamente em modo offline, garantindo o registro de embarque via reconhecimento facial mesmo em zonas rurais sem sinal de internet (Sombra Digital). A sincronização de dados ocorre posteriormente via API com o sistema central da SEMEC.

## Funcionalidades Implementadas (SRS v1.1)

* **[RF-001] Sincronização de Dados (Downstream/Upstream):** Download da lista de alunos, vetores faciais e rotas via Wi-Fi e upload de logs de viagem.
* **[RF-002] Reconhecimento Facial Offline:** Identificação dos alunos localmente no dispositivo (tempo de resposta < 3s) utilizando processamento em borda (Edge Computing).
* **[RF-003] Registro de Embarque Manual:** Fallback de segurança para casos de falha na biometria ou situações excepcionais.
* **[RF-004] Monitoramento de Trajeto:** Captura de coordenadas GPS com **Geotagging** em cada embarque para auditoria de conformidade com **FNDE/INEP**.
* **[RF-005] Detecção Automática (Geofencing):** Reconhecimento do perímetro escolar para disparo automático de finalização de rota e sincronização.

## Estrutura Técnica do Projeto

O código segue uma arquitetura modular para facilitar a manutenção e garantir a segurança dos dados:

```text
lib/
├── database/   # Persistência local segura (SQLite + SQLCipher)
├── models/     # Modelos de dados (Alunos, Rotas e Logs)
├── screens/    # Interfaces de usuário (Login, Dashboard, Validação Facial)
├── services/   # Lógica de GPS, Localização e Sincronização API
└── widgets/    # Componentes de UI de alto contraste e acessibilidade


## Segurança e LGPD

Em conformidade com a LGPD, o sistema utiliza:

* **Criptografia Local:** Banco de dados SQLite criptografado (AES-256) para proteção de dados de menores.

* **Autenticação Segura:** Login via tokens JWT integrados ao servidor central da SEMEC.


## Tecnologias Utilizadas

* **Linguagem:** Dart (Framework Flutter).

* **Banco de Dados Local:** SQLite (sqflite).

* **Identidade Visual:** Padronizada com as cores do brasão de Conceição do Araguaia (Verde, Amarelo e Azul).


## Créditos

* **Cliente:** Secretaria Municipal de Educação (SEMEC).

* **Desenvolvedor:** Márcio Rodrigues de Oliveira.

* **Supervisor:** Alcides Platiny Alves Batista.
