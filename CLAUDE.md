# coffeenamedtea.com

This repo builds the personal blog at https://coffeenamedtea.com. It is a fork of
Quartz version 4, which is a static site generator that turns Markdown files into
HTML. The site was redesigned in July 2026 to follow a written design brief, and
most of the work was removing Quartz's default interface rather than adding to it.

Read the design rules section before changing anything visual. The design is
deliberate and several obvious looking "improvements" are things the owner
specifically rejected.

## Running it locally

The site needs Node 22. On the owner's Mac, Node is installed through Homebrew and
is not on the default PATH, so every command needs the path added first:

```
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
```

Then install and run:

```
npm install
npx quartz build            # build once into public/
npx quartz build --serve    # build and serve on http://localhost:8080 with live reload
```

The serve command watches for changes and rebuilds on its own. Edits to `content/`,
to `quartz/styles/custom.scss`, and to `quartz.layout.ts` all appear after a page
refresh. If an edit does not show up, stop the server and start it again, which is
always safe.

## How it deploys

Every push to the `main` branch triggers the workflow in
`.github/workflows/deploy.yml`, which runs `npm ci` and then `npx quartz build`,
and publishes the `public/` folder to GitHub Pages. A normal deploy takes about a
minute. There is nothing to run by hand.

If the site does not update after a push, check
https://github.com/teanamedcoffee/blacktea/actions for the run status, and check
https://www.githubstatus.com for a GitHub outage. In July 2026 a deploy sat in the
"Queued" state for four hours because GitHub's Actions runners were down, and there
was nothing wrong with the code. Before assuming your change broke the build, clone
the repo to a temporary folder and run `npm ci` followed by `npx quartz build`,
which is exactly what the deploy does.

## Where things live

- `content/` holds the Markdown files. Each file becomes a page. `content/index.md`
  is the homepage, and posts live in `content/thoughts/`.
- `content/king_of_the_hood.jpg` is the homepage image.
- `quartz.config.ts` holds the site title, the colors, and the font settings.
- `quartz.layout.ts` decides which components appear on which pages. The custom
  components for this site are defined at the top of this file.
- `quartz/styles/custom.scss` holds all of the custom CSS, including the font
  loading rules. This is the right place for style changes.
- `quartz/static/fonts/charis-sil/` holds the three font files.
- Everything else under `quartz/` is Quartz's own code. Avoid changing it. See the
  last section for the one file that was changed.

## Adding a post

Create a Markdown file in `content/thoughts/`. The file name becomes the URL, with
spaces turned into hyphens, so `content/thoughts/my new post.md` becomes
`/thoughts/my-new-post`. Give it this frontmatter at the top:

```
---
title: my new post
date: 2026-07-20
---
```

Always write the date in year, month, day order with four digit years. Always
include a date. If you leave the date out, Quartz falls back to the file's creation
time on the build machine, and because the deploy checks out the repo fresh every
time, the post will show the date of the most recent deploy instead of the date you
wrote it.

The title should be lowercase, because the CSS lowercases titles anyway and the
existing posts are written that way.

## How the layout works

Quartz normally gives every page the same set of components, and it has no built in
way to give one page a different layout. This site needs the homepage to differ
from the post pages, so `quartz.layout.ts` defines three small wrapper components
that check the page's slug and return either the real component or nothing. The
homepage has the slug `index`.

- `HomePostList` shows the list of posts, and only on the homepage. It wraps
  Quartz's own `RecentNotes` component, which already sorts newest first.
- `PostTitle` shows the page title, and only on pages that are not the homepage.
  The homepage shows no title at all.
- `HomeLink` shows the word "coffee" as a link back to the homepage, and only on
  pages that are not the homepage. It exists because there is no navigation
  anywhere else on the site.

Note that `quartz.layout.ts` has a `.ts` file extension rather than `.tsx`, so you
cannot write JSX in it. Use Preact's `h()` function instead, the way the existing
components do.

## The design rules

The whole design comes from one idea. The site should read like print rather than
like a web app, so there is no interface, no decoration, and no color beyond one
blue for links.

### Colors

There are five colors in total. They are set in `quartz.config.ts` under
`theme.colors`, where Quartz's own names for them do not match their purpose, so
this table gives both.

