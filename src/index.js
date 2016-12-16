/* @flow */

import React from 'react'
import { validateProps, ARROW } from './helpers'
import type { Props, State, SortInfo } from './types'

class ReactTable extends React.Component {
  props: Props;
  state: State = { sort: null };

  get sort(): SortInfo {
    return this.state.sort || this.props.initialSort || []
  }
  findSortItemByKey(column: string): number {
    const sort = this.sort
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
      let sort = this.sort
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
    const sort = this.sort
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
      renderHeaderColumn = ReactTable.defaultHeaderRenderer,
      renderBodyColumn = ReactTable.defaultBodyRenderer,
    } = this.props

    validateProps(this.props)

    let rows = givenRows
    const sortInfo = this.sort
    if (sortInfo.length) {
      rows = sort(sortInfo, rows)
    }

    return (
      <table className={`sb-table ${className}`} style={this.props.style}>
        <thead>
          <tr>
            { columns.map(column =>
              <th key={column.key} className={column.sortable && 'sortable'} onClick={column.sortable && this.generateSortCallback(column.key)}>
                {renderHeaderColumn(column)} {column.sortable && this.renderHeaderIcon(column.key)}
              </th>) }
          </tr>
        </thead>
        <tbody>
          { rows.map(function(row) {
            const key = rowKey(row)
            return <tr key={key}>
              {columns.map(function(column) {
                const givenOnClick = column.onClick
                const onClick = givenOnClick && function(e) { givenOnClick(e, row) }

                return <td onClick={onClick} key={`${key}.${column.key}`}>{renderBodyColumn(row, column.key)}</td>
              })}
            </tr>
          }) }
        </tbody>
      </table>
    )
  }
  static defaultHeaderRenderer(item: any) {
    if (typeof item !== 'string') {
      throw new Error('Non-string header array fed to sb-react-table without renderHeaderColumn prop')
    }
    return item
  }
  static defaultBodyRenderer(row: Object, column: string) {
    const value = row[column]
    if (typeof value !== 'string') {
      throw new Error('Non-predictable rows fed to sb-react-table without renderBodyColumn prop')
    }
    return value
  }
}

module.exports = ReactTable
