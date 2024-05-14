const withPWA = require("next-pwa")({

  dest : 'public',
  disable: process.env.NODE_ENV === "development",
  register: true,
  runtimeCaching,



});
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  
  images: {
    domains: ["fakestoreapi.com","m.media-amazon.com","static.nike.com"],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
});
