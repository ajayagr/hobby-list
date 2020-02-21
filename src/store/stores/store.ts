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
    users: [{
        id: 1,
        name: "Ajay",
        hobbies: [
            {id: 1, passionLevel: "High", name:"Badminton", startYear:2002},
            {id: 2, passionLevel:"Low", name:"Watching anime", startYear:2010}
                ]
    }]
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

const reducer = (state=initialState, action:any) => {
    switch(action.type){
        case(actionType.ADD_USER): 
            return addUser(state, action.name);
        case (actionType.ADD_HOBBY):
            return addHobby(state, action.newHobby, action.userId);
        case (actionType.DELETE_HOBBY):
            return deleteHobby(state, action.hobbyId, action.userId);
        default:
            return state;
    }
};

export default reducer;