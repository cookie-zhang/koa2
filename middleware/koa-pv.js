// 中间件demo

//ctx是一个对象 关联这request  response
function pv(ctx){
    global.console.log("pv 中间件 demo "+ctx.path)
}


module.exports = function(){
    return async function(ctx,next){
        global.console.log('pv start')
        pv(ctx)
        await next()
        global.console.log('pv end')
    }
}