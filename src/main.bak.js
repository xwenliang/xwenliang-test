import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import reactDOMServer from 'react-dom/server';

let curIndex;
window.addEventListener('popstate', (e)=>{
    if(!e.state || !e.state.state){
        return console.log('back');
    }

    curIndex = curIndex === undefined ? sessionStorage.getItem('historyIndex') : curIndex;
    if(e.state.state.index < curIndex){
        console.log('back');
    }
    else{
        console.log('forward');
    }
    curIndex = e.state.state.index;

    sessionStorage.setItem('historyIndex', e.state.state.index);
});

//各个组件记录当前的history索引
React.historyState = React.historyState || {index: -1};
const RootRooter = () => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to={{
                        pathname: '/index.html',
                        state: React.historyState
                    }}>Home</Link>
                </li>
                <li>
                    <Link to={{
                        pathname: '/login.html',
                        state: React.historyState
                    }}>Topics</Link>
                </li>
            </ul>

            <hr/>

            <Route exact path="/index.html"/>
            <Route path="/Login.html"/>
        </div>
    </Router>
);

export default class RenderRoot {
    render(id){
        ReactDOM.render(<RootRooter />, document.getElementById(id));
    }
};