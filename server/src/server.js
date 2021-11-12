const admin = require('./config/firebase-config')
const express = require('express')
const db = admin.firestore()
const app = express();
const port = 5000;
const cors = require('cors');
// import CheckLogged from './middleware';

const middleware = require('./middleware');

app.use(cors());
// app.use(CheckLogged());

app.use(middleware.decodeToken);


// ************** USERS ****************

//get a single contact
app.get('/api/users/:userId', (req, res) => {

    const userId = req.params.userId;

    admin.auth().getUser(userId).then((u) => {
        const user = {
            id: userId,
            email: u.email,
        }
        console.log("Acceso al usuario " + user.email)
        return res.status(200).send(JSON.stringify(user))

    }).catch(error => {
        console.log("Usuario no encontrado")
        res.status(500).send({ error: error.message });
    })

});

// Delete a user
app.delete('/api/users/:userId', (req, res) => {


    const userId = req.params.userId;
    try {
        admin.auth()
            .deleteUser(userId)
            .then(() => {
                console.log('Successfully deleted user');
                return res.status(204).send('Successfully deleted user')
            })
    } catch (error) {
        console.log('Error deleting user:', error);
        return res.status(404).send('Error deleting user:', error)

    }
});

//get all users
app.get('/api/users', async (req, res) => {

    console.log("Acceso a todos los usuarios")

    try {
        const query = db.collection('users');
        const querySnapshot = await query.get();

        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            id: doc.data().uid,
            email: doc.data().email,
            role: doc.data().role,
        }))

        console.log("Acceso a todos los usuarios")
        return res.send(JSON.stringify(response))

    } catch (error) {
        return res.send("ERROR")
    }
})


// ********* TICKETS ******************

//get all worker tickets with state acepted
// Worker is at dashboard and wants too see all tickets he's accepeted or done
// Worker wants to see all tickets with state "aceptar" or "finalizado" and type "limpieza"
http://localhost:5000/api/tickets/workerID/jzHNOmnt2NbiFAAFesfILqEnWs63?type=limpieza&state=aceptado
app.get('/api/tickets/workerID/:workerID', async (req, res) => {

    console.log(req.query)
    try {

        var query = db.collection('tickets')

        if (req.query.type) {

            query = query.where("type", "==", req.query.type)

        }

        if (req.query.state) {

            query = query.where("state", "==", req.query.state)

        }

        const querySnapshot = await query.get();

        const docs = querySnapshot.docs;

        const response = docs.map(doc => doc.data())

        return res.send(JSON.stringify(response))

    } catch (error) {
        return res.send(error)
    }
})

//get all worker tickets with state acepted
// Worker is at dashboard and wants too see all tickets he's accepeted or done
// Worker wants to see all tickets with state "aceptar" or "finalizado" and type "limpieza"
http://localhost:5000/api/tickets/state/aceptado/type/limpieza/workerID/jzHNOmnt2NbiFAAFesfILqEnWs63
app.get('/api/tickets/state/:state/type/:type/workerID/:workerID', async (req, res) => {

    try {
        const query = db.collection('tickets')
            .where("state", "==", req.params.state)
            .where("type", "==", req.params.type)
            .where("worker", "==", req.params.workerID)

        const querySnapshot = await query.get();

        // const response = querySnapshot.docs[0].data();

        const response = querySnapshot.docs.map(doc => doc.data())

        return res.send(JSON.stringify(response))

    } catch (error) {
        return res.send(error)
    }
})

//get all tickets with state and type
// Worker is at dashboard and wants to see tickets to accept
// Worker wants to see all tickets with state "solicitar" and type "limpieza"
http://localhost:5000/api/tickets/state/solicitar/type/limpieza
app.get('/api/tickets/state/:state/type/:type', async (req, res) => {

    try {
        const query = db.collection('tickets')
            .where("state", "==", req.params.state)
            .where("type", "==", req.params.type);

        const querySnapshot = await query.get();

        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            apartmentID: doc.data().apartmentID,
            state: doc.data().state,
            type: doc.data().type
        }))

        console.log("Acceso a todos los usuarios")
        return res.send(JSON.stringify(response))

    } catch (error) {
        return res.send("ERROR")
    }
})



