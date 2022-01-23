import React, {
    useState
} from 'react';
import {
  Table,
  message,
  Card,
  Input,
  Button,
  Form,
  Space,
  Spin,
  Image,
  Modal
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  getIndex
} from '../api/crawler';

const CrawlerResult = () => {
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState({});
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  const fetchCrawler = async (request) => {
    setLoading(true);
    try {
      const response = await getIndex(request);
      if (response.status === 200) {
        setRequest(request); //handlePageChange will use this
        setPagination({
          pageSize: response.data.per_page,
          total: response.data.total
        });
        setData(response.data.data);
      } else {
        message.error(response.statusText);
      }
    } catch (error) {
      message.error(error.statusText);
    }
    setLoading(false);
  };

  const onFinish = (request) => {
    fetchCrawler(request);
  };

  const handlePageChange = (page) => {
    fetchCrawler({
      ...request,
      page: page
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      width: '20%',
      render: (_, record) => <a href={record.url} target="_blank">{record.title}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '40%',
    },
    {
      title: 'Screenshot',
      dataIndex: 'screenshot',
      width: '20%',
      render: (image) => 
        <Image
          width={200}
          src={`data:image/png;base64,${image}`}
        />,
    },
    {
      title: 'Body',
      dataIndex: 'body',
      render: (_, record) =>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => setVisible(record)}
        />,
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
    },
  ];

  return (
    <Card title="Result">
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            label="Title"
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>

      <Table
        columns={columns}
        rowKey="id"
        dataSource={data}
        pagination={{
          total: pagination.total,
          onChange: handlePageChange
        }}
        loading={loading}
      />

      <Modal
        title={visible.title}
        visible={visible}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        onCancel={handleCancel}
        width={1000}
      >
        <p>{visible.body}</p>
      </Modal>
    </Card>
  );
};

export default CrawlerResult;