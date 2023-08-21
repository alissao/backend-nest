import { Injectable } from '@nestjs/common';
import {
  Client as GoogleMapsClient,
  DirectionsRequest,
  TravelMode
} from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DirectionsService {
  constructor(private googleMapsClient: GoogleMapsClient, private configService: ConfigService) { }

  async getDirections(placeOriginId: string, placeDestinationId: string) {
    const requestParams: DirectionsRequest['params'] = {
      origin: `place_id:${placeOriginId}`,
      destination: `place_id:${placeDestinationId}`,
      mode: TravelMode.driving,
      key: this.configService.get<string>('mapsService.apiKey')
    };

    const { data } = await this.googleMapsClient.directions({ params: requestParams });

    return {
      ...data,
      request: {
        origin: {
          place_id: requestParams.origin,
          location: {
            lat: data.routes[0].legs[0].start_location.lat,
            lng: data.routes[0].legs[0].start_location.lng
          },
        },
        destination: {
          place_id: requestParams.destination,
          location: {
            lat: data.routes[0].legs[0].end_location.lat,
            lng: data.routes[0].legs[0].end_location.lng
          }
        }
      }
    };
  }

}