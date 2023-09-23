import KoaRouter from 'koa-router'

const router = new KoaRouter()
// 注册路由表
router.get('/', (ctx) => {
  ctx.body = 'hello world'
})

router.post('/:userId', (ctx) => {
  console.log(ctx)
  ctx.body = 'hello world'
  console.log(ctx.header)
  console.log(ctx.query)
  console.log(ctx.params)
  console.log(ctx.request.body)
  console.log(ctx.request.files)
  ctx.req.on('data', (chunk) => {
    console.log(chunk.toString())
  })
})

router.post('/login', (ctx) => {
  ctx.body = 'login'
})

export default router