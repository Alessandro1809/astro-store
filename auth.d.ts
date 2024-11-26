import {DefaultSession, DefaultUser} from '@auth/core/types';

declare module '@auth/core/types' {
    export interface User extends DefaultUser {
        role?: string;

    }
    interface Session extends DefaultSession {
        user: User

    }
}