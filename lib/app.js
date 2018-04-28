const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const birdRouter = require('./routes/birds');

const app = new Koa();

app.use(bodyParser());
app.use(async(ctx, next) => {
    try {
        await next();
        if(ctx.status === 404) ctx.throw(404, 'resource not found');
    }
    catch(err) {
        ctx.status = err.status || 500;
        ctx.body = `*** ERROR ***\ncode: ${ctx.status}\nmessage: ${err.message}`;
    }
});

app.use(birdRouter.routes())
    .use(birdRouter.allowedMethods());

module.exports = app;