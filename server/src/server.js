const admin = require('./config/firebase-config')
const express = require('express')
const bodyParser = require('body-parser');
const db = admin.firestore()
const app = express();
const port = 5000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.urlencoded());



// const middleware = require('./middleware');
const { json } = require('express');

app.use(cors());

// app.use(middleware.decodeToken);

app.listen(port, () => {
    console.log('server is running on port ' + port)
})


// ************** USERS ****************

//getRole.js
app.get('/api/rol/userID/:userID', async (req, res) => {

    try {
        db.collection('users')
            .where("id", "==", req.params.userID)
            .get()
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    let role = querySnapshot.docs[0].data().role
                    return res.status(200).send(role)
                }
            })

    } catch (e) {
        res.status(500).send({ error: error.message });
    }
})


// ********* TICKETS ******************

app.get('/api/tickets/workerID/:workerID', async (req, res) => {


    try {

        /// Example: runner wants to see tickets type runner and not cleaning
        const type = await db.collection('workers').where("id", "==", req.params.workerID)
            .get()
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    return querySnapshot.docs[0].data().type
                }
            })



        var query = db.collection('tickets')
            .where("type", "==", type)
            .where("state", "==", req.query.state)

        if (req.query.state != "requested") {
            query = query.where("worker", "==", req.params.workerID)
        }

        const querySnapshot = await query.get();

        const tickets = querySnapshot.docs;

        const response = await Promise.all(tickets.map(async doc => {
            const aptID = await doc.data().apartmentID
            const aptData = await db.collection('apartaments').doc(aptID).get()
                .then((doc) => {
                    if (doc.exists) {
                        return doc.data()
                    }
                })


            const createdByName = await db.collection('users').where("id", "==", doc.data().createdBy)
                .get()
                .then(querySnapshot => {
                    if (!querySnapshot.empty) {
                        return querySnapshot.docs[0].data().userName
                    }
                })

            if (doc.data().tenantID) {
                var tenantName = await db.collection('users')
                    .where("id", "==", doc.data().tenantID)
                    .get()
                    .then(querySnapshot => {
                        if (!querySnapshot.empty) {
                            return querySnapshot.docs[0].data().userName
                        }
                    })
            }

            if (doc.data().worker) {
                var workerName = await db.collection('users')
                    .where("id", "==", doc.data().worker)
                    .get()
                    .then(querySnapshot => {
                        if (!querySnapshot.empty) {
                            return querySnapshot.docs[0].data().userName
                        }
                    })
            }

            const data = {
                ...doc.data(),
                tenantName: tenantName,
                createdByName: createdByName,
                aptBlock: aptData.block,
                aptName: aptData.name,
                aptNumber: aptData.number,
                workerName: workerName,
                ticketID: doc.id,
            }

            return data
        }))


        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({ error: "Worker not found" })
    }
})


app.get('/api/tickets/tenantID/:tenantID', async (req, res) => {

    try {

        var query = db.collection('tickets')
            .where("tenantID", "==", req.params.tenantID)

        if (req.query.type) {
            query = query.where("type", "==", req.query.type)
        }

        if (req.query.state) {
            query = query.where("state", "==", req.query.state)
        }

        const querySnapshot = await query.get();

        const tickets = querySnapshot.docs;

        const response = await Promise.all(tickets.map(async doc => {
            const aptID = await doc.data().apartmentID
            const aptData = await db.collection('apartaments').doc(aptID).get()
                .then((doc) => {
                    if (doc.exists) {
                        return doc.data()
                    }
                })

            const createdByName = await db.collection('users').where("id", "==", doc.data().createdBy)
                .get()
                .then(querySnapshot => {
                    if (!querySnapshot.empty) {
                        return querySnapshot.docs[0].data().userName
                    }
                })

            if (doc.data().tenantID) {
                var tenantName = await db.collection('users')
                    .where("id", "==", doc.data().tenantID)
                    .get()
                    .then(querySnapshot => {
                        if (!querySnapshot.empty) {
                            return querySnapshot.docs[0].data().userName
                        }
                    })
            }

            if (doc.data().worker) {
                var workerName = await db.collection('users')
                    .where("id", "==", doc.data().worker)
                    .get()
                    .then(querySnapshot => {
                        if (!querySnapshot.empty) {
                            return querySnapshot.docs[0].data().userName
                        }
                    })
            }

            const data = {
                ...doc.data(),
                tenantName: tenantName,
                createdByName: createdByName,
                aptBlock: aptData.block,
                aptName: aptData.name,
                aptNumber: aptData.number,
                workerName: workerName,
                ticketID: doc.id,
            }

            return data
        }))

        return res.status(200).json(response)

    } catch (e) {
        return res.status(500).send({ error: e })
    }
})

