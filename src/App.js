import { useState, useEffect, useRef } from 'react';
import Container from './components/Container/Container.js';
import Stopwatch from './components/Stopwatch/Stopwatch.js';
import Button from './components/Button/Button.js';

function App() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const startTimeRef = useRef(null);

  const formatTime = (ms) => {
    const milliseconds = ms % 1000;
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return (
      String(hours).padStart(2, '0') +
      ':' +
      String(minutes).padStart(2, '0') +
      ':' +
      String(seconds).padStart(2, '0') +
      '.' +
      String(milliseconds).padStart(3, '0')
    );
  };

  const start = () => {
    if (!timerId) {
      startTimeRef.current = Date.now();
      const id = setInterval(() => {
        setElapsedMs(Date.now() - startTimeRef.current);
      }, 1);
      setTimerId(id);
    }
  };

  const stop = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  };

  const reset = () => {
    stop();
    setElapsedMs(0);
  };

  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timerId]);

  return (
    <div>
      <Container>
        <div>
          <Stopwatch formatedTimeInMilisecond={formatTime(elapsedMs)} />
          <div>
            <Button onClick={start}>Start</Button>
            <Button onClick={stop}>Stop</Button>
            <Button onClick={reset}>Reset</Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
