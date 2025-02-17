// Determine if we're in development mode
const isDevelopment = import.meta.env.MODE === 'development';

// Get the base URL based on environment
export const getBaseUrl = () => {
  return isDevelopment 
    ? 'http://localhost:3000'
    : 'https://venzo.vercel.app';  // We'll update this URL
}; 