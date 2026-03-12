import pandas as pd
import matplotlib.pyplot as plt
import os
from datetime import datetime

def gerar_dashboard():
    arquivo_csv = 'relatorio_embarque.csv'
    
    print("📊 Iniciando processamento do Dashboard - TransPorte CDA...")

    try:
        # 1. Carregar os dados
        if not os.path.exists(arquivo_csv):
            print(f"❌ Erro: O arquivo {arquivo_csv} não foi encontrado.")
            print("💡 Dica: Realize ao menos um embarque no App para gerar os dados.")
            return

        df = pd.read_csv(arquivo_csv)

        if df.empty:
            print("⚠️ O relatório está vazio. Nenhum dado para exibir.")
            return

        # 2. Processar métricas
        # Contamos quantos registros existem por status
        status_counts = df['STATUS'].value_counts()
        total_embarques = len(df)

        # 3. Configuração Visual do Gráfico
        plt.figure(figsize=(10, 7))
        colors = ['#28a745', '#ffc107', '#17a2b8'] # Verde, Amarelo, Azul
        
        explode = (0.05,) * len(status_counts) # Pequeno destaque entre as fatias

        status_counts.plot(
            kind='pie', 
            autopct='%1.1f%%', 
            startangle=140, 
            colors=colors,
            explode=explode,
            shadow=True
        )

        plt.title(f'TransPorte CDA - Status de Embarque\nTotal: {total_embarques} registros', fontsize=14, fontweight='bold')
        plt.ylabel('') # Remove label lateral desnecessária

        # 4. Salvar a imagem com Timestamp (para histórico da SEMEC)
        timestamp = datetime.now().strftime('%Y-%m-%d_%H-%M')
        nome_imagem = f"dashboard_embarque_{timestamp}.png"
        plt.savefig(nome_imagem, dpi=300, bbox_inches='tight')
        
        print(f"✅ Sucesso! Imagem salva como: {nome_imagem}")
        
        # 5. Exibir na tela
        print("🚀 Abrindo visualização...")
        plt.show()

    except Exception as e:
        print(f"❌ Erro crítico ao gerar dashboard: {e}")

if __name__ == "__main__":
    gerar_dashboard()