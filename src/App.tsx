import { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import './App.css';

function App() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState(new Terminal());

  useEffect(() => {
    setTerminal(new Terminal());
    if (terminalRef.current) {
      terminal.open(terminalRef.current);
    }

    return () => {
      terminal.dispose();
    };
  }, [terminalRef]);

  return <div id="terminal" ref={terminalRef}></div>;
}

export default App;
