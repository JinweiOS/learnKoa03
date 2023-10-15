import Koa from 'koa'
import router from './src/router.js'
import { valid } from './src/middleware/valid.js'
import { koaBody } from 'koa-body'
import mount from 'koa-mount'
import serve from 'koa-static'
import cors from '@koa/cors'

// 1. server即为文档中的application对象
const apiApp = new Koa()

// 一、验证用户是否合法
// server.use(valid)
apiApp.use(cors())
apiApp.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: `${process.cwd()}/upload`,
    maxFieldsSize: 2 * 1024 * 1024 * 1024, // 2gb
    keepExtensions: true,
    onFileBegin: (name, file) => {
      // 生成新的文件名
      const fileName = `tuchuang_${file.newFilename}`

      // filepath:  c:/user/dalina/project/beingthink/learnKoa03/upload/00003223423432r23.png
      file.filepath = `${file.filepath.replace(file.newFilename, fileName)}`;
      file.newFilename = fileName
    },
  }
}))

// 二、处理业务逻辑
apiApp.use(router.routes()).use(router.allowedMethods())


const staticFileApp = new Koa()
staticFileApp.use(serve(`${process.cwd()}/frontend`))

// server
const server = new Koa()
server.use(mount('/', staticFileApp));
server.use(mount('/api', apiApp));
// TODO: history模式的支持
server.listen(3000, '0.0.0.0', () => {
  console.log('server is listening on http://127.0.0.1:3000')
})