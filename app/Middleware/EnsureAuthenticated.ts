import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import { verify } from "jsonwebtoken";

export default class EnsureAuthenticated {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const authHeader = request.headers.name;

    if (!authHeader) {
      throw new Error("Token missing");
    }

    const [, token] = authHeader.split(" ");

    try {
      const { sub: user_id } = verify(token, "f57208dc433b16fc5d685fef83001e80");

      const user = await User.findOrFail(user_id);

      if (!user) {
        throw new Error("User does not exists!");
      }

      await next();
    } catch {
      throw new Error("Invalid token!");
    }
  }
}
