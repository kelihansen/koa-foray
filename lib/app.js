const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const birdRouter = require('./routes/birds');

const app = new Koa();

app.use(bodyParser());
app.use(async(ctx, next) => {
    try {
        await next();
    }
    catch(err) {
        ctx.status = err.status || 500;
        ctx.body = 'something has gone wrong';
        console.log(`error: ${ctx.status} ${err.message}`); // eslint-disable-line
    }
});

app.use(birdRouter.routes())
    .use(birdRouter.allowedMethods());

module.exports = app;