import expect from 'must';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
// import { bindActionCreators } from 'redux';
import { HomeView } from 'views/HomeView';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<HomeView {...props} />);
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<HomeView {...props} />);
}

describe('(View) Home', function () {
  let component, rendered, props;

  beforeEach(function () {
    props = {
      /*
      sheets: [],
      ...bindActionCreators({
        doubleAsync: (spies.doubleAsync = sinon.spy()),
        sheetsAdd: (spies.sheetsAdd = sinon.spy())
      }, spies.dispatch = sinon.spy())
      */
      sheets: [],
      doubleAsync: sinon.spy(),
      sheetsAdd: sinon.spy()
    };
    component = shallowRenderWithProps(props);
    rendered = renderWithProps(props);
  });

  it('Should render as a <div>.', function () {
    expect(component.type).to.equal('div');
  });

  it('Should include a welcome text.', function () {
    const h1 = TestUtils.findRenderedDOMComponentWithTag(rendered, 'h1');
    expect(h1).to.exist();
    expect(h1.textContent).to.match(/Welcome to Expense Tracker/);
  });

  describe('Add new sheet component', function () {
    let input;
    beforeEach(function () {
      input = TestUtils.findRenderedDOMComponentWithClass(rendered, 'add-sheet-input');
    });

    it('Should render an input box with a button', function () {
      const input = TestUtils.findRenderedDOMComponentWithClass(rendered, 'add-sheet-input');
      expect(input).to.exist();
      expect(input.placeholder).to.equal('Insert a new sheet name...');
    });

    it('should dispatch an action when clicked', function () {
      input.value = 'foo';
      const btn = TestUtils.findRenderedDOMComponentWithClass(rendered, 'add-sheet-btn');
      TestUtils.Simulate.click(btn);
      // spies.dispatch.should.have.been.called;
      expect(props.sheetsAdd.callCount).to.equal(1);
      expect(props.sheetsAdd.calledWith('foo')).to.equal(true);
    });
  });

  describe('Expense sheets list', function () {
    it('should be rendered', function () {
      const renderedList = renderWithProps({
        ...props,
        sheets: [
          {
            id: 123,
            title: 'foo'
          },
          {
            id: 456,
            title: 'bar'
          }
        ]
      });

      const list = TestUtils.findRenderedDOMComponentWithClass(renderedList, 'sheets-list');
      const items = TestUtils.scryRenderedDOMComponentsWithClass(renderedList, 'list-group-item');

      expect(list).to.exist();
      expect(items.length).to.equal(2);
      expect(items[0].textContent).to.equal('foo');
    });
  });
});

