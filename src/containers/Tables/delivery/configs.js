import React from 'react';
import clone from 'clone';
import IntlMessages from '../../../components/utility/intlMessages';
import {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell
} from '../../../components/tables/helperCells';

const renderCell = (object, type, key) => {
  const value = object[key];
  switch (type) {
    case 'ImageCell':
      return ImageCell(value);
    case 'DateCell':
      return DateCell(value);
    case 'LinkCell':
      return LinkCell(value);
    default:
      return TextCell(value);
  }
};

const columns = [
  {
    title: <IntlMessages id="antTable.title.orderId" />,
    key: 'orderId',
    width: '1%',
    className: 'isoImageCell',
    render: object => renderCell(object, 'TextCell', 'id')
  },
  {
    title: <IntlMessages id="antTable.title.dateNTime" />,
    key: 'dateNTime',
    width: 100,
    render: object => renderCell(object.deliveries[0],  'DateCell', 'deliveryTime')
  },
  {
    title: <IntlMessages id="antTable.title.deliveryAddress" />,
    key: 'deliveryAddress',
    width: 100,
    render: object => renderCell(object.deliveries[0], 'TextCell', 'address')
  },
  {
    title: <IntlMessages id="antTable.title.deliveryStatus" />,
    key: 'deliveryStatus',
    width: 200,
    render: object => renderCell(object, 'TextCell', 'status')
  },
  {
    title: <IntlMessages id="antTable.title.driverDetails" />,
    key: 'driverDetails',
    width: 200,
    render: object => renderCell(object, 'TextCell', 'driverDetails')
  },
  {
    title: <IntlMessages id="antTable.title.return" />,
    key: 'return',
    width: 200,
    render: object => renderCell(object, 'TextCell', 'hasReturn')
  },
  {
    title: <IntlMessages id="antTable.title.cod" />,
    key: 'cod',
    width: 200,
    render: object => renderCell(object, 'TextCell', 'cod')
  }
];
const smallColumns = [columns[0], columns[1], columns[2], columns[3], columns[4], columns[5]];
const sortColumns = [
  { ...columns[1], sorter: true },
  { ...columns[2], sorter: true },
  { ...columns[3], sorter: true },
  { ...columns[4], sorter: true }
];
const editColumns = [
  { ...columns[1], width: 300 },
  { ...columns[2], width: 300 },
  columns[3],
  columns[4]
];
const groupColumns = [
  columns[0],
  {
    title: 'Name',
    children: [columns[1], columns[2]]
  },
  {
    title: 'Address',
    children: [columns[3], columns[4]]
  }
];
const tableinfos = [
  {
    title: 'Simple Table',
    value: 'simple',
    columns: clone(smallColumns)
  },
  {
    title: 'Sortable Table',
    value: 'sortView',
    columns: clone(sortColumns)
  },
  {
    title: 'Search Text',
    value: 'filterView',
    columns: clone(smallColumns)
  },
  {
    title: 'Editable View',
    value: 'editView',
    columns: clone(editColumns)
  },
  {
    title: 'Grouping View',
    value: 'groupView',
    columns: clone(groupColumns)
  },
  {
    title: 'Customized View',
    value: 'customizedView',
    columns: clone(columns)
  }
];
export { columns, tableinfos };
