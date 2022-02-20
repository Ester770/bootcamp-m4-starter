const initialState = {
    searchLine: [],
    movies: [],
    favoriteList: [],
    idList: '',
}

function reducer(state=initialState, action) {
    switch (action.type) {
        case 'SEARCH':
            const searchLine = action.payload.searchLine;
            console.log(searchLine);

            return {
                ...state,
                searchLine: action.payload.searchLine
            }
            break;
        case 'ADD_TO_FAVS':
            const favaction = action.payload;
            console.log("favaction ", favaction);
            const arr = [... state.favoriteList];
            let fav = arr.find(item=> item.id === action.payload.id)
            if (fav){
                return (state); 
            } else {arr.push (favaction)};

            return {
                ...state,
                favoriteList: arr
            }
            break;
        case 'REMOVE_FROM_FAVORITES':
            const newFilms = state.favoriteList.filter(
                item => item.id !== action.payload.id
            );

            return { 
                ...state, 
                favoriteList: newFilms 
            };
            break;
        case 'GET_LIST_ID':
            return {
                ...state,
                idList: action.payload.listId
            };

            break;    
    }

    return initialState;
}

export default reducer;












