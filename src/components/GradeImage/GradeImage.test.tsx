import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { Grade } from "../../api/services/types";

import GradeImage from "./GradeImage";

test.each(Object.values(Grade))(
  "attach alternative text for %s image",
  (grade) => {
    render(
      <GradeImage
        grade={grade}
        width={faker.number.int({ min: 1, max: 800 })}
        height={faker.number.int({ min: 1, max: 800 })}
      />,
    );

    expect(screen.getByRole("img")).toHaveAccessibleName(`${grade} image`);
  },
);

test("set width and height", () => {
  render(
    <GradeImage
      grade={faker.helpers.arrayElement(Object.values(Grade))}
      width={105}
      height={128}
    />,
  );

  expect(screen.getByRole("img")).toHaveAttribute("width", "105");
  expect(screen.getByRole("img")).toHaveAttribute("height", "128");
});
