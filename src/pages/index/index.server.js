import React from 'react';

export default class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            articalList: [],
            commentList: [],
            ...props
        };
    }

    render(){
        return (
            <div>
                <Head/>
                <div className="page-index wrap fix">
                    <div className="artical">
                        {this.state.articalList.map((li, key) => <ListItem key={key} data={li} />)}
                    </div>
                    <div className="right">
                        <div className="water box">
                            <Comment
                                className="index-comment"
                                title="灌水"
                                //输入框最多允许输入70字符
                                maxLen="70"
                                //只显示前4条数据
                                showListNum="4"
                                //更多数据的页面地址
                                getMoreUrl={routers.water}
                                //发布数据的地址
                                publishUrl={apis.postWater}
                                //初始数据
                                listData={this.state.commentList}
                                reversed={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        //列表数据
        // $.ajax({
        //     url: apis.getPosts,
        //     type: 'get'
        // }).then(res => {
        //     this.setState({
        //         articalList: res.data.posts
        //     });
        // });
        // //首页灌水数据
        // $.ajax({
        //     url: apis.getWater,
        //     type: 'get',
        //     data: {
        //         len: 4
        //     }
        // }).then(res => {
        //     this.setState({
        //         commentList: res.data.list
        //     });
        // });
    }

    componentWillReceiveProps(){}

    shouldComponentUpdate(){
        return true;
    }

    componentWillUpdate(){}

    componentDidUpdate(){}
};