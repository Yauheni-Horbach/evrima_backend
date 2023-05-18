import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
  id: true,
  toJSON: {
    transform(_, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class User {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Email already exists'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  surName: string;

  @Prop()
  sex: string;

  @Prop()
  birthDate: string;

  @Prop()
  likes: string[];

  @Prop()
  dislikes: string[];

  @Prop()
  location: string;

  @Prop()
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
