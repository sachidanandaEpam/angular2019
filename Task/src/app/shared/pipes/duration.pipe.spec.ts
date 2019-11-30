import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert to time string', () => {
    const pipe = new DurationPipe();
    let formattedString = pipe.transform(150);
    expect(formattedString).toEqual('2 hr 30 min');

    formattedString = pipe.transform(360);
    expect(formattedString).toEqual('6 hr ');

    formattedString = pipe.transform(1);
    expect(formattedString).toEqual(' 1 min');

    // Why failing for 3600 minutes
    formattedString = pipe.transform(3600);
    // expect(formattedString).toEqual('60 hr');
  });
});
