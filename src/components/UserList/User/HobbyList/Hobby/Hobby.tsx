import React from 'react';
import {Hobby as HobbyType} from '../../../../../store/stores/store';

import Delete from '../../../../UI/svg/delete';
import classes from './Hobby.module.scss';

type HobbyProps = Readonly<{
    selectedUserId: number,
    hobby: HobbyType,
    deleteHobby: Function
}>

const Hobby: React.FC<HobbyProps> = (props): React.ReactElement => {
    return(
        <div className={classes.Hobby}>
            <div className={classes.HobbyDetails}>
                <div className={classes.Passion}>{`Passion = ${props.hobby.passionLevel} `}</div>
                <div className={classes.HobbyName}>{`${props.hobby.name}`}</div>
                <div className={classes.Year}>{`Since ${props.hobby.startYear}`}</div>
            </div>
            <div className={classes.Delete} onClick={() => props.deleteHobby(props.selectedUserId, props.hobby.id)} title="Delete Hobby" >
                <Delete />
            </div>
        </div>
    );
}

export default Hobby;