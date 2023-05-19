export interface AssetModel {
  id: number;
  name: string;
  image: string;
  cpe: string;
  category: string;
  manufacturer: string;
  numOfAssets: number;
}

export interface AssetModelQuery {
  categoryId?: number;
  manufacturerId?: number;
}

export interface NewAssetModel {
  name: string;
  categoryId: number;
  manufacturerId: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  assetModels: number;
  licenses: number;
}

export interface NewCategory {
  name: string;
}

export interface Department {
  id: number;
  name: string;
  assets: number;
  users: number;
  location: string;
}

export interface DepartmentQuery {
  locationId?: number;
}

export interface NewDepartment {
  name: string;
  locationId: number;
}

export interface Manufacturer {
  id: number;
  name: string;
  image: string;
  assetModels: number;
  licenses: number;
}

export interface NewManufacturer {
  name: string;
}

export interface Status {
  id: number;
  name: string;
  color: string;
  numOfAssets: number;
}

export interface NewStatus {
  name: string;
  color: string;
}

export interface Supplier {
  id: number;
  name: string;
  assets: number;
  licenses: number;
}

export interface NewSupplier {
  name: string;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  numOfDepartments: number;
}

export interface NewLocation {
  name: string;
  address: string;
}

export interface Deprecation {
  id: number;
  name: string;
  months: number;
  category: string;
}

export interface NewDeprecation {
  name: string;
  months: number;
  categoryId: number;
}

export interface Notification {
  itemId: string;
  name: string;
  type: string;
  expiration_date: string;
}

export enum NotificationType {
  ASSET = 'Asset',
  LICENSE = 'License',
}

export enum CheckType {
  CHECKIN = 'checkin',
  CHECKOUT = 'checkout',
}

export interface Asset {
  id: number;
  name: string;
  image: string;
  assetModel: string;
  department: string;
  purchase_date: string;
  purchase_cost: number;
  current_cost: number;
  supplier: string;
  status: string;
  statusColor: string;
  username: string;
  check_type: CheckType;
  deletedAt: string;
}

export interface NewAsset {
  name: string;
  purchase_cost: number;
  purchase_date: string;
  assetModelId: number;
  departmentId: number;
  statusId: number;
  supplierId: number;
}

export interface CheckoutAsset {
  assetId: number;
  statusId: number;
  userId: number;
  checkout_date: string;
  checkout_note: string;
}

export interface CheckinAsset {
  assetId: number;
  statusId: number;
  departmentId: number;
  checkin_date: string;
  checkin_note: string;
}

export interface AssetQuery {
  assetModelId?: number;
  departmentId?: number;
  statusId?: number;
  supplierId?: number;
  userId?: number;
}

export interface AssetHistory {
  id: number;
  assetId: number;
  assetName: string;
  userId: number;
  userName: string;
  checkout_date: string;
  checkin_date: string;
}

export interface AssetHistoryQuery {
  assetId?: number;
  userId?: number;
}

export interface AssetMaintenance {
  id: number;
  asset_id: string;
  asset_name: string;
  supplier: string;
  start_date: string;
  end_date: string;
  cost: number;
  note: string;
}

export interface AssetMaintenanceQuery {
  assetId?: number;
}

export interface NewAssetMaintenance {
  assetId: number;
  supplierId: number;
  start_date: string;
  end_date: string;
  cost: number;
  note: string;
}

export interface SourceCode {
  id: number;
  name: string;
  owner: string;
  description: string;
  isPrivate: string;
  url: string;
}

export interface NewSourceCode {
  name: string;
  owner: string;
  description: string;
  isPrivate: boolean;
  url: string;
}

export interface CheckoutSourceCode {
  sourceCodeId: number;
  userId: number;
  start_date: string;
  start_note: string;
}

export interface CheckinSourceCode {
  sourceCodeToUserId: number;
  end_date: string;
  end_note: string;
}

export interface SourceCodeToUser {
  id: number;
  sourceCodeId: number;
  sourceCodeName: string;
  userId: number;
  userName: string;
  start_date: string;
  end_date: string;
}

export interface SourceCodeToUserQuery {
  sourceCodeId?: number;
  userId?: number;
  withDeleted?: boolean;
}

export interface DigitalContent {
  id: number;
  name: string;
  owner: string;
  description: string;
  isPrivate: string;
  url: string;
}

export interface NewDigitalContent {
  name: string;
  owner: string;
  description: string;
  isPrivate: boolean;
  url: string;
}

export interface CheckoutDigitalContent {
  digitalContentId: number;
  sourceCodeId: number;
  checkout_date: string;
  checkout_note: string;
}

export interface CheckinDigitalContent {
  digitalContentToSourceCodeId: number;
  checkin_date: string;
  checkin_note: string;
}

export interface DigitalContentToSourceCode {
  id: number;
  digitalContentId: number;
  digitalContentName: string;
  sourceCodeId: number;
  sourceCodeName: string;
  checkout_date: string;
  checkin_date: string;
}

export interface DigitalContentToSourceCodeQuery {
  digitalContentId?: number;
  sourceCodeId?: number;
  withDeleted?: boolean;
}

export interface License {
  id: number;
  name: string;
  key: string;
  purchase_cost: string;
  purchase_date: string;
  expiration_date: string;
  seats: string;
  available: string;
  category: string;
  manufacturer: string;
  supplier: string;
}

export interface LicenseQuery {
  categoryId?: number;
  manufacturerId?: number;
  supplierId?: number;
}

export interface CheckoutLicense {
  licenseId: number;
  assetId: number;
  checkout_date: string;
  checkout_note: string;
}

export interface CheckinLicense {
  licenseToAssetId: number;
  checkin_date: string;
  checkin_note: string;
}

export interface LicenseToAsset {
  id: number;
  licenseId: number;
  licenseName: string;
  assetId: number;
  assetName: string;
  checkout_date: string;
  checkin_date: string;
}

export interface LicenseToAssetQuery {
  licenseId?: number;
  assetId?: number;
  withDeleted?: boolean;
}

export interface NewLicense {
  name: string;
  key: string;
  purchase_cost: string;
  purchase_date: string;
  expiration_date: string;
  seats: number;
  categoryId: number;
  manufacturerId: number;
  supplierId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  birthday: string;
  department: string;
  assets: number;
}

export interface UserQuery {
  departmentId?: number;
}

export interface NewUser {
  name: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  birthday: string;
  departmentId: number;
}

export interface Inventory {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  department: string;
  assets: number;
  remaining: number;
  note: string;
}

export interface NewInventory {
  name: string;
  start_date: string;
  end_date: string;
  departmentId: number;
  note: string;
}

export interface AssetToInventory {
  id: number;
  asset_name: string;
  asset_id: number;
  purchase_date: string;
  purchase_cost: string;
  old_cost: number;
  old_status: string;
  new_cost: number;
  new_status: string;
  check: string;
}

export interface UpdateAssetToInventory {
  assetId: number;
  new_cost: number;
  newStatusId: number;
  check: boolean;
}

export enum Actions {
  CREATE,
  UPDATE,
  CLONE,
}

export interface RequestAsset {
  id: number;
  name: string;
  username: string;
  category: string;
  categoryId: number;
  date: string;
  note: string;
  status: string;
}

export interface AcceptRequest {
  id: number;
  assetId: number;
}

export enum RequestAssetStatus {
  REQUESTED = 'Requested',
  REJECTED = 'Rejected',
  ACCEPTED = 'Accepted',
}

export interface MenuItem {
  name: string;
  destination: string;
}
