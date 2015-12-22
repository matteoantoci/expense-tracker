import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    sheets: React.PropTypes.array
  },

  render: function () {
    return (
      <div className='list-group text-left sheets-list'>
        {this.props.sheets.map(function (item) {
          return <Link to='#' className='list-group-item' key={item.id}>{item.title}</Link>;
        })}
      </div>
    );
  }
});
