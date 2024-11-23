import type { NextConfig } from "next";
import withPlaiceholder from "@plaiceholder/next";
/**
 * @type {import('next').NextConfig}
 */

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"avatars.githubusercontent.com",
        port:"",
        pathname:"/u/**"
      },
      {
        hostname:"lh3.googleusercontent.com",
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/account123/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dk8exegek/**',
        search: '',
      },
    ]
  }
};

export default withPlaiceholder(nextConfig);
