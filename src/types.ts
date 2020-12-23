export type Column = { key: string; label: string; sortable?: boolean; onClick?: (e: React.MouseEvent, row: Object) => any }
export type SortInfo = Array<{ column: string; type: 'asc' | 'desc' }>

export type State = { sort: SortInfo | null }
export type Props = {
  rows: Array<Object>
  columns: Array<Column>

  style?: Object
  className?: string

  initialSort?: SortInfo
  sort(sortInfo: SortInfo, rows: Array<Object>): Array<Object>
  rowKey(row: Object): string

  renderHeaderColumn(column: Column): Object
  renderBodyColumn(row: Object, column: string): Object
}
