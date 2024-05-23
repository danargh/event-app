interface Config {
   RESEND_KEY?: string;
   EMAIL_SERVER?: string;
   DATABASE_URL?: string;
   EMAIL_FROM?: string;
   NODE_ENV?: string;
   BASE_URL?: string;
}

const config: Config = {
   RESEND_KEY: process.env.AUTH_RESEND_KEY,
   EMAIL_SERVER: process.env.EMAIL_SERVER,
   DATABASE_URL: process.env.DATABASE_URL,
   EMAIL_FROM: process.env.EMAIL_FROM,
   NODE_ENV: process.env.NODE_ENV,
   BASE_URL: process.env.BASE_URL,
};

export default config;
