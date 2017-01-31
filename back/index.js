import "babel-polyfill";
import Koa from 'koa';
import KRouter from 'koa-router';
import KStatic from 'koa-static';

const GOOD = 'Good';
const OK   = 'OK';
const BAD  = 'Bad';

const router = KRouter();
router
  .get('/', function *(next) {
    this.body = "hey";
  })
  .get('/quality/:spot_id/:day', function *(next) {
    this.body = {quality: GOOD};
  });

const app = Koa();
app
  .use(KStatic('.'))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
