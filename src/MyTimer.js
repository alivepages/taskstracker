/*
Componente para medor el tiempo de ejecucion de la tarea
*/ 

import React, { useState, useEffect }  from 'react';
import { useTimer } from 'react-timer-hook';



function MyTimer({ expiryTimestamp, tasks, terminateTask }) {

  const [copy, setCopy] = useState();

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart, 
  } = useTimer({ expiryTimestamp, onExpire: () =>  terminateTask(currentIndex()) });
 
 
  const current = () => {
    let pendientes = tasks.filter((task) => !task.completed);
    if (pendientes.length) return pendientes[0];
    return null;
  };


  const currentIndex = () => {
    return tasks.findIndex((item) => !item.completed)
  }



  // Detenerr timer si el usuario marca la tarea como completada o la elimina
  // Detener tarea si cambian el orden de tareas

  useEffect(() => {
    console.log('copy ',copy)
    if( (current() && current().completed) || !current() || copy != current()){
            pause();
    }
  });

  return (

    <div style={{textAlign: 'center'}}>

      <h2>Time</h2>
      <div style={{fontSize: '50px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running ' + (current() ? current().name:'') : 'Pausa'}</p>
      <button onClick={() => {
        // Restarts  timer
        const time = new Date();
        time.setSeconds(current() ? time.getSeconds() + current().time * 60: null);
        setCopy(current());
        restart(time)
        current().dateInit = new Date();;
        current().dateEnd = null;
      }}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={() => {
        // Restarts  timer
        const time = new Date();
        time.setSeconds(current() ? time.getSeconds() + current().time * 60: null);
        setCopy(current());
        restart(time)
        current().dateInit = new Date();;
        current().dateEnd = null;
      }}>Restart</button>
    </div>
  );
}
 
export default MyTimer;