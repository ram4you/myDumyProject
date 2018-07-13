import React, { Component } from 'react';
import Config from '../../config/app.config.json';
import './style.css';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		}
	}

	changePage = () => {
		this.props.change(0);
	}

	addNewData = () => {
		this.props.change(3, {
			login: this.props.data, 
			records: this.state.dashbordTableJsonData
		});
	}

	componentDidMount() {
		this.loadTableData();
	}

	generateTable = (entries) => {
		return (
			<table cellSpacing="0" cellPadding="0" className='table'>
				<tbody>
					<tr><th>Time Stamp</th><th>Date & Time (dd/mm/yy, hh:mm:ss)</th><th>Height (cm)</th><th>Weight (kg)</th><th>BP Low</th><th>BP High</th></tr>
					{
						entries.map((item, key) => (
							<tr key = {`table_row_${key}`}>
								<td>{ item.ts }</td>
								<td>{ item.date }</td>
								<td>{ item.height }</td>
								<td>{ item.weight }</td>
								<td>{ item.bpLow }</td>
								<td>{ item.bpHigh }</td>
							</tr>
						))
					}
				</tbody>
			</table>
		)
	}

	loadTableData = () => {
		fetch(Config.url+'loadDetails')
			.then((response) => response.json())
			.then((responseJson) => {
				// console.log(responseJson);
				this.setState({
					//isLoading: false,
					dashbordTableJsonData: responseJson,
					dataSource: responseJson.hasOwnProperty(this.props.data.aadharNo),
					data: responseJson[this.props.data.aadharNo]
				}, () => {
					// console.log(responseJson[this.props.data.aadharNo]);
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		const { data } = this.props;
		return (
			<div>
				<div>{`Welcome, ${data.firstName} ${data.lastName}`}</div>
				<div className='tablediv'>
				{ this.state.data ? this.generateTable( this.state.data ) : 'No Data!!' }
				</div>
				<button onClick={this.changePage}>Logout</button>&nbsp;<button onClick={this.addNewData}>Add New Data</button >
			</div>
		)
	}

}

export default Dashboard;
