/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    env : {
        SOCKET_URL : "http://localhost:5000"
    }
}

module.exports = nextConfig
