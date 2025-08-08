import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "TheForce Documentation",
  tagline: "A comprehensive hand tracking library built on MediaPipe",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://theforce.code200.com.br",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "zastrich", // Usually your GitHub org/user name.
  projectName: "TheForce", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/", // Serve docs at the site's root

          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        blog: {
          path: "./blog",
          authorsMapPath: "authors.yml",
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    // Replace with your project's social card
    image: "img/theforce.png",
    navbar: {
      title: "TheForce",
      logo: {
        alt: "TheForce Logo",
        src: "img/theforce.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentation",
        },
        { to: "/blog", label: "Blog", position: "left" },
        { to: "/roadmap", label: "Roadmap", position: "left" },
        {
          href: "https://github.com/zastrich/TheForce",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: "/",
            },
            {
              label: "Core",
              to: "/core",
            },
            {
              label: "React",
              to: "/react",
            },
            {
              label: "Vue",
              to: "/vue",
            },
            {
              label: "Angular",
              to: "/angular",
            },
          ],
        },
        {
          title: "Author links",
          items: [
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/zastrich",
            },
            {
              label: "X (Twitter)",
              href: "https://x.com/zastrich",
            },
            {
              label: "GitHub",
              href: "https://github.com/zastrich",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Roadmap",
              to: "/roadmap",
            },
            {
              label: "Zastrich website",
              href: "https://code200.com.br",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Zastrich. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
