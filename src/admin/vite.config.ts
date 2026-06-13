import { mergeConfig } from "vite";

export default (config) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
        allowedHosts: [
          'mitotically-stearic-anastacia.ngrok-free.app',
          'chainbase.id',    
          'vps-chainbase'
        ]
      }
  });
};
