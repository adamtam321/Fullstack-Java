import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router";
import { createUserApi } from "../services/api";

const RegisterPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            const res = await createUserApi(values.name, values.email, values.password, "USER");
            if (res.data) {
                message.success("登録に成功しました！ログインしてください。");
                navigate("/login");
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "登録に失敗しました";
            message.error(m);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
            <div style={{ width: 400, padding: 20, border: "1px solid #ccc", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <h2 style={{ textAlign: "center", marginBottom: 20 }}>登録</h2>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="名前"
                        name="name"
                        rules={[{ required: true, message: "名前を入力してください！" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="メールアドレス"
                        name="email"
                        rules={[{ required: true, message: "メールアドレスを入力してください！" }, { type: "email", message: "有効なメールアドレスではありません" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="パスワード"
                        name="password"
                        rules={[{ required: true, message: "パスワードを入力してください！" }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            登録
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ textAlign: "center" }}>
                    <span>すでにアカウントをお持ちですか？ <Link to="/login">ログイン</Link></span>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
