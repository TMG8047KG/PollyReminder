import { BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import style from '../styles/reminder.module.css';
import { useEffect, useState } from 'react';
import { sendNotification } from '@tauri-apps/plugin-notification';

function reminder({uuid, title, description, time, onDelete}:{uuid: string, title:string; description:string; time: string, onDelete: (uuid: string) => void}){
    const [when, setWhen] = useState("");
    const [isPassed, setPassed] = useState(false);

    const deleteReminder = async () => {
        const savedReminders = await readTextFile('reminders.json', { baseDir: BaseDirectory.AppLocalData });
        let reminders = JSON.parse(savedReminders);
        const index = reminders.reminders.findIndex((reminder: { uuid: string; }) => reminder.uuid === uuid);
        if(index !== -1){
            reminders.reminders.splice(index, 1);
        }
        const updatedReminders = JSON.stringify(reminders);
        await writeTextFile('reminders.json', updatedReminders, { baseDir: BaseDirectory.AppLocalData });
        onDelete(uuid);
    }

    const handlePassedReminder = async () => {
        const savedReminders = await readTextFile('reminders.json', { baseDir: BaseDirectory.AppLocalData });
        let reminders = JSON.parse(savedReminders);
        const reminder = reminders.reminders.find((reminder: { uuid: string; }) => reminder.uuid === uuid);
        reminder.date = "Passed";
        const updatedReminders = JSON.stringify(reminders);
        await writeTextFile('reminders.json', updatedReminders, { baseDir: BaseDirectory.AppLocalData });
        sendNotification({
            title: title,
            body: description,
            channelId: 'reminder',
            icon: 'icon'
        })
        console.log("Notification sent!");   
        setPassed(true);
    }

    const formatTime = () => {
        if(time === "Passed") {
            setWhen("Passed");
            setPassed(true);
            return;
        }
        const mills = Date.parse(time);
        const difference = mills - Date.now();
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        if(difference <= 0) {
            if(!isPassed){
                handlePassedReminder();
            }
            return setWhen(`Passed`);
        }
        if(days > 0) return setWhen(`in ${days} days`);
        if(hours > 0) return setWhen(`in ${hours} hours`);
        if(minutes > 0) return setWhen(`in ${minutes} minutes`);
        setWhen(`in ${seconds} seconds`);
    }

    useEffect(() => {
        if(isPassed) return;

        formatTime();

        const interval = setInterval(() => {
            formatTime();
        }, 1000);

        return () => clearInterval(interval);
    }, [isPassed]);


    return(
        <div className={style.body}>
            <div className={style.title}>{title}</div>
            {description === "" ? "" :
                <div className={style.description}>{description}</div>
            }
            <div className={style.footer}>
                <div className={style.time}>
                    <svg className={style.icon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    {when}
                </div>
                <div onClick={deleteReminder}>
                    <svg className={style.icon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default reminder;