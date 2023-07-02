import React, { useRef } from 'react';
import Portal from './components/Portal';
import { Provider } from 'react-redux';
import { store } from './models/store';

import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  const containerRef = useRef(null);
  return (
    <Provider store={store}>
      <div className="App" ref={containerRef}>
        <Portal containerRef={containerRef} />
      </div>
    </Provider>
  );
}

export default App;
