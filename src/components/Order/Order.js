import React from 'react';

import classes from './Order.css';

const order = props => {
  return (
    <div className={classes.Order}>
      <p>
        Ingredients:{' '}
        {Object.keys(props.ingredients).map(ingredient => {
          var lower = `${ingredient} (${props.ingredients[ingredient]})`;
          return (
            <span
              style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px',
              }}
              key={ingredient}
            >
              {lower}
            </span>
          );
        })}
      </p>
      <p>
        Price: <strong>USD {(+props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
