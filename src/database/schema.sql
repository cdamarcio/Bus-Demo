-- Tabela de Alunos baixada via API SEMEC [cite: 15, 16]
CREATE TABLE IF NOT EXISTS alunos (
    matricula TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    escola TEXT,
    ponto_parada TEXT,
    hash_facial TEXT, -- Vetor para validação [cite: 20]
    foto_local_uri TEXT
);

-- Fila de Sincronização (Queue) para "Sombra Digital" [cite: 62]
CREATE TABLE IF NOT EXISTS logs_viagem (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    matricula_aluno TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    latitude REAL,
    longitude REAL,
    sincronizado INTEGER DEFAULT 0 -- 0: Pendente, 1: Enviado [cite: 62]
);