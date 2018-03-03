// load the functions registry
import { functionsRegistry } from 'plugins/canvas/lib/functions_registry';
import { renderFunctionsRegistry } from 'plugins/canvas/lib/render_functions_registry';

// load local functions
import { clientFunctions } from '../../public/functions';
import { renderFunctions } from '../render_functions';

// register client and common functions in the client runtime
clientFunctions.forEach(fnDef => functionsRegistry.register(fnDef));
renderFunctions.forEach(fnDef => renderFunctionsRegistry.register(fnDef));