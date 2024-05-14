const withPWA = require("next-pwa")({

  dest : 'public'
});
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    runtimeCaching,
  },
  images: {
    domains: ["fakestoreapi.com","m.media-amazon.com","static.nike.com"],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
});
