export type AccountProfile = {
  fullName: string;
  email: string;
  profileImage?: string | null;
  isEmailVerified: boolean;
};

export type DeliveryAddress = {
  country: string;
  state: string;
  localGovernmentArea: string;
  city: string;
  streetAddress: string;
  additionalDirections: string;
  googleMapsUrl?: string;
  phoneNumber?: string;
  phoneCountryCode?: string;
};

export const PROFILE_STORAGE_KEY = "onravel.account.profile";
export const ADDRESS_STORAGE_KEY = "onravel.account.address";

export const demoProfile: AccountProfile = {
  fullName: "Adaeze Okafor",
  email: "adaeze.okafor@onravel.com",
  profileImage:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  isEmailVerified: true,
};

export const demoAddress: DeliveryAddress = {
  country: "Nigeria",
  state: "Lagos State",
  localGovernmentArea: "Eti-Osa",
  city: "Lekki",
  streetAddress: "12 Admiralty Way, Lekki Phase 1",
  additionalDirections: "Please call when you arrive at the gate. Deliver to the lobby desk.",
  googleMapsUrl:
    "https://maps.google.com/?q=12+Admiralty+Way%2C+Lekki+Phase+1%2C+Lagos",
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);

    if (!rawValue) {
      return fallback;
    }

    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

export function readStoredProfile() {
  return readJson<AccountProfile>(PROFILE_STORAGE_KEY, demoProfile);
}

export function writeStoredProfile(profile: AccountProfile) {
  if (typeof window === "undefined") {
    return profile;
  }

  try {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Ignore localStorage write failures so the UI still works in restricted browser contexts.
  }

  return profile;
}

export function readStoredAddress() {
  return readJson<DeliveryAddress | null>(ADDRESS_STORAGE_KEY, demoAddress);
}

export function writeStoredAddress(address: DeliveryAddress) {
  if (typeof window === "undefined") {
    return address;
  }

  try {
    window.localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(address));
  } catch {
    // Ignore localStorage write failures so the UI still works in restricted browser contexts.
  }

  return address;
}
