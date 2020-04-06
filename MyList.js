import cs from 'classnames';
import s from './MyList.css';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { GetDupplicateValue,GetMinusList } from '../../../src/utils/jsArrayHelper';

class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.getSelectedList = this.getSelectedList.bind(this);
    this.swap = this.swap.bind(this);
    this.swapByValue = this.swapByValue.bind(this);
    this.swapByIndex = this.swapByIndex.bind(this);
    this.swap2FirstSelItems = this.swap2FirstSelItems.bind(this);
    this.clearSelectCom = this.clearSelectCom.bind(this);
    this.fillSelectCom = this.fillSelectCom.bind(this);
    this.shiftL = this.shiftL.bind(this);
    this.shiftLeft = this.shiftLeft.bind(this);
    this.shiftR = this.shiftR.bind(this);
    this.shiftRight = this.shiftRight.bind(this);
   //this.clear = this.clear.bind(this);
    this.getVal_Col_Name = this.getVal_Col_Name.bind(this);
    this.getTitle_Col_Name = this.getTitle_Col_Name.bind(this);
    this.clearSelectedRow=this.clearSelectedRow.bind(this);
    this.handleOnChange=this.handleOnChange.bind(this);
    // this.createView=this.createView.bind(this);


    this.state = {
      data: null,
    };
  }
  componentDidMount() {
    if (this.props.onRef !== null && this.props.onRef !== undefined)
      this.props.onRef(this);
  }
  componentWillUnmount() {
    if (this.props.onRef !== null && this.props.onRef !== undefined)
      this.props.onRef(undefined);
  }

  hasExistValue(value) {
    const lst = this.getList();
    let found = false;
    lst.forEach(item => {
      if (item.Value.toString() === value.toString()) {
        found = true;
      }
    });
    return found;
  }

  getVal_Col_Name()
  {
    let Val_Col_Name = 'ID';
    if (
      this.props.Val_Col_Name != undefined ||
      this.props.Val_Col_Name != null
    ) {
      Val_Col_Name = this.props.Val_Col_Name;
    }
    return Val_Col_Name;
  }
  getTitle_Col_Name()
  {
    let Title_Col_Name = 'TITLE';
    if (
      this.props.Title_Col_Name != undefined ||
      this.props.Title_Col_Name != null
    ) {
      Title_Col_Name = this.props.Title_Col_Name;
    }
    return Title_Col_Name;
  }

  getChildren() {
    const children = [];
    let Val_Col_Name = this.getVal_Col_Name();
    let Title_Col_Name = this.getTitle_Col_Name();

    if (
      this.props.dupplicate === 'true' &&
      this.selectCom !== null &&
      this.selectCom !== undefined
    )
      this.props.dataSource.forEach(item => {
        children.push(
          <option value={item[Val_Col_Name]}>{item[Title_Col_Name]}</option>,
        ); // duplicate = true   add anything
      });
    else {
      // not found in source list / filter unduppilcate items in dataSource
      const lst_dupplicate = GetDupplicateValue(
        this.props.dataSource,
        Val_Col_Name,
      );
      this.props.dataSource.forEach(item => {
        if (
          lst_dupplicate.find(x => x[Val_Col_Name] === item[Val_Col_Name]) ===
          undefined
        )
          children.push(
            <option value={item[Val_Col_Name]}>{item[Title_Col_Name]}</option>,
          ); // duplicate = true   add anything
      });
    }
    return children;
  }
  concatData(list) {
    this.fillSelectCom(GetMinusList(list, this.getList(), this.getVal_Col_Name()));
  }

  getList() {
    const Items = [];
    const select = this.selectCom;
    if (select.options.length != null) {
      const options = [].slice.call(select.options);
      options.forEach(item => {
        Items.push({ Value: item.value, Title: item.text ,NewValue: item.value});
      });
      return Items;
    }
  }

  getSelectedList() {
    const selectedItems = [];
    const select = this.selectCom;
    if (select.options.length != null) {
      const options = [].slice.call(select.options);
      options.forEach(item => {
        if (item.selected == true) {
          selectedItems.push({
            Value: item.value,
            Title: item.text,
            Index: item.index,
            NewValue: item.value,
          });
        }
      });
      return selectedItems;
    }
  }
  transferList() {
    const selectedItems = [];
    const select = this.selectCom;
    if (select.options.length != null) {
      const options = [].slice.call(select.options);
      options.forEach(item => {
          selectedItems.push({
            Value: item.value,
            Title: item.text,
            Index: item.index,
            NewValue: item.value,
          });
      });
      return selectedItems;
    }
  }
  swap() {
    const select = this.getSelectedList();
    if (select.length > 1) this.swapByValue(select[0].Value, select[1].Value);
  }
  shiftL() {
    const select = this.getSelectedList();
    if (select.length >=1 )
      this.shiftLeft(select[0].Index);

  }
  shiftR() {
    const select = this.getSelectedList();
    if (select.length >= 1)
    this.shiftRight(select[0].Index);
  }
 
  clearSelectedRow() {
 
    const options = [].slice.call(this.selectCom.options);
    options.forEach(item => {
      if (item.selected == true) {
        item.remove();
      }
    });
 
  }

  clearSelectCom() {
    const options = [].slice.call(this.selectCom.options);
    options.forEach(item => {
      item.remove();
    });
  }
  fillSelectCom(list)
  {
    let option;
    const select = this.selectCom;
    list.forEach(item =>{
      option = document.createElement('option');
      option.value = item.Value;
      option.text = item.Title;
      option.newValue = item.Value;
      select.add(option);
    });

 
  }


  swapByValue(val1, val2) {
    let index = 0;
    const lst = this.getList();
    let index1;
    let index2;
    let obj1;
    let obj2;
    let value1;
    let value2;
    const indexList = [];

    lst.forEach(item => {
      if (item.Value == val1) {
        index1 = index;
        obj1 = item;
        value1=item.Value;
      }
      if (item.Value == val2) {
        index2 = index;
        obj2 = item;
        value2=item.Value;
      }
      index++;
    });
 
    lst.splice(index1, 1, {Value :value1 ,Title :obj2.Title,NewValue:obj2.Value});
    lst.splice(index2, 1, {Value : value2,Title : obj1.Title,NewValue:obj1.Value});


    this.clearSelectCom();
    this.fillSelectCom(lst);
    return lst;
    // this.createView(lst);
  }
 

  swapByIndex(ind1, ind2) {
    const select = this.getList();
    if (select !== null && select !== undefined) {
      if (
        select[ind1] !== null &&
        select[ind1] !== undefined &&
        select[ind2] !== null &&
        select[ind2] !== undefined
      )
        this.swapByValue(select[0].Value, select[1].Value);
    }
  }

  shiftLeft(index_A) {
    let obj;
    let obj2;
    let val;
    const  lst = this.getList();
    let len = lst.length;
    if(lst !== null && lst !== undefined) {
      for (let i=len-1 ; i>=index_A ; i--) {
        obj = lst[i];
        lst.splice(i+1 , 1 , obj);
      }
      lst.splice(index_A , 1 , { Value: 0, Title: '',NewValue: 0 });
      //lst.pop();
      this.clearSelectCom();
      this.fillSelectCom(lst);

    }
  }
  shiftRight(index_A) {
    let obj;
    let temp;
    const  lst = this.getList();
    let len = lst.length;
    if(lst !== null && lst !== undefined) {
      let temp=lst[index_A];
      for (let i=0 ; i<=index_A ; i++) {
        obj = lst[i+1];
        lst.splice(i , 1 , obj);
      }
      lst.splice(index_A , 1 , { Value: 0, Title: '',NewValue: 0 });
      this.clearSelectCom();
      this.fillSelectCom(lst);

    }
  }

  swap2FirstSelItems() {
    const temp = input[index_A];
    input[index_A] = input[index_B];
    input[index_B] = temp;
    return input;
  }
  handleOnChange() {
    if (this.props.OnSelectedChange !== null && this.props.OnSelectedChange !== undefined)
      this.props.OnSelectedChange(this);
  }

  render() {
    return (
      <select
    ref={r => (this.selectCom = r)}
    className={cs(this.props.className, s.root)}
    name={this.props.name}
    multiple={this.props.multiple}
    onClick={this.getSelectedList}
    size={this.props.size}
    onChange={this.handleOnChange}
  >
    {this.getChildren()}
  </select>
    );
  }
}
export default withStyles(s)(MyList);
