module.exports = shipit => {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      deployTo: '/var/www/deployments/Astra/cms',
      repositoryUrl: 'git@bitbucket.org:ixosoftware/cms-astra.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      shallowClone: true,
      branch: 'master',
    },
    dev: {
      servers: [
        {
          host: 'cms.astra.comartek.com',
          user: 'root',
        },
      ],
    },
    uat: {
      servers: [
        {
          host: 'cms.astra-uat.comartek.com',
          user: 'root',
        },
      ],
    },
    staging: {
      servers: [
        {
          host: 'cms.astra-staging.comartek.com',
          user: 'root',
        },
      ],
    },
  });

  shipit.blTask('deploy:copy', () => {
    if (shipit.environment === 'uat') {
      return shipit.remote(`cd ${shipit.currentPath} && cp -r .env.uat ${shipit.config.deployTo}/active/.env`);
    }
    if (shipit.environment === 'staging') {
      return shipit.remote(`cd ${shipit.currentPath} && cp -r .env.staging ${shipit.config.deployTo}/active/.env`);
    }
    return shipit.remote(`cd ${shipit.currentPath} && cp -r .env.prod ${shipit.config.deployTo}/active/.env`);
  });

  shipit.blTask('deploy:install', () => {
    return shipit.remote(`cd ${shipit.currentPath} && yarn install`);
  });

  shipit.blTask('deploy:build', () => {
    return shipit.remote(`cd ${shipit.currentPath} && yarn build`);
  });

  shipit.blTask('deploy:copy:bundles:to:active', () => {
    return shipit.remote(`cp -r ${shipit.currentPath}/build/* ${shipit.config.deployTo}/active/build/`);
  });

  shipit.task('deploy', [
    'deploy:init',
    'deploy:fetch',
    'deploy:update',
    'deploy:publish',
    'deploy:clean',
    'deploy:finish',
    'deploy:copy',
    'deploy:install',
    'deploy:build',
    'deploy:copy:bundles:to:active',
  ]);

  shipit.task('rollback', ['rollback:init', 'deploy:publish', 'deploy:clean', 'deploy:finish', 'deploy:serve']);
};
