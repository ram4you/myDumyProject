import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: false,
            checkAadharValue: '',
            checkFirstNameValue: '',
            checkLastNameValue: '',
            checkPhoneNoValue: '',
            checkEmailValue: '',
        }
        //this.state ={ isLoading: true}
    }
    changePage = () => {
        fetch('http://localhost:8080/site/checkAadhar/')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.hasOwnProperty(this.state.checkAadharValue));
                this.setState({
                    //isLoading: false,
                    loginJsonData: responseJson,
                    dataSource: responseJson.hasOwnProperty(this.state.checkAadharValue),
                }, () => {
                    this.state.dataSource ? alert("please add new aadhar Register") : this.props.change(0);
                });

            })
            .catch((error) => {
                console.error(error);
            });

    }
    checkAadhar = (event) => {
        this.setState({
            checkAadharValue: event.target.value
        })
    }
    checkFirstName = (event) => {
        this.setState({
            checkFirstNameValue: event.target.value
        })
    }
    checkLastName = (event) => {
        this.setState({
            checkLastNameValue: event.target.value
        })
    }
    checkPhoneNo = (event) => {
        this.setState({
            checkPhoneNoValue: event.target.value
        })
    }
    checkEmail = (event) => {
        this.setState({
            checkEmailValue: event.target.value
        })
    }
    render() {
        return (
            <div>
                <div>
                    <label>Aadhar No :</label>
                    <input type="text" onChange={this.checkAadhar} placeholder="Please Enter Aadhar No" />
                </div>
                <div>
                    <label>First Name :</label>
                    <input type="text" onChange={this.checkFirstName} placeholder="Please Enter First Name" />
                </div>
                <div>
                    <label>Last Name :</label>
                    <input type="text" onChange={this.checkLastName} placeholder="Please Enter Last Name" />
                </div>
                <div>
                    <label>Phone No :</label>
                    <input type="text" onChange={this.checkPhoneNo} placeholder="Please Enter Phone No" />
                </div>
                <div>
                    <label>Email Id :</label>
                    <input type="text" onChange={this.checkEmail} placeholder="Please Enter Email Id" />
                </div>
                <button onClick={this.changePage}>Submit</button >

            </div>
        )
    }

}

export default Register;
