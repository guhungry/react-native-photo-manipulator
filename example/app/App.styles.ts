import type {ImageProps} from 'react-native';
import {StyleSheet} from 'react-native';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  sectionTitle: {
    fontSize: 24,
    marginHorizontal: 8,
    marginTop: 24,
  },
  exampleContainer: {
    padding: 16,
    marginVertical: 4,
    backgroundColor: '#FFF',
    borderColor: '#EEE',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  exampleTitle: {
    fontSize: 18,
  },
  exampleDescription: {
    color: '#333333',
    marginBottom: 16,
  },
  exampleInnerContainer: {
    borderColor: '#EEE',
    borderTopWidth: 1,
    paddingTop: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 1120 / 800,
    paddingHorizontal: 20,
  },
});

export let ImageResultProps: ImageProps = {
  style: styles.image,
  resizeMode: 'contain',
};

export default styles;
