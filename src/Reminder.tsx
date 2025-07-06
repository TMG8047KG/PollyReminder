import style from './styles/reminder.module.css';

function reminder({text}:{text:string}){
    return(
        <div className={style.body}>
            {text}
        </div>
    )
}

export default reminder;