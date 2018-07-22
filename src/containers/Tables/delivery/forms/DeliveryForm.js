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
import LocationSearchInput from '../../../../components/gmaps/locationSearchInput';
import Seperator from '../../../../components/seperator';
import { rtl } from '../../../../settings/withDirection';
import Upload from '../../../../components/uielements/upload';

const FormItem = Form.Item;

class DeliveryForm extends Component {
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
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
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
      
      <Form onSubmit={this.handleSubmit}>
        <Seperator title="Deliver To"></Seperator>  
        <FormItem {...formItemLayout} hasFeedback>
              {getFieldDecorator('phone', {
                  rules: [
                    {
                      type: "string",
                      required: true, pattern: /^[0-9]{10}$/,
                      message: 'The input is not valid phone number!',
                    }
                  ],
                })(<Input name="phone" id="phone" placeholder="Customer Phone Number" />)}
        </FormItem>
        <FormItem {...formItemLayout} hasFeedback>

              <Input name="name" id="name" placeholder="Customer Name" />
        </FormItem>
        <FormItem {...formItemLayout} hasFeedback>
        <LocationSearchInput placeholder="Address"></LocationSearchInput>
          {/* <Input name="address" id="address" placeholder="Address" /> */}
        </FormItem>
        <FormItem {...formItemLayout} hasFeedback>

          <Input name="streetAddress" id="streetAddress" placeholder="House No./Flat No./Landmark for ease of delivery" />
        </FormItem>
        <FormItem {...formItemLayout} hasFeedback>

          <Input name="cashAmount" id="cashAmount" placeholder="Cash to be collected" />
        </FormItem>
        <FormItem {...formItemLayout} hasFeedback>

          <Input name="referenceId" id="referenceId" placeholder="Reference ID" />
        </FormItem>
        <FormItem {...formItemLayout} hasFeedback  style={{ marginBottom: 8 }}>
          <Checkbox>
              Unload
            </Checkbox>
        </FormItem>
        <FormItem {...formItemLayout} hasFeedback  style={{ marginBottom: 8 }}>
          <Checkbox>
              Is return
            </Checkbox>
        </FormItem>
        <FormItem {...formItemLayout} hasFeedback  style={{ marginBottom: 8 }}>
        <Upload></Upload>
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

const WrappedFormWIthSubmissionButton = Form.create()(DeliveryForm);
export default WrappedFormWIthSubmissionButton;
