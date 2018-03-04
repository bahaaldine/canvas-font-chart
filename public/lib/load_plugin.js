// load the functions registry
import { functionsRegistry } from 'plugins/canvas/lib/functions_registry';
import { renderFunctionsRegistry } from 'plugins/canvas/lib/render_functions_registry';
import { elementsRegistry } from 'plugins/canvas/lib/elements_registry';

// load local functions
import { clientFunctions } from '../functions';
import { renderFunctions } from '../render_functions';
import { elementSpecs } from '../elements';

// register client and common functions in the client runtime
clientFunctions.forEach(fnDef => functionsRegistry.register(fnDef));
renderFunctions.forEach(fnDef => renderFunctionsRegistry.register(fnDef));
elementSpecs.forEach(elDef => elementsRegistry.register(elDef));