import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import AssetToInventory from './assetToInventory.entity';
import Department from './department.entity';

@Entity()
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  start_date: Date;

  @Column({ default: null })
  end_date: Date;

  @ManyToOne(() => Department, (department) => department.inventories)
  department: Department;

  @OneToMany(
    () => AssetToInventory,
    (assetToInventory) => assetToInventory.inventory,
  )
  assetToInventories: AssetToInventory[];

  @Column({ default: null })
  note: string;
}

export default Inventory;
