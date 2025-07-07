import { BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import style from './styles/maker.module.css';


function maker(){

    const addReminder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const title = data.get('title');
        const description = data.get('description');
        const date = data.get('date');
        console.log(title);
        console.log(description);
        console.log(date);

        const savedReminders = await readTextFile('reminders.json', { baseDir: BaseDirectory.AppLocalData });
        let parsedReminders = JSON.parse(savedReminders);
        parsedReminders.reminders.push({
            title: `${title}`,
            description: `${description}`,
            date: `${date}`
        })
        console.log(parsedReminders);
        const appenededReminders = JSON.stringify(parsedReminders);
        await writeTextFile('reminders.json', appenededReminders, { baseDir: BaseDirectory.AppLocalData });
    }

    return(
        <div className={style.main}>
            <div className={style.container}>
                <form onSubmit={addReminder}>
                    <input name="title" type='text'/>
                    <input name="description" type='text'/>
                    <input name="date" type='datetime-local'/>
                    <button type='submit'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default maker;