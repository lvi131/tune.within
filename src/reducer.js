export const initialState = {
    user: null,
    playlist:[],
    token: null
  };

  const reducer = (state,action) => {
    
    console.log(action);

    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user:action.user
            }

        case 'SET_TOKEN':
            return {
                ...state,
                token:action.token
            }

        case 'SET_PLAYLIST':
            return {
                ...state,
                playlist:action.playlist
            }

        default:
            return state;
    }

  }

  export default reducer;
  