import React from 'react'

function Tickets({ tickets, state }) {
    return (
        <div>
            <span>TICKETS {state}</span>
            {
                tickets.length === 0 ? (
                    <div> No tickets available </div>
                ) : (
                    tickets.map((t) => {
                        return (
                            <div key={t.ticketID}>
                                <span > {t.ticketID} </span>
                            </div>
                        )
                    })
                )
            }
            <br></br>
        </div>

    )
}

export default Tickets
