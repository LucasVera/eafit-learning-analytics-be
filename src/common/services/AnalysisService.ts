import { ClassFaces } from "../db/models/ClassFaces"
import { ClassScreenshots } from "../db/models/ClassScreenshots"
import { AnalysisResultMessage } from "../types/AttentionAnalysis"
import { getMaxEntryByPropName, getMinEntryByPropName } from "../util/array"

export default {
  async processFaceAnalysisResults(analysisResult: AnalysisResultMessage): Promise<void> {
    const {
      classId,
      averageAttentionLevel,
      faceDetails,
      screenshotTime,
      s3BucketName,
      s3ObjectKey
    } = analysisResult
    const screenshotId = screenshotTime

    const s3Url = `https://${s3BucketName}.s3.amazonaws.com/${s3ObjectKey}`

    const classScreenshot = await ClassScreenshots.create({
      id: screenshotId,
      classId,
      screenshotUrl: s3Url,
      screenshotTakenAt: screenshotTime,
      numberOfFaces: faceDetails.length,
      averageAttentionLevel,
      maxAttentionLevel: getMaxEntryByPropName(faceDetails, 'attentionLevel')?.attentionLevel,
      minAttentionLevel: getMinEntryByPropName(faceDetails, 'attentionLevel')?.attentionLevel,
      hasUncertainFaceAnalysis: faceDetails.some(face => face.isUncertainAnalysis)
    })

    const promises = faceDetails.map(face => {
      const {
        croppedFaceDetails: {
          faceId,
          s3BucketName: faceS3BucketName,
          s3LocationKey: faceS3LocationKey,
        },
        attentionLevel,
        index,
        isUncertainAnalysis,
        analysisCreatedAt,
      } = face

      const faceS3Url = `https://${faceS3BucketName}.s3.amazonaws.com/${faceS3LocationKey}`

      return ClassFaces.create({
        classId,
        screenshotId,
        attentionLevel,
        faceId,
        faceScreenshotIndex: index,
        isUncertainAnalysis: isUncertainAnalysis,
        faceImageUrl: faceS3Url,
        faceRawEmotions: JSON.stringify(face.Emotions),
        analysisCreatedAt,
      })
    })

    await Promise.all(promises)
  }
}
