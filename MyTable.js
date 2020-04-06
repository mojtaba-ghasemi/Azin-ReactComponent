import s from './MyTable.css';
import ReactDOM from 'react-dom';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Table, Icon, Input, Button, Pagination } from 'antd';
import MyImageButton from '../MyImageButton';
import { connect } from 'react-redux';
import cs from "classnames";
let localColumns;

class MyTable extends React.Component {
  col_tem_order;

  constructor() {
    super();
    this.state = {
      col_hash: {},
      data: null,
      current:1
    };
    this.valueChange = this.valueChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.fill_col_tem_order = this.fill_col_tem_order.bind(this);
    this.change_col_location = this.change_col_location.bind(this);
  }
  componentDidMount() {
    if (this.props.onRef !== null && this.props.onRef !== undefined)
      this.props.onRef(this);
    this.fill_col_tem_order();
  }
  componentWillUnmount() {
    if (this.props.onRef !== null && this.props.onRef !== undefined)
      this.props.onRef(undefined);
  }

  valueChange(event) {
    console.log("iiiiiiiiiiiiiiiiii");
    console.log(event);
    const col_hash = this.state.col_hash;
    col_hash[event.target.name] = event.target.value;
    this.setState({ col_hash });
    // console.log(`event.target.name: ${event.target.name}`);
 
  }
  handleFilter = e => {
 

    const matches = this.props.dataSource.filter(s =>
      s[e.target.name]
        .toString()
        .toUpperCase()
        .match(e.target.value.toString().toUpperCase()),
    );
    this.setState({ data: matches });
  };

  antd_Table_handleChange = (pagination, filters, sorter) => {
    console.log('antd_Table_handleChange antd_Table_handleChange antd_Table_handleChange ');
    console.log(pagination);
    console.log(filters);
    console.log(sorter);
 

    this.props.dataSource.sort(function (a, b) {

      if (sorter.columnKey != undefined && sorter.columnKey != '' && sorter.columnKey != null) {
        if (sorter.order === "descend") {
          console.log("lklklklklklkl");
          console.log(b[sorter.columnKey]);
          console.log(a[sorter.columnKey]);
          return b[sorter.columnKey] > a[sorter.columnKey]
        }

        else if (sorter.order === "ascend") {

          return a[sorter.columnKey] > b[sorter.columnKey]
        }

      }

    })

    if (this.state.data != undefined && this.state.data != '' && this.state.data != null) {
      this.state.data.sort(function (a, b) {

        if (sorter.columnKey != undefined && sorter.columnKey != '' && sorter.columnKey != null) {
          if (sorter.order === "descend") {
            return b[sorter.columnKey] > a[sorter.columnKey]
          }

          else if (sorter.order === "ascend") {

            return a[sorter.columnKey] > b[sorter.columnKey]
          }

        }

      })
    }

  }


  clearFilter(){
    this.setState({ data: null });
  };


  sort(a,b,sortOrder) {

   };
  getFilterDropdown(colName) {
 
    return (
      <div className="custom-filter-dropdown">
        <Input
          placeholder="Search"
          name={colName}
          onChange={this.valueChange}
          onPressEnter={this.handleFilter}
 
        />
        <Button
          type="primary"
          name={colName}
          value={this.state.col_hash[colName]}
 
          onClick={this.handleFilter}
        >
          Search
        </Button>
      </div>
    );
  }
  buildColumnAsFilterDropdown(cols) {
    for (const i in cols) {
      const itemCol = cols[i];
      if (
        itemCol.Has_ColumnSearch !== undefined &&
        itemCol.Has_ColumnSearch.toString() === '1'
      ) {
        itemCol.filterDropdown = this.getFilterDropdown(itemCol.dataIndex);
        itemCol.sorter = 'true';
       }
    }

  }


  fill_col_tem_order() {
    this.col_tem_order = [];
    this.props.columns.forEach(item => {
      this.col_tem_order.push({
        Base_Col: item.dataIndex,
        Change_Col: item.dataIndex,
      });
    });
  }
  change_col_location1(col1, col2) {
    let item1;
    let item2;

    this.col_tem_order.forEach(item => {
      if (item.Change_Col === col1) item1 = item;
      if (item.Change_Col === col2) item2 = item;
    });
    item1.Change_Col = col2;
    item2.Change_Col = col1;

   }
  change_col_location(baseCol1,baseCol2) {
    let item1;
    let item2;

    this.col_tem_order.forEach(item => {
      if (item.Base_Col === baseCol1) item1 = item;
      if (item.Base_Col === baseCol2) item2 = item;
    });

    const tmp = item2.Change_Col;
    item2.Change_Col = item1.Change_Col;
    item1.Change_Col = tmp;
  }

