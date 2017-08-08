import React from 'react';
import $ from '../../../vendor/jquery/jquery';
import '../../../css/common.less';
import './head.less';
import {
    apis,
    routers
} from '../../main';

/* @props

 */
export default class Head extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loginStatus: false,
            loginUser: null,
            ...props
        };
    }
    logout(){
        $.ajax({
            url: apis.getLogout,
            type: 'get',
            dataType: 'json'
        }).then(resp => {
            this.setState({
                loginStatus: false
            });
        });
    }
    render(){
        let leftNavs = '';//(
        //     <div className="nav ib-wrap">
        //         <a href="/music">music</a>
        //         <a href="/chatroom">chatroom</a>
        //     </div>
        // );
        let rightNavs = this.state.loginStatus ?
        (
            <div className="right-navs">
                <a className="user" href={`/u/${this.state.loginUser.username}`}>
                    <img src={this.state.loginUser.img} /><span>{this.state.loginUser.username}</span>
                </a>
                <em className="vline"></em>
                <a onClick={this.logout.bind(this)}>退出</a>
            </div>
        )
        :
        (
            <div className="right-navs">
                <div className="ib-wrap">
                    <a href={routers.login}>登录</a>
                    <a href={routers.reg}>注册</a>
                </div>
            </div>
        );

        return (
            <header className="page-header">
                <div className="processor"></div>
                <div className="header-wrap">
                    <div className="wrap fix">
                        <h1>web开发笔记</h1>
                        <div className="logo"><a href={routers.index} title="web开发笔记">zooble</a></div>
                        {leftNavs}
                        {rightNavs}
                    </div>
                </div>
            </header>
        );
    }
    componentDidMount(){
        $.ajax({
            url: apis.getLoginStatus,
            type: 'get',
            dataType: 'json'
        }).then(resp => {
            this.setState({
                loginStatus: resp.data.loginStatus,
                loginUser: resp.data.user
            });
        });
    }
    componentWillReceiveProps(props){
        this.setState({
            ...props
        });
    }
}