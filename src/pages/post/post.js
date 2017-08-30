import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/common.less';
import '../../component/head/head.less';
import './post.less';
import Prism from '../../vendor/prismjs/prism';
import Post from './post.server';

ReactDOM.render(<Post
    user={serverData.user}
    host={serverData.host}
    post={serverData.post}
/>, document.getElementById('post'), function(){
    Prism.highlightAll();
});