import React, { Component } from 'react'
import OrderService from '../../services/order.service';

class DownloadEOrderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.match.params.code
        }
    }

    componentDidMount() {
        OrderService.downloadEOrder(this.state.code).then(response =>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'GoldenBook.txt');
            document.body.appendChild(link);
            link.click();
        });
    }

    render() {
        return (
            <div className="text-center">
                If E-Book didn`t download contact as via email goldenbook@gmail.com
            </div>
        )
    }
}

export default DownloadEOrderComponent