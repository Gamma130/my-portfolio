import { getAllProfiles } from "@/lib/db/queries";
import BranchSelect from "./components/BranchSelect/BranchSelect";

export const dynamic = "force-dynamic";

export default async function SelectPage() {
  const profiles = getAllProfiles();
  return <BranchSelect profiles={profiles} />;
}
