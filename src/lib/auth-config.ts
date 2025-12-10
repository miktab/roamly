import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

async function linkCheckoutsToUser(userId: string, email: string) {
  try {
    // Find all checkouts for this email that aren't linked to a user
    const checkouts = await prisma.checkout.findMany({
      where: {
        email: email,
        userId: null
      }
    })

    // Update checkouts to link them to this user
    for (const checkout of checkouts) {
      await prisma.checkout.update({
        where: { checkoutId: checkout.checkoutId },
        data: { userId: userId }
      })

      // Create a Purchase record for each checkout
      const existingPurchase = await prisma.purchase.findUnique({
        where: { checkoutSessionId: checkout.checkoutSessionId }
      })

      if (!existingPurchase) {
        await prisma.purchase.create({
          data: {
            userId: userId,
            checkoutSessionId: checkout.checkoutSessionId,
            productCategory: checkout.productCategory || "product", // Default fallback
            productType: checkout.productType || "unknown",
            productId: checkout.productId,
            totalOrder: checkout.totalOrder,
            siteName: checkout.siteName,
            productDescription: checkout.product_description,
            purchaseDate: checkout.checkoutTime,
          }
        })
      }
    }

    console.log(`Linked ${checkouts.length} checkouts to user ${userId}`)
  } catch (error) {
    console.error('Error linking checkouts to user:', error)
  }
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        // Link any existing checkouts to this user account
        await linkCheckoutsToUser(user.id, user.email)

        return {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const
  },
  pages: {
    signIn: "/auth/signin"
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.id = user.id
      }
      return token
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: async ({ session, token }: any) => {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  }
}