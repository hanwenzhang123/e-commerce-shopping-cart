import React from "react";
import EditIcon from "@mui/icons-material/Edit";

export default function Deleting(props) {
  const { action, id } = props;
  return (
    <div>
      <EditIcon
        style={{
          position: "relative",
          left: "35%",
          top: "15px",
        }}
        onClick={() => action(id)}
      />
    </div>
  );
}
