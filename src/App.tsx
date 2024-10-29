import Builder from "./Components/SceneBuilder/Builder";
import { IBoxConfig } from "./Object/Box";
import { Radio, Space, Typography } from "antd";
import { useState } from "react";

const boxConfig: Record<string, IBoxConfig[]> = {
  A: [
    { size: 1, color: "black", position: [0, 0, 0], borderColor: "blue" },
    { size: 1, color: "#F3F5EC", position: [1, 0, 0], borderColor: "blue" },
    { size: 1, color: "#F3F5EC", position: [0, 1, 0], borderColor: "blue" },

    { size: 1, color: "black", position: [1, 1, 0], borderColor: "red" },
    { size: 1, color: "#F3F5EC", position: [2, 1, 0], borderColor: "red" },
    { size: 1, color: "#F3F5EC", position: [1, 2, 0], borderColor: "red" },

    { size: 1, color: "black", position: [3, 0, 0], borderColor: "green" },
    { size: 1, color: "#F3F5EC", position: [2, 0, 0], borderColor: "green" },
    { size: 1, color: "#F3F5EC", position: [3, 1, 0], borderColor: "green" },
  ],
};

function App() {
  const [v, changeV] = useState("A");

  return (
    <>
      <Space
        style={{
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography style={{ fontSize: "16px", fontWeight: '700' }}> 选择 </Typography>
        <Radio.Group
          size={"large"}
          onChange={(e) => changeV(e.target.value)}
          value={v}
        >
          <Radio value={"A"}>A</Radio>
          <Radio value={"B"}>B</Radio>
          <Radio value={"C"}>C</Radio>
          <Radio value={"D"}>D</Radio>
        </Radio.Group>
      </Space>

      <Builder boxConfig={boxConfig[v]} />
    </>
  );
}

export default App;
