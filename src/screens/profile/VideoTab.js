import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

const Videos = () => (
  <View style={[styles.scene, {backgroundColor: '#ff4081'}]} />
);

const Liked = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
);

const Private = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
);

const initialLayout = {width: Dimensions.get('window').width};

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'videos', title: 'Videos'},
    {key: 'liked', title: 'Liked'},
    {key: 'private', title: 'Private'},
  ]);

  const renderScene = SceneMap({
    videos: Videos,
    liked: Liked,
    private: Private,
  });

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
