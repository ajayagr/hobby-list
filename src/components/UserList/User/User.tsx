import React, {ReactElement} from 'react';

import {User as UserType} from '../../../store/stores/store';
import classes from './User.module.scss';


type UserProps = Readonly<{
    user: UserType
    onClick: Function
}>

const User: React.FC<UserProps> = (props): ReactElement => {
    return(
        <div className={classes.User} onClick={() => props.onClick(props.user.id)}>
            {props.user.name}
        </div>
    );
}

export default User;