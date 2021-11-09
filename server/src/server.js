const admin = require('./config/firebase-config')
const express = require('express')
const db = admin.firestore()
const app = express();
const port = 5000;
const cors = require('cors');
const middleware = require('./middleware');

app.use(cors());

// app.use(middleware.decodeToken);

app.get('/', (req, res) => {
    return res.send('hello world');
})

app.get('/api/apartments', async (req, res) => {
    const query = db.collection('apartaments');
    const querySnapshot = await query.get();

    const docs = querySnapshot.docs;

    const response = docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        block: doc.data().block,
        number: doc.data().number
    }))

    return res.send(response)

})



app.listen(port, () => {
    console.log('server is running on port ${port}')
})