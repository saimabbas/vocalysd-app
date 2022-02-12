import React, { FunctionComponent, ComponentType } from 'react';
import PropTypes from 'prop-types';
import './LeftMenuItem.css'

const LeftMenuItem: FunctionComponent<{
  text: string;
  children: any
}> = ({
  children, text
}) => {
    return (
      <div className="LeftMenuItem">
        {children}
        <span>{text}</span>
      </div>
    );
  }

LeftMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
}

export default LeftMenuItem;
