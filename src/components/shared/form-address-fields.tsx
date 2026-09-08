"use client";

import * as React from "react";
import type {
  Control,
  FieldPath,
  FieldValues,
  PathValue,
} from "react-hook-form";
import { useWatch } from "react-hook-form";

import { fetchCities, fetchCountries, fetchStates } from "@/actions/address";
import { CountryFlag } from "@/components/shared/country-flag";
import { FormCombobox } from "@/components/shared/form-combobox";
import type { AddressOption } from "@/lib/address";

/**
 * Which slice of the database to load. A union rather than a callback, so the
 * effect below depends on plain strings and stays exhaustive — a closure would
 * change identity every render and need its dependencies silenced.
 */
type AddressQuery =
  | { level: "countries" }
  | { level: "states"; country: string }
  | { level: "cities"; country: string; state: string };

/**
 * Loads an option list and keeps it in step with what it depends on.
 *
 * The lists come from server actions, because the country database reads the
 * filesystem and cannot run in a browser. The cancellation flag stops a slow
 * response for a country the person already moved away from overwriting the
 * list for the one they are on now.
 */
function useAddressOptions(query: AddressQuery): {
  options: AddressOption[];
  loading: boolean;
} {
  const [options, setOptions] = React.useState<AddressOption[]>([]);
  const [loading, setLoading] = React.useState(false);

  const { level } = query;
  const country = "country" in query ? query.country : "";
  const state = "state" in query ? query.state : "";

  React.useEffect(() => {
    let current = true;
    setLoading(true);

    const request =
      level === "countries"
        ? fetchCountries()
        : level === "states"
          ? fetchStates(country)
          : fetchCities(country, state);

    request
      .then((result) => {
        if (current) setOptions(result);
      })
      .finally(() => {
        if (current) setLoading(false);
      });

    return () => {
      current = false;
    };
  }, [level, country, state]);

  return { options, loading };
}

/**
 * Country, state and city as one dependent chain.
 *
 * Picking a country clears the state and the city, because a state code only
 * means something inside its country — leaving the old value would submit an
 * address that does not exist.
 */
export function FormAddressFields<TFieldValues extends FieldValues>({
  control,
  setValue,
  countryName,
  stateName,
  cityName,
  labels,
}: {
  control: Control<TFieldValues>;
  setValue: (
    name: FieldPath<TFieldValues>,
    value: PathValue<TFieldValues, FieldPath<TFieldValues>>,
  ) => void;
  countryName: FieldPath<TFieldValues>;
  stateName: FieldPath<TFieldValues>;
  cityName: FieldPath<TFieldValues>;
  labels?: { country?: string; state?: string; city?: string };
}) {
  const country = useWatch({ control, name: countryName });
  const state = useWatch({ control, name: stateName });

  const countryCode = typeof country === "string" ? country : "";
  const stateCode = typeof state === "string" ? state : "";

  const countries = useAddressOptions({ level: "countries" });
  const states = useAddressOptions({ level: "states", country: countryCode });
  const cities = useAddressOptions({
    level: "cities",
    country: countryCode,
    state: stateCode,
  });

  // The flag rides on the option, so it appears in the list and on the
  // selected value without the field knowing anything about countries.
  const countryOptions = React.useMemo(
    () =>
      countries.options.map((option) => ({
        ...option,
        icon: <CountryFlag code={option.value} />,
      })),
    [countries.options],
  );

  const empty = "" as PathValue<TFieldValues, FieldPath<TFieldValues>>;

  // Clear what no longer applies when the parent changes.
  const previousCountry = React.useRef(countryCode);
  React.useEffect(() => {
    if (previousCountry.current !== countryCode) {
      previousCountry.current = countryCode;
      setValue(stateName, empty);
      setValue(cityName, empty);
    }
  }, [countryCode, setValue, stateName, cityName, empty]);

  const previousState = React.useRef(stateCode);
  React.useEffect(() => {
    if (previousState.current !== stateCode) {
      previousState.current = stateCode;
      setValue(cityName, empty);
    }
  }, [stateCode, setValue, cityName, empty]);

  return (
    <>
      <FormCombobox
        control={control}
        name={countryName}
        label={labels?.country ?? "Country"}
        options={countryOptions}
        placeholder={
          countries.loading ? "Loading countries" : "Search countries"
        }
      />
      <FormCombobox
        control={control}
        name={stateName}
        label={labels?.state ?? "State"}
        options={states.options}
        placeholder={
          !countryCode
            ? "Pick a country first"
            : states.loading
              ? "Loading states"
              : "Search states"
        }
        emptyMessage="That country has no states on file."
      />
      <FormCombobox
        control={control}
        name={cityName}
        label={labels?.city ?? "City"}
        options={cities.options}
        placeholder={
          !stateCode
            ? "Pick a state first"
            : cities.loading
              ? "Loading cities"
              : "Search cities"
        }
        emptyMessage="No cities on file for that state."
      />
    </>
  );
}
