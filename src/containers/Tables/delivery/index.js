import React, { Component } from 'react';
import Tabs, { TabPane } from '../../../components/uielements/tabs';
import LayoutWrapper from "../../../components/utility/layoutWrapper.js";
import LayoutContentWrapper from '../../../components/utility/layoutWrapper.js';
import TableDemoStyle from './demo.style';
import delivery from './delivery';
import { tableinfos } from './configs';
import * as TableViews from './tableViews/';
import InputField from '../../Forms/Input';
import { Col, Row, Icon } from 'antd';
import Form from '../../../components/uielements/form';
import Input from '../../../components/uielements/input';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import PickupForm from './forms/PickupForm';
import DeliveryForm from './forms/DeliveryForm';
import Box from '../../../components/utility/box';
import BasicMap from '../../Map/GoogleMap/maps/basic';

const dataList = new delivery(2);
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

export default class Delivery extends Component {
  renderTable(tableInfo) {
    let Component;
    Component = TableViews.SimpleView;
    return <Component tableInfo={tableInfo} dataList={dataList} />;
  }
  render() {
    const colStyle = {
      marginBottom: '16px'
    };
    return (
      <LayoutWrapper>
        <Col md={8} sm={8} xs={16} style={colStyle}>
          {/* <LayoutWrapper> */}
            <PageHeader>Create Order</PageHeader>
            <Box>
              <PickupForm />
              <DeliveryForm />
            </Box>
          {/* </LayoutWrapper> */}
        </Col>
        <Col md={16} sm={16} xs={32} style={colStyle}>
          <LayoutContentWrapper>
            <Box>
            <BasicMap></BasicMap>
            </Box>
            <TableDemoStyle className="isoLayoutContent">

              {this.renderTable(tableinfos[0])}

            </TableDemoStyle>
          </LayoutContentWrapper>
        </Col>
      </LayoutWrapper>
    );
  }
}
export { TableViews, tableinfos, dataList };
