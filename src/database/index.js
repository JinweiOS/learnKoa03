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
  console.log(result)
}

const result = await createUser({name: '彭金为2号', passwd: '123456'})
// console.log(result)
export {
  createUser
}