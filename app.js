const express = require('express');
const serv = require('./fs.service');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// app.get('/welcome',(req, res)=>{
//     res.send('Welcome!')
// })


app.get('/users', async (req, res)=>{
    const users = await serv.reader()
    res.json(users)
})

app.get('/users/:userId', async (req, res)=>{
    const {userId} = req.params;

    const users = await serv.reader()
    const user = users.find((user) => user.id === +userId)
    if (!user) {
        res.status(422).json (`user with id ${userId} not found`)
    }

    res.json (user)
});

app.post('/users', async (req, res)=>{
    const {name,age, gender} = req.body
    if(!name || name.length<2 ) {
        res.status(400).json('not full name')
    }

    if(!age || !Number.isInteger(age) || Number.isNaN(age)) {
        res.status(400).json('wrong age')
    }
    if(!gender || (gender !== 'male' && gender !== 'female')) {
        res.status(400).json('wrong gender')
    }

    const users = await serv.reader();
    const newUser = {
        id: users[users.length-1]?.id + 1 || 1,
        name,
        age,
        gender};

    users.push(newUser);

    await serv.writer(users)
    res.status(201).json(newUser)
})

app.patch('/users/:userId', async (req, res) => {
    const {userId} = req.params
    const {name,age,gender} = req.body;

    if(name || name.length<2 ) {
        res.status(400).json('not full name')
    }

    if(age || !Number.isInteger(age) || Number.isNaN(age)) {
        res.status(400).json('wrong age')
    }
    if(gender || (gender !== 'male' && gender !== 'female')) {
        res.status(400).json('wrong gender')
    }

    const users = await serv.reader();
    const index = users.findIndex((user) => user.id === +userId);


    if (index=== -1) {
        res.status(422).json (`user with id ${userId} not found`)
    }
    users[index] = {...users[index], ...req.body};

    await serv.writer(users)
    res.status(201).json(users[index])
})


app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const users = await serv.reader();

   const index = users.findIndex((user) => user.id === +userId);
    if (index=== -1) {
        res.status(422).json (`user with id ${userId} not found`)
    }

    users.splice(index, 1);

    await serv.writer(users)
    res.sendStatus(204);
})


//
//
// app.put('/users/:userId', (req, res)=>{
//     const { userId } = req.params;
//     const updatedUser = req.body;
//
//     users[+userId] = updatedUser;
//
//     res.status(200).json({
//         message: 'User updated',
//         data: users[+userId]
//     })
// })
//
// app.delete('/users/:userId', (req, res)=>{
//     const { userId } = req.params;
//
//     users.splice(+userId, 1);
//
//     res.status(200).json({
//         message: 'User deleted',
//     })
// })

const PORT = 5100;

app.listen(PORT,() => {
    console.log(`server has started on port ${PORT}`)
})