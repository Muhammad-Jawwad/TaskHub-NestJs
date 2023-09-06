import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { CreateUserType, ValidateUserType } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    async validateUser(userDetails: ValidateUserType){
        const { email } = userDetails;
        console.log("email",email);
        const user = await this.userRepository.findOne({where: {email}});
        if(user === null){
            throw new HttpException('User not found',HttpStatus.NOT_FOUND);
        }
        console.log("user",user);   

        const pass = user.password;
        console.log("password",pass);
        const status = comparePassword(userDetails.password,pass);
        console.log("status",status);
        if(!status){
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        return result;
    }

}
