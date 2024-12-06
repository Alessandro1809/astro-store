
import { v4 as UUID} from 'uuid'; 
import bcrypt from 'bcryptjs';
import { db, Role, User, Product, ProductImage } from 'astro:db';
import { seedProducts } from './seed-data';
// https://astro.build/db/seed
export default async function seed() {
	
	const roles = [ 
		{id:'admin', name:'Admistrador'},
		{id:'user', name:'cliente'}
	];

	const johnDoe = {
		id: 'ABC-123-JOHN',//UUID(),
		name: 'John Doe',
		email: 'M0x9F@example.com',
		password: bcrypt.hashSync('password', 10),
		createdAt: new Date(),
		role:'admin'
	};

	const janeDoe = {
		id: 'ABC-123-JANE',//UUID(),
		name: 'Jane Doe',
		email: 'Fk9j0@example.com',		
		password: bcrypt.hashSync('passwrd', 10),
		createdAt: new Date(),
		role:'user'
	};


	await db.insert(Role).values(roles);

	await db.insert(User).values([johnDoe, janeDoe]);

	//TODO:Insertar Productos en batch

	const querys:any = [];

	seedProducts.map(p => {
		const product = {
			id: UUID(),
			description:p.description, 
			price: p.price,
			sizes: p.sizes.join(','),
			slug: p.slug,
			stock: p.stock,
			tags: p.tags.join(','),
			title: p.title,
			type: p.type,
			user: johnDoe.id,
			gender: p.gender
		}

		querys.push(db.insert(Product).values(product));


		p.images.forEach(img => {
			const image={
				id:UUID(),
				image:img,
				productId:product.id
			}
			querys.push(db.insert(ProductImage).values(image));
		});

		

	})
	//Si falla una regreso un rollback

	await db.batch(querys);

}
