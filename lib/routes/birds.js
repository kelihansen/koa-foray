const Router = require('koa-router');
const Bird = require('../models/Bird');

const router = new Router({ prefix: '/birds' });

module.exports = router
    .post('/', async ctx => {
        ctx.body = await Bird.create(ctx.request.body);
    });


