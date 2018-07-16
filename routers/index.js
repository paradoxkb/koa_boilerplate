/**
 * Created by watcher on 7/16/18.
 */
const router = require('koa-router')()

router.get('/', async(ctx, next) => {
    ctx.state = { title: 'TODO Boilerplate' }

    await ctx.render('index', {})
})

module.exports = router
