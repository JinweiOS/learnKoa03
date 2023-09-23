import Koa from 'koa'

const server = new Koa()

server.use((ctx) => {
  ctx.body = 'hello world'
})

server.listen(8080, '0.0.0.0', () => {
  console.log("Server is listening on http://127.0.0.1:8080")
})