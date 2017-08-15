import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/common.less';
import '../../component/head/head.less'
import '../../component/listItem/listItem.less';
import './user.less';
import User from './user.server';

ReactDOM.render(<User
    user={serverData.user}
    host={serverData.host}
    publishList={serverData.publishList}
    draftList={serverData.draftList}
/>, document.getElementById('user'));