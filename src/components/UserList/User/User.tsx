import React, {ReactElement} from 'react';

import {User as UserType} from '../../../store/stores/store';
import classes from './User.module.scss';


type UserProps = Readonly<{
    user: UserType
    onClick: Function
    isSelected: boolean
}>

const User: React.FC<UserProps> = (props): ReactElement => {
    const userClass = [classes.User];
    if(props.isSelected){
        userClass.push(classes.Active);
    }
    return(
        <div className={userClass.join(" ")} onClick={() => props.onClick(props.user.id)}>
            {props.user.name}
        </div>
    );
}

export default User;