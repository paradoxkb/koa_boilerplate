/**
 * Created by watcher on 7/16/18.
 */
const router = require('koa-router')()
const koaBody = require('koa-body')
const { create, list, removeTask } = require('../models/Task')

const tasks = [
    {
        title: 'Task 1',
        createdAt: new Date()
    },
    {
        title: 'Task 2',
        createdAt: new Date()
    },
    {
        title: 'Task 3',
        createdAt: new Date()
    },
    {
        title: 'Task 4',
        createdAt: new Date()
    },
    {
        title: 'Task 5',
        createdAt: new Date()
    }
]

const defaultState = { title: 'TODO Boilerplate', tasks }

router.get('/', async(ctx, next) => {
    const tasks = await list()

    ctx.state = { ...defaultState, tasks }

    await ctx.render('index', {})
})

router.post('/task', koaBody(), async(ctx, next) => {
    const { newtask } = ctx.request.body

    const created = await create({ title: newtask })
    console.log('> ', created)
    // ctx.state = defaultState
    ctx.redirect('/')
})

router.del('/task/:id', async(ctx, next) => {
    const targetId = ctx.params.id;

    const removed = await removeTask(targetId);
    ctx.status = 200;
})

module.exports = router
