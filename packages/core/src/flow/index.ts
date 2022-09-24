import { Box } from "../box";
import { flowParam } from "../types/flow";

export interface Flow {
	run({box,spider,config}: flowParam<Box | null>): Box | null
}

export * from './lib/saveFlow';