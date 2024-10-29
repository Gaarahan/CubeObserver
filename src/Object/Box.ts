import {
  BoxGeometry,
  Color,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Scene,
} from "three";

export interface IBoxConfig {
  size: number;
  color: string;
  position: [number, number, number];
  borderColor: string;
}

export class Box {
  private cube: Mesh;

  constructor({ size, color, position, borderColor }: IBoxConfig) {
    const geometry = new BoxGeometry(size, size, size);
    const material = new MeshBasicMaterial({ color: new Color(color) });
    this.cube = new Mesh(geometry, material);

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
  }
}
