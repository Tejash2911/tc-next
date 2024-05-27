import Image from "next/image";
import Rating from "./Rating";
import timeSince from "@/utils/timeSince";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { userRequest } from "@/utils/axiosRequestMethods";
import { useAppDispatch } from "@/lib/hooks";
import { setError } from "@/lib/features/error/errorSlice";

export default function SingleReview({ review }) {
  const dispatch = useAppDispatch();

  const handleUpVote = async () => {
    try {
      const { data } = await userRequest.put(`/api/review/upvote/${review._id}`);
      dispatch(setError(data.message));
    } catch (error) {
      console.log(error);
      dispatch(setError(error.response.data.message));
    }
  };

  const handleReport = async () => {
    try {
      const { data } = await userRequest.put(`/api/review/abuse/${review._id}`);
      dispatch(setError(data.message));
    } catch (error) {
      console.log(error);
      dispatch(setError(error.response.data.message));
    }
  };

  return (
    <div className="flex align-top gap-5 font-Urbanist">
      <div>
        <Image src="/user.png" alt="profile-image" width={50} height={50} className="rounded-full img" />
      </div>
      <div className="w-full">
        <p className="text-lg">{`${review?.user?.firstName} ${review?.user?.lastName}`}</p>
        <div className="flex items-center gap-2">
          <Rating value={review?.rating} />
          <span>{timeSince(review?.createdAt)}</span>
        </div>
        <div className="">{review?.review}</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600" onClick={handleUpVote}>
            <ThumbUpOffAltIcon style={{ fontSize: "30px" }} /> Helpful?
          </div>
          <div onClick={handleReport} className="text-red-600 cursor-pointer hover:underline">
            Report as inappropriate
          </div>
        </div>
      </div>
    </div>
  );
}
