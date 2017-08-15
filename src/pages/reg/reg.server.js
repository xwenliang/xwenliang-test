import React from 'react';
import ReactDOM from 'react-dom';
import Head from '../../component/head/head.server';
import { ajax, trim } from '../../vendor/util/util';
import { apis, routers } from '../../main';

export default class Reg extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    componentWillMount(){}

    reg(){
        if(!this.username.value || !this.password.value){
            return alert('用户名/密码不能为空');
        }
        this.requesting = true;
        ajax({
            url: apis.reg,
            type: 'post',
            data: {
                username: trim(this.username.value),
                password: trim(this.password.value),
                password_r: trim(this.password.value),
                email: trim(this.email.value)
            }
        }).then(resp => {
            window.location.href = resp.data.data.redirect;
        });
    }

    render(){
        return (
            <div>
                <Head/>
                <div className="page-reg w fix">
                    <div className="reg-box">
                        <p><span className="avatar default"></span></p>
                        <p>
                            <input
                                type="text"
                                placeholder="请输入用户名"
                                ref={username => this.username = username}
                            />
                        </p>
                        <p>
                            <input
                                type="password"
                                placeholder="请输入密码"
                                ref={password => this.password = password}
                            />
                        </p>
                        <p>
                            <input
                                type="email"
                                placeholder="请输入邮箱(用于找回密码)"
                                ref={email => this.email = email}
                            />
                        </p>
                        <p>
                            <button
                                className="green confirm"
                                onClick={this.reg.bind(this)}
                            >注 册</button>
                        </p>
                        <p className="switch">
                            <a href={routers.login}>登录</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};