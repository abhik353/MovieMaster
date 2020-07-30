export default function(state={},action){
    switch(action.type){
        case 'GET_MOVIES':
            return {...state,list:action.payload}
        case 'getMovieReviewer':
            return {...state,
                movie:action.payload.movie,
                reviewer:action.payload.reviewer
            }
        case 'clearMovieReviewer':
            return {...state,
                movie:action.payload.movie,
                reviewer:action.payload.reviewer
            }
        case 'ADD_MOVIE':
            return {...state,newMovie:action.payload}
        case 'CLEAR_MOVIE':
            return {...state,newMovie:action.payload}
        case 'GET_MOVIE':
            return {...state,movie:action.payload}
        case 'UPDATE_MOVIE':
            return {...state,
                    updateMovie:action.payload.success,
                    movie:action.payload.doc
                }
        case 'DELETE_MOVIE':
            return {...state,reviewDeleted:action.payload}
        case 'CLEAR_EDITED_MOVIE':
            return {
                ...state,
                updateMovie:action.payload.updateMovie,
                movie:action.payload.movie,
                reviewDeleted:action.payload.reviewDeleted
            }
        default:
            return state;
            
    }}
