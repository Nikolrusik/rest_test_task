import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='container'>
                <form>
                    <label className='form-label'>login</label>
                    <input type='text' className="form-control" value='admin' />
                    <label className='form-label'>Password</label>
                    <input type='password' className="form-control" value='admin' />
                    <input type='submit' className='btn btn-primary' value='Войти' />
                </form>
            </div>
        )
    }
}

export default LoginForm;