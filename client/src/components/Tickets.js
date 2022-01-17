import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Tickets(props) {
    return (
        <div>
            <span>TICKETS {props.state}</span>
            {
                props.tickets.length === 0 ? (
                    <div> No tickets available </div>
                ) : (
                    props.tickets.map((t) => {
                        return (
                            <div key={t.ticketID}>
                                <span>Type: {t.type} </span>
                                <br />
                                <span>Apartment : {t.aptName} {t.aptNumber} </span>
                                <br />
                                <span>Description : {t.description}</span>
                                <br />
                                <Link to={{
                                    pathname: `/ticket-details`,
                                    state: {
                                        ticket: t,
                                        userID: props.userID,
                                        role: props.role
                                    }
                                }}>View Details</Link>
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
