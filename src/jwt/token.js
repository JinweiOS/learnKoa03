import jwt from 'jsonwebtoken'
const secret = '1QWSDFGYYTREDCVH'

function createToken(id) {
  return jwt.sign({ userid: id, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, secret)
}

// console.log(createToken('BUUH'))
// 给你两个日期，如何计算两个日期之间相差多少天？
// const date = new Date(1695448856)
// console.log(`${date.getFullYear()}/${date.getDay()}/${date.getMonth()}`)\
function validToken(token) {
  let data
  try {
    data = jwt.verify(token, secret)
  } catch (err) {
    console.log(err)
    return null
  }
  return data
}

export {
  createToken,
  validToken
}