// import GitHub from '@auth/core/providers/github';
import { defineConfig } from 'auth-astro';
import Credentials from '@auth/core/providers/credentials';
import { db, eq, User } from 'astro:db';
import bcrypt from 'bcryptjs';
import type { AdapterUser } from '@auth/core/adapters';


export default defineConfig({
  providers: [
    //TODO:
    // GitHub({
    //   clientId: import.meta.env.GITHUB_CLIENT_ID,
    //   clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    // }),

    Credentials({
        credentials: {//establece las credenciales que se pueden usar con el formulario de Auth js
            email: { label: 'Correo', type: 'email' },
            password: { label: 'Password', type: 'password' },
        },
        authorize: async ({email, password}) => {

            const [user] = await db.select().from(User).where(eq(User.email, email as string));//Trae de la base de datos el usuario que conincida con las credenciales

            if (!user) {//valida si el usuario se encontro
                throw new Error('Usuario o encontrado');
            }

            if (!bcrypt.compareSync(password as string, user.password)) {//valida que las credenciales coincidan
                throw new Error('Contraseña incorrecta');
            }

            const { password: _, ...userWithoutPassword } = user;//resto del usuario

            return userWithoutPassword;
        }
    })
  ],

  callbacks: {
    jwt:({token, user})=>{
        if (user) {
        token.user = user 
        }
      return token
    },
    session:({session, token})=>{
        session.user = token.user as AdapterUser
        console.log(session.user);
        
      return session
    }
  },
});