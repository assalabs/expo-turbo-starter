import { getPathFromState } from 'expo-router/build/fork/getPathFromState';
import { getStateFromPath } from 'expo-router/build/fork/getStateFromPath';

describe('Expo Router linking', () => {
  it('round trips encoded query parameters through the router', () => {
    const options = { screens: { about: 'about' } };
    const params = { search: 'café & tea', tag: ['one', 'two'] };
    const path = getPathFromState({ routes: [{ name: 'about', params }] }, options);
    const state = getStateFromPath(path, options);

    expect(state?.routes[0]?.name).toBe('about');
    expect(state?.routes[0]?.params).toMatchObject(params);
  });
});
