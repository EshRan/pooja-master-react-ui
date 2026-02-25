import { Platform } from 'react-native';

// Use EC2 IP
const DEV_API_URL = Platform.select({
  ios: 'http://3.111.16.44:8080/api',
  android: 'http://3.111.16.44:8080/api',
  default: 'http://3.111.16.44:8080/api',
});

// TODO: Replace with actual production URL
const PROD_API_URL = 'http://3.111.16.44:8080/api';

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

  getNuts: async () => {
    const response = await fetch(`${BASE_URL}/nuts`);
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
  },

  getNutDetails: async (id: string) => {
    const response = await fetch(`${BASE_URL}/nuts/${id}`);
    return response.json();
  },

  getAllMappings: async () => {
    const response = await fetch(`${BASE_URL}/mappings`);
    return response.json();
  },

  getImageUrl: (key: string | null | undefined) => {
    if (!key) return null;
    if (key.startsWith('http')) return key;
    return `https://rituals-basket.s3.ap-south-1.amazonaws.com/${key}`;
  }
};
