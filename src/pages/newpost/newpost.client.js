import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/common.less';
import '../../component/head/head.less';
import './newpost.less';
import Head from '../../component/head/head.server';
import Editor from '../../component/editor/editor';
import { ajax } from '../../vendor/util/util';

export default class NewPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            title: '',
            category: '',
            tags: '',
            content: '',
            categories: [],
            postId: '',
            //发布\更新文章
            saveUrl: '',
            ...props
        };
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
                <div className="page-newpost wrap">
                    <div className="newpost-wrap">
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
            </div>
        );
    }
    componentWillReceiveProps(props){
        this.setState({
            ...props
        });
    }
    setValue(value){
        this.editor.setValue(value);
    }
    getContent(){
        return {
            title: this.titleInput.value,
            category: this.category.value,
            tags: this.tagsInput.value.split(','),
            content: this.editor.getValue(),
            postId: this.state.postId
        };
    }
    publish(){
        let postData = this.getContent();
        ajax({
            url: this.state.saveUrl,
            type: 'post',
            data: {
                status: 'publish',
                ...postData
            }
        }).then(res => {
            if(res.data.code !== 1){
                return alert(res.data.msg);
            }
            // clear autosaved value
            this.editor.stopAutosave();
            this.editor.clearValue();
            window.location.href = res.data.data.redirect;
        });
    }
    save(){
        let postData = this.getContent();
        ajax({
            url: this.state.saveUrl,
            type: 'post',
            data: {
                status: 'draft',
                ...postData
            }
        }).then(res => {
            if(res.data.code !== 1){
                return alert(res.data.msg);
            }
            // clear autosaved value
            this.editor.stopAutosave();
            this.editor.clearValue();
            window.location.href = res.data.data.redirect;
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