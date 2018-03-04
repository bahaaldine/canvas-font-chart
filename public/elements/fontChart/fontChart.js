import header from './header.png';

export const fontChart = () => ({
  name: 'fontChart',
  displayName: 'Font Chart',
  help: 'Percentage chart made with Fonts',
  image: header,
  expression: 'fontChart name="paper-plane" value={math "round(100*random())"} color="#3b5998"',
});
