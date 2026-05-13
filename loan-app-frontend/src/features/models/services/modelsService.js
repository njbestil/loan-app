import dataService from "../../../services/dataService";

const modelsService = {
  listCreditScores: dataService.getCreditScore,
  listRiskScores: dataService.getRiskScore,
  createCreditScore: dataService.createCreditScore,
  createRiskScore: dataService.createRiskScore,
  removeCreditScore: dataService.deleteCreditScore,
  removeRiskScore: dataService.deleteRiskScore,
};

export default modelsService;
