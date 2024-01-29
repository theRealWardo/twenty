import { Global, Module } from '@nestjs/common';

import { EnvironmentService } from './environment.service';
import { ConfigurableModuleClass } from './environment.module-definition';

@Global()
@Module({
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule extends ConfigurableModuleClass {}
