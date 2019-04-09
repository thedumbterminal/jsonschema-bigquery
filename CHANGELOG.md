# Changelog

## v2.0.2 (09/04/2019)

* Supports nested combined schemas with null types.
* `jsbq` can convert and print a schema without touching BigQuery.

## v2.0.1 (07/04/2019)

* Now throws an error if no type is given for a property.

## v2.0.0 (01/04/2019)

* Make `"additionalProperties": false` required for all `object` type properties in input JSON Schema.

## v1.0.0 (30/01/2019)

* Support for nested descriptions.

## v0.1.2 (11/11/2018)

* Improved error message when dealing with union types.

## v0.1.1 (01/11/2018)

* Bug fix for jsbq command.

## v0.1.0 (23/10/2018)

* Rewrite with improved support for `allOf`, `anyOf` and `oneOf` combined schemas.

## v0.0.7 (13/08/2018)

* Support fields with nullable types using `anyOf` method.

## v0.0.6 (11/08/2018)

* Supports `allOf`, `anyOf` and `oneOf` combined schemas.

## v0.0.5 (29/07/2018)

* Supports timestamp fields.

## v0.0.4 (27/07/2018)

* Supports repeated fields.

## v0.0.3 (25/07/2018)

* Now supporting fields with type(s) as an array.
* Field descriptions now supported.

## v0.0.2 (23/07/2018)

* Required fields supported.

## v0.0.1 (21/07/2018)

* Initial release.
