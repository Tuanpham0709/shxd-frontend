module.exports = shipit => {
  require('shipit-deploy')(shipit);

  const branchParamsIndex = process.argv.indexOf('-b');
  let branch = null;
  if (branchParamsIndex !== -1 && branchParamsIndex < process.argv.length - 1) {
    branch = process.argv[branchParamsIndex + 1];
  }

  shipit.initConfig({
    default: {
      dirToCopy: './build',
      deployTo: '/var/www/deployments/SHXD',
      repositoryUrl: 'git@bitbucket.org:ixosoftware/frontend-shxd.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      shallowClone: true,
      branch: branch ? branch : 'master',
    },
    dev: {
      servers: [
        {
          host: 'app.shxd.comartek.com',
          user: 'root',
        },
      ],
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

  shipit.blTask('deploy:init', () => {
    shipit.config.deployTo = `${shipit.config.deployTo}/${shipit.config.branch}`;
  });

  shipit.blTask('deploy:copy', () => {
    if (shipit.environment === 'uat') {
      return shipit.local(`cd ${shipit.workspace} && cp -r .env.uat ${shipit.workspace}/.env`);
    }
    if (shipit.environment === 'staging') {
      return shipit.local(`cd ${shipit.workspace} && cp -r .env.staging ${shipit.workspace}/.env`);
    }
    return null;
  });

  shipit.blTask('deploy:install', () => {
    return shipit.local(`cd ${shipit.workspace} && yarn install`);
  });

  shipit.blTask('deploy:build', () => {
    return shipit.local(`cd ${shipit.workspace} && yarn build`);
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
