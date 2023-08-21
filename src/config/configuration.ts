import * as tolkien from '../../tolkien-maps.json'

export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  mapsService: {
    apiKey: tolkien['msap-key'],
  }
});