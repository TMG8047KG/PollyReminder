import { BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import style from './styles/maker.module.css';
import { useNavigate } from 'react-router';
import {v4 as uuidv4} from 'uuid';


function maker(){
    const nav = useNavigate();
    const addReminder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const uuid = uuidv4();
        const title = data.get('title');
        const description = data.get('description');
        const date = data.get('date');

        if(title === "") return alert("The reminder needs a title!");
        if(date && Date.parse(date?.toString()) < Date.now()) return alert("You cannot make a reminder for the past!");

        const savedReminders = await readTextFile('reminders.json', { baseDir: BaseDirectory.AppLocalData });
        let parsedReminders = JSON.parse(savedReminders);
        parsedReminders.reminders.push({
            uuid: `${uuid}`,
            title: `${title}`,
            description: `${description}`,
            date: `${date}`
        })
        console.log(parsedReminders);
        const appenededReminders = JSON.stringify(parsedReminders);
        await writeTextFile('reminders.json', appenededReminders, { baseDir: BaseDirectory.AppLocalData });
        nav("/");
    }    

    return(
        <div className={style.main}>
            <div className={style.container}>
                <form className={style.form} onSubmit={addReminder}>
                    <div className={style.datafields}>
                        <div className={style.title}>Reminder Factory</div>
                        <input className={style.field} name="title" type='text' placeholder='Title'/>
                        <textarea className={style.text} name="description" rows={5} placeholder='Description'/>
                        <input className={style.time} name="date" type='datetime-local' min={new Date(Date.now() + 60 * 1000).toISOString().slice(0, 16)} defaultValue={new Date(Date.now() + ((5 * 60) * 1000)).toISOString().slice(0, 16)}/>
                    </div>
                    <button className={style.submit} type='submit'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default maker;