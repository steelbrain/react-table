// util types
export type AnyObject = Record<string, any>
type Renderable = any

// row is any due to https://github.com/microsoft/TypeScript/issues/42096
export type Column = { key: string; label: string; sortable?: boolean; onClick?: (e: React.MouseEvent, row: AnyObject | any) => void }
export type SortInfo = Array<{ column: string; type: 'asc' | 'desc' }>

export type State = { sort: SortInfo | null }
export type Props = {
  rows: Array<AnyObject>
  columns: Array<Column>

  style?: AnyObject
  className?: string

  initialSort?: SortInfo
  sort(sortInfo: SortInfo, rows: Array<AnyObject>): Array<AnyObject>
  rowKey(row: AnyObject): string

  renderHeaderColumn(column: Column): string | Renderable
  renderBodyColumn(row: AnyObject, column: string): string | Renderable
}
