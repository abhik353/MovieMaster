import React, {Component} from 'react';
import { connect } from 'react-redux';
import {LoginUser} from '../../actions'




class Login extends Component{

    state = {
        email:'',
        password:'',
        error:'',
        success:false
    } 
    
    handleInputEmail = (event) =>{
        this.setState({email:event.target.value})
    }

    handleInputPassword = (event) =>{
        this.setState({password:event.target.value})
    }

    
    componentWillReceiveProps(nextProps){
        if(nextProps.users.login.isAuth){
            this.props.history.push('/user')
        }
    }

    submitForm = (e) =>{
        e.preventDefault()
        this.props.dispatch(LoginUser(this.state))

    }

    render(){
        let user = this.props.users

        return(
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>
                        Login here
                    </h2>
                    <div className="form_element">
                        <input 
                            type="email"
                            placeholder="enter your mail"
                            value={this.state.email}
                            onChange={this.handleInputEmail}
                            >

                            </input>

                    </div>
                    <div className="form_element">
                        <input 
                            type="password"
                            placeholder="enter your password"
                            value={this.state.password}
                            onChange={this.handleInputPassword}
                            >

                            </input>

                    </div>
                    <button type="submit"> log in </button>
                    <div className="error">
                        {
                            user.login ?
                                <div>{user.login.message}</div>
                            :null
                        }
                    </div>
                    
                </form>
            </div>
        )
    }
}


function mapStateToProps(state){
    console.log(state)
    return {
        users : state.users
    }
}

export default connect(mapStateToProps)(Login)