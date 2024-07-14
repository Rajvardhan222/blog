/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains: ['res.cloudinary.com'] // Add your domain here
    },
    experimental: {
    serverComponentsExternalPackages: ['sequelize', 'sequelize-typescript'],
}};

export default nextConfig;
