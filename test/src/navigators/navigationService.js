import { NavigationActions, StackActions } from '@react-navigation/native';

let _navigators = {
  root: undefined,
  tabs: undefined,
  dashboard: undefined,
  profile: undefined,
};

function setNavigator(navigatorRef, navigatorName) {
  if (!_navigators.hasOwnProperty(navigatorName)) {
    // console.warn('Could not find navigator: "' + navigatorName + '". Be sure to define the navigator property in navigationService.js');
    return;
  }
  _navigators[navigatorName] = navigatorRef;
}

function getNavigator(navigatorName) {
  if (!_navigators.hasOwnProperty(navigatorName)) {
    // console.warn('Could not find navigator: "' + navigatorName + '". Be sure to define the navigator property in navigationService.js');
    return;
  }
  return _navigators[navigatorName] ?._navigation;
}

function navigate(navigatorName, routeName, params) {
  if (!_navigators.hasOwnProperty(navigatorName)) {
    // console.warn('Could not find navigator:', navigatorName);
    return;
  }

  _navigators[navigatorName].dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function goBack(navigatorName) {
  if (!_navigators.hasOwnProperty(navigatorName)) {
    // console.warn('Could not find navigator:', navigatorName);
    return;
  }

  _navigators[navigatorName].dispatch(StackActions.pop());
}

function reset(navigatorName) {
  if (!_navigators.hasOwnProperty(navigatorName)) {
    // console.warn('Could not find navigator:', navigatorName);
    return;
  }

  _navigators[navigatorName].dispatch(StackActions.popToTop());
}

function routesCountOf(navigatorName) {
  if (!_navigators.hasOwnProperty(navigatorName)) {
    // console.warn('Could not find navigator:', navigatorName);
    return;
  }

  return _navigators[navigatorName]?.state?.nav?.routes?.length || 0;
}

function currentRouteOf(navigatorName) {
  if (!_navigators.hasOwnProperty(navigatorName)) {
    // console.warn('Could not find navigator:', navigatorName);
    return;
  }

  return _navigators[navigatorName]?.state?.nav?.routes[
    _navigators[navigatorName]?.state?.nav?.index
  ];
}

export default {
  navigate,
  setNavigator,
  getNavigator,
  goBack,
  reset,
  routesCountOf,
  currentRouteOf,
};
