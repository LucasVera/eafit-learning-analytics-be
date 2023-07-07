import { Column, DataType, Model, PrimaryKey } from "sequelize-typescript"

export interface ClassScreenshotProperties {
  id: number,
  classId: number,
  screenshotUrl: string,
  screenshotTakenAt: number,
  numberOfFaces: number,
  averageAttentionLevel: number,
  maxAttentionLevel: number,
  minAttentionLevel: number,
  hasUncertainFaceAnalysis: boolean,
}

export class ClassScreenshots extends Model implements ClassScreenshotProperties {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number

  @Column(DataType.INTEGER)
  classId: number

  @Column(DataType.STRING)
  screenshotUrl: string

  @Column(DataType.INTEGER)
  screenshotTakenAt: number

  @Column(DataType.INTEGER)
  numberOfFaces: number

  @Column(DataType.INTEGER)
  averageAttentionLevel: number

  @Column(DataType.INTEGER)
  maxAttentionLevel: number

  @Column(DataType.INTEGER)
  minAttentionLevel: number

  @Column(DataType.BOOLEAN)
  hasUncertainFaceAnalysis: boolean
}
