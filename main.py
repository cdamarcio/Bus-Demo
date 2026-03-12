from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import csv
import os
from datetime import datetime

app = FastAPI(title="TransPorte CDA - API de Monitoramento")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class RegistroEmbarque(BaseModel):
    id: str
    nome: str
    status: str
    latitude: float
    longitude: float
    timestamp: str

# Função para salvar no "Banco de Dados" (CSV)
def salvar_no_csv(dados: List[RegistroEmbarque]):
    arquivo_existe = os.path.isfile('relatorio_embarque.csv')
    
    with open('relatorio_embarque.csv', mode='a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        # Se o arquivo for novo, cria o cabeçalho
        if not arquivo_existe:
            writer.writerow(['ID_ALUNO', 'NOME', 'STATUS', 'LATITUDE', 'LONGITUDE', 'DATA_HORA'])
        
        for item in dados:
            writer.writerow([item.id, item.nome, item.status, item.latitude, item.longitude, item.timestamp])

@app.get("/")
async def raiz():
    return {"status": "Online", "sistema": "TransPorte CDA"}

@app.post("/api/sincronizar")
async def receber_dados(embarques: List[RegistroEmbarque]):
    try:
        salvar_no_csv(embarques)
        print(f"✅ {len(embarques)} registros salvos no arquivo CSV com sucesso!")
        return {"status": "sucesso", "mensagem": "Dados gravados no servidor!"}
    except Exception as e:
        print(f"❌ Erro ao salvar: {e}")
        raise HTTPException(status_code=500, detail="Erro interno ao salvar dados")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)