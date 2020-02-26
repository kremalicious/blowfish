require('dotenv').config()

const withSvgr = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true
            }
          }
        ]
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}

const withElectron = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack: config => {
      config.target = 'electron-renderer'
      return config
    }
  })
}

module.exports = withSvgr(
  withElectron({
    env: {
      ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
      INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID
    },
    exportPathMap() {
      return {
        '/': { page: '/' },
        '/preferences': { page: '/preferences' }
      }
    }
  })
)
