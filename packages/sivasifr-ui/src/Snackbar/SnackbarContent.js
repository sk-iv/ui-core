// @inheritedComponent Paper

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Paper from '../Paper';

/*
 * Import Typography from '../Typography';
 * Import { emphasize } from '../styles/colorManipulator';
 */
if (process.env.WEBPACK) {
  require('./SnackbarContent.module.css');
}

function SnackbarContent(props) {
  const {
    action, classes, className, message, ...other
  } = props;

  return (
    <Paper
      className={classNames('snackbar-content', className)}
      elevation={6}
      role="alertdialog"
      square
      {...other}
    >
      <div className="snackbar-content--message">
        {message}
      </div>
      {action ? (
        <div className="snackbar-content--action">
          {action}
        </div>
      ) : null}
    </Paper>
  );
}

SnackbarContent.propTypes = {

  /**
     * The action to display.
     */
  action: PropTypes.node,

  /**
     * Useful to extend the style applied to components.
     */
  // Classes: PropTypes.object.isRequired,
  /**
     * @ignore
     */
  className: PropTypes.string,

  /**
     * The message to display.
     */
  message: PropTypes.node,
};

export default SnackbarContent;
