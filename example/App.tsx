/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { StatusBar, useColorScheme } from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Kalender from './src/index';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const vacation = { key: 'vacation', color: '#DE534D', selectedDotColor: 'blue' };
  const massage = { key: 'massage', color: '#E89F3A', selectedDotColor: 'blue' };
  const workout = { key: 'workout', color: '#55B686' };

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <Kalender
          // current={new Date('2023-12-01').toString()}
          hideExtraDays={false}
          isList={true}
          periodDates={{
            dates: [
              {
                startDate: '2023-04-03',
                endDate: '2023-04-06',
              },
            ],
          }}
          blockedDates={{ dates: ['2023-04-15'] }}
          dotDates={[
            { date: '2023-04-04', dots: [vacation, workout] },
            { date: '2023-04-22', dots: [vacation, massage, workout] },
          ]}
          onDayPress={(day) => {
            console.log('preseed', day);
          }}
          displayLoadingIndicator={false}
          animateScroll
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
