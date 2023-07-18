export interface AssetModel {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface Status {
  id: string;
  name: string;
}

export interface Supplier {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Asset {
  id: string;
  name: string;
  image: string;
  assetModel: string;
  department: string;
  supplier: string;
  status: string;
  statusColor: string;
}

export interface RequestAsset {
  id: string;
  category: string;
  date: string;
  status: string;
  note: string;
}

export enum RequestAssetStatus {
  REQUESTED = "Requested",
  REJECTED = "Rejected",
  ACCEPTED = "Accepted",
}

export interface NewRequestAsset {
  categoryId: string;
  note: string;
}

export enum Actions {
  CREATE,
  UPDATE,
  CLONE,
}
