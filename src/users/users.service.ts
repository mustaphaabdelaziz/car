import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
@Injectable()
export class UsersService {
    /*
        - @InjectRepository(User):
            because DI system doesn't deal perfectly with Generic types,
            we need to explicitly add a generic dependncy injection of type user
        - Repository<User>:
            is an instance of TypeOrm repository 
            that deals with type User
     */
    constructor(@InjectRepository(User) private repo: Repository<User>) { }
    create(email: string, password: string) {
        // create: creates an instance of User Entity 
        // and does not save it to database
        // this is usefull to do some validation
        const user = this.repo.create({ email, password });
        // save: save the user entity to the database
        return this.repo.save(user)
    }
    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    find(email: string) {
        return this.repo.find({ where: { email:email } });
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return this.repo.remove(user);
    }
}
