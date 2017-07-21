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
    this.setState({
      textColor: '#FFF',
      backgroundColor: '#8200FA'
    });
  }

  onButtonExit() {
    this.setState({
      textColor: '#8200FA',
      backgroundColor: '#FFF'
    });
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
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0),
      rotateY: new Animated.Value(0),
      active: false,
    };
  }

  renderProductName() {
    return (
      <Text
        style={{
          color: '#000',
          fontSize: 0.075,
        }}
      >
        {this.props.name}
      </Text>
    );
  }

  renderProductPrice() {
    return (
      <Text
        style={{
          color: '#000',
          fontSize: 0.075,
        }}
      >
        {`Price: $${(this.props.price || 0).toFixed(2)}`}
      </Text>
    );
  }

  renderProductImage() {
    return (
      <Image
        style={{
          width: .35,
          height: .35,
        }}
        source={this.props.imageSource}
      />
    );
  }

  render () {
    return (
      <Animated.View
        style={{
          position: 'relative',
          backgroundColor: '#fff',
          borderColor: '#ccc',
          borderWidth: 0.005,
          marginBottom: 0.1,
          opacity: this.state.opacity,
          transform: [
            {translateY: this.state.translateY},
            {rotateY: this.state.rotateY}
          ]
        }}>
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
              {translateZ: 0.05}
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
        <View
          style={{
            paddingLeft: 0.05,
            paddingRight: 0.05,
            padding: 0.1,
            paddingTop: 0.1,
            paddingBottom: 0.1,
          }}
        >
          <View
            style={{
              alignItems: 'center'
            }}
          >
            {this.renderProductImage()}
          </View>
          <View
            style={{
              marginBottom: 0.05
            }}
          >
            {this.renderProductName()}
            {this.renderProductPrice()}
          </View>
          <View>
            <AddButton onClick={() => this.setState({active: true})} />
          </View>
        </View>
      </Animated.View>
    );
  }

  componentDidMount() {
    this.state.translateY.setValue(1);
    this.state.opacity.setValue(0);
    Animated.parallel([
      Animated.timing(
        this.state.translateY,
        {
          toValue: 0,
          duration: 750,
          delay: this.props.animationDelay || 0
        }
      ),
      Animated.timing(
        this.state.opacity,
        {
          toValue: 1,
          duration: 750,
          delay: this.props.animationDelay || 0
        }
      )
    ]).start();
  }

  componentDidUpdate(_, prevState) {
    if (this.state.active && !prevState.active) {
      this.state.rotateY.setValue(0);
      Animated.timing(
        this.state.rotateY,
        {
          toValue: 180,
          duration: 750
        }
      ).start();
    }
  }
};

export default ProductTile;
