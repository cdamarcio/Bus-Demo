import * as Location from 'expo-location';

// Coordenadas das Escolas de Conceição do Araguaia
const ESCOLAS_CDA = [
  { id: '1', nome: 'Escola Municipal A', lat: -8.2578, lng: -49.2647, raio: 100 },
];

export const checkGeofence = async (currentLat: number, currentLng: number) => {
  for (const escola of ESCOLAS_CDA) {
    const distance = getDistance(currentLat, currentLng, escola.lat, escola.lng);
    
    // Se entrar no raio de 100m da escola [cite: 32]
    if (distance <= escola.raio) {
      console.log(`Chegada detectada em: ${escola.nome}`);
      return true; // Dispara o Upload [cite: 32]
    }
  }
  return false;
};

// Função de cálculo de distância Haversine
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // Raio da Terra em metros
  // ... lógica de cálculo matemático
  return distance;
}