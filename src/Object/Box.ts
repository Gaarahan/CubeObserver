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

export enum SideTypeEnum {
  front,
  back,
  left,
  right,
  top,
  bottom,
}

export interface IBoxConfig {
  position: [number, number, number];
  borderColor: string;
  blackSide?: SideTypeEnum;
}

export class Box {
  private readonly cube: Mesh;
  private readonly coloredBox: Mesh | null = null;

  private getAllSideMaterials(side?: SideTypeEnum) {
    const white = new Color("#F3F5EC");
    const black = new Color("black");

    let allSideMaterials = new Array(6).fill(
      new MeshBasicMaterial({ color: white }),
    );

    if (side !== undefined) {
      allSideMaterials[side] = new MeshBasicMaterial({ color: black });
    }

    return allSideMaterials;
  }

  constructor({ position, borderColor, blackSide }: IBoxConfig) {
    const geometry = new BoxGeometry(1, 1, 1);

    const allSideMaterials = this.getAllSideMaterials(blackSide);
    this.cube = new Mesh(geometry, allSideMaterials);

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
