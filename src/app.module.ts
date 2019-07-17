import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

// const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-fm2ws.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
const MONGODB_URI = "mongodb+srv://school_admin:" + process.env.MONGO_PASSWORD + "@cluster0-fm2ws.mongodb.net/nestjs-demo?retryWrites=true&w=majority";
@Module({
  imports: [ProductsModule, MongooseModule.forRoot(MONGODB_URI, { useNewUrlParser: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
