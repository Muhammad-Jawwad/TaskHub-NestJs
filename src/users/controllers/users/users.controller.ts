import { 
    Controller, 
    Post, 
    Body, 
    ValidationPipe,
    UsePipes
} from '@nestjs/common';
import { request } from 'express';
import { createUserDTO } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){}

    @Post('signup')
    @UsePipes(new ValidationPipe())
    createUser(@Body() userDetails: createUserDTO){
        console.log(userDetails)
        let res = this.usersService.createUser(userDetails);
        return res;
    }
}
