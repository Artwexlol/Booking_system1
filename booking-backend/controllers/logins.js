// controllers/logins.js
const bcrypt = require("bcrypt");
const { knex } = require("../database");

const JWT_SECRET =
  process.env.IDOPONTFOGLALO_JWT_SECRETKEY ||
  "secretKeyForBookingSystem213edaefw";

const login = async (req, reply) => {
  const { email, password } = req.body;

  try {
    const user = await knex("user").where({ email }).first();

    if (!user) {
      return reply.code(401).send({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return reply.code(401).send({ message: "Invalid email or password" });
    }

    const token = await reply.jwtSign(
      { user_id: user.user_id, email: user.email },
      { expiresIn: "2h" }
    );

    reply.send({
      token,
      user: { user_id: user.user_id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    reply.code(500).send({ message: "Server error" });
  }
};

// ÚJ: POST /auth/register
const register = async (req, reply) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return reply.code(400).send({ message: "Missing required fields" });
  }

  try {
    const existing = await knex("user").where({ email }).first();
    if (existing) {
      return reply.code(409).send({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const created_at = new Date();

    const [newUser] = await knex("user")
      .insert({ name, email, password: hashedPassword, created_at })
      .returning(["user_id", "name", "email", "created_at"]);

    const token = await reply.jwtSign(
      { user_id: newUser.user_id, email: newUser.email },
      { expiresIn: "2h" }
    );

    return reply.code(201).send({
      token,
      user: {
        user_id: newUser.user_id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Server error" });
  }
};

const checkAuth = async (req, reply) => {
  try {
    await req.jwtVerify();
    reply.send({ message: "Authenticated", user: req.user });
  } catch (error) {
    reply.code(401).send({ message: "Invalid token" });
  }
};

const logout = async (req, reply) => {
  reply.send({ message: "Logged out successfully" });
};

module.exports = { login, logout, checkAuth, register };
