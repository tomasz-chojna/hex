import React, { Component } from "react";
import {gql, graphql, compose} from 'react-apollo';
import {Redirect} from "react-router-dom";


class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { userName: '', redirectToNextState: false };
        this.login = this.login.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    login(e) {
        this.props.mutate({ variables: { name: this.state.userName } });
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
            <div>
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
            </div>
        );
    }
}


const createPlayer = gql`
  mutation createPlayer($name: String!) {
    createPlayer(name: $name) {
      id
      name
      availabilityStatus
    }
  }
`;


export const LoginComponentWithCreatingPlayer = compose(
    graphql(createPlayer),
)(LoginComponent);
