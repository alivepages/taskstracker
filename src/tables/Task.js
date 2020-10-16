import React from 'react'
import { Draggable } from "react-beautiful-dnd";
import TerminateButton from '../TerminateButton';

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

                  <TerminateButton index={props.index} completed={props.task.completed} terminateTask={props.terminateTask}/>

                  {!props.task.completed?
                  <button
                    onClick={() => {
                      props.editRow(props.task)
                    }}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                  : null}
                  {!props.task.completed?
                  <button
                    onClick={() => props.deleteTask(props.task.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                  : null}
                </td>
              </tr>
              )}
              </Draggable>
)

export default Task
