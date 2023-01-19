import bcrypt from "bcrypt";

import prisma from "@/lib/prisma/utils/prismaClient.js";

export const signIn = async (user) => {
  try {
    const email = user.email.trim();
    const password = user.password.trim();

    // Check if email and password are not empty.
    if (email === "" || password === "")
      return { error: "Fieds can not be empty !" };

    // Check if email is valid.
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(regEx)) return { error: "Email is not valid !" };

    const existingUser = await prisma.user.findUniqueOrThrow({
      where: { email: email },
    });

    if (existingUser) {
      // Compare hash of passwords.
      if (!bcrypt.compareSync(password, existingUser.password))
        return { error: "Bad password !" };

      return {
        user: {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          emailVerified: existingUser.emailVerified,
          image: existingUser.image,
        },
      };
    }
  } catch (error) {
    return { error };
  }
};

export const signUp = async (user) => {
  try {
    const name = user.name.trim();
    const email = user.email.trim();
    let password = user.password.trim();
    const confirmPassword = user.confirmPassword.trim();

    // Check if name is empty;
    if (name === "") return { error: "Name must not be empty !" };

    // Check if email is empty.
    if (email === "") return { error: "Email must not be empty !" };

    // Check if email is valid.
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if (!email.match(regEx)) return { error: "Email is not valid !" };

    // Check if user already exist.
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) return { error: "Email already taken !" };

    // Check if passwords are empty.
    if (password === "" || confirmPassword === "")
      return { error: "Passwords must not be empty !" };

    // Check if password are identical.
    if (password !== confirmPassword)
      return { error: "Passwords should be identical !" };

    // Hash the password.
    password = bcrypt.hashSync(password, 12);

    // Create user in DB.
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });

    return { user: newUser };
  } catch (error) {
    return { error };
  }
};
