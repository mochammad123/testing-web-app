import { useState } from "react";
import Header from "../../../components/layout/header";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../../redux/api/userService";
import FormUser from "./components/form-user";
import TableUser from "./components/table-user";
import { getResponseErrorMessage } from "../../../lib/hooks/hooks";
import { toast } from "react-toastify";

const User = () => {
  const {
    dataSource,
    refetch,
    isLoading,
    createUser,
    updateUser,
    deleteUser,
    dataUser,
    onChangeDataUser,
    onEditDataUser,
    onClearDataUser,
  } = useUser();

  const handleCreateUser = async () => {
    try {
      const payload: IUser.PayloadCreateUser = {
        name: dataUser.name,
        username: dataUser.username,
        password: dataUser.password,
      };

      const res = await createUser(payload).unwrap();
      if (res.message.includes("berhasil")) {
        refetch();
        toast.success(res.message);
        onClearDataUser();
      }
    } catch (error: unknown) {
      let message = "Terjadi kesalahan";

      if (typeof error === "object" && error !== null && "data" in error) {
        const typedError = error as { data: IResponse<null> };
        message = getResponseErrorMessage(typedError.data);
      }

      toast.error(message);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const payload: IUser.PayloadUpdateUser = {
        id: dataUser.id,
        name: dataUser.name,
        username: dataUser.username,
        password: dataUser.password,
      };

      const res = await updateUser(payload).unwrap();
      if (res.message.includes("berhasil")) {
        refetch();
        toast.success(res.message);
        onClearDataUser();
      }
    } catch (error: unknown) {
      let message = "Terjadi kesalahan";

      if (typeof error === "object" && error !== null && "data" in error) {
        const typedError = error as { data: IResponse<null> };
        message = getResponseErrorMessage(typedError.data);
      }

      toast.error(message);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const res = await deleteUser({ id }).unwrap();
      if (res.message.includes("berhasil")) {
        refetch();
        toast.success(res.message);
      }
    } catch (error: unknown) {
      let message = "Terjadi kesalahan";

      if (typeof error === "object" && error !== null && "data" in error) {
        const typedError = error as { data: IResponse<null> };
        message = getResponseErrorMessage(typedError.data);
      }

      toast.error(message);
    }
  };

  const onSave = () => {
    if (dataUser.id === 0) {
      handleCreateUser();
    } else {
      handleUpdateUser();
    }
  };

  return (
    <>
      <Header />
      <div className="p-5">
        <h3 className="mb-5 text-sky-950 font-bold text-lg">Data User</h3>
        <div className="grid grid-cols-3 gap-5">
          <FormUser
            dataUser={dataUser}
            onChangeUser={onChangeDataUser}
            onSave={onSave}
            onReset={onClearDataUser}
          />
          <TableUser
            data={dataSource}
            loading={isLoading}
            className="col-span-2"
            onEdit={onEditDataUser}
            onDelete={handleDeleteUser}
          />
        </div>
      </div>
    </>
  );
};

export default User;

const useUser = () => {
  const { data, isLoading, isFetching, refetch } = useGetUsersQuery();
  const [createUser, { isLoading: isLoadingCreate }] = useCreateUserMutation();
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();

  const [dataUser, setDataUser] = useState<{
    id: number;
    name: string;
    username: string;
    password: string;
  }>({ id: 0, name: "", username: "", password: "" });

  const onChangeDataUser = (
    key: "name" | "username" | "password",
    value: string
  ) => {
    setDataUser({ ...dataUser, [key]: value });
  };

  const onEditDataUser = (data: IUser.ResponseGetUser) => {
    setDataUser({
      id: data.id,
      name: data.name,
      username: data.username,
      password: "",
    });
  };

  const onClearDataUser = () => {
    setDataUser({ id: 0, name: "", username: "", password: "" });
  };

  return {
    dataSource: data?.result || [],
    isLoading:
      isLoading ||
      isFetching ||
      isLoadingCreate ||
      isLoadingUpdate ||
      isLoadingDelete,
    createUser,
    updateUser,
    deleteUser,
    refetch,
    dataUser,
    onChangeDataUser,
    onEditDataUser,
    onClearDataUser,
  };
};
