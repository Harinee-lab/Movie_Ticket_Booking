const User = require("../models/user.model");
const { USER_ROLE, USER_STATUS, STATUS } = require("../utils/constants");
const createUser = async (data) => {
  try {
    if (
      data.userRole != USER_ROLE.customer &&
      data.userRole != USER_ROLE.admin &&
      data.userRole != USER_ROLE.client
    ) {
    }
    if (!data.userRole || data.userRole == USER_ROLE.customer) {
      if (data.userStatus && data.userStatus != USER_STATUS.approved) {
        throw {
          err: "we cannot set any other status for customer",
          code: STATUS.BAD_REQUEST,
        };
      }
    }
    if (data.userRole && data.userRole != USER_ROLE.customer) {
      data.userStatus = USER_STATUS.pending;
    }
    const response = await User.create(data);
    return response;
  } catch (error) {
    console.log(error);
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: STATUS.BAD_REQUEST };
    }
    throw error;
  }
};
const getUserByemail = async (email) => {
  try {
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      throw {
        err: "No user found for the given email",
        code: STATUS.NOT_FOUND,
      };
    }
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw { err: "No user found for the given id", code: 404 };
    }
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const updateUserRoleorStatus = async (data, id) => {
  try {
    let updateQuery = {};
    if (data.userRole) updateQuery.userRole = data.userRole;
    if (data.userStatus) updateQuery.userStatus = data.userStatus;
    let response = await User.findOneAndUpdate(
      {
        _id: id,
      },
      updateQuery,
      { new: true, runValidators: true }
    );
    if (!response)
      throw {
        err: "No user found for the given id",
        code: STATUS.NOT_FOUND,
      };
    return response;
  } catch (error) {
    console.log(error);
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw {
        err: "The properties does validate te constraints, please check ",
        code: STATUS.BAD_REQUEST,
      };
    }
    throw error;
  }
};
module.exports = {
  createUser,
  getUserByemail,
  getUserById,
  updateUserRoleorStatus,
};
