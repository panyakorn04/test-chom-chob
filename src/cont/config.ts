declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_HOST: string;
    }
  }
}

export const getConfig = () => ({
  // host
  API_HOST: process.env.NEXT_PUBLIC_API_HOST,
});
