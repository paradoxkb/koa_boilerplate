/**
 * Created by watcher on 7/16/18.
 */
const path = require('path');
const views = require('koa-views');
const serve = require('koa-static');
const i18n = require('koa-i18n');
const locale = require('koa-locale');
const Koa = require('koa');
const app = module.exports = new Koa();
const router = require('./routers/index');

const { PORT } = require('./config')

require('./db');
locale(app)

// setup views, appending .ejs
// when no extname is given to render()

app.use(views(path.join(__dirname, '/views'), { extension: 'jade' }));
app.use(router.routes())
app.use(serve(__dirname + '/assets/'))

app.use(i18n, {
    directory: './config/locales',
    locales: ['en', 'ru'],
    modes: [
        'query',
        'header',
    ]
})

app.use(ctx => {
    ctx.body = ctx.i18n.__('any key')
})

if (!module.parent) {
    app.listen(PORT);
    console.log(`App listen on 0.0.0.0:${PORT}`)
}
