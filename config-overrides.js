const { addLessLoader, override, disableEsLint } = require('customize-cra');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      'primary-color': '#37b5a3',
      'link-color': '#37b5a3',
      'input-height-base': '35px',
      'btn-height-base': '48px',
      'border-radius-base': '3px',
      'font-size-base': '14px',
    },
  }),
  disableEsLint(),
  (config, env) => {
    config = rewireReactHotLoader(config, env);
    return config;
  },
);
