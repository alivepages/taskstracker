import React from 'react'
import { Draggable } from "react-beautiful-dnd";

const Task = props => (

        <Draggable draggableId={'item'+props.index} index={props.index}>

        {provided => (
              <tr key={props.task.id}
                  //key={('item'+index).toString()}
                  //id={('item'+index).toString()}
                  id = {props.task.id}
                  className={(props.task && props.task.completed)? 'completed' : ''}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
              >
                <td>{props.task.name}</td>
                <td>{props.task.time+ ' min'}</td>
                <td>
                  <button
                    onClick={() => {
                      props.editRow(props.task)
                    }}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => props.deleteTask(props.task.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              )}
              </Draggable>
)

export default Task
