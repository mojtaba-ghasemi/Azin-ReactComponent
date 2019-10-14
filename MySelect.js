import cs from 'classnames';
import s from './MySelect.css';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Select } from 'antd';
import { GetGNL_UI_FORM_PUBLIC_INFO_PARENTNAME } from '../../../src/utils/Global';

const Option = Select.Option;
class MySelect extends React.Component {
  getChildren() {
    const children = [];
    let Val_Col_Name = 'ID';
    let Title_Col_Name = 'TITLE';

    if(this.props.Val_Col_Name != undefined || this.props.Val_Col_Name != null)
    {
      Val_Col_Name = this.props.Val_Col_Name;
    }
    if(this.props.Title_Col_Name != undefined || this.props.Title_Col_Name != null)
    {
      Title_Col_Name = this.props.Title_Col_Name;
    }

    if (this.props.DataSource != undefined && this.props.DataSource != null)
    // {
    //   console.log('ppppppppppppppppppp');
    //   console.log(this.props.DataSource);
    // }
       this.props.DataSource.forEach(item => {
         children.push(<Option key={item[Val_Col_Name]}>{item[Title_Col_Name]}</Option>);
       });
    return children;
  }
  render() {
    return (
      <Select
        ref={r => (this.selectCom = r)}
        className={cs(this.props.className, s.root)}

        dropdownClassName={s.myCss}


        placeholder={this.props.placeholder}

        onChange={this.props.onChange}
        defaultValue={(() => {
          if (
            this.props.defaultIndex != undefined &&
            this.props.defaultIndex != null &&
            this.props.DataSource != undefined &&
            this.props.DataSource != null &&
            this.props.DataSource[this.props.defaultIndex] != undefined &&
            this.props.DataSource[this.props.defaultIndex] != null
          ) {
            return this.props.DataSource[this.props.defaultIndex].TITLE;
          } else if (
            this.props.defaultValue != undefined &&
            this.props.defaultValue != null
          ) {
            return this.props.defaultValue;
          }

          return this.props.placeholder;
        })()}
      >
        {this.getChildren()}
      </Select>
    );
  }
}

export default withStyles(s)(MySelect);
