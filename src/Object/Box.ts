import {
  BoxGeometry,
  Color,
  DoubleSide,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Scene,
} from "three";

export interface IBoxConfig {
  position: [number, number, number];
  borderColor: string;
  blackSide?: "front" | "back" | "left" | "right" | "top" | "bottom";
}

export class Box {
  private readonly cube: Mesh;
  private readonly coloredBox: Mesh | null = null;

  constructor({ position, borderColor, blackSide }: IBoxConfig) {
    const geometry = new BoxGeometry(1, 1, 1);

    if (blackSide) {
      const white = new Color("#F3F5EC");
      const black = new Color("black");

      const allSideMaterials = new Array(6)
        .fill(new MeshBasicMaterial({ color: white }));

      allSideMaterials[0] = new MeshBasicMaterial({ color: black });

      console.log(allSideMaterials);
      this.cube = new Mesh(geometry, allSideMaterials);
    } else {
      const material = new MeshBasicMaterial({
        color: new Color("#F3F5EC"),
      });
      this.cube = new Mesh(geometry, material);
    }

    const edges = new EdgesGeometry(geometry);
    const edgeMaterial = new LineBasicMaterial({
      color: new Color(borderColor),
    });
    const line = new LineSegments(edges, edgeMaterial);
    this.cube.add(line);

    this.cube.position.x = position[0];
    this.cube.position.y = position[1];
    this.cube.position.z = position[2];
  }

  mountTo(scene: Scene) {
    scene.add(this.cube);
    if (this.coloredBox) scene.add(this.coloredBox);
  }
}
