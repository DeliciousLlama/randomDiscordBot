const fs = require('fs');

function writeFile(usr){
 data = JSON.stringify(usr)
 fs.writeFileSync('usrs.json', data)
}

var usraw = fs.readFileSync('usrs.json')
var usr = JSON.parse(usraw)

exports.usr = usr
exports.writeFile = writeFile
