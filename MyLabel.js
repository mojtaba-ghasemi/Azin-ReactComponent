import cs from 'classnames';
import s from './MyLabel.css';
import React from 'react';
import { Spin } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class MyLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  render() {
    return (
      <div>
        {(() => {
          if (this.props.fn_IsGlobalDataLoaded === true) {
            return (
              <label

                className=
                  {(() => {
                    if (this.props.SizeMode === 'Small') {
                      return cs(this.props.className ,s.root, s.SizeModeSmall);
                    }
                    else if  (this.props.SizeMode === 'Medium') {
                      return cs(this.props.className ,s.root, s.SizeModeMedium);
                    }
                    else if  (this.props.SizeMode === 'Large') {
                      return cs(this.props.className ,s.root, s.SizeModeLarge);
                    }
                    else
                      return cs(this.props.className , s.root, s.SizeModeMedium);
                  })()}

                // className={cs(this.props.className, s.root)}
                name={this.props.name}
                id={this.props.id}
              >
                {this.props.title}
              </label>
            );
          }
          return <Spin />;
        })()}
      </div>
    );
  }
}

export default withStyles(s)(MyLabel);
