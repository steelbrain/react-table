/* @flow */

import React from 'react'
import type { Column, SortInfo } from './types'

export default class ReactTable extends React.Component {
  props: {
    rows: Array<Object>,
    columns: Array<Column>,

    classTable?: string,
    classHeader?: string,
    classHeaderRow?: string,
    classHeaderColumn?: string,
    classBody?: string,
    classBodyRow?: string,
    classBodyColumn?: string,

    sort(sortInfo: SortInfo, rows: Array<Object>): Array<Object>,
    rowKey(row: Object): string,

    renderHeaderColumn(column: Column): Object,
    renderBodyColumn(row: Object, column: string): Object,
  };

  render() {
    const {
      rows: givenRows,
      columns,

      classTable = 'sb-table',
      classHeader = '',
      classHeaderRow = '',
      classHeaderColumn = '',
      classBody = '',
      classBodyRow = '',
      classBodyColumn = '',

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
      <table className={classTable}>
        <thead className={classHeader}>
          <tr className={classHeaderRow}>
          { columns.map(function(column) {
            return <th className={classHeaderColumn}>{renderHeaderColumn(column)}</th>
          }) }
          </tr>
        </thead>
        <tbody className={classBody}>
          { rows.map(function(row) {
            const key = rowKey(row)
            return <tr key={key} className={classBodyRow}>
              {columns.map(function(column) {
                return <td className={classBodyColumn} key={`${key}.${column.key}`}>{renderBodyColumn(row, column.key)}</td>
              })}
            </tr>
          }) }
        </tbody>
      </table>
    )
  }
}
