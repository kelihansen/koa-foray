const Router = require('koa-router');
const Bird = require('../models/Bird');

const router = new Router({ prefix: '/birds' });

module.exports = router
    .get('/', async ctx => {
        ctx.body = 'Hello world!';
    });


