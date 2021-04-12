import React, { Component } from 'react'
import EmailService from "../../services/email.service";
import {toast} from "react-toastify";

class EmailComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            emails: [],
            currentPage: 1,
        }
    }

    componentDidMount(){
        this.findAllEmails(this.state.currentPage);
    }

    findAllEmails(currentPage){
        currentPage -= 1;
        EmailService.getEmailHistory(currentPage).then((response) => {
            let data = response.data;
            this.setState({
                emails: data.emailHistory,
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.currentPage + 1
            })
        });
    }

    resendEmail(id){
        EmailService.resendEmail(id).then(res => { toast('Sent');});
    }

    render() {
        return(
            <div>
                <h2 className="text-center">Emails</h2>
                <br></br>
                <table className = "table table-striped">
                    <thead>
                    <tr>
                        <th> Order ID</th>
                        <th> Recipient</th>
                        <th> Email Type</th>
                        <th> Resend</th>
                    </tr>

                    </thead>
                    <tbody>
                    {this.state.emails.map( email =>
                        <tr key = {email.id}>
                            <td> {email.orderId}</td>
                            <td> {email.buyer}</td>
                            <td> {email.emailType}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => this.resendEmail(email.id)} disabled={email.availableToResend}>Resend</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div className="text-center">
                    <button className=" btn btn-outline-info" disabled={this.state.currentPage === 1 ? true : false}
                            onClick={() => this.findAllEmails(this.state.currentPage - 1)}> Prev </button>
                    <button className="btn btn-outline-info" disabled={this.state.currentPage === this.state.totalPages ? true : false}
                            onClick={() => this.findAllEmails(this.state.currentPage + 1)}> Next </button>
                    <p>Page {this.state.currentPage} of {this.state.totalPages}</p>
                </div>
            </div>
        );
    }
}

export default EmailComponent;