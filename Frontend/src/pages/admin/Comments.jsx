import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CommentTable from "../../components/admin/CommentTable";
import { useAppContext } from "../../context/AppContext";

const Comments = () => {
  const { axios } = useAppContext();
  const [comments, setcomments] = useState([]);
  const [filter, setFilter] = useState("not Approved");

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("/auth/comments");
      
      if (data.success) {
        setcomments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className=" flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setFilter("Approved");
            }}
            className={`border  rounded-full px-4 py-2 cursor-pointer text-xs ${
              filter === "Approved"
                ? "text-primary border-blue-300"
                : "text-gray-700 border-gray-500"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => {
              setFilter("not Approved");
            }}
            className={`border rounded-full  px-4 py-2 cursor-pointer text-xs ${
              filter === "not Approved"
                ? "text-primary border-blue-300"
                : "text-gray-700 border-gray-500"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>
      <div className="relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg  bg-white mt-3">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Comments
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((item) => {
                if (filter === "not Approved") {
                  return !item.isApproved;
                }
                return item.isApproved;
              })
              .map((comment, index) => (
                <CommentTable
                  key={comment._id}
                  comment={comment}
                  fetchComments={fetchComments}
                  index={index + 1}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
