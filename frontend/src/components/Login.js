import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: "", password: "" }
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.get_token(this.state.username, this.state.password)
        event.preventDefault()
    }


    render() {
        return (
            <div className='container'>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <label className='form-label'>login</label>
                    <input type='text' name="username" className="form-control" value={this.state.username} onChange={(event) => this.handleChange(event)} />

                    <label className='form-label'>Password</label>
                    <input type='password' name='password' className="form-control" value={this.state.password} onChange={(event) => this.handleChange(event)} />
                    <input type='submit' className='btn btn-primary' value='Войти' />
                </form>
            </div>
        )
    }
}

export default LoginForm;