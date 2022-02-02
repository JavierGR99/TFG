import React from 'react'

function WorkersSelect(props, ref) {

    function workerChange(e) {
        ref.current.value = e.target.value
    }

    return (
        <div>
            {console.log(props.workers)}
            {console.log("VALUE: " + props.defaultValue)}
            {
                props.workers.length === 0 ? (
                    <label> NO WORKERS</label>
                ) : (
                    <select className="browser-default custom-select" defaultValue={props.defaultValue} ref={ref} onChange={workerChange}>
                        {
                            props.workers.map((w) => {
                                console.log(props.defaultValue)
                                return <option key={w.id} value={w.id}> {w.name} </option>
                            })
                        }
                    </select>
                )
            }


        </div>

    )
}

export default React.forwardRef(WorkersSelect)
