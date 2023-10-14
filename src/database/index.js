import { createPool } from 'mysql2/promise'
import { v4 as uuidv4 } from 'uuid'
import generatePasswd from './passwd.js'

// 数据库第一天查询可以，但是间隔几天回出现报错
// 这时候排查是否是数据库连接断开
const mysql = await createPool({
  host: '192.168.156.131',
  port: 3306,
  user: 'tuchuang',
  database: 'tuchuang',
  password: '123456'
})

async function getAllUser() {
  const [rows] = await mysql.execute('select * from user')
  return rows
}

async function createUser(user) {
  const { name, passwd } = user
  // passwd不会直接放到数据库中
  const result = await mysql.execute('insert into user(uid, username, password) VALUES (?, ?, ?)', [uuidv4(), name, generatePasswd(passwd)])
  return result[0].affectedRows === 1
}

// 分页获取图片
async function getImgList(ps, pn) {
  const [rows] = await mysql.execute('select * from picture order by pid limit ? offset ?', [`${ps}`, `${ps * (pn - 1)}`])
  console.log(rows)
  return rows
}

// 插入图片
async function createImg(imgName, size, link) {
  const uuid = uuidv4()
  await mysql.execute('insert into picture(pid, p_name, size, link) values(?, ?, ?, ?)', [uuid, imgName, size, link])
  return uuid
}

// for(let i = 0; i < 100; i++) {
//   await createImg('测试', 100, 'https://www.baidu.com')
// }
// console.log(result)
// await getImgList(10, 2) 
export {
  createUser,
  getImgList,
  createImg
}