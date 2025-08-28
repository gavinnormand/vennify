import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";

function Account() {
  return (
    <div className="text-accent">
      <Link to="/" state={{ clearCache: true }}>
        <CircleUserRound height={40} width={40} />
      </Link>
    </div>
  );
}

export default Account;