// ADMIN is at dashboard and wants too see all tickets accepeted or done
app.get('/api/tickets/adminID/:adminID', async (req, res) => {


    try {

        if (db.collection('admin').where("id", "==", req.params.adminID).get().empty) {
            return res.status.apply(401).json({ error: "Not authorized" })
        }


        var query = db.collection('tickets')

        if (req.query.type) {

            query = query.where("type", "==", req.query.type)

        }

        if (req.query.state) {

            query = query.where("state", "==", req.query.state)

        }

        const querySnapshot = await query.get();

        const tickets = querySnapshot.docs;

        const response = await Promise.all(tickets.map(async doc => {
            const aptID = await doc.data().apartmentID
            const aptData = await db.collection('apartaments').doc(aptID).get()
                .then((doc) => {
                    if (doc.exists) {
                        return doc.data()
                    }
                })

            const createdByName = await db.collection('users').where("id", "==", doc.data().createdBy)
                .get()
                .then(querySnapshot => {
                    if (!querySnapshot.empty) {
                        return querySnapshot.docs[0].data().userName
                    }
                })


            if (doc.data().tenantID) {
                var tenantName = await db.collection('users')
                    .where("id", "==", doc.data().tenantID)
                    .get()
                    .then(querySnapshot => {
                        if (!querySnapshot.empty) {
                            return querySnapshot.docs[0].data().userName
                        }
                    })
            }

            if (doc.data().worker) {
                var workerName = await db.collection('users')
                    .where("id", "==", doc.data().worker)
                    .get()
                    .then(querySnapshot => {
                        if (!querySnapshot.empty) {
                            return querySnapshot.docs[0].data().userName
                        }
                    })
            }
            const data = {
                ...doc.data(),
                tenantName: tenantName,
                createdByName: createdByName,
                aptBlock: aptData.block,
                aptName: aptData.name,
                aptNumber: aptData.number,
                workerName: workerName,
                ticketID: doc.id,
            }
            return data
        }))
        return res.status(200).json(response)

    } catch (error) {
        return res.send(error)
    }
})



//ADMIN CREATES NEW TICKET 
http://localhost:5000/api/tickets/adminID/jzHNOmnt2NbiFAAFesfILqEnWs63/
app.post('/api/tickets/adminID/:adminID/', async (req, res) => {

    //IF USER IS TENANT THEN tenant: req.params.userID
    //IF USER IS ADMIN THEN search the actual tenant who's in the apartment
    //and put it automatically
    try {
        if (db.collection('admin').where("id", "==", req.params.adminID)) {
        } else {
            return res.status.apply(401).json({ error: "Not authorized" })
        }

        var queryTeanant = db.collection('tenants')
            .where("apartmentID", "==", req.body.apartmentID)
            .where("state", "==", "active")

        const querySnapshot = await queryTeanant.get();
        var tenant = ""

        if (querySnapshot.empty) {
            console.log("NO TEANANT active in the APARTMENT")
        } else {
            console.log("TEANANT is active in the APARTMENT")
            const docs = querySnapshot.docs;

            tenant = docs[0].data().userID;
        }

        var newTicket = {
            ...req.body,
            tenantID: tenant
        }



        db.collection('tickets').add(newTicket).
            then(function (docRef) {
                newTicket = {
                    ...newTicket,
                    ticketID: docRef.id
                }
                console.log("Ticket added correctyly: ")
                console.log(newTicket)

            })


        return res.status(201).send('Ticket added correctly' + "\n" + JSON.stringify(newTicket))
    } catch (error) {
        console.log("error")
        return res.status(400).send('Ticket no created, there was a problem')
    }
    //Check if admin is correct


})


