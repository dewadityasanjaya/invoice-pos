import React from 'react';
import '../../styles/Card.css';

const Card = ({ title, children, footer }) => {
  return (
    <div className='card'>
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
      </div>
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
