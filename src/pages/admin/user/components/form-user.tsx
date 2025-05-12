import clsx from "clsx";
import Input from "../../../../components/ui/Input/input";
import Button from "../../../../components/ui/Button/button";

const FormUser = ({
  dataUser,
  onChangeUser,
  onSave,
  onReset,
  className,
}: {
  dataUser: { id: number; name: string; username: string; password: string };
  onChangeUser: (key: "name" | "username" | "password", value: string) => void;
  onSave: () => void;
  onReset: () => void;
  className?: string;
}) => {
  return (
    <div
      className={clsx("border p-2 rounded-sm flex flex-col gap-5", className)}
    >
      <h6>Form User</h6>
      <Input
        placeholder="Name"
        value={dataUser.name}
        onChange={(e) => onChangeUser("name", e.target.value)}
      />
      <Input
        placeholder="Username"
        value={dataUser.username}
        onChange={(e) => onChangeUser("username", e.target.value)}
      />
      <Input
        placeholder="Password"
        value={dataUser.password}
        onChange={(e) => onChangeUser("password", e.target.value)}
      />
      <div className="w-full flex gap-2">
        <Button
          className="border border-sky-950 text-sky-950 px-5 py-2 rounded-sm text-center w-full"
          onClick={(e) => {
            e.preventDefault();
            onReset();
          }}
        >
          Reset
        </Button>
        <Button
          className="bg-sky-950 text-white px-5 py-2 rounded-sm text-center w-full"
          onClick={(e) => {
            e.preventDefault();
            onSave();
          }}
        >
          Simpan
        </Button>
      </div>
    </div>
  );
};

export default FormUser;
