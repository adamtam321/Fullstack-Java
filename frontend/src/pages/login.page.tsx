import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router";
import { loginApi } from "../services/api";
import { useAuth } from "../context/auth.context";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const onFinish = async (values: any) => {
        try {
            const res = await loginApi(values.email, values.password);
            if (res.data && res.data.data) {
                message.success("ログインに成功しました！");
                const { token, user } = res.data.data;
                login(user, token); // Save to context & localStorage
                navigate("/");
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "ログインに失敗しました";
            message.error(m);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
            <div style={{ width: 400, padding: 20, border: "1px solid #ccc", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <h2 style={{ textAlign: "center", marginBottom: 20 }}>ログイン</h2>
                <Form layout="vertical" onFinish={onFinish}>
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
                            ログイン
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ textAlign: "center" }}>
                    <span>アカウントをお持ちではありませんか？ <Link to="/register">登録</Link></span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
