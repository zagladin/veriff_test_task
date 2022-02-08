import { ToastContainer } from 'react-toastify';
import styles from './App.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import CheckingToolContainer
  from './Containers/CheckingToolContainer/CheckingToolContainer';

function App() {
  return (
    <div className={styles.App}>
      <CheckingToolContainer />
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
    </div>
  );
}

export default App;
