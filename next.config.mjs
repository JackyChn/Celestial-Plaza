/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30, // refresh every 30 sec
    },
  },
};

export default nextConfig;
