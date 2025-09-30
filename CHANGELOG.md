# Changelog

## v7.0.1 (30/09/2025)

- Fixed bug where descriptions were not set for repeated columns.
- Updated dependencies.

## v7.0.0 (03/04/2023)

- Updated converter to generate big numeric instead of numeric for number type.
- Updated dependencies.

## v6.1.0 (27/01/2023)

- unevaluatedProperties now supported when checking for additional properties.

## v6.0.0 (24/01/2023)

- Objects with no properties convert to JSON fields.
- Updated dependencies.

## v5.1.0 (11/08/2022)

- JSBQ CLI output now compatible with Google's bq CLI.
- Logging code reduced.
- Updated dependencies.

## v5.0.1 (04/07/2022)

- JSBQ CLI now supports draft-7+ schemas.
- Updated dependencies.

## v5.0.0 (30/12/2021)

- Updated converter to generate numeric instead of float for number type.
- Fixed field name validation.
- Now supports TIME columns.
- Updated to node 16, and updated dependencies.

## v4.1.0 (27/09/2021)

- Now checks for field name format.

## v4.0.1 (12/02/2021)

- Support more formats for table ID utility.

## v4.0.0 (24/12/2020)

- Dropped support for node 8.
- Updated dependencies.

## v3.4.0 (02/06/2020)

- Date formats now supported in `OneOf` or `AnyOf`.
- Repeated descriptions in `OneOf` or `AnyOf` are no longer duplicated.

## v3.3.0 (23/05/2020)

- Schema problems can now be ignored, with warnings shown.

## v3.2.1 (23/05/2020)

- Updated to node 12, and updated dependencies.

## v3.2.0 (27/02/2020)

- Now supports DATE columns.
- Simplified custom error class.

## v3.1.1 (07/08/2019)

- Logging now sent to STDERR.

## v3.1.0 (30/06/2019)

- Now throws an error if properties of an object has not been given or does not contain any fields.
- Object descriptions are now processed correctly

## v3.0.0 (08/05/2019)

- `additionalProperties` check is now optional.

## v2.0.3 (07/05/2019)

- Set requirePartitionFilter to true when creating GBQ tables

## v2.0.2 (09/04/2019)

- Supports nested combined schemas with null types.
- `jsbq` can convert and print a schema without touching BigQuery.

## v2.0.1 (07/04/2019)

- Now throws an error if no type is given for a property.

## v2.0.0 (01/04/2019)

- Make `"additionalProperties": false` required for all `object` type properties in input JSON Schema.

## v1.0.0 (30/01/2019)

- Support for nested descriptions.

## v0.1.2 (11/11/2018)

- Improved error message when dealing with union types.

## v0.1.1 (01/11/2018)

- Bug fix for jsbq command.

## v0.1.0 (23/10/2018)

- Rewrite with improved support for `allOf`, `anyOf` and `oneOf` combined schemas.

## v0.0.7 (13/08/2018)

- Support fields with nullable types using `anyOf` method.

## v0.0.6 (11/08/2018)

- Supports `allOf`, `anyOf` and `oneOf` combined schemas.

## v0.0.5 (29/07/2018)

- Supports timestamp fields.

## v0.0.4 (27/07/2018)

- Supports repeated fields.

## v0.0.3 (25/07/2018)

- Now supporting fields with type(s) as an array.
- Field descriptions now supported.

## v0.0.2 (23/07/2018)

- Required fields supported.

## v0.0.1 (21/07/2018)

- Initial release.
