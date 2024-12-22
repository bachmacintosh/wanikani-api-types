import * as v from "valibot";
import { CollectionParameters } from "../base/v20170710.js";

export function extendCollectionParameters<
  T extends v.ObjectSchema<v.ObjectEntries, v.ErrorMessage<v.ObjectIssue> | undefined>,
>(schema: T): v.IntersectSchema<[typeof CollectionParameters, T], undefined> {
  return v.intersect([CollectionParameters, schema]);
}
