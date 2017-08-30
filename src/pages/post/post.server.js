import React from 'react';
import Head from '../../component/head/head.server';
import { ajax, trim } from '../../vendor/util/util';
import { apis, routers } from '../../main';

export default class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            host: null,
            post: null,
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
                <div className="page-post wrap">
                    <div className="post-wrap">
                        <div className="user-i">
                            <div className="user-img">
                                <a
                                    href={routers.user(this.state.host.username)}
                                    style={{backgroundImage: this.state.host.img}}
                                >
                                </a>
                            </div>
                            <div className="user-name">
                                <a href={routers.user(this.state.host.username)}>{this.state.host.username}</a>
                            </div>
                            <div className="user-des">{this.state.host.describe}</div>
                        </div>
                        <h1 className="title">{this.state.post.title}</h1>
                        <div className="status ib-wrap">
                            <a href={routers.category(this.state.post.category)}>{this.state.post.category}</a>
                            <span className="dot"></span>
                            <span className="date-num">{this.state.post.date}</span>
                        </div>
                        <div className="artical">
                            <div className="workplace" dangerouslySetInnerHTML={{__html: this.state.post.content}}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}