import React, { useState, useEffect } from 'react'

const EditTaskForm = props => {
  const [ task, setTask ] = useState(props.currentTask)

  useEffect(
    () => {
      setTask(props.currentTask)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setTask({ ...task, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateTask(task.id, task)
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={task.name} onChange={handleInputChange} />
      <label>Taskname</label>
      <input type="text" name="taskname" value={task.taskname} onChange={handleInputChange} />
      <button>Update task</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditTaskForm
