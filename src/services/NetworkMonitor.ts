import NetInfo from "@react-native-community/netinfo";
import { processQueue } from "./QueueService";

export const startNetworkMonitoring = (token: string) => {
  // Conforme [RF-005], detecta Wi-Fi na escola/garagem para sincronizar [cite: 32]
  NetInfo.addEventListener(state => {
    if (state.isConnected && state.isInternetReachable) {
      console.log("Conexão detectada. Iniciando Upstream...");
      processQueue(token);
    }
  });
};