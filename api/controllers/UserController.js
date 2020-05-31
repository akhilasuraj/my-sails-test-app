/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  register: async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    let user = {
      name: name,
      email: email,
      password: password,
    };

    const emailExist = await User.findOne({ email: email });
    if (emailExist)
      return res
        .status(400)
        .send({ error: true, message: "user already exists" });

    User.create(user).exec((error) => {
      if (error) {
        return res.status(500).send({ error: true, message: "database error" });
      }
      return res.status(200).send({ error: false, message: "success" });
    });
  },
};
