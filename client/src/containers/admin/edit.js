import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {getMovie,updateMovie, clearMovie, deleteMovie} from '../../actions'


class EditMovie extends PureComponent{

    state = {
        formdata :{
            _id:this.props.match.params.id,
            name:'',
            director:'',
            review:'',
            length:'',
            price:'',
            rating:''
        }
    }

    handleInput = (event,name) =>{
        const newFormData = {
            ...this.state.formdata
        }
        newFormData[name] = event.target.value
        this.setState({
            formdata:newFormData
        })
    }

    

    submitForm = (e) =>{
        e.preventDefault()
        this.props.dispatch(updateMovie(this.state.formdata))
        
    }

    deletePost = () => {
        this.props.dispatch(deleteMovie(this.props.match.params.id))
    }

    redirectUser = () =>{
        setTimeout(()=>{
            this.props.history.push('/user/user-reviews')
        },2000)
    }

    componentWillMount(){
        this.props.dispatch(getMovie(this.props.match.params.id))
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        let movie = nextProps.movies.movie
        this.setState({
            formdata:{
                _id:movie._id,
                name:movie.name,
                director:movie.director,
                review:movie.review,
                length:movie.length,
                rating:movie.rating,
                price:movie.price
            }
        })
    }

    componentWillUnmount(){
        this.props.dispatch(clearMovie())
    }

    render(){
        let movies = this.props.movies
        let entry = this.state.formdata
        return(
            <div className="rl_container article">
                {
                    movies.updateMovie?
                     <div className="edit_confirm">
                         Post updated 
                         <Link to={`/movies/${movies.movie._id}`}>
                              click here to view post
                             </Link>
                    </div>
                    :null
                }
                {
                    movies.reviewDeleted ?
                    <div className="red_tag">
                        post deleted successfully
                        {this.redirectUser()}
                    </div>
                    :null
                }
            
                <form onSubmit={this.submitForm}>
                    <h2>Edit review</h2>
                    <div className="form_element">
                        <input
                            type='text'
                            placeholder="enter movie name"
                            value={entry.name}
                            onChange={(event)=>this.handleInput(event,'name')}
                        >

                        </input>
                    </div>
                    <div className="form_element">
                        <input
                            type='text'
                            placeholder="enter director"
                            value={entry.director}
                            onChange={(event)=>this.handleInput(event,'director')}
                        >

                        </input>
                    </div>
                    <textarea
                        value={entry.review}
                        placeholder="enter review"
                        onChange={(event)=>this.handleInput(event,'review')}
                    >
                    

                    </textarea>
                    <div className="form_element">
                        <input
                            type='text'
                            placeholder="enter duration"
                            value={entry.length}
                            onChange={(event)=>this.handleInput(event,'length')}
                        >

                        </input>
                    </div>
                    <div className="form_element">
                        <input
                            type='text'
                            placeholder="enter price"
                            value={entry.price}
                            onChange={(event)=>this.handleInput(event,'price')}
                        >

                        </input>
                    </div>
                    <div className="form_element">
                        <select
                            value={entry.rating}
                            onChange={(event)=>this.handleInput(event,'rating')}
                        >
                           <option val="1">1</option>
                           <option val="2">2</option>
                           <option val="3">3</option>
                           <option val="4">4</option> 
                           <option val="5">5</option>    
                        </select>
                    </div>
                    
                    <button type="submit">Edit review</button>
                    <div className="delete_post">
                        <div className="button"
                            onClick={this.deletePost}
                            >
                            Delete Review
                        </div>

                    </div>
                    </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    
    return {
        movies: state.movies
    }
}

export default connect(mapStateToProps)(EditMovie)