//get all tickets with state
// Example: teneant wants to see all tickets he's created with state "solicitar"
http://localhost:5000/api/tickets/state/solicitar/tenantID/CPNDFv5mzwfCKnyj4dvTBdq5FLz1
app.get('/api/tickets/state/:state/tenantID/:tenantID', async (req, res) => {

    try {

        const query = db.collection('tickets')
            .where("state", "==", req.params.state)
            .where("tenantID", "==", req.params.tenantID)

        const querySnapshot = await query.get();

        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            id: doc.id,
            apartmentID: doc.data().apartmentID,
            state: doc.data().state,
            tenantID: doc.data().tenantID,
            type: doc.data().type

        }))

        return res.send(JSON.stringify(response))

    } catch (error) {
        return res.send("ERROR")
    }
})

//create new ticket with apartament, state and type
// Example: teaneant creates a request ticket to clean the apartament 
http://localhost:5000/api/tickets/tenantID/CPNDFv5mzwfCKnyj4dvTBdq5FLz1/apartmentID/AUTIcH0MtHM4ViZ5wu39/state/solicitar/type/limpieza
app.post('/api/tickets/tenantID/:tenantID/apartmentID/:apartmentID/state/:state/type/:type', async (req, res) => {

    try {

        //IF USER IS TENANT THEN tenant: req.params.userID
        //IF USER IS ADMIN THEN search the actual tenant who's in the apartment
        //and put it automatically

        const newTicket = {
            apartmentID: req.params.apartmentID,
            createdBy: req.params.tenantID,
            state: req.params.state,
            type: req.params.type,
            tenant: req.params.tenantID
        }

        db.collection('tickets').add(newTicket);

        return res.status(201).send('Ticket added correctly' + "\n" + JSON.stringify(newTicket))

    } catch (error) {
        return res.send("ERROR")
    }
})

//create new ticket with apartament, state and type
// Example: admin creates a request ticket to clean the apartament 
http://localhost:5000/api/tickets/adminID/jzHNOmnt2NbiFAAFesfILqEnWs63/apartmentID/AUTIcH0MtHM4ViZ5wu39/state/solicitar/type/limpieza
app.post('/api/tickets/adminID/:adminID/apartmentID/:apartmentID/state/:state/type/:type', async (req, res) => {

    try {

        //IF USER IS TENANT THEN tenant: req.params.userID
        //IF USER IS ADMIN THEN search the actual tenant who's in the apartment
        //and put it automatically

        const query = db.collection('tenants')
            .where("apartmentID", "==", req.params.apartmentID)
            .where("state", "==", "active")


        const querySnapshot = await query.get();


        const docs = querySnapshot.docs;

        const tenant = docs[0].data().userID;

        const newTicket = {
            apartmentID: req.params.apartmentID,
            createdBy: req.params.adminID,
            state: req.params.state,
            type: req.params.type,
            tenantID: tenant
        }

        db.collection('tickets').add(newTicket);

        return res.status(201).send('Ticket added correctly' + "\n" + JSON.stringify(newTicket))

    } catch (error) {
        return res.send("ERROR")
    }
})

// UPDATE ticket from state "solicitar" to "aceptar"
// Example: worker "cleaner" accepts a ticket
http://localhost:5000/api/tickets/ticketId/kVSy9FMC3CDDhdnbgx2n/worker/jzHNOmnt2NbiFAAFesfILqEnWs63/stateAfter/aceptado
app.put('/api/tickets/ticketId/:ticketId/worker/:worker/stateAfter/:stateAfter', async (req, res) => {

    try {

        const newTicket = {
            worker: req.params.worker,
            state: req.params.stateAfter
        }

        db.collection('tickets').doc(req.params.ticketId).update(newTicket)

        return res.status(201).send("Ticket updated correctly" + "\n" + JSON.stringify(newTicket))

    } catch (error) {
        return res.status(500).send("ERROR UPDATING TICKET")
    }
})






// ********** APARTAMENTS ************

//get all apartments
app.get('/api/apartments', async (req, res) => {
    // console.log(req.headers.authorization)
    try {
        const query = db.collection('apartaments');
        const querySnapshot = await query.get();

        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            block: doc.data().block,
            number: doc.data().number

        }))

        console.log("Acceso a todos los apartamentos")
        return res.send(JSON.stringify(response))

    } catch (error) {
        return res.send("ERROR")
    }


})

app.listen(port, () => {
    console.log('server is running on port ${port}')
})