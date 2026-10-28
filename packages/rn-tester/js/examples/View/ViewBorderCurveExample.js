/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import RNTesterText from '../../components/RNTesterText';
import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

export default function ViewBorderCurveExample(): React.Node {
  const [continuous, setContinuous] = React.useState(true);
  const curve = continuous ? 'continuous' : 'circular';

  return (
    <View testID="view-border-curve-example" style={styles.container}>
      <Pressable
        testID="border-curve-toggle"
        onPress={() => setContinuous(!continuous)}>
        <RNTesterText>Toggle curve: {curve}</RNTesterText>
      </Pressable>
      <RNTesterText>Red marks the circular reference underneath.</RNTesterText>
      {[
        {label: 'All corners: background', corners: styles.all, clip: false},
        {
          label: 'Bottom corners: background',
          corners: styles.bottom,
          clip: false,
        },
        {
          label: 'Bottom corners: clipped child',
          corners: styles.bottom,
          clip: true,
        },
        {label: 'Top corners: clipped child', corners: styles.top, clip: true},
      ].map(({label, corners, clip}) => (
        <View key={label}>
          <RNTesterText>{label}</RNTesterText>
          <View style={[styles.reference, corners]}>
            <View
              style={[
                styles.foreground,
                corners,
                {borderCurve: curve},
                clip ? styles.clipped : styles.background,
              ]}>
              {clip && (
                <View style={[StyleSheet.absoluteFill, styles.background]} />
              )}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 12, gap: 10, backgroundColor: 'white'},
  reference: {width: 240, height: 110, backgroundColor: 'red'},
  foreground: {...StyleSheet.absoluteFill},
  all: {borderRadius: 36},
  bottom: {borderBottomLeftRadius: 36, borderBottomRightRadius: 36},
  top: {borderTopLeftRadius: 36, borderTopRightRadius: 36},
  clipped: {overflow: 'hidden'},
  background: {backgroundColor: '#527FE4'},
});
