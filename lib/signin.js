import { compare } from 'bcrypt';
import { prisma } from './prismadb';

export const signInWithEmailAndPassword = async (email, password) => {
    try {
        if(!email || !password){
            throw Error('Email and Password required')
        }

        const user = await prisma.user.findUnique({
            where : {
                email : email
            }
        });

        if (!user) throw new Error('User does not exist');

        const validate = await compare(password, user.password);

        if(!validate) throw new Error('Incorrect Password!')

        return {
            id : user.id,
            email : user.email,
            firstName : user.firstName,
            lastName : user.lastName,
            username : user.username,
            mobile : user.mobile,
            email_verified : user.email_verified,
            image : user.image,
            role : user.role
        };
    } catch (error) {
        throw error;
    }
}