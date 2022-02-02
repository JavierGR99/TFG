import React from 'react'

function WorkersSelect(props, ref) {

    function aptChange(e) {
        ref.current.value = e.target.value
    }

    return (
        <div>

            <select className="browser-default custom-select" defaultValue={props.defaultValue} ref={ref} onChange={aptChange}>
                {
                    props.workers.map((w) => {
                        console.log(props.defaultValue)
                        return <option key={w.id} value={w.id}>{w.name}</option>
                    })
                }
            </select>
        </div>

    )
}

export default React.forwardRef(WorkersSelect)
