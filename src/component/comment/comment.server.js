import React from 'react';
import {
    ajax,
    trim,
    strLen,
    convertDate
} from '../../vendor/util/util';

/* @for node reason this cannot be import
 * @import '../../css/common.less';
 * @import './comment.less';
 */

class Item extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...props
        };
    }
    createMarkup(html){
        return {
            __html: `: ${html}`
        }
    }
    render(){
        let comment = this.state.comment;
        let userItem = comment.isRegisted 
            ? <a href={"/u/" + comment.user}>{comment.user}</a>
            : comment.user;
        return (
            <li>
                <span className="c-name">{userItem}</span>
                <span className="c-text" dangerouslySetInnerHTML={this.createMarkup(comment.text)}></span>
                <span className="c-date">{convertDate(comment.date)}</span>
            </li>
        );
    }
    componentWillReceiveProps(props){
        this.setState({
            ...props
        });
    }
};
/*
 * @props:
 *      className           评论框的class
 *      title               评论框的标题，没有该值则不显示title
 *      maxLen              输入框最多允许输入字符数
 *      showListNum         只显示前多少条数据，没有该值则全部显示
 *      getMoreUrl          更多数据的页面地址，给首页用，没有该值则不显示更多按钮
 *      publishUrl          发布数据的地址
 *      publishData         发布数据的附加参数(用户输入内容已自动获取了评论框中的textarea的值)
 *      listData            初始数据
 *      reversed            数据是否倒序显示，默认正序
 *      showListTotal       显示数据统计，没有该值则不显示
 *      noDataTips          没有数据时候的提示语
 */
export default class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errText: '还可输入',
            errClass: '',
            limit: props.maxLen,
            commentLen: props.listData.length,
            ...props
        }
    }
    inputHandler(e){
        let state = {
            limit: this.state.maxLen - strLen(e.target.value)
        };
        if(state.limit < 0){
            state.errClass = 'c-red';
            state.errText = '已超过';
        }
        else{
            state.errClass = '';
            state.errText = '还可输入';
        }
        this.setState(state);
    }
    publish(e){
        let el = e.currentTarget;
        let $input = this.textarea;
        let val = trim($input.value);
        let publishData = {
            text: val, 
            ...this.state.publishData
        };
        if(el.ajaxing || !val || strLen(val) > this.state.maxLen){
            return;
        }
        el.ajaxing = true;

        ajax({
            url: this.state.publishUrl,
            type: 'post',
            data: publishData,
        }).then(ret => {
            //首页的灌水，只显示四条，所以多于四条的时候要做下处理
            if(this.state.showListNum && this.state.listData.length > this.state.showListNum - 1){
                this.state.listData.pop();
            }
            let listData = this.state.reversed
                    ? [ret.data.data].concat(this.state.listData)
                    : this.state.listData.concat([ret.data.data]);
            //增加评论和评论数
            this.setState({
                listData,
                maxLen: this.state.maxLen,
                commentLen: ++this.state.commentLen
            });
            //删除输入框中已发布的内容
            $input.value = '';
            el.ajaxing = false;
        });
    }
    enterKeyPublish(e){
        if(e.keyCode === 13 && e.ctrlKey){
            this.publish(e);
            e.preventDefault();
        }
    }
    render(){
        let items = [];
        let total = this.state.showListTotal ? <span className="c-total">({this.state.commentLen})</span> : null;
        let title = this.state.title ? <h6 className="c-tit">{this.state.title}{total}</h6> : null;
        let getMoreBtn = this.state.getMoreUrl ? <a className="c-all gray" href={this.state.getMoreUrl}>查看所有</a> : null;
        //当不存在数据时，显示提示语
        if(!this.state.listData.length){
            items.push(this.state.noDataTips);
        }
        else{
            this.state.listData.map((comment, index) => {
                items.push(<Item key={index} comment={comment}/>);
            });
        }
        return (
            <div className={`comment ${this.state.className}`}>
                {title}
                <ul className="c-ul">
                    {items}
                </ul>
                <div className="c-input" ref={publishBox => this.publishBox = publishBox}>
                    <textarea
                        ref={textarea => this.textarea = textarea}
                        onInput={this.inputHandler.bind(this)}
                        onKeyDown={this.enterKeyPublish.bind(this)}
                    />
                    <div className="c-btns ib-wrap">
                        <button
                            className="c-pub green"
                            onClick={this.publish.bind(this)}
                        >发表</button>
                        {getMoreBtn}
                        <span className="c-tips">
                            <em>{this.state.errText}</em>
                            <em
                                className={"c-num " + this.state.errClass}
                            >{Math.abs(this.state.limit)}</em>个字
                        </span>
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
};


