import {createStore} from 'redux';

const inicialState = {
    pokemones: [],
    vista: 1
}

const reducerVista = (state = inicialState, action) => {    
    
    console.log(action);
    if (action.type === "VER_POKEMON"){
        return{
            ...state,
            vista: action.id
        }
    }
    return state
}

export default createStore(reducerVista);