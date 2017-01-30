export default {
  env: 'production',
  db: process.env.OPENSHIFT_MONGODB_DB_URL,
  port: process.env.OPENSHIFT_NODEJS_PORT,
  host: process.env.OPENSHIFT_NODEJS_IP,
  adminPassword: 'bvzRTaz21x'
}
