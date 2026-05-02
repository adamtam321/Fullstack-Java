import { useState } from "react";
import { UserSwitchOutlined, HomeOutlined, LoginOutlined, UserAddOutlined, LogoutOutlined, UserOutlined, CheckSquareOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/auth.context";

type MenuItem = Required<MenuProps>['items'][number];

const AppHeader = () => {
    const [current, setCurrent] = useState('home');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'logout') {
            handleLogout();
            return;
        }
        setCurrent(e.key);
    };

    const items: MenuItem[] = [
        {
            label: <Link to={"/"}>ホーム</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        ...(user ? [
            {
                label: <Link to={"/todos"}>タスク</Link>,
                key: 'todo',
                icon: <CheckSquareOutlined />
            }
        ] : []),
        ...(user?.role === 'ADMIN' ? [
            {
                label: <Link to={"/users"}>ユーザー</Link>,
                key: 'user',
                icon: <UserSwitchOutlined />
            }
        ] : []),
        // Using spacer to push right items to the end
        ...(user ? [
            {
                label: `ようこそ、${user.name}さん`,
                key: 'profile',
                icon: <UserOutlined />,
                style: { marginLeft: 'auto' },
                children: [
                    {
                        label: 'ログアウト',
                        key: 'logout',
                        icon: <LogoutOutlined />,
                    }
                ]
            }
        ] : [
            {
                label: <Link to={"/login"}>ログイン</Link>,
                key: 'login',
                icon: <LoginOutlined />,
                style: { marginLeft: 'auto' }
            },
            {
                label: <Link to={"/register"}>登録</Link>,
                key: 'register',
                icon: <UserAddOutlined />
            }
        ])
    ];

    return (
        <div style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal" items={items}
            />
        </div>
    )

}

export default AppHeader;
