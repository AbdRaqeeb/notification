import Joi from 'joi';

export  function validateInquiry(inquiry) {
    const schema = Joi.object({
        user_name: Joi.string().required(),
        email: Joi.string().required().email(),
        c_email: Joi.string().required(),
        message: Joi.string().required(),
        phone: Joi.string().required(),
        reference: Joi.string().required(),
        customer_name: Joi.string().required(),
        title: Joi.string().required()
    });
    return schema.validate(inquiry);
}

export  function validateVerify(message) {
    const schema = Joi.object({
        token: Joi.string().required(),
        email: Joi.string().required().email(),
    });
    return schema.validate(message);
}

export  function validateTour(tour) {
    const schema = Joi.object({
        user_name: Joi.string().required(),
        customer_name: Joi.string().required(),
        email: Joi.string().required().email(),
        title: Joi.string().required(),
        reference: Joi.string().required(),
        charges: Joi.string().required(),
        date: Joi.string().required(),
        time: Joi.string().required(),
        phone: Joi.string().required()
    });
    return schema.validate(tour);
}