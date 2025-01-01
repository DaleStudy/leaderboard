import type { Grade } from "../../api/services/types";
import SeedImage from "../../assets/GradeSeed.png";
import SproutImage from "../../assets/GradeSprout.png";
import LeafImage from "../../assets/GradeLeaf.png";
import BranchImage from "../../assets/GradeBranch.png";
import FruitImage from "../../assets/GradeFruit.png";
import TreeImage from "../../assets/GradeTree.png";

const imageTable = {
  SEED: SeedImage,
  SPROUT: SproutImage,
  LEAF: LeafImage,
  BRANCH: BranchImage,
  FRUIT: FruitImage,
  TREE: TreeImage,
};

interface GradeImageProps {
  grade: Grade;
  height: number;
  width: number;
}

export default function GradeImage({ grade, height, width }: GradeImageProps) {
  return (
    <img
      src={imageTable[grade]}
      alt={`${grade} image`}
      height={height}
      width={width}
    />
  );
}
