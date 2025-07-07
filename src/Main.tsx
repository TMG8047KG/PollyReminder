import style from './styles/main.module.css';
import "./styles/Main.css";
import Reminder from './Reminder';
import { useState } from 'react';
import { BaseDirectory, exists, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import { useNavigate } from 'react-router';

function App() {
  const nav = useNavigate();
  const [reminders, setReminders] = useState<any[]>([]);

  const getReminders = async () => {
    const remindersExist = await exists('reminders.json', { baseDir: BaseDirectory.AppLocalData });
    if(remindersExist){
      const savedReminders = await readTextFile('reminders.json', { baseDir: BaseDirectory.AppLocalData });
      const reminders = JSON.parse(savedReminders);
      setReminders(reminders.reminders);
      console.log(reminders);
    }else{
      const structure = {
        reminders: []
      }
      await writeTextFile('reminders.json', JSON.stringify(structure), {baseDir: BaseDirectory.AppLocalData});
    }
  }

  getReminders()

  return (
    <div className={style.main}>
        <div className={style.container}>
          <div className={style.title}>PollyReminder</div>
          <div className={style.list}>
            {reminders.length > 0 ? (
              reminders.map((reminder) => (
                <Reminder title={reminder.title} description={reminder.description} time={reminder.date} />
              ))) : (<p>No reminders, yet!</p>)
            }
          </div>
        </div>
        <div className={style.buttons}>
          <div className={style.button}>-</div>
          <div className={style.button} onClick={() => nav('/remindmaker')}>+</div>
          <div className={style.button}>-</div>
        </div>
    </div>
  );
}

export default App;
