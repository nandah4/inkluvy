import "./index.css";
import { Composition } from "remotion";
import { GoogleSearchScene } from "./GoogleSearchScene";
import { Scene2ProductIntro } from "./Scene2ProductIntro";
import { Scene3LaptopView } from "./Scene3LaptopView";
import { Scene4Footsteps } from "./Scene4Footsteps";
import { Scene5SosFeature } from "./Scene5SosFeature";
import { SceneLoading } from "./SceneLoading";
import { Scene6ProblemStatement } from "./Scene6ProblemStatement";
import { Scene7AccessibilityTransport } from "./Scene7AccessibilityTransport";
import { Scene8Ai3dVisualizer } from "./Scene8Ai3dVisualizer";
import { Scene9CommunityReporting } from "./Scene9CommunityReporting";
import { Scene10EmergencySos } from "./Scene10EmergencySos";
import { Scene11NowYouKnow } from "./Scene11NowYouKnow";
import { Scene12InkluvyOutro } from "./Scene12InkluvyOutro";
import { Scene13FinalOutro } from "./Scene13FinalOutro";
import { Scene14BenefitIntro } from "./Scene14BenefitIntro";
import { Scene15BenefitsGrid } from "./Scene15BenefitsGrid";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GoogleSearch"
        component={GoogleSearchScene}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene2ProductIntro"
        component={Scene2ProductIntro}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene3LaptopView"
        component={Scene3LaptopView}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene4Footsteps"
        component={Scene4Footsteps}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene5SosFeature"
        component={Scene5SosFeature}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SceneLoading"
        component={SceneLoading}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene6ProblemStatement"
        component={Scene6ProblemStatement}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene7AccessibilityTransport"
        component={Scene7AccessibilityTransport}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene8Ai3dVisualizer"
        component={Scene8Ai3dVisualizer}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene9CommunityReporting"
        component={Scene9CommunityReporting}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene10EmergencySos"
        component={Scene10EmergencySos}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene11NowYouKnow"
        component={Scene11NowYouKnow}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene12InkluvyOutro"
        component={Scene12InkluvyOutro}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene13FinalOutro"
        component={Scene13FinalOutro}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene14BenefitIntro"
        component={Scene14BenefitIntro}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene15BenefitsGrid"
        component={Scene15BenefitsGrid}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
