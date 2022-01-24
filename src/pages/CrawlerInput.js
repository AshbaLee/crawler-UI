import React, {
    useState
} from 'react';
import {
    Card,
    Input,
    Button,
    Form,
    message,
    Space,
    Spin
} from 'antd';
import {
    postCrawler
} from '../api/crawler';

const CrawlerInput = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (request) => {
      setLoading(true);
      try {
          const response = await postCrawler(request.url);
          if (response.status === 201) {
              message.success('Successful');
          } else {
              message.error(response.statusText);
          }
      } catch (error) {
          message.error(error.statusText);
      }
      setLoading(false);
  };

  return (
    <Card>
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="url"
            label="URL"
            rules={[
              {
                required: true,
              },
              {
                type: 'url',
                warningOnly: true,
              },
              {
                type: 'string',
                min: 6,
              },
            ]}
          >
            <Input placeholder="ex:https://www.nationalgeographic.com" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};

export default CrawlerInput;