import {Platform, Keyboard, Dimensions} from 'react-native';

export const WINDOW = Dimensions.get('window');
// small device height
export const SMALL_DEVICE_H = WINDOW.height > 600 ? false : true;
export const VERY_SMALL_DEVICE_H = WINDOW.height > 535 ? false : true;

export const setIndex = (that, index) => {
  debugger;
  that.setState({
    currentIndex: index,
  });
};

export const _next = that => {
  let {maxIndex, currentIndex} = that.state;
  Keyboard.dismiss();
  that.setState(
    {
      currentIndex: currentIndex + 1,
      maxIndex: currentIndex + 1 > maxIndex ? currentIndex + 1 : maxIndex,
    },
    () => {
      if (Platform.OS === 'ios') {
        that.tabView.goToPage(that.state.currentIndex);
      } else {
        setTimeout(() => {
          that.tabView.goToPage(that.state.currentIndex);
        }, 0);
      }
    },
  );
};

export const _back = that => {
  Keyboard.dismiss();
  that.setState(
    {
      step: that.state.currentIndex - 1,
    },
    () => that.tabView.goToPage(that.state.currentIndex),
  );
};

export const isEmptyObject = obj => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const isEmpty = t => {
  if (typeof t !== 'string') {
    if (!t) {
      return true;
    }
    throw new TypeError(
      `globals.isEmpty: param must be a string, was: ${typeof t}`,
    );
  }
  return t.length === 0;
};

export const checkInputValidation = refs => {
  let errorCounter = 0;
  for (let i = 0; i < refs.length; i++) {
    const element = refs[i];
    if (element) {
      if (element.checkValidation() !== 0) {
        errorCounter++;
      }
    }
  }

  return errorCounter === 0 ? true : false;
};
