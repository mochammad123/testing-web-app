import { useState } from "react";
import Button from "../../components/ui/Button/button";
import Input from "../../components/ui/Input/input";
import { useAuthLoginMutation } from "../../redux/api/auth";
import { getResponseErrorMessage } from "../../lib/hooks/hooks";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { COOKIES_NAME } from "../../lib/variables/example";

const Login = () => {
  const { authLogin, loading, dataLogin, onChangeDataLogin } = useLogin();

  const handleLogin = async () => {
    try {
      const res = await authLogin(dataLogin).unwrap();
      Cookies.set(COOKIES_NAME.Token, res.result.token)
      Cookies.set(COOKIES_NAME.User, JSON.stringify(res.result.user))
      window.location.href = 'admin/user'
    } catch (error: unknown) {
      let message = "Terjadi kesalahan";

      if (typeof error === "object" && error !== null && "data" in error) {
        const typedError = error as { data: IResponse<null> };
        message = getResponseErrorMessage(typedError.data);
      }

      toast.error(message);
    }
  };

  return (
    <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
      <div className="bg-white w-md rounded-sm">
        <div className="flex flex-col gap-3">
          <h6 className="text-2xl text-sky-950 font-bold py-2 px-2 text-center mt-5">
            Login
          </h6>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="flex flex-col gap-5 px-10 py-3"
          >
            <Input
              type="text"
              name="Username"
              placeholder="Username"
              id="username"
              value={dataLogin.username}
              onChange={(e) => {
                onChangeDataLogin("username", e.target.value);
              }}
            />
            <Input
              type="password"
              name="Password"
              placeholder="Password"
              id="password"
              value={dataLogin.password}
              onChange={(e) => {
                onChangeDataLogin("password", e.target.value);
              }}
            />
            <div className="flex justify-end">
              <Button
                className="bg-sky-950 text-white border-none p-2 w-40 flex justify-center items-center my-5 h-12 font-bold text-md cursor-pointer"
                rounded
                loading={loading}
              >
                Masuk
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

const useLogin = () => {
  const [authLogin, { isLoading }] = useAuthLoginMutation();
  const [dataLogin, setDataLogin] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const onChangeDataLogin = (key: "username" | "password", value: string) => {
    setDataLogin({ ...dataLogin, [key]: value });
  };

  return {
    authLogin,
    loading: isLoading,
    dataLogin,
    onChangeDataLogin,
  };
};
