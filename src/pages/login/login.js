import React from 'react';
import ReactDOM from 'react-dom';
import './login.less';
import Head from '../component/head/head';
import $ from '../../vendor/jquery/jquery';
import {
    setCookie,
    getCookie
} from '../../vendor/util/util';
import {
    apis,
    routers
} from '../main';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: getCookie('username'),
            avatar: ''
        }
    }

    componentWillMount(){
        if(this.state.username){
            $.ajax({
                url: '/getUserInfo',
                type: 'get',
                dataType: 'json',
                data: {
                    arr: [this.state.username]
                }
            }).then(resp => {
                if(!resp.data.userArr.length){
                    return;
                }
                this.setState({
                    avatar: resp.data.userArr[0].img
                });
            });
        }
    }

    login(){
        if(!this.username.value || !this.password.value){
            alert('用户名/密码不能为空');
        }
        this.requesting = true;
        $.ajax({
            url: apis.login,
            type: 'post',
            dataType: 'json',
            data: {
                username: $.trim(this.username.value),
                password: $.trim(this.password.value)
            }
        }).then(resp => {
            window.location.href = resp.data.redirect;
        });
    }
    switchUser(){
        this.setState({
            username: ''
        });
    }

    render(){
        let loginBox = this.state.username ?
        (
            <div>
                <p>
                    <span
                        className="avatar"
                        style={{'backgroundImage': `url(${this.state.avatar})`}}
                    >
                    </span>
                </p>
                <p>
                    <input
                        key="1"
                        type="text"
                        placeholder="请输入用户名"
                        defaultValue={this.state.username}
                        readOnly
                        ref={username => this.username = username}
                    />
                </p>
            </div>
        )
        :
        (
            <div>
                <p><span className="avatar default"></span></p>
                <p>
                    <input
                        key="2"
                        type="text"
                        placeholder="请输入用户名"
                        ref={username => this.username = username}
                    />
                </p>
            </div>
        );
        return (
            <div>
                <Head/>
                <div className="page-login w fix">
                    <div className="login-box">
                        {loginBox}
                        <p>
                            <input
                                type="password"
                                placeholder="请输入密码"
                                ref={password => this.password = password}
                            />
                        </p>
                        <p>
                            <button
                                className="green confirm"
                                onClick={this.login.bind(this)}
                            >登 录</button>
                        </p>
                        <p className="switch">
                            <a onClick={this.switchUser.bind(this)}>切换用户</a>
                            <a href={routers.reg}>注册</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }


};

ReactDOM.render(<Login />, document.getElementById('login'));
//new RenderRoot().render('login');