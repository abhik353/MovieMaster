import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {addMovie,clearNewMovie} from '../../actions'


class AddMovie extends Component{

    state = {
        formdata :{
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

    showNewMovie = (movies) =>(
        movies.post?
            <div className="conf_link">
                ok
                <Link to={`/movies/${movies.movieId}`}>
                    click the link to see the post
                </Link>
            </div>
        :null
    )

    submitForm = (e) =>{
        e.preventDefault()
        this.props.dispatch(addMovie({
            ...this.state.formdata,
            ownerId:this.props.users.login.id
        }))
    }

    componentWillUnmount(){
        this.props.dispatch(clearNewMovie())
    }

    render(){
        let entry = this.state.formdata
        return(
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Add review</h2>
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
                    
                    <button type="submit">Post review</button>
                    {
                        this.props.movies.newMovie ?
                            this.showNewMovie(this.props.movies.newMovie)
                        :null
                    }
                </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return {
        movies: state.movies
    }
}

export default connect(mapStateToProps)(AddMovie)