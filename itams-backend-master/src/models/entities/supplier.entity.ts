import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Asset from './asset.entity';
import { AssetMaintenance } from './assetMaintenance.entity';
import License from './license.entity';

@Entity()
export class Supplier extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  name: string;

  @OneToMany(() => Asset, (asset) => asset.supplier)
  assets: Asset[];

  @OneToMany(
    () => AssetMaintenance,
    (assetMaintenance) => assetMaintenance.supplier,
  )
  assetMaintenances: AssetMaintenance[];

  @OneToMany(() => License, (license) => license.supplier)
  licenses: License[];
}

export default Supplier;
