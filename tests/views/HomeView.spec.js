import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
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
  let component, rendered, props, spies;

  beforeEach(function () {
    spies = {};
    props = {
      sheets: [],
      ...bindActionCreators({
        doubleAsync: (spies.doubleAsync = sinon.spy()),
        sheetsAdd: (spies.sheetsAdd = sinon.spy())
      }, spies.dispatch = sinon.spy())
    };
    component = shallowRenderWithProps(props);
    rendered = renderWithProps(props);
  });

  it('Should render as a <div>.', function () {
    expect(component.type).to.equal('div');
  });

  it('Should include an <h1> with welcome text.', function () {
    const h1 = TestUtils.findRenderedDOMComponentWithTag(rendered, 'h1');
    expect(h1).to.exist;
    expect(h1.textContent).to.match(/Welcome to Expense Tracker/);
  });

  describe('Add new sheet component', function () {
    it('Should render an input box with a button', function () {
      const input = TestUtils.findRenderedDOMComponentWithClass(rendered, 'add-sheet-input');
      expect(input).to.exist;
      expect(input.placeholder).to.match(/Insert a new sheet name.../);
    });

    it('should dispatch an action when clicked.', function () {
      const input = TestUtils.findRenderedDOMComponentWithClass(rendered, 'add-sheet-input');
      const btn = TestUtils.findRenderedDOMComponentWithClass(rendered, 'add-sheet-btn');
      TestUtils.Simulate.change(input, { target: { value: 'foo' } });
      TestUtils.Simulate.click(btn);
      spies.dispatch.should.have.been.called;
      spies.sheetsAdd.should.have.been.called;
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

      expect(list).to.exist;
      expect(items.length).to.equal(2);
      expect(items[0].textContent).to.equal('foo');
    });
  });
});

