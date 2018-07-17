/**
 * Created by watcher on 7/16/18.
 */
const router = require('koa-router')()
const koaBody = require('koa-body')
const i18next = require('i18next');
const koaI18next = require('koa-i18next');
const { create, list, removeTask } = require('../models/Task')

const defaultState = { title: 'TODO Boilerplate', tasks: [], lng: 'en' }

router.get('/', koaI18next(i18next, {
    lookupQuerystring: 'lng',
    next: true
}), async(ctx, next) => {
    const tasks = await list()

    ctx.state = {
        ...defaultState,
        tasks,
        __: ctx.t,
        nextLng: ctx.lng.includes('en') ? 'ru' : 'en'
    }

    await ctx.render('index', {})
})

router.post('/task', koaBody(), async(ctx, next) => {
    const { newtask } = ctx.request.body

    const created = await create({ title: newtask })
    ctx.redirect('/')
})

router.del('/task/:id', async(ctx, next) => {
    const targetId = ctx.params.id;

    const removed = await removeTask(targetId);
    ctx.status = 200;
})

module.exports = router
