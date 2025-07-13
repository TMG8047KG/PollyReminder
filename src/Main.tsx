import style from './styles/main.module.css';
import "./styles/Main.css";
import { useNavigate } from 'react-router';
import './scripts/NotificationChannel';
import List from './components/List';
import { useState } from 'react';

function App() {
  const nav = useNavigate();
  const [repeatables, setRepeatables] = useState(false);

  return (
    <div className={style.main}>
      <div className={style.title}>PollyReminder</div>
      <div className={style.container}>
        <List/>
      </div>
      <div className={style.buttons}>
        <div className={style.button}>?</div>
        <div className={style.button} onClick={() => nav('/remindmaker')}>+</div>
        <div className={style.button} onClick={() => repeatables ? setRepeatables(false) : setRepeatables(true)}>
            {repeatables ? 
              <svg className={style.icon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5"/>
              </svg> :
              <svg className={style.icon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"/>
              </svg>}
        </div>
      </div>
    </div>
  );
}

export default App;
