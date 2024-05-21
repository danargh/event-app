interface Config {
   RESEND_KEY: string;
}

const config: Config = {
   RESEND_KEY: process.env.RESEND_KEY || "",
};

export default config;
