/* @flow */

import React from 'react'
import type { Column } from './types'

export default class ReactTable extends React.Component {
  render() {
    const {
      rows,
      columns,
      showHeader = true,
      keyProperty = 'key',
      renderHeader = ReactTable.$renderHeader,
      renderRow = ReactTable.$renderRow,
    } = this.props

    if (!Array.isArray(rows)) {
      throw new Error('<ReactTable /> excepts attribute rows to be an Array')
    } else if (!Array.isArray(columns)) {
      throw new Error('<ReactTable /> excepts attribute columns to be an Array')
    }

    return (
      <table>
        { showHeader ? (
          <thead>
            <tr>
              { columns.map(function(value, index, array) {
                return <th key={`${index}+${value.key}+${value.label}`}>{renderHeader(value, index, array)}</th>
              }) }
            </tr>
          </thead>
        ) : null}
        <tbody>
          { rows.map(function(entry, index) {
            return <tr key={entry[keyProperty]}>
              {columns.map(function(column) {
                return <td key={entry[keyProperty] + '.' + column.key}>{renderRow(index, column.key, rows)}</td>
              })}
            </tr>
          }) }
        </tbody>
      </table>
    )
  }
  static $renderHeader(value: Column): string {
    return value.label
  }
  static $renderRow(index: string, key: string, data: Object): string {
    return data[index][key]
  }
}
