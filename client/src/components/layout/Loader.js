/* Required Dependencies */
import React, { Fragment } from 'react';
import Loading from '../../img/icons/dancing_balls_loader.gif';

export default () => (
    <Fragment>
        <img src={Loading} style={{ width: '100px', margin: 'auto', display: 'block' }} alt='Loading..' />
    </Fragment>
);