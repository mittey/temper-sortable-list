# My comments

Hello! Thanks for taking a look at my test assignment.

I've used Vue + Pinia + SCSS to implement the task. I've used Pinia to implement all the complex business logic of ordering the cards and added unit tests for the store to make sure that logic works properly. I've tried to separate the state, logic and rendering as much as possible. I personally believe that the Vue components should just be responsible for rendering and visualizing the data and not contain a lot of business logic, so I tried to implement this approach.

I've used SCSS for styling because I wanted to implement the UI design from scratch, and IMO using native CSS (or SCSS) is easier and cleaner than using TailwindCSS for example (sorry 😅).

I tried not to over- complicate the solution with components (this could be viewed as a pro- or a con- depending on your religious beliefs in software development 😅). I thought for some time about generalizing the lists as a single component, but came to a conclusion that this approach would be an over- engineering way to do this task (but as always a lot of people would disagree).

The testing is done only on the store because I believe it is the most important part of the application containing all the business logic. So testing it we kind of make sure that at least some part of the system works. The UI is not tested and we can't guarantee that it visualizes the state properly 🤷‍♂️.

I've also added animations. They are glitchy, but for me that's good enough for a test assignment 🥲🥲🥲.

---

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# temper-sortable-list
