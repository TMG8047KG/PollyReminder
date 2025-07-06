import style from './styles/main.module.css';
import "./styles/Main.css";
import Reminder from './Reminder';


function App() {

  return (
    <div className={style.main}>
        <div className={style.container}>
          <div className={style.title}>PollyReminder</div>
          <div className={style.list}>
            <Reminder text="Drink Water"/>
            <Reminder text="Drink Water"/>
            <Reminder text="Drink Water"/>
            <Reminder text="Drink Water"/>
            <Reminder text="Drink Water"/>
            <Reminder text="Drink Water"/>
            <Reminder text="Drink Water"/>
            <Reminder text="Drink Water"/>
            <Reminder text="Drink Water"/>
            <Reminder text="Drink Water"/>
            <Reminder text="Drink Water"/>
            <Reminder text="Drink Water"/>
            <Reminder text="Drink Water"/>
            <Reminder text="Drink Water"/>
            <Reminder text="Drink Water"/>
            <Reminder text="Drink Water"/>

          </div>
        </div>
        <div className={style.buttons}>
          <div className={style.button}>test</div>
          <div className={style.button}>test</div>
          <div className={style.button}>test</div>
        </div>
    </div>
  );
}

export default App;
