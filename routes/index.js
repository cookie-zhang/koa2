const router = require('koa-router')()


//引入方法  定义接口  ctx.render 渲染页面   ctx.body 返回数据
router.get('/', async (ctx, next) => {
  ctx.cookies.set('cookie', Math.random());
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
    cookie: ctx.cookies.get('cookie')
  }
})

//await 后面是一个promise对象  即使不是promise对象也会自动转化为promise对象
//比如 const b = await 12   自动转化为 const b = await Promise.rsolve(12)
//async await 解决了异步问题 也不需要不断得.then()  
router.get('/testAsync', async (ctx)=>{
  global.console.log('start', new Date().getTime())
  const a = await new  Promise((resolve, reject)=>{
    setTimeout(function(){
      global.console.log('async a ', new Date().getTime())
      resolve('a')
    },1000);
  })
  ctx.body={
    a
  }
})

module.exports = router
