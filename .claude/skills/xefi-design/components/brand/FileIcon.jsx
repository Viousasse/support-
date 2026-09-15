import React from "react";

export const FILE_TYPES = ["doc","csv","pdf","jpg","txt","eps","rar","html","xls","png","zip","wav","psd","php","mp3","ppt","avi","mov","dll","msg"];

export function FileIcon({type = "pdf", size = 40, basePath = "assets", className = "", ...rest}) {
  const t = String(type).toLowerCase();
  const known = FILE_TYPES.indexOf(t) !== -1 ? t : "txt";
  return (
    <span className={["da-fileicon", className].filter(Boolean).join(" ")} style={{width: size}} {...rest}>
      <img src={basePath + "/file-icons/" + known + ".svg"} alt={known.toUpperCase()} />
    </span>
  );
}
