import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.tsx'
import './index.css'
import { store } from './store';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el!);
root.render(
  <Provider store={store}>
    <App />
  </Provider >
)
