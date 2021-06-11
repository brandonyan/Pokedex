import {createStore} from 'redux';

const inicialState = {
    pokemones: [],
    enVIsta: []
}

const reducerVista = (state = inicialState, action) => {
    return state
}

export default createStore(reducerVista);