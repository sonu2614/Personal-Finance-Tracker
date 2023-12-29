import React from "react";
import { Form, Button, Modal, Input, DatePicker, Select } from "antd";


function wrong({ isExpenseModalVisible, handleExpenseCancel, onFinish }) {
  const [form] = Form.useForm();

  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      visible={isExpenseModalVisible}
      onCancel={handleExpenseCancel}
      footer={null}
    >
      <Form
        form={Form}
        layout="vertical"
        onFinish={(value) => {
          onFinish(value, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: "600" }}
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input expense amount!",
            },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item> 

        <Form.Item
          style={{ fontWeight: "600" }}
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select the expense date!",
            },
          ]}
        >
          <DatePicker className="custom-input" format="DD-MM-YYYY"/>
        </Form.Item>

        <Form.Item
          style={{ fontWeight: "600" }}
          label="Tag"
          name="tag"
          rules={[
            {
              required: true,
              message: "Please select a tag!",
            },
          ]}
        >
          <Select className="select-input-2">
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="ofice">Ofice</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
            <Button className="btn btn-blue" type="primary" htmlType="submit">Add Expense</Button>
        </Form.Item>

      </Form>
    </Modal>
  );
}
export default wrong;