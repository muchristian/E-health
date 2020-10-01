"use strict";
import authUtils from "../../utils/authUtil";

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "mucyo",
          lastName: "christian",
          email: "mucyochristian2@gmail.com",
          phoneNumber: "+250781468561",
          password: await authUtils.hashPassword("chris@32"),
          is_verified: 1,
          email_verified_at: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