| Purpose | Value | Name in quartz.config.ts |
|---|---|---|
| Background | `#EBEBEB` | light |
| All text | `#111111` | darkgray and dark |
| Links | `#1B4D7A` | secondary |
| Link hover | `#174168` | tertiary |
| Hairline rules | `rgba(17, 17, 17, 0.22)` | lightgray |
| Dates and muted text | `rgba(17, 17, 17, 0.55)` | gray |

The background is a cool gray on purpose. The owner rejected cream and warm off
white because those are the current default look for this kind of blog.

There is no dark mode. The dark mode toggle is removed from the layout, and the
dark palette in the config is set to the same values as the light one so that
nothing changes if dark mode is ever switched on by accident.

### Type

The site uses one typeface, Charis SIL, for both headings and body text. The font
files are stored in this repo and served from this domain, and `fontOrigin` is set
to `"local"` in the config so that Quartz does not load anything from Google Fonts.
Do not switch back to Google Fonts.

| Role | Size | Weight | Line height |
|---|---|---|---|
| Post title | 40px | 700 | 1.14 |
| Body | 21px | 400 | 1.60 |
| Dates and post list | 12px | 400 | 1.4 |
| Home link and footer | 13px | 400 | 1.4 |

Titles, headings, navigation, and labels are all lowercase. Body text is left in
normal sentence case.

### Layout

The page is a single centered column with a maximum width of 680px, which is about
68 characters. This is fixed and should not be widened. The posts are long
paragraphs with no subheadings, and a wider column makes them hard to read.

There are no sidebars. Content sits directly on the background with no box around
it.

### Things the owner rejected

If you are about to add any of these, you have misunderstood the design.

- Cream, off white, or any warm background color
- Cards, panels, rounded corners, or drop shadows
- Filled buttons of any kind. Every action on this site is a plain underlined link.
- Gradients
- Dark mode
- Sidebars, breadcrumbs, or search
- A monospace font used for interface text
- Any accent color besides the one link blue
- Animation, scroll effects, or hover effects beyond a color change
- Image grids where every image is cropped to the same shape
- Sans serif body text

## Decisions already made

These came up during the redesign and were settled, so do not reopen them without
asking.

- The site is named "coffeenamedtea" as one word. It used to appear as both "coffee
  named tea" and "tea named coffee" in different places, which read as a mistake.
- The homepage is the post index. It shows the image, a hairline rule, and the list
  of posts, and nothing else. It does not show the site name.
- In the post list, the date and the title sit on one line, at the same size, with
  the date in gray and the title in link blue.
- Post pages show the "coffee" link, then the title, then the date. They do not show
  a reading time estimate, tags, backlinks, or a table of contents.
- Each page shows at most one image. The homepage has its image and the posts
  currently have none.
- The three existing post URLs must not change, because they have been shared.

## Traps that will waste your time

**`npm run check` fails, and it is not your fault.** It reports three type errors in
`quartz/components/scripts/search.inline.ts`. Those errors are present on a clean
checkout of this repo with no local changes, and they come from a dependency update
in Quartz itself. They do not block anything, because the deploy only runs
`npx quartz build`. Ignore them. If you want to check your own work, run
`npx quartz build` instead.

**Dates are read as UTC.** A date in the frontmatter has no time attached, so it is
read as midnight UTC. Formatting it in the build machine's own time zone displays
the day before. This is already fixed, and the fix is described in the next section.

**Dependabot is noisy.** Most of the runs in the Actions tab are Dependabot, not
deploys. If you are looking for a deploy run, filter by the workflow named "Deploy
Quartz site to GitHub Pages".

## Local changes to Quartz's own code

This repo is a fork of Quartz, and Dependabot updates it, so a future update could
conflict with these changes or quietly undo them. Check them after any Quartz
update.

- `quartz/components/Date.tsx` has `timeZone: "UTC"` added to the `formatDate`
  function. Without it, every date on the site displays one day early. This is the
  only change to a Quartz source file.
- `quartz/static/fonts/charis-sil/` is a new folder holding the three font files.
  Nothing upstream touches it, but it does sit inside Quartz's directory.
- `quartz/styles/custom.scss` is intended to be edited by the site owner, so it is
  safe, but it is worth knowing that it contains the entire visual design.
