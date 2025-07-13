import { BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import style from './styles/maker.module.css';
import { useNavigate } from 'react-router';
import {v4 as uuidv4} from 'uuid';
import { useState } from 'react';


function maker(){
    const nav = useNavigate();
    const [type, setType] = useState("never");
    const [repeatable, setRepeatable] = useState(false);

    const addReminder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        const uuid = uuidv4();
        const title = form.get('title');
        const description = form.get('description');
        if(title === "") return alert("The reminder needs a title!");

        //Suffering
        let data;
        if(type !== "never") setRepeatable(true); 
        switch(type){
            case "never":
                data = form.get('date');
                if(data && Date.parse(data?.toString()) < Date.now()) return alert("You cannot make a reminder for the past!");
                break;
            case "e3":
                // data = something
                break;
            case "eh":
                const min = form.get('minutes');
                //TODO: Figure out a system for saving and using the data
                break;
            case "ed":
                break;
            case "ew":
                break;
            case "em":
                break;
            case "ey":
                break;    
        }
            
        //I need some weird data structure that I could utilize for repeating notifications
        const savedReminders = await readTextFile('reminders.json', { baseDir: BaseDirectory.AppLocalData });
        let parsedReminders = JSON.parse(savedReminders);
        parsedReminders.reminders.push({
            uuid: `${uuid}`,
            title: `${title}`,
            description: `${description}`,
            date: `${data}`
        })
        console.log(parsedReminders);
        const appenededReminders = JSON.stringify(parsedReminders);
        await writeTextFile('reminders.json', appenededReminders, { baseDir: BaseDirectory.AppLocalData });
        nav("/");
    }    

    const currentDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    }

    const defaultDateTime = () => {
        const now = new Date();
        now.setMinutes((now.getMinutes() - now.getTimezoneOffset()) + 5);
        return now.toISOString().slice(0, 16);
    }

    const defaultMonth = () => {
        const now = new Date();
        now.setMinutes((now.getMinutes() - now.getTimezoneOffset()) + 5);
        console.log(now.toISOString().slice(5, 10));
        return now.toISOString().slice(0, 10);
    }

    const currentTime= () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(11, 16);
    }

    const options = () => {
        const date = new Date;
        const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        const start = new Date(date.getFullYear(), date.getMonth(), 2);
    
        if(type === "never") return(<input className={style.time} name='date' type='datetime-local' min={currentDateTime()} defaultValue={defaultDateTime()} required/>);
        if(type === "e3") return;
        if(type === "eh") return(<select className={style.options} name='minutes' required>
            <option>00</option>
            <option>15</option>
            <option>30</option>
            <option>45</option>
        </select>)
        if(type === "ed") return(<input className={style.time} name='time' type='time' defaultValue={currentTime()} required/>)
        if(type === "ew") return(
            <div className={style.params}>
                <select className={style.options} name='day' required>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                </select>
                <input className={style.time} name='time' type='time' defaultValue={currentTime()} required/>
            </div>)
        if(type === "em") return(<input className={style.time} name='date' type='date' min={start.toISOString().slice(0,10)} max={end.toISOString().slice(0,10)} defaultValue={defaultMonth()} required/>)
        if(type === "ey") return(<input className={style.time} name='date' type='date' defaultValue={currentTime()} required/>)
        // if(type === "custom") return(<div>No</div>)
    }

    return(
        <div className={style.main}>
            <div className={style.container}>
                <form className={style.form} onSubmit={addReminder}>
                    <div className={style.datafields}>
                        <div className={style.title}>Reminder Factory</div>
                        <input className={style.field} name="title" type='text' placeholder='Title'/>
                        <textarea className={style.text} name="description" rows={5} placeholder='Description'/>
                        <label className={style.select}>Repeat 
                            <select onChange={(e) => setType(e.target.value)} name='type'>
                                <option value={"never"}>Never</option>
                                {/* <option value={"custom"}>Custom</option> */}
                                <option value={"e3"}>Every 30 min</option>
                                <option value={"eh"}>Every hour</option>
                                <option value={"ed"}>Every day</option>
                                <option value={"ew"}>Every week</option>
                                <option value={"em"}>Every month</option>
                                <option value={"ey"}>Every year</option>
                            </select>
                        </label>
                        { options() }
                    </div>
                    <button className={style.submit} type='submit'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default maker;