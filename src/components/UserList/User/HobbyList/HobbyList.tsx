import React, {ReactElement} from 'react';
import {Hobby as HobbyType} from '../../../../store/stores/store';

import Hobby from './Hobby/Hobby';


type HobbyListProps = Readonly<{
    selectedUserId: number,
    hobbies: HobbyType[] | null,
    deleteHobby: Function
}>


const HobbyList: React.FC<HobbyListProps> = (props): ReactElement => {
    if (props.selectedUserId === -1) {
        return (<div>
            </div>);
    }

    

    let hobbyList:ReactElement[] | null = null;

    if(props.hobbies){
        hobbyList = props.hobbies.map((hobby: any) => {
            return <Hobby selectedUserId={props.selectedUserId} key={hobby.id} hobby={hobby} deleteHobby={props.deleteHobby}/>
        });
    }

    return(
        <div>
           {hobbyList}
        </div>
    );
}


export default HobbyList;