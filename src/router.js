import KoaRouter from 'koa-router'

const router = new KoaRouter()
// 注册路由表
router.get('/', (ctx) => {
  ctx.body = 'hello world'
})

router.post('/login', (ctx) => {
  ctx.body = 'login'
})

export default router