module.exports = function(api) {
  api.cache(true);
  const presets = [
    ['@babel/env',
      {
        targets: {
          node: 'current',
        },
      },
    ]   
  ];
  const plugins = [
    ['@babel/plugin-proposal-pipeline-operator',
      {
        proposal: 'minimal',
      },
    ]
  ];
  return { presets, plugins }
};