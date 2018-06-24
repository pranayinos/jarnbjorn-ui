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
    title: <IntlMessages id="antTable.title.invoiceId" />,
    key: 'invoiceId',
    width: '1%',
    className: 'isoImageCell',
    render: object => renderCell(object, 'ImageCell', 'avatar')
  },
  {
    title: <IntlMessages id="antTable.title.duration" />,
    key: 'duration',
    width: 100,
    render: object => renderCell(object, 'TextCell', 'firstName')
  },
  {
    title: <IntlMessages id="antTable.title.createdOn" />,
    key: 'createdOn',
    width: 100,
    render: object => renderCell(object, 'TextCell', 'lastName')
  },
  {
    title: <IntlMessages id="antTable.title.invoiceAmount" />,
    key: 'invoiceAmount',
    width: 200,
    render: object => renderCell(object, 'TextCell', 'city')
  },
  {
    title: <IntlMessages id="antTable.title.download" />,
    key: 'download',
    width: 200,
    render: object => renderCell(object, 'TextCell', 'street')
  },
  {
    title: <IntlMessages id="antTable.title.referenceId" />,
    key: 'referenceId',
    width: 200,
    render: object => renderCell(object, 'LinkCell', 'email')
  },
  {
    title: <IntlMessages id="antTable.title.activityTime" />,
    key: 'activityTime',
    width: 200,
    render: object => renderCell(object, 'DateCell', 'date')
  },
  {
    title: <IntlMessages id="antTable.title.amount" />,
    key: 'amount',
    width: 200,
    render: object => renderCell(object, 'DateCell', 'date')
  },
  {
    title: <IntlMessages id="antTable.title.channel" />,
    key: 'channel',
    width: 200,
    render: object => renderCell(object, 'DateCell', 'date')
  }
];
const deliveryColumns = [columns[0], columns[1], columns[1], columns[3], columns[4]];
const paymentsColumns = [columns[5], columns[6], columns[7], columns[8]];
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
    title: 'Delivery Invoices',
    value: 'simple',
    columns: clone(deliveryColumns)
  },
  {
    title: 'Payments',
    value: 'simple',
    columns: clone(paymentsColumns)
  }
];
export { columns, tableinfos };
