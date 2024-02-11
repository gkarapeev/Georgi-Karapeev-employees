import { AggregatedPairOverlapData, PointInTime } from "../utils/types";
import { aggregatePairOverlapData, accumulateOverlaps } from "./accumulate-utils";
import { processEvents } from "./sweep-line";

export const findLongestCoworkingPair = (points: PointInTime[]): AggregatedPairOverlapData[] => {
    return aggregatePairOverlapData(accumulateOverlaps(processEvents(points)));
};