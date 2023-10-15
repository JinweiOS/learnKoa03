import KoaRouter from 'koa-router'
import path from 'node:path'
import fs from 'node:fs'
import { getMimeType } from './mime/mime.js'
import { createUser, getImgList, createImg } from './database/index.js'

const router = new KoaRouter()

// 注册路由表
router.get('/', (ctx) => {
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
router.post('/login', (ctx) => {
  // 1.与前端定义出接口库的请求方法，请求路径和请求参数
  // 2.取参数，参数校验（必选参数，参数类型，可选参数）参数校验框架
  // 3.业务逻辑（如果逻辑非常，做好逻辑拆分）
  // 3.1 操作数据库
  // 4.给前端返回数据（ctx.body = {code:0, data: {}, msg:'ok'})
  // 4.1 不同错误类型，需要定义错误码
  ctx.body = 'login'
})

router.post('/upload', (ctx) => {
  ctx.body = {
    code: 0,
    msg: '成功',
    data: null
  }
})

// router.get('/', (ctx) => {
//   const filename = 'index.html'
//   const filePath = path.join(process.cwd(), `upload/dist/${filename}`)
//   ctx.set('Content-Type', getMimeType(filePath))
//   const fileRS = fs.createReadStream(filePath)
//   ctx.body = fileRS
// })

// router.get('/:filename', (ctx) => {
//   const filename = ctx.params.filename
//   const filePath = path.join(process.cwd(), `upload/dist/${filename}`)
//   ctx.set('Content-Type', getMimeType(filePath))
//   const fileRS = fs.createReadStream(filePath)
//   ctx.body = fileRS
// })

// router.get('/:filename/:other', (ctx) => {
//   const filename = ctx.params.filename
//   const otherName = ctx.params.other
//   // http://127.0.0.1:3000/download/tuchuang_6c8b1d3803e1ff2cc4168fb00.png
//   const filePath = path.join(process.cwd(), `upload/dist/${filename}/${otherName}`)
//   ctx.set('Content-Type', getMimeType(otherName))
//   const fileRS = fs.createReadStream(filePath)
//   ctx.body = fileRS
// })

// 注册逻辑
router.post('/register', async (ctx) => {
  // 1. 获取参数
  const { username, password } = ctx.request.body
  // 2. 参数校验
  if (username && password) {
    // 保存一下用户信息
    const result = await createUser({ name: username, passwd: password })
    ctx.body = {
      code: 0,
      data: null,
      msg: 'ok'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '用户名或者密码不存在',
      data: null
    }
  }
})

// 获取所有图片
router.get('/img/list', async (ctx) => {
  const {pageSize, pageNum} = ctx.query
  const result = await getImgList(pageSize, pageNum)
  ctx.body = {
    code: 0,
    data: result,
    msg: 'ok'
  }
})

// 上传图片
router.post('/img/upload', async (ctx) => {
  console.log(ctx.request.files)
  const filename = ctx.request.files.file.newFilename
  const size = ctx.request.files.file.size
  const type = ctx.request.files.file.mimetype
  // 换成公网ip地址
  const link = 'http://127.0.0.1:3000/api/download/' + filename
  const imgId = await createImg(filename, size, link)
  ctx.body = {
    code: 0,
    data: {
      filename,
      link,
      size,
      imgId
    },
    msg: 'ok'
  }
})

// 托管上传的静态文件
router.get('/download/:filename', (ctx) => {
  const filename = ctx.params.filename
  // http://127.0.0.1:3000/download/tuchuang_6c8b1d3803e1ff2cc4168fb00.png
  const filePath = path.join(process.cwd(), `upload/${filename}`)
  ctx.set('Content-Type', getMimeType(filePath))
  const fileRS = fs.createReadStream(filePath)
  ctx.body = fileRS
})

export default router