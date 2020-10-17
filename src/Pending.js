import React, { useState } from 'react'
import Task from './tables/Task'
import useModal from './useModal';

const Pending = (props) => {

const [ corto, setCorto ] = useState(false)
const [ medio, setMedio ] = useState(false)
const [ largo, setLargo ] = useState(false)

const [checkedItems, setCheckedItems] = useState({}); //plain object as state

const handleChange = (event) => {
  console.log(corto, medio, largo);
  if (event.target.name == 'corto') setCorto(event.target.checked);
  if (event.target.name == 'medio') setMedio(event.target.checked);
  if (event.target.name == 'largo') setLargo(event.target.checked);
  console.log(corto, medio, largo);
}

return (
  <div>
    <div className = "boxes">
    <div className="switch">
      
    <label>
      <input name="corto" type="checkbox" onChange={handleChange}/>
      <span className="lever"></span>
      Corto
    </label>
    </div>
    <div className="switch">
    <label>
      <input name="medio" type="checkbox" onChange={handleChange}/>
      <span className="lever"></span>
      Medio
    </label>
    </div>
    <div className="switch">
    <label>
      <input name="largo" type="checkbox" onChange={handleChange}/>
      <span className="lever"></span>
      Largo
    </label>
    </div>
    </div>
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
          &&  (
              (task.time<=10 && corto)
          ||  (task.time>10 && task.time<=45 && medio)
          ||  (task.time>45 && largo)
          || (!corto && !medio && !largo)
          )
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
