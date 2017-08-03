import React from 'react';
import ReactDOM from 'react-dom';
import '../../../css/common.less';
import './listItem.less';

export default class ListItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: this.convertDate(props.data.date),
            ...props
        };
    }
    componentWillReceiveProps(props){
        this.setState({
            ...props
        });
    }
    render(){
        let data = this.state.data;
        return (
            <div className="box item">
                <h2 className="title">
                    <a href="">{data.title}</a>
                </h2>
                <div
                    className="date"
                    onClick={this.showDate.bind(this)}
                >
                    {this.state.date}
                </div>
                <div className="cont">{data.content}</div>
                <div className="box-foot ib-wrap">
                    <a className="category" href="" title="">{data.category}</a>
                    <span className="i-eye"> {data.pageviews}</span>
                    <span className="i-comment"> {data.comments.length}</span>
                    <span className="i-heart"> {data.like.length}</span>
                </div>
            </div>
        );
    }
    // componentDidMount(){
    //     var el = ReactDOM.findDOMNode(this.dateDom);
    //     el.setAttribute('date', this.state.data.date);
    // }
    showDate(){
        this.setState({
            date: this.state.data.date
        });
    }
    convertDate(date){
        let diff = new Date().getTime() - new Date(date).getTime();
        let time = '';
        //小于5分钟->刚刚
        if(diff < 5*60*1000){
            time = '刚刚';
        }
        //小于1小时->xx分钟前
        else if(diff < 1*60*60*1000){
            time = parseInt(diff/1000/60) + '分钟前';
        }
        //小于24小时->xx小时前
        else if(diff < 24*60*60*1000){
            time = parseInt(diff/1000/60/60) + '小时前';
        }
        //小于30天->xx天前
        else if(diff < 30*24*60*60*1000){
            time = parseInt(diff/1000/60/60/24) < 2 ? '昨天' : (parseInt(diff/1000/60/60/24) + '天前');
        }
        //小于1年->xx个月前
        else if(diff < 365*24*60*60*1000){
            time = parseInt(diff/1000/60/60/24/30) + '个月前';
        }
        //x年x月前
        else{
            let days = parseInt(diff/1000/60/60/24);
            time = parseInt(days/365) + '年' + (parseInt(days%365/30) ? (parseInt(days%365/30) + '个月前') : '前');
        }
        return time;
    }
};