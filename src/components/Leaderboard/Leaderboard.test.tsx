import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Leaderboard from "./Leaderboard";

describe("<Leaderboard/>", () => {
  beforeEach(() => render(<Leaderboard />));

  it("renders the members list section", () => {
    expect(
      screen.getByRole("region", { name: /members list/i }),
    ).toBeInTheDocument();
  });

  it("renders the title", () => {
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Leaderboard");
  });

  it("renders the member information", () => {
    const members = [
      { name: "DaleSeo", solved: 71, rank: "새싹" },
      { name: "sounmind", solved: 69, rank: "나무" },
      { name: "yolophg", solved: 65, rank: "새싹" },
      { name: "Sunjae95", solved: 63, rank: "나무" },
      { name: "HC-kang", solved: 62, rank: "나무" },
      { name: "SamTheKorean", solved: 60, rank: "나무" },
    ];

    const memberItems = screen.getAllByRole("listitem");

    expect(memberItems).toHaveLength(members.length);

    members.forEach((member, index) => {
      const memberItem = memberItems[index];
      expect(memberItem).toHaveTextContent(`등급: ${member.rank}`);
      expect(memberItem).toHaveTextContent(`진행 상황: ${member.solved}`);
    });
  });

  it("renders the links for members", () => {
    const members = [
      { name: "DaleSeo" },
      { name: "sounmind" },
      { name: "yolophg" },
      { name: "Sunjae95" },
      { name: "HC-kang" },
      { name: "SamTheKorean" },
    ];

    const progressLinks = screen.getAllByRole("link", { name: "풀이 보기" });
    const certificateLinks = screen.getAllByRole("link", {
      name: "수료증 보기",
    });

    expect(progressLinks).toHaveLength(members.length);
    expect(certificateLinks).toHaveLength(members.length);

    members.forEach((member, index) => {
      expect(progressLinks[index]).toHaveAttribute(
        "href",
        `/progress?member=${member.name}`,
      );
      expect(certificateLinks[index]).toHaveAttribute(
        "href",
        `/certificate?member=${member.name}`,
      );
    });
  });
});
