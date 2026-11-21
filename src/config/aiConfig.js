/**
 * SafeArm AI Configuration
 * The app uses NVIDIA Nemotron-3 Ultra by default.
 * Token can be set via VITE_NVIDIA_API_KEY environment variable or configured here.
 */

export const AI_CONFIG = {
  // Built-in API Key: reads from environment variable (.env / GitHub Secrets) or configured here
  apiKey: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_NVIDIA_API_KEY) || '',
  
  // Default high-precision reasoning model
  model: 'nvidia/nemotron-3-ultra-550b-a55b',
  
  // API endpoints
  directUrl: 'https://integrate.api.nvidia.com/v1/chat/completions',
  proxyUrl: '/api/nvidia/v1/chat/completions',
};
