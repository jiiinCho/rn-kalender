/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Kalender } from 'rn-kalender';
import en from 'date-fns/locale/en-GB';

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
          theme={theme}
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
          animateScroll
          locale={en}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
