import FaceDetection, { FaceDetectorOptions } from '@react-native-ml-kit/face-detection';

// Otimização de Performance [RNF-001]
const options: FaceDetectorOptions = {
  performanceMode: 'fast', // Mudamos de 'accurate' para 'fast' para garantir < 3s [cite: 23, 36]
  landmarkMode: 'none',    // Desativado para economizar processamento e bateria 
  classificationMode: 'none',
};

export const detectFacesFast = async (imageUri: string) => {
  try {
    // Processamento local via Edge Computing conforme [RF-002] [cite: 20, 22]
    const faces = await FaceDetection.detect(imageUri, options);
    return faces;
  } catch (error) {
    console.error("Erro no processamento rápido:", error);
    return [];
  }
};