import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';

function App() {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="App">
      <button
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}>
        Hover over me!
      </button>
      {isShown && (
        <Paper elevation={10}>
          <div>
            I'll appear when you hover over the button.
          </div>
        </Paper>
      )}
    </div>
  );
}

export default App;