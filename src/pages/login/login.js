import React from 'react';
import ReactDOM from 'react-dom';
import './login.less';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            content: 'Login'
        }
    }

    componentWillMount(){
        //React.historyState.index++;
    }

    render(){
        return (
            <div>
                <h2>{this.state.content}</h2>
            </div>
        );
    }
    

};

ReactDOM.render(<Login />, document.getElementById('login'));
//new RenderRoot().render('login');