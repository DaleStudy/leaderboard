import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "./Pagination";
import { fn } from "@storybook/test";

const meta = {
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    currentPage: 2,
    totalPages: 10,
    onClickPrevious: fn(),
    onClickNext: fn(),
  },
};

export const Disabled1: StoryObj<typeof meta> = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onClickPrevious: fn(),
    onClickNext: fn(),
  },
};

export const Disabled2: StoryObj<typeof meta> = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onClickPrevious: fn(),
    onClickNext: fn(),
  },
};

export const Disabled3: StoryObj<typeof meta> = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onClickPrevious: fn(),
    onClickNext: fn(),
  },
};
