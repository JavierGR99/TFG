import React from 'react'

function ApartmentsSelect(props, ref) {

    function aptChange(e) {
        ref.current.value = e.target.value
    }

    return (
        <div>
            <label>Select apartament:</label>
            {
                props.apts.length === 0 ? (
                    <label> NO APARTAMENTS</label>
                ) : (
                    <select ref={ref} onChange={aptChange}> {

                        props.apts.map((apt) => {
                            return <option key={apt.id} value={apt.id}> {apt.name} {apt.number} </option>
                        })
                    }
                    </select>
                )
            }

        </div>
    )
}

export default React.forwardRef(ApartmentsSelect)
