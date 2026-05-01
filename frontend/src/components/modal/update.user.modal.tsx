import { App, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { updateUserApi } from "../../services/api";

interface IProps {
    openUpdateModal: boolean;
    setOpenUpdateModal: (v: boolean) => void;
    fetchUsers: any;
    setDataUpdate: any;
    dataUpdate: {
        id: number;
        name: string;
        email: string;
        role?: string;
    } | null;
}
const UpdateUserModal = (props: IProps) => {
    const { notification, message } = App.useApp();

    const { openUpdateModal, setOpenUpdateModal,
        fetchUsers, dataUpdate,
        setDataUpdate
    } = props;
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("USER");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (dataUpdate) {
            setName(dataUpdate.name);
            setEmail(dataUpdate.email);
            setRole(dataUpdate.role ?? "USER");
            setPassword("");
        }
    }, [dataUpdate])

    const handleSubmit = async () => {
        setLoading(true);
        if (dataUpdate) {
            try {
                const res = await updateUserApi(dataUpdate.id, name, email, password, role);
                if (res.data.data) {
                    message.success("ユーザーの更新に成功しました。");
                    setOpenUpdateModal(false);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setRole("USER");
                    setDataUpdate(null);
                    await fetchUsers();
                }
            } catch (error: any) {
                const m = error?.response?.data?.message ?? "不明なエラーが発生しました";
                notification.error({
                    message: "エラーが発生しました",
                    description: m
                })
            }
        }


        setLoading(false)
    }

    return (
        <Modal
            title="ユーザーの更新"
            maskClosable={false}
            open={openUpdateModal}
            onOk={handleSubmit}
            onCancel={() => {
                setOpenUpdateModal(false);
                setDataUpdate(null);
            }}
            okText={"更新"}
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
                <span>新しいパスワード (変更しない場合は空白):</span>
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

export default UpdateUserModal;