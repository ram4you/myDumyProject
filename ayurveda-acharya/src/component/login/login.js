import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: false,
            checkAadharValue: ''
        }
        //this.state ={ isLoading: true}
    }
    changePage = () => {
        fetch('http://localhost:8080/site/checkAadhar/')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                //isLoading: false,
                loginJsonData: responseJson,    
                dataSource: responseJson.hasOwnProperty(this.state.checkAadharValue),
                data: responseJson.hasOwnProperty(this.state.checkAadharValue) ?  responseJson[this.state.checkAadharValue] : {}
            }, ()=>{
                this.state.dataSource ? this.props.change(2, this.state.data) : alert("please Register");
            });

        })
        .catch((error) => {
            console.error(error);
        });
        
    }
    registerPage = () => {

        this.props.change(1);
    }
    checkAadhar = (event) => {
        this.setState({
            checkAadharValue: event.target.value
        })
    }

    render() {
        const { dataSource } = this.state;
        return (
            <div>
                <div> The value is {dataSource.toString()} </div>
                <div>
                    <label>Aadhar No :</label>
                    <input type="text" onChange={this.checkAadhar} placeholder="Please Enter Aadhar No" />
                </div>
                <button onClick={this.changePage}>Search</button >
                <button onClick={this.registerPage}>Register</button >
            </div>
        )
    }

}

export default Login;
