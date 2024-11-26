
import { v4 as UUID} from 'uuid'; 
import bcrypt from 'bcryptjs';
import { db, Role, User } from 'astro:db';
// https://astro.build/db/seed
export default async function seed() {
	
	const roles = [ 
		{id:'admin', name:'Admistrador'},
		{id:'user', name:'cliente'}
	];

	const johnDoe = {
		id: UUID(),
		name: 'John Doe',
		email: 'M0x9F@example.com',
		password: bcrypt.hashSync('password', 10),
		createdAt: new Date(),
		role:'admin'
	};

	const janeDoe = {
		id: UUID(),
		name: 'Jane Doe',
		email: 'Fk9j0@example.com',		
		password: bcrypt.hashSync('passwrd', 10),
		createdAt: new Date(),
		role:'user'
	};


	await db.insert(Role).values(roles);

	await db.insert(User).values([johnDoe, janeDoe]);




}
