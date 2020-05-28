const Joi = require("@hapi/joi");

const createActivitySchema = Joi.object()
  .options({
    abortEarly: false,
  })
  .keys({
    inviter: Joi.object().keys({
      name: Joi.string().min(2).max(40).required(),
      email: Joi.string().email().required(),
    }),
    invitationMessage: Joi.string().min(5).max(1000).required(),
    invitees: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().min(2).max(40).required(),
        email: Joi.string().email().required(),
        assigned: Joi.object().keys({
          name: Joi.string().min(2).max(40).required(),
          email: Joi.string().email().required(),
        }),
      })
    ),
  });

module.exports = createActivitySchema;
