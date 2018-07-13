import React, { Component } from 'react';
import Config from '../../config/app.config.json';

class UserBasicDetails extends Component {

	constructor (props) {
		super(props);
		this.state = {
			todayDate: new Date().getTime()
		};

		this.height = React.createRef();
		this.weight = React.createRef();
		this.bpLow = React.createRef();
		this.bpHigh = React.createRef();

		this.feilds = {
			HEIGHT: 'height',
			WEIGHT: 'weight',
			BPLOW: 'bplow',
			BPHIGH: 'bphigh'
		}

		console.log(props);
	}

	componentDidMount () {

	}

	changePage = () => {
		this.props.change(2);
	}

	saveToState = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	resetFormData = () => {
		this.height.current.value = '';
		this.weight.current.value = '';
		this.bpLow.current.value = '';
		this.bpHigh.current.value = '';
	}

	checkData = () => {
		const { todayDate, height, weight, bplow, bphigh } = this.state;
		let noerror = true

		if (!todayDate || !height || !weight || !bplow || !bphigh){
				noerror = false;
		} else if (todayDate === '' || height.trim() === '' || weight.trim() === '' || bplow.trim() === '' || bphigh.trim() === '') {
				noerror = false;
		}

		if (noerror) {
				this.checkExistingUser();
		}
	}

	localDate = (d) => {
		return new Date(d).toLocaleString('en-IN');
	}

	checkExistingUser = () => {
		const { todayDate, height, weight, bplow, bphigh } = this.state;
		const aadharNo = this.props.data.login.aadharNo;
		const records = this.props.data.records

		if (!records.hasOwnProperty(aadharNo)) {
			records[aadharNo] = [];
		}

		records[aadharNo].push({
			"ts": todayDate,
			"date": this.localDate(todayDate),
			"height": height,
			"weight": weight,
			"bpLow": bplow,
			"bpHigh": bphigh
		})

		this.sendData(records);
	}

	sendData = (records) => {
		fetch(Config.url + 'saveRecord/', {
			method: 'POST', // or 'PUT'
			mode: 'cors',
			body: JSON.stringify(records, null, 2), // data can be `string` or {object}!
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
				alert('New data added');
				this.resetFormData();
				console.log('Success:', response);
				this.props.change(2, this.props.data.login);
			});
	}

	saveData = () => {
		this.checkData();
	}

	render() {
		return (
			<div>
				<div>Please enter the patient details for, {`${this.props.data.login.firstName} ${this.props.data.login.lastName}`}</div>
				<br />
				<table border='0' cellSpacing='0' cellPadding='5'>
					<tbody>
						<tr>
							<td>Date (dd/mm/yy): </td>
							<td>{ this.localDate(this.state.todayDate) }</td>
						</tr>
						<tr>
							<td>Height (cm): </td>
							<td><input ref = {this.height} onChange={this.saveToState} name={this.feilds.HEIGHT} type="text" placeholder="Please Enter Height" /></td>
						</tr>
						<tr>
							<td>Weight (kg): </td>
							<td><input ref = {this.weight} onChange={this.saveToState} name={this.feilds.WEIGHT} type="text" placeholder="Please Enter Weight" /></td>
						</tr>
						<tr>
							<td>BP Low: </td>
							<td><input ref = {this.bpLow} onChange={this.saveToState} name={this.feilds.BPLOW} type="text" placeholder="Please Enter low BP" /></td>
						</tr>
						<tr>
							<td>BP High: </td>
							<td><input ref = {this.bpHigh} onChange={this.saveToState} name={this.feilds.BPHIGH} type="text" placeholder="Please Enter low High" /></td>
						</tr>
					</tbody>
				</table>
				<br />
				<button onClick={this.saveData}>Submit</button >
			</div>
		)
	}

}

export default UserBasicDetails;
