import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { Observable } from 'rxjs';

@Injectable()
export class FilePathGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('FilePathGuard');
    const query = context.switchToHttp().getRequest().query;

    if (query && query['expiration_date']) {
      return !this.isExpired(query['expiration_date']);
    }

    return true;
  }

  isExpired(expirationDate: string): boolean {
    console.log('expirationDate', expirationDate);
    console.log('new Date(expirationDate)', new Date(expirationDate));
    console.log('new Date()', new Date());

    return new Date(expirationDate) < new Date();
  }
}
