import cs from 'classnames';
import s from './MyDoubleList.css';
import React from 'react';
    import withStyles from 'isomorphic-style-loader/lib/withStyles';
    import MyList from '../MyList';
    import { Row, Col} from 'antd';

    class MyDoubleList extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          selectedSourceItem: [],
        };
        this.getMultipleSelectedValue = this.getMultipleSelectedValue.bind(this);
        this.swap = this.swap.bind(this);
        this.shift = this.shift.bind(this);
        this.clear = this.clear.bind(this);
      }


      getMultipleSelectedValue() {
        this.targetList.concatData(this.sourceList.getSelectedList());
        //this.setState({selectedSourceItem:this.sourceList.getSelectedList()});
      }
      test(){}
      swap(){
        this.targetList.swap();

      }
      shift(){
        this.targetList.shift();

      }
      clear(){
        this.targetList.clear();

      }

  render() {
    return (
      <div  id={this.props.id}>

        <MyList className={s.root} multiple={this.props.multiple}
                dataSource={this.props.dataSource} align={this.props.align}
                Val_Col_Name={this.props.Val_Col_Name} Title_Col_Name={this.props.Title_Col_Name} size={this.props.size}
                width={200} onRef={ref => (this.sourceList = ref)}
        />
        <input className={s.root} type="button" value="Submit" onClick={this.getMultipleSelectedValue} />

        <MyList className={s.root}  multiple={this.props.multiple}
                align={this.props.align} dataSource ={this.state.selectedSourceItem} concatData='true' dupplicate='false'
                Val_Col_Name='Value' Title_Col_Name='Title' size={this.props.size} onRef={ref => (this.targetList = ref)}
        />
        <input className={s.root} type="button" value="Swap" onClick={this.swap} />
        <input className={s.root} type="button" value="Shift" onClick={this.shift} />
        <input className={s.root} type="button" value="Clear" onClick={this.clear} />

      </div>
    );
  }
}

export default withStyles(s)(MyDoubleList);
