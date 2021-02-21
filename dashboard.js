import React from 'react';
import blessed, { box } from 'blessed';
import { render } from 'react-blessed';

const App = () => {
  const [count, setCount] = React.useState(0);

  const timer = React.useRef();

  React.useEffect(() => {
    timer.current = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer.current);
  }, [count]);

  let dateTime = new Date().toLocaleString('en-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return (
    <box
      top="center"
      left="center"
      width="50%"
      height="50%"
      border={{ type: 'line' }}
      style={{
        border: { fg: 'blue' },
      }}
    >
      {`today: ${dateTime}
      counter is ${count}
      `}
    </box>
  );
};

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'Develope Dashboard',
});

screen.key(['exit', 'q', 'C-c'], () => process.exit(0));

const component = render(<App />, screen);
