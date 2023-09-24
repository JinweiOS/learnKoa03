import KoaRouter from 'koa-router'
import path from 'node:path'
import fs from 'node:fs'
import { getMimeType } from './mime/mime.js'

const router = new KoaRouter()

// 注册路由表
router.get('/api', (ctx) => {
  ctx.body = 'hello world'
})

// router.post('/:userId', (ctx) => {
//   console.log(ctx)
//   ctx.body = 'hello world'
//   console.log(ctx.header)
//   console.log(ctx.query)
//   console.log(ctx.params)
//   console.log(ctx.request.body)
//   console.log(ctx.request.files)
//   ctx.req.on('data', (chunk) => {
//     console.log(chunk.toString())
//   })
// })

// CURD BOY
router.post('/api/login', (ctx) => {
  // 1.与前端定义出接口库的请求方法，请求路径和请求参数
  // 2.取参数，参数校验（必选参数，参数类型，可选参数）参数校验框架
  // 3.业务逻辑（如果逻辑非常，做好逻辑拆分）
  // 3.1 操作数据库
  // 4.给前端返回数据（ctx.body = {code:0, data: {}, msg:'ok'})
  // 4.1 不同错误类型，需要定义错误码
  ctx.body = 'login'
})

router.post('/api/upload', (ctx) => {
  ctx.body = {
    code: 0,
    msg: '成功',
    data: null
  }
})

router.get('/', (ctx) => {
  const filename = 'index.html'
  const filePath = path.join(process.cwd(), `upload/dist/${filename}`)
  ctx.set('Content-Type', getMimeType(filePath))
  const fileRS = fs.createReadStream(filePath)
  ctx.body = fileRS
})

router.get('/:filename', (ctx) => {
  const filename = ctx.params.filename
  const filePath = path.join(process.cwd(), `upload/dist/${filename}`)
  ctx.set('Content-Type', getMimeType(filePath))
  const fileRS = fs.createReadStream(filePath)
  ctx.body = fileRS
})

router.get('/:filename/:other', (ctx) => {
  const filename = ctx.params.filename
  const otherName = ctx.params.other
  // http://127.0.0.1:3000/download/tuchuang_6c8b1d3803e1ff2cc4168fb00.png
  const filePath = path.join(process.cwd(), `upload/dist/${filename}/${otherName}`)
  ctx.set('Content-Type', getMimeType(otherName))
  const fileRS = fs.createReadStream(filePath)
  ctx.body = fileRS
})

export default router