/*
Componente que lista las tareas
Acciones de terminar y eliminarla
*/

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

const TerminateButton = ({ index, completed, terminateTask, mins }) => {

if (completed) return (
    <span>Terminada en {mins} mins</span>
)

return (

    <IconButton
    aria-label="Terminar"
    title="Terminar"
    onClick={() => {
    terminateTask(index);
    }}
    >
    <AccessAlarmIcon />
    </IconButton>

)

}
export default TerminateButton;