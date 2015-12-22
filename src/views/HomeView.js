import React from 'react';
import { connect } from 'react-redux';
import { actions as sheetsActions } from '../redux/modules/sheets';
// import styles from './HomeView.scss';
import SheetsList from '../components/SheetsList';

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  sheets: state.sheets
});

export class HomeView extends React.Component {
  static propTypes = {
    sheetsAdd: React.PropTypes.func.isRequired,
    sheets: React.PropTypes.array
  };

  handleAddSheet () {
    var sheetName = this.refs.sheetName.value;
    this.props.sheetsAdd(sheetName);
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>Welcome to Expense Tracker</h1>

        <div className='input-group input-group-lg'>
          <input type='text' ref='sheetName'
                 className='form-control add-sheet-input'
                 aria-label='Add sheet'
                 placeholder='Insert a new sheet name...'/>

          <div className='input-group-btn'>
            <button className='btn btn-default add-sheet-btn' type='button' onClick={this.handleAddSheet.bind(this)}>
              <span className='glyphicon glyphicon-plus'></span>
            </button>
          </div>
        </div>

        <hr />

        <SheetsList sheets={this.props.sheets}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, sheetsActions)(HomeView);
