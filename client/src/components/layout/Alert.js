import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div key={ alert.id } className={`alert alert-${alert.alertType}`}>
        { alert.alertMessage }
    </div>
));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

/* Mapping Redux State To Component */
const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
