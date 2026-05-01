

import { Space, Typography } from 'antd';
const { Text } = Typography;

const HomePage = () => {
    return (
        <div style={{ padding: 20 }}>
            <Space direction="vertical">
                <Text mark>
                    Tam Project Fullstack with Spring Boot & React
                </Text>
                <Text code>- React (TypeScript) </Text>
                <Text code>- APIs backend </Text>
                <Text code>- CRUD Users</Text>
            </Space>
        </div>
    )
}

export default HomePage;