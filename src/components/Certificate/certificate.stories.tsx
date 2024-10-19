import React from "react";
import Certificate from "./certificate";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const username = "testUser";
const pathname = `/members/${username}/certificate`;

const Template = () => (
  <MemoryRouter initialEntries={[pathname]}>
    <Routes>
      <Route path="/members/:username/certificate" element={<Certificate />} />
    </Routes>
  </MemoryRouter>
);

export const Default = Template.bind({});

export default {};
