import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getMovies} from '../actions'
import MovieItem from '../widgets/movieItem'

class HomeContainer extends Component{

    UNSAFE_componentWillMount(){
        this.props.dispatch(getMovies(1,0,'asc'))
    }

    renderItems = (movies) =>(
        movies.list ?
            movies.list.map(item=>(
                <MovieItem {...item} key={item._id}/>
            ))
        :null
    )
    
    loadMore = () =>{
        let count = this.props.movies.list.length
        this.props.dispatch(getMovies(1,count,'asc',this.props.movies.list))
    }

    render(){
        
        return(
            <div>
                {this.renderItems(this.props.movies)}
                <div className="loadmore" onClick={this.loadMore}>
                    loadmore
                </div>
            </div>
        )
    }
}


function mapStateToProps (state) {
    return {
        movies:state.movies
    }
}

export default connect(mapStateToProps)(HomeContainer)