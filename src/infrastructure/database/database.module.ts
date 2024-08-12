import { DynamicModule, Module } from '@nestjs/common';
import { MysqlModule } from '@/infrastructure/database/mysql/mysql.module';
import { InMemoryModule } from '@/infrastructure/database/in-memory/in-memory.module';

@Module({
  imports: [MysqlModule, InMemoryModule],
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    const isTestEnv = process.env.NODE_ENV === 'test';
    const moduleImports = isTestEnv ? [InMemoryModule] : [MysqlModule];
    console.log(moduleImports, isTestEnv);
    return {
      module: DatabaseModule,
      imports: moduleImports,
      exports: moduleImports,
    };
  }
}
