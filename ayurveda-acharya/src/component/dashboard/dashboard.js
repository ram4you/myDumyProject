import React, { Component } from 'react';

class Dashboard extends Component {
    changePage = () => {
        this.props.change(0);
    }
    addNewData = () => {
        this.props.change(3);
    }
    render() {
        return (
            <div>
                <div> THis is the Dashboard</div>

                <button onClick={this.changePage}>Logout</button >
                <button onClick={this.addNewData}>Add New Data</button >
            </div>
        )
    }

}

export default Dashboard;
