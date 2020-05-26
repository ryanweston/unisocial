import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


//Passing in props that have been mapped to the global redux state, specifically the alert
const Alert = ({ alerts }) => {
    return (
        //Checks against alerts array containing at least one index
        alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => (
            //Set alert DOM
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                {alert.msg}
            </div>
        ))
    )
}
Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);