  createColumn() {
    // let localColumns;
    if (this.props.operations != undefined  && this.props.operations != null && this.props.operations != '')
    {

      if (this.props.operations.includes('insert') || this.props.operations.includes('update') || this.props.operations.includes('delete'))
      {

        this.props.columns.forEach(item => {
          localColumns.push({
            title: item.title,
            key: item.key,
            dataIndex: item.dataIndex,
            width: item.width,
            Has_ColumnSearch: item.Has_ColumnSearch,
            Has_ColumnSort: item.Has_ColumnSort
          });
        });
        this.buildColumnAsFilterDropdown(localColumns);
        return localColumns;
      }
    }

    else
    {
      this.buildColumnAsFilterDropdown(this.props.columns);
      return this.props.columns;
    }


  }


  SwapColumnValueWithLastState(Base_col1, Base_col2) {
    let dataSource: [];
    let colName1;
    let colName2;

    this.col_tem_order.forEach(item => {
      if (item.Base_Col === Base_col1) colName1 = item.Change_Col;
      if (item.Base_Col === Base_col2) colName2 = item.Change_Col;
    });



    dataSource =
      this.state.data === null ? this.props.dataSource : this.state.data;
    dataSource.forEach(dataRow => {
      const tmp = dataRow[Base_col1];
      dataRow[Base_col1] = dataRow[Base_col2];
      dataRow[Base_col2] = tmp;
    });

    this.setState({ data: dataSource });
    // this.change_col_location(colName1, colName2);
    this.change_col_location(Base_col1,Base_col2);

  }

  resetDataSource(data) {
    this.fill_col_tem_order();
    this.setState({ data: data });
  }

  Shift2LeftColumnValue2(colName1)
  {
    let dataSource: [];
    let base_Col1_Index;
    let base_Col_End;
    let item1;
    this.col_tem_order.forEach((item , index) => {
      if (item.Change_Col === colName1)  base_Col1_Index = index;
    });

    for (let i= this.col_tem_order.length-1 ;i > base_Col1_Index;i--)
    {
      // clear last column
      if (i === this.col_tem_order.length-1)
      {
        base_Col_End = this.col_tem_order[i].Base_Col;
        dataSource =
          this.state.data === null ? this.props.dataSource : this.state.data;
        dataSource.forEach(dataRow => {
          dataRow[base_Col_End] = "";
        });
        this.col_tem_order[i].Change_Col = "''";
        this.setState({ data: dataSource });
      }
      //*********
      this.SwapColumnValueWithLastState(this.col_tem_order[i].Base_Col, this.col_tem_order[i-1].Base_Col);
    }
  }




  Shift2RightColumnValue2(colName1)
  {
    let dataSource: [];
    let Base_Col1_Index;
    let Base_Col_First;

    this.col_tem_order.forEach((item , index) => {
      if (item.Change_Col === colName1) Base_Col1_Index = index;
    });

    for (let i= 0 ;i < Base_Col1_Index ;i++)
    {
      // clear first column
      if (i === 0 )
      {
        Base_Col_First = this.col_tem_order[i].Base_Col;
        dataSource =
          this.state.data === null ? this.props.dataSource : this.state.data;
        dataSource.forEach(dataRow => {
          dataRow[Base_Col_First] = "";
        });
        this.col_tem_order[i].Change_Col = "''";
        this.setState({ data: dataSource });
      }
      //*********
      this.SwapColumnValueWithLastState(this.col_tem_order[i].Base_Col, this.col_tem_order[i+1].Base_Col);
    }
  }
  Shift2RightColumnValue(Base_Col)
  {
    let dataSource: [];
    let Base_Col1_Index;
    let Base_Col_First;

    this.col_tem_order.forEach((item , index) => {
      if (item.Base_Col === Base_Col) Base_Col1_Index = index;

    });

 


    for (let i= 0 ;i < Base_Col1_Index ;i++)
    {

      this.SwapColumnValueWithLastState(this.col_tem_order[i].Base_Col, this.col_tem_order[i+1].Base_Col);
    }
    // clear index column
      Base_Col_First = this.col_tem_order[Base_Col1_Index].Base_Col;
      dataSource =
        this.state.data === null ? this.props.dataSource : this.state.data;
      dataSource.forEach(dataRow => {
        dataRow[Base_Col_First] = "";
      });
      this.col_tem_order[Base_Col1_Index].Change_Col = "''";

      this.setState({ data: dataSource });
  }


