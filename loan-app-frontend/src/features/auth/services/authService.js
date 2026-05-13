import userService from "../../../services/userService";

const authService = {
  register: userService.registerUser,
  login: userService.loginUser,
  forgotPassword: userService.forgotPassword,
  changePassword: userService.changePassword,
};

export default authService;
