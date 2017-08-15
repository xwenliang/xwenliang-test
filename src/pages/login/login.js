import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/common.less';
import '../../component/head/head.less';
import './login.less';
import Login from './login.server';

ReactDOM.render(<Login
    user={serverData.user}
    avatar={serverData.avatar}
    username={serverData.username}
/>, document.getElementById('login'));