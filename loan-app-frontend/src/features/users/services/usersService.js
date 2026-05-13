import userService from "../../../services/userService";

const usersService = {
  list: userService.getUsers,
  update: userService.updateUser,
  remove: userService.deleteUser,
  changePassword: userService.changeUserPassword,
  register: userService.registerUser,
};

export default usersService;
