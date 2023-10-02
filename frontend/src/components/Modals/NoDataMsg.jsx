export const NoDataMessage = ({message}) => {
  return (
    <div className="flex justify-center w-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-4xl">
        <p className="text-center text-gray-500">
          {message}
        </p>
      </div>
    </div>
  );
};
