import React, { Component } from 'react'
import ReportService from '../../services/report.service';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class ReportComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            startDate: '',
            endDate: ''
        }
        this.generateReport = this.generateReport.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    }

    handleChangeStartDate(date) {
        this.setState({startDate: date })
    }
    handleChangeEndDate(date) {
        this.setState({ endDate: date })
    }

    generateReport = (e) => {
        e.preventDefault();

        let reportRequest = {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        }

        ReportService.generateReport(reportRequest).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'GoldenBookReport.pdf');
            document.body.appendChild(link);
            link.click();
        });
    };

    render() {
        return(
            <div>
                <h2 className="text-center">Generate report</h2>
                <div>
                    <div className="form-group w-75">
                        <label>From date:</label>
                        <DatePicker selected={ this.state.startDate } onChange={ this.handleChangeStartDate } dateFormat="MMMM d, yyyy"/>
                    </div>
                    <div className="form-group w-75">
                        <label>To date:</label>
                        <DatePicker selected={ this.state.endDate } onChange={ this.handleChangeEndDate } dateFormat="MMMM d, yyyy"/>
                    </div>
                </div>
                <button className="btn btn-success" onClick={this.generateReport}>Generate report</button>
            </div>
        );
    }
}

export default ReportComponent;