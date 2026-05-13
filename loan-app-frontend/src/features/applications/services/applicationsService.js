import dataService from "../../../services/dataService";

const applicationsService = {
  list: dataService.getApplications,
  create: dataService.createApplication,
};

export default applicationsService;
