import * as Location from 'expo-location';

export const trackLocation = async () => {
  // Captura coordenadas GPS conforme [RF-004] [cite: 27, 28]
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    timestamp: location.timestamp [cite: 29]
  };
};