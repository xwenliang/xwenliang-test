# xwenliang.cn

### React Server Side Rendering

xxx.server.js split css and other node side can't identify.

### Caution: 

Component's life cycle before `componentDidMount` will exec in node side. Such as `constructor` `componentWillMount` `render`. 

So we must ensure that there are no DOM/BOM operate before `componentDidMount`

Use `ReactDOMServer.renderToString` in webpack package stage to create DOM string




React前后端同构，想说爱你不容易

最近在折腾前


common.js:446 Warning: render(): Target node has markup rendered by React, but there are unrelated nodes as well. This is most commonly caused by white-space inserted around server-rendered markup.

 React attempted to reuse markup in a container but the checksum was invalid



 pm2 start --interpreter babel-node app.js --watch