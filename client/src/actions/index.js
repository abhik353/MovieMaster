import axios from 'axios';


export function getMovies(
    limit = 10,
    start = 0,
    order = 'asc',
    list = ''
){
    
    const request = axios.get(`/api/movies?limit=${limit}&skip=${start}&order=${order}`)
                    .then(response => {
                            if(list){
                                return [...list,...response.data]
                            }
                            else{
                                return response.data
                            }
                       }   )
    
                    
    return{
        type:'GET_MOVIES',
        payload:request
    }
}

export function getMovieWithReviewer(id){
    const request = axios.get(`/api/getMovie?id=${id}`)

    return (dispatch) =>{
        request.then(({data})=>{
            let movie = data
            
            axios.get(`/api/getReviewer?id=${movie.ownerId}`)
            .then(({data})=>{
                let response = {
                    movie,
                    reviewer:data
                }
                console.log(response)
                dispatch({
                    type:'getMovieReviewer',
                    payload:response
                })
            })
            
        })
    }
}

export function clearMovieWithReviewer(){
    return{
        type:'clearMovieReviewer',
        payload:{
            movies:{},
            reviewer:{}
        }
    }
}

export function LoginUser({email,password}){
    const request = axios.post('/api/login',{email,password})
                    .then(response => response.data)

    return{
        type:'USER_LOGIN',
        payload:request
    }
}

export function auth(){
    const request = axios.get('/api/auth')
                    .then(response => response.data)
    
    return{
        type:'USER_AUTH',
        payload:request
    }                
}

export function addMovie(movie){
    const request = axios.post('/api/movie',movie)
                    .then(response=>response.data)
    
    return{
        type:'ADD_MOVIE',
        payload:request
    }
}

export function clearNewMovie(){
    return{
        type:'CLEAR_MOVIE',
        payload:{}
    }
}

export function getUserPosts(userId){
    const request= axios.get(`/api/user_posts?user=${userId}`)
                   .then(response => response.data)
    return{
        type:'GET_USER_POSTS',
        payload:request
    }
}

export function getMovie(id){
    const request = axios.get(`/api/getMovie?id=${id}`)
                   .then(response=> response.data)
    return{
        type:'GET_MOVIE',
        payload:request
    }
}

export function updateMovie(data){
    const request = axios.post(`/api/movieUpdate`,data)
                    .then(response=>response.data)
    
    return{
        type:'UPDATE_MOVIE',
        payload:request
    }
}

export function deleteMovie(id){
    const request = axios.delete(`/api/deleteMovie?id=${id}`)
                    .then(response =>response.data)
    
    return{
        type:'DELETE_MOVIE',
        payload:request
    }
}

export function clearMovie(){
    return{
        type:'CLEAR_EDITED_MOVIE',
        payload:{
            movie :null,
            updateMovie:false,
            reviewDeleted:false    
        }
    }
}

export function getUsers(){
    const request = axios.get(`/api/getUsers`)
                    .then(response => response.data)

    return{
        type:'GET_USERS',
        payload:request
    }
}

export function registerUser(users,userlist){
    const request = axios.post(`/api/register`,users)
    return(dispatch) =>{
        request.then(({data})=>{
            console.log(({data}))
            let users = data.success ? [...userlist,data.user]:userlist
            let response = {
                success:data.success,
                users
            }
            dispatch({
                type:'USER_REGISTER',
                payload:response
            })
        })
    }
}