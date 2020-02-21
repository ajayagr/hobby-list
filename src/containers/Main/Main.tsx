import React, { ReactElement, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {User, AppState, Hobby, PassionLevel} from '../../store/stores/store';
import axios from 'axios';

import UserList from '../../components/UserList/UserList';
import HobbyList from '../../components/UserList/User/HobbyList/HobbyList';
import AddUser from '../../components/forms/AddUser/AddUser';
import AddHobby from '../../components/forms/AddHobby/AddHobby';
import Spinner from '../../components/UI/spinner/Spinner';

import * as actions from '../../store/actions/actionTypes';
import classes from './Main.module.scss';

type newHobby= Readonly<{
    passionLevel: PassionLevel,
    name: string,
    startYear: number
}>

type MainProps = Readonly<{
    userList: User[],
    initializeUsers: Function,
    addUser: Function,
    addHobby: Function,
    deleteHobby: Function
}>

const Main: React.FC<MainProps> = (props): ReactElement => {
    const [isLoading, setisLoading] = useState(false);
    const [selectedUserId, setselectedUserId] = useState(-1);

    useEffect(() => {
        setisLoading(true);
        axios.get("https://hobby-lister-6daf1.firebaseio.com/initialState.json")
            .then((response) => {
                let userList = [];
                for(let key in response.data) {
                    userList = response.data[key];
                }
                props.initializeUsers(userList);
                setisLoading(false);
            })
            .catch(err => {
                console.log(err);
                setisLoading(false);
            });
    }, []);


    const userSelectHandler = (id: number): void => {
        setselectedUserId(id);
    }
    let hobbyList: Hobby[] | null;
    
    //If no user is selected than, keep the hobbyList to null else populate hobbies
    if(selectedUserId > 0){
        const userIndex = props.userList.findIndex((user: User) => user.id === selectedUserId);
        hobbyList = props.userList[userIndex].hobbies;
    }else{
        hobbyList = null;
    }

    /* 
    adds a new hobby to existing list of hobbies for the user with userId provided in params.
    validates if hobby to be added is new or not (already present).
    */
    const addHobby  = (newHobby:newHobby, userId:number):void => {
        const userIndex = props.userList.findIndex((user: User) => user.id === userId);
        const hobbyList = props.userList[userIndex].hobbies; 
        
        const hobbyExistsIndex = hobbyList.findIndex((hobby: Hobby) => {
            return hobby.name.toLowerCase() === newHobby.name.trim().toLowerCase();
        });

        const cleanHobby = {
            passionLevel: newHobby.passionLevel,
            name: newHobby.name.trim(),
            startYear: newHobby.startYear
        }

        if(hobbyExistsIndex === -1){
            props.addHobby(cleanHobby, userId);
        }else{
            alert (`Same hobby can't be added twice!! "${newHobby.name.trim()}" already exists.`);
        }
    }

    /*
    deletes a hobby from list of hobbies for the provided user and hobby
    validates whether deletion should be done or not via browser confirm method
    */
    const deleteHobby = (userId: number, hobbyId: number, hobbyName: string): void => {
        console.log(userId, hobbyId);
        const userIndex = props.userList.findIndex((user: User) => user.id === userId);
        if( window.confirm(`Are you sure you want to delete hobby "${hobbyName}" for user "${props.userList[userIndex].name}" ?`)){
            props.deleteHobby(userId, hobbyId);
        }
    }

    //If waiting for data from API call then show spinner
    const userList = isLoading ?  (<Spinner />) :
                    (<UserList 
                        users={props.userList} 
                        onClick={userSelectHandler} 
                        selectedUserId = {selectedUserId}/> )

    return(
        <div className={classes.Container}>
            <div className={classes.Title}>
                <h3 style={{textAlign: "left", marginLeft:"5px"}}>User Hobbies</h3>
            </div>
            <div className={classes.Data}>
                <div className={classes.Users}>
                    <AddUser addUser={props.addUser}/>
                    {userList}
                </div>
                <div className={classes.Hobbies}>
                    <AddHobby selectedUserId = {selectedUserId} addHobby={addHobby}/>
                    <HobbyList selectedUserId= {selectedUserId} hobbies={hobbyList} deleteHobby={deleteHobby}/>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: AppState) => {
    return{
        userList: state.users
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        initializeUsers: (userList: User[]) => dispatch({type:actions.INITIALIZE_USERS, initialUsers: userList}),
        addUser: (name: string) => dispatch({type:actions.ADD_USER, name:name}),
        addHobby: (hobby: object, userId: number) => dispatch({type:actions.ADD_HOBBY, newHobby:hobby, userId: userId}),
        deleteHobby: (userId:number, hobbyId:number) => dispatch({type:actions.DELETE_HOBBY, userId, hobbyId})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);