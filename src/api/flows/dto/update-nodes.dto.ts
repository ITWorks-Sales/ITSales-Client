export type UpdateNodesDTO = {
  nodes: {
    id: string;
    type: string;
    position: {
      x: number;
      y: number;
    };
  }[];
};
