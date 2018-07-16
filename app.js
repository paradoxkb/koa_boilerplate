/**
 * Created by watcher on 7/16/18.
 */
const path = require('path');
const views = require('koa-views');
const Koa = require('koa');
const app = module.exports = new Koa();
const router = require('./routers/index');

const { PORT } = require('./config')

require('./db');

// setup views, appending .ejs
// when no extname is given to render()

app.use(views(path.join(__dirname, '/views'), { extension: 'jade' }));
app.use(router.routes())

if (!module.parent) {
    app.listen(PORT);
    console.log(`App listen on 0.0.0.0:${PORT}`)
}
