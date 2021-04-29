import React, { Component } from 'react'
import ReadReturnService from '../../../services/readreturn.service';
import {toast} from "react-toastify";

class ReadReturnSubscribeEmailRemindingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        }
        this.updateEmailReminding= this.updateEmailReminding.bind(this);
    }

    onChange = (e) => {
        this.setState({emailReminding: e.target.value});
    }

    updateEmailReminding = (e) => {
        e.preventDefault();
        let emailReminding = {emailReminding: true};
        let id = this.state.id;
        ReadReturnService.updateEmailReminding(id, emailReminding).then( res => {
            toast("Subscribed!")
            this.props.history.push('/read-and-return-book-catalog');
        });
    }

    cancel(){
        this.props.history.push('/read-and-return-book-catalog');
    }

    render() {
        return (
            <div>
                <div className = "card w-50">
                    <h3 className="text-center">Reminder subscribing</h3>
                    <div className = "card-body">
                        <p>Subscribe to the email reminder about the end date of the rent?</p>
                        <button className="btn btn-outline-danger" onClick={this.cancel.bind(this)}>Cancel</button>
                        <button className="btn btn-success float-right" onClick={this.updateEmailReminding}>Subscribe</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReadReturnSubscribeEmailRemindingComponent