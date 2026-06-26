import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

export function OrgSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Combobox items={frameworks}>
          <ComboboxInput placeholder="Select an org" />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {frameworks.map((item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
