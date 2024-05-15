// const withPWA = require("next-pwa")({
//   runtimeCaching,
//   disable: process.env.NODE_ENV === "development",
//   dest : 'public'
// });
// const runtimeCaching = require('next-pwa/cache')

// module.exports = withPWA({

//   images: {
//     domains: ["fakestoreapi.com","m.media-amazon.com","static.nike.com"],
//   },
//   env: {
//     stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
//   },
// });


const runtimeCaching = require('next-pwa/cache');
const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest : 'public',
    disable: process.env.NODE_ENV === "development",
    register: true,
    runtimeCaching,
  },
  images: {
    domains: ["fakestoreapi.com","m.media-amazon.com","static.nike.com"],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
});

