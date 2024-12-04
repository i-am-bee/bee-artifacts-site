import { ArtifactSharedIcon } from '@/app/api/artifacts/types';
import {
  Book,
  Bot,
  ChartLineSmooth,
  Chat,
  Chemistry,
  Code,
  ColorPalette,
  CurrencyDollar,
  EarthFilled,
  FaceWink,
  Favorite,
  Gamification,
  GroupPresentation,
  Idea,
  Lightning,
  Pen,
  Rocket,
  TextShortParagraph,
  ToolKit,
  UserMultiple,
} from '@carbon/icons-react';

interface Props {
  name: ArtifactSharedIcon;
}

export function ArtifactIcon({ name }: Props) {
  const Icon = ARTIFACT_ICONS[name];

  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2 bg-coolGray-10 dark:bg-coolGray-80">
      <Icon size={16} />
    </div>
  );
}

export const ARTIFACT_ICONS = {
  ColorPalette,
  Pen,
  FaceWink,
  Idea,
  Book,
  Chat,
  Chemistry,
  ToolKit,
  UserMultiple,
  CurrencyDollar,
  Rocket,
  TextShortParagraph,
  Code,
  Bot,
  Favorite,
  EarthFilled,
  GroupPresentation,
  Lightning,
  Gamification,
  ChartLineSmooth,
};
