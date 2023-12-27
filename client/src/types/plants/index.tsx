export interface Plant {
  id: string;
  name: string;
  operationsCluster: string;
  type: string;
  nameAbbreviation: string;
  parentName: string;
  parentId: string;
  segment: string[];
  zebra: boolean | string;
  active: boolean | string;
}

export type Plants = { total: number; data: Plant[] };

export type PlantDetail = { data: Plant };
