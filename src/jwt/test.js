// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJCVVVIIiwiaWF0IjoxNjk1NDQ4ODU2fQ.AJ4Y1EmFj3yBLxWZEg4KeA9zasu80_pIChd9nwTH1ec
import { Buffer } from 'node:buffer'
import { createToken } from './token.js'
// const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
// const playload = 'eyJ1c2VyaWQiOiJCVVVIIiwiaWF0IjoxNjk1NDQ4ODU2fQ'


// console.log(Buffer.from(header, 'base64').toString())
// console.log(Buffer.from(playload, 'base64').toString())
console.log(createToken('pjw'))