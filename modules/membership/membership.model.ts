// membership.model.ts

import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Membership extends Model<Membership> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  membershipId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isIn: [['AnnualBasic', 'MonthlyPremium']],
    },
  })
  membershipType: 'AnnualBasic' | 'MonthlyPremium';

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false, // Null for monthly memberships
  })
  dueDate: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  totalAmount: number;



  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isFirstMonth: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  invoiceLink: string; 
}
