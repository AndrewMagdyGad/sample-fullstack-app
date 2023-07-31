import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NewUserInput } from './dto/new-user.input';
import { UsersArgs } from './dto/users.args';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { Item } from 'src/items/item.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(data: NewUserInput): Promise<User> {
    data.email = data.email.toLowerCase();

    // check if user already exists by email
    const userExists = await this.findOneByEmail(data.email);
    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.hashPassword(data.password);
    const user = new User({ ...data, password: hashedPassword });
    return user.save();
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findOne({ where: { id }, include: [Item] });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email }, include: [Item] });
  }

  async findAll(usersArgs: UsersArgs): Promise<User[]> {
    return this.userModel.findAll({ include: [Item] });
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}
