import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  let [state, setState] = useState("");

    useEffect(() => {
        fetch('api/sample', {
            headers: {
                'Authorization': 'Bearer ',
            }
        })
            .then(response => response.json())
            .then(data => setState(data))
            .catch(error=> console.log(error));
    }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Sample controller says: { state }
        </p>
      </header>
    </div>
  );
}

export default App;
