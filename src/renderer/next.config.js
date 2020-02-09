// eslint-disable-next-line no-unused-vars
const withSvgr = (nextConfig = {}, nextComposePlugins = {}) => {
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

module.exports = withSvgr({
  webpack: config => {
    config.target = 'electron-renderer'

    return config
  }
  // exportPathMap() {
  //   // Let Next.js know where to find the entry page
  //   // when it's exporting the static bundle for the use
  //   // in the production version of your app
  //   return {
  //     '/': { page: '/' },
  //     '/preferences': { page: '/preferences' }
  //   }
  // }
})
