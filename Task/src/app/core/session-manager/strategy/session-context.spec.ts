import { SessionContext } from './session-context';
import { StrategyType } from 'src/app/shared/strategy-type.enum';

describe('SessionContext', () => {
  it('should create an instance', () => {
    expect(new SessionContext(StrategyType.SESSION)).toBeTruthy();
  });
});
