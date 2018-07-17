/**
 * Created by watcher on 7/16/18.
 */
const path = require('path');
const views = require('koa-views');
const serve = require('koa-static');
const i18next = require('i18next');
const Backend = require('i18next-sync-fs-backend');
const Koa = require('koa');
const app = module.exports = new Koa();
const router = require('./routers/index');

const { PORT } = require('./config');
require('./db');

// setup views, appending .ejs
// when no extname is given to render()

app.use(views(path.join(__dirname, '/views'), { extension: 'jade' }));
app.use(serve(__dirname + '/assets/'));
app.use(router.routes());

i18next.use(Backend)
    .init({
        backend: {
            loadPath: path.resolve('./config/locales/{{lng}}.json')
        },
        preload: ['en', 'ru'],
        fallbackLng: 'en'
    })

if (!module.parent) {
    app.listen(PORT);
    console.log(`App listen on 0.0.0.0:${PORT}`)
}
