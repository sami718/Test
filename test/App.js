import React from 'react';

import _Input from './src/components/Input/_Input';
import RootNavigator from './src/navigators/_RootNav';
import NavService from './src/navigators/navigationService'

function App() {
  return <RootNavigator ref={navRef => NavService.setNavigator(navRef, 'root')} />;
}

export default App;
