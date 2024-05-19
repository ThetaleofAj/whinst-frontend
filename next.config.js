/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['209.38.249.109','picsum.photos','localhost','tasty-bears-teach.loca.lt','whinst.nyc3.digitaloceanspaces.com'],
      },
      // experimental: {
      // appDir: true,
      //  serverComponentsExternalPackages: ['bcrypt'],
      // }, 
      // webpack: (config) => {
      //       config.externals = [...config.externals, 'bcrypt'];
      //       return config;
      // },
      ///delete these when making changes
      // env:{
      //   GOOGLE_CLIENT_ID: "457917484750-m8gs75uj74a3qjmlmotup6n5n22drogp.apps.googleusercontent.com",
      //   GOOGLE_CLIENT_SECRET: "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",
      //   PADDLE_VENDOR_ID:19093, //184934
      //   WHINST_TEST_API_KEY:"test_fbd1e978a2ddd8b0d2075b39c57" //live_dc012dd030669580a008b8bb6de

      // }
}

module.exports = nextConfig



