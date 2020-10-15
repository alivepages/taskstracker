import React, { useState, Fragment } from 'react'
import AddTaskForm from './forms/AddTaskForm'
import EditTaskForm from './forms/EditTaskForm'
import TaskTable from './tables/TaskTable'

const App = () => {
	// Data
	const tasksData = [
		{ id: 1, name: 'Design', time: 10 },
		{ id: 2, name: 'Front End', time: 45 },
		{ id: 3, name: 'Back End', time: 60 },
	]

	const initialFormState = { id: null, name: '', time: '' }

	// Setting state
	const [ tasks, setTasks ] = useState(tasksData)
	const [ currentTask, setCurrentTask ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)

	// CRUD operations
	const addTask = task => {
		task.id = tasks.length + 1
		setTasks([ ...tasks, task ])
	}

	const deleteTask = id => {
		setEditing(false)

		setTasks(tasks.filter(task => task.id !== id))
	}

	const updateTask = (id, updatedTask) => {
		setEditing(false)

		setTasks(tasks.map(task => (task.id === id ? updatedTask : task)))
	}

	const editRow = task => {
		setEditing(true)

		setCurrentTask({ id: task.id, name: task.name, time: task.time })
	}

	return (
		<div className="container">
			<h1>Tasks Tracker</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit task</h2>
							<EditTaskForm
								editing={editing}
								setEditing={setEditing}
								currentTask={currentTask}
								updateTask={updateTask}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add task</h2>
							<AddTaskForm addTask={addTask} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View tasks</h2>
					<TaskTable tasks={tasks} editRow={editRow} deleteTask={deleteTask} />
				</div>
			</div>
		</div>
	)
}

export default App
