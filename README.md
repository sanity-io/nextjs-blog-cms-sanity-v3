# A Next.js Blog with a Native Authoring Experience<!-- omit in toc -->

This starter is a statically generated blog that uses [Next.js][nextjs] for the frontend and [Sanity][sanity-homepage] to handle its content. It comes with a native Sanity Studio that offers features like real-time collaboration, instant side-by-side content previews, and intuitive editing.

The Studio connects to Sanity Content Lake, which gives you hosted content APIs with a flexible query language, on-demand image transformations, powerful patching, and more. You can use this starter to kick-start a blog or learn these technologies.

[![Deploy with Vercel](https://vercel.com/button)][vercel-deploy]
[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)][netlify-deploy]

## Features

- A performant, static blog with editable posts, authors, and site settings
- A native and customizable authoring environment, accessible on `yourblog.com/studio`
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
- [Configuration](#configuration)
  - [Step 1. Set up the environment](#step-1-set-up-the-environment)
  - [Step 2. Set up the project locally](#step-2-set-up-the-project-locally)
  - [Step 3. Run Next.js locally in development mode](#step-3-run-nextjs-locally-in-development-mode)
  - [Step 4. Deploy to production](#step-4-deploy-to-production)
- [Questions and Answers](#questions-and-answers)
  - [It doesn't work! Where can I get help?](#it-doesnt-work-where-can-i-get-help)
  - [How can I remove the "Next steps" block from my blog?](#how-can-i-remove-the-next-steps-block-from-my-blog)
  - [How can I set up Incremental Static Revalidation?](#how-can-i-set-up-incremental-static-revalidation)
- [Next steps](#next-steps)

## Project Overview

| [Blog](https://nextjs-blog.sanity.build)                                                                       | [Studio](https://nextjs-blog.sanity.build/studio)                                                                       |
| -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| ![Blog](https://user-images.githubusercontent.com/44635000/197511913-94ea36dd-099d-4dbf-b71f-3335879621c9.png) | ![Sanity Studio](https://user-images.githubusercontent.com/44635000/197511725-b2a2e2e5-287b-41a9-84c6-ec90d37ca480.png) |

### Important files and folders

| File(s)                                     | Description                                              |
| ------------------------------------------- | -------------------------------------------------------- |
| `sanity.config.ts`                          |  Config file for Sanity Studio                           |
| `sanity.cli.ts`                             |  Config file for Sanity CLI                              |
| `/pages/studio/[[...index]].tsx`            |  Where Sanity Studio is mounted                          |
| `/pages/api/revalidate.ts`                  |  Serverless route for triggering ISR                     |
| `/pages/api/preview.ts`                     |  Serverless route for triggering Preview mode            |
| `/schemas`                                  |  Where Sanity Studio gets its content types from         |
| `/plugins`                                  |  Where the advanced Sanity Studio customization is setup |
| `/lib/sanity.api.ts`,`/lib/sanity.image.ts` | Configuration for the Sanity Content Lake client         |
| `/lib/sanity.preview.ts`                    | Configuration for the live Preview Mode                  |

## Configuration

### Step 1. Set up the environment

Use the Deploy Button below. It will let you deploy the starter using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-sanity-example) as well as connect it to your Sanity Content Lake using [the Sanity Vercel Integration][integration].

[![Deploy with Vercel](https://vercel.com/button)][vercel-deploy]
[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)][netlify-deploy]

If you are using **Netlify**, then you will need to:

- Create a new [Sanity project][sanity-create] and at the end note the values for `--project` and `--dataset`:

  ![Screenshot of a screen with a terminal command containing "--project ygjibjo8 --dataset production"](https://user-images.githubusercontent.com/81981/195444377-dd497dc1-db90-4b08-843e-84df50a0231a.png)

In the screenshot above, the `projectId` is `ygjibjo8`, and `dataset` is `production`.

- You will need to copy the projectId and dataset value to the `Your Sanity Project ID` and `Your Sanity Dataset` fields on Netlify
  ![Screenshot of a screen with the deployment page for Netlify with fields "Your Sanity Project ID", "Your Sanity Dataset", "Your Sanity API Write Token" and "Your Sanity API Read Token"](https://user-images.githubusercontent.com/6951139/201689448-fe90fb8f-7e65-40fd-8da0-62b8fde0d181.png)

- To generate your `Read and Write tokens` you can open [Manage][manage-url] 
- Once you find your project on the list, click on **API** on the navigation tab, followed by **Tokens** on the sidebar
    ![Screenshot of a screen of Sanity Manage on the API tab, with the Tokens section open"](https://user-images.githubusercontent.com/6951139/201691668-8d184e7c-d9f4-4085-bd34-8c2ca329632a.png)
- From there, you will need to **Add API token** by clicking the button, give it a name and set it as Editor (which has read and write permissions to all datasets in this project)
- With the token generated, you can return to the Netlify deployment page and inset that token on the "Your Sanity API Write Token" and "Your Sanity API Read Token" fields


### Step 2. Set up the project locally

[Clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) that was created for you on your GitHub account.

#### Step 2.1. If you are using **Vercel**

Once cloned, if you used **Vercel** as a deployment method, run the following command from the project's root directory:

```bash
npx vercel link
```

Download the environment variables needed to connect Next.js and the Studio to your Sanity project:

```bash
npx vercel env pull
```

### Step 3. Run Next.js locally in development mode

```bash
npm install && npm run dev
```

When you run this development server, the changes you make in your frontend and studio configuration will be applied live using hot reloading.

Your blog should be up and running on [http://localhost:3000][localhost-3000]! You can create and edit content on [http://localhost:3000/studio][localhost-3000-studio].

### Step 4. Deploy to production

To deploy your changes to production you use `git`:

```bash
git add .
git commit
git push
```

Alternatively, if you are using vercel, you can deploy without a `git` hosting provider using the Vercel CLI:

```bash
npx vercel --prod
```

## Questions and Answers

### It doesn't work! Where can I get help?

In case of any issues or questions, you can post:

- [Vercel's GitHub Discussions for Next.js][vercel-github]
- [Sanity's GitHub Discussions][sanity-github]
- [Sanity's Community Slack][sanity-community]

### How can I remove the "Next steps" block from my blog?

You can remove it by deleting the `IntroTemplate` component in `/components/IndexPage.tsx`.

### How can I set up Incremental Static Revalidation?

Go to the serverless function code in `/pages/api/revalidate.ts`. In the code comments, you'll find instructions for how to set up [ISR][vercel-isr].

## Next steps

- [Join our Slack community to ask questions and get help][sanity-community]
- [How to edit my content structure?][sanity-schema-types]
- [How to query content?][sanity-groq]
- [What is content modelling?][sanity-content-modelling]

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsanity-io%2Fnextjs-blog-cms-sanity-v3&repository-name=blog-nextjs-sanity&project-name=blog-nextjs-sanity&demo-title=Blog%20with%20Built-in%20Content%20Editing&demo-description=A%20Sanity-powered%20blog%20with%20built-in%20content%20editing%20%26%20instant%20previews&demo-url=https%3A%2F%2Fnextjs-blog.sanity.build%2F%3Futm_source%3Dvercel%26utm_medium%3Dreferral&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F81981%2F197501516-c7c8092d-0305-4abe-afb7-1e896ef7b90a.png&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx&external-id=nextjs;template=nextjs-blog-cms-sanity-v3
[netlify-deploy]: https://app.netlify.com/start/deploy?repository=https://github.com/sanity-io/nextjs-blog-cms-sanity-v3
[manage-url]: https://www.sanity.io/manage
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
