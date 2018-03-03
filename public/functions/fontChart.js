export const fontChart = () => ({
  name: 'fontChart',
  type: 'render',
  help: 'Use font awesome fonts to render a percentage',
  args: {
    name: {
      types: ['string'],
      default: 'PaperPlane',
    },
    value: {
      types: ['number'],
      default: 42,
    },
    color: {
      types: ['string'],
      default: '#2f99c1',
    },
  },
  fn: (context, args) => {
    args.name = args.name.split('-').map( (string) => (string.charAt(0).toUpperCase() + string.slice(1)) ).join('');
    return {
      type: 'render',
      as: 'fontChart',
      value: {
        name: args.name,
        value: args.value,
        color: args.color,
      },
    };
  },
});
