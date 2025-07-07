import style from './styles/reminder.module.css';

function reminder({title, description, time}:{title:string; description:string; time: string}){
    return(
        <div className={style.body}>
            {title}-
            {description}-
            {time}
        </div>
    )
}

export default reminder;