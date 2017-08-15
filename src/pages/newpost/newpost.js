import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/common.less';
import '../../component/head/head.less';
import './newpost.less';
import Head from '../../component/head/head.server';
import Editor from '../../component/editor/editor';
import { ajax } from '../../vendor/util/util';
import { apis } from '../../main';

class NewPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: null,
            title: '',
            category: '',
            tags: '',
            content: '',
            categories: [],
            ...props
        };
    }
    componentWillMount(){
        let postId = window.location.href.split('?').pop();
        //获取分类
        ajax({
            url: apis.getCategory,
            type: 'get',
        }).then(res => {
            this.setState({
                categories: res.data.data.categorys
            });
        });
        //新建文章
        if(!/^[0-9a-zA-Z]{24}$/.test(postId)){
            return;
        }
        //编辑文章
        ajax({
            url: apis.getPostInfo,
            type: 'get',
            data: {
                postId
            }
        }).then(res => {
            let post = res.data.post;
            this.setState({
                title: post.title,
                category: post.category,
                tags: post.tags.join(',')
            });
            this.editor.setValue(post.content);
        });
    }
    render(){
        let options = this.state.categories.map((category, i) => {
            return (<option key={i}>{category}</option>);
        });
        return (
            <div>
                <Head
                    loginStatus={!!this.state.user}
                    loginUser={this.state.user}
                />
                <div className="page-post wrap">
                    <input
                        className="post-tit"
                        tabIndex="1"
                        type="text"
                        placeholder="请输入标题"
                        value={this.state.title}
                        onChange={this.inputTitle.bind(this)}
                        ref={titleInput => this.titleInput = titleInput}
                    />
                    <div className="post-category">
                        分类:
                        <select
                            tabIndex="2"
                            value={this.state.category}
                            onChange={this.changeCategory.bind(this)}
                            ref={category => this.category = category}
                        >
                            {options}
                        </select>
                        标签:
                        <input
                            className="input-tags"
                            tabIndex="3"
                            type="text"
                            placeholder="以英文,分隔"
                            value={this.state.tags}
                            onChange={this.inputTags.bind(this)}
                            ref={tagsInput => this.tagsInput = tagsInput}
                        />
                    </div>
                    <Editor
                        ref={editor =>　this.editor=editor}
                        editorConfig={
                            {
                                autofocus: false,
                                placeholder: '请输入正文内容'
                            }
                        }
                    />
                    <div className="post-btn ib-wrap">
                        <a
                            className="green"
                            onClick={this.publish.bind(this)}
                        >发布</a>
                        <a
                            className="gray"
                            onClick={this.save.bind(this)}
                        >保存到草稿</a>
                    </div>
                </div>
            </div>
        );
    }
    getContent(){
        return {
            title: this.titleInput.value,
            category: this.category.value,
            tags: this.tagsInput.value.split(','),
            content: this.editor.getValue()
        };
    }
    publish(){
        let postData = this.getContent();
        ajax({
            url: apis.publishPost,
            type: 'post',
            data: {
                status: 'publish',
                ...postData
            }
        }).then(res => {
            if(res.data.code !== 1){
                return ;
            }
            // clear autosaved value
            this.editor.stopAutosave();
            this.editor.clearValue();
            window.location.href = res.data.data.redirect
        });
    }
    save(){
        let postData = this.getContent();
        ajax({
            url: apis.publishPost,
            type: 'post',
            data: {
                status: 'draft',
                ...postData
            }
        }).then(res => {
            if(res.data.code !== 1){
                return ;
            }
            // clear autosaved value
            this.editor.stopAutosave();
            this.editor.clearValue();
            window.location.href = res.data.data.redirect
        });
    }
    inputTitle(e){
        this.setState({
            title: e.target.value
        });
    }
    changeCategory(e){
        this.setState({
            category: e.target.value
        });
    }
    inputTags(e){
        this.setState({
            tags: e.target.value
        });
    }
}

ReactDOM.render(<NewPost />, document.getElementById('newpost'));

