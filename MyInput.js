import cs from 'classnames';
import s from './MyInput.css';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Input as AndInput } from 'antd';

class MyButton extends React.Component {
  InputValue;

  componentDidMount() {
    if (this.props.onRef !== null && this.props.onRef !== undefined)
      this.props.onRef(this);
  }
  componentWillUnmount() {
    if (this.props.onRef !== null && this.props.onRef !== undefined)
      this.props.onRef(undefined);
  }

  handleClick = e => {
    this.props.onClick(e);
    console.log();
  };

  handleChange = e => {
    this.InputValue = e.target.value;

    if (this.props.onChange !== null && this.props.onChange !== undefined)
      this.props.onChange(e);
  }

  render() {
    return (
      <AndInput
        className={(() => {
          if (this.props.SizeMode === 'Small') {
            return cs(this.props.className, s.root, s.SizeModeSmall);
          } else if (this.props.SizeMode === 'Medium') {
            return cs(this.props.className, s.root, s.SizeModeMedium);
          } else if (this.props.SizeMode === 'Large') {
            return cs(this.props.className, s.root, s.SizeModeLarge);
          }
          return cs(this.props.className, s.root, s.SizeModeMedium);
        })()}
        title={this.props.title}
        alt={this.props.alt}
        name={this.props.name}
        id={this.props.id}
        onClick={this.props.onClick}
        onChange={this.handleChange}
      >
        {this.props.children}
      </AndInput>
    );
  }
}

export default withStyles(s)(MyButton);
