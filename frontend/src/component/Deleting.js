import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function Deleting(props) {
  const { action, id } = props;

  return (
    <div>
      <DeleteForeverIcon
        style={{
          position: "relative",
          left: "50%",
          top: "15px",
        }}
        onClick={() => action(id)}
      />
    </div>
  );
}
