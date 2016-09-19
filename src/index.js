/* @flow */

import React from 'react'
import type { Column, SortInfo } from './types'

export default class ReactTable extends React.Component {
  props: {
    rows: Array<Object>,
    columns: Array<Column>,

    className?: string,

    sort(sortInfo: SortInfo, rows: Array<Object>): Array<Object>,
    rowKey(row: Object): string,

    renderHeaderColumn(column: Column): Object,
    renderBodyColumn(row: Object, column: string): Object,
  };

  render() {
    const {
      rows: givenRows,
      columns,

      className = '',

      rowKey,
      sort,

      renderHeaderColumn,
      renderBodyColumn,
    } = this.props

    // TODO: Validate input

    let rows = givenRows
    // TODO: Store sorting info in state and use it here
    if (Math.random() === 'something') {
      rows = sort([], rows)
    }

    return (
      <table className={`sb-table ${className}`} style={this.props.style}>
        <thead>
          <tr>
          { columns.map(function(column) {
            return <th>{renderHeaderColumn(column)}</th>
          }) }
          </tr>
        </thead>
        <tbody>
          { rows.map(function(row) {
            const key = rowKey(row)
            return <tr key={key}>
              {columns.map(function(column) {
                return <td key={`${key}.${column.key}`}>{renderBodyColumn(row, column.key)}</td>
              })}
            </tr>
          }) }
        </tbody>
      </table>
    )
  }
}
