/* @flow */

export type Column = { key: string, label: string, sortable?: boolean }
export type SortInfo = Array<{ key: string, type: 'asc' | 'desc' }>
