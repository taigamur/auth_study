import { Link } from "@mui/material";
import React from "react";

export const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>指定されたページは見つかりません。</p>
      <div style={{ marginTop: 20 }}>
        <Link href="/">HOME に戻る</Link>
      </div>
    </div>
  );
};
