import React, { Component } from 'react';

class UserBasicDetails extends Component {

    changePage = () => {
        this.props.change(2);
    }

    render() {
        return (
            <div>
                <div> THis is the User Basic Info</div>
                <div>
                    <label>Date :</label>
                    <input type="text" placeholder="Please Enter Aadhar No" />
                </div>
                <div>
                    <label>Height :</label>
                    <input type="text" placeholder="Please Enter Height" />
                </div>
                <div>
                    <label>Weight :</label>
                    <input type="text" placeholder="Please Enter Weight" />
                </div>
                <div>
                    <label>BP :</label>
                    <input type="text" placeholder="Please Enter low BP" />
                    <input type="text" placeholder="Please Enter high BP" />
                </div>
                <button onClick={this.changePage}>Submit</button >

            </div>
        )
    }

}

export default UserBasicDetails;
