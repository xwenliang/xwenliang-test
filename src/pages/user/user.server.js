import React from 'react';
import Head from '../../component/head/head.server';
import ListItem from '../../component/listItem/listItem.server';
import { ajax, trim } from '../../vendor/util/util';
import { apis, routers } from '../../main';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ...props
        };
    }

    render(){
        return (
            <div>
                <Head
                    loginStatus={!!this.state.user}
                    loginUser={this.state.user}
                />
                <div className="page-user wrap fix">
                    <div className="list">
                        <div className="draft-tit box">
                            <p className="tit">草稿箱</p>
                            <span className="total">共 {this.state.draftList.length} 篇</span>
                        </div>
                        {this.state.draftList.map((li, key) => <ListItem key={key} data={li} />)}
                        <div className="draft-tit box">
                            <p className="tit">已发布</p>
                            <span className="total">共 {this.state.publishList.length} 篇</span>
                        </div>
                        {this.state.publishList.map((li, key) => <ListItem key={key} data={li} />)}
                    </div>
                    <div className="user">
                        <div className="box user-info">
                            <div className="user-img" style={{backgroundImage: `url(${this.state.host.img})`}}></div>
                            <div className="user-name">
                                <span>{this.state.host.username}</span>
                            </div>
                            <div className="user-des">{this.state.host.describe}</div>
                        </div>
                        {
                            this.state.user && this.state.user.username === this.state.host.username
                            ? <div className="box user-btn ib-wrap">
                                <a className="green" href="/newpost">写作</a>
                              </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }
};

