import React from "react";

type withTooltipProps = {
  id: string;
};

type withTooltipState = {
  showTooltip: boolean;
};

function withTooltip(Component: React.ElementType) {
  return class WithTooltip extends React.Component<
    withTooltipProps,
    withTooltipState
  > {
    state: Readonly<withTooltipState> = {
      showTooltip: false,
    };

    mouseOver = () => {
      this.setState({ showTooltip: true });
    };

    mouseOut = () => {
      this.setState({ showTooltip: false });
    };

    render() {
      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Component {...this.props} showTooltip={this.state.showTooltip} />
        </div>
      );
    }
  };
}

export default withTooltip;
