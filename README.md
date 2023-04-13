# 📆 rn-kalender 

[![npm version](https://badge.fury.io/js/rn-kalender.svg)](https://badge.fury.io/js/rn-kalender)

React Native calendar marking component for iOS and Android <br>

<img src="https://user-images.githubusercontent.com/92979717/231693283-a136ee68-38a5-4c2e-9911-4609e885cc05.gif" 
width="50%" />

⚠️ Implementation is based on [react-native-calendars](https://github.com/wix/react-native-calendars) ⚠️ 


## 🔆 Features 

- Date marking for dots, period, and blocked dates
- Localization with [date-fns internationalization](https://date-fns.org/v2.0.0-alpha.18/docs/I18n)
- Accessibility support
- Custom theming

## 🚀 Installation 

The package can be installed via [npm](https://github.com/npm/cli):

```
npm install rn-kalender --save
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```
yarn add rn-kalender
```

## 🦖 Example

```js
import * as React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import en from 'date-fns/locale/en-GB';

import { Kalender } from './src/index';

function App(): JSX.Element {
  const apple = { key: 'apple', color: '#DE534D', selectedDotColor: 'blue' };
  const mango = { key: 'mango', color: '#E89F3A', selectedDotColor: 'blue' };
  const banana = { key: 'banana', color: '#55B686' };

  const theme = {
    calendarBackground: 'slateblue',
    todayBorderColor: 'tomato',
    todayTextColor: 'tomato',
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Kalender
          isList
          periodDates={{
            dates: [
              {
                startDate: '2023-04-03',
                endDate: '2023-04-06',
              },
            ],
          }}
          blockedDates={{
            dates: ['2023-04-15', '2023-05-05'],
          }}
          dotDates={[
            { date: '2023-04-28', dots: [apple, mango] },
            { date: '2023-04-25', dots: [apple, mango, banana] },
          ]}
          theme={theme} // custom theme
          locale={en} // assign custom locale
          animateScroll
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
```

## 🎨 Theming 

| category | key                    | value                                                  |
| -------- | ---------------------- | ------------------------------------------------------ |
| system   | textSectionTitleColor  | Calendar header days text color                        |
| system   | monthTextColor         | Calendar header month text color                       |
| system   | disabledBorderColor    | Calendar disabled day border color                     |
| system   | disabledTextColor      | Calendar disabled day text color                       |
| system   | calendarBackground     | Calendar background color                              |
| system   | dayTextColor           | Calendar day color                                     |
| system   | todayBorderColor       | Calendar today border color                            |
| system   | todayTextColor         | Calendar today text color                              |
| marking  | periodBackgroundColor  | Calendar period marking default background color       |
| marking  | periodBorderColor      | Calendar period marking default border color           |
| marking  | blockedBackgroundColor | Calendar blocked days marking default background color |
| marking  | blockedTextColor       | Calendar blocked days marking default text color       |
| marking  | dotColor               | Calendar dot marking default color                     |
