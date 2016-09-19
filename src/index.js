/* @flow */

import React from 'react'
import { validateProps } from './helpers'
import type { Props, State } from './types'

// TODO: Implement sorting interface
export default class ReactTable extends React.Component {
  props: Props;
  state: State = { sort: [] };

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

    validateProps(this.props)

    let rows = givenRows
    if (this.state.sort.length) {
      rows = sort(this.state.sort, rows)
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
