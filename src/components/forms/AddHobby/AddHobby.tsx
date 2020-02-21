import React, {ReactElement, useState} from 'react';

import classes from './AddHobby.module.scss';

type AddHobyProps = Readonly<{
    selectedUserId: number,
    addHobby: Function
}>

const AddHobby: React.FC<AddHobyProps> = (props): ReactElement => {
    const [passionLevel, setpassionLevel] = useState("Low");
    const [hobbyName, sethobbyName] = useState("");
    const [startYear, setstartYear] = useState(new Date().getFullYear());

    if(props.selectedUserId === -1){
        return (<div></div>);
    }
    const passionChangeHandler = (event: React.FormEvent<HTMLSelectElement>): void => {
        setpassionLevel(event.currentTarget.value);
    }
    
    const startYearChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
        setstartYear(Number(event.currentTarget.value));
    }

    const hobbyNameChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
        sethobbyName(event.currentTarget.value);
    }

    const formSubmitHandler = (event: React.FormEvent): void => {
        event.preventDefault();
        props.addHobby({name: hobbyName, passionLevel:passionLevel, startYear:startYear}, props.selectedUserId);
    }

    return(
        <form className={classes.Form} name="addUser" onSubmit={formSubmitHandler}>
            <select className={classes.Passion} required name="passionLevel" defaultValue={passionLevel} onChange={passionChangeHandler} title="How Passionate are you?">
                <option value="Low"> Low </option>
                <option value="Medium"> Medium </option>
                <option value="High"> High </option>
                <option value="Very-High"> Very High </option>
            </select>
            <input className={classes.HobbyName} required type="text" name="hobbyName" placeholder="Enter hobby name..." value={hobbyName} onChange={hobbyNameChangeHandler} title="Hobby Title"/>
            <input className={classes.StartYear} type="number" min="1900" max={new Date().getFullYear()} name="startYear" placeholder="Hobby Since" value={startYear} onChange={startYearChangeHandler} title="Hobby since....?"/>
            <button type="submit">Add Hobby</button>
        </form>
    );
}

export default AddHobby;