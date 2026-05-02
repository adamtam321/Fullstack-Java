import { Button, Card, Col, Row, Statistic, Typography, Space, Progress, List, Tag, Empty, Tooltip } from 'antd';
import { 
    CheckCircleOutlined, ClockCircleOutlined, PlusOutlined, 
    ArrowRightOutlined, RocketOutlined, SortAscendingOutlined, 
    SortDescendingOutlined, FireOutlined, CalendarOutlined 
} from '@ant-design/icons';
import { useAuth } from '../context/auth.context';
import { useNavigate } from 'react-router';
import { useEffect, useState, useMemo } from 'react';
import { getTodosApi } from '../services/api';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;

interface ITodo {
    id: number;
    title: string;
    description: string;
    priority: string;
    dueDate: string;
    username: string;
    completed: boolean;
}

const HomePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [loading, setLoading] = useState(false);
    
    // State for interactive filtering and sorting
    const [statFilter, setStatFilter] = useState<'ALL' | 'COMPLETED' | 'PENDING' | 'HIGH'>('ALL');
    const [dateSortOrder, setDateSortOrder] = useState<'ASC' | 'DESC'>('ASC');

    useEffect(() => {
        if (user) {
            fetchStats();
        }
    }, [user]);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const res = await getTodosApi();
            if (res.data?.status === "success") {
                setTodos(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch stats");
        } finally {
            setLoading(false);
        }
    };

    // Calculate Counts
    const completedCount = todos.filter(t => t.completed).length;
    const pendingCount = todos.length - completedCount;
    const highPriorityCount = todos.filter(t => t.priority === 'HIGH' && !t.completed).length;
    const completionRate = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

    // Filter Tasks for "Next 7 Days"
    const upcomingTasks = useMemo(() => {
        const today = dayjs().startOf('day');
        const nextWeek = dayjs().add(7, 'day').endOf('day');
        
        const priorityWeight: Record<string, number> = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };

        return todos
            .filter(t => {
                if (!t.dueDate) return false;
                const d = dayjs(t.dueDate);
                return d.isAfter(today.subtract(1, 'day')) && d.isBefore(nextWeek);
            })
            .sort((a, b) => {
                const dateA = dayjs(a.dueDate).valueOf();
                const dateB = dayjs(b.dueDate).valueOf();
                
                if (dateA !== dateB) {
                    return dateSortOrder === 'ASC' ? dateA - dateB : dateB - dateA;
                }
                return priorityWeight[b.priority] - priorityWeight[a.priority];
            });
    }, [todos, dateSortOrder]);

    // Filter Tasks for the Stats Detail List
    const statDetailTasks = useMemo(() => {
        switch (statFilter) {
            case 'COMPLETED': return todos.filter(t => t.completed);
            case 'PENDING': return todos.filter(t => !t.completed);
            case 'HIGH': return todos.filter(t => t.priority === 'HIGH' && !t.completed);
            default: return todos;
        }
    }, [todos, statFilter]);

    const getStatTitle = () => {
        switch (statFilter) {
            case 'COMPLETED': return "完了済みタスク";
            case 'PENDING': return "保留中のタスク";
            case 'HIGH': return "優先度：高のタスク";
            default: return "すべてのタスク";
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', paddingBottom: 40 }}>
            {/* --- HERO SECTION --- */}
            <div style={{ 
                background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)', 
                padding: '60px 20px', 
                textAlign: 'center',
                color: 'white',
                marginBottom: 40,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
                <Title level={1} style={{ color: 'white', marginBottom: 16 }}>
                    <RocketOutlined /> 効率的なタスク管理を始めましょう
                </Title>
                <Paragraph style={{ color: 'white', fontSize: '18px', opacity: 0.9, marginBottom: 32 }}>
                    {user ? `お帰りなさい、${user.name}さん！今日の予定を確認しましょう。` : 'プロジェクトを整理し、チームの生産性を向上させます。'}
                </Paragraph>
                <Space size="middle">
                    <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => navigate('/todos')} style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}>
                        タスクを追加
                    </Button>
                    <Button ghost size="large" icon={<ArrowRightOutlined />} onClick={() => navigate('/todos')}>
                        一覧を見る
                    </Button>
                </Space>
            </div>

            <div style={{ padding: '0 40px' }}>
                {/* --- DASHBOARD STATS --- */}
                <Title level={3} style={{ marginBottom: 24 }}>ダッシュボード</Title>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card 
                            bordered={false} 
                            hoverable 
                            onClick={() => setStatFilter('ALL')}
                            style={{ 
                                borderBottom: statFilter === 'ALL' ? '4px solid #1890ff' : 'none',
                                transition: 'all 0.3s'
                            }}
                        >
                            <Statistic
                                title="総タスク数"
                                value={todos.length}
                                prefix={<ClockCircleOutlined />}
                                valueStyle={{ color: '#1890ff' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card 
                            bordered={false} 
                            hoverable 
                            onClick={() => setStatFilter('COMPLETED')}
                            style={{ 
                                borderBottom: statFilter === 'COMPLETED' ? '4px solid #52c41a' : 'none',
                                transition: 'all 0.3s'
                            }}
                        >
                            <Statistic
                                title="完了済み"
                                value={completedCount}
                                prefix={<CheckCircleOutlined />}
                                valueStyle={{ color: '#52c41a' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card 
                            bordered={false} 
                            hoverable 
                            onClick={() => setStatFilter('PENDING')}
                            style={{ 
                                borderBottom: statFilter === 'PENDING' ? '4px solid #faad14' : 'none',
                                transition: 'all 0.3s'
                            }}
                        >
                            <Statistic
                                title="保留中"
                                value={pendingCount}
                                valueStyle={{ color: '#faad14' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card 
                            bordered={false} 
                            hoverable 
                            onClick={() => setStatFilter('HIGH')}
                            style={{ 
                                borderBottom: statFilter === 'HIGH' ? '4px solid #f5222d' : 'none',
                                transition: 'all 0.3s'
                            }}
                        >
                            <Statistic
                                title="優先度：高"
                                value={highPriorityCount}
                                prefix={<FireOutlined />}
                                valueStyle={{ color: '#f5222d' }}
                            />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
                    {/* --- LEFT COLUMN: PROGRESS & QUICK LIST --- */}
                    <Col xs={24} lg={8}>
                        <Card title="進捗状況" bordered={false} style={{ marginBottom: 24, height: 260 }}>
                            <div style={{ textAlign: 'center' }}>
                                <Progress type="circle" percent={completionRate} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
                                <div style={{ marginTop: 16 }}>
                                    <Text type="secondary">目標達成率</Text>
                                </div>
                            </div>
                        </Card>

                        <Card 
                            title={getStatTitle()} 
                            bordered={false} 
                            style={{ height: 480 }}
                            bodyStyle={{ padding: '0 16px' }}
                        >
                            <List
                                pagination={{
                                    pageSize: 5,
                                    size: 'small',
                                    simple: true,
                                    hideOnSinglePage: true
                                }}
                                dataSource={statDetailTasks}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<Text delete={item.completed} style={{ maxWidth: 150 }} ellipsis>{item.title}</Text>}
                                            description={<Tag color={item.priority === 'HIGH' ? 'red' : 'blue'}>{item.priority}</Tag>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>

                    {/* --- RIGHT COLUMN: UPCOMING SCHEDULE --- */}
                    <Col xs={24} lg={16}>
                        <Card 
                            title={<span><CalendarOutlined /> 来週の予定 (7日間)</span>} 
                            bordered={false} 
                            style={{ height: 764 }} // Fixed height to stabilize layout (260 + 24 + 480)
                            extra={
                                <Space>
                                    <Text type="secondary">期限で並べ替え:</Text>
                                    <Tooltip title={dateSortOrder === 'ASC' ? "昇順" : "降順"}>
                                        <Button 
                                            icon={dateSortOrder === 'ASC' ? <SortAscendingOutlined /> : <SortDescendingOutlined />} 
                                            onClick={() => setDateSortOrder(prev => prev === 'ASC' ? 'DESC' : 'ASC')}
                                        />
                                    </Tooltip>
                                </Space>
                            }
                        >
                            {upcomingTasks.length > 0 ? (
                                <List
                                    loading={loading}
                                    dataSource={upcomingTasks}
                                    pagination={{
                                        pageSize: 6,
                                        size: 'default',
                                        showSizeChanger: false,
                                        style: { textAlign: 'center', marginTop: 20 }
                                    }}
                                    renderItem={item => (
                                        <List.Item style={{ height: 100 }}>
                                            <List.Item.Meta
                                                avatar={item.completed ? <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 20 }} /> : <ClockCircleOutlined style={{ color: '#faad14', fontSize: 20 }} />}
                                                title={item.title}
                                                description={
                                                    <Space direction="vertical" size={0}>
                                                        <Text type="secondary">{dayjs(item.dueDate).format('YYYY年MM月DD日')} ({dayjs(item.dueDate).diff(dayjs().startOf('day'), 'day')}日後)</Text>
                                                        <Text type="secondary" style={{ fontSize: '12px' }} ellipsis>{item.description || '説明なし'}</Text>
                                                    </Space>
                                                }
                                            />
                                            <Tag color={item.priority === 'HIGH' ? 'red' : item.priority === 'MEDIUM' ? 'orange' : 'blue'}>
                                                {item.priority}
                                            </Tag>
                                        </List.Item>
                                    )}
                                />
                            ) : (
                                <div style={{ paddingTop: 100 }}><Empty description="来週の予定はありません" /></div>
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default HomePage;