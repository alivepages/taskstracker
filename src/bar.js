import React from 'react';
import {Bar} from 'react-chartjs-2';



function bar({ dataGraph }) {

    const data = {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
            label: 'Completed task',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: dataGraph
          }
        ]
      };

    return (
      <div>
        <h2>History Graphic for this week</h2>
        <Bar
          data={data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true
          }}
        />
      </div>
    );

};

export default bar;