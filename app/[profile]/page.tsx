import { notFound } from "next/navigation";
import {
  getAllProfiles,
  getProfileBySlug,
  getProjectsForProfile,
  getSkillGroups,
  getExperience,
  getEducation,
} from "@/lib/db/queries";
import Shell from "../components/Shell/Shell";
import Hero from "../components/Hero/Hero";
import AskPromo from "../components/AskPromo/AskPromo";
import About from "../components/About/About";
import Projects from "../components/Projects/Projects";
import Skills from "../components/Skills/Skills";
import Background from "../components/TimelineCollumn";

export const dynamic = "force-dynamic";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profile: string }>;
}) {
  const { profile: slug } = await params;
  const profile = getProfileBySlug(slug);
  if (!profile) notFound();
  const allProfiles = getAllProfiles();
  const projects = getProjectsForProfile(profile.id);
  const groups = getSkillGroups();
  const experience = getExperience();
  const education = getEducation();

  return (
    <div className="app">
      <Shell profile={profile} profiles={allProfiles}>
        <Hero profile={profile} />
        <AskPromo />
        <About profile={profile} />
        <Projects projects={projects} profileSlug={profile.slug} />
        <Skills groups={groups} />
        <Background experience={experience} education={education} />
      </Shell>
    </div>
  );
}
