import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { LoginResult, LoginUserInput } from './dto';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUserByPassword(
    loginAttempt: LoginUserInput,
  ): Promise<LoginResult | undefined> {
    // This will be used for the initial login
    const userToAttempt = await this.userService.findOneByEmail(
      loginAttempt.email,
    );

    if (!userToAttempt) return undefined;

    // Check the supplied password against the hash stored for this user
    const isMatch = await bcrypt.compare(
      loginAttempt.password,
      userToAttempt.password,
    );

    if (isMatch) {
      // If there is a successful match, generate a JWT for the user
      const token = this.createJwt(userToAttempt!).token;
      const result: LoginResult = {
        user: userToAttempt!,
        token,
      };

      return result;
    }

    return undefined;
  }

  /**
   * Verifies that the JWT payload associated with a JWT is valid by making sure the user exists
   *
   * @param {JwtPayload} payload
   * @returns {(Promise<User | undefined>)} returns undefined if there is no user
   * @memberof {(AuthService JwtStrategy)}
   */
  async validateJwtPayload(payload: JwtPayload): Promise<User | undefined> {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.userService.findOneByEmail(payload.email);

    return user || undefined;
  }

  createJwt(user: User): { data: JwtPayload; token: string } {
    const expiresIn = this.configService.get('app.jwtExpiresIn');
    let expiration: Date | undefined;
    if (expiresIn) {
      expiration = new Date();
      expiration.setTime(expiration.getTime() + expiresIn * 1000);
    }
    const data: JwtPayload = {
      email: user.email,
      id: user.id,
      expiration,
    };

    const jwt = this.jwtService.sign(data);

    return { data, token: jwt };
  }
}
