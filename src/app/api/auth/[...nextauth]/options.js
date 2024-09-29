import CredentialsProvider from 'next-auth/providers/credentials'

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    password: 'JohnDoe123'
  }
]

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = users.find(u => u.email === credentials.username && u.password === credentials.password)

        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  session: {
    jwt: true
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }

      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.email = token.email

      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: null // New users will be directed to this page on first sign in (leave null to disable)
  }
}
