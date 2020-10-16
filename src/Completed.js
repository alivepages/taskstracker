import React from 'react'
import Task from './tables/Task'

const Completed = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Time</th>
        <th>Date</th>
      </tr>
    </thead>
         <tbody>
          {props.tasks.filter(task => task.completed).length > 0 ? (
			props.tasks.filter(task => task.completed)
			.map((task, index) => (
				<tr>
					<td>{task.name}</td>
					<td>{task.time+ ' min'}</td>
          <td>{task.dateEnd.toString()}</td>
				</tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>No completed tasks</td>
            </tr>
          )}
        </tbody>
  </table>
)

export default Completed
