import { CharLengthDict, Dictionary, Row } from '../models/common';
import { ComplexOptions, ComputedColumn, RowFilterFunction, RowSortFunction } from '../models/external-table';
import { Column, TableStyleDetails } from '../models/internal-table';
import { ColorMap } from '../utils/colored-console-line';
import { RowOptions } from '../utils/table-helpers';
declare class TableInternal {
    title?: string;
    tableStyle: TableStyleDetails;
    columns: Column[];
    rows: Row[];
    filterFunction: RowFilterFunction;
    sortFunction: RowSortFunction;
    enabledColumns: string[];
    disabledColumns: string[];
    computedColumns: any[];
    rowSeparator: boolean;
    colorMap: ColorMap;
    charLength: CharLengthDict;
    initSimple(columns: string[]): void;
    initDetailed(options: ComplexOptions): void;
    constructor(options?: ComplexOptions | string[]);
    createColumnFromRow(text: Dictionary): void;
    addColumn(textOrObj: string | ComputedColumn): void;
    addColumns(toBeInsertedColumns: string[]): void;
    addRow(text: Dictionary, options?: RowOptions): void;
    addRows(toBeInsertedRows: Dictionary[], options?: RowOptions): void;
    renderTable(): string;
}
export default TableInternal;
