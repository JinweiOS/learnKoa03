import Koa from 'koa'
import router from './src/router.js'
import { valid } from './src/middleware/valid.js'
import { koaBody } from 'koa-body'

// 1. server即为文档中的application对象
const server = new Koa()

// 一、验证用户是否合法
// server.use(valid)
server.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: `${process.cwd()}/upload`,
    maxFieldsSize: 2 * 1024 * 1024 * 1024, // 2gb
    keepExtensions: true,
    onFileBegin: (name, file) => {
      // 生成新的文件名
      const fileName = `tuchuang_${file.newFilename}`

      // filepath:  c:/user/dalina/project/beingthink/learnKoa03/upload/00003223423432r23.png
      // file.newFilename
      file.filepath = `${file.filepath.replace(file.newFilename, fileName)}`;
    },
  }
}))

// 二、处理业务逻辑
server.use(router.routes()).use(router.allowedMethods())


server.listen(3000, '0.0.0.0', () => {
  console.log("Server is listening on http://127.0.0.1:3000")
})