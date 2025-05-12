import Button from "../../ui/Button/button";
import Cookies from "js-cookie";

const Header = () => {
  const handleLogout = () => {
    const allCookies = Cookies.get();

    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });

    window.location.href = "/";
  };

  return (
    <div className="bg-sky-950 sticky py-3 px-5">
      <div className="flex justify-end items-center">
        <Button
          className="text-white font-bold bg-orange-600 py-2 px-5 rounded-sm cursor-pointer"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Header;
