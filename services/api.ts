import { Platform } from 'react-native';

// Use localhost for iOS simulator, 10.0.2.2 for Android emulator
const DEV_API_URL = Platform.select({
  ios: 'http://localhost:8080/api',
  android: 'http://10.0.2.2:8080/api',
  default: 'http://localhost:8080/api',
});

// TODO: Replace with actual production URL
const PROD_API_URL = 'https://api.poojamaster.com/api';

const BASE_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;

export const ApiService = {
  getFestivals: async () => {
      // Assuming occasion_type='FESTIVAL' or similar filter exists, or just get all for now
      const response = await fetch(`${BASE_URL}/occasions`); 
      return response.json();
  },
  
  getOccasions: async () => {
      const response = await fetch(`${BASE_URL}/occasions`);
      return response.json();
  },

  getPoojaItems: async () => {
    const response = await fetch(`${BASE_URL}/items`);
    return response.json();
  },

  getKitDetails: async (id: string) => {
    // If backend doesn't have a separate kit endpoint, we might fetch occasion which acts as a kit
    const response = await fetch(`${BASE_URL}/occasions/${id}`);
    return response.json();
  },

  getItemDetails: async (id: string) => {
    const response = await fetch(`${BASE_URL}/items/${id}`);
    return response.json();
  }
};
