import React, { useState } from 'react'
import Task from './tables/Task'
import useModal from './useModal';


const Pending = (props) => {

  const [ corto, setCorto ] = useState()
const [ medio, setMedio ] = useState()
const [ largo, setLargo ] = useState()

return (
  <div>
    <button onClick={corto}> Corto</button>
    <button onClick={medio}> Medio</button>
    <button onClick={largo}> Largo</button>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Time</th>
      </tr>
    </thead>
         <tbody>
          {props.tasks.filter(task => !task.completed).length > 0 ? (
      props.tasks.filter(task => 
        !task.completed
        )
			.map((task, index) => (
				<tr>
					<td>{task.name}</td>
					<td>{task.time+ ' min'}</td>
				</tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>No pending tasks</td>
            </tr>
          )}
        </tbody>
  </table>
  </div>
)
}

export default Pending
