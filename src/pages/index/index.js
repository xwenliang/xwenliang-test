import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import '../../css/common.less';
import '../component/head/head.less';
import '../component/listItem/listItem.less';
import '../component/comment/comment.less';
import './index.less';
import Index from './index.server';

ReactDOM.render(<Index/>, document.getElementById('index'));
