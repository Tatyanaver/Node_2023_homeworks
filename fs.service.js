const fs = require('node:fs/promises')
const path = require('node:path');


const dbPath = path.join(process.cwd(), 'database', 'users.json');
const reader= async ()=> {
    const info = await fs.readFile(dbPath)
    const data = info.toString();
    return data ? JSON.parse(data) : [];
}

const writer = async (users)=> {
    await fs.writeFile(dbPath, JSON.stringify(users))
}


module.exports = {
    reader,
    writer
}