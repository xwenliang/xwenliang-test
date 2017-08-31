import React from 'react';
import { convertDate } from '../../vendor/util/util';

/* @for node reason this cannot be import
 * @import '../../css/common.less';
 * @import './listItem.less';
 */

export default class ListItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: convertDate(props.data.date),
            ...props
        };
    }
    render(){
        let data = this.state.data;
        return (
            <div className="box item">
                <h2 className="title">
                    <a href={data.href}>{data.title}</a>
                </h2>
                <div
                    className="date"
                    onClick={this.showDate.bind(this)}
                >
                    {this.state.date}
                </div>
                <div className="cont" dangerouslySetInnerHTML={{__html: data.content}}></div>
                <div className="box-foot ib-wrap">
                    <a className="category" href="" title="">{data.category}</a>
                    <span className="i-eye"> {data.pageviews}</span>
                    <span className="i-comment"> {data.comments.length}</span>
                    <span className="i-heart"> {data.like.length}</span>
                </div>
            </div>
        );
    }
    componentWillReceiveProps(props){
        this.setState({
            ...props
        });
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
};