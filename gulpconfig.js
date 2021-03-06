/*
  Gulp configuration file.
  inhabited by source & build folder variables
  and gulp task configurations (tasks located in ./gulp/**)
*/
var src               = './source',
    content           = src + '/content',
    templates         = src + '/templates',
    assets            = src + '/assets',
    scripts           = src + '/scripts',
    styles            = src + '/styles',
    // build            = src + '/build',
    build             = '../spende-einen-tab.github.io', // build repo outside of this project…
    buildAssets       = build +  '/img',
    domain            = 'http://spende-einen-tab.de/'
    version           = "1.0.1";

// all gulp task configurations & settings will be found here
module.exports = {
  browserSync: {                                  // https://www.npmjs.com/package/browser-sync
    server: {
      baseDir: build
    },
    files: build,
    port: 1893,
    // https: true,
    open: "local",
    browser: "google chrome"
  },
  metalsmith: {                                   // https://www.npmjs.com/package/metalsmith
    src: content,
    dest: build,
    clean: false,
    metadata: {
      name: "Spende Einen Tab!",
      version: version,
      title: 'Spende-Einen-Tab.de',
      // private: true,
      description: "description!",
      author: "Daniel Kurtius",
      site: {
        url: domain,
        name: "Spende-Einen-Tab.de",
        lang: "de",
        locale: "de_DE",
        analyticsID: "UA-108923431-1",
        googleVerification: "lH8EtiixhdD3XFoHzlxAp9mfqkatT3_uDEB4V2TtvI4",
        "meta-canonical": domain,
        "meta-description": "Auf Spende-Einen-Tab.de kannst Du die Zeit, in der diese Seite offen ist, in eine Spende verwandeln."
      }
    },
    config: {
      contentRoot: "./content",
      assetRoot: "./sources/assets",
      scriptRoot: "./sources/scripts",
      styleRoot: "./sources/styles",
      layoutRoot: "./sources/layouts",
      destRoot: "./build"
    },
    plugins:{
      "metalsmith-drafts": true,                  // https://www.npmjs.com/package/metalsmith-drafts
      "metalsmith-collections": {                 // https://www.npmjs.com/package/metalsmith-collections
        pages: {
          sortBy: "rank",
          reverse: false,
        }
      },
      "metalsmith-markdown": {                    // https://github.com/segmentio/metalsmith-markdown"
        smartypants: true,
        gfm: true,
        tables: true
      },
      "metalsmith-permalinks": {                  // https://www.npmjs.com/package/metalsmith-permalinks
        pattern: ":url",
        relative: false
      },
      "metalsmith-register-helpers": {            // https://www.npmjs.com/package/metalsmith-register-helpers
        directory: templates + "/helpers"
      },
      "metalsmith-layouts": {                     // https://www.npmjs.com/package/metalsmith-layouts
        engine: "handlebars",
        directory: templates,
        partials: templates + "/partials",
        default: "miner.hbs",
        rename: true
      },
      "metalsmith-sitemap": {                     // https://github.com/ExtraHop/metalsmith-sitemap
        hostname: domain
      }
    }
  },
  scripts: {                                      // just moving & watching
    src: src + "/scripts/**/*.js",
    dest: build + "/js"
  },
  sass: {                                         // https://www.npmjs.com/package/gulp-sass
    src: src + "/styles/**",
    dest: build + "/css"
  },
  images: {                                       // just moving & watching
    src: {
      root: src + "/assets/**",
      imgs: src + "/assets/images/**",
      icons: src + "/assets/icons/**"
    },
    dest: {
      root: build + "/",
      imgs: build + "/img",
      icons: build + "/"
    }
  },
  minifyHTML: {                                   // https://www.npmjs.com/package/gulp-htmlmin
    src:  build + '/**/*.html',
    dest: build,
    options: {
      collapseWhitespace: true,
      removeComments: true
    }
  },
  minifyCSS: {                                    // https://www.npmjs.com/package/gulp-cleancss
    src: build + "/css/**/*.css",
    dest: build + "/css",
    options: {
      debug: true,
      processImport: true,
      // processImportFrom: ["!fonts.googleapis.com"],
      keepSpecialComments: '*' // '*',1,0
    }
  },
  purifyCSS: {                                    // https://github.com/purifycss/gulp-purifycss
    src:  build + "/css/**/*.css",
    dest: build + "/css",
    js:   build + "/**/*.js",
    html: build + "/**/*.html",
    options: {
      // rejected: true
    }
  },
  minifyJS: {                                     // https://www.npmjs.com/package/gulp-uglify
    src: src + "/scripts/**/*.js",
    dest: build + "/js",
    options: {
      preserveComments: 'license'
    }
  },
  minifySVG: {                                    // https://www.npmjs.com/package/gulp-svgo
    src: build + "/img/**",
    dest: build + "/img",
  },
};
