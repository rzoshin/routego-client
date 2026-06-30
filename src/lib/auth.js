import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.MONGODB_NAME || "routego-auth");

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL, 

    database: mongodbAdapter(db, {
    client
  }),

    emailAndPassword: { 
    enabled: true, 
  }, 

  socialProviders: { 
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    }, 
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "user"
      },
      isBlocked: {
        defaultValue: false
      }
  },
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 24 * 30,
    },
  },
  plugins: [
    jwt({
      jwt: {
        definePayload: ({ user }) => ({
          email: user.email,
          role: user.role,
          isBlocked: user.isBlocked ?? false,
          name: user.name,
        }),
      },
    }),
  ],
  
});