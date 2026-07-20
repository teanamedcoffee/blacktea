import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "coffeenamedtea",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "coffeenamedtea.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    generateSocialImages: false,
    theme: {
      fontOrigin: "local",
      cdnCaching: false,
      typography: {
        header: "Charis SIL",
        body: "Charis SIL",
        code: "IBM Plex Mono",
      },
      // no dark mode: both palettes are identical, and the toggle is removed in quartz.layout.ts
      colors: {
        lightMode: {
          light: "#EBEBEB",
          lightgray: "rgba(17, 17, 17, 0.22)",
          gray: "rgba(17, 17, 17, 0.55)",
          darkgray: "#111111",
          dark: "#111111",
          secondary: "#1B4D7A",
          tertiary: "#174168",
          highlight: "rgba(17, 17, 17, 0.08)",
          textHighlight: "rgba(17, 17, 17, 0.12)",
        },
        darkMode: {
          light: "#EBEBEB",
          lightgray: "rgba(17, 17, 17, 0.22)",
          gray: "rgba(17, 17, 17, 0.55)",
          darkgray: "#111111",
          dark: "#111111",
          secondary: "#1B4D7A",
          tertiary: "#174168",
          highlight: "rgba(17, 17, 17, 0.08)",
          textHighlight: "rgba(17, 17, 17, 0.12)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
