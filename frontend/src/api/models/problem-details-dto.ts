import type {InvalidParamDTO} from "./invalid-param-dto.ts";

export interface ProblemDetailsDTO {
    'type': string;
    'title': string;
    'status': number;
    'detail': string;
    'instance': string;
    'invalid-params': InvalidParamDTO[];
}