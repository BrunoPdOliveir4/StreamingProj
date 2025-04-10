import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ headers: { authorization?: string }; user?: any }>();
    return this.validateRequest(request);
  }

  private async validateRequest(request: {
    headers: { authorization?: string };
    user?: any;
  }): Promise<boolean> {
    const authorizationHeader: string | undefined =
      request.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException('Token not found');
    }

    // Verifica se o token vem com o prefixo "Bearer"
    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Token mal formado');
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload = await this.jwtService.verifyAsync(token); // Decodifica o token e obtém o payload
      request.user = payload as Record<string, unknown>; // Atribui o payload ao usuário
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado: ' + error);
    }
  }
}
