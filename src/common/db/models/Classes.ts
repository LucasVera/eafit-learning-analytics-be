import { Column, DataType, Model, PrimaryKey } from 'sequelize-typescript'

export interface ClassProperties {
  id: number,
  teacherName?: number,
  courseId?: string,
  mainTopic?: string,
  subTopic?: string,
  studentsEducationLevel?: string,
  startedAt?: number,
  endedAt?: number,
}

export class Classes extends Model implements ClassProperties {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number

  @Column(DataType.INTEGER)
  teacherName: number

  @Column(DataType.STRING)
  courseId: string

  @Column(DataType.STRING)
  mainTopic: string

  @Column(DataType.STRING)
  subTopic: string

  @Column(DataType.STRING)
  studentsEducationLevel: string

  @Column(DataType.INTEGER)
  startedAt: number

  @Column(DataType.INTEGER)
  endedAt: number
}




