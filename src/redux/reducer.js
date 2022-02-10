const initialState = {
    searchLine: [],
    movies: [],
}

function reducer(store, action) {
    switch (action.type) {
        case 'SEARCH':
            const searchLine = action.payload.searchLine;
            console.log (searchLine);

            return {
                ...initialState,
                searchLine: action.payload.searchLine
            }
            break;
    }
    return initialState;
}


export default reducer;












