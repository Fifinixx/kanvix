"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useUser } from "@/app/application/context/user-context";
import { useId } from "./id-context";
import { toast } from "sonner";
import {
  OrganizationAddApiService,
  OrganizationFetchApiService,
  OrganizationSwitchApiService,
} from "@/services/organization.service";
import { customFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import {
  type Organization,
  type OrganizationContextType
} from "../../../../shared/types";


const OrganizationContext = createContext<OrganizationContextType | null>(null);

export function OrganizationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loadingUser, fetchUser } = useUser();
  const { id } = useId();
  const router = useRouter();
  const selectedOrganizationId = user?.selectedOrganizationId || null;
  const selectedProjectId =
    user?.memberships?.find((org) => selectedOrganizationId === org.orgId)
      ?.selectedProjectId || null;
  const memberships = user?.memberships || null;
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);
  const [loadingOrg, setLoadingOrg] = useState(true);
  const [organizationInput, setOrganizationInput] = useState({
    name: "",
    loading: false,
  });

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
      setSelectedOrganization(data.organization);
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
      toast.success("Succesfully added an organization.");
      const data = await res.json();
      return data;
    } catch (e) {
      toast.error("Failed to add organization!");
      console.error(e);
    } finally {
      setOrganizationInput((prev) => ({ name: "", loading: false }));
    }
  }

  async function handleAddOrganization(
    e: React.SubmitEvent<HTMLFormElement>,
    switchOrg = false,
  ) {
    e.preventDefault();
    const addedOrg = await addOrganization();
    await fetchUser();
    if (switchOrg) switchOrganization(addedOrg.organization.id);
  }

  function handleAddInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setOrganizationInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function switchOrganization(switchOrg: string) {
    setLoadingOrg(true);
    if (!id) {
      return;
    }
    try {
      const res = await customFetch(() =>
        OrganizationSwitchApiService(switchOrg, id),
      );
      if (res === 401) {
        router.push("/auth");
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        toast.error(
          data.message || "Error while trying to switch Organization!",
        );
      }
      await fetchUser();
      await fetchOrganization(switchOrg);
    } catch (e) {
      console.error(e);
      toast.error("Failed to switch organization!");
    } finally {
      setLoadingOrg(false);
    }
  }
  useEffect(() => {
    if (!loadingUser && selectedOrganizationId) {
      fetchOrganization(selectedOrganizationId);
    }
  }, [selectedOrganizationId]);

  return (
    <OrganizationContext.Provider
      value={{
        selectedOrganization,
        memberships,
        selectedOrganizationId,
        selectedProjectId,
        addOrganization,
        handleAddOrganization,
        switchOrganization,
        organizationInput,
        fetchUser,
        handleAddInput,
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
