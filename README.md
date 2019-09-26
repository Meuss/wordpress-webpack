# Webpack for WordPress theme

> webpack setup for developing wordpress themes for my own personal reference

### Included

- Babel
- SCSS => CSS
- One global js script for all pages (js/global/*.js)
- Single js files (js/single/*.js)
- Files hashed to avoid cache problems
- Browsersync (refresh/inject on css, js, or php changes)
- functions.php: Automatically include latest version of files in the theme

### How to use

Be sure to have your local server running (using flywheel, mamp or whatever).

Copy over all of these files to the root of your theme. **Add the code from functions.php to your own.**

Then, in `webpack.config.js`, change the proxy url (default http://localhost:8888/) to point to wherever your local server is running.

Then, be sure to run these commands from the root of the theme:

``` bash
# install packages
npm init

# run development with browsersync
# default at localhost:3000
npm run dev

# build for production
npm run build
```

