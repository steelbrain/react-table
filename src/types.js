/* @flow */

export type Column = { key: string, label: string, sortable?: boolean }
export type SortInfo = Array<{ key: string, type: 'asc' | 'desc' }>

export type State = { sort: SortInfo }
export type Props = {
  rows: Array<Object>,
  columns: Array<Column>,

  style?: Object,
  className?: string,

  sort(sortInfo: SortInfo, rows: Array<Object>): Array<Object>,
  rowKey(row: Object): string,

  renderHeaderColumn(column: Column): Object,
  renderBodyColumn(row: Object, column: string): Object,
}
