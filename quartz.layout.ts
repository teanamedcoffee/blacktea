import { h } from "preact"
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { QuartzComponent } from "./quartz/components/types"
import { pathToRoot } from "./quartz/util/path"

// chronological post list, rendered on the homepage only
const postList = Component.RecentNotes({
  title: "thoughts",
  limit: 100,
  showTags: false,
  linkToMore: false,
  filter: (f) => f.slug!.startsWith("thoughts/"),
})

const HomePostList: QuartzComponent = (props) =>
  props.fileData.slug === "index" ? h(postList, props) : null
HomePostList.css = postList.css

// posts show their title; the homepage shows only the image and post list
const articleTitle = Component.ArticleTitle()
const PostTitle: QuartzComponent = (props) =>
  props.fileData.slug === "index" ? null : h(articleTitle, props)
PostTitle.css = articleTitle.css

// "coffee" home link on every page except the homepage itself
const HomeLink: QuartzComponent = (props) =>
  props.fileData.slug === "index"
    ? null
    : h("nav", { class: "home-link" }, h("a", { href: pathToRoot(props.fileData.slug!) }, "coffee"))

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [HomePostList],
  footer: Component.Footer({
    links: {
      twitter: "https://x.com/coffeenamedtea",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [HomeLink, PostTitle, Component.ContentMeta({ showReadingTime: false })],
  left: [],
  right: [],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [HomeLink, PostTitle, Component.ContentMeta({ showReadingTime: false })],
  left: [],
  right: [],
}
