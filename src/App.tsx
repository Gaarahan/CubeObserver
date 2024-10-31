import { IBoxConfig, SideTypeEnum } from "./Object/Box";
import { Radio, Space, Typography } from "antd";
import { useState } from "react";
import SceneComp from "./Components/Scene";

const boxConfig: Record<string, IBoxConfig[]> = {
  A: [
    { position: [0, 0, 0], borderColor: "blue", blackSide: SideTypeEnum.top },
    { position: [1, 0, 0], borderColor: "blue" },
    { position: [0, 1, 0], borderColor: "blue" },

    { position: [1, 1, 0], borderColor: "red", blackSide: SideTypeEnum.top },
    { position: [2, 1, 0], borderColor: "red" },
    { position: [1, 2, 0], borderColor: "red" },

    { position: [3, 0, 0], borderColor: "green", blackSide: SideTypeEnum.top },
    { position: [2, 0, 0], borderColor: "green" },
    { position: [3, 1, 0], borderColor: "green" },
  ],
  B: [
    { position: [0, 0, 0], borderColor: "blue", blackSide: SideTypeEnum.back },
    { position: [0, 1, 0], borderColor: "blue" },
    { position: [0, 0, -1], borderColor: "blue" },

    {
      position: [1, 0, -1],
      borderColor: "red",
      blackSide: SideTypeEnum.front,
    },
    { position: [1, 0, 0], borderColor: "red" },
    { position: [1, 1, -1], borderColor: "red" },

    {
      position: [1, 2, 0],
      borderColor: "green",
      blackSide: SideTypeEnum.front,
    },
    { position: [1, 2, -1], borderColor: "green" },
    { position: [1, 1, 0], borderColor: "green" },
  ],
  C: [
    { position: [0, 0, 0], borderColor: "blue", blackSide: SideTypeEnum.back },
    { position: [0, 1, 0], borderColor: "blue" },
    { position: [0, 0, -1], borderColor: "blue" },

    {
      position: [1, 1, 0],
      borderColor: "red",
      blackSide: SideTypeEnum.front,
    },
    { position: [1, 0, 0], borderColor: "red" },
    { position: [1, 1, -1], borderColor: "red" },

    {
      position: [0, 2, 0],
      borderColor: "green",
      blackSide: SideTypeEnum.top,
    },
    { position: [1, 2, 0], borderColor: "green" },
    { position: [0, 3, 0], borderColor: "green" },
  ],
  D: [],
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
        <Typography style={{ fontSize: "16px", fontWeight: "700" }}>
          选择
        </Typography>
        <Radio.Group
          size={"large"}
          onChange={(e) => {
            changeV(e.target.value);
          }}
          value={v}
        >
          <Radio value={"A"}>A</Radio>
          <Radio value={"B"}>B</Radio>
          <Radio value={"C"}>C</Radio>
          <Radio value={"D"}>D</Radio>
        </Radio.Group>
        <Typography.Link href={"https://github.com/Gaarahan/CubeObserver"}>
          Source code
        </Typography.Link>
      </Space>
      <SceneComp value={boxConfig[v]} />
    </>
  );
}

export default App;
