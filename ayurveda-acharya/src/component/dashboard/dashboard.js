import React, { Component } from 'react';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    changePage = () => {
        this.props.change(0);
    }
    addNewData = () => {
        this.props.change(3);
    }

    componentDidMount() {
        this.loadTableData();
    }

    loadTableData = () => {
        fetch('http://localhost:8080/site/loadDetails/')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    //isLoading: false,
                    dashbordTableJsonData: responseJson,
                    dataSource: responseJson.hasOwnProperty(this.props.data.aadharNo),
                }, () => {
                    console.log(responseJson[this.props.data.aadharNo]);
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
                <div> THis is the Dashboard</div>
                <div>{`Welcome ${data.firstName} ${data.lastName}`}</div>
                <button onClick={this.changePage}>Logout</button >
                <button onClick={this.addNewData}>Add New Data</button >
            </div>
        )
    }

}

export default Dashboard;
