import * as React from 'react';
import * as lottie from 'lottie-web';

interface Props {
  animationData: any;
  autoplay?: boolean;
}

export default class Lottie extends React.Component<Props> {
  private animationNode: any;

  componentDidMount() {
    const {animationData, autoplay} = this.props;

    lottie.loadAnimation({
      animationData,
      loop: false,
      autoplay,
      container: this.animationNode,
    });
  }

  render() {
    return (
      <div
        ref={node => {
          this.animationNode = node;
        }}
      />
    );
  }
}
