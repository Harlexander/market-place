/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    env : {
        // SOCKET_URL : "http://localhost:5000"
        SOCKET_URL : "https://messaging-ts4x.onrender.com"
    }
}

module.exports = nextConfig
