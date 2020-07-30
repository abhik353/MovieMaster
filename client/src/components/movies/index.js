import React, {Component} from 'react';
import {getMovieWithReviewer , clearMovieWithReviewer} from '../../actions'
import {connect} from 'react-redux'

class MoviesView extends Component{

    componentWillMount(){
        this.props.dispatch(getMovieWithReviewer(this.props.match.params.id))
    }

    componentWillUnmount(){
        this.props.dispatch(clearMovieWithReviewer())
    }

    renderMovie = (movies)=>(
        movies.movie ?
            <div className="br_container">
                <div className="br_header">
                    <h2>{movies.movie.name}</h2>
                    <h5>{movies.movie.director}</h5>
                    <div className="br_reviewer">
                        <span>Review by:</span> {movies.reviewer.name} {movies.reviewer.lastname}
                    </div>
                </div>
                <div className="br_review">
                    {movies.movie.review}
                </div>
                <div className="br_box">
                    <div className="left">
                        <div>
                            <span> Pages : </span> {movies.movie.length}
                        </div>
                        <div>
                            <span>Price : </span>{movies.movie.price}
                        </div>
                    </div>
                    <div className="right">
                        <span> Rating : </span> {movies.movie.rating}
                    </div>
                </div>
            </div> 
        :null
    )

    render(){
        let movies = this.props.movies
        return(
            <div>
                {this.renderMovie(movies)}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        movies:state.movies
    }
}
export default connect(mapStateToProps)(MoviesView)