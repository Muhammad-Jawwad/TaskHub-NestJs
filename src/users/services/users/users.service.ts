import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { encodePassword } from 'src/utilities/bcrypt';
import { CreateUserType } from 'src/utilities/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ){}

    createUser(userDetails: CreateUserType){
        console.log("From services", userDetails);
        const pass = encodePassword(userDetails.password)
        console.log("pass",pass)
        const newUser = this.userRepository.create({
            ...userDetails, 
            password: pass
        })
        console.log("newUser",newUser)
        let res = this.userRepository.save(newUser);
        return res;
    }
}
