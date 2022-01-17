import React from 'react'

function WorkersSelect(props, ref) {
    return (
        <div>
            {props.ticketState !== "requested" &&

                <select className="browser-default custom-select" ref={ref}>
                    {
                        props.workers.map((w) => {
                            return <option key={w.id} value={w.id}>{w.name}</option>
                        })
                    }
                </select>

            }
        </div>

    )
}

export default React.forwardRef(WorkersSelect)
