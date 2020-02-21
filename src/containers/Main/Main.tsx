import React, { ReactElement, useState} from 'react';
import UserList from '../../components/UserList/UserList';
import HobbyList from '../../components/UserList/User/HobbyList/HobbyList';
import AddUser from '../../components/forms/AddUser/AddUser';
import AddHobby from '../../components/forms/AddHobby/AddHobby';

import classes from './Main.module.scss';

const Main: React.FC = (props): ReactElement => {
    const [selectedUserId, setselectedUserId] = useState(-1);

    const userSelectHandler = (id: number): void => {
        setselectedUserId(id);
    }

    return(
        <div className={classes.Container}>
            <div className={classes.Users}>
                <AddUser />
                <UserList onClick={userSelectHandler}/>
            </div>
            <div className={classes.Hobbies}>
                <AddHobby selectedUserId = {selectedUserId} />
                <HobbyList selectedUserId= {selectedUserId}/>
            </div>
        </div>
    )
}

export default Main;