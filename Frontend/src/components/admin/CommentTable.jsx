import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const CommentTable = ({ comment, fetchComments, index }) => {
  const { createdAt, _id } = comment;
  console.log(comment);

  const BlogDate = new Date(createdAt);

  //now we will add functionalities like approve comment or delete comment
  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.put("auth/approve-comment", { id: _id });
      data.success
        ? toast.success(data.message) && fetchComments()
        : toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteComment = async () => {
    try {
      const confirm = window.confirm("are you sure you want to delete this");
      if (!confirm) return;

      const { data } = await axios.delete("auth/delete-comment", {
        data: { id: _id },
      });
      data.success
        ? toast.success(data.message) && fetchComments()
        : toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <tr className="border-y border-gray-200 hover:bg-gray-50 transition">
      <th className="px-3 py-4 text-sm text-gray-600 font-medium text-center">
        {index}
      </th>

      <td className="px-6 py-4 text-sm text-gray-700 leading-6">
        
        <p className="mt-1">
          <span className="font-semibold text-gray-500">Name:</span>{" "}
          {comment.name}
        </p>
        <p className="mt-1">
          <span className="font-semibold text-gray-500">Comment:</span>{" "}
          {comment.content}
        </p>
      </td>

      <td className="px-6 py-4 max-sm:hidden text-sm text-gray-500 whitespace-nowrap">
        {BlogDate.toDateString()}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              src={assets.tick_icon}
              onClick={approveComment}
              alt="Approve"
              className="w-5 h-5 cursor-pointer hover:scale-105 transition"
            />
          ) : (
            <p className="text-green-600 font-medium text-sm">Approved</p>
          )}
          <img
            src={assets.bin_icon}
            alt="Delete"
            onClick={deleteComment}
            className="w-5 h-5 cursor-pointer hover:scale-105 transition"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTable;
