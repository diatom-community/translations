module.exports = {
  siteMetadata: {
    siteUrl: "https://diatom.fund/",
    title: "Diatom DAO Community Translations",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-slug",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "discord",
        path: "./content/discord",
      },
      __key: "discord",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "medium",
        path: "./content/medium",
      },
      __key: "medium",
    },
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `en`,
        configPath: require.resolve(`./i18n/config.json`),
        prefixDefault: true
      },
    },
  ],
};
