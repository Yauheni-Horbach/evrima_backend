import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
  id: true,
  toJSON: {
    transform(_, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
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

  @Prop({ default: '' })
  surName: string;

  @Prop({ default: '' })
  sex: string;

  @Prop({ default: '' })
  birthDate: string;

  @Prop({ default: [] })
  likes: string[];

  @Prop({ default: [] })
  dislikes: string[];

  @Prop({ default: '' })
  location: string;

  @Prop({ default: '' })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
