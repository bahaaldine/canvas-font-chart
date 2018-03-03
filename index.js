import { commonFunctions } from './common/functions';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['canvas'],
    name: 'canvas-font-chart',
    uiExports: {
      hacks: [
        // register functions and the like things with canvas
        'plugins/canvas-font-chart/lib/load_plugin.js',
      ],
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server) {
      commonFunctions.forEach(fn => server.plugins.canvas.addFunction(fn));

      const types = [];
      types.forEach(fn => server.plugins.canvas.addType(fn));
    }
  });
}
