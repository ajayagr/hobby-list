import React, {ReactElement, useState} from 'react';

import classes from './AddUser.module.scss';

type AddUserProps = Readonly<{
    addUser: Function
}>;

const AddUser: React.FC<AddUserProps> = (props): ReactElement => {
    const [userName, setuserName] = useState("");

    const userNameChangeHandler = (event: React.FormEvent<HTMLInputElement>): void => {
        setuserName(event.currentTarget.value);
    }

    const formSubmitHandler = (event: React.FormEvent): void => {
        event.preventDefault();
        props.addUser(userName);
    }

    return(
        <form className={classes.FormInline} name="addUser" onSubmit={formSubmitHandler}>
            <input required className={classes.UserName} type="text" name="newUserName" placeholder="Enter new user's name..." value={userName} onChange={userNameChangeHandler}/>
            <button type="submit">Add User</button>
        </form>
    );
}


export default AddUser;