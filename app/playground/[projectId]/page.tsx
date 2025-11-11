import ChatSection from "@/components/playground/ChatSection";
import ElementSettingSection from "@/components/playground/ElementSettingSection";
import PlaygroundHeader from "@/components/playground/PlaygroundHeader";
import WebsiteDesign from "@/components/playground/WebsiteDesign";

type Props = {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ frameId?: string }>;
};

export default async function Playground({ params, searchParams }: Props) {
  const { projectId } = await params;
  const { frameId } = await searchParams;


  return (
    <div>
      <PlaygroundHeader />

      <div className="flex p-4">
        <ChatSection />
        <WebsiteDesign />
        {/* <ElementSettingSection /> */}
      </div>
    </div>
  );
}
