import { signUp } from "@/lib/prisma/utils/users.js";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;

      const { user, error } = await signUp(data);

      if (error) throw new Error(error);

      return res.status(200).json({
        message: "User successfully created !",
        user,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} is not allowed.`);
};

export default handler;
