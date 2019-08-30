const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')  //以下这些都是中间件  都是使用app.use（  ） 去使用   中间件得使用没有顺序问题
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')

const index = require('./routes/index')
const users = require('./routes/users')
const pv = require('./middleware/koa-pv')
const m1 = require('./middleware/koa-m1')
const m2 = require('./middleware/koa-m2')




// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(pv())
app.use(m1())
app.use(m2())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

mongoose.connect(dbConfig.dbs,{useNewUrlParser:true},function(err){
  if(err){
      console.log('Connect error:' + err)
  }else{
      console.log('Connect success' )
  }

})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
