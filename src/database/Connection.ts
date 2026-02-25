import SQLite from 'react-native-sqlite-storage';

// Chave injetada via JWT no login [cite: 48]
export const getDatabaseConnection = async (userToken: string) => {
  return SQLite.openDatabase({
    name: 'BusEscolar.db',
    key: userToken, // Criptografia SQLCipher [cite: 47]
    location: 'default',
  });
};
