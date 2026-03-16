import 'package:geolocator/geolocator.dart';
import 'package:sqflite/sqflite.dart';

class LocationService {
  final Database db;
  bool isTracking = false;

  LocationService(this.db);

  /// Inicia a captura de coordenadas para auditoria FNDE/INEP 
  void iniciarRastreamento(int idRota) async {
    isTracking = true;

    // Configurações de precisão e distância (ex: a cada 50 metros) 
    const LocationSettings locationSettings = LocationSettings(
      accuracy: LocationAccuracy.high,
      distanceFilter: 50, 
    );

    Geolocator.getPositionStream(locationSettings: locationSettings).listen(
      (Position position) async {
        if (!isTracking) return;

        // Salva o "traçado" da rota no banco local (Offline First) [cite: 7, 28]
        await db.insert('rastreio_gps', {
          'latitude': position.latitude,
          'longitude': position.longitude,
          'velocidade': position.speed,
          'timestamp_posicao': DateTime.now().toIso8601String(),
        });

        print("Posição gravada: ${position.latitude}, ${position.longitude}");
      },
    );
  }

  void pararRastreamento() {
    isTracking = false;
  }
}