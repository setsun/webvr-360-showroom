/* Button.js */
import React from 'react';
import {
  asset,
  View,
  Image,
  Text,
  VrButton,
  Animated,
} from 'react-vr';

/*
 AddButton Component
*/
class AddButton extends React.Component {
  constructor() {
    super();

    this.state = {
      textColor: '#8200FA',
      backgroundColor: '#FFF',
    };

    this.onButtonEnter = this.onButtonEnter.bind(this);
    this.onButtonExit = this.onButtonExit.bind(this);
  }

  onButtonEnter() {
  }

  onButtonExit() {
  }

  render () {
    const {onClick} = this.props;

    return (
      <VrButton
        style={{
          borderRadius: 0.01,
          borderWidth: 0.005,
          backgroundColor: this.state.backgroundColor,
          borderColor: '#8200FA',
          padding: 0.05,
          paddingLeft: 0.1,
          paddingRight: 0.1,
        }}
        onEnter={this.onButtonEnter}
        onExit={this.onButtonExit}
        onClick={onClick}
      >
        <Text
          style={{
            color: this.state.textColor,
            fontWeight: '500',
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 0.075
          }}
        >
          Add To Cart
        </Text>
      </VrButton>
    );
  }
};

/*
 ProductTile Component
*/
class ProductTile extends React.Component {
  constructor() {
    super();

    this.state = {
      translateY: null,
      opacity: null,
      rotateY: null,
      active: false,
    };
  }

  renderProductName() {
    return null;
  }

  renderProductPrice() {
    return null;
  }

  renderProductImage() {
    return null;
  }

  renderBackface() {
    return (
      <View
        style={{
          backgroundColor: '#8200FA',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0.05,
          transform: [
            {rotateY: 180},
            {translateZ: 0.1}
          ]
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            fontWeight: '500',
            color: '#FFF'
          }}
        >
          Added to Cart!
        </Text>
      </View>
    );
  }

  render () {
    return (
      <Animated.View
        style={{
        }}>
        <View
          style={{
          }}
        >
          <View
            style={{
            }}
          >
            {this.renderProductImage()}
          </View>
          <View
            style={{
            }}
          >
            {this.renderProductName()}
            {this.renderProductPrice()}
          </View>
          <View>
            <AddButton onClick={null} />
          </View>
        </View>
        {this.renderBackface()}
      </Animated.View>
    );
  }

  componentDidMount() {
  }

  componentDidUpdate(_, prevState) {
    if (this.state.active && !prevState.active) {
    }
  }
};

export default ProductTile;
