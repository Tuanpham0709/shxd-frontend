module.exports = shipit => {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      dirToCopy: './build',
      deployTo: '/home/deployments/shxd/frontend',
      repositoryUrl: 'git@bitbucket.org:ixosoftware/frontend-shxd.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      shallowClone: true,
      branch: 'master',
    },
    staging: {
      servers: [
        {
          host: 'app.shxd.comartek.com',
          user: 'root',
        },
      ],
    },
  });

  shipit.blTask('deploy:copy', () => {
    if (shipit.environment === 'uat') {
      return shipit.local(`cd ${shipit.workspace} && cp -r .env.uat ${shipit.workspace}/.env`);
    }
    if (shipit.environment === 'staging') {
      return shipit.local(`cd ${shipit.workspace} && cp -r .env.staging ${shipit.workspace}/.env`);
    }
    return shipit.local(`cd ${shipit.workspace} && cp -r .env.prod ${shipit.workspace}/.env`);
  });

  shipit.blTask('deploy:install', () => {
    return shipit.local(`cd ${shipit.workspace} && yarn install`);
  });

  shipit.blTask('deploy:build', () => {
    return shipit.local(`cd ${shipit.workspace} && yarn build`);
  });

  shipit.blTask('deploy:copy:bundles:to:active', () => {
    return shipit.remote(`cp -r ${shipit.currentPath}/build/* ${shipit.config.deployTo}/active/build/`);
  });

  shipit.task('deploy', [
    'deploy:init',
    'deploy:fetch',
    'deploy:install',
    'deploy:copy',
    'deploy:build',
    'deploy:update',
    'deploy:publish',
  ]);

  shipit.task('rollback', ['rollback:init', 'deploy:publish', 'deploy:clean', 'deploy:finish', 'deploy:serve']);
};
