// Path : ./config/migrations.js
module.exports = {
  development: {
    schema: { 'migration': {} },
    modelName: 'Migration',
    db: process.env.MONGOHQ_URL || 'mongodb://localhost/app_development'
  },
  test: {},
  production: {}
}
