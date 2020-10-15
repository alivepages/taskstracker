import React from 'react'

const TaskTable = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Taskname</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.tasks.length > 0 ? (
        props.tasks.map(task => (
          <tr key={task.id}>
            <td>{task.name}</td>
            <td>{task.taskname}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(task)
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteTask(task.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No tasks</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default TaskTable
