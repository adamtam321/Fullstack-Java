import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import CreateUserModal from "../components/modal/create.user.modal";
import { deleteUserApi, getUsersApi } from "../services/api";
import UpdateUserModal from "../components/modal/update.user.modal";
import { useAuth } from "../context/auth.context";

export interface IUser {
    id: number;
    name: string;
    email: string;
    role?: string;
    password?: string;
}

const UserPage = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState<IUser[]>([]);
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<IUser | null>(null);

    if (user?.role !== 'ADMIN') {
        return (
            <div style={{ padding: 50, textAlign: "center" }}>
                <h2 style={{ color: "red" }}>403 - アクセス拒否</h2>
                <p>このページを表示する権限がありません。</p>
            </div>
        )
    }

    const fetchUsers = async () => {
        const res = await getUsersApi();
        if (res?.data?.status === "success") {
            setUsers(res.data.data)
        }
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleClickEdit = (data: IUser) => {
        setDataUpdate(data);
        setOpenUpdateModal(true)
    }

    const handleClickDelete = async (data: IUser) => {
        const res = await deleteUserApi(data.id);
        if (res.data) {
            message.success("ユーザーの削除に成功しました");
            await fetchUsers()
        }
    }


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '名前',
            dataIndex: 'name',
        },
        {
            title: 'メールアドレス',
            dataIndex: 'email',
        },
        {
            title: '役割',
            dataIndex: 'role',
        },
        {
            title: '操作',
            render: (_: string, record: IUser) => {

                return (
                    <>
                        <EditOutlined
                            onClick={() => handleClickEdit(record)}
                            style={{
                                cursor: "pointer",
                                color: "orange",
                                marginRight: 10
                            }}
                        />
                        <Popconfirm
                            title="ユーザーの削除"
                            description="本当にこのユーザーを削除しますか？"
                            onConfirm={() => handleClickDelete(record)}
                            okText="はい"
                            cancelText="いいえ"
                        >
                            <DeleteOutlined style={{
                                cursor: "pointer",
                                color: "red",
                            }} />
                        </Popconfirm>


                    </>
                )
            }
        },
    ];

    return (
        <div style={{ padding: 10 }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between", alignItems: "center"
            }}>
                <h3>ユーザー一覧</h3>
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    onClick={() => setOpenCreateModal(true)}
                >
                    ユーザー追加
                </Button>
            </div>
            <Table
                bordered
                dataSource={users}
                columns={columns}
                rowKey={"id"}
            />
            <CreateUserModal
                openCreateModal={openCreateModal}
                setOpenCreateModal={setOpenCreateModal}
                fetchUsers={fetchUsers}
            />

            <UpdateUserModal
                openUpdateModal={openUpdateModal}
                setOpenUpdateModal={setOpenUpdateModal}
                fetchUsers={fetchUsers}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </div>
    )


}

export default UserPage;