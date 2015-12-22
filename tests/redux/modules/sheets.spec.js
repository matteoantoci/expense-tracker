import expect from 'must';
import {sheetsAdd, default as reducers} from 'redux/modules/sheets';

describe('(Module) Sheets', () => {
  it('should add a new sheet', () => {
    const initialState = [];
    const actualState = reducers(initialState, sheetsAdd('foo'));
    const expectedState = [{
      id: 1,
      title: 'foo'
    }];
    expect(actualState).to.eql(expectedState);
  });

  it('should increment correctly sheets ids', () => {
    const initialState = [{
      id: 3,
      title: 'foo'
    }];
    const actualState = reducers(initialState, sheetsAdd('bar'));
    const expectedState = initialState.concat({
      id: 4,
      title: 'bar'
    });
    expect(actualState).to.eql(expectedState);
  });
});
