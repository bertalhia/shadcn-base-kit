"use client";

import * as React from "react";
import type {
  Control,
  FieldPath,
  FieldValues,
  PathValue,
} from "react-hook-form";
import { useWatch } from "react-hook-form";

import { FormCombobox } from "@/components/shared/form-combobox";
import {
  type AddressOption,
  listCities,
  listCountries,
  listStates,
} from "@/lib/format/address";

/**
 * Loads an option list and keeps it in step with what it depends on.
 *
 * The database is async and per-country, so a state list cannot be a constant.
 * `key` guards against a slow response for a country the person already moved
 * away from overwriting the list for the one they are on now.
 */
function useAddressOptions(
  load: () => Promise<AddressOption[]>,
  key: string,
): { options: AddressOption[]; loading: boolean } {
  const [options, setOptions] = React.useState<AddressOption[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let current = true;
    setLoading(true);
    load()
      .then((result) => {
        if (current) setOptions(result);
      })
      .finally(() => {
        if (current) setLoading(false);
      });
    return () => {
      current = false;
    };
    // `load` closes over `key`; depending on the key keeps the effect honest
    // without re-running on every render that recreates the closure.
    // biome-ignore lint/correctness/useExhaustiveDependencies: keyed on purpose
  }, [key]);

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

  const countries = useAddressOptions(listCountries, "countries");
  const states = useAddressOptions(
    () => listStates(countryCode),
    `states:${countryCode}`,
  );
  const cities = useAddressOptions(
    () => listCities(countryCode, stateCode),
    `cities:${countryCode}:${stateCode}`,
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
        options={countries.options}
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
