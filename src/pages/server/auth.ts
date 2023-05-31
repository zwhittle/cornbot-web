import { DefaultSession, NextAuthOptions } from 'next-auth'
import Discord from 'next-auth/providers/discord'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
      },
    }),
    async redirect({ url, baseUrl }) {
      // allow relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // allow callbackURLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      // allow URLs on localhost
      else if (url.startsWith('http://localhost/')) return url

      // return to index
      return baseUrl
    },
  },
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
}
