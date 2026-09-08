import {
  getCitiesOfState,
  getCountries,
  getCountryByCode,
  getStatesOfCountry,
  type ICity,
  type ICountry,
  type IState,
} from "@countrystatecity/countries";

/**
 * Countries, states and cities from the official Country State City database.
 *
 * The package ships the data locally and loads one country's file at a time,
 * so a form field never waits on a CDN and the bundle never carries 250
 * countries' worth of cities. Every accessor is async for that reason.
 *
 * These wrappers exist to hand the rest of the app one shape — the `{ value,
 * label }` our selects and comboboxes already speak — instead of leaking the
 * database's own record shape into every screen.
 */

export type AddressOption = {
  value: string;
  label: string;
};

/** ISO 3166-1 alpha-2, e.g. `BR`, `US`. */
export type CountryCode = string;
/** ISO 3166-2 subdivision code, e.g. `SP`, `CA`. */
export type StateCode = string;

function byLabel(a: AddressOption, b: AddressOption) {
  return a.label.localeCompare(b.label);
}

/** Every country, flag first so the list scans quickly. */
export async function listCountries(): Promise<AddressOption[]> {
  const countries: ICountry[] = await getCountries();
  return countries
    .map((country) => ({
      value: country.iso2,
      label: `${country.emoji} ${country.name}`,
    }))
    .sort(byLabel);
}

export async function listStates(
  country: CountryCode,
): Promise<AddressOption[]> {
  if (!country) return [];
  const states: IState[] = await getStatesOfCountry(country);
  return states
    .map((state) => ({ value: state.iso2, label: state.name }))
    .sort(byLabel);
}

export async function listCities(
  country: CountryCode,
  state: StateCode,
): Promise<AddressOption[]> {
  if (!country || !state) return [];
  const cities: ICity[] = await getCitiesOfState(country, state);
  // Cities have no stable short code, so the name is the value.
  return cities
    .map((city) => ({ value: city.name, label: city.name }))
    .sort(byLabel);
}

/**
 * The dialling prefix for a country, to pair with the phone field.
 * Returned without the `+`, the way the database stores it.
 */
export async function countryPhoneCode(country: CountryCode) {
  const meta = await getCountryByCode(country);
  return meta?.phonecode ?? null;
}

/** The currency a country transacts in, for pricing shown per market. */
export async function countryCurrency(country: CountryCode) {
  const meta = await getCountryByCode(country);
  if (!meta) return null;
  return {
    code: meta.currency,
    name: meta.currency_name,
    symbol: meta.currency_symbol,
  };
}
