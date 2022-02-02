import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Tickets(props) {
    return (
        <div>
            <strong>TIQUES {props.state}</strong>
            {
                props.tickets.length === 0 ? (
                    <div> No hay tiques disponibles </div>
                ) : (
                    props.tickets.map((t) => {

                        return (
                            <div key={t.ticketID} >
                                <span>Tipo: {t.type} </span>
                                <br />
                                <span>Apartamento : {t.aptName} {t.aptNumber} </span>
                                <br />
                                <span>Descripción : {t.description}</span>
                                <br />
                                <Link to={{
                                    pathname: `/ticket-details`,
                                    state: {
                                        ticket: t,
                                        userID: props.userID,
                                        role: props.role
                                    }
                                }}>Ver detalles</Link>
                            </div>

                        )
                    })
                )
            }
            <br></br>
        </div >

    )
}

export default Tickets
