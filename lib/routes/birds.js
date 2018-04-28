const Router = require('koa-router');
const Bird = require('../models/Bird');

const router = new Router({ prefix: '/birds' });

module.exports = router
    .post('/', async ctx => {
        ctx.body = await Bird.create(ctx.request.body);
    })

    .get('/', async ctx => {
        ctx.body = await Bird.find();
    })

    .get('/:id', async ctx => {
        const { id } = ctx.params;

        ctx.body = await Bird.findById(id);
        if(ctx.status === 204) ctx.throw(404, `id ${id} not found`);
    })

    .put('/:id', async ctx => {
        ctx.body = await Bird.findByIdAndUpdate(ctx.params.id, ctx.request.body, {
            new: true,
            runValidators: true
        });
    })

    .delete('/:id', async ctx => {
        const removed = await Bird.findByIdAndRemove(ctx.params.id);
        ctx.body = { deleted: !!removed };
    });


