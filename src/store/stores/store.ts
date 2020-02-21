import * as actionType from '../actions/actionTypes';

export type PassionLevel = "Low" | "Medium" | "High" | "Very-High";

export type Hobby = Readonly<{
    id: number,
    passionLevel: PassionLevel,
    name: string,
    startYear: number
}>;

export type User = {
    readonly id: number
    readonly name: string
    hobbies: Hobby[]
};

export type AppState = {
    users: User[]
};

const initialState : AppState = {
    users: []
}

function addUser (state:AppState, userName: string) : AppState {
    const newUsers: User[] = [...state.users];
    console.log(newUsers, newUsers.length);
    const currId = newUsers[newUsers.length-1].id;

    const newUser: User = {
        id: currId+1,
        name:userName,
        hobbies: []
    }

    newUsers.push(newUser);
    return {users:newUsers};
}

function addHobby (state:AppState, hobby:any, userId: Number) : AppState {
    const userIndex: number = state.users.findIndex((user: User) => {
        return user.id === userId}
    );
    const users = [...state.users];
    const selectedUser = {...users[userIndex]};
    
    // console.log(selectedUser);
    let newHobbies: Hobby[] = [...selectedUser.hobbies];
    let newHobby: Hobby;

    if(newHobbies.length === 0){
        newHobby = {id:1, passionLevel:hobby.passionLevel, name: hobby.name, startYear: hobby.startYear};
    }else{
        const currHobbyId = newHobbies[newHobbies.length-1].id;
        newHobby = {id:currHobbyId+1, passionLevel:hobby.passionLevel, name:hobby.name, startYear: hobby.startYear};
    }

    // console.log(newHobby);

    newHobbies.push(newHobby);    
    selectedUser.hobbies = newHobbies;
    users[userIndex] = selectedUser;

    // console.log(users);
    return {users: users};
}

function deleteHobby (state:AppState, hobbyId:number, userId: Number) : AppState {
    const userIndex: number = state.users.findIndex((user: User) => user.id === userId);
    const users = [...state.users]
    const selectedUser = {...users[userIndex]};
    
    let newHobbies: Hobby[] = [...selectedUser.hobbies];

    const hobbyIndex: number = newHobbies.findIndex((hobby: Hobby) => hobby.id === hobbyId);
    
    newHobbies.splice(hobbyIndex,1);

    selectedUser.hobbies = newHobbies;
    users[userIndex] = selectedUser;

    return {users: users};
}

function initializeUsers (state: AppState, userList: User[]): AppState {
    console.log(userList);
    return {users: userList};
}

const reducer = (state=initialState, action:any) => {
    // try{
        switch(action.type){
            case(actionType.INITIALIZE_USERS):
                return initializeUsers(state, action.initialUsers);
            case(actionType.ADD_USER): 
                return addUser(state, action.name);
            case (actionType.ADD_HOBBY):
                return addHobby(state, action.newHobby, action.userId);
            case (actionType.DELETE_HOBBY):
                return deleteHobby(state, action.hobbyId, action.userId);
            default:
                return state;
        }
    // }catch(error){
    //     console.error(error);
    //     alert("Some exception occured!!!");
    //     return state;
    // }
};

export default reducer;