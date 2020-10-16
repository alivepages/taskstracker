import React, { useState, Fragment } from 'react'
import AddTaskForm from './forms/AddTaskForm'
import EditTaskForm from './forms/EditTaskForm'
import TaskTable from './tables/TaskTable'
import { DragDropContext } from "react-beautiful-dnd";
import MyTimer from './MyTimer.js';
import Modal from "./Modal";
import ModalCompleted from "./ModalCompleted";
import ModalPending from "./ModalPending";
import useModal from './useModal';
import './App.css';

const App = () => {
	// Data
	const tasksData = [
		{ id: 1, name: 'Design', time: 1, completed : true, dateInit : new Date(), dateEnd : new Date() },
		{ id: 2, name: 'Front End', time: 45, completed : false, dateInit : null, dateEnd : null  },
		{ id: 3, name: 'Back End', time: 60, completed : false, dateInit : null, dateEnd : null },
	]

	const initialFormState = { id: null, name: '', time: '' }

	// Setting state
	const [ tasks, setTasks ] = useState(tasksData)
	const [ currentTask, setCurrentTask ] = useState(initialFormState)
	const [ editing, setEditing ] = useState(false)
	const [ refresh, setRefresh ] = useState(false)
	const { isShowing, toggle} = useModal();
	const [ typeModal, setTypeModal] = useState();
	const [ dataGraph, setDataGraph ] = useState();


	const randomData = () => { 
		var curr = new Date; // get current date
		var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
		var last = first + 6; // last day is the first day + 6
		
		var start = new Date(curr.setDate(first));
		var end = new Date(curr.setDate(last));

		var data = [];
		for (var i = 1; i <= 50; i++) {
			data.push({id: i, name: 'Task '+ i, completed: true, 
			time: Math.random()*60, 
			dateInit: new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
			dateEnd: new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
		});
		};
		setTasks(data);
	}
	

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

	const terminateTask = (index) => {
		tasks[index].completed = true;
		tasks[index].dateEnd = new Date();
		if (!tasks[index].dateInit) {
			tasks[index].dateInit = tasks[index].dateEnd
		}
		setTasks(tasks);
		setRefresh(!refresh);
	}

	const editRow = task => {
		setEditing(true)
		setCurrentTask({ id: task.id, name: task.name, time: task.time })
	}

	const handleonDragEnd = (result) => {
		if (!result.destination) {
		  return
		}
		const content = reorder(tasks, result.source.index,   result.destination.index)
		setTasks(content);
	  }
  
	  const reorder = (list, startIndex, endIndex) => {
		  const result = Array.from(list);
		  const [removed] = result.splice(startIndex, 1);
		  result.splice(endIndex, 0, removed);
		  return result;
	 };



	  const getSem = (n) => {
		var day = '';
		switch (n) {
			  case 0:
				day = "Sunday";
				break;
			  case 1:
				day = "Monday";
				break;
			  case 2:
				 day = "Tuesday";
				break;
			  case 3:
				day = "Wednesday";
				break;
			  case 4:
				day = "Thursday";
				break;
			  case 5:
				day = "Friday";
				break;
			  case 6:
				day = "Saturday";
	  }
	  return day;
	}

	const showPending = () => {
		setTypeModal(1);
		toggle();
	}

	const showCompleted = () => {
		setTypeModal(2);
		toggle();
	}

	  const graphic = () => {
		var curr = new Date; // get current date
		var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
		var last = first + 6; // last day is the first day + 6
		
		var weekStart = new Date(curr.setDate(first));
		var weekEnd = new Date(curr.setDate(last));
		var taskWeek = tasks.filter((task) => (	
			 task.completed && task.dateEnd && task.dateEnd.getDate() >= weekStart.getDate()
		));

		var dataWeek = [];
		for (var i = 0;i < 7; i++) dataWeek[i] = 0;
		taskWeek.map((task, index) => (
			dataWeek[task.dateEnd.getDay()]+=task.time
		));
		  
		setDataGraph(dataWeek)
		setTypeModal(3);
		toggle();
		
	  }




	return (
		<div>

		<Modal
			isShowing={typeModal==3 && isShowing}
			hide={toggle}
			dataGraph={dataGraph}
		/>
		<ModalCompleted
			isShowing={typeModal==2 && isShowing}
			hide={toggle}
			tasks={tasks}
		/>
		<ModalPending
			isShowing={typeModal==1 && isShowing}
			hide={toggle}
			tasks={tasks}
		/>
		
		<div className="container">
    	<button onClick={showCompleted}> Completed tasks</button>
		<button onClick={showPending}> Pending</button>
		<button onClick={graphic}> History chart</button>
		<button onClick={randomData}> Fill data</button>

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
					<DragDropContext onDragEnd={handleonDragEnd}>
						<TaskTable tasks={tasks} editRow={editRow} deleteTask={deleteTask}  terminateTask={terminateTask} />
					</DragDropContext>
				</div>
			</div>
			<div className="flex-row">
			<div className="flex-large" style={{marginBottom:'100px'}}>
				<MyTimer expiryTimestamp={null} tasks={tasks} terminateTask={terminateTask}/>
			</div>
		</div>
		</div>
		</div>
	)
}

export default App
