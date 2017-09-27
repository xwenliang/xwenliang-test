import React from 'react';
import ReactDOM from 'react-dom';
import NewPost from './newpost.client';
import { ajax } from '../../vendor/util/util';
import { apis } from '../../main';

class NewPostWithData extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            categories: []
        };
        //获取分类
        ajax({
            url: apis.getCategory,
            type: 'get',
        }).then(res => {
            this.setState({
                categories: res.data.data.categories
            });
        });
    }
    render(){
        return <NewPost 
            categories={this.state.categories}
            saveUrl={apis.publishPost}
        />;
    }
}

ReactDOM.render(<NewPostWithData />, document.getElementById('newpost'));

