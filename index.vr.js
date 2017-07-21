import React from 'react';

import {
  AppRegistry,
  asset,
  Pano,
  Text,
  Image,
  View,
  VrButton
} from 'react-vr';

import ProductTile from './components/ProductTile';
import testData from './data/testData';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: testData
    }
  }

  renderColumns() {
    const columns = (() => {
      const items = this.state.items;
      const arr = [];

      while (items.length) {
        arr.push(items.splice(0, 2));
      }

      return arr;
    })();

    return columns.map((items, index) => {
      return this.renderColumn(items, index);
    })
  }

  renderColumn(items, index) {
    return (
      <View
        key={index}
        style={{
          position: 'absolute',
          layoutOrigin: [0.5, 0.5],
          transform: [
            {rotateY: (index * -15)},
            {translateZ: -3}
          ],
        }}
      >
        {items.map((item) => {
          return (
            <ProductTile
              key={`${item.itemId}-${item.salePrice}-${item.name}`}
              imageSource={asset(item.image)}
              name={`${item.name.substring(0, 12)}...`}
              price={item.salePrice}
              animationDelay={(index + 1) * 250}
            />
          );
        })}
      </View>
    );
  }

  render() {
    return (
      <View>
        <View
          style={{
            transform: [
              {rotateY: 30}
            ]
          }}
        >
          {this.renderColumns()}
        </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('vr_showroom_demo', () => App);
