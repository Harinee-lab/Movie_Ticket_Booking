const USER_STATUS = {
  approved: "APPROVED",
  pending: "PENDING",
  rejected: "REJECTED",
};
const USER_ROLE = {
  customer: "CUSTOMER",
  admin: "ADMIN",
  client: "CLIENT",
};
const STATUS_CODES = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
  CREATED: 201,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
};
const BOOKING_STATUS = {
  processing: "IN_PROCESS",
  cancelled: "CANCELLED",
  successful: "SUCCESSFUL",
};
const PAYMENT_STATUS = {
  success: "SUCCESS",
  failed: "FAILED",
  pending: "PENDING",
};
module.exports = {
  USER_ROLE,
  USER_STATUS,
  STATUS_CODES,
  PAYMENT_STATUS,
  BOOKING_STATUS,
};
