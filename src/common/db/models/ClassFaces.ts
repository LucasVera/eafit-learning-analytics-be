import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey } from "sequelize-typescript"
import { Classes } from "./Classes"
import { ClassScreenshots } from "./ClassScreenshots"

export interface ClassFaceProperties {
  id: number,
  classId: number,
  screenshotId: number,
  attentionLevel: number,
  faceId: string,
  faceScreenshotIndex: number,
  isUncertainAnalysis: boolean,
  faceImageUrl: string,
  faceRawEmotions: string,
  analysisCreatedAt: number,
}

export class ClassFaces extends Model implements ClassFaceProperties {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number

  @ForeignKey(() => Classes)
  @Column(DataType.INTEGER)
  classId: number

  @BelongsTo(() => Classes)
  class: Classes

  @ForeignKey(() => ClassScreenshots)
  @Column(DataType.INTEGER)
  screenshotId: number

  @BelongsTo(() => ClassScreenshots)
  classScreenshot: ClassScreenshots

  @Column(DataType.INTEGER)
  attentionLevel: number

  @Column(DataType.STRING)
  faceId: string

  @Column(DataType.INTEGER)
  faceScreenshotIndex: number

  @Column(DataType.BOOLEAN)
  isUncertainAnalysis: boolean

  @Column(DataType.STRING)
  faceImageUrl: string

  @Column(DataType.JSONB)
  faceRawEmotions: string

  @Column(DataType.INTEGER)
  analysisCreatedAt: number
}
