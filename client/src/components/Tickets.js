import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Tickets({ tickets, state }) {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [tickets])
    return (
        <div>
            <span>TICKETS {state}</span>
            {
                loading ? (
                    <div> No tickets available </div>
                ) : (
                    tickets.map((t) => {
                        return (
                            <div key={t.ticketID}>
                                <span>Type: {t.type} </span>
                                <br />
                                <span>Apartment : {t.aptName} {t.aptNumber} </span>
                                <br />
                                <span>Description : {t.description}</span>
                                <br />
                                <span></span>
                                <Link to={{
                                    pathname: `/ticket-details`,
                                    state: {
                                        ticket: t
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
