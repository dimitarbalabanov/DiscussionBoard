import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  let [state, setState] = useState([]);

    useEffect(() => {
        fetch('api/forums'
            //, {
            //headers: {
            //    'Authorization': 'Bearer ',
            //}
            //}
        )
            .then(response => response.json())
            .then(data => setState(data.forums))
            .catch(error=> console.log(error));
    }, []);

  return (
    <div className="App">
      <header className="App-header">
          <ul>
            {
              state.map(x => <li key={x.id}><strong>Title:</strong> {x.title} <strong>Description:</strong> {x.description} </li>)
            }
          </ul>
      </header>
    </div>
  );
}

export default App;
