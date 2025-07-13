import { useEffect, useState } from 'react';
import { BaseDirectory, exists, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import Reminder from '../components/Reminder';
import style from '../styles/main.module.css';


function list() {
    const [reminders, setReminders] = useState<any[]>([]);

    const getReminders = async () => {
        const remindersExist = await exists('reminders.json', { baseDir: BaseDirectory.AppLocalData });
        if(remindersExist){
        const savedReminders = await readTextFile('reminders.json', { baseDir: BaseDirectory.AppLocalData });
        const reminders = JSON.parse(savedReminders);
        setReminders(reminders.reminders);
        }else{
        const structure = {
            reminders: []
        }
        await writeTextFile('reminders.json', JSON.stringify(structure), {baseDir: BaseDirectory.AppLocalData});
        }
    }
    
    const handleReminderDeletion = async (uuid: string) => {
        setReminders((reminders) => reminders.filter((reminder) => reminder.uuid !== uuid))
    }

    useEffect(() => {
        getReminders();
    }, []);

    return(
        <div className={style.list}>
            {reminders.length > 0 ? (
                reminders.map((reminder) => (
                <Reminder key={reminder.uuid} uuid={reminder.uuid} title={reminder.title} description={reminder.description} time={reminder.date} onDelete={handleReminderDeletion}/>
                ))) : (<p>No reminders, yet!</p>)
            }
        </div>
    )
}

export default list;