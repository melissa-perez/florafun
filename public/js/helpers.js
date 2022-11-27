/*************************************
  Credits to Tom22 and Community[Bot] 
  https://stackoverflow.com/questions/41423727/handlebars-registerhelper-serverside-with-expressjs
**************************************/

module.exports = {
  ifeq: function (a, b, options) {
    if (a === b) {
      return options.fn(this)
    }
    return options.inverse(this)
  },
  toLowerCase: function (str) {
    return str.toLowerCase()
  },
  removeLastLetter: function (str) {
    return str.slice(0, -1)
  },
  checkIfVowel: function (str) {
    const vowels = new Set('a', 'e', 'i', 'o', 'u')
    return vowels.has(str[0].toLowerCase())
  },
  jsonHelper: function (context) {
    return JSON.stringify(context)
  },
  returnKey: function (keys, index) {
    return keys[index]
  }
}
