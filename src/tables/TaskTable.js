import React from 'react'
import Task from './Task'
import { Droppable } from "react-beautiful-dnd";

const TaskTable = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Time</th>
        <th>Actions</th>
      </tr>
    </thead>
    <Droppable droppableId="column-1">
      {provided => (
        <tbody ref={provided.innerRef} {...provided.droppableProps}>
          {props.tasks.length > 0 ? (
            props.tasks.map((task, index) => (

              <Task task={task} index={index} editRow={props.editRow} deleteTask={props.deleteTask} />
        
            ))
          ) : (
            <tr>
              <td colSpan={3}>No tasks</td>
            </tr>
          )}
        </tbody>
      )}
      </Droppable>
  </table>
)

export default TaskTable
