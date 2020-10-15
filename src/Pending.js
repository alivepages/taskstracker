import React from 'react'
import Task from './tables/Task'

const Pending = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Time</th>
      </tr>
    </thead>
         <tbody>
          {props.tasks.filter(task => !task.completed).length > 0 ? (
			props.tasks.filter(task => !task.completed)
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
)

export default Pending
