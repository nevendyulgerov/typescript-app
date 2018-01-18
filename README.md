# TypeScript App

Base for front-end apps written in TypeScript, ES6 and SASS.

### Build tools

Webpack and npm are used for creating the build tools.

The app comes with a number of build tools to automate common development tasks, including:

- `npm run server` - runs the local web development server at `http://localhost:8080/webpack-dev-server/`

- `npm run build` - primary build task - watches all relevant sass and ts files and re-bundles them on change

- `npm run dist` - creates a distributable package with minified resources (css/js) in appDir/dist
