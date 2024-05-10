/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'themanufacturer-cdn-1.s3.eu-west-2.amazonaws.com',
                port: '',
                pathname: '/wp-content/**'
            },
        ],
    },
};

export default nextConfig;
