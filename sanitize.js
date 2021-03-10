// allows us to convert keys to symbols
const conversion = {
  '&#039;': "'",
  '&quot;': '"'
}

let sanitize = function(string) {
  newStr = string
  for (let key in conversion) {
    if (newStr.indexOf(key) > -1) {
      newStr = newStr.replaceAll(key, conversion[key])
    }
  }
  return newStr
}