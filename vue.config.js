const config = require('@rancher/shell/vue.config'); // eslint-disable-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = () => {
  const vendorConfig = config(__dirname, { excludes: [] });

  // Extend the chainWebpack hook to add our alias
  if (typeof vendorConfig.chainWebpack === 'function') {
    const originalChainWebpack = vendorConfig.chainWebpack;

    vendorConfig.chainWebpack = (webpackConfig) => {
      // Call the original chainWebpack configuration first
      originalChainWebpack(webpackConfig);
      // Add the @sbombastic-image-vulnerability-scanner alias pointing to the pkg/sbombastic-image-vulnerability-scanner folder
      webpackConfig.resolve.alias.set('@sbombastic-image-vulnerability-scanner', path.resolve(__dirname, 'pkg/sbombastic-image-vulnerability-scanner'));
    };
  } else {
    vendorConfig.chainWebpack = (webpackConfig) => {
      webpackConfig.resolve.alias.set('@sbombastic-image-vulnerability-scanner', path.resolve(__dirname, 'pkg/sbombastic-image-vulnerability-scanner'));
    };
  }

  return vendorConfig;
};

