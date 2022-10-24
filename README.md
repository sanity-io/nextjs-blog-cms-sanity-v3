# Sanity.io and Next.js

This starter is a statically generated blog that uses [Next.js][nextjs] for the frontend and [Sanity][sanity-homepage] to handle its content. It comes with a built-in Sanity Studio that offers features like real-time collaboration, instant side-by-side content previews, and intuitive editing.

The Studio connects to Sanity Content Lake, which gives you hosted content APIs with a flexible query language, on-demand image transformations, powerful patching, and more. You can use this starter to kick-start a blog or to learn these technologies.

[![Deploy with Vercel](https://vercel.com/button)][vercel-deploy]

## Features

- A performant, static blog with editable posts, authors, and site settings
- A built-in and customizable authoring environment, accessible on `yourblog.com/studio`
- Real-time and collaborative content editing with fine-grained revision history
- Side-by-side instant content preview that works across your whole site
- Support for block content and the most advanced custom fields capability in the industry
- Webhook-triggered Incremental Static Revalidation; no need to wait for a rebuild to publish new content
- Free and boosted Sanity project with unlimited admin users, free content updates, and pay-as-you-go for API overages
- A project with starter-friendly and not too heavy-handed TypeScript and Tailwind.css

## Table of Contents

- [Features](#features)
- [Table of Contents](#table-of-contents)
- [Project Overview](#project-overview)
  - [Important files and folders](#important-files-and-folders)
- [Step 1. Set up the environment](#step-1-set-up-the-environment)
  - [Step 1. Set up the environment](#step-1-set-up-the-environment-1)
- [Features](#features-1)
- [Project overview](#project-overview-1)
  - [Important files and folders](#important-files-and-folders-1)
- [Configuration](#configuration)
  - [Step 1. Set up the environment](#step-1-set-up-the-environment-2)
  - [Step 2. Set up the project locally](#step-2-set-up-the-project-locally)
    - [Bootstrap the example](#bootstrap-the-example)
    - [Set up environment variables](#set-up-environment-variables)
  - [Set up environment variables](#set-up-environment-variables-1)
    - [Import to Vercel](#import-to-vercel)
  - [Step 3. Run Next.js locally in development mode](#step-3-run-nextjs-locally-in-development-mode)
- [Step 4. Deploy to production](#step-4-deploy-to-production)
- [Questions and Answers](#questions-and-answers)
  - [It doesn't work! Where can I get help?](#it-doesnt-work-where-can-i-get-help)
  - [How can I remove the "Next steps" block from my blog?](#how-can-i-remove-the-next-steps-block-from-my-blog)
  - [How can I set up Incremental Static Revalidation?](#how-can-i-set-up-incremental-static-revalidation)
- [Next steps](#next-steps)

## Project Overview

| [Blog](https://nextjs-blog.sanity.build) | [Studio](https://nextjs-blog.sanity.build/studio) |
| ---------------------------------------- | ------------------------------------------------- |
| [blog image placeholder]                 | [studio image placeholder]                        |

-->

### Important files and folders

| File(s)                                     | Description                                      |
| ------------------------------------------- | ------------------------------------------------ |
| `sanity.config.ts`                          |  Config file for Sanity Studio                   |
| `sanity.cli.ts`                             |  Config file for Sanity CLI                      |
| `/pages/studio/[[...index]].tsx`            |  Where Sanity Studio is mounted                  |
| `/pages/api/revalidate.tsx`                 |  Serverless route for triggering ISR             |
| `/pages/api/preivew.tsx`                    |  Serverless route for triggering Preview mode    |
| `/schemas`                                  |  Where Sanity Studio gets its content types from |
| `/lib/sanity.server.tsx`, `/lib/config.tsx` | Configuration for the Sanity Content Lake client |

## Step 1. Set up the environment

### Step 1. Set up the environment

Use the Deploy Button below. It will let you deploy the starter using [Vercel][vercel] as well as connect it to your Sanity Content Lake using [the Sanity Vercel Integration][integration].

[![Deploy with Vercel](https://vercel.com/button)][vercel-deploy]

- [Features](#features)
- [Table of Contents](#table-of-contents)
- [Project Overview](#project-overview)
  - [Important files and folders](#important-files-and-folders)
- [Step 1. Set up the environment](#step-1-set-up-the-environment)
  - [Step 1. Set up the environment](#step-1-set-up-the-environment-1)
- [Features](#features-1)
- [Project overview](#project-overview-1)
  - [Important files and folders](#important-files-and-folders-1)
- [Configuration](#configuration)
  - [Step 1. Set up the environment](#step-1-set-up-the-environment-2)
  - [Step 2. Set up the project locally](#step-2-set-up-the-project-locally)
    - [Bootstrap the example](#bootstrap-the-example)
    - [Set up environment variables](#set-up-environment-variables)
  - [Set up environment variables](#set-up-environment-variables-1)
    - [Import to Vercel](#import-to-vercel)
  - [Step 3. Run Next.js locally in development mode](#step-3-run-nextjs-locally-in-development-mode)
- [Step 4. Deploy to production](#step-4-deploy-to-production)
- [Questions and Answers](#questions-and-answers)
  - [It doesn't work! Where can I get help?](#it-doesnt-work-where-can-i-get-help)
  - [How can I remove the "Next steps" block from my blog?](#how-can-i-remove-the-next-steps-block-from-my-blog)
  - [How can I set up Incremental Static Revalidation?](#how-can-i-set-up-incremental-static-revalidation)
- [Next steps](#next-steps)

## Features

- Next.js deployed with the [Sanity Vercel Integration][integration].
- Built-in Sanity Studio that is accessible on `yoururl.com/studio`
- Sub-second as-you-type previews in Next.js
- [On-demand revalidation of pages](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) with [GROQ-powered Webhooks](https://www.sanity.io/docs/webhooks)
- A project with starter-friendly and not too heavy-handed TypeScript and Tailwind.css

## Project overview

<!--
| [Blog](https://nextjs-blog.sanity.build) | [Studio](https://nextjs-blog.sanity.build/studio) |
| ---------------------------------------- | ------------------------------------------------- |
| [blog image placeholder]                 | [studio image placeholder]                        |
-->

### Important files and folders

| File(s)                                     | Description                                      |
| ------------------------------------------- | ------------------------------------------------ |
| `sanity.config.ts`                          |  Config file for Sanity Studio                   |
| `sanity.cli.ts`                             |  Config file for Sanity CLI                      |
| `/pages/studio/[[...index]].tsx`            |  Where Sanity Studio is mounted                  |
| `/pages/api/revalidate.tsx`                 |  Serverless route for triggering ISR             |
| `/pages/api/preivew.tsx`                    |  Serverless route for triggering Preview mode    |
| `/schemas`                                  |  Where Sanity Studio gets its content types from |
| `/lib/sanity.server.tsx`, `/lib/config.tsx` | Configuration for the Sanity Content Lake client |

## Configuration

### Step 1. Set up the environment

Use the Deploy Button below. It will let you deploy the starter using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-sanity-example) as well as connect it to your Sanity Content Lake using [the Sanity Vercel Integration][integration].

[![Deploy with Vercel](https://vercel.com/button)][vercel-deploy]

### Step 2. Set up the project locally

[Clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) that was created for you on your GitHub account. Once cloned, run the following command from the project's root directory:

```bash
npx vercel link
```

Download the environment variables needed to connect Next.js and the Studio to your Sanity project:

```bash
npx vercel env pull
```

<details>
<summary>Step-by-step manual configuration</summary>

- [Bootstrap the example](#bootstrap-the-example)
- [Set up environment variables](#set-up-environment-variables)
- [Import to Vercel](#import-to-vercel)

If using the [integration] isn't an option. Or maybe you want to work locally first and deploy to Vercel later. This guide shows you how to set it up manually.

#### Bootstrap the example

Run the command [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io):

```bash
npx create-next-app --example https://github.com/sanity-io/nextjs-blog-cms-sanity-v3
```

#### Set up environment variables

```bash
pnpm create next-app --example https://github.com/sanity-io/nextjs-blog-cms-sanity-v3
```

### Set up environment variables

Create a new [Sanity project][sanity-create] and at the end note the values for `--project` and `--dataset`:

![Screenshot of a screen with a terminal command containing "--project ygjibjo8 --dataset production"](https://user-images.githubusercontent.com/81981/195444377-dd497dc1-db90-4b08-843e-84df50a0231a.png)

In the screenshot above, the `projectId` is `ygjibjo8`, and `dataset` is `production`.

Copy the [`.env.local.example`] file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set these variables in `.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` should be the `projectId`.
- `NEXT_PUBLIC_SANITY_DATASET` should be the `dataset`.
- `SANITY_API_READ_TOKEN` create an API token with `read-only` permissions:
  - Go to [https://sanity.io/manage](https://sanity.io/manage) and open your project.
  - Go to **API** and the **Tokens** section at the bottom, press its **Add API token** button.
  - Name it `SANITY_API_READ_TOKEN`, set **Permissions** to `Viewer`.
  - Hit **Save** and you can copy/paste the token.

Your `.env.local` file should look like this:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=...
SANITY_API_READ_TOKEN=...
```

#### Import to Vercel

To deploy your local project to Vercel, push it to [GitHub](https://docs.github.com/en/get-started/importing-your-projects-to-github/importing-source-code-to-github/adding-locally-hosted-code-to-github)/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).
**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.
After it's deployed, link your local code to the Vercel project:

```bash
npx vercel link
```

</details>

### Step 3. Run Next.js locally in development mode

```bash
npm install && npm run dev
```

When you run this development server, the changes you make in your frontend and studio configuration will be applied live using hot reloading.

Your blog should be up and running on [http://localhost:3000][localhost-3000]! You can create and edit content on [http://localhost:3000/studio][localhost-3000-studio].

## Step 4. Deploy to production

To deploy your changes to production you use `git`:

```bash
git add .
git commit
git push
```

Alternatively you can deploy without a `git` hosting provider using the Vercel CLI:

```bash
npx vercel --prod
```

## Questions and Answers

### It doesn't work! Where can I get help?

In case of any issues or questions, you can post:

- [GitHub Discussions for Next.js][vercel-github]
- [Sanity's GitHub Discussions][sanity-github]
- [Sanity's Community Slack][sanity-community]

### How can I remove the "Next steps" block from my blog?

You can remove it by deleting the `IntroTemplate` component in `/pages/index.tsx`.

### How can I set up Incremental Static Revalidation?

Go to the serverless function code in `/pages/api/revalidate.ts`. In the code comments, you'll find instructions for how to set up [ISR][vercel-isr].

## Next steps

- [Join our Slack community to ask questions and get help][sanity-community]
- [How to edit my content structure?][sanity-schema-types]
- [How to query content?][sanity-groq]
- [What is content modelling?][sanity-content-modelling]

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsanity-io%2Fnextjs-blog-cms-sanity-v3&repository-name=blog-nextjs-sanity&project-name=blog-nextjs-sanity&demo-title=Blog%20using%20Next.js%20%26%20Sanity&demo-description=On-demand%20ISR%2C%20sub-second%20as-you-type%20previews&demo-url=https%3A%2F%2Fnextjs-blog.sanity.build%2F&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F110497645%2F182727236-75c02b1b-faed-4ae2-99ce-baa089f7f363.png&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx
[integration]: https://www.sanity.io/docs/vercel-integration?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[`.env.local.example`]: .env.local.example
[nextjs]: https://github.com/vercel/next.js
[sanity-create]: https://www.sanity.io/get-started/create-project?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-deployment]: https://www.sanity.io/docs/deployment?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-homepage]: https://www.sanity.io?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-community]: https://slack.sanity.io/
[sanity-schema-types]: https://www.sanity.io/docs/schema-types?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-github]: https://github.com/sanity-io/sanity/discussions
[sanity-groq]: https://www.sanity.io/docs/groq?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-content-modelling]: https://www.sanity.io/docs/content-modelling?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-webhooks]: https://www.sanity.io/docs/webhooks?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[localhost-3000]: http://localhost:3000
[localhost-3000-studio]: http://localhost:3000/studio
[vercel-isr]: https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta
[vercel]: https://vercel.com
[vercel-github]: https://github.com/vercel/next.js/discussions
