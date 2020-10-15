import React, { useState } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



const AddTaskForm = props => {
	const initialFormState = { id: null, name: '', time: '' }
	const [ task, setTask ] = useState(initialFormState)

	const [time, setTime] = React.useState();
	const [open, setOpen] = React.useState(false);

	const handleInputChange = event => {
		const { name, value } = event.target

		setTask({ ...task, [name]: value })
	}

	const handleChange = (event) => {
		setTime(event.target.value);
	  };
	
	  const handleClose = () => {
		setOpen(false);
	  };
	
	  const handleOpen = () => {
		setOpen(true);
	  };
	

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!task.name || !task.time) return

				props.addTask(task)
				setTask(initialFormState)
			}}
		>
			<label>Name</label>
			<input type="text" name="name" value={task.name} onChange={handleInputChange} />
			<label>Time</label>

			<Select
		labelId="demo-controlled-open-select-label"
			id="demo-controlled-open-select"
			open={open}
			onClose={handleClose}
			onOpen={handleOpen}
			value={time || 0}
			onChange={handleInputChange}
			placeholder="menu"
			name="time"
			value={task.time}
		>
			<MenuItem value={0}>Duración</MenuItem>
			<MenuItem value={10}>corto</MenuItem>
			<MenuItem value={45}>medio</MenuItem>
			<MenuItem value={60}>largo</MenuItem>
		</Select>

			
			<button>Add new task</button>
		</form>
	)
}

export default AddTaskForm
