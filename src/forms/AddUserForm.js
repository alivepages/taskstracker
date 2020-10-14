import React, { useState } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



const AddUserForm = props => {
	const initialFormState = { id: null, name: '', username: '' }
	const [ user, setUser ] = useState(initialFormState)

	const [time, setTime] = React.useState();
	const [open, setOpen] = React.useState(false);

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
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
				if (!user.name || !user.username) return

				props.addUser(user)
				setUser(initialFormState)
			}}
		>
			<label>Name</label>
			<input type="text" name="name" value={user.name} onChange={handleInputChange} />
			<label>Username</label>

			<Select
		labelId="demo-controlled-open-select-label"
			id="demo-controlled-open-select"
			open={open}
			onClose={handleClose}
			onOpen={handleOpen}
			value={time || 0}
			onChange={handleInputChange}
			placeholder="menu"
			name="username"
			value={user.username}
		>
			<MenuItem value={0}>Duración</MenuItem>
			<MenuItem value={10}>corto</MenuItem>
			<MenuItem value={45}>medio</MenuItem>
			<MenuItem value={60}>largo</MenuItem>
		</Select>

			
			<button>Add new user</button>
		</form>
	)
}

export default AddUserForm
