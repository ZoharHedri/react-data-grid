/*inspired by:
  https://adazzle.github.io/react-data-grid/docs/examples/default-editor#enabling-cell-edit
  https://adazzle.github.io/react-data-grid/docs/examples/dropdown-editor
*/

import React, { Component } from 'react'
import ReactDataGrid from 'react-data-grid';
import { Editors } from "react-data-grid-addons";

const { DropDownEditor } = Editors;

const issueTypes = [
  { id: "dentalservices", value: "Dental services" },
  { id: "orthopedics", value: "Orthopedics" },
  { id: "neurology", value: "Neurology" },
  { id: "gastroenterology", value: "Gastroenterology" }
];

/*
 options:
    Array<string | {
      id: string;
      title: string;
      value: string;
      text: string;
  }>;
*/
const IssueTypeEditor = <DropDownEditor options={issueTypes} />;

const columns = [
  { key: 'id', name: 'ID', editable: true},
  { key: 'title', name: 'Title', editable: true },
  { key: 'count', name: 'Count', editable: true },
  { key: "types", name: "Types", editor: IssueTypeEditor }
];

const rows = [
  { id: '', title: '', count: '', types: '' },
  { id: '', title: '', count: '', types: '' },
  { id: '', title: '', count: '', types: '' }
];


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { rows };
    
    this.handelClick = this.handelClick.bind(this);
}
  // state = { rows };

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  handelClick () {
    // alert("Add row!");
    console.log("Add row!")
    //notes: if i add just one cell it will add all the cells, bug
    let newRow = { id: '', title: '', count: '', types: '' }
    // let length = this.state.rows.length
    
    let rows = [ ...this.state.rows ] 
    rows.push(newRow)
    console.log('rows: ' + rows)
    
    this.setState({ rows })
  }

  render() {
    let len = this.state.rows.length
    console.log("length: " + len)
    return (
      <div>
        <h1>react-data-grid example</h1>
        <button type="button" className="btn btn-primary" style={{ margin: '10px' }} onClick={this.handelClick}>Add Row</button>
        <ReactDataGrid
          columns={columns}
          // rowGetter={i => rows[i]}
          rowGetter={i => this.state.rows[i]}
          rowsCount={len}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
          // minHeight={160}
          // minWidth={1000}
        />
      </div>
    )
  }
}

export default App