// NavigationService.js
// this provides navigator to authScreen directly
import { NavigationActions, DrawerActions } from 'react-navigation';

let navigator;
// this saves the ref to the top App level navigator
function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function toggleDrawer() {
  navigator.dispatch(DrawerActions.toggleDrawer());
}

export default {
  setTopLevelNavigator,
  navigate,
  toggleDrawer
};
