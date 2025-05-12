import clsx from "clsx";

interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  rounded?: boolean;
  loading?: boolean;
}

const Button = ({
  children,
  className,
  loading,
  rounded = false,
  disabled = false,
  ...props
}: IButtonProps) => {
  return (
    <button
      disabled={loading || disabled}
      className={clsx(
        "shadow hover:opacity-90 global-button relative cursor-pointer",
        {
          rounded,
          "flex justify-end items-center": loading,
          "!bg-[#B7BECB] !text-[#8E8F93] border-none hover:!opacity-100":
            disabled,
        },
        className
      )}
      {...props}
    >
      {!loading && (
        <div className="flex justify-center items-center gap-3.5">
          {children}
        </div>
      )}

      {loading && (
        <div
          className={clsx(
            "absolute top-0 left-0 bottom-0 right-0",
            "flex justify-center items-center"
          )}
        >
          Loading ...
        </div>
      )}
    </button>
  );
};

Button.displayName = "Button";

export default Button;
