"use client";

import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { toast } from "sonner";
import { OrganizationAddApiService } from "@/services/organization.service";
import { customFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

export function useOrganization() {
  const [organizationInput, setOrganizationInput] = useState({
    name: "",
    loading: false,
  });
  const { user, loading, fetchUser } = useUser();
    const router = useRouter();
  if (!user) {
    return {
      memberships: [],
      selectedOrganizationId: null,
      selectedOrganization: null,
      loading: loading,
      addOrganization,
      setOrganizationInput,
      fetchUser,
      organizationInput: { name: "", loading: false },
    };
  }
  const {
    memberships,
    selectedOrganization,
    selectedOrganizationId,
  } = user;
  async function switchOrganization(orgId: string) {}
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
  return {
    memberships,
    selectedOrganizationId,
    selectedOrganization,
    loading,
    addOrganization,
    organizationInput,
    fetchUser,
    setOrganizationInput,
  };
}
