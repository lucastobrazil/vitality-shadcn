import { createElement, Component as ReactComponent, type ReactNode } from "react";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
  useOf,
} from "@storybook/addon-docs/blocks";

class SafeDescription extends ReactComponent<Record<string, never>, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render(): ReactNode {
    if (this.state.hasError) return null;
    return createElement(Description, null);
  }
}

const REGISTRY_URL =
  process.env.NEXT_PUBLIC_REGISTRY_URL || "https://vitality-shad.vercel.app";

function InstallSnippet() {
  const resolvedOf = useOf("meta");
  const title =
    "csfFile" in resolvedOf ? (resolvedOf as any).csfFile?.meta?.title : "";
  const componentName = (title || "")
    .split("/")
    .pop()
    ?.toLowerCase()
    .replace(/\s+/g, "-");

  if (!componentName) return null;

  const command = `npx shadcn-ng@latest add ${REGISTRY_URL}/r/ng/${componentName}.json`;

  return createElement(
    "pre",
    {
      style: {
        background: "var(--sb-barBg, #f6f6f6)",
        border: "1px solid var(--sb-appBorderColor, #e0e0e0)",
        borderRadius: 6,
        padding: "10px 14px",
        fontSize: 13,
        fontFamily: "var(--sb-fontCode, monospace)",
        overflowX: "auto" as const,
        marginBottom: 20,
      },
    },
    createElement("code", null, command)
  );
}

export function DocsPage() {
  return createElement(
    "div",
    null,
    createElement(Title, null),
    createElement(Subtitle, null),
    createElement(SafeDescription, null),
    createElement(InstallSnippet, null),
    createElement(Primary, null),
    createElement(Controls, null),
    createElement(Stories, null)
  );
}
