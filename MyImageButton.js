import cs from 'classnames';
import s from './MyImageButton.css';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button as AndButton,Row,Col } from 'antd';

class MyImageButton extends React.Component {
  handleClick = e => {
    this.props.onClick(e);
  };

  render() {
    return (
      <div
        className={ (() => {
          if(this.props.loading)
            if(this.props.ButtonStyle)
              return cs(s.disable,s.buttonStyle,this.props.className)
            else
              return cs(s.root, s.disable,this.props.className)//imagestyle
          else  // this.props.loading  is false
          if(this.props.ButtonStyle)
            return  cs(s.enable,s.buttonStyle,this.props.className)
          else
            return cs(s.root, s.enable , this.props.className)//imagestyle
        })()}
        onClick={this.props.onClick}
        style={this.props.customStyle}
      >
        <Row>
          <Col span={10}>
            {(() => {
              if (this.props.loading === true) {
                return <img className={s.imgloader} src="images/ajax-loader2.gif" />;
              }
            })()}
          </Col>
          <Col span={4}> </Col>
          <Col span={10}>
            <img
              title={this.props.title}
              alt={this.props.alt}
              name={this.props.name}
              id={this.props.id}
              src={this.props.src}
              className={s.imgIcon}
            >
              {this.props.children}
            </img>
          </Col>

        </Row>
      </div>
    );
  }
}

export default withStyles(s)(MyImageButton);
