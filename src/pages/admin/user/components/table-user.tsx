const TableUser = ({
  data,
  loading,
  className,
}: {
  data: IUser.ResponseGetUser[];
  loading: boolean;
  className?: string;
}) => {
  return (
    <div className={className}>
      <table className="w-full border border-sky-950 border-collapse">
        <thead>
          <tr>
            <th className="border border-sky-950">No</th>
            <th className="border border-sky-950">Name</th>
            <th className="border border-sky-950">Username</th>
            <th className="border border-sky-950 w-28"></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td className="border border-sky-950 px-2" colSpan={3}>
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td className="border border-sky-950 px-2" colSpan={3}>
                Tidak ada data
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td className="border border-sky-950 px-2">{index + 1}</td>
                <td className="border border-sky-950 px-2">{item.name}</td>
                <td className="border border-sky-950 px-2">{item.username}</td>
                <td className="border border-sky-950 px-2">
                  <span className="cursor-pointer">Edit</span> |{" "}
                  <span className="cursor-pointer">Delete</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableUser;
