import { SQSEvent } from "aws-lambda"
import { inspect } from "util"
import { AnalysisResultMessage } from "../../common/types/AttentionAnalysis"
import { loadDb } from "src/common/db/models"
import AnalysisService from "src/common/services/AnalysisService"

const processMessage = async (analysisResult: AnalysisResultMessage): Promise<void> => {
  await AnalysisService.processFaceAnalysisResults(analysisResult)
}

const processAnalysisResults = async (event: SQSEvent) => {
  try {
    await loadDb()
    const { Records } = event
    console.log('Processing analysis result', Records.length, inspect(Records, false, 8))
    const promises = Records.map(record => processMessage(JSON.parse(JSON.parse(record.body).Message) as AnalysisResultMessage))
    await Promise.all(promises)
  }
  catch (ex) {
    console.log('Error processing analysis results: ', ex, inspect(event))
  }
}

export const main = processAnalysisResults
