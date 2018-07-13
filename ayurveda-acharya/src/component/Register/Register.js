import React, { Component } from 'react';
import Config from '../../config/app.config.json';

class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataSource: false,
			loginJsonData: {},
			checkAadharValue: '',
			checkFirstNameValue: '',
			checkLastNameValue: '',
			checkPhoneNoValue: '',
			checkEmailValue: '',
		}

		this.aadhar = React.createRef();
		this.firstname = React.createRef();
		this.lastname = React.createRef();
		this.phone = React.createRef();
		this.email = React.createRef();
	}

	checkData = () => {
		const { checkAadharValue, checkFirstNameValue, checkLastNameValue, checkPhoneNoValue, checkEmailValue } = this.state;
		let noerror = true

		if (!checkAadharValue || !checkFirstNameValue || !checkLastNameValue || !checkPhoneNoValue || !checkEmailValue){
				noerror = false;
		} else if (checkAadharValue.trim() === '' || checkFirstNameValue.trim() === '' || checkLastNameValue.trim() === '' || checkPhoneNoValue.trim() === '' || checkEmailValue.trim() === '') {
				noerror = false;
		}

		if (noerror) {
				this.checkExistingUser();
		}
	}

	resetFormData = () => {
		this.setState = ({
			checkAadharValue: '',
			checkFirstNameValue: '',
			checkLastNameValue: '',
			checkPhoneNoValue: '',
			checkEmailValue: '',
		});

		this.aadhar.current.value = '';
		this.firstname.current.value = '';
		this.lastname.current.value = '';
		this.phone.current.value = '';
		this.email.current.value = '';
	}

	formatData = ( { checkAadharValue, checkFirstNameValue, checkLastNameValue, checkPhoneNoValue, checkEmailValue } ) => {
		const entry = {};
		// const time = new Date().getTime();

		if (!entry.hasOwnProperty(checkAadharValue)) {
			entry[checkAadharValue] = {};
		}

		entry[checkAadharValue]['aadharNo'] = checkAadharValue
		entry[checkAadharValue]['firstName'] = checkFirstNameValue
		entry[checkAadharValue]['lastName'] = checkLastNameValue
		entry[checkAadharValue]['phNo'] = checkPhoneNoValue
		entry[checkAadharValue]['email'] = checkEmailValue
		
		return entry;
	}   

	checkExistingUser = () => {
		fetch(Config.url + 'checkAadhar')
			.then((response) => response.json())
			.then((responseJson) => {
					console.log(responseJson.hasOwnProperty(this.state.checkAadharValue));
					this.setState({
							loginJsonData: responseJson,
							dataSource: responseJson.hasOwnProperty(this.state.checkAadharValue),
					}, () => {
							if (this.state.dataSource) {
								this.resetFormData();
								alert("User Already Exits");
							} else {
								this.saveNewEntry(this.formatData(this.state));
							}
					});
			})
			.catch((error) => {
					console.error(error);
			});
	}

	saveNewEntry = (data) => {
		const newData =  Object.assign({}, this.state.loginJsonData, data);
		fetch(Config.url + 'saveAadhar/', {
			method: 'POST', // or 'PUT'
			mode: 'cors',
			body: JSON.stringify(newData, null, 2), // data can be `string` or {object}!
			headers: new Headers({
					'Content-Type': 'application/json',
					'Access-Control-Allow-Headers': '*'
			})
		}).then(res => res.json())
			.catch(error => {
				alert('Some error Occured');
				this.resetFormData();
				console.error('Error:', error)
			})
			.then(response => {
				alert('New User Created');
				this.resetFormData();
				console.log('Success:', response);
				this.props.change(0, data);
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
				<table cellSpacing='0' cellPadding='5'>
					<tbody>
						<tr>
							<td>Aadhar No: </td>
							<td><input ref={this.aadhar} type="text" onChange={this.checkAadhar} placeholder="Please Enter Aadhar No" /></td>
						</tr>
						<tr>
							<td>First Name: </td>
							<td><input ref={this.firstname} type="text" onChange={this.checkFirstName} placeholder="Please Enter First Name" /></td>
						</tr>
						<tr>
							<td>Last Name: </td>
							<td><input ref={this.lastname} type="text" onChange={this.checkLastName} placeholder="Please Enter Last Name" /></td>
						</tr>
						<tr>
							<td>Phone No: </td>
							<td><input ref={this.phone} type="text" onChange={this.checkPhoneNo} placeholder="Please Enter Phone No" /></td>
						</tr>
						<tr>
							<td>Email Id: </td>
							<td><input ref={this.email} type="text" onChange={this.checkEmail} placeholder="Please Enter Email Id" /></td>
						</tr>
					</tbody>
				</table>
					<div>&nbsp;</div>
					<button onClick={this.checkData}>Submit</button >
			</div>
		)
	}
}

export default Register;
