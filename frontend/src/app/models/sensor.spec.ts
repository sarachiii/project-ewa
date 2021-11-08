import { Sensor } from './sensor';

describe('Sensor', () => {
  it('should create an instance', () => {
    expect(new Sensor(null, null, null, null)).toBeTruthy();
  });
});
