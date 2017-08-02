import React from 'react';
import $ from '../../../vendor/jquery/jquery';
import './comment.less';

class Item extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...props
        };
    }
    render(){
        let comment = this.state.comment;
        let userItem = comment.isRegisted ? <a href={"/u/" + comment.user}>{comment.user}</a> : comment.user;
        return (
            <li>
                <span className="c-name">{userItem}</span>
                <span className="c-text" dangerouslySetInnerHTML={this.createMarkup(comment.text)}></span>
                <span className="c-date">{comment.date}</span>
            </li>
        );
    }
    createMarkup(html){
        return {
            __html: `: ${html}`
        }
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
    componentWillReceiveProps(props){
        this.setState({
            ...props
        });
    }
    render(){
        let items = [];
        let total = this.state.showListTotal ? <span className="c-total">({this.state.commentLen})</span> : null;
        let title = this.state.title ? <h6 className="c-tit">{this.state.title}{total}</h6> : null;
        let getMoreBtn = this.state.getMoreUrl ? <a className="c-all gray" href={this.state.getMoreUrl}>查看所有</a> : null;
        //当不存在数据时，显示提示语
        if(!this.state.listData.length){
            items.push(this.state.noDataTips)
        }
        else{
            this.state.listData.map((comment, index) => {
                items.push(<Item key={index} comment={comment}/>);
            })
        }
        return (
            <div className={`comment ${this.state.className}`}>
                {title}
                <ul className="c-ul">
                    {items}
                </ul>
                <div className="c-input" ref={publishBox => this.publishBox = publishBox}>
                    <textarea
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
    inputHandler(e){
        let state = {
            limit: this.state.maxLen - this.strLen(e.target.value)
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
        let parent = this.publishBox;
        let $input = $(parent).find('textarea');
        let val = $.trim($input.val());
        let publishData = $.extend({}, {text: val}, this.state.publishData);
        if(el.ajaxing || !val || this.strLen(val) > this.state.maxLen){
            return;
        }
        el.ajaxing = true;

        $.ajax({
            url: this.state.publishUrl,
            data: publishData,
            type: 'post',
            dataType: 'json',
            context: this
        }).then(ret => {
            //首页的灌水，只显示四条，所以多于四条的时候要做下处理
            if(this.state.showListNum && this.state.listData.length > this.state.showListNum - 1){
                this.state.listData.pop();
            }
            var listData = this.state.reversed
                    ? [ret.data].concat(this.state.listData)
                    : this.state.listData.concat([ret.data]);
            //增加评论和评论数
            this.setState({
                listData: listData,
                commentLen: ++this.state.commentLen
            });
            //删除输入框中已发布的内容
            $input.val('');
            this.setState({maxLen: this.state.maxLen});
            el.ajaxing = false;
        });
    }
    enterKeyPublish(e){
        if(e.keyCode === 13 && e.ctrlKey){
            this.publish(e);
            e.preventDefault();
        }
    }
    strLen(str){
        let reg = /[\u0100-\uFFFF]/ig;
        return Math.round(str.replace(reg, 'ab').length/2);
    }
};


