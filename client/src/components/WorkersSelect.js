import React from 'react'

function WorkersSelect(props, ref) {
    return (
        <div>
            <label>Workers:                </label>
            {ticketState != "requested" &&
                <select>
                    {
                        workers.map((w) => {
                            return <option key={w.id} value={w.id}>{w.name}</option>
                        })
                    }
                </select>
            }
        </div>

    )
}

export default React.forwardRef(WorkersSelect)
