import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import {
  AxesHelper,
  Color,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Box, IBoxConfig } from "../../Object/Box";

const BuilderComp = forwardRef((props: { boxConfig: IBoxConfig[] }, ref) => {
  const domRef = useRef<HTMLDivElement>(null);
  const scene = useRef<Scene | null>(null);
  const camera = useRef<PerspectiveCamera | null>(null);
  const renderer = useRef<WebGLRenderer | null>(null);

  const initScene = () => {
    scene.current = new Scene();
    scene.current.background = new Color("lightblue");
    camera.current = new PerspectiveCamera(
      75,
      window.innerWidth / (window.innerHeight - 40),
      0.1,
      1000,
    );
    renderer.current = new WebGLRenderer({});
    renderer.current.setSize(window.innerWidth, window.innerHeight - 40);

    domRef.current?.appendChild(renderer.current.domElement);
  };

  const initCube = () => {
    const s = scene.current!;

    props.boxConfig.forEach((cfg) => {
      new Box(cfg).mountTo(s);
    });

    if (camera.current) {
      camera.current.position.z = 10;
    }
  };
  const initControl = () => {
    const controls = new OrbitControls(
      camera.current!,
      renderer.current!.domElement,
    );

    controls.enablePan = true; // 启用平移
    controls.enableZoom = true; // 启用缩放
    controls.enableRotate = true; // 启用旋转

    // 设置缩放范围
    controls.minDistance = 3;
    controls.maxDistance = 10;

    // 设置旋转角度范围
    controls.minPolarAngle = 0; // 垂直旋转的最小角度（弧度）
    controls.maxPolarAngle = Math.PI; // 垂直旋转的最大角度（弧度）

    return controls;
  };

  const initAxes = () => {
    const axesHelper = new AxesHelper(8); // 50是坐标轴的长度
    scene.current!.add(axesHelper);
  };

  useEffect(() => {
    initScene();
    initCube();
    initAxes();
    const controls = initControl();

    function animate() {
      requestAnimationFrame(animate);

      // 更新控制器
      controls.update();

      // 渲染场景
      renderer.current!.render(scene.current!, camera.current!);
    }

    animate();

    return () => {
      domRef.current?.removeChild(domRef.current?.childNodes?.[0]);
    };
  }, []);

  useImperativeHandle(ref, () => {
    return {
      scene,
      camera,
      renderer,
    };
  });

  return <div ref={domRef}></div>;
});

export default BuilderComp;
