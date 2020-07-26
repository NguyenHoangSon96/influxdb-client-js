import {InfluxDB} from '@influxdata/influxdb-client'
import {APIBase, RequestOptions} from '../APIBase'
import {Pkg, PkgApply, PkgCreate, PkgSummary, Stack} from './types'

export interface CreatePkgRequest {
  /** Influx package to create. */
  body: PkgCreate
}
export interface ApplyPkgRequest {
  /** entity body */
  body: PkgApply
}
export interface ListStacksRequest {
  /** The organization id of the stacks */
  orgID: string
  /** A collection of names to filter the list by. */
  name?: string
  /** A collection of stackIDs to filter the list by. */
  stackID?: string
}
export interface CreateStackRequest {
  /** Influx stack to create. */
  body: {
    orgID?: string
    name?: string
    description?: string
    urls?: string[]
  }
}
export interface ReadStackRequest {
  /** The stack id */
  stack_id: string
}
export interface UpdateStackRequest {
  /** The stack id */
  stack_id: string
  /** Influx stack to update. */
  body: {
    name?: string
    description?: string
    urls?: string[]
  }
}
export interface DeleteStackRequest {
  /** The stack id */
  stack_id: string
  /** The organization id of the user */
  orgID: string
}
export interface ExportStackRequest {
  /** The stack id to be removed */
  stack_id: string
  /** The organization id of the user */
  orgID: string
}
/**
 * See
 *- {@link https://v2.docs.influxdata.com/v2.0/api/#operation/CreatePkg }
 *- {@link https://v2.docs.influxdata.com/v2.0/api/#operation/ApplyPkg }
 *- {@link https://v2.docs.influxdata.com/v2.0/api/#operation/ListStacks }
 *- {@link https://v2.docs.influxdata.com/v2.0/api/#operation/CreateStack }
 *- {@link https://v2.docs.influxdata.com/v2.0/api/#operation/ReadStack }
 *- {@link https://v2.docs.influxdata.com/v2.0/api/#operation/UpdateStack }
 *- {@link https://v2.docs.influxdata.com/v2.0/api/#operation/DeleteStack }
 *- {@link https://v2.docs.influxdata.com/v2.0/api/#operation/ExportStack }
 */
export class PackagesAPI {
  // internal
  private base: APIBase

  /**
   * Creates PackagesAPI
   * @param influxDB - an instance that knows how to communicate with InfluxDB server
   */
  constructor(influxDB: InfluxDB) {
    this.base = new APIBase(influxDB)
  }
  /**
   * Create a new Influx package.
   * See {@link https://v2.docs.influxdata.com/v2.0/api/#operation/CreatePkg }
   * @param request - request parameters and body (if supported)
   * @param requestOptions - optional transport options
   * @returns promise of response
   */
  createPkg(
    request: CreatePkgRequest,
    requestOptions?: RequestOptions
  ): Promise<Pkg> {
    return this.base.request(
      'POST',
      `/api/v2/packages`,
      request,
      requestOptions,
      'application/json'
    )
  }
  /**
   * Apply or dry-run an Influx package.
   * See {@link https://v2.docs.influxdata.com/v2.0/api/#operation/ApplyPkg }
   * @param request - request parameters and body (if supported)
   * @param requestOptions - optional transport options
   * @returns promise of response
   */
  applyPkg(
    request: ApplyPkgRequest,
    requestOptions?: RequestOptions
  ): Promise<PkgSummary> {
    return this.base.request(
      'POST',
      `/api/v2/packages/apply`,
      request,
      requestOptions,
      'application/json'
    )
  }
  /**
   * Grab a list of installed Influx packages.
   * See {@link https://v2.docs.influxdata.com/v2.0/api/#operation/ListStacks }
   * @param request - request parameters and body (if supported)
   * @param requestOptions - optional transport options
   * @returns promise of response
   */
  listStacks(
    request: ListStacksRequest,
    requestOptions?: RequestOptions
  ): Promise<{
    stacks?: Stack[]
  }> {
    return this.base.request(
      'GET',
      `/api/v2/packages/stacks${this.base.queryString(request, [
        'orgID',
        'name',
        'stackID',
      ])}`,
      request,
      requestOptions
    )
  }
  /**
   * Create a new stack.
   * See {@link https://v2.docs.influxdata.com/v2.0/api/#operation/CreateStack }
   * @param request - request parameters and body (if supported)
   * @param requestOptions - optional transport options
   * @returns promise of response
   */
  createStack(
    request: CreateStackRequest,
    requestOptions?: RequestOptions
  ): Promise<Stack> {
    return this.base.request(
      'POST',
      `/api/v2/packages/stacks`,
      request,
      requestOptions,
      'application/json'
    )
  }
  /**
   * Grab a stack by its ID.
   * See {@link https://v2.docs.influxdata.com/v2.0/api/#operation/ReadStack }
   * @param request - request parameters and body (if supported)
   * @param requestOptions - optional transport options
   * @returns promise of response
   */
  readStack(
    request: ReadStackRequest,
    requestOptions?: RequestOptions
  ): Promise<Stack> {
    return this.base.request(
      'GET',
      `/api/v2/packages/stacks/${request.stack_id}`,
      request,
      requestOptions
    )
  }
  /**
   * Update a an Influx Stack.
   * See {@link https://v2.docs.influxdata.com/v2.0/api/#operation/UpdateStack }
   * @param request - request parameters and body (if supported)
   * @param requestOptions - optional transport options
   * @returns promise of response
   */
  updateStack(
    request: UpdateStackRequest,
    requestOptions?: RequestOptions
  ): Promise<Stack> {
    return this.base.request(
      'PATCH',
      `/api/v2/packages/stacks/${request.stack_id}`,
      request,
      requestOptions,
      'application/json'
    )
  }
  /**
   * Delete a stack and remove all its associated resources.
   * See {@link https://v2.docs.influxdata.com/v2.0/api/#operation/DeleteStack }
   * @param request - request parameters and body (if supported)
   * @param requestOptions - optional transport options
   * @returns promise of response
   */
  deleteStack(
    request: DeleteStackRequest,
    requestOptions?: RequestOptions
  ): Promise<void> {
    return this.base.request(
      'DELETE',
      `/api/v2/packages/stacks/${
        request.stack_id
      }${this.base.queryString(request, ['orgID'])}`,
      request,
      requestOptions
    )
  }
  /**
   * Export a stack's resources in the form of a package.
   * See {@link https://v2.docs.influxdata.com/v2.0/api/#operation/ExportStack }
   * @param request - request parameters and body (if supported)
   * @param requestOptions - optional transport options
   * @returns promise of response
   */
  exportStack(
    request: ExportStackRequest,
    requestOptions?: RequestOptions
  ): Promise<Pkg> {
    return this.base.request(
      'DELETE',
      `/api/v2/packages/stacks/${
        request.stack_id
      }/export${this.base.queryString(request, ['orgID'])}`,
      request,
      requestOptions
    )
  }
}
