import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { TraitsModule } from './traits/traits.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ChoiceModule } from './choice/choice.module';
import { StoryModule } from './story/story.module';
import { AppService } from './app.service';
import { ConsoleModule } from '@squareboat/nest-console';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, resolve } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AnimalsModule } from './animals/animals.module';
import { root } from './config/paths';
import { CommandsModule } from './commands/commands.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: root + '/../../frontend/dist',
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ConsoleModule,
    TasksModule,
    AuthModule,
    SharedModule,
    TraitsModule,
    ChoiceModule,
    StoryModule,
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    AnimalsModule,
    CommandsModule,
    UploadModule,
  ],
  providers: [AppService],
})
export class AppModule {}
