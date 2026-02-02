// PM2 Ecosystem Configuration
// 用于部署和管理 Next.js 应用

module.exports = {
  apps: [
    {
      name: 'mingxi-website',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -H 0.0.0.0 -p 55655',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 55655,
        HOSTNAME: '0.0.0.0'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 55655,
        HOSTNAME: '0.0.0.0'
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000
    }
  ]
};
