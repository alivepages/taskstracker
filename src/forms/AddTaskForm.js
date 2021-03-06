import React, { useState } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



const AddTaskForm = props => {
	const initialFormState = { id: null, name: '', time: 0 }
	const [ task, setTask ] = useState(initialFormState)

	const [time, setTime] = React.useState();
	const [open, setOpen] = React.useState(false);

	const [ mins, setMin ] = useState()
	const [ segs, setSegs ] = useState()

	const handleInputChange = event => {
		const { name, value } = event.target

		setTask({ ...task, [name]: value })
	}

	const handleInputMinsChange = event => {		
		const { name, value } = event.target
		setMin( value )		
	}

	const handleInputSegsChange = event => {		
		const { name, value } = event.target
		setSegs( value )		
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
				if (!task.name || (!task.time && !task.mins)) return
				if (task.time == -1) task.time = Math.round((parseInt(mins? mins: 0) + parseInt(segs? segs : 0)/60) *100) / 100
				if (isNaN(task.time) || task.time<=0 || task.time>120) return;
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
			<MenuItem value={-1}>Other</MenuItem>
		</Select>
		{task.time == -1 ?
		(<span>
		<input type="text" name="mins" placeholder="Mins"  onChange={handleInputMinsChange} value={mins} style={{width: '70px', display: 'inline'}} />
		<input type="text" name="segs" placeholder="Segs"  onChange={handleInputSegsChange} value={segs} style={{width: '70px', display: 'inline'}} />
		</span>
		):null}
			
			<button>Add new task</button>
		</form>
	)
}

export default AddTaskForm
