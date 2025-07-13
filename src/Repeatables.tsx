import { useNavigate } from 'react-router';
import './styles/Main.css';
import style from './styles/main.module.css';

function repeatable(){
    const nav = useNavigate();

    return(
        <div className={style.main}>
            shit
        </div>
    )
}

export default repeatable;