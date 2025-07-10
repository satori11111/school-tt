/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/schools',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;