/* @flow */

import React from 'react'
import { validateProps, ARROW } from './helpers'
import type { Props, State } from './types'

export default class ReactTable extends React.Component {
  props: Props;
  state: State = { sort: null };

  findSortItemByKey(column: string): number {
    const sort = this.state.sort
    if (Array.isArray(sort)) {
      for (let i = 0, length = sort.length; i < length; ++i) {
        if (sort[i].column === column) {
          return i
        }
      }
    }
    return -1
  }
  generateSortCallback(column: string) {
    return (e: MouseEvent) => {
      let sort = this.state.sort || []
      const append = e.shiftKey

      const index = this.findSortItemByKey(column)
      if (index < 0) {
        const value = { column, type: 'asc' }
        sort = append ? sort : []
        sort.push(value)
      } else {
        const value: Object = sort[index]
        value.type = value.type === 'asc' ? 'desc' : null
        if (!append) {
          sort = value.type ? [value] : []
        } else if (!value.type) {
          sort.splice(index, 1)
        }
      }
      this.setState({ sort })
    }
  }
  renderHeaderIcon(column: string) {
    const sort = this.state.sort
    const index = sort ? this.findSortItemByKey(column) : -1
    let icon = ARROW.BOTH
    if (sort && index !== -1) {
      icon = sort[index].type === 'asc' ? ARROW.UP : ARROW.DOWN
    }

    return <span className="sort-icon">{icon}</span>
  }

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
    const sortInfo = this.state.sort || this.props.initialSort || []
    if (sortInfo.length) {
      rows = sort(sortInfo, rows)
    }

    return (
      <table className={`sb-table ${className}`} style={this.props.style}>
        <thead>
          <tr>
            { columns.map(column =>
              <th className={column.sortable && 'sortable'} onClick={column.sortable && this.generateSortCallback(column.key)}>
                {renderHeaderColumn(column)} {column.sortable && this.renderHeaderIcon(column.key)}
              </th>) }
          </tr>
        </thead>
        <tbody>
          { rows.map(function(row) {
            const key = rowKey(row)
            return <tr key={key}>
              {columns.map(function(column) {
                return <td onClick={column.onClick} key={`${key}.${column.key}`}>{renderBodyColumn(row, column.key)}</td>
              })}
            </tr>
          }) }
        </tbody>
      </table>
    )
  }
}
