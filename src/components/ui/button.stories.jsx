
import React from "react";
import { Button } from "./button";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive", "outline", "secondary", "ghost", "link", "gradient"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

// Temel hikaye
export const Default = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

// Varyantlar
export const Destructive = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outline = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Secondary = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Ghost = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

export const Link = {
  args: {
    children: "Link",
    variant: "link",
  },
};

export const Gradient = {
  args: {
    children: "Gradient",
    variant: "gradient",
  },
};

// Boyutlar
export const Small = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

export const Large = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

// İkon buton
export const IconButton = {
  args: {
    children: "📁",
    size: "icon",
    "aria-label": "Icon button",
  },
};

// Devre dışı buton
export const Disabled = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

// Çeşitli butonların yan yana gösterimi
export const ButtonGroup = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="gradient">Gradient</Button>
    </div>
  ),
};
