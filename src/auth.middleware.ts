import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: Request, res: Response, next: () => void) {
    const token = (req.headers.authorization ?? '').split('Bearer ')[1];
    try{
      const {uid} = this.authService.verifyToken(token);
      if(uid){
        req.uid = uid;
      }
    }catch(err){
      req.uid = undefined;
      console.log(err);
    }
    next();
  }
}