  ClearFirstColumn()
  {
    let dataSource: [];
    let Base_Col1_Index;
    let Base_Col_First;
    Base_Col_First = this.col_tem_order[0].Base_Col;
    dataSource =
      this.state.data === null ? this.props.dataSource : this.state.data;
    dataSource.forEach(dataRow => {
      dataRow[Base_Col_First] = "";
    });
    this.col_tem_order[0].Change_Col = "''";
    this.setState({ data: dataSource });
    // console.log(this.col_tem_order);
  }

  Shift2LeftColumnValue(Base_Col)
  {
    let dataSource: [];
    let base_Col1_Index;
    let base_Col_End;

    this.col_tem_order.forEach((item , index) => {
      if (item.Base_Col === Base_Col)  base_Col1_Index = index;
    });

    // clear last column
    base_Col_End = this.col_tem_order[this.col_tem_order.length-1].Base_Col;
    dataSource =
      this.state.data === null ? this.props.dataSource : this.state.data;
    dataSource.forEach(dataRow => {
      dataRow[base_Col_End] = "";
    });
    this.col_tem_order[this.col_tem_order.length-1].Change_Col = "''";
    this.setState({ data: dataSource });
    //*********


    for (let i= this.col_tem_order.length-1 ;i > base_Col1_Index;i--)
    {
      this.SwapColumnValueWithLastState(this.col_tem_order[i].Base_Col, this.col_tem_order[i-1].Base_Col);
    }
 

  }
  onClickOperations(text,operationName)
  {
    if (this.props.onClickOperation !== null &&  this.props.onClickOperation !== undefined)
      this.props.onClickOperation(text,operationName);

  }
  pageOnChange = page => {
    this.setState({
      current: page,
    });
  };
  onRefreshData(){ // for set current page number out of this component.... (Example : DqPreEtlMapping)
    this.setState({
      current: 1,
    });
  }
  render() {
 

         localColumns = [
          {
            title: 'عملیات',
            key: (this.props.OperationsID),
            dataIndex: (this.props.OperationsID),
            width: 80,
            render: (text, record) => (
              <span>
            {(() => {
              // operations can be insert or delete or update or combination of them
              if (this.props.operations.includes('insert')) {
                //after return all the tag must be on the line of return
                return  <img className={s.btnImage} src="images/icons/add.png"  title={'Add'}  onClick={() => this.onClickOperations(text,'insert')}/>
              }
            })()}
                {(() => {
                  if (this.props.operations.includes('update')) {
                    return <img className={s.btnImage} src="images/icons/edit.png"  title={'Update'}  onClick={() => this.onClickOperations(text,'update')}/>
                  }

                })()}

                {(() => {
                  if (this.props.operations.includes('delete')) {
                    return  <img className={s.btnImage} src="images/icons/remove.png"  title={'Delete'}  onClick={() => this.onClickOperations(text,'delete')}/>
                  }
                })()}
          </span>
            ),
          },
        ];
    return (
      <div className={s.root} hidden={this.props.hidden}>
        <div hidden={this.props.title == null} className={s.halfCircleTop}>
          <div className={s.tableTitleSetting}>
            <span>{this.props.title}</span>
          </div>
        </div>

        {(() => {
          if (this.props.hasFilter === true) {
            return (
              <MyImageButton className={s.mybtn}
               tooltipTitle="clear filter "
               src="images/icons/clear.png"
               onClick={event => this.clearFilter()}
              />
            );
            }

        })()}

        <Table
          bordered={this.props.bordered}
          columns={this.createColumn()}
          opeartions={this.props.opeartion}
          // sorter={this.props.sorter}
          dataSource={
            this.state.data === null ? this.props.dataSource : this.state.data
          }
          // pagination={this.props.pagination }
          pagination ={{pageSize:this.props.pagination.pageSize,current: this.state.current,onChange: this.pageOnChange}}
          scroll={this.props.scroll}
          filterDropdownColumnList={this.props.filterDropdownColumnList}
          onChange={this.antd_Table_handleChange}
        />
      </div>
    );
  }
}
export default withStyles(s)(MyTable);
