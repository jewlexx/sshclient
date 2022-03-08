import { useCallback, useEffect, useRef } from 'react';
import { invoke } from '@tauri-apps/api';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import './App.css';

function App() {
  const terminalEl = useRef<HTMLDivElement>(null);
  const terminalRef = useRef(new Terminal());
  const oldData = useRef('');

  const requestRef = useRef<number>();

  const animate = useCallback(() => {
    requestRef.current = requestAnimationFrame(animate);
    invoke<string>('get_str').then((v) => {
      terminalRef.current.write(v.replace(oldData.current, ''));
      oldData.current = v;
    });
  }, []);

  useEffect(() => {
    terminalRef.current = new Terminal();
    const terminal = terminalRef.current;
    if (terminalEl.current) {
      terminal.open(terminalEl.current);
    }

    animate();

    return () => {
      terminal.dispose();
    };
  }, [terminalRef]);

  return <div id="terminal" ref={terminalEl}></div>;
}

export default App;
