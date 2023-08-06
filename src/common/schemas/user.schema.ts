import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { TravelItem } from '../../types';

const iconSchema = new mongoose.Schema({
  prefix: String,
  suffix: String,
});

const categorySchema = new mongoose.Schema({
  id: Number,
  name: String,
  icon: iconSchema,
});

const geocodeSchema = new mongoose.Schema({
  main: {
    latitude: Number,
    longitude: Number,
  },
});

const hoursSchema = new mongoose.Schema({
  is_local_holiday: Boolean,
  open_now: Boolean,
});

const locationSchema = new mongoose.Schema({
  address: String,
  country: String,
  formatted_address: String,
  locality: String,
  postcode: String,
  region: String,
});

const photoSchema = new mongoose.Schema({
  id: String,
  created_at: String,
  prefix: String,
  suffix: String,
  width: Number,
  height: Number,
});

const placeItemSchema = new mongoose.Schema({
  fsq_id: String,
  categories: [categorySchema],
  geocodes: geocodeSchema,
  hours: hoursSchema,
  location: locationSchema,
  name: String,
  photos: [photoSchema],
  rating: Number,
  website: String,
  description: String,
});

const travelListSchema = new mongoose.Schema({
  readonly: {
    travelList: {
      type: Map,
      of: new mongoose.Schema({
        id: String,
        name: String,
        coordinates: {
          lat: Number,
          lng: Number,
        },
        location: String,
        radius: Number,
        likeList: [placeItemSchema],
        dislikeList: [placeItemSchema],
        nextPageLink: String,
        startDate: String,
        endDate: String,
        currentCoordinates: {
          lat: Number,
          lng: Number,
        },
        visitedPlaces: [String],
      }),
    },
  },
});

const TravelListModel = mongoose.model('TravelList', travelListSchema);

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

  @Prop({ default: '' })
  readonly currentTravelId: string;

  @Prop({ default: {}, type: TravelListModel })
  readonly travelList: {
    [key: string]: TravelItem;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
