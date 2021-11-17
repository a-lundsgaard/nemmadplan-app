import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/App';

import TestMe from './testme';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TestMe />, div);
  ReactDOM.unmountComponentAtNode(div);
});
