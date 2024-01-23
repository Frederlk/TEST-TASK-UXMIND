# TEST-TASK FOR DEV

# UXMind test task

The goal is to develop a (yet another) basic TODO application. Basic feature requirements are:

- Task must have at least name, description and due date fields
- See the list of the tasks
- Filter the tasks by name & description
- Create/modify/delete a task
- Add comments to the task
- Each task should be shareable via URL

## Optional

- Add an ability to link a public github repo (e.g 'vercel/next.js') to a task
- Create a route where I can view some repo metadata (e.g README file) along with the related tasks

You have the freedom to choose the visual look, user flow, etc. Try to build it a way that you _as a user_ will be comfortable with.
Of course don't forget about web standards, semantics, and make sure it's responsive.

## Technology stack

Required:

- NextJS (App Router!): React Server Components, server-side rendering, caching, loading states. Try to not opt into client-side rendering/data-fetching where not needed.
- Typescript
- Prisma - use any database under the hood (we recommend PlanetScale)
- TailwindCSS
- react-hook-form
- zod (form validation, API response validation, etc.)
- any headless UI library: HeadlessUI / RadixUI / etc.

Optional:

- use shadcn-ui for components
- use _server actions_ for mutations. Pay attention to error-handling, a library like `next-safe-action` may help here
- bonus points if you have readable git history and commit messages: https://www.conventionalcommits.org/en/v1.0.0/

Github repo should be public. Please deploy the app anywhere (we recommend Vercel) and attach the deployment link to a README file.
