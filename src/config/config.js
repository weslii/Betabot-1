// src/config/config.js
module.exports = {
  // WhatsApp Group IDs (Replace with your actual group IDs)
  SALES_GROUP_ID: '120363400576665531@g.us',
  DELIVERY_GROUP_ID: '120363402699945348@g.us',
  
  // Database Configuration - Updated for Railway
  DATABASE: (() => {
    // Check for Railway DATABASE_URL first
    if (process.env.DATABASE_URL) {
      console.log('✅ Using Railway DATABASE_URL');
      return {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? {
          rejectUnauthorized: false
        } : false
      };
    }
    
    // Check for Railway individual variables (alternative format)
    if (process.env.PGHOST || process.env.POSTGRES_HOST) {
      console.log('✅ Using Railway individual variables');
      return {
        host: process.env.PGHOST || process.env.POSTGRES_HOST,
        port: Number(process.env.PGPORT || process.env.POSTGRES_PORT) || 5432,
        database: process.env.PGDATABASE || process.env.POSTGRES_DB,
        user: process.env.PGUSER || process.env.POSTGRES_USER,
        password: process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD,
        ssl: {
          rejectUnauthorized: false
        }
      };
    }
    
    // Fallback to your custom environment variables for local development
    console.log('⚠️ Using fallback local configuration');
    return {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME || 'wesleydb',
      user: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'wesleygreat'
    };
  })(),
  
  // Bot Configuration
  BOT: {
    MAX_RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 2000, // milliseconds
    DAILY_REPORT_TIME: '22:00', // 10 PM
    PENDING_ORDERS_TIME: '22:30' // 10:30 PM
  }
};
