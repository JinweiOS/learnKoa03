
import crypto from 'crypto'

const hash = crypto.createHash('sha256');

const salt = '!QWSDCVGY^%R'

function getSha256(str) {
  const code = hash.update(str + salt);
  const aimStr = hash.digest(code);
  return aimStr.toString('hex')
}

export default getSha256