app.delete('/api/tickets/:ticketID/userID/:userID', async (req, res) => {


    //Coger el id del usuario y comprobar si tiene rol worker o admin
    //Coger el id del ticket y borrarlo
    try {
        db.collection("tickets").doc(req.params.ticketID).delete()
            .then(() => {
                console.log("Ticket removed")
                return res.status(200).json("Ticket deleted correctly")
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });


    } catch (error) {
        return res.status(400).send('Ticket no deleted, there was a problem')
    }
})

// ********** APARTAMENTS ************

//get all apartments
app.get('/api/apartments', async (req, res) => {

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


        return res.send(JSON.stringify(response))

    } catch (error) {
        console.log("Invalid authentication")
        return res.send(error.code).status(401)
    }

})

app.get('/api/apartments/tenantID/:tenantID', async (req, res) => {

    try {

        const apartmentID = await db.collection('tenants')
            .where("userID", "==", req.params.tenantID)
            .get()
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    return querySnapshot.docs[0].data().apartmentID
                }
            })



        const apartmentData = await db.collection('apartaments')
            .doc(apartmentID)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    return {
                        id: apartmentID,
                        ...doc.data(),
                    }
                }
            })



        return res.send(apartmentData)

    } catch (error) {
        console.log("Invalid authentication")
        return res.send(error.code).status(401)
    }

})




// ********** Workers ************

//get workers list with type or name
app.get('/api/workers/', async (req, res) => {

    try {
        var query = db.collection('workers');

        if (req.query.type) {
            query = query.where("type", "==", req.query.type)

        }

        if (req.query.name) {
            query = query.where("type", "==", req.query.name)
        }

        const querySnapshot = await query.get();

        const docs = querySnapshot.docs;

        const response = await Promise.all(docs.map(async doc => {

            const workerName = await db.collection('users').where("id", "==", doc.data().id)
                .get()
                .then(querySnapshot => {
                    if (!querySnapshot.empty) {
                        return querySnapshot.docs[0].data().userName
                    }
                })

            return {
                id: doc.data().id,
                type: doc.data().type,
                name: workerName
            }
        }))


        return res.send(JSON.stringify(response))

    } catch (error) {
        return res.send("ERROR")
    }

})


// ********** SIGNUP ************

app.post('/api/signUp/userID/:userID', async (req, res) => {

    try {
        const user = {
            id: req.params.userID,
            role: "tenant",
            userName: req.query.userName,
        }

        const tenant = {
            userID: req.params.userID,
            apartmentID: req.query.aptID,
            state: "active"
        }

        console.log(user)
        console.log(tenant)

        db.collection('tenants').add(tenant)
        console.log("Tenant registered succesfully: " + JSON.stringify(tenant))

        db.collection('users').add(user)
        console.log("User registered succesfully: " + JSON.stringify(user))

        return res.status(200).send(JSON.stringify(user))

    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: e })
    }


})


/////// COSAS QUE NO SIRVEN POR AHORA //////////

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



//get a specific worker
http://localhost:5000/api/workers/eVGJsl2GiOZZGAbH66M6Sd6gEfH3
app.get('/api/workers/:workerID', async (req, res) => {


    try {
        const query = db.collection('workers').where("id", "==", req.params.workerID);

        const querySnapshot = await query.get();

        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            idUser: doc.data().id,
            name: doc.data().name,
            type: doc.data().type
        }))


        return res.send(JSON.stringify(response))

    } catch (error) {
        return res.send("ERROR")
    }

})

//get a single contact
app.get('/api/users/:userId', (req, res) => {


    const userId = req.params.userId;

    admin.auth().getUser(userId).then((u) => {
        const user = {
            id: userId,
            email: u.email,
        }

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











