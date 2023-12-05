import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"

// https://vitejs.dev/config/
export default ({ mode }) => {
	let env = loadEnv(mode, process.cwd())
  return ({
		base:'./',
		plugins: [
      vue()
		],
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src")
			}
		},
    css: {
      preprocessorOptions: {
        less: {
          // javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.less";',
        },
      },
    },
		server: {
			host: '0.0.0.0',
			proxy: {
				'/api': {
					target: env.VITE_BASE_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, 'api')
				}
			}
		}
	})
}
