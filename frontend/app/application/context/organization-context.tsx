"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useUser } from "@/app/application/context/user-context";
import { toast } from "sonner";
import {
  OrganizationAddApiService,
  OrganizationFetchApiService,
} from "@/services/organization.service";
import { customFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Memberships, type Organization } from "../../../../shared/types";

type OrganizationContextType = {
  organization: Organization | null;
  memberships: Memberships[] | null;
  selectedOrganizationId: string | null;
  selectedOrganization: Organization | null;
  loading: boolean;
  addOrganization: () => Promise<void>;
  organizationInput: { name: string; loading: boolean };
  fetchUser: () => Promise<void>;
  setOrganizationInput: React.Dispatch<
    React.SetStateAction<{
      name: string;
      loading: boolean;
    }>
  >;
  fetchOrganization: (orgId: string) => Promise<void>;
  loadingOrg: boolean;
};
const OrganizationContext = createContext<OrganizationContextType | null>(null);

export function OrganizationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loading, fetchUser } = useUser();
  const router = useRouter();
  const selectedOrganizationId = user?.selectedOrganizationId || null;
  const selectedOrganization = user?.selectedOrganization || null;
  const memberships = user?.memberships || null;

  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loadingOrg, setLoadingOrg] = useState(true);
  const [organizationInput, setOrganizationInput] = useState({
    name: "",
    loading: false,
  });

  async function switchOrganization(orgId: string) {}
  async function fetchOrganization(orgId: string) {
    if (!orgId) return;
    try {
      const res = await customFetch(() => OrganizationFetchApiService(orgId));
      if (res === 401) {
        router.replace("/auth");
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Failed to fetch organization");
        return;
      }
      const data = await res.json();
      setOrganization(data.organization);
    } catch (e) {
      toast.error("Failed to fetch organization!");
    } finally {
      setLoadingOrg(false);
    }
  }

  async function addOrganization() {
    try {
      setOrganizationInput((prev) => ({ ...prev, loading: true }));
      const res = await customFetch(() =>
        OrganizationAddApiService(organizationInput.name),
      );
      if (res === 401) {
        router.replace("/auth");
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        toast.error(
          data.message || "Something went wrong while adding an organization",
        );
        setOrganizationInput((prev) => ({ ...prev, loading: false }));
        return;
      }
      toast.success("Succesfully added an organzation.");
      setOrganizationInput((prev) => ({ ...prev, loading: false }));
    } catch (e) {
      setOrganizationInput((prev) => ({ ...prev, loading: false }));
      toast.error("Failed to add organization!");
      console.error(e);
    }
  }

  useEffect(() => {
    if (!loading && selectedOrganizationId) {
      fetchOrganization(selectedOrganizationId);
    }
  }, [selectedOrganizationId]);

  return (
    <OrganizationContext.Provider
      value={{
        organization,
        memberships,
        selectedOrganizationId,
        selectedOrganization,
        loading,
        addOrganization,
        organizationInput,
        fetchUser,
        setOrganizationInput,
        fetchOrganization,
        loadingOrg,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (!context)
    throw new Error(
      "useOrganization must be used inside <OrganizationContextProvider>",
    );
  return context;
}
