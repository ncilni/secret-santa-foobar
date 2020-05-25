const Joi = require("joi");

const createActivitySchema = Joi.object()
  .options({
    abortEarly: false,
  })
  .keys({
    inviter: Joi.object().keys({
      name: Joi.string().min(2).max(40).required(),
      email: Joi.string()
        .email({
          minDomainAtoms: 2,
        })
        .required(),
    }),
    invitationMessage: Joi.string().min(5).max(1000).required(),
    invitees: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().min(2).max(40).required(),
        email: Joi.string()
          .email({
            minDomainAtoms: 2,
          })
          .required(),
        assigned: Joi.object().keys({
          name: Joi.string().min(2).max(40).required(),
          email: Joi.string()
            .email({
              minDomainAtoms: 2,
            })
            .required(),
        }),
      })
    ),
  });

module.exports = createActivitySchema;
