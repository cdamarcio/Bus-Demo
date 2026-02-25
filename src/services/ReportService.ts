import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const gerarRelatorioViagem = async (dadosViagem: any) => {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const page = pdfDoc.addPage([600, 400]);

  // Cabeçalho Oficial [cite: 3, 41]
  page.drawText('PREFEITURA DE CONCEIÇÃO DO ARAGUAIA', { x: 50, y: 350, size: 20, font: timesRomanFont, color: rgb(0, 0.53, 0.37) }); // Verde Bandeira
  page.drawText('Secretaria Municipal de Educação (SEMEC)', { x: 50, y: 330, size: 12 });

  // Detalhes da Viagem [cite: 10, 33]
  page.drawText(`Monitor: ${dadosViagem.monitorNome}`, { x: 50, y: 300, size: 12 });
  page.drawText(`Data: ${new Date().toLocaleDateString('pt-BR')}`, { x: 50, y: 285, size: 12 });
  page.drawText(`Quilometragem: ${dadosViagem.kmTotal} km`, { x: 50, y: 270, size: 12 });

  // Resumo de Alunos [cite: 33]
  page.drawText('RESUMO DE FREQUÊNCIA:', { x: 50, y: 240, size: 14, font: timesRomanFont });
  page.drawText(`Presentes: ${dadosViagem.totalPresentes}`, { x: 50, y: 220, size: 12 });
  page.drawText(`Ausentes: ${dadosViagem.totalAusentes}`, { x: 50, y: 205, size: 12 });

  // Salvando o arquivo localmente [cite: 50]
  const pdfBytes = await pdfDoc.saveAsBase64();
  const fileUri = `${FileSystem.documentDirectory}Relatorio_Rota_${Date.now()}.pdf`;
  
  await FileSystem.writeAsStringAsync(fileUri, pdfBytes, { encoding: FileSystem.EncodingType.Base64 });
  
  // Opção para compartilhar via WhatsApp ou E-mail
  await Sharing.shareAsync(fileUri);
};