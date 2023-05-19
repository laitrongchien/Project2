import { Exclude } from 'class-transformer';
import { DEFAULT_AVATAR } from 'src/modules/users/user.constants';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class AdminEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({
    default: null,
  })
  name: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column({ default: null })
  email: string;

  @Column({})
  @Exclude()
  password: string;

  @Column({
    default: DEFAULT_AVATAR,
  })
  avatar: string;
}

export default AdminEntity;
