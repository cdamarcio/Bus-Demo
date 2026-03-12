import os
import shutil
from datetime import datetime

def arquivar_e_limpar():
    arquivo_original = 'relatorio_embarque.csv'
    pasta_historico = 'historico_embarques'
    
    print("🧹 Iniciando processo de limpeza e arquivamento...")

    # 1. Verifica se o arquivo existe
    if not os.path.exists(arquivo_original):
        print("⚠️ O arquivo relatorio_embarque.csv não existe. Nada para limpar.")
        return

    # 2. Cria a pasta de histórico se não existir
    if not os.path.exists(pasta_historico):
        os.makedirs(pasta_historico)
        print(f"📁 Pasta '{pasta_historico}' criada.")

    try:
        # 3. Define o nome do backup com a data atual
        data_string = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        arquivo_backup = os.path.join(pasta_historico, f'backup_embarques_{data_string}.csv')

        # 4. Move/Copia o arquivo para o histórico
        shutil.copy2(arquivo_original, arquivo_backup)
        print(f"✅ Backup realizado com sucesso: {arquivo_backup}")

        # 5. Zera o arquivo original (mantendo apenas o cabeçalho)
        with open(arquivo_original, 'w', encoding='utf-8') as f:
            f.write('ID_ALUNO,NOME,STATUS,LATITUDE,LONGITUDE,DATA_HORA\n')
        
        print("✨ Arquivo principal zerado e pronto para a próxima rota!")

    except Exception as e:
        print(f"❌ Erro durante a limpeza: {e}")

if __name__ == "__main__":
    confirmacao = input("⚠️ Tem certeza que deseja arquivar os dados atuais e zerar o sistema? (s/n): ")
    if confirmacao.lower() == 's':
        arquivar_e_limpar()
    else:
        print("❌ Operação cancelada pelo usuário.")