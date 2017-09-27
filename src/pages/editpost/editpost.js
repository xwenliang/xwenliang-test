import React from 'react';
import ReactDOM from 'react-dom';
import NewPost from '../newpost/newpost.client';
import { ajax } from '../../vendor/util/util';
import { apis } from '../../main';

class EditPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            title: '',
            category: '',
            tags: '',
            content: '',
            categories: []
        };
        this.postId = window.location.href.split('/editpost/').pop();
        if(!/^[0-9a-zA-Z]{24}$/.test(this.postId)){
            return;
        }
        //获取分类
        ajax({
            url: apis.getCategory,
            type: 'get',
        }).then(res => {
            this.setState({
                categories: res.data.data.categories
            });
        });
        //获取文章内容
        ajax({
            url: apis.getPostInfo,
            type: 'get',
            data: {
                postId: this.postId
            }
        }).then(res => {
            let post = res.data.data.post;
            this.setState({
                title: post.title,
                category: post.category,
                tags: post.tags.join(',')
            });
            this.newpost.setValue(post.content);
        });
    }
    render(){
        return <NewPost
            ref={newpost => this.newpost = newpost}
            title={this.state.title}
            category={this.state.category}
            tags={this.state.tags}
            categories={this.state.categories}
            postId={this.postId}
            saveUrl={apis.updatePost}
        />;
    }
}



ReactDOM.render(<EditPost />, document.getElementById('editpost'));