import { Button, DatePicker, Form, Input, Modal, Select, Space, Table, Tag, Typography, App } from "antd";
import { useEffect, useState } from "react";
import { createTodoApi, deleteTodoApi, getTodosApi, updateTodoApi } from "../services/api";
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useAuth } from "../context/auth.context";

const { Option } = Select;
const { Title } = Typography;

interface ITodo {
    id: number;
    title: string;
    description: string;
    priority: string;
    dueDate: string;
    username: string;
    completed: boolean;
}

const TodoContent = () => {
    const { user } = useAuth();
    const { message, notification } = App.useApp();
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState<ITodo | null>(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const res = await getTodosApi();
            if (res.data?.status === "success") {
                setTodos(res.data.data);
            }
        } catch (error) {
            message.error("Failed to fetch todos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleAddOrEdit = async (values: any) => {
        setSubmitLoading(true);
        try {
            const dueDate = values.dueDate ? values.dueDate.format("YYYY-MM-DD") : "";
            const username = user?.email || "anonymous";
            
            let res;
            if (editingTodo) {
                res = await updateTodoApi(editingTodo.id, values.title, values.description, values.priority, dueDate, username, editingTodo.completed);
            } else {
                res = await createTodoApi(values.title, values.description, values.priority, dueDate, username);
            }

            if (res.data?.status === "success" || res.status === 201 || res.status === 200) {
                message.success(editingTodo ? "Task updated successfully" : "Task created successfully");
                setIsModalOpen(false);
                setEditingTodo(null);
                form.resetFields();
                await fetchTodos();
            } else {
                throw new Error(res.data?.message || "Operation failed");
            }
        } catch (error: any) {
            notification.error({
                message: "Error",
                description: error?.response?.data?.message || error.message || "Operation failed"
            });
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await deleteTodoApi(id);
            if (res.data?.status === "success" || res.status === 200) {
                message.success("Task deleted successfully");
                fetchTodos();
            }
        } catch (error) {
            message.error("Failed to delete task");
        }
    };

    const toggleComplete = async (todo: ITodo) => {
        try {
            const res = await updateTodoApi(todo.id, todo.title, todo.description, todo.priority, todo.dueDate, todo.username, !todo.completed);
            if (res.data?.status === "success" || res.status === 200) {
                message.success("Status updated!");
                await fetchTodos();
            }
        } catch (error) {
            message.error("Failed to update status");
        }
    };

    const columns = [
        {
            title: "Status",
            dataIndex: "completed",
            key: "completed",
            render: (completed: boolean, record: ITodo) => (
                <Tag 
                    color={completed ? "green" : "orange"} 
                    style={{ cursor: "pointer", minWidth: 70, textAlign: 'center' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        toggleComplete(record);
                    }}
                >
                    {completed ? "Done" : "Pending"}
                </Tag>
            ),
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            sorter: (a: ITodo, b: ITodo) => a.title.localeCompare(b.title),
        },
        {
            title: "Priority",
            dataIndex: "priority",
            key: "priority",
            render: (priority: string) => {
                let color = "blue";
                if (priority === "HIGH") color = "volcano";
                if (priority === "MEDIUM") color = "gold";
                return <Tag color={color}>{priority}</Tag>;
            },
            filters: [
                { text: 'HIGH', value: 'HIGH' },
                { text: 'MEDIUM', value: 'MEDIUM' },
                { text: 'LOW', value: 'LOW' },
            ],
            onFilter: (value: any, record: ITodo) => record.priority === value,
            sorter: (a: ITodo, b: ITodo) => {
                const priorityWeight: Record<string, number> = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
                return priorityWeight[a.priority] - priorityWeight[b.priority];
            },
        },
        {
            title: "Due Date",
            dataIndex: "dueDate",
            key: "dueDate",
            render: (date: string) => date ? dayjs(date).format("MMM DD, YYYY") : "-",
            sorter: (a: ITodo, b: ITodo) => {
                if (!a.dueDate) return -1;
                if (!b.dueDate) return 1;
                return dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix();
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: ITodo) => (
                <Space>
                    <Button 
                        icon={<EditOutlined />} 
                        onClick={() => {
                            setEditingTodo(record);
                            form.setFieldsValue({
                                ...record,
                                dueDate: record.dueDate ? dayjs(record.dueDate) : null
                            });
                            setIsModalOpen(true);
                        }} 
                    />
                    <Button 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDelete(record.id)} 
                    />
                </Space>
            ),
        },
    ];

    const filteredTodos = todos.filter(t => 
        t.title.toLowerCase().includes(searchText.toLowerCase()) || 
        t.username.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <Title level={2}>Task Management</Title>
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={() => {
                        setEditingTodo(null);
                        form.resetFields();
                        setIsModalOpen(true);
                    }}
                >
                    Add Task
                </Button>
            </div>

            <div style={{ marginBottom: 16 }}>
                <Input 
                    placeholder="Search by title..." 
                    prefix={<SearchOutlined />} 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
            </div>

            <Table 
                columns={columns} 
                dataSource={filteredTodos} 
                rowKey="id" 
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingTodo ? "Edit Task" : "Add New Task"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
                confirmLoading={submitLoading}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleAddOrEdit}>
                    <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
                        <Input placeholder="What needs to be done?" />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea rows={3} placeholder="Add more details..." />
                    </Form.Item>
                    <div style={{ display: "flex", gap: 16 }}>
                        <Form.Item label="Priority" name="priority" rules={[{ required: true, message: 'Please select priority!' }]} style={{ flex: 1 }}>
                            <Select placeholder="Select priority">
                                <Option value="HIGH">High</Option>
                                <Option value="MEDIUM">Medium</Option>
                                <Option value="LOW">Low</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Due Date" name="dueDate" style={{ flex: 1 }}>
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

const TodoPage = () => (
    <App>
        <TodoContent />
    </App>
);

export default TodoPage;
