declare namespace IAuth {
  interface ResponseLogin {
    user: Me;
    token: string;
  }

  interface PayloadLogin {
    username: string;
    password: string;
  }

  interface PayloadRegister {
    name: string;
    username: string;
    password: string;
  }

  interface Me {
    id: number;
    name: string;
    username: string;
  }
}

declare namespace IUser {
  interface ResponseGetUser extends IAuth.Me {}

  interface PayloadCreateUser extends Omit<ResponseGetUser, "id"> {
    password: string;
  }

  interface PayloadUpdateUser extends Partial<ResponseGetUser> {
    password?: string;
  }

  interface PayloadDeleteUser extends Pick<ResponseGetUser, "id"> {}
}
