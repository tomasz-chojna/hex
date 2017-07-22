import * as React from "react";
import {Redirect} from "react-router-dom";


export class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userName: '', redirectToNextState: false };
        this.login = this.login.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    login(e) {
        this.setState({redirectToNextState: true});
        e.preventDefault();
    }

    onInputChange(event) {
        this.setState({ userName: event.target.value });
    }

    renderSubmitButton() {
        const styles = { width: '100%' };

        if (this.state.name !== '') {
            return <button type="submit" className="btn btn-default" onClick={this.login} style={styles}>Start playing</button>
        }

        return <button type="submit" className="btn btn-default" disabled="true" style={styles}>Start playing</button>
    }

    render() {
        if (this.state.redirectToNextState) {
            return <Redirect to={this.props.nextState}/>
        }

        return (
            <form>
                <h1 className="text-center">Login</h1>

                <div className="form-group">
                    <input
                        id="userName"
                        type="text"
                        className="form-control text-center"
                        onChange={this.onInputChange}
                        value={this.state.userName}
                        placeholder="Your name"/>
                </div>
                {this.renderSubmitButton()}
            </form>
        );
    }
}