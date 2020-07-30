import React from 'react';
import {Link} from 'react-router-dom'
const MovieItem = (item) =>{
    return(
        <Link to={`/movies/${item._id}`} className="movie_item">
            <div className="movie_header">
                <h2>
                    {item.name}
                </h2>
            </div>
            <div className="movie_items">
                <div className="movie_author">
                    {item.director}
                </div>
                <div className="movie_bubble">
                    <strong>
                        Price :
                    </strong> 
                    ${item.price}
                </div>
                <div className="movie_bubble">
                    <strong>
                        Duration :
                    </strong> 
                    {item.length}
                </div>
                <div className="movie_bubble rating">
                    <strong>
                        Rating :
                    </strong> 
                    {item.rating}
                </div>
            </div>
        </Link>
    )
}

export default MovieItem