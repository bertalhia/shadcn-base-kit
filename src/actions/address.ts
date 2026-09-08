"use server";

import {
  type AddressOption,
  listCities,
  listCountries,
  listStates,
} from "@/lib/address";

/**
 * Countries, states and cities, reached from the browser.
 *
 * `@countrystatecity/countries` reads the database off the filesystem and
 * refuses to run in a browser. Server actions are how a client component gets
 * at it without standing up an endpoint: the call runs on the server, and the
 * data stays local rather than coming from a CDN.
 */

export async function fetchCountries(): Promise<AddressOption[]> {
  return listCountries();
}

export async function fetchStates(country: string): Promise<AddressOption[]> {
  return listStates(country);
}

export async function fetchCities(
  country: string,
  state: string,
): Promise<AddressOption[]> {
  return listCities(country, state);
}
