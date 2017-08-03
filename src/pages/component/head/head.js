import React from 'react';
import '../../../css/common.less';
import './head.less';

export default class Head extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...props
        };
    }
    componentWillReceiveProps(props){
        this.setState({
            ...props
        });
    }
    render(){
        return (
            <header className="page-header">
                <div className="processor"></div>
                <div className="header-wrap">
                    <div className="wrap fix">
                        <h1>web开发笔记</h1>
                        <div className="logo"><a href="/" title="web开发笔记">zooble</a></div>
                        <div className="nav ib-wrap">
                            <a href="/music">music</a>
                            <a href="/chatroom">chatroom</a>
                        </div>
                        <div className="login ib-wrap">
                            <a href="/login">登录</a>
                            <a href="/reg">注册</a>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}