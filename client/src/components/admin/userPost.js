import React,{Component} from 'react';
import {connect} from 'react-redux'
import {getUserPosts} from '../../actions'
import moment from 'moment-js'
import {Link} from 'react-router-dom'


class UserPost extends Component{

    componentWillMount(){
        this.props.dispatch(getUserPosts(this.props.users.login.id))
    }

    showUserPosts = (users) =>(
        users.userPosts ?
            users.userPosts.map(item =>(
                <tr key={item._id}>
                    <td><Link to={
                        `/user/editPost/${item._id}`
                    }>
                        {item.name}
                        </Link></td>
                    <td>{item.director}</td>
                    <td>
                        {moment(item.createAt).format("MM/DD/YY")}
                    </td>
                </tr>
            ))
            :null
    )

    render(){
        
        let user = this.props.users 
        return(
            <div className="user_posts">
                <h4>My Reviews:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Director</th>
                                <th>Date</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            {this.showUserPosts(user)}
                        </tbody>
                    </table>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        users:state.users
    }
}

export default connect(mapStateToProps)(UserPost)