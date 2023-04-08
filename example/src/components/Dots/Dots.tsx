import * as React from 'react';
import { View } from 'react-native';

import type { Theme, DOT } from '../../consts';
import styles from './styles';

export interface DotsProps {
  dots: DOT[];
  theme?: Theme;
}

const Dots = ({ theme, dots }: DotsProps) => {
  const style = React.useRef(styles(theme));
  const validDots = dots.filter((dot: DOT) => dot.color);

  const renderDot = (dot: DOT, index: number) => {
    const dotStyle = [];
    dotStyle.push(style.current.dot);
    dotStyle.push({ backgroundColor: dot.color });

    return <View key={dot.key || index} style={dotStyle} />;
  };

  return (
    <View style={style.current.root}>
      {validDots.map((dot: DOT, index: number) => renderDot(dot, index))}
    </View>
  );
};

export default Dots;
Dots.displayName = 'Dots';
