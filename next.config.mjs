/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pokeapi.co/api/v2',
                port: "",
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: "",
            },
        ],
    },
};

export default nextConfig;
