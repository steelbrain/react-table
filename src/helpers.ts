import invariant from 'assert'
import type { Props, SortInfo } from './types'

export function validateProps(props: Props): void {
  invariant(Array.isArray(props.rows), 'rows must be an Array')
  invariant(Array.isArray(props.columns), 'columns must be an Array')

  invariant(typeof props.sort === 'function', 'sort must be a function')
  invariant(typeof props.rowKey === 'function', 'rowKey must be a function')

  invariant(typeof props.renderHeaderColumn === 'function', 'renderHeaderColumn must be a function')
  invariant(typeof props.renderBodyColumn === 'function', 'renderBodyColumn must be a function')
}

export function validateSortInfo(sortInfo: SortInfo): void {
  invariant(!sortInfo || Array.isArray(sortInfo), 'sortInfo must be an Array')
}

export const ARROW = {
  UP: '↑',
  DOWN: '↓',
  BOTH: '⇅',
}
