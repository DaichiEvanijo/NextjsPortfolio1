import { formatDistanceToNow } from "date-fns";

type TimeAgoProps = {
  createdAt: Date;
  updatedAt: Date;
};
const TimeAgo = ({ createdAt, updatedAt }: TimeAgoProps) => {

  let timeAgo = "";
  if (createdAt === updatedAt) {
    const timePeriod = formatDistanceToNow(createdAt);
    timeAgo = `created ${timePeriod} ago`;
  } else {
    const timePeriod = formatDistanceToNow(updatedAt);
    timeAgo = `updated ${timePeriod} ago`;
  }

  
  return (
    <span>
      <small>{timeAgo}</small>
    </span>
  );
};

export default TimeAgo;
