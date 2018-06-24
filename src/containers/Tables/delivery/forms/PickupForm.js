import React, { Component } from 'react';
import { Col, Row } from 'antd';
import Input, {
  InputSearch,
  InputGroup,
  Textarea
} from '../../../../components/uielements/input';
import Form from '../../../../components/uielements/form';
import Checkbox from '../../../../components/uielements/checkbox';
import Button from '../../../../components/uielements/button';
import Notification from '../../../../components/notification';
import IntlMessages from '../../../../components/utility/intlMessages';
import ContentHolder from '../../../../components/utility/contentHolder';
import Seperator from '../../../../components/seperator';
import { rtl } from '../../../../settings/withDirection';

const FormItem = Form.Item;

class PickupForm extends Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        Notification(
          'success',
          'Received values of form',
          JSON.stringify(values)
        );
      }
    });
  };

  handleReset = e => {
    e.preventDefault();
    this.props.form.resetFields();
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  
  render() {
    const { getFieldDecorator } = this.props.form;

    const margin = {
      margin: rtl === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0'
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 1 },
        sm: { span: 1 },
      },
      wrapperCol: {
        xs: { span: 30 },
        sm: { span: 25 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 6,
        },
        sm: {
          span: 14,
          offset: 12,
        },
      },
    };
    return (
      
      <Form onSubmit={this.handleSubmit} onReset={this.handleReset} ref="pickupForm">
        <Seperator title="Pickup From"></Seperator>  
        <FormItem {...formItemLayout} hasFeedback>
        {getFieldDecorator('addressLabel', {
                rules: [
                  {
                    required: true,
                    message: 'Address label is required!',
                  },
                ],
              })(<Input name="addressLabel" id="addressLabel" placeholder="Adderss Label" />)}
        </FormItem>
        <InputGroup>
          <Col span="12">
            <FormItem {...formItemLayout} hasFeedback>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    type: "string",
                    required: true, pattern: /^[0-9]{10}$/,
                    message: 'The input is not valid phone number!',
                  }
                ],
              })(<Input name="phone" id="phone" placeholder="Phone Number" maxlength="10"/>)}
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem {...formItemLayout} hasFeedback>
            {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Name is required!',
                  },
                ],
              })(<Input placeholder="Name" />)}
            </FormItem>
          </Col>
        </InputGroup>
        <FormItem {...formItemLayout} hasFeedback>
        {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: 'Address is required!',
                  },
                ],
              })(<Input name="address" id="address" placeholder="Address Line 1" />)}
        </FormItem>
        <FormItem {...formItemLayout} hasFeedback>
        {getFieldDecorator('streetAddress', {
                rules: [
                  {
                    required: true,
                    message: 'Street Address is required!',
                  },
                ],
              })(<Input name="streetAddress" id="streetAddress" placeholder="Street Address" />)}
        </FormItem>
        <ContentHolder>
        <FormItem {...tailFormItemLayout}>
          <Button type=" default" size="small" htmlType="reset" style={margin}>
            Cancel
          </Button>
          <Button type="primary" size="small" htmlType="submit" style={margin}>
            Save
          </Button>
        </FormItem>
        </ContentHolder>
      </Form>
    );
  }
}

const WrappedFormWIthSubmissionButton = Form.create()(PickupForm);
export default WrappedFormWIthSubmissionButton;
