import s from './MyTable.css';
import ReactDOM from 'react-dom';
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Table, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';

class MyTable extends React.Component {
  col_tem_order;

  constructor() {
    super();
    this.state = {
      col_hash: {},
      data: null,
    };
    this.valueChange = this.valueChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
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
    const col_hash = this.state.col_hash;
    col_hash[event.target.name] = event.target.value;
    this.setState({ col_hash });

    // console.log(`event.target.name: ${event.target.name}`);
    // console.log(`event.target.value: ${event.target.value}`);
  }
  handleFilter = e => {
    // console.log('handleFilter Started');
    // console.log(this.state.col_hash);
    // console.log(`event.target.name: ${e.target.name}`);
    // console.log(`event.target.value: ${e.target.value}`);

    // console.log("test")
    // this.state.col_hash[e.target.name] = e.target.value;
    //    console.log(this.props.dataSource);

    const matches = this.props.dataSource.filter(s =>
      s[e.target.name]
        .toString()
        .toUpperCase()
        .match(e.target.value.toString().toUpperCase()),
    );
    this.setState({ data: matches });
  };
  getFilterDropdown(colName) {
    // console.log(`dataIndex: ${dataIndex}`);
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
  buildColumnAsFilterDropdown() {
    for (const i in this.props.columns) {
      const itemCol = this.props.columns[i];
      if (
        itemCol.Has_ColumnSearch !== undefined &&
        itemCol.Has_ColumnSearch.toString() === '1'
      ) {
        itemCol.filterDropdown = this.getFilterDropdown(itemCol.dataIndex);
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
  change_col_location(col1, col2) {
    let item1;
    let item2;
    this.col_tem_order.forEach(item => {
      if (item.Change_Col === col1) item1 = item;
      if (item.Change_Col === col2) item2 = item;
    });
    item1.Change_Col = col2;
    item2.Change_Col = col1;
  }

  buildColumn() {
    this.buildColumnAsFilterDropdown();
  }

  SwapColumnValueWithLastState(colName1, colName2) {
    let dataSource: [];
    let Base_col1;
    let Base_col2;

    this.col_tem_order.forEach(item => {
      if (item.Change_Col === colName1) Base_col1 = item.Base_Col;
      if (item.Change_Col === colName2) Base_col2 = item.Base_Col;
    });

    dataSource =
      this.state.data === null ? this.props.dataSource : this.state.data;
    dataSource.forEach(dataRow => {
      const tmp = dataRow[Base_col1];
      dataRow[Base_col1] = dataRow[Base_col2];
      dataRow[Base_col2] = tmp;
    });
    this.setState({ data: dataSource });
    this.change_col_location(colName1, colName2);
  }

  resetDataSource(data) {
    this.fill_col_tem_order();
    this.setState({ data: data });
  }

  render() {
    this.buildColumn();

    return (
      <div hidden={this.props.hidden}>
        <div hidden={this.props.title == null} className={s.halfCircleTop}>
          <div className={s.tableTitleSetting}>
            <span>{this.props.title}</span>
          </div>
        </div>
        <Table
          bordered={this.props.bordered}
          columns={this.props.columns}
          dataSource={
            this.state.data === null ? this.props.dataSource : this.state.data
          }
          pagination={this.props.pagination}
          scroll={this.props.scroll}
          filterDropdownColumnList={this.props.filterDropdownColumnList}
        />
      </div>
    );
  }
}
export default withStyles(s)(MyTable);
