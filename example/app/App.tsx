import * as React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import EXAMPLES, {Example} from './example';
import styles from './App.styles';

export default class App extends React.Component<{}, {}> {
  private renderExample = (example: Example) => {
    return (
      <View
        testID={`example-${example.id}`}
        key={example.title}
        style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>{example.title}</Text>
        <Text style={styles.exampleDescription}>{example.description}</Text>
        <View style={styles.exampleInnerContainer}>{example.render()}</View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView testID="scrollView" style={styles.container}>
          <Text testID="examplesTitle" style={styles.sectionTitle}>
            Examples
          </Text>
          {EXAMPLES.map(this.renderExample)}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
