import { App, Modal, Select } from "antd"
import { Input } from 'antd';
import { useState } from "react";
import { createUserApi } from "../../services/api";

interface IProps {
    openCreateModal: boolean;
    setOpenCreateModal: (v: boolean) => void;
    fetchUsers: any;
}
const CreateUserModal = (props: IProps) => {
    const { notification, message } = App.useApp();

    const { openCreateModal, setOpenCreateModal, fetchUsers } = props;
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("USER");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await createUserApi(name, email, password, role);
            if (res.data.data) {
                message.success("ユーザーの作成に成功しました。");
                setOpenCreateModal(false);
                setName("");
                setEmail("");
                setPassword("");
                setRole("USER");
                await fetchUsers();
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "不明なエラーが発生しました";
            notification.error({
                message: "エラーが発生しました",
                description: m
            })
        }


        setLoading(false)
    }

    return (
        <Modal
            title="新しいユーザーを作成"
            maskClosable={false}
            open={openCreateModal}
            onOk={handleSubmit}
            onCancel={() => {
                setOpenCreateModal(false)
            }}
            okText={"保存"}
            cancelText={"キャンセル"}
            okButtonProps={{
                loading: loading
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 15 }}>
                <span>名前:</span>
                <Input
                    value={name}
                    onChange={(v) => setName(v.target.value)}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 15 }}>
                <span>メールアドレス:</span>
                <Input
                    value={email}
                    onChange={(v) => setEmail(v.target.value)}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 15 }}>
                <span>パスワード:</span>
                <Input.Password
                    value={password}
                    onChange={(v) => setPassword(v.target.value)}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span>役割:</span>
                <Select
                    value={role}
                    onChange={(v) => setRole(v)}
                    options={[
                        { value: 'USER', label: 'USER' },
                        { value: 'ADMIN', label: 'ADMIN' },
                    ]}
                />
            </div>
        </Modal>
    )
}

export default CreateUserModal;