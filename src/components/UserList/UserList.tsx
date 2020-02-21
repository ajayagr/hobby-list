import React, {ReactElement} from 'react';

import {User as UserType} from '../../store/stores/store';
import User from './User/User';


type UserListProps = Readonly<{
    users: UserType[] | null,
    selectedUserId: number
    onClick: Function
}>

const UserList: React.FC<UserListProps> = (props): ReactElement => {
    
    let users: ReactElement[] | null = null;
    if(props.users){
        users = props.users.map((user: any) => {
            return <User isSelected={user.id === props.selectedUserId} user={user} key={user.id} onClick={props.onClick}/>
        });
    }

    return(
        <div>
            {users}
        </div>
    );
}

export default UserList;