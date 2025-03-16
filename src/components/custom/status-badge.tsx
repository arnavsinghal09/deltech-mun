import { Badge } from "../ui/badge";
import React from "react";

const StatusBadge = ({ status }) => {
  const variants = {
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    approved: "bg-green-100 text-green-800 hover:bg-green-100",
    rejected: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  return (
    <Badge variant="outline" className={`${variants[status]} border-0`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default StatusBadge